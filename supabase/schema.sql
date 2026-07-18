-- ============================================================
-- Co-Cre  Supabase スキーマ（docs/04_データ設計.md 準拠）
-- ------------------------------------------------------------
-- 使い方:
--   1. Supabase プロジェクトを作成
--   2. Dashboard → SQL Editor にこのファイルを貼り付けて実行
--   3. .env.local に NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を設定
-- 認証は Supabase Auth（auth.users）を利用する。ユーザー所有データは RLS で本人のみに限定する。
-- ============================================================

-- ---------- カテゴリ ----------
create table if not exists public.categories (
  id    text primary key,          -- 'ui' | 'layout' | 'htmlcss' | 'dev'
  label text not null
);

-- ---------- 用語 ----------
create table if not exists public.terms (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name_ja           text not null,
  name_en           text not null,
  reading           text not null default '',
  aliases           text[] not null default '{}',
  category_id       text not null references public.categories(id),
  level             int  not null check (level between 1 and 3),
  summary           text not null,
  description       text not null default '',
  use_case          text not null default '',
  sample_code       text,
  related_slugs     text[] not null default '{}',
  is_premium        boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists terms_category_idx on public.terms (category_id);
create index if not exists terms_level_idx    on public.terms (level);

-- ---------- 用語の実例画像 ----------
create table if not exists public.term_images (
  id         uuid primary key default gen_random_uuid(),
  term_id    uuid not null references public.terms(id) on delete cascade,
  url        text not null,
  caption    text,
  sort_order int not null default 0
);

-- ---------- プロフィール（auth.users の 1:1 拡張） ----------
create table if not exists public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  display_name       text,
  plan               text not null default 'free' check (plan in ('free','premium')),
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);

-- ---------- お気に入り（localStorage: cocre:favorites:v1 の移行先） ----------
create table if not exists public.favorites (
  user_id    uuid not null references auth.users(id) on delete cascade,
  term_slug  text not null,          -- terms.slug を参照（クライアントは slug で扱うため）
  created_at timestamptz not null default now(),
  primary key (user_id, term_slug)
);

-- ---------- クイズ成績（localStorage: cocre:quiz-results:v1 の移行先） ----------
create table if not exists public.quiz_results (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  mode        text not null check (mode in ('beginner','intermediate','advanced','exam')),
  score       int  not null,
  total       int  not null,
  wrong_slugs text[] not null default '{}',
  taken_at    timestamptz not null default now()
);
create index if not exists quiz_results_user_idx on public.quiz_results (user_id, taken_at desc);

-- ---------- すごろく学習の進捗（localStorage: cocre:journey:v1 の移行先） ----------
create table if not exists public.journey_progress (
  user_id    uuid not null references auth.users(id) on delete cascade,
  node_id    text not null,          -- journey.ts のノードid（例 c1-l1 / m1-test）
  cleared_at timestamptz not null default now(),
  primary key (user_id, node_id)
);
create index if not exists journey_progress_user_idx on public.journey_progress (user_id);

-- ---------- 既読の用語（localStorage: cocre:seen:v1 の移行先） ----------
create table if not exists public.seen_terms (
  user_id   uuid not null references auth.users(id) on delete cascade,
  term_slug text not null,           -- terms.slug
  seen_at   timestamptz not null default now(),
  primary key (user_id, term_slug)
);

-- ---------- サブスク状態（正は Stripe。Webhookで同期） ----------
create table if not exists public.subscriptions (
  user_id                uuid primary key references auth.users(id) on delete cascade,
  stripe_subscription_id text,
  status                 text check (status in ('active','canceled','past_due')),
  current_period_end     timestamptz
);

-- ============================================================
-- Row Level Security
-- ============================================================

-- RLS 有効化（有効済みでも無害）
alter table public.categories  enable row level security;
alter table public.terms       enable row level security;
alter table public.term_images enable row level security;
alter table public.profiles         enable row level security;
alter table public.favorites        enable row level security;
alter table public.quiz_results     enable row level security;
alter table public.journey_progress enable row level security;
alter table public.seen_terms       enable row level security;
alter table public.subscriptions    enable row level security;

-- ポリシー（再実行OK：あれば消してから作り直す）
-- 公開読み取り（カテゴリ・用語・画像）
drop policy if exists "public read categories" on public.categories;
create policy "public read categories"  on public.categories  for select using (true);
drop policy if exists "public read terms" on public.terms;
create policy "public read terms"        on public.terms       for select using (true);
drop policy if exists "public read term_images" on public.term_images;
create policy "public read term_images"  on public.term_images for select using (true);

-- ユーザー所有データ（本人のみ全操作可）
drop policy if exists "own profile" on public.profiles;
create policy "own profile"       on public.profiles      for all using (auth.uid() = id)      with check (auth.uid() = id);
drop policy if exists "own favorites" on public.favorites;
create policy "own favorites"     on public.favorites     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own quiz_results" on public.quiz_results;
create policy "own quiz_results"  on public.quiz_results  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own journey_progress" on public.journey_progress;
create policy "own journey_progress" on public.journey_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own seen_terms" on public.seen_terms;
create policy "own seen_terms"    on public.seen_terms    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- サブスクは読み取りのみ（書き込みは service_role のWebhookが行う）
drop policy if exists "read own subscription" on public.subscriptions;
create policy "read own subscription" on public.subscriptions for select using (auth.uid() = user_id);

-- ============================================================
-- 新規ユーザー登録時に profiles 行を自動作成
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 初期カテゴリ
insert into public.categories (id, label) values
  ('ui','UI部品'), ('layout','レイアウト'), ('htmlcss','HTML/CSS'), ('dev','開発用語')
on conflict (id) do nothing;

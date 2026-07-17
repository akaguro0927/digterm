"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, session: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, session: null, loading: true });

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) {
      // Supabase未設定ならゲスト扱い（ローカル保存にフォールバック）
      setState({ user: null, session: null, loading: false });
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setState({ user: data.session?.user ?? null, session: data.session ?? null, loading: false });
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, session: session ?? null, loading: false });
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

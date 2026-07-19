// 効果音（Web Audio API で生成・音声ファイル不要・完全無料）。
// 正解＝明るい2音、不正解＝低い1音。デフォルトOFF、localStorageで保存。
// ※ 演出に「言葉」は使わない方針のため、音のみ。ボイス読み上げ等は入れないこと。

const KEY = "sfx-on";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    // ユーザー操作後に suspended から復帰させる
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function isSfxOn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

export function setSfxOn(on: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, on ? "1" : "0");
  window.dispatchEvent(new Event("sfx-change"));
}

export function toggleSfx(): boolean {
  const next = !isSfxOn();
  setSfxOn(next);
  return next;
}

// freq(Hz), start(sec offset), dur(sec), type, peak gain
function tone(
  ac: AudioContext,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  peak: number,
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + start);
  gain.gain.setValueAtTime(0.0001, ac.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(peak, ac.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + dur + 0.02);
}

/** 正解: 明るく上がる2音（ポンッ） */
export function playCorrect() {
  if (!isSfxOn()) return;
  const ac = getCtx();
  if (!ac) return;
  tone(ac, 660, 0, 0.12, "sine", 0.18);
  tone(ac, 990, 0.09, 0.16, "sine", 0.16);
}

/** 不正解: 低くにぶい1音（ブブッ） */
export function playWrong() {
  if (!isSfxOn()) return;
  const ac = getCtx();
  if (!ac) return;
  tone(ac, 180, 0, 0.16, "square", 0.1);
  tone(ac, 150, 0.08, 0.14, "square", 0.09);
}

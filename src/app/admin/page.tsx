"use client";

/**
 * /admin — hidden Day 2 route quest.
 *
 * Students discover this page from the locked sidebar hint, prove they
 * understand file-based routing, then unlock Day 2 for this browser.
 */

import Link from "next/link";
import { useState } from "react";
import { WorkshopLayout } from "@/components/layout/WorkshopLayout";
import { CelebrationBurst } from "@/components/ui/CelebrationBurst";
import {
  DAY2_DATE,
  DAY2_STORAGE_KEY,
  WORKSHOP_UNLOCK_EVENT,
} from "@/config/workshopState";
import { useDay2Unlocked } from "@/hooks/useDay2Unlocked";

const ROUTE_OPTIONS = [
  {
    id: "nested-app",
    label: "src/app/admin/page.js",
    explanation: "Folders inside app become URL segments.",
  },
  {
    id: "flat-src",
    label: "src/admin.js",
    explanation: "This file is outside the App Router.",
  },
  {
    id: "public-folder",
    label: "public/admin/page.js",
    explanation: "public stores assets, not application routes.",
  },
] as const;

function setBrowserUnlock(unlocked: boolean) {
  try {
    localStorage.setItem(DAY2_STORAGE_KEY, unlocked ? "true" : "false");
  } catch {
    // The config fallback still works when localStorage is unavailable.
  }
  window.dispatchEvent(new Event(WORKSHOP_UNLOCK_EVENT));
}

function LockIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d={open ? "M7 11V7a5 5 0 0 1 9.5-2" : "M7 11V7a5 5 0 0 1 10 0v4"} />
    </svg>
  );
}

export default function AdminPage() {
  const day2Unlocked = useDay2Unlocked();
  const [selected, setSelected] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const selectedOption = ROUTE_OPTIONS.find((option) => option.id === selected);
  const answeredWrong = selected !== null && selected !== "nested-app";

  const checkAnswer = () => {
    if (selected === "nested-app") {
      setSolved(true);
    }
  };

  const unlockDay2 = () => {
    setBrowserUnlock(true);
    setShowCelebration(true);
  };

  const resetQuest = () => {
    setBrowserUnlock(false);
    setSelected(null);
    setSolved(false);
    setShowCelebration(false);
  };

  return (
    <WorkshopLayout>
      {showCelebration && <CelebrationBurst />}

      <main className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-6 overflow-hidden rounded-2xl border border-[#9B191F]/20 bg-[radial-gradient(circle_at_top,_rgba(155,25,31,0.16),_transparent_55%)] p-5 text-center shadow-sm dark:border-[#9B191F]/40 dark:bg-[radial-gradient(circle_at_top,_rgba(155,25,31,0.28),_transparent_60%)] sm:p-8">
          <div className="celebrate-hero relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#9B191F]/20 bg-white text-[#9B191F] shadow-[0_0_32px_rgba(155,25,31,0.25)] dark:bg-zinc-900">
            {!day2Unlocked && (
              <span className="absolute -right-1 -top-1 h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-500" />
              </span>
            )}
            <LockIcon open={day2Unlocked} />
          </div>

          <div className="celebrate-copy">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#9B191F] dark:text-red-300">
              Secret route discovered
            </p>
            <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              {day2Unlocked ? "Day 2 Unlocked!" : "The Route Quest"}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
              {day2Unlocked
                ? "Routing skills confirmed. The hidden door is open on this browser."
                : "You found /admin — nice. One last routing puzzle stands between you and Day 2."}
            </p>
          </div>
        </div>

        {day2Unlocked ? (
          <section className="celebrate-cards overflow-hidden rounded-2xl border border-emerald-300 bg-emerald-50 p-5 shadow-lg shadow-emerald-500/10 dark:border-emerald-800 dark:bg-emerald-950/30 sm:p-7">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-lg shadow-emerald-500/30">
                ✓
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                Achievement unlocked
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">
                Route Explorer
              </h2>
              <p className="mt-2 max-w-md text-sm text-emerald-900/80 dark:text-emerald-100/80">
                You connected <code>app/admin/page.js</code> to{" "}
                <code>/admin</code>. Day 2 ({DAY2_DATE}) is now available in
                your sidebar.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/day-2"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9B191F] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#9B191F]/20 transition-transform hover:scale-[1.02] hover:bg-[#7d1419] active:scale-[0.98]"
              >
                Enter Day 2
                <span aria-hidden>→</span>
              </Link>
              <button
                type="button"
                onClick={resetQuest}
                className="rounded-xl border border-emerald-300 bg-white/70 px-5 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-white dark:border-emerald-800 dark:bg-black/20 dark:text-emerald-200 dark:hover:bg-black/40"
              >
                Reset quest (testing)
              </button>
            </div>
          </section>
        ) : (
          <section className="celebrate-cards rounded-2xl border border-black/10 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-zinc-900 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  Final gate
                </p>
                <h2 className="mt-1 text-xl font-bold text-zinc-950 dark:text-white">
                  Which file creates this route?
                </h2>
              </div>
              <span className="shrink-0 rounded-full bg-[#9B191F]/10 px-3 py-1 text-xs font-bold text-[#9B191F] dark:bg-[#9B191F]/20 dark:text-red-300">
                1 puzzle
              </span>
            </div>

            <div className="mb-5 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-center font-mono text-sm text-zinc-700 dark:border-zinc-700 dark:bg-black/20 dark:text-zinc-200">
              localhost:3000
              <span className="font-bold text-[#9B191F] dark:text-red-300">
                /admin
              </span>
            </div>

            <fieldset>
              <legend className="sr-only">
                Choose the file that creates the admin route
              </legend>
              <div className="space-y-2.5">
                {ROUTE_OPTIONS.map((option) => {
                  const isSelected = selected === option.id;
                  const isCorrect = solved && option.id === "nested-app";
                  const isWrong = answeredWrong && isSelected;

                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all ${
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20 dark:bg-emerald-950/30"
                          : isWrong
                            ? "animate-[celebrate-pop_0.35s_ease-out] border-rose-400 bg-rose-50 dark:bg-rose-950/30"
                            : isSelected
                              ? "border-[#9B191F] bg-[#9B191F]/5 ring-2 ring-[#9B191F]/15"
                              : "border-zinc-200 hover:-translate-y-0.5 hover:border-[#9B191F]/40 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="route-answer"
                        value={option.id}
                        checked={isSelected}
                        disabled={solved}
                        onChange={() => setSelected(option.id)}
                        className="h-4 w-4 accent-[#9B191F]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
                          {option.explanation}
                        </span>
                      </span>
                      {isCorrect && (
                        <span className="font-bold text-emerald-600" aria-label="Correct">
                          ✓
                        </span>
                      )}
                      {isWrong && (
                        <span className="font-bold text-rose-600" aria-label="Try again">
                          ×
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div
              className={`mt-4 min-h-6 text-sm ${
                answeredWrong
                  ? "text-rose-600 dark:text-rose-300"
                  : "text-emerald-700 dark:text-emerald-300"
              }`}
              aria-live="polite"
            >
              {answeredWrong
                ? "Not quite — remember: folders inside app become URL segments. Try again!"
                : solved
                  ? "Correct! app / admin / page.js becomes /admin. The key is ready."
                  : selectedOption
                    ? "Lock in your answer when you are ready."
                    : "Hint: follow the same folder → URL rule you used for /about."}
            </div>

            {solved ? (
              <button
                type="button"
                onClick={unlockDay2}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="animate-bounce" aria-hidden>
                  🔑
                </span>
                Claim the Day 2 key
              </button>
            ) : (
              <button
                type="button"
                disabled={!selected || answeredWrong}
                onClick={checkAnswer}
                className="mt-4 w-full rounded-xl bg-[#9B191F] px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#7d1419] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Check my route
              </button>
            )}
          </section>
        )}

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="font-medium text-[#9B191F] hover:underline">
            ← Retreat to Home
          </Link>
        </p>
      </main>
    </WorkshopLayout>
  );
}

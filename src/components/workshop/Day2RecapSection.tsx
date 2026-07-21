/**
 * Day 2 — Recap: chill wrap-up + slide deck when ready.
 * Until resources are uploaded, shows Coming Soon + Telegram notice.
 */

import { Section } from "@/components/ui/Section";
import { isDay2RecapReady } from "@/config/workshopState";

const DAY2_SLIDES_HREF = `/slides/${encodeURIComponent(
  "SIMITC - React Workshop D2.pdf"
)}`;

export function Day2RecapSection() {
  return (
    <Section id="day-2-recap" number="★" title="Day 2 — Recap">
      <div className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50 via-violet-50 to-emerald-50 p-6 dark:border-sky-900/50 dark:from-sky-950/40 dark:via-violet-950/30 dark:to-emerald-950/20 sm:p-8">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#9B191F]/10 blur-2xl dark:bg-[#9B191F]/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-violet-300/30 blur-2xl dark:bg-violet-500/10"
          aria-hidden
        />

        <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
          You made it through Day 2
        </p>
        <h3 className="relative mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          Hooks, APIs, Git — and you shipped.
        </h3>
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
          This page is your Day 2 study buddy: useState, useEffect, fetch,
          GitHub, and Vercel. Come back whenever something feels fuzzy — no
          rush, revisit at your own pace.
        </p>
      </div>

      {isDay2RecapReady ? (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "What you built",
                body: "Interactive ProfileCard, live data fetch, Git history, and a live Vercel URL.",
              },
              {
                title: "What to revisit",
                body: "Hooks, async fetch, event handlers, commit/push flow, and deploy steps.",
              },
              {
                title: "How to use the deck",
                body: "Download once, keep it handy. Open it when you rebuild the project later.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-zinc-900/70"
              >
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {card.title}
                </p>
                <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#9B191F]/25 bg-[#9B191F]/5 p-6 text-center dark:border-[#9B191F]/40 dark:bg-[#9B191F]/10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
              Day 2 slide deck
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-600 dark:text-zinc-400">
              Same slides from Day 2 — for referring back, not for cramming.
            </p>
            <a
              href={DAY2_SLIDES_HREF}
              download="Day-2-React-Workshop-Slides.pdf"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#9B191F] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#9B191F]/25 transition-transform hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Day 2 slides (PDF)
            </a>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
              File: SIMITC — React Workshop D2.pdf
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/80 p-6 text-center dark:border-amber-800 dark:bg-amber-950/30 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
            Coming soon
          </p>
          <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            Day 2 slides are being finalised
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            We will upload the Day 2 recap resources here once everything is
            ready. Watch the workshop{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">Telegram</strong>{" "}
            group — we will notify you as soon as the files are finalised and
            uploaded.
          </p>
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-900 dark:border-amber-700 dark:bg-black/20 dark:text-amber-200">
            <span aria-hidden>📣</span>
            Telegram ping when ready
          </div>
        </div>
      )}

      <blockquote className="rounded-xl border-l-4 border-sky-500 bg-sky-50/80 px-5 py-4 dark:border-sky-400 dark:bg-sky-950/30">
        <p className="text-base font-medium leading-relaxed text-zinc-800 dark:text-zinc-100 sm:text-lg">
          &ldquo;You did not just click Deploy — you learned how interactive
          apps think. Keep practising those hooks and Git habits. Ship small,
          ship often.&rdquo;
        </p>
        <footer className="mt-2 text-sm text-sky-800 dark:text-sky-300">
          — Advice from us, for after Day 2
        </footer>
      </blockquote>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Proud of you. Keep building.
      </p>
    </Section>
  );
}

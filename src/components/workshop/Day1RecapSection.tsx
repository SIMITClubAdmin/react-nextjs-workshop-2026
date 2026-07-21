/**
 * Day 1 — Recap: chill wrap-up + slide deck download.
 */

import { Section } from "@/components/ui/Section";

const DAY1_SLIDES_HREF = `/slides/${encodeURIComponent(
  "SIMITC - React Workshop D1.pdf"
)}`;

export function Day1RecapSection() {
  return (
    <Section id="day-1-recap" number="★" title="Day 1 — Recap">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 p-6 dark:border-emerald-900/50 dark:from-emerald-950/40 dark:via-sky-950/30 dark:to-amber-950/20 sm:p-8">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#9B191F]/10 blur-2xl dark:bg-[#9B191F]/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-sky-300/30 blur-2xl dark:bg-sky-500/10"
          aria-hidden
        />

        <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          You made it through Day 1
        </p>
        <h3 className="relative mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          Take a breath. That was a lot — and you showed up.
        </h3>
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
          These slides are your chill study buddy for later. Flip back whenever
          you forget something — the bubble tea theory, props, Tailwind class
          names, routing, or any of the hands-on steps. No rush. Revisit at your
          own pace.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            title: "What you built",
            body: "A real Next.js app with a ProfileCard, About route, Image, and Tailwind polish.",
          },
          {
            title: "What to revisit",
            body: "Components vs props, file-based routing, utility classes, and the copy-paste hands-on flow.",
          },
          {
            title: "How to use the deck",
            body: "Download once, keep it handy. Skim before Day 2, or open it when you get stuck coding.",
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
          Day 1 slide deck
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-600 dark:text-zinc-400">
          Same slides from today — for referring back on what you learned, not
          for cramming tonight.
        </p>
        <a
          href={DAY1_SLIDES_HREF}
          download="Day-1-React-Workshop-Slides.pdf"
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
          Download Day 1 slides (PDF)
        </a>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
          File: SIMITC — React Workshop D1.pdf
        </p>
      </div>

      <blockquote className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50/80 px-5 py-4 dark:border-emerald-400 dark:bg-emerald-950/30">
        <p className="text-base font-medium leading-relaxed text-zinc-800 dark:text-zinc-100 sm:text-lg">
          &ldquo;Keep practising those little wins — every save, every fix, every
          &lsquo;ohhh that makes sense&rsquo; moment is how builders are made.
          You do not need to be perfect. You just need to keep showing up.&rdquo;
        </p>
        <footer className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
          — Advice from us, for after Day 1
        </footer>
      </blockquote>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Rest up. Day 2 will be fun — interactivity, then shipping live.
      </p>
    </Section>
  );
}

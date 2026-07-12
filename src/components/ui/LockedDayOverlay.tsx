/**
 * Frosted-glass locked-day overlay (brief: glassmorphism for Day lock screens).
 * Used when Day 1 / Day 2 is not yet unlocked for this browser.
 */

import type { ReactNode } from "react";
import Link from "next/link";

type LockedDayOverlayProps = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  children?: ReactNode;
};

export function LockedDayOverlay({
  title,
  description,
  backHref,
  backLabel,
}: LockedDayOverlayProps) {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
      {/* Soft brand glow behind the glass card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(155,25,31,0.18),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(155,25,31,0.28),_transparent_55%)]"
      />
      <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl border border-black/10 bg-white/70 p-8 text-center shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#9B191F]/20 bg-[#9B191F]/10 shadow-[0_0_24px_rgba(155,25,31,0.25)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#9B191F]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        <Link
          href={backHref}
          className="mt-6 inline-block text-sm font-medium text-[#9B191F] hover:underline"
        >
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

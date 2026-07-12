"use client";

/**
 * SectionJump — floating top-right control for Day 1 / Day 2 pages.
 * Students open a glass panel and jump straight to a practice / topic section.
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type SectionJumpItem = {
  id: string;
  label: string;
};

type SectionJumpProps = {
  sections: SectionJumpItem[];
};

export function SectionJump({ sections }: SectionJumpProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  const jumpTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      close();
    },
    [close]
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const firstButton = dialogRef.current?.querySelector<HTMLButtonElement>(
      "button[data-section-jump]"
    );
    firstButton?.focus();
  }, [open]);

  if (sections.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-20 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-sm font-semibold text-zinc-800 shadow-lg backdrop-blur-md transition-colors hover:bg-white dark:border-white/10 dark:bg-black/60 dark:text-zinc-100 dark:hover:bg-black/80 lg:right-6"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-[#9B191F]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        Topics
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20 lg:p-6 lg:pt-20">
          <button
            type="button"
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            aria-label="Close topics menu"
            onClick={close}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-xs rounded-2xl border border-black/10 bg-white/80 p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-black/70"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2
                id={titleId}
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Jump to topic
              </h2>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label="Close"
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
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Day topics">
              <ol className="space-y-1">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      data-section-jump
                      onClick={() => jumpTo(section.id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-700 transition-colors hover:bg-[#9B191F]/10 hover:text-[#9B191F] dark:text-zinc-200 dark:hover:bg-[#9B191F]/20 dark:hover:text-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9B191F] text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="font-medium">{section.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

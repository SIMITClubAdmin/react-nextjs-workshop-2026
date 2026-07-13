"use client";

/**
 * BubbleTeaBuilder — Day 1 mini-game.
 *
 * Top: edit the shared component (lid / cup shell / straw) → all 3 cups update.
 * Bottom: 3 “pages” each with their own props (tea, pearls, sugar).
 */

import { useState } from "react";

type TeaColor = "milk" | "green" | "black";
type Sweetness = "none" | "half" | "full";
type LidStyle = "silver" | "pink" | "clear";
type StrawStyle = "red" | "black" | "mint";
type CupShell = "clear" | "frosted" | "amber";

type DrinkOrder = {
  teaColor: TeaColor;
  pearls: boolean;
  sweetness: Sweetness;
};

type ComponentLook = {
  lid: LidStyle;
  shell: CupShell;
  straw: StrawStyle;
};

const TEA_HEX: Record<TeaColor, string> = {
  milk: "#f5d28a",
  green: "#6ee7b7",
  black: "#78350f",
};

const TEA_LABELS: Record<TeaColor, string> = {
  milk: "Milk Tea",
  green: "Green Tea",
  black: "Black Tea",
};

const SWEETNESS_LABELS: Record<Sweetness, string> = {
  none: "0%",
  half: "50%",
  full: "100%",
};

const SWEETNESS_GLOSS: Record<Sweetness, number> = {
  none: 0.35,
  half: 0.55,
  full: 0.8,
};

const LID_STYLES: Record<LidStyle, { top: string; rim: string; label: string }> =
  {
    silver: {
      top: "linear-gradient(180deg, #a1a1aa, #71717a)",
      rim: "linear-gradient(180deg, #d4d4d8, #a1a1aa)",
      label: "Silver lid",
    },
    pink: {
      top: "linear-gradient(180deg, #fda4af, #fb7185)",
      rim: "linear-gradient(180deg, #fecdd3, #fda4af)",
      label: "Pink lid",
    },
    clear: {
      top: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(228,228,231,0.65))",
      rim: "linear-gradient(180deg, rgba(244,244,245,0.95), rgba(212,212,216,0.7))",
      label: "Clear lid",
    },
  };

const STRAW_STYLES: Record<StrawStyle, { bg: string; label: string }> = {
  red: {
    bg: "linear-gradient(90deg, #fb7185, #9b191f 45%, #fda4af)",
    label: "Red straw",
  },
  black: {
    bg: "linear-gradient(90deg, #52525b, #18181b 45%, #71717a)",
    label: "Black straw",
  },
  mint: {
    bg: "linear-gradient(90deg, #6ee7b7, #059669 45%, #a7f3d0)",
    label: "Mint straw",
  },
};

const SHELL_STYLES: Record<
  CupShell,
  { back: string; front: string; border: string; label: string }
> = {
  clear: {
    back: "linear-gradient(180deg, rgba(148,163,184,0.25), rgba(148,163,184,0.08))",
    front:
      "linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.12) 100%)",
    border: "rgba(148, 163, 184, 0.55)",
    label: "Clear cup",
  },
  frosted: {
    back: "linear-gradient(180deg, rgba(226,232,240,0.55), rgba(148,163,184,0.2))",
    front:
      "linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(241,245,249,0.25) 45%, rgba(255,255,255,0.2) 100%)",
    border: "rgba(100, 116, 139, 0.45)",
    label: "Frosted cup",
  },
  amber: {
    back: "linear-gradient(180deg, rgba(251,191,36,0.28), rgba(180,83,9,0.12))",
    front:
      "linear-gradient(120deg, rgba(254,243,199,0.45) 0%, rgba(251,191,36,0.12) 40%, rgba(255,255,255,0.15) 100%)",
    border: "rgba(180, 83, 9, 0.4)",
    label: "Amber cup",
  },
};

const PAGES = [
  { id: "home", title: "page: Home", file: "app/page.js" },
  { id: "about", title: "page: About", file: "app/about/page.js" },
  { id: "menu", title: "page: Menu", file: "app/menu/page.js" },
] as const;

function nextSweetness(s: Sweetness): Sweetness {
  return s === "none" ? "half" : s === "half" ? "full" : "none";
}

function cycle<T>(list: readonly T[], current: T): T {
  const i = list.indexOf(current);
  return list[(i + 1) % list.length];
}

interface CupProps {
  look: ComponentLook;
  order: DrinkOrder;
  compact?: boolean;
}

/** One BubbleTeaCup — shared look from the component; drink from props. */
function Cup({ look, order, compact }: CupProps) {
  const liquid = TEA_HEX[order.teaColor];
  const gloss = SWEETNESS_GLOSS[order.sweetness];
  const lid = LID_STYLES[look.lid];
  const straw = STRAW_STYLES[look.straw];
  const shell = SHELL_STYLES[look.shell];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={compact ? "boba-stage boba-stage--sm" : "boba-stage"}
        aria-hidden
      >
        <div className="boba-scene">
          <div className="boba-straw" style={{ background: straw.bg }} />

          <div className="boba-lid">
            <div className="boba-lid-top" style={{ background: lid.top }} />
            <div className="boba-lid-rim" style={{ background: lid.rim }} />
          </div>

          <div className="boba-cup">
            <div
              className="boba-cup-back"
              style={{ background: shell.back, borderColor: shell.border }}
            />
            <div
              className="boba-liquid"
              style={{
                background: `linear-gradient(180deg, ${liquid}cc 0%, ${liquid} 55%, ${liquid}ee 100%)`,
                opacity: 0.75 + gloss * 0.2,
                boxShadow: `inset 0 0 ${12 + gloss * 20}px rgba(255,255,255,${0.15 + gloss * 0.25})`,
              }}
            >
              {order.pearls && (
                <div className="boba-pearls">
                  {Array.from({ length: compact ? 7 : 9 }).map((_, i) => (
                    <span
                      key={i}
                      className="boba-pearl"
                      style={{
                        left: `${8 + (i % 5) * 18}%`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div
              className="boba-cup-front"
              style={{ background: shell.front, borderColor: shell.border }}
            />
            <div className="boba-cup-shine" />
          </div>

          <div className="boba-shadow" />
        </div>
      </div>
    </div>
  );
}

const btnBase =
  "rounded-lg px-3 py-2 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]";

export function BubbleTeaBuilder() {
  const [look, setLook] = useState<ComponentLook>({
    lid: "silver",
    shell: "clear",
    straw: "red",
  });

  const [orders, setOrders] = useState<DrinkOrder[]>([
    { teaColor: "milk", pearls: true, sweetness: "half" },
    { teaColor: "green", pearls: true, sweetness: "full" },
    { teaColor: "black", pearls: false, sweetness: "none" },
  ]);

  const updateOrder = (index: number, patch: Partial<DrinkOrder>) => {
    setOrders((prev) =>
      prev.map((o, i) => (i === index ? { ...o, ...patch } : o))
    );
  };

  return (
    <div className="my-6 space-y-6 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900 sm:p-6">
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Bubble Tea Shop Simulator
          </h3>
          <span className="rounded-full bg-[#9B191F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#9B191F]">
            Try me
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          One{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">
            BubbleTeaCup
          </code>{" "}
          component · used on three pretend pages. Change the{" "}
          <strong>component</strong> once — every cup updates. Change{" "}
          <strong>props</strong> per page — only that drink changes.
        </p>
      </div>

      {/* ── Component editor ── */}
      <div className="rounded-xl border border-[#9B191F]/25 bg-[#9B191F]/5 p-4 dark:border-[#9B191F]/40 dark:bg-[#9B191F]/10">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9B191F]">
          1 · Edit the component (lid · cup · straw)
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Like editing <code>BubbleTeaCup.jsx</code> once. Watch all three pages
          update in one shot.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setLook((l) => ({
                ...l,
                lid: cycle(["silver", "pink", "clear"] as const, l.lid),
              }))
            }
            className={`${btnBase} border border-pink-300 bg-pink-50 text-pink-900 dark:border-pink-800 dark:bg-pink-950/40 dark:text-pink-100`}
          >
            Swap lid → {LID_STYLES[look.lid].label}
          </button>
          <button
            type="button"
            onClick={() =>
              setLook((l) => ({
                ...l,
                shell: cycle(["clear", "frosted", "amber"] as const, l.shell),
              }))
            }
            className={`${btnBase} border border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100`}
          >
            Swap cup → {SHELL_STYLES[look.shell].label}
          </button>
          <button
            type="button"
            onClick={() =>
              setLook((l) => ({
                ...l,
                straw: cycle(["red", "black", "mint"] as const, l.straw),
              }))
            }
            className={`${btnBase} border border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100`}
          >
            Swap straw → {STRAW_STYLES[look.straw].label}
          </button>
        </div>

        <p className="mt-3 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          component look = {"{"} lid: &quot;{look.lid}&quot;, cup: &quot;
          {look.shell}&quot;, straw: &quot;{look.straw}&quot; {"}"}
        </p>
      </div>

      {/* ── Three pages ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          2 · Three pages using the same component (each has its own props)
        </p>
        <p className="mt-1 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Pretend these are different routes. Customise flavour, bubbles, and
          sugar on each page — the other pages stay put.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {PAGES.map((page, index) => {
            const order = orders[index];
            return (
              <div
                key={page.id}
                className="flex flex-col rounded-xl border border-black/10 bg-zinc-50/80 p-3 dark:border-white/10 dark:bg-zinc-950/50"
              >
                <div className="mb-2 border-b border-black/5 pb-2 dark:border-white/5">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {page.title}
                  </p>
                  <p className="font-mono text-[10px] text-zinc-500">
                    {page.file}
                  </p>
                </div>

                <Cup look={look} order={order} compact />

                <div className="mt-2 rounded-lg border border-black/5 bg-white px-2.5 py-1.5 font-mono text-[10px] dark:border-white/10 dark:bg-zinc-900">
                  <p>
                    teaColor=
                    <span className="text-emerald-600 dark:text-emerald-400">
                      &quot;{order.teaColor}&quot;
                    </span>
                  </p>
                  <p>
                    pearls=
                    <span className="text-purple-600 dark:text-purple-400">
                      {String(order.pearls)}
                    </span>
                  </p>
                  <p>
                    sugar=
                    <span className="text-sky-600 dark:text-sky-400">
                      &quot;{order.sweetness}&quot;
                    </span>
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Props for this page
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(
                      [
                        ["milk", "Milk"],
                        ["green", "Green"],
                        ["black", "Black"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateOrder(index, { teaColor: value })}
                        className={`rounded-md px-2 py-1 text-[11px] font-medium ${
                          order.teaColor === value
                            ? "bg-[#9B191F] text-white"
                            : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateOrder(index, { pearls: !order.pearls })
                    }
                    className={`${btnBase} bg-zinc-700 text-xs text-white hover:bg-zinc-800`}
                  >
                    {order.pearls ? "Hold pearls" : "Add pearls"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateOrder(index, {
                        sweetness: nextSweetness(order.sweetness),
                      })
                    }
                    className={`${btnBase} border border-black/10 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800`}
                  >
                    Sugar: {SWEETNESS_LABELS[order.sweetness]} ·{" "}
                    {TEA_LABELS[order.teaColor]}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="rounded-lg bg-zinc-100 px-3 py-2 text-center text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
        Component change = all three cups. Props change = one page only.
      </p>
    </div>
  );
}

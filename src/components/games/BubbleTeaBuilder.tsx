"use client";

/**
 * BubbleTeaBuilder — Day 1 mini-game demonstrating Components & Props.
 *
 * Students click buttons that change "props" (tea color, pearls, sweetness).
 * The Cup is a CSS 3D model that re-renders visually, proving that changing
 * props changes what a component looks like — without rewriting the component.
 */

import { useState } from "react";

type TeaColor = "milk" | "green" | "black";
type Sweetness = "none" | "half" | "full";

interface CupProps {
  teaColor: TeaColor;
  pearls: boolean;
  sweetness: Sweetness;
}

const TEA_HEX: Record<TeaColor, string> = {
  milk: "#f5d28a",
  green: "#6ee7b7",
  black: "#78350f",
};

const SWEETNESS_LABELS: Record<Sweetness, string> = {
  none: "0% sugar",
  half: "50% sugar",
  full: "100% sugar",
};

const SWEETNESS_GLOSS: Record<Sweetness, number> = {
  none: 0.35,
  half: 0.55,
  full: 0.8,
};

/** CSS 3D Cup — only knows about the props it receives. */
function Cup({ teaColor, pearls, sweetness }: CupProps) {
  const liquid = TEA_HEX[teaColor];
  const gloss = SWEETNESS_GLOSS[sweetness];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="boba-stage" aria-hidden>
        <div className="boba-scene">
          {/* Straw */}
          <div className="boba-straw" />

          {/* Lid */}
          <div className="boba-lid">
            <div className="boba-lid-top" />
            <div className="boba-lid-rim" />
          </div>

          {/* Glass body */}
          <div className="boba-cup">
            <div className="boba-cup-back" />
            <div
              className="boba-liquid"
              style={{
                background: `linear-gradient(180deg, ${liquid}cc 0%, ${liquid} 55%, ${liquid}ee 100%)`,
                opacity: 0.75 + gloss * 0.2,
                boxShadow: `inset 0 0 ${12 + gloss * 20}px rgba(255,255,255,${0.15 + gloss * 0.25})`,
              }}
            >
              {pearls && (
                <div className="boba-pearls">
                  {Array.from({ length: 9 }).map((_, i) => (
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
            <div className="boba-cup-front" />
            <div className="boba-cup-shine" />
          </div>

          {/* Soft ground shadow */}
          <div className="boba-shadow" />
        </div>
      </div>

      <div className="rounded-lg border border-black/10 bg-zinc-100 px-4 py-2 font-mono text-xs dark:border-white/10 dark:bg-zinc-800">
        <p>
          teaColor ={" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            &quot;{teaColor}&quot;
          </span>
        </p>
        <p>
          pearls ={" "}
          <span className="text-purple-600 dark:text-purple-400">
            {String(pearls)}
          </span>
        </p>
        <p>
          sweetness ={" "}
          <span className="text-sky-600 dark:text-sky-400">
            &quot;{sweetness}&quot;
          </span>
        </p>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {SWEETNESS_LABELS[sweetness]}
        {sweetness === "full" ? " · extra gloss" : ""}
      </p>
    </div>
  );
}

export function BubbleTeaBuilder() {
  const [teaColor, setTeaColor] = useState<TeaColor>("milk");
  const [pearls, setPearls] = useState(true);
  const [sweetness, setSweetness] = useState<Sweetness>("half");

  return (
    <div className="my-6 rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900">
      <h3 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Bubble Tea Builder
      </h3>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        Click the buttons below to change the <strong>props</strong> passed to
        the{" "}
        <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">
          &lt;Cup /&gt;
        </code>{" "}
        component. Watch the 3D cup update instantly!
      </p>

      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
        <Cup teaColor={teaColor} pearls={pearls} sweetness={sweetness} />

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Change Props
          </p>
          <button
            type="button"
            onClick={() => setTeaColor("green")}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Change to Green Tea
          </button>
          <button
            type="button"
            onClick={() => setTeaColor("black")}
            className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-950"
          >
            Change to Black Tea
          </button>
          <button
            type="button"
            onClick={() => setTeaColor("milk")}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-amber-500"
          >
            Change to Milk Tea
          </button>
          <button
            type="button"
            onClick={() => setPearls((p) => !p)}
            className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            {pearls ? "Remove Pearls" : "Add Pearls"}
          </button>
          <button
            type="button"
            onClick={() =>
              setSweetness((s) =>
                s === "none" ? "half" : s === "half" ? "full" : "none"
              )
            }
            className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Toggle Sweetness
          </button>
        </div>
      </div>
    </div>
  );
}

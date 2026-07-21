"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LabShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

function LabShell({
  eyebrow,
  title,
  description,
  children,
}: LabShellProps) {
  return (
    <section className="my-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="border-b border-black/10 bg-gradient-to-br from-[#9B191F]/10 via-white to-amber-50 px-5 py-5 dark:border-white/10 dark:from-[#9B191F]/25 dark:via-zinc-900 dark:to-amber-950/20 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B191F] dark:text-red-300">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B191F] focus-visible:ring-offset-2 dark:focus-visible:ring-red-300 dark:focus-visible:ring-offset-zinc-900";

type RenderMode = "csr" | "ssr";

type TimelineStep = {
  id: string;
  actor: "browser" | "server" | "network";
  label: string;
  detail: string;
};

const CSR_STEPS: TimelineStep[] = [
  {
    id: "request",
    actor: "browser",
    label: "Request page",
    detail: "Browser asks the server for the URL.",
  },
  {
    id: "shell",
    actor: "server",
    label: "Send HTML shell + JS",
    detail: "Server replies with a nearly empty page and a JavaScript bundle.",
  },
  {
    id: "download",
    actor: "network",
    label: "Download & run JS",
    detail: "Browser downloads JavaScript, then starts building the UI.",
  },
  {
    id: "build",
    actor: "browser",
    label: "Cook the meal",
    detail: "React runs in the browser and constructs the interface.",
  },
  {
    id: "paint",
    actor: "browser",
    label: "Useful content appears",
    detail: "Only now does the user see real headings, text, and layout.",
  },
];

const SSR_STEPS: TimelineStep[] = [
  {
    id: "request",
    actor: "browser",
    label: "Request page",
    detail: "Browser asks the server for the URL.",
  },
  {
    id: "prepare",
    actor: "server",
    label: "Prepare the meal",
    detail: "Server renders useful HTML for this request.",
  },
  {
    id: "html",
    actor: "network",
    label: "Send ready HTML",
    detail: "Response already contains headings, text, and structure.",
  },
  {
    id: "paint",
    actor: "browser",
    label: "Show content immediately",
    detail: "Browser paints useful content as soon as HTML arrives.",
  },
  {
    id: "hydrate",
    actor: "browser",
    label: "Optional: add interactivity",
    detail: "Later JS can hydrate buttons and state without delaying first paint.",
  },
];

function PreviewFrame({
  mode,
  stepIndex,
}: {
  mode: RenderMode;
  stepIndex: number;
}) {
  const csrCooking = mode === "csr" && stepIndex === 3;
  const csrWaiting = mode === "csr" && stepIndex < 3;
  const ssrWaiting = mode === "ssr" && stepIndex < 3;
  const ready =
    (mode === "csr" && stepIndex >= 4) || (mode === "ssr" && stepIndex >= 3);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-300 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-950">
      <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <span className="ml-2 font-mono text-[10px] text-zinc-500">
          localhost:3000/about
        </span>
      </div>
      <div className="relative flex min-h-44 items-center justify-center p-4">
        {(csrWaiting || ssrWaiting) && !csrCooking && (
          <div className="w-full space-y-3" aria-hidden>
            <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
              {mode === "csr"
                ? stepIndex <= 1
                  ? "Empty shell from the server…"
                  : "Downloading / running JavaScript…"
                : stepIndex === 0
                  ? "Waiting for the server…"
                  : stepIndex === 1
                    ? "Server preparing the meal…"
                    : "Useful HTML on the way…"}
            </p>
          </div>
        )}
        {csrCooking && (
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-[#9B191F] border-t-transparent"
              aria-hidden
            />
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              Browser is cooking the UI…
            </p>
          </div>
        )}
        {ready && (
          <article className="w-full rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 transition-opacity duration-500 dark:border-emerald-800 dark:bg-emerald-950/40">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Profile ready
            </p>
            <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Alex · Computer Science Student
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Learning React and Next.js!
            </p>
            {mode === "ssr" && stepIndex >= 4 && (
              <p className="mt-2 text-xs text-emerald-800 dark:text-emerald-200">
                Content was already visible — JS only adds interactivity.
              </p>
            )}
          </article>
        )}
      </div>
    </div>
  );
}

export function CsrSsrCompareLab() {
  const [mode, setMode] = useState<RenderMode>("csr");
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const steps = mode === "csr" ? CSR_STEPS : SSR_STEPS;

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    play("csr");
    // Auto-play Classic CSR once when the lab mounts so the comparison is visible immediately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function play(nextMode: RenderMode = mode) {
    clearTimers();
    setMode(nextMode);
    setStepIndex(0);
    setPlaying(true);

    const sequence = nextMode === "csr" ? CSR_STEPS : SSR_STEPS;
    sequence.forEach((_, index) => {
      timers.current.push(
        setTimeout(() => {
          setStepIndex(index);
          if (index === sequence.length - 1) {
            setPlaying(false);
          }
        }, index * 900),
      );
    });
  }

  function chooseMode(nextMode: RenderMode) {
    if (nextMode === mode && !playing) return;
    play(nextMode);
  }

  return (
    <LabShell
      eyebrow="Animation lab"
      title="CSR vs SSR — watch who cooks the meal"
      description="Play each path. CSR waits for the browser to build the page. SSR sends useful HTML first, so content can appear sooner."
    >
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Rendering mode">
        {(
          [
            { id: "csr", label: "Classic CSR", sub: "Browser cooks" },
            { id: "ssr", label: "Classic SSR", sub: "Server serves" },
          ] as const
        ).map((option) => {
          const active = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => chooseMode(option.id)}
              className={`${focusRing} min-w-36 flex-1 rounded-xl border px-4 py-3 text-left transition-colors sm:flex-none ${
                active
                  ? option.id === "csr"
                    ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40"
                    : "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/40"
                  : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950/50"
              }`}
            >
              <span className="block text-sm font-semibold text-zinc-950 dark:text-white">
                {option.label}
              </span>
              <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
                {option.sub}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => play(mode)}
          disabled={playing}
          className={`${focusRing} rounded-xl bg-[#9B191F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#7f1419] disabled:cursor-wait disabled:opacity-60 dark:bg-red-700 dark:hover:bg-red-600`}
        >
          {playing ? "Playing…" : "Replay"}
        </button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <ol className="space-y-2" aria-label={`${mode.toUpperCase()} timeline`}>
          {steps.map((step, index) => {
            const active = stepIndex === index;
            const done = stepIndex > index;
            return (
              <li
                key={step.id}
                aria-current={active ? "step" : undefined}
                className={`rounded-xl border px-3 py-3 transition-colors ${
                  active
                    ? "border-[#9B191F] bg-[#9B191F]/5 dark:border-red-400 dark:bg-[#9B191F]/20"
                    : done
                      ? "border-emerald-300 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/30"
                      : "border-zinc-200 bg-zinc-50 opacity-70 dark:border-zinc-700 dark:bg-zinc-950/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      active
                        ? "bg-[#9B191F] text-white"
                        : done
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {done ? "✓" : index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                      <span className="font-medium capitalize text-zinc-500 dark:text-zinc-500">
                        {step.actor}:{" "}
                      </span>
                      {step.detail}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div>
          <PreviewFrame mode={mode} stepIndex={stepIndex} />
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400" aria-live="polite">
            <strong className="text-zinc-900 dark:text-zinc-100">
              Now:{" "}
            </strong>
            {steps[Math.min(stepIndex, steps.length - 1)]?.detail}
          </p>
          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
            Next.js App Router is closer to the SSR idea for the first paint,
            then adds Client Components where interactivity is needed — not pure
            classic CSR for the whole page.
          </p>
        </div>
      </div>
    </LabShell>
  );
}

type RenderingNeedId =
  | "interaction"
  | "browserApi"
  | "staticContent"
  | "serverData";

type RenderingNeeds = Record<RenderingNeedId, boolean>;

const RENDERING_NEEDS: Array<{
  id: RenderingNeedId;
  label: string;
  shortLabel: string;
  description: string;
  bestFit: "client" | "server";
}> = [
  {
    id: "interaction",
    label: "Clicks or state",
    shortLabel: "useState · onClick",
    description: "The UI must remember a value or respond to an event.",
    bestFit: "client",
  },
  {
    id: "browserApi",
    label: "Browser API",
    shortLabel: "window · localStorage",
    description: "The feature needs an API that only exists in the browser.",
    bestFit: "client",
  },
  {
    id: "staticContent",
    label: "Static content",
    shortLabel: "headings · article",
    description: "The content can be rendered without browser interaction.",
    bestFit: "server",
  },
  {
    id: "serverData",
    label: "Server-side data",
    shortLabel: "database · secret key",
    description: "Data should stay close to the server or use private credentials.",
    bestFit: "server",
  },
];

const INITIAL_RENDERING_NEEDS: RenderingNeeds = {
  interaction: false,
  browserApi: false,
  staticContent: true,
  serverData: false,
};

export function RenderingBoundaryLab() {
  const [needs, setNeeds] = useState<RenderingNeeds>(INITIAL_RENDERING_NEEDS);

  const needsClient = needs.interaction || needs.browserApi;
  const hasServerFriendlyWork = needs.staticContent || needs.serverData;
  const usesServerComponent = !needsClient || hasServerFriendlyWork;
  const usesClientComponent = needsClient;

  let recommendation = "Server Component";
  let recommendationDetail =
    "Keep this component on the server by default. It does not need browser JavaScript.";

  if (needsClient && hasServerFriendlyWork) {
    recommendation = "Server parent + Client island";
    recommendationDetail =
      "Render the static or server-data work on the server, then place the interactive part behind a small client boundary.";
  } else if (needsClient) {
    recommendation = "Client Component";
    recommendationDetail =
      "This feature needs state, events, or a browser API, so its module should begin at a client boundary.";
  }

  return (
    <LabShell
      eyebrow="Decision lab"
      title="Where should this component run?"
      description="Toggle the feature requirements. Next.js can compose Server and Client Components, so the smallest interactive piece can run in the browser while the rest stays on the server."
    >
      <fieldset>
        <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          What does the component need?
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {RENDERING_NEEDS.map((need) => {
            const selected = needs[need.id];

            return (
              <button
                key={need.id}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  setNeeds((current) => ({
                    ...current,
                    [need.id]: !current[need.id],
                  }))
                }
                className={`${focusRing} rounded-xl border p-4 text-left transition-colors motion-reduce:transition-none ${
                  selected
                    ? "border-[#9B191F] bg-[#9B191F]/5 dark:border-red-400 dark:bg-[#9B191F]/20"
                    : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-950/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      selected
                        ? "border-[#9B191F] bg-[#9B191F] text-white dark:border-red-400 dark:bg-red-400 dark:text-zinc-950"
                        : "border-zinc-300 bg-white text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    }`}
                    aria-hidden="true"
                  >
                    {selected ? "✓" : "+"}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-zinc-950 dark:text-white">
                      {need.label}
                    </span>
                    <code className="mt-0.5 block text-xs text-[#9B191F] dark:text-red-300">
                      {need.shortLabel}
                    </code>
                    <span className="mt-2 block text-sm leading-5 text-zinc-600 dark:text-zinc-400">
                      {need.description}
                    </span>
                    <span className="mt-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Best fit: {need.bestFit} component
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div
        className="mt-6 rounded-2xl border border-[#9B191F]/30 bg-[#9B191F]/5 p-4 dark:border-[#9B191F]/60 dark:bg-[#9B191F]/15 sm:p-5"
        aria-live="polite"
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B191F] dark:text-red-300">
          Recommended architecture
        </p>
        <p className="mt-1 text-xl font-bold text-zinc-950 dark:text-white">
          {recommendation}
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {recommendationDetail}
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            usesServerComponent
              ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
              : "border-zinc-200 bg-zinc-50 opacity-65 dark:border-zinc-700 dark:bg-zinc-950/50"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-zinc-950 dark:text-white">
              Server Component
            </p>
            <span className="rounded-full bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700 shadow-sm dark:bg-zinc-900 dark:text-emerald-300">
              Default
            </span>
          </div>
          <p className="mt-2 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
            Great for static UI, server data, secrets, and sending less JavaScript
            to the browser.
          </p>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            usesClientComponent
              ? "border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/30"
              : "border-zinc-200 bg-zinc-50 opacity-65 dark:border-zinc-700 dark:bg-zinc-950/50"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-zinc-950 dark:text-white">
              Client Component
            </p>
            <code className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-blue-700 shadow-sm dark:bg-zinc-900 dark:text-blue-300">
              &quot;use client&quot;
            </code>
          </div>
          <p className="mt-2 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
            Use for state, event handlers, effects, and browser-only APIs. Keep
            the boundary as small as the feature allows.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
          Boundary is not the same as CSR
        </p>
        <p className="mt-1 text-sm leading-6 text-amber-900/90 dark:text-amber-100/90">
          <code>&quot;use client&quot;</code> marks where the client module graph
          begins. It does not mean the whole page is client-side rendered. On the
          first load, Next.js can still prerender HTML for Client Components on
          the server, then hydrate their interactivity in the browser.
        </p>
      </div>
    </LabShell>
  );
}

type EffectSimulation = {
  value: number;
  renders: number;
  everyRenderRuns: number;
  mountOnlyRuns: number;
  valueChangeRuns: number;
  lastAction: string;
};

const INITIAL_EFFECT_SIMULATION: EffectSimulation = {
  value: 0,
  renders: 1,
  everyRenderRuns: 1,
  mountOnlyRuns: 1,
  valueChangeRuns: 1,
  lastAction: "The component mounted. Each effect ran after the first render.",
};

const EFFECT_MODES = [
  {
    id: "every",
    label: "No dependency array",
    code: "useEffect(() => { ... })",
    rule: "Runs after every committed render",
    accent:
      "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30",
    badge: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  },
  {
    id: "mount",
    label: "Empty dependency array",
    code: "useEffect(() => { ... }, [])",
    rule: "Runs after the initial mount",
    accent:
      "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  {
    id: "value",
    label: "Value dependency",
    code: "useEffect(() => { ... }, [value])",
    rule: "Runs on mount and when value changes",
    accent:
      "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
] as const;

export function EffectDependencyLab() {
  const [simulation, setSimulation] = useState<EffectSimulation>(
    INITIAL_EFFECT_SIMULATION,
  );

  const effectRuns = {
    every: simulation.everyRenderRuns,
    mount: simulation.mountOnlyRuns,
    value: simulation.valueChangeRuns,
  };

  return (
    <LabShell
      eyebrow="Effect simulator"
      title="When does each useEffect run?"
      description="Trigger a re-render with or without changing the dependency. The lab updates counters directly, so it demonstrates the rules without creating a real render loop."
    >
      <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950/50 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3" aria-live="polite" aria-atomic="true">
          <div className="rounded-lg bg-white px-3 py-2 shadow-sm dark:bg-zinc-900">
            <span id="effect-render-count-label" className="block text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Render count
            </span>
            <output aria-labelledby="effect-render-count-label" className="text-xl font-bold text-zinc-950 dark:text-white">
              {simulation.renders}
            </output>
          </div>
          <div className="rounded-lg bg-white px-3 py-2 shadow-sm dark:bg-zinc-900">
            <span id="effect-value-label" className="block text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              value
            </span>
            <output aria-labelledby="effect-value-label" className="font-mono text-xl font-bold text-[#9B191F] dark:text-red-300">
              {simulation.value}
            </output>
          </div>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Simulation controls">
          <button
            type="button"
            onClick={() =>
              setSimulation((current) => ({
                ...current,
                renders: current.renders + 1,
                everyRenderRuns: current.everyRenderRuns + 1,
                lastAction:
                  "Rendered again without changing value: only the no-array effect ran.",
              }))
            }
            className={`${focusRing} rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 motion-reduce:transition-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800`}
          >
            Render again
          </button>
          <button
            type="button"
            onClick={() =>
              setSimulation((current) => ({
                ...current,
                value: current.value + 1,
                renders: current.renders + 1,
                everyRenderRuns: current.everyRenderRuns + 1,
                valueChangeRuns: current.valueChangeRuns + 1,
                lastAction:
                  "Changed value: the no-array and [value] effects both ran.",
              }))
            }
            className={`${focusRing} rounded-lg bg-[#9B191F] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7f1419] motion-reduce:transition-none dark:bg-red-700 dark:hover:bg-red-600`}
          >
            Change value
          </button>
          <button
            type="button"
            onClick={() => setSimulation(INITIAL_EFFECT_SIMULATION)}
            className={`${focusRing} rounded-lg px-3 py-2 text-sm font-semibold text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-300`}
          >
            Reset
          </button>
        </div>
      </div>

      <p
        className="mt-3 min-h-6 text-sm font-medium text-zinc-700 dark:text-zinc-300"
        aria-live="polite"
      >
        {simulation.lastAction}
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {EFFECT_MODES.map((mode) => (
          <article key={mode.id} className={`rounded-xl border p-4 ${mode.accent}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-zinc-950 dark:text-white">
                  {mode.label}
                </h4>
                <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                  {mode.rule}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${mode.badge}`}
              >
                {effectRuns[mode.id]} {effectRuns[mode.id] === 1 ? "run" : "runs"}
              </span>
            </div>
            <code className="mt-4 block overflow-x-auto rounded-lg bg-zinc-950 px-3 py-3 text-xs leading-5 text-zinc-100">
              {mode.code}
            </code>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        <p>
          <strong className="text-zinc-900 dark:text-zinc-100">
            Why loops happen:
          </strong>{" "}
          an effect with no dependency array runs after every render. If that
          effect updates state every time, it causes another render, then another
          effect run. This simulator never calls a real effect, so it stays safe.
        </p>
        <p className="mt-2 text-xs">
          Development note: React Strict Mode may replay an effect setup to help
          find bugs. The counters above show the conceptual lifecycle.
        </p>
      </div>
    </LabShell>
  );
}

const ASYNC_STEPS = [
  {
    label: "Fetch",
    verb: "Start request",
    code: 'const request = fetch("/api/quote");',
    explanation: "fetch starts an asynchronous request and returns a Promise.",
  },
  {
    label: "Await response",
    verb: "Receive response",
    code: "const response = await request;",
    explanation:
      "await pauses this async function until the Promise resolves to a Response.",
  },
  {
    label: "Parse JSON",
    verb: "Read the body",
    code: "const data = await response.json();",
    explanation:
      "response.json() is asynchronous too. It turns the response body into a JavaScript object.",
  },
  {
    label: "Update UI",
    verb: "Set state",
    code: "setQuote(data);",
    explanation:
      "Updating state triggers a render, so React displays the quote data.",
  },
] as const;

const SIMULATED_QUOTE = {
  quote: "The best way to learn is to build, inspect, and try again.",
  author: "Workshop Companion",
};

export function AsyncAwaitFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const complete = stepIndex === ASYNC_STEPS.length;
  const currentStep = stepIndex > 0 ? ASYNC_STEPS[stepIndex - 1] : null;

  return (
    <LabShell
      eyebrow="No-network walkthrough"
      title="Follow one async request from start to screen"
      description="Advance one line at a time. The response is simulated locally, so everyone can learn the sequence even if the workshop Wi-Fi or a public API is unavailable."
    >
      <div
        className="mb-5"
        role="progressbar"
        aria-label="Async request progress"
        aria-valuemin={0}
        aria-valuemax={ASYNC_STEPS.length}
        aria-valuenow={stepIndex}
      >
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          <span>
            Step {stepIndex} of {ASYNC_STEPS.length}
          </span>
          <span>{complete ? "UI updated" : "Simulated request"}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full rounded-full bg-[#9B191F] transition-[width] duration-300 motion-reduce:transition-none dark:bg-red-400"
            style={{ width: `${(stepIndex / ASYNC_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="grid gap-2 sm:grid-cols-4" aria-label="Async request steps">
        {ASYNC_STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepIndex === stepNumber;
          const isComplete = stepIndex > stepNumber;

          return (
            <li
              key={step.label}
              aria-current={isCurrent ? "step" : undefined}
              className={`rounded-xl border px-3 py-3 ${
                isCurrent
                  ? "border-[#9B191F] bg-[#9B191F]/5 dark:border-red-400 dark:bg-[#9B191F]/20"
                  : isComplete
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                    : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isCurrent
                      ? "bg-[#9B191F] text-white dark:bg-red-400 dark:text-zinc-950"
                      : isComplete
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                  }`}
                  aria-hidden="true"
                >
                  {isComplete ? "✓" : stepNumber}
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {step.label}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4 py-2">
            <span className="font-mono text-xs text-zinc-400">
              QuoteCard.js · simulated
            </span>
            <span className="text-xs font-medium text-zinc-500">
              No network request
            </span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-7 sm:text-sm">
            <code>
              <span className="text-violet-300">async function</span>
              <span className="text-zinc-100"> loadQuote() {"{"}</span>
              {ASYNC_STEPS.map((step, index) => {
                const lineNumber = index + 1;
                const active = stepIndex === lineNumber;
                const finished = stepIndex > lineNumber;

                return (
                  <span
                    key={step.code}
                    className={`block rounded px-2 transition-colors motion-reduce:transition-none ${
                      active
                        ? "bg-amber-400/20 text-amber-100 ring-1 ring-inset ring-amber-400/40"
                        : finished
                          ? "text-emerald-300"
                          : "text-zinc-400"
                    }`}
                  >
                    {"  "}
                    {step.code}
                  </span>
                );
              })}
              <span className="text-zinc-100">{"}"}</span>
            </code>
          </pre>
        </div>

        <div className="flex min-h-64 flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950/50">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Live data flow
          </p>

          <div className="mt-3 flex-1" aria-live="polite">
            {stepIndex === 0 && (
              <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 p-5 text-center dark:border-zinc-700">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Ready to request a quote
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Select Next step to call the simulated fetch.
                </p>
              </div>
            )}

            {stepIndex > 0 && !complete && currentStep && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                  {currentStep.verb}
                </p>
                <p className="mt-2 font-semibold text-zinc-950 dark:text-white">
                  {currentStep.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {currentStep.explanation}
                </p>
                {stepIndex === 1 && (
                  <p className="mt-3 font-mono text-xs text-blue-700 dark:text-blue-300">
                    Promise {"<pending>"}
                  </p>
                )}
                {stepIndex === 2 && (
                  <p className="mt-3 font-mono text-xs text-blue-700 dark:text-blue-300">
                    Response {"{ ok: true, status: 200 }"}
                  </p>
                )}
                {stepIndex === 3 && (
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-3 font-mono text-xs leading-5 text-emerald-300">
                    {JSON.stringify(SIMULATED_QUOTE, null, 2)}
                  </pre>
                )}
              </div>
            )}

            {complete && (
              <figure className="rounded-xl border border-[#9B191F]/30 bg-white p-5 shadow-sm dark:border-[#9B191F]/60 dark:bg-zinc-900">
                <blockquote className="text-lg font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                  &ldquo;{SIMULATED_QUOTE.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-[#9B191F] dark:text-red-300">
                  — {SIMULATED_QUOTE.author}
                </figcaption>
              </figure>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={complete}
              onClick={() =>
                setStepIndex((current) =>
                  Math.min(current + 1, ASYNC_STEPS.length),
                )
              }
              className={`${focusRing} rounded-lg bg-[#9B191F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7f1419] disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none dark:bg-red-700 dark:hover:bg-red-600`}
            >
              {stepIndex === 0 ? "Start flow" : "Next step"}
            </button>
            <button
              type="button"
              onClick={() => setStepIndex(0)}
              className={`${focusRing} rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 motion-reduce:transition-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800`}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </LabShell>
  );
}

type HandlerMode = "pass" | "call";

export function EventHandlerPlayground() {
  const [mode, setMode] = useState<HandlerMode>("pass");
  const [likes, setLikes] = useState(0);
  const [message, setMessage] = useState(
    "React rendered the button. The handler is waiting for a click.",
  );

  function chooseMode(nextMode: HandlerMode) {
    setMode(nextMode);

    if (nextMode === "call") {
      setLikes((current) => current + 1);
      setMessage(
        "Simulated render: handleLike() ran immediately, before anyone clicked.",
      );
      return;
    }

    setMessage(
      "React received the handleLike function. It is waiting for a real click.",
    );
  }

  function handlePreviewClick() {
    setLikes((current) => current + 1);
    setMessage(
      "Click event → handleLike ran → setLikes requested the next render.",
    );
  }

  function reset() {
    setMode("pass");
    setLikes(0);
    setMessage(
      "React rendered the button. The handler is waiting for a click.",
    );
  }

  const optionBase = [
    focusRing,
    "rounded-xl border p-4 text-left transition-colors motion-reduce:transition-none",
  ].join(" ");

  return (
    <LabShell
      eyebrow="Event playground"
      title="Pass the function—do not call it"
      description="Compare the two forms safely. The playground simulates the common mistake so you can see exactly when the handler runs."
    >
      <fieldset>
        <legend className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Choose what goes inside onClick
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            aria-pressed={mode === "pass"}
            onClick={() => chooseMode("pass")}
            className={[
              optionBase,
              mode === "pass"
                ? "border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30"
                : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950/50",
            ].join(" ")}
          >
            <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Correct · pass it
            </span>
            <code className="mt-2 block text-sm text-zinc-900 dark:text-zinc-100">
              onClick={"{"}handleLike{"}"}
            </code>
            <span className="mt-2 block text-sm text-zinc-600 dark:text-zinc-400">
              React stores the function and waits for the user.
            </span>
          </button>

          <button
            type="button"
            aria-pressed={mode === "call"}
            onClick={() => chooseMode("call")}
            className={[
              optionBase,
              mode === "call"
                ? "border-amber-500 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30"
                : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950/50",
            ].join(" ")}
          >
            <span className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
              Mistake · call it now
            </span>
            <code className="mt-2 block text-sm text-zinc-900 dark:text-zinc-100">
              onClick={"{"}handleLike(){"}"}
            </code>
            <span className="mt-2 block text-sm text-zinc-600 dark:text-zinc-400">
              The parentheses run it while React is rendering.
            </span>
          </button>
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-950/50">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Live preview
          </p>
          <p className="mt-4 text-2xl font-bold text-zinc-950 dark:text-white">
            ❤️ {likes} {likes === 1 ? "like" : "likes"}
          </p>
          <button
            type="button"
            disabled={mode === "call"}
            onClick={handlePreviewClick}
            className={[
              focusRing,
              "mt-4 rounded-lg bg-[#9B191F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1419] disabled:cursor-not-allowed disabled:opacity-45 dark:bg-red-700 dark:hover:bg-red-600",
            ].join(" ")}
          >
            {mode === "call" ? "No function is waiting" : "Like profile"}
          </button>
        </div>

        <div
          className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30"
          aria-live="polite"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            What just happened?
          </p>
          <p className="mt-3 text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
            {message}
          </p>
          <ol className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <li>
              <strong>1.</strong> React renders the component.
            </li>
            <li>
              <strong>2.</strong>{" "}
              {mode === "pass"
                ? "It keeps the function for later."
                : "The parentheses call the function immediately."}
            </li>
            <li>
              <strong>3.</strong>{" "}
              {mode === "pass"
                ? "A user click runs the handler."
                : "There is no handler function left waiting for a click."}
            </li>
          </ol>
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className={[
          focusRing,
          "mt-4 text-sm font-semibold text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-300",
        ].join(" ")}
      >
        Reset playground
      </button>
    </LabShell>
  );
}

const HOOK_SNIPPETS = [
  {
    id: "top-level",
    label: "Top-level useState",
    code: "const [open, setOpen] = useState(false);",
    valid: true,
    reason: "Called at the top level every render — React can track the order.",
  },
  {
    id: "inside-if",
    label: "Hook inside if",
    code: "if (ready) {\n  const [likes, setLikes] = useState(0);\n}",
    valid: false,
    reason: "Conditional Hooks change call order between renders.",
  },
  {
    id: "after-return",
    label: "Hook after early return",
    code: "if (!user) return null;\nconst [tab, setTab] = useState(\"home\");",
    valid: false,
    reason: "An early return can skip the Hook on some renders.",
  },
  {
    id: "custom-hook",
    label: "Custom Hook",
    code: "function useToggle(start) {\n  return useState(start);\n}",
    valid: true,
    reason: "Custom Hooks may call other Hooks — their names start with use.",
  },
  {
    id: "utility",
    label: "Ordinary utility",
    code: "function formatName(name) {\n  const [value] = useState(name);\n  return value;\n}",
    valid: false,
    reason: "Regular utilities are not React components or custom Hooks.",
  },
] as const;

export function RulesOfHooksLab() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = HOOK_SNIPPETS.find((item) => item.id === selectedId) ?? null;

  return (
    <LabShell
      eyebrow="Rules checker"
      title="Which Hook calls are allowed?"
      description="Pick a snippet. React needs Hooks called in the same order on every render, so conditionals and early returns break that contract."
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {HOOK_SNIPPETS.map((item) => {
          const active = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedId(item.id)}
              className={`${focusRing} rounded-xl border p-4 text-left transition-colors motion-reduce:transition-none ${
                active
                  ? "border-[#9B191F] bg-[#9B191F]/5 dark:border-red-400 dark:bg-[#9B191F]/20"
                  : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950/50 dark:hover:border-zinc-600"
              }`}
            >
              <span className="text-sm font-semibold text-zinc-950 dark:text-white">
                {item.label}
              </span>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-3 font-mono text-xs leading-5 text-zinc-100">
                <code>{item.code}</code>
              </pre>
            </button>
          );
        })}
      </div>

      <div
        className="mt-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
        aria-live="polite"
      >
        {selected ? (
          <>
            <p
              className={`text-sm font-bold ${
                selected.valid
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-amber-800 dark:text-amber-300"
              }`}
            >
              {selected.valid ? "✅ Allowed" : "❌ Breaks the Rules of Hooks"}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {selected.reason}
            </p>
          </>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Select a snippet to check it.
          </p>
        )}
      </div>
    </LabShell>
  );
}

const GIT_STEPS = [
  {
    id: "edit",
    label: "Edit files",
    detail: "Change code in VS Code. Git notices which files differ.",
  },
  {
    id: "stage",
    label: "git add .",
    detail: "Stage the changes you want in the next snapshot.",
  },
  {
    id: "commit",
    label: "git commit",
    detail: "Save a local snapshot with a clear message.",
  },
  {
    id: "push",
    label: "git push",
    detail: "Upload commits to GitHub so others (and Vercel) can see them.",
  },
] as const;

export function GitPipelineLab() {
  const [stepIndex, setStepIndex] = useState(0);
  const complete = stepIndex >= GIT_STEPS.length;

  return (
    <LabShell
      eyebrow="Git pipeline"
      title="From laptop change to GitHub"
      description="Advance one step at a time. This is the daily habit you will repeat after every meaningful feature."
    >
      <ol className="grid gap-2 sm:grid-cols-4" aria-label="Git workflow steps">
        {GIT_STEPS.map((step, index) => {
          const active = stepIndex === index;
          const done = stepIndex > index;
          return (
            <li
              key={step.id}
              aria-current={active ? "step" : undefined}
              className={`rounded-xl border px-3 py-3 ${
                active
                  ? "border-[#9B191F] bg-[#9B191F]/5 dark:border-red-400 dark:bg-[#9B191F]/20"
                  : done
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                    : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950/50"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Step {index + 1}
              </span>
              <p className="mt-1 font-mono text-sm font-semibold text-zinc-950 dark:text-white">
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30" aria-live="polite">
        {complete ? (
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Done. GitHub now has your latest snapshot. Later, Vercel can build from that push.
          </p>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
              Now
            </p>
            <p className="mt-1 text-base font-semibold text-zinc-950 dark:text-white">
              {GIT_STEPS[stepIndex].label}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {GIT_STEPS[stepIndex].detail}
            </p>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={complete}
          onClick={() => setStepIndex((current) => Math.min(current + 1, GIT_STEPS.length))}
          className={`${focusRing} rounded-lg bg-[#9B191F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1419] disabled:cursor-not-allowed disabled:opacity-45 dark:bg-red-700 dark:hover:bg-red-600`}
        >
          {stepIndex === 0 ? "Start pipeline" : "Next step"}
        </button>
        <button
          type="button"
          onClick={() => setStepIndex(0)}
          className={`${focusRing} rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800`}
        >
          Restart
        </button>
      </div>
    </LabShell>
  );
}

const VERCEL_STEPS = [
  {
    id: "push",
    label: "git push",
    detail: "Your commit lands on GitHub.",
  },
  {
    id: "detect",
    label: "Vercel detects",
    detail: "The connected project notices the new commit on main.",
  },
  {
    id: "build",
    label: "Build",
    detail: "Vercel installs dependencies and runs the production build.",
  },
  {
    id: "live",
    label: "Live URL",
    detail: "A public HTTPS URL updates when the build succeeds.",
  },
] as const;

export function VercelPipelineLab() {
  const [stepIndex, setStepIndex] = useState(0);
  const complete = stepIndex >= VERCEL_STEPS.length;

  return (
    <LabShell
      eyebrow="Deploy pipeline"
      title="Push → build → live URL"
      description="After the project is connected once, every meaningful push can become a new production deployment."
    >
      <ol className="grid gap-2 sm:grid-cols-4" aria-label="Vercel deploy steps">
        {VERCEL_STEPS.map((step, index) => {
          const active = stepIndex === index;
          const done = stepIndex > index;
          return (
            <li
              key={step.id}
              aria-current={active ? "step" : undefined}
              className={`rounded-xl border px-3 py-3 ${
                active
                  ? "border-[#9B191F] bg-[#9B191F]/5 dark:border-red-400 dark:bg-[#9B191F]/20"
                  : done
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                    : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950/50"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {index + 1}
              </span>
              <p className="mt-1 text-sm font-semibold text-zinc-950 dark:text-white">
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>

      <div
        className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30"
        aria-live="polite"
      >
        {complete ? (
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Your site is live. Open the production URL and test{" "}
            <code>/</code> and <code>/about</code>.
          </p>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Pipeline
            </p>
            <p className="mt-1 text-base font-semibold text-zinc-950 dark:text-white">
              {VERCEL_STEPS[stepIndex].label}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {VERCEL_STEPS[stepIndex].detail}
            </p>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={complete}
          onClick={() =>
            setStepIndex((current) => Math.min(current + 1, VERCEL_STEPS.length))
          }
          className={`${focusRing} rounded-lg bg-[#9B191F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1419] disabled:cursor-not-allowed disabled:opacity-45 dark:bg-red-700 dark:hover:bg-red-600`}
        >
          {stepIndex === 0 ? "Start deploy flow" : "Next step"}
        </button>
        <button
          type="button"
          onClick={() => setStepIndex(0)}
          className={`${focusRing} rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800`}
        >
          Restart
        </button>
      </div>
    </LabShell>
  );
}

export function SkillsTogglePreview() {
  const [showSkills, setShowSkills] = useState(false);

  return (
    <LabShell
      eyebrow="Expected result"
      title="Try the feature before you build it"
      description="One click changes state. React renders again and either adds or removes the skills from the screen."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200"
              aria-hidden="true"
            >
              A
            </div>
            <div>
              <p className="font-bold text-zinc-950 dark:text-white">
                Alex&apos;s Profile
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                React beginner
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSkills((isOpen) => !isOpen)}
            aria-expanded={showSkills}
            aria-controls="preview-skills"
            className={[
              focusRing,
              "mt-5 rounded-lg bg-[#9B191F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1419] dark:bg-red-700 dark:hover:bg-red-600",
            ].join(" ")}
          >
            {showSkills ? "Hide Skills ▲" : "Show My Skills ▼"}
          </button>

          {showSkills && (
            <div id="preview-skills" className="mt-4 flex flex-wrap gap-2">
              {["React", "Next.js", "Tailwind CSS"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </article>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            State right now
          </p>
          <code className="mt-3 block rounded-lg bg-zinc-950 p-3 text-sm text-emerald-300">
            showSkills = {String(showSkills)}
          </code>
          <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {showSkills
              ? "true means React includes the skill badges in this render."
              : "false means React leaves the skill badges out of this render."}
          </p>
        </div>
      </div>
    </LabShell>
  );
}

/**
 * Day 1 — Tailwind CSS Styling
 * Utility-first classes in JSX — no separate CSS files for beginners.
 */

import { CodeBlock } from "@/components/ui/CodeBlock";
import { ProTip } from "@/components/ui/ProTip";
import { Section } from "@/components/ui/Section";
import { Warning } from "@/components/ui/Warning";

const CLASS_BREAKDOWN = [
  { cls: "bg-white", meaning: "background white" },
  { cls: "p-4", meaning: "padding of 4 units" },
  { cls: "rounded-xl", meaning: "very rounded corners" },
  { cls: "shadow-lg", meaning: "large drop shadow" },
] as const;

export function TailwindStylingSection() {
  return (
    <Section id="tailwind-styling" number={6} title="Tailwind CSS Styling">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        Making it look less ugly
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">Tailwind CSS</h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/90">
          Making it look less ugly
        </p>
        <p className="mt-2 text-sm italic text-white/80">
          (No separate CSS files. No switching tabs. Just classes.)
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Styling at the speed of thought
      </h3>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Old way — flip between HTML and CSS files
          </p>
          <CodeBlock
            title="styles.css + JSX"
            code={`/* styles.css */
.card {
  background: white;
  padding: 16px;
  border-radius: 12px;
}

// JSX
<div className="card">...</div>`}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Tailwind — utility-first, right in the class name
          </p>
          <CodeBlock
            title="One file. Read the classes."
            code={`<div className="bg-white p-4 rounded-xl shadow-lg">
  ...
</div>

// Read the class names.
// They say exactly what they do.`}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Decode one line of Tailwind
      </h3>
      <CodeBlock
        title="className breakdown"
        code={`<div className="bg-white p-4 rounded-xl shadow-lg">
  ...
</div>`}
      />

      <div className="grid gap-2 sm:grid-cols-2">
        {CLASS_BREAKDOWN.map(({ cls, meaning }) => (
          <div
            key={cls}
            className="flex items-center gap-3 rounded-lg border border-black/10 bg-zinc-50 px-3 py-2.5 dark:border-white/10 dark:bg-zinc-900/60"
          >
            <code className="rounded bg-[#9B191F]/10 px-2 py-0.5 font-mono text-sm font-semibold text-[#9B191F]">
              {cls}
            </code>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              → {meaning}
            </span>
          </div>
        ))}
      </div>

      <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
        <li>Tailwind is designed to be readable.</li>
        <li>Classes read like English.</li>
        <li>
          When you forget a class, look it up in the{" "}
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#9B191F] underline hover:no-underline"
          >
            Tailwind documentation
          </a>
          .
        </li>
      </ul>

      {/* Cheatsheet resource */}
      <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          Handy: Tailwind CSS CheatSheet
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          &quot;Never memorize something that you can look up.&quot; Scan
          spacing, typography, flex, borders — copy the class you need.
        </p>
        <a
          href="https://www.creative-tim.com/twcomponents/cheatsheet"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#9B191F] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Open the CheatSheet
          <span aria-hidden>↗</span>
        </a>
      </div>

      {/* Preview only — full coding is Hands-on #04 */}
      <h3 className="text-lg font-semibold text-[#9B191F]">
        Peek: what a styled card can look like
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        You will build and style the real Profile Card in the Hands-on section
        next. Here is a preview of utility classes in action:
      </p>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-zinc-100 p-6 dark:border-white/10 dark:bg-zinc-950">
        <div className="max-w-sm rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-4 h-20 w-20 rounded-full bg-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Ahmad</h2>
          <p className="text-sm font-medium text-blue-600">Computer Science</p>
          <p className="mt-2 text-gray-600">Learning React and Next.js!</p>
        </div>
        <p className="mt-3 font-mono text-xs text-zinc-500">
          bg-white · p-6 · rounded-2xl · shadow-lg · text-2xl · font-bold
        </p>
      </div>

      <Warning title="Styles not showing up later?">
        Save the file — <strong>Cmd+S</strong> / <strong>Ctrl+S</strong>. Your
        create-next-app project already includes Tailwind.
      </Warning>

      <ProTip title="Starter classes">
        Common ones: <code>text-xl</code>, <code>font-bold</code>,{" "}
        <code>bg-blue-500</code>, <code>rounded-lg</code>, <code>p-4</code>,{" "}
        <code>mt-2</code>. Mix and match — that is the whole game.
      </ProTip>

      <div className="rounded-xl border-2 border-dashed border-[#9B191F]/30 p-5 text-center">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
          Theory done — time to build
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Next: Hands-on #00 → #04. Follow each step and use the Copy button on
          every code block.
        </p>
      </div>
    </Section>
  );
}

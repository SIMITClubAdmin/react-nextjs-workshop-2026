/**
 * Day 1 — Components (Bubble Tea theory)
 * Theory + structure. Props are the next section.
 */

import { CodeBlock } from "@/components/ui/CodeBlock";
import { ProTip } from "@/components/ui/ProTip";
import { Section } from "@/components/ui/Section";
import { Warning } from "@/components/ui/Warning";

export function ComponentsSection() {
  return (
    <Section id="components" number={4} title="Components">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        The bubble tea theory
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">Components</h3>
        <p className="mt-1 text-sm text-white/90">(The Bubble Tea Theory)</p>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Why component? Think bubble tea
      </h3>
      <p>
        Imagine your shop sells three drinks: avocado, strawberry, and brown
        sugar. Every order needs the same cup, lid, straw, and recipe — plus one
        unique topping.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
          <p className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            Traditional (vanilla HTML / CSS)
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            You copy the cup + lid + straw + recipe onto{" "}
            <strong>every page</strong>, then add avocado / strawberry / brown
            sugar.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#9B191F]">
            Need a new cup cover? Edit the code on every page. Painful.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40">
          <p className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            Component (React / Next.js)
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            You build the cup model <strong>once</strong> as a component. Reuse
            it everywhere.
          </p>
          <p className="mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            Need a new cup model? Change the component once — every drink
            updates.
          </p>
        </div>
      </div>

      <ProTip title="Speaker tip">
        Advice from us: stop rebuilding a brand-new cup from scratch every time.
        Make the template once. Reuse it. (Next section: how to pass different
        toppings with <strong>props</strong>.)
      </ProTip>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        The bubble tea analogy
      </h3>
      <ul className="list-inside list-disc space-y-2 text-sm">
        <li>
          A <strong>component</strong> = the standard cup + lid + straw +
          recipe.
        </li>
        <li>You make the template once. Every order uses the same template.</li>
        <li>Stop building a brand new cup from scratch every time.</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        React component structure (bubble tea edition)
      </h3>
      <p>
        Create your custom component under{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
          src/components/
        </code>
        :
      </p>

      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        3 things every component needs:
      </p>
      <ol className="list-inside list-decimal space-y-1 text-sm">
        <li>
          A <strong>function</strong> with a <strong>Capital Letter</strong> name
          (the cup recipe name)
        </li>
        <li>
          A <strong>return</strong> statement (what you hand to the customer)
        </li>
        <li>
          <strong>JSX</strong> inside the return (how the drink looks)
        </li>
      </ol>

      <CodeBlock
        title="src/components/BubbleTeaCup.jsx"
        code={`export default function BubbleTeaCup() {
  return (
    <div>
      <p>Cup + lid + straw</p>
      <h2>Milk Tea</h2>
    </div>
  );
}`}
      />

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Cup, lid, and straw live <strong>inside</strong> the component. Want a
        new lid design? Edit this file once — every place that uses{" "}
        <code>BubbleTeaCup</code> updates.
      </p>

      <Warning title="Capital letter matters">
        <code>&lt;bubbleTeaCup /&gt;</code> looks like a normal HTML tag to
        React. <code>&lt;BubbleTeaCup /&gt;</code> is your custom cup component.
        Always start component names with a capital letter.
      </Warning>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Components come in different forms
      </h3>
      <p className="italic text-zinc-600 dark:text-zinc-400">
        Same concept. Different purposes.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            React — custom components
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Ones <strong>you</strong> invent — like{" "}
            <code>BubbleTeaCup</code> or later <code>ProfileCard</code>. You own
            the template.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Next.js — built-in components
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <code>&lt;Link&gt;</code> — navigation without full page reload
            </li>
            <li>
              <code>&lt;Image /&gt;</code> — optimised images automatically
            </li>
            <li>
              <code>layout.js</code> — shared UI across pages
            </li>
          </ul>
          <p className="mt-3 text-xs text-zinc-500">
            More:{" "}
            <a
              href="https://nextjs.org/docs/app/api-reference/components"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9B191F] underline hover:no-underline"
            >
              nextjs.org/docs — Components
            </a>
          </p>
        </div>
      </div>

      <div className="rounded-xl border-2 border-dashed border-[#9B191F]/30 p-5 text-center">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
          Checkpoint
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Can you explain why building the cup once as a component beats copying
          HTML on every page? Next up: <strong>props</strong> — how to customise
          each order (and your profile card).
        </p>
      </div>
    </Section>
  );
}

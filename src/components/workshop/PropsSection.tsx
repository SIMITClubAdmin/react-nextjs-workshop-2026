/**
 * Day 1 — Props (how to customise your component)
 * Profile card scenarios from workshop slides + bubble tea simulator.
 */

import { BubbleTeaBuilder } from "@/components/games/BubbleTeaBuilder";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ProTip } from "@/components/ui/ProTip";
import { Section } from "@/components/ui/Section";

export function PropsSection() {
  return (
    <Section id="props" number={5} title="Props">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        How to customise your component
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">Props</h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/90">
          How to customise your component
        </p>
        <p className="mt-2 text-sm text-white/80">
          (Back to personal profile info scenarios)
        </p>
      </div>

      <p>
        A component without props is stuck on one value — like a profile card
        that can only ever say &quot;Ahmad&quot;. Props let you pass different
        data into the same component.
      </p>

      {/* Before vs After */}
      <h3 className="text-lg font-semibold text-[#9B191F]">
        Props: before vs after
      </h3>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Without props — hardcoded, not reusable
          </p>
          <CodeBlock
            title="Always Ahmad. Forever."
            code={`function ProfileCard() {
  return <h2>Ahmad</h2> // Always Ahmad. Forever.
}`}
          />
          <p className="rounded-lg border border-[#9B191F]/40 bg-[#9B191F]/5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300">
            It&apos;s hardcoded. Even if you call it many times, it&apos;s still
            Ahmad — which is not useful.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            With props — flexible, reusable
          </p>
          <CodeBlock
            title="Same component · different people"
            code={`function ProfileCard({ name, course }) {
  return <h2>{name} — {course}</h2>
}

// Usage:
<ProfileCard name="Ahmad" course="CS" />
<ProfileCard name="Priya" course="Business" />`}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-300/70 bg-emerald-50/80 p-3 text-sm dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="font-semibold text-emerald-800 dark:text-emerald-300">
            A — receive
          </p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Create <code>name</code> and <code>course</code> with curly braces{" "}
            <code>{"{}"}</code> as boxes to receive the values.
          </p>
        </div>
        <div className="rounded-lg border border-emerald-300/70 bg-emerald-50/80 p-3 text-sm dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="font-semibold text-emerald-800 dark:text-emerald-300">
            B — pass
          </p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Pass the values with <code>name=&quot;Ahmad&quot;</code> and{" "}
            <code>course=&quot;CS&quot;</code> when you use the component.
          </p>
        </div>
      </div>

      {/* Parent → child */}
      <h3 className="text-lg font-semibold text-[#9B191F]">
        Props: parent and child components
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Think of props like a package the parent sends to the child.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <CodeBlock
          title="page.js — the parent"
          code={`// page.js (the parent)
// Uses the component, passes props:
<ProfileCard name="Ahmad" course="CS" />`}
        />
        <CodeBlock
          title="ProfileCard.js — the child"
          code={`// ProfileCard.js (the child)
// Receives and displays the props:
function ProfileCard({ name, course }) {
  return <div>{name} — {course}</div>
}`}
        />
      </div>

      <ProTip title="One-way street">
        Parent feeds data down. Child displays it. Data only flows{" "}
        <strong>one way</strong>: parent → child.
      </ProTip>

      {/* Bridge back to bubble tea + simulator */}
      <div className="rounded-xl border border-[#9B191F]/30 bg-gradient-to-br from-[#9B191F]/5 to-amber-50/80 p-4 dark:border-[#9B191F]/40 dark:from-[#9B191F]/15 dark:to-zinc-900">
        <p className="text-lg font-bold text-[#9B191F]">
          Play: one component · three pages
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Top: change lid, cup, or straw in the{" "}
          <strong>component</strong> — all three cups update together. Bottom:
          each pretend page has its own <strong>props</strong> (flavour,
          pearls, sugar).
        </p>
      </div>

      <CodeBlock
        language="jsx"
        title="Same component on three pages"
        code={`// Home, About, Menu — all import BubbleTeaCup
<BubbleTeaCup flavour="Milk" sugar="50%" pearls />
<BubbleTeaCup flavour="Green" sugar="100%" pearls />
<BubbleTeaCup flavour="Black" sugar="0%" />`}
      />

      <BubbleTeaBuilder />

      <div className="rounded-xl border-2 border-dashed border-[#9B191F]/30 p-5 text-center">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
          Checkpoint
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Swap the pink lid — did Home, About, and Menu all change? Now change
          only Home&apos;s sugar. That&apos;s component vs props. Next up:{" "}
          <strong>Tailwind CSS</strong> — make the card look less ugly.
        </p>
      </div>
    </Section>
  );
}

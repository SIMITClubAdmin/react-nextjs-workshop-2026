/**
 * Day 1 — Hands-on #00 → #04 (+ summary)
 * Steps and copy-paste code follow the workshop PDF.
 */

import { CodeBlock } from "@/components/ui/CodeBlock";
import { ProTip } from "@/components/ui/ProTip";
import { Section } from "@/components/ui/Section";
import { Warning } from "@/components/ui/Warning";
import { DAY2_DATE } from "@/config/workshopState";

export function HandsOn00Section() {
  return (
    <Section id="hands-on-00" number={7} title="Hands-on #00 — Clean Up Before Build">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        ~2 minutes
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">Clean Up Before Build</h3>
        <p className="mt-1 text-sm text-white/85">Delete the boilerplate. Make room for your code.</p>
      </div>

      <p>
        The default Next.js screen is the <strong>boilerplate</strong>. It proves
        your install worked — now we delete it.
      </p>

      <h3 className="text-lg font-semibold text-[#9B191F]">Exercise</h3>
      <ol className="list-inside list-decimal space-y-2 text-sm">
        <li>
          Open{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            src/app/page.js
          </code>{" "}
          and delete <strong>EVERYTHING</strong>.
        </li>
        <li>Write the code below (copy → paste into VS Code):</li>
      </ol>

      <CodeBlock
        title="src/app/page.js"
        code={`export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <h1>My Workspace</h1>
    </main>
  );
}`}
      />

      <ol className="list-inside list-decimal space-y-2 text-sm" start={3}>
        <li>
          Navigate to{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            localhost:3000/about
          </code>{" "}
          in your browser and test it.
        </li>
      </ol>

      <div className="rounded-xl border border-[#9B191F]/30 bg-[#9B191F]/5 p-5 text-center dark:bg-[#9B191F]/10">
        <p className="text-xl font-bold text-[#9B191F]">HUH?!!</p>
        <p className="mt-1 font-semibold text-zinc-800 dark:text-zinc-200">
          My screen show nothing tho…
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          How to test???
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Build &amp; test — how we make it live in local
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        The <code>/about</code> page does not exist yet — so you saw nothing (or a
        404). First make the <strong>Home</strong> page live with the dev server,
        then open <code>localhost:3000</code> (not <code>/about</code> yet).
      </p>

      <CodeBlock title="Terminal" language="bash" code={`npm run dev`} />

      <p className="text-sm">
        Then open{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
          http://localhost:3000
        </code>
        . You should see <strong>My Workspace</strong>.
      </p>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Development vs production
      </h3>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Development
          </p>
          <code className="mt-1 block text-xs text-[#9B191F]">npm run dev</code>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            Hot reload, detailed errors. Larger / slower — best while coding.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Production build
          </p>
          <code className="mt-1 block text-xs text-[#9B191F]">npm run build</code>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            Optimizes for speed — minify, images, static files.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Production preview
          </p>
          <code className="mt-1 block text-xs text-[#9B191F]">npm run start</code>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            Runs the optimized build — closest to what users see live.
          </p>
        </div>
      </div>

      <ProTip title="Speaker tip">
        Stay on <code>npm run dev</code> for the whole workshop today. Build /
        start matter more when we deploy on Day 2.
      </ProTip>
    </Section>
  );
}

export function HandsOn01Section() {
  return (
    <Section
      id="hands-on-01"
      number={8}
      title="Hands-on #01 — Build Your ProfileCard Component"
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        ~10 minutes
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">
          Build Your ProfileCard Component
        </h3>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">Exercise</h3>
      <ol className="list-inside list-decimal space-y-2 text-sm">
        <li>
          Create{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            src/components/ProfileCard.js
          </code>
        </li>
        <li>
          Write a function component that accepts props:{" "}
          <code>name</code>, <code>course</code>, <code>description</code>,{" "}
          <code>image</code> (we start with text props first; image comes in
          Hands-on #02).
        </li>
        <li>Display the props in your JSX.</li>
      </ol>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Copy this starter (workshop slide uses <code>title</code> /{" "}
        <code>desc</code> for course + description):
      </p>

      <CodeBlock
        title="src/components/ProfileCard.js"
        code={`export function ProfileCard({ name, title, desc }) {
  return (
    <div className="flex items-center gap-4 text-gray-900">
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{title}</p>
        <p className="mt-1 text-sm">{desc}</p>
      </div>
    </div>
  );
}`}
      />

      <h3 className="text-lg font-semibold text-[#9B191F]">
        How every element works
      </h3>
      <ul className="space-y-3 text-sm">
        <li>
          <code className="text-[#9B191F]">export function ProfileCard(…)</code>{" "}
          — creates a reusable component other files can import.
        </li>
        <li>
          <code className="text-[#9B191F]">{"{ name, title, desc }"}</code> —{" "}
          <strong>props</strong> boxes. Parent pages pass values in; this
          component receives them.
        </li>
        <li>
          <code className="text-[#9B191F]">return ( … )</code> — what React shows
          on screen (must return JSX).
        </li>
        <li>
          Outer <code>div</code> with <code>flex items-center gap-4</code> —
          lays content in a row with spacing (room for a photo later).
        </li>
        <li>
          <code>{"{name}"}</code>, <code>{"{title}"}</code>,{" "}
          <code>{"{desc}"}</code> — curly braces inject the prop values into
          JSX.
        </li>
        <li>
          Tailwind classes like <code>text-xl</code>, <code>font-semibold</code>
          , <code>text-gray-600</code> — style without a separate CSS file.
        </li>
      </ul>

      <div className="rounded-xl border border-dashed border-[#9B191F]/40 p-4 text-center">
        <p className="font-semibold text-[#9B191F]">How about image???</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Next hands-on — the Next.js <code>&lt;Image /&gt;</code> component.
        </p>
      </div>
    </Section>
  );
}

export function HandsOn02Section() {
  return (
    <Section
      id="hands-on-02"
      number={9}
      title="Hands-on #02 — The Next.js <Image /> Component"
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        ~10 minutes
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">
          The Next.js {"<Image />"} Component
        </h3>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Why use {"<Image />"}?
      </h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Standard {"<img>"} tag
          </p>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            Unoptimized, slow, layout shifts.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Next.js {"<Image />"} tag
          </p>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            Automatic resizing, lazy loading, WebP format.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">Exercise</h3>
      <ol className="list-inside list-decimal space-y-2 text-sm">
        <li>
          Drop a photo into the{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            public/
          </code>{" "}
          folder (example: <code>public/alex.png</code>).
        </li>
        <li>
          Import Image:{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            import Image from &quot;next/image&quot;
          </code>
        </li>
        <li>Add a parameter into the function (<code>imageSrc</code>).</li>
        <li>Then add {"<Image />"} to your component.</li>
      </ol>

      <CodeBlock
        title="src/components/ProfileCard.js"
        code={`import Image from "next/image";

export function ProfileCard({ name, title, desc, imageSrc }) {
  return (
    <div className="flex items-center gap-4 text-gray-900">
      <Image
        src={imageSrc}
        alt={name}
        width={96}
        height={96}
      />

      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{title}</p>
        <p className="mt-1 text-sm">{desc}</p>
      </div>
    </div>
  );
}`}
      />

      <ProTip title="public/ paths">
        File at <code>public/alex.png</code> → use{" "}
        <code>imageSrc=&quot;/alex.png&quot;</code> (leading slash, no{" "}
        <code>public</code> in the path).
      </ProTip>

      <div className="rounded-xl border-2 border-dashed border-[#9B191F]/30 p-5 text-center">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
          Now see yourself on your own website
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          After Hands-on #03 wires the About page, your photo will show on{" "}
          <code>/about</code>.
        </p>
      </div>
    </Section>
  );
}

export function HandsOn03Section() {
  return (
    <Section
      id="hands-on-03"
      number={10}
      title='Hands-on #03 — Adding an "About Me" Route'
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        ~10 minutes
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">
          Adding an &quot;About Me&quot; Route
        </h3>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">Exercise — part A</h3>
      <ol className="list-inside list-decimal space-y-2 text-sm">
        <li>
          Create folder:{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            src/app/about/
          </code>
        </li>
        <li>
          Create file:{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            src/app/about/page.js
          </code>
        </li>
        <li>
          In your main{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            page.js
          </code>
          , add a navigation button:
        </li>
      </ol>

      <CodeBlock
        title="src/app/page.js"
        code={`import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <h1>My Workspace</h1>

      <Link href="/about">Go to About Me</Link>
    </main>
  );
}`}
      />

      <h3 className="text-lg font-semibold text-[#9B191F]">Exercise — part B</h3>
      <ol className="list-inside list-decimal space-y-2 text-sm">
        <li>
          Go to{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            src/app/about/page.js
          </code>
        </li>
        <li>Import and use your ProfileCard component on the about page:</li>
      </ol>

      <CodeBlock
        title="src/app/about/page.js"
        code={`import { ProfileCard } from "@/components/ProfileCard";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <ProfileCard
        name="Alex"
        title="Computer Science Student"
        desc="Learning React and Next.js!"
        imageSrc="/alex.png"
      />
    </main>
  );
}`}
      />

      <Warning title="Use your own details">
        Change <code>name</code>, <code>title</code>, <code>desc</code>, and{" "}
        <code>imageSrc</code> to match your photo filename in{" "}
        <code>public/</code>.
      </Warning>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Test: click <strong>Go to About Me</strong>, or open{" "}
        <code>http://localhost:3000/about</code>.
      </p>
    </Section>
  );
}

export function HandsOn04Section() {
  return (
    <Section
      id="hands-on-04"
      number={11}
      title="Hands-on #04 — Make Your Card Look Good"
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
        ~10 minutes
      </p>

      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">
          Make Your Card Look Good
        </h3>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">Exercise — must have</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            ProfileCard.js
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <code className="text-[#9B191F]">bg-white</code> — clean white card
            </li>
            <li>
              <code className="text-[#9B191F]">text-gray-800</code> — readable
              dark text
            </li>
            <li>
              <code className="text-[#9B191F]">p-6</code> — breathing room
            </li>
            <li>
              <code className="text-[#9B191F]">rounded-xl</code> — soft corners
            </li>
            <li>
              <code className="text-[#9B191F]">shadow-lg</code> — depth / “card”
              feel
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            about/page.js
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <code className="text-[#9B191F]">bg-gradient-to-br</code> —
              diagonal gradient
            </li>
            <li>
              <code className="text-[#9B191F]">from-blue-50</code> — light blue
              start
            </li>
            <li>
              <code className="text-[#9B191F]">to-indigo-100</code> — soft indigo
              end
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        Bonus points
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-amber-300/60 bg-amber-50/80 p-4 dark:border-amber-800 dark:bg-amber-950/30">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            ProfileCard.js
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <code>transition-all</code> — animate style changes
            </li>
            <li>
              <code>duration-300</code> — 300ms smooth feel
            </li>
            <li>
              <code>hover:shadow-2xl</code> — bigger shadow on hover
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-300/60 bg-amber-50/80 p-4 dark:border-amber-800 dark:bg-amber-950/30">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Image styles (on {"<Image />"})
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <code>rounded-full</code> — circle photo
            </li>
            <li>
              <code>object-cover</code> — crop nicely, no stretch
            </li>
            <li>
              <code>w-24 h-24</code> — fixed avatar size
            </li>
            <li>
              <code>shrink-0</code> — photo won’t get squished
            </li>
            <li>
              <code>ring-4 ring-blue-200</code> — soft colored ring
            </li>
            <li>
              <code>hover:scale-105</code> — slight zoom on hover
            </li>
          </ul>
        </div>
      </div>

      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Copy-paste — ProfileCard with must-have + bonus
      </p>
      <CodeBlock
        title="src/components/ProfileCard.js"
        code={`import Image from "next/image";

export function ProfileCard({ name, title, desc, imageSrc }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-6 text-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl">
      <Image
        src={imageSrc}
        alt={name}
        width={96}
        height={96}
        className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-blue-200 transition-all duration-300 hover:scale-105"
      />

      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{title}</p>
        <p className="mt-1 text-sm">{desc}</p>
      </div>
    </div>
  );
}`}
      />

      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Copy-paste — About page gradient
      </p>
      <CodeBlock
        title="src/app/about/page.js"
        code={`import { ProfileCard } from "@/components/ProfileCard";

export default function About() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <ProfileCard
        name="Alex"
        title="Computer Science Student"
        desc="Learning React and Next.js!"
        imageSrc="/alex.png"
      />
    </main>
  );
}`}
      />
    </Section>
  );
}

export function Day1SummarySection() {
  return (
    <Section id="day-1-summary" number={12} title="Summary — What's Next?">
      <div className="rounded-xl border border-black/10 bg-[#9B191F] p-5 text-center text-white dark:border-white/10">
        <h3 className="text-2xl font-bold tracking-tight">What&apos;s Next?</h3>
      </div>

      <h3 className="text-lg font-semibold text-[#9B191F]">
        What you just did
      </h3>
      <ul className="space-y-2 text-sm">
        <li>✅ Set up a real Next.js project</li>
        <li>
          ✅ Understood React components{" "}
          <strong>[Bubble Theory]</strong>
        </li>
        <li>✅ Passed data using props</li>
        <li>✅ Created multiple pages with file-based routing</li>
        <li>✅ Styled with Tailwind CSS</li>
        <li>
          ✅ Used the Next.js <code>&lt;Image /&gt;</code> component{" "}
          <strong>[Hands-on #02]</strong>
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-[#9B191F]">Day 2 teaser</h3>
      <ul className="list-inside list-disc space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        <li>
          <strong>State</strong> — making buttons actually do things (click →
          something changes → it&apos;s interactive)
        </li>
        <li>
          <strong>Deploying to Vercel</strong> — your site goes live (real URL.
          Show your mum. Put it on LinkedIn.)
        </li>
      </ul>

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
        <p className="font-semibold text-amber-900 dark:text-amber-200">
          Homework before Day 2 ({DAY2_DATE})
        </p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-amber-900/90 dark:text-amber-100/90">
          <li>
            Create a free account at{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              vercel.com
            </a>
          </li>
          <li>Connect it to your GitHub account</li>
          <li>Push your project to GitHub</li>
        </ol>
        <p className="mt-3 text-sm text-amber-900/90 dark:text-amber-100/90">
          Need step-by-step help? Go back to the{" "}
          <a
            href="/#before-day-2"
            className="font-semibold underline hover:no-underline"
          >
            Home page → Before Day 2
          </a>{" "}
          prerequisites — GitHub signup, link VS Code, and create a Vercel
          account (with the walkthrough videos).
        </p>
      </div>
    </Section>
  );
}

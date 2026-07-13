/**
 * Day 2 topic sections — one component per sidebar page.
 */

import { StateVisualizer } from "@/components/games/StateVisualizer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ProTip } from "@/components/ui/ProTip";
import { Section } from "@/components/ui/Section";
import { Warning } from "@/components/ui/Warning";

export function UseStateSection() {
  return (
    <Section id="use-state" number={1} title="useState — Adding Interactivity">
      <p>
        Yesterday we built a <em>static</em> profile card — it never changes.
        Today we learn <strong>useState</strong>, which lets components remember
        and update values (like a like-counter or dark mode toggle).
      </p>

      <Warning title="Did you put 'use client' at the top?">
        Any component that uses useState MUST start with{" "}
        <code>&quot;use client&quot;</code> as the very first line. Without it,
        you will get a confusing error. This tells Next.js the component runs in
        the browser, not on the server.
      </Warning>

      <p>Let us add a &quot;likes&quot; counter to the profile card:</p>

      <CodeBlock
        title="ProfileCard.tsx"
        code={`"use client";

import { useState } from "react";

export function ProfileCard({ name, title, bio }: ProfileCardProps) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="max-w-sm rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm text-blue-600">{title}</p>
      <p className="mt-2 text-gray-600">{bio}</p>
      <button
        onClick={() => setLikes(likes + 1)}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
      >
        ❤️ {likes} likes
      </button>
    </div>
  );
}`}
      />

      <ProTip>
        <code>useState(0)</code> creates a variable <code>likes</code> starting
        at 0, and a function <code>setLikes</code> to update it. Every time you
        call <code>setLikes</code>, React re-renders the component with the new
        value.
      </ProTip>

      <StateVisualizer />
    </Section>
  );
}

export function UseEffectFetchSection() {
  return (
    <Section
      id="use-effect-fetch"
      number={2}
      title="useEffect & Fetch — Loading Data from APIs"
    >
      <p>
        Real apps load data from the internet (weather, user profiles, posts).
        We use <strong>useEffect</strong> to fetch data when the component first
        appears, and <strong>fetch()</strong> to call an API.
      </p>

      <p>Let us fetch a random quote and display it on the profile card:</p>

      <CodeBlock
        title="ProfileCard.tsx"
        code={`"use client";

import { useState, useEffect } from "react";

export function ProfileCard({ name, title, bio }: ProfileCardProps) {
  const [likes, setLikes] = useState(0);
  const [quote, setQuote] = useState("Loading quote...");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote("Could not load quote."));
  }, []); // empty array = run once on mount

  return (
    <div className="max-w-sm rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="mt-4 italic text-gray-500">&quot;{quote}&quot;</p>
      <button onClick={() => setLikes(likes + 1)}>
        ❤️ {likes} likes
      </button>
    </div>
  );
}`}
      />

      <Warning title="API not working?">
        Check your internet connection. The free quotable.io API sometimes
        rate-limits requests. If it fails, that is okay — the important thing is
        understanding the <code>useEffect</code> + <code>fetch</code> pattern.
      </Warning>

      <ProTip title="What does the empty [] mean?">
        The <code>[]</code> at the end of useEffect means &quot;only run this
        once when the component first loads.&quot; Without it, the fetch would
        run on every render — causing an infinite loop!
      </ProTip>
    </Section>
  );
}

export function GitDeploySection() {
  return (
    <Section id="git-deploy" number={3} title="Git, GitHub & Vercel Deployment">
      <p>
        Time to put your project on the internet! We will use{" "}
        <strong>Git</strong> to track changes, <strong>GitHub</strong> to store
        the code online, and <strong>Vercel</strong> to host the live website.
      </p>

      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Step 1: Initialize Git
      </h3>
      <CodeBlock
        language="bash"
        title="Terminal"
        code={`git init
git add .
git commit -m "My profile card project"`}
      />

      <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Step 2: Push to GitHub
      </h3>
      <p className="text-sm">
        Create a new repository on{" "}
        <a
          href="https://github.com/new"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9B191F] underline hover:no-underline"
        >
          github.com/new
        </a>
        , then run:
      </p>
      <CodeBlock
        language="bash"
        title="Terminal"
        code={`git remote add origin https://github.com/YOUR_USERNAME/my-profile-card.git
git branch -M main
git push -u origin main`}
      />

      <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Step 3: Deploy on Vercel
      </h3>
      <ol className="list-inside list-decimal space-y-2 text-sm">
        <li>
          Go to{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9B191F] underline hover:no-underline"
          >
            vercel.com
          </a>{" "}
          and sign in with GitHub.
        </li>
        <li>Click &quot;Add New Project&quot; and import your repository.</li>
        <li>Click &quot;Deploy&quot; — Vercel handles the rest!</li>
        <li>
          In about 60 seconds, you will get a live URL like{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">
            my-profile-card.vercel.app
          </code>
        </li>
      </ol>

      <Warning title="git push asks for username/password?">
        GitHub no longer accepts passwords for git operations. Ask a facilitator
        to help you set up a Personal Access Token, or use GitHub Desktop as an
        easier alternative.
      </Warning>

      <div className="mt-6 rounded-xl border-2 border-dashed border-[#9B191F]/30 p-6 text-center">
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Congratulations!
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          You built a React app, made it interactive, fetched live data, and
          deployed it to the internet. That is a full-stack developer workflow —
          great job!
        </p>
      </div>
    </Section>
  );
}

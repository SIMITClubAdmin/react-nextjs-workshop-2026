import Link from "next/link";
import { notFound } from "next/navigation";
import { TopicPager } from "@/components/workshop/TopicPager";
import {
  GitDeploySection,
  UseEffectFetchSection,
  UseStateSection,
} from "@/components/workshop/Day2Sections";
import {
  DAY2_TOPICS,
  isValidTopic,
  topicHref,
} from "@/config/curriculum";
import type { ReactNode } from "react";

const DAY2_CONTENT: Record<string, ReactNode> = {
  "use-state": <UseStateSection />,
  "use-effect-fetch": <UseEffectFetchSection />,
  "git-deploy": <GitDeploySection />,
};

export function generateStaticParams() {
  return DAY2_TOPICS.map((t) => ({ topic: t.id }));
}

export default async function Day2TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  if (!isValidTopic(DAY2_TOPICS, topic) || !DAY2_CONTENT[topic]) {
    notFound();
  }

  const meta = DAY2_TOPICS.find((t) => t.id === topic)!;
  const index = DAY2_TOPICS.findIndex((t) => t.id === topic);

  return (
    <>
      <div className="mb-6">
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
          Day 2 · Topic {index + 1} of {DAY2_TOPICS.length}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href={topicHref("day-2", DAY2_TOPICS[0].id)}
            className="hover:underline"
          >
            Interactivity, APIs &amp; Deployment
          </Link>
          <span className="mx-1.5">/</span>
          {meta.label}
        </p>
      </div>

      {index === 0 && (
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/40">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Pick up where you left off
          </p>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
            Open your <strong>my-profile-card</strong> project from yesterday.
            Run{" "}
            <code className="rounded bg-blue-100 px-1 font-mono text-xs dark:bg-blue-900">
              npm run dev
            </code>{" "}
            to start the dev server, then follow today&apos;s topics.
          </p>
        </div>
      )}

      {DAY2_CONTENT[topic]}

      <TopicPager day="day-2" topics={DAY2_TOPICS} topicId={topic} />
    </>
  );
}

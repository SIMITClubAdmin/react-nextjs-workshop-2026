import Link from "next/link";
import { notFound } from "next/navigation";
import { TopicPager } from "@/components/workshop/TopicPager";
import { ComponentsSection } from "@/components/workshop/ComponentsSection";
import {
  Day1SummarySection,
  HandsOn00Section,
  HandsOn01Section,
  HandsOn02Section,
  HandsOn03Section,
  HandsOn04Section,
} from "@/components/workshop/Day1HandsOnSections";
import { FileStructureSection } from "@/components/workshop/FileStructureSection";
import { ProjectSetupSection } from "@/components/workshop/ProjectSetupSection";
import { PropsSection } from "@/components/workshop/PropsSection";
import { TailwindStylingSection } from "@/components/workshop/TailwindStylingSection";
import { WhatIsJsxSection } from "@/components/workshop/WhatIsJsxSection";
import {
  DAY1_TOPICS,
  isValidTopic,
  topicHref,
} from "@/config/curriculum";
import type { ReactNode } from "react";

const DAY1_CONTENT: Record<string, ReactNode> = {
  "project-setup": <ProjectSetupSection />,
  "what-is-jsx": <WhatIsJsxSection />,
  "file-structure": <FileStructureSection />,
  components: <ComponentsSection />,
  props: <PropsSection />,
  "tailwind-styling": <TailwindStylingSection />,
  "hands-on-00": <HandsOn00Section />,
  "hands-on-01": <HandsOn01Section />,
  "hands-on-02": <HandsOn02Section />,
  "hands-on-03": <HandsOn03Section />,
  "hands-on-04": <HandsOn04Section />,
  "day-1-summary": <Day1SummarySection />,
};

export function generateStaticParams() {
  return DAY1_TOPICS.map((t) => ({ topic: t.id }));
}

export default async function Day1TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  if (!isValidTopic(DAY1_TOPICS, topic) || !DAY1_CONTENT[topic]) {
    notFound();
  }

  const meta = DAY1_TOPICS.find((t) => t.id === topic)!;
  const index = DAY1_TOPICS.findIndex((t) => t.id === topic);

  return (
    <>
      <div className="mb-6">
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#9B191F]">
          Day 1 · Topic {index + 1} of {DAY1_TOPICS.length}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href={topicHref("day-1", DAY1_TOPICS[0].id)}
            className="hover:underline"
          >
            Foundations
          </Link>
          <span className="mx-1.5">/</span>
          {meta.label}
        </p>
      </div>

      {DAY1_CONTENT[topic]}

      <TopicPager day="day-1" topics={DAY1_TOPICS} topicId={topic} />
    </>
  );
}

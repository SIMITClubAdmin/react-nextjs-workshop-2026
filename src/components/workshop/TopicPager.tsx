import Link from "next/link";
import {
  getTopicIndex,
  topicHref,
  type CurriculumTopic,
} from "@/config/curriculum";

type TopicPagerProps = {
  day: "day-1" | "day-2";
  topics: CurriculumTopic[];
  topicId: string;
};

export function TopicPager({ day, topics, topicId }: TopicPagerProps) {
  const index = getTopicIndex(topics, topicId);
  if (index < 0) return null;

  const prev = topics[index - 1];
  const next = topics[index + 1];

  return (
    <nav
      className="mt-10 flex items-stretch justify-between gap-3 border-t border-black/10 pt-6 dark:border-white/10"
      aria-label="Topic pagination"
    >
      {prev ? (
        <Link
          href={topicHref(day, prev.id)}
          className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm transition-colors hover:border-[#9B191F]/40 hover:bg-[#9B191F]/5 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-[#9B191F]/10"
        >
          <span className="block text-xs text-zinc-400">Previous</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            ← {prev.label}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={topicHref(day, next.id)}
          className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-right text-sm transition-colors hover:border-[#9B191F]/40 hover:bg-[#9B191F]/5 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-[#9B191F]/10"
        >
          <span className="block text-xs text-zinc-400">Next</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {next.label} →
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}

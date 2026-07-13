/**
 * Shared curriculum topic lists — used by Sidebar and day/[topic] routes.
 * `id` must match the URL segment: /day-1/[id], /day-2/[id]
 */

export type CurriculumTopic = {
  id: string;
  label: string;
};

export const DAY1_TOPICS: CurriculumTopic[] = [
  { id: "project-setup", label: "Project Setup Time" },
  { id: "what-is-jsx", label: "What is JSX?" },
  { id: "file-structure", label: "File Structure" },
  { id: "components", label: "Components" },
  { id: "props", label: "Props" },
  { id: "tailwind-styling", label: "Tailwind CSS Styling" },
  { id: "hands-on-00", label: "Hands-on #00 — Clean Up" },
  { id: "hands-on-01", label: "Hands-on #01 — ProfileCard" },
  { id: "hands-on-02", label: "Hands-on #02 — Image" },
  { id: "hands-on-03", label: "Hands-on #03 — About Route" },
  { id: "hands-on-04", label: "Hands-on #04 — Style Card" },
  { id: "day-1-summary", label: "Summary — What's Next?" },
];

export const DAY2_TOPICS: CurriculumTopic[] = [
  { id: "use-state", label: "useState — Interactivity" },
  { id: "use-effect-fetch", label: "useEffect & Fetch" },
  { id: "git-deploy", label: "Git, GitHub & Vercel" },
];

export function topicHref(day: "day-1" | "day-2", topicId: string) {
  return `/${day}/${topicId}`;
}

export function getTopicIndex(
  topics: CurriculumTopic[],
  topicId: string
): number {
  return topics.findIndex((t) => t.id === topicId);
}

export function isValidTopic(
  topics: CurriculumTopic[],
  topicId: string
): boolean {
  return topics.some((t) => t.id === topicId);
}

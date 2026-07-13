import { redirect } from "next/navigation";
import { DAY1_TOPICS, topicHref } from "@/config/curriculum";

/** /day-1 → first topic page */
export default function Day1IndexPage() {
  redirect(topicHref("day-1", DAY1_TOPICS[0].id));
}

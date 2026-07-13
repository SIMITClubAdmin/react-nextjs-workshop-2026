import { redirect } from "next/navigation";
import { DAY2_TOPICS, topicHref } from "@/config/curriculum";

/** /day-2 → first topic page */
export default function Day2IndexPage() {
  redirect(topicHref("day-2", DAY2_TOPICS[0].id));
}

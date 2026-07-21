import { WorkshopLayout } from "@/components/layout/WorkshopLayout";
import { Day1RecapSection } from "@/components/workshop/Day1RecapSection";

export default function Day1RecapPage() {
  return (
    <WorkshopLayout>
      <h1 className="sr-only">Day 1 — Recap</h1>
      <Day1RecapSection />
    </WorkshopLayout>
  );
}

"use client";

import { WorkshopLayout } from "@/components/layout/WorkshopLayout";
import { LockedDayOverlay } from "@/components/ui/LockedDayOverlay";
import { Day2RecapSection } from "@/components/workshop/Day2RecapSection";
import { DAY2_RECAP_UNLOCK_LABEL } from "@/config/workshopState";
import { useDay2RecapUnlocked } from "@/hooks/useDay2RecapUnlocked";

export default function Day2RecapPage() {
  const unlocked = useDay2RecapUnlocked();

  if (!unlocked) {
    return (
      <WorkshopLayout>
        <LockedDayOverlay
          title={`Day 2 Recap unlocks ${DAY2_RECAP_UNLOCK_LABEL}`}
          description="Hang tight — the Day 2 slide deck and recap resources open after midnight Singapore time on 23 Jul 2026. We will also ping Telegram when the files are uploaded."
          backHref="/day-2"
          backLabel="← Back to Day 2"
        />
      </WorkshopLayout>
    );
  }

  return (
    <WorkshopLayout>
      <h1 className="sr-only">Day 2 — Recap</h1>
      <Day2RecapSection />
    </WorkshopLayout>
  );
}

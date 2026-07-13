"use client";

/**
 * Day 2 layout — unlock gate + WorkshopLayout for all /day-2/* pages.
 */

import { WorkshopLayout } from "@/components/layout/WorkshopLayout";
import { LockedDayOverlay } from "@/components/ui/LockedDayOverlay";
import { DAY2_DATE } from "@/config/workshopState";
import { useDay2Unlocked } from "@/hooks/useDay2Unlocked";

export default function Day2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const day2Unlocked = useDay2Unlocked();

  if (!day2Unlocked) {
    return (
      <WorkshopLayout>
        <LockedDayOverlay
          title={`Day 2 is locked until ${DAY2_DATE}!`}
          description={`Come back on ${DAY2_DATE} when your facilitator unlocks Day 2 content. In the meantime, make sure your Day 1 profile card project is saved!`}
          backHref="/day-1"
          backLabel="← Back to Day 1"
        />
      </WorkshopLayout>
    );
  }

  return <WorkshopLayout>{children}</WorkshopLayout>;
}

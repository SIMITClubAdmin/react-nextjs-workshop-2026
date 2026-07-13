"use client";

/**
 * Day 1 layout — unlock gate + WorkshopLayout for all /day-1/* pages.
 */

import { WorkshopLayout } from "@/components/layout/WorkshopLayout";
import { LockedDayOverlay } from "@/components/ui/LockedDayOverlay";
import { DAY1_DATE } from "@/config/workshopState";
import { useDay1Unlocked } from "@/hooks/useDay1Unlocked";

export default function Day1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const day1Unlocked = useDay1Unlocked();

  if (!day1Unlocked) {
    return (
      <WorkshopLayout>
        <LockedDayOverlay
          title={`Day 1 is locked until ${DAY1_DATE}!`}
          description={`You can explore the home page and install the prerequisites now. Your facilitator will unlock Day 1 on ${DAY1_DATE}.`}
          backHref="/"
          backLabel="← Back to Home"
        />
      </WorkshopLayout>
    );
  }

  return <WorkshopLayout>{children}</WorkshopLayout>;
}

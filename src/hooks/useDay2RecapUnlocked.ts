"use client";

/**
 * Day 2 Recap unlocks automatically at 23 Jul 2026 00:00 Singapore time.
 * No redeploy needed once that clock passes.
 */

import { useSyncExternalStore } from "react";
import {
  DAY2_RECAP_UNLOCK_AT,
  isDay2RecapForceUnlocked,
} from "@/config/workshopState";

const unlockMs = new Date(DAY2_RECAP_UNLOCK_AT).getTime();

function readUnlocked(): boolean {
  if (isDay2RecapForceUnlocked) return true;
  return Date.now() >= unlockMs;
}

function subscribe(onStoreChange: () => void) {
  const remaining = unlockMs - Date.now();
  if (remaining <= 0) return () => {};

  // Wake once when the unlock moment arrives, plus a light poll as backup.
  const timeoutId = window.setTimeout(onStoreChange, remaining + 50);
  const intervalId = window.setInterval(onStoreChange, 30_000);
  return () => {
    window.clearTimeout(timeoutId);
    window.clearInterval(intervalId);
  };
}

export function useDay2RecapUnlocked(): boolean {
  return useSyncExternalStore(subscribe, readUnlocked, () => false);
}

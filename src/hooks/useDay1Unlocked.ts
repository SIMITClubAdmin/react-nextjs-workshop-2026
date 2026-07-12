"use client";

/**
 * Client-side hook that determines whether Day 1 is accessible.
 *
 * Priority order:
 * 1. localStorage override (set via /admin page) — per-browser only
 * 2. Hardcoded config in src/config/workshopState.ts — affects everyone after redeploy
 */

import { useEffect, useState } from "react";
import {
  DAY1_STORAGE_KEY,
  WORKSHOP_UNLOCK_EVENT,
  isDay1Unlocked as configDay1Unlocked,
} from "@/config/workshopState";

function readUnlocked(): boolean {
  const stored = localStorage.getItem(DAY1_STORAGE_KEY);
  if (stored === "true") return true;
  if (stored === "false") return false;
  return configDay1Unlocked;
}

export function useDay1Unlocked(): boolean {
  const [unlocked, setUnlocked] = useState(configDay1Unlocked);

  useEffect(() => {
    setUnlocked(readUnlocked());

    const sync = () => setUnlocked(readUnlocked());

    const handleStorage = (e: StorageEvent) => {
      if (e.key === DAY1_STORAGE_KEY || e.key === null) sync();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(WORKSHOP_UNLOCK_EVENT, sync);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(WORKSHOP_UNLOCK_EVENT, sync);
    };
  }, []);

  return unlocked;
}

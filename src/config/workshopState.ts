/**
 * ============================================================================
 * WORKSHOP STATE CONFIGURATION
 * ============================================================================
 *
 * This file controls whether Day 1 / Day 2 content is visible to ALL visitors
 * (when deployed to production). There is NO database — everything is
 * hardcoded or stored in the browser's localStorage.
 *
 * HOW ORGANIZERS SHOULD USE THIS:
 *
 * 1. BEFORE THE WORKSHOP (share the site early):
 *    Keep both `isDay1Unlocked` and `isDay2Unlocked` set to `false`.
 *    Students can open the home page and install prerequisites, but Day 1
 *    and Day 2 stay locked.
 *
 * 2. ON DAY 1 (15 Jul — permanent unlock for everyone):
 *    Change `isDay1Unlocked` to `true`, then redeploy (e.g. push to GitHub
 *    and let Vercel rebuild). Every student will see Day 1.
 *
 * 3. ON DAY 2 (22 Jul — permanent unlock for everyone):
 *    Change `isDay2Unlocked` to `true`, then redeploy. Every student will
 *    see Day 2.
 *
 * 4. TESTING (unlock for YOUR browser only):
 *    Visit the hidden admin page at `/admin` and unlock Day 1 / Day 2.
 *    This writes to localStorage and does NOT affect other students.
 * ============================================================================
 */

/** Workshop session dates (shown in locked-state messages). */
export const DAY1_DATE = "15 Jul 2026";
export const DAY2_DATE = "22 Jul 2026";

/** Set to `true` on Day 1 (15 Jul) and redeploy to unlock for everyone. */
export const isDay1Unlocked = false;

/** Set to `true` on Day 2 (22 Jul) and redeploy to unlock for everyone. */
export const isDay2Unlocked = false;

/** Key used in localStorage by the /admin page for per-browser Day 1 overrides. */
export const DAY1_STORAGE_KEY = "day1_unlocked";

/** Key used in localStorage by the /admin page for per-browser Day 2 overrides. */
export const DAY2_STORAGE_KEY = "day2_unlocked";

/** Fired on the same tab after /admin changes a day lock (storage events only cross tabs). */
export const WORKSHOP_UNLOCK_EVENT = "workshop-unlock-change";

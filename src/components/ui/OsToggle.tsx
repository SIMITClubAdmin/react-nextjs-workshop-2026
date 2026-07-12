"use client";

/**
 * macOS / Windows toggle for OS-specific workshop instructions.
 */

type Os = "macos" | "windows";

type OsToggleProps = {
  value: Os;
  onChange: (os: Os) => void;
};

export function OsToggle({ value, onChange }: OsToggleProps) {
  return (
    <div
      className="inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800"
      role="group"
      aria-label="Choose your operating system"
    >
      <button
        type="button"
        onClick={() => onChange("macos")}
        className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
          value === "macos"
            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"
            : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        macOS
      </button>
      <button
        type="button"
        onClick={() => onChange("windows")}
        className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
          value === "windows"
            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"
            : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        Windows
      </button>
    </div>
  );
}

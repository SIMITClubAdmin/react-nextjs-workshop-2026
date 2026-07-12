"use client";

/**
 * CSS confetti celebration for the /admin discovery moment.
 * No canvas — runs as soon as the page paints. Respects reduced-motion.
 */

const PIECES = [
  { left: "8%", delay: "0s", duration: "2.2s", color: "#9B191F", rotate: 20 },
  { left: "16%", delay: "0.05s", duration: "2.4s", color: "#F59E0B", rotate: -35 },
  { left: "24%", delay: "0.1s", duration: "2.1s", color: "#10B981", rotate: 50 },
  { left: "32%", delay: "0s", duration: "2.6s", color: "#3B82F6", rotate: -15 },
  { left: "40%", delay: "0.15s", duration: "2.3s", color: "#E11D48", rotate: 70 },
  { left: "48%", delay: "0.08s", duration: "2.5s", color: "#8B5CF6", rotate: -55 },
  { left: "56%", delay: "0.12s", duration: "2.2s", color: "#F97316", rotate: 30 },
  { left: "64%", delay: "0.03s", duration: "2.7s", color: "#9B191F", rotate: -40 },
  { left: "72%", delay: "0.18s", duration: "2.3s", color: "#10B981", rotate: 15 },
  { left: "80%", delay: "0.07s", duration: "2.4s", color: "#3B82F6", rotate: -70 },
  { left: "88%", delay: "0.14s", duration: "2.1s", color: "#F59E0B", rotate: 45 },
  { left: "12%", delay: "0.2s", duration: "2.8s", color: "#E11D48", rotate: -25 },
  { left: "28%", delay: "0.22s", duration: "2.5s", color: "#8B5CF6", rotate: 60 },
  { left: "44%", delay: "0.25s", duration: "2.3s", color: "#F97316", rotate: -10 },
  { left: "60%", delay: "0.17s", duration: "2.6s", color: "#9B191F", rotate: 80 },
  { left: "76%", delay: "0.28s", duration: "2.2s", color: "#10B981", rotate: -45 },
  { left: "20%", delay: "0.3s", duration: "2.9s", color: "#3B82F6", rotate: 25 },
  { left: "52%", delay: "0.11s", duration: "2.4s", color: "#E11D48", rotate: -60 },
  { left: "68%", delay: "0.19s", duration: "2.5s", color: "#F59E0B", rotate: 35 },
  { left: "84%", delay: "0.24s", duration: "2.3s", color: "#8B5CF6", rotate: -20 },
] as const;

export function CelebrationBurst() {
  return (
    <div className="celebrate-burst" aria-hidden>
      {PIECES.map((piece, index) => (
        <span
          key={index}
          className="celebrate-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            ["--piece-rotate" as string]: `${piece.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

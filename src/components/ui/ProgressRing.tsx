"use client";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({
  progress,
  size = 76,
  strokeWidth = 6,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, progress));
  const offset = circumference - (clamped / 100) * circumference;
  const gradientId = `ring-grad-${size}`;

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="flex-shrink-0"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C08A3E" />
              <stop offset="100%" stopColor="#9C6E2E" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--line)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference - offset} ${circumference}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="transition-[stroke-dasharray] duration-[800ms] ease-out"
            style={{ filter: "drop-shadow(0 1px 3px rgba(192, 138, 62, 0.3))" }}
          />
        </svg>
        <div
          className="absolute inset-0 rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle at 35% 35%, #C08A3E, transparent 70%)",
          }}
        />
      </div>
      {label && (
        <div>
          <div className="font-serif text-2xl font-semibold">
            {clamped}%
          </div>
          <div className="text-[13px] text-ink-soft leading-snug">{label}</div>
        </div>
      )}
    </div>
  );
}

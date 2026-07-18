"use client";

interface MomentumBarProps {
  progress: number;
  value?: number;
  label?: string;
}

export function MomentumBar({ progress, value, label }: MomentumBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div>
      {value !== undefined && (
        <div className="font-mono text-2xl font-semibold mb-1 text-ink">
          {value}
        </div>
      )}
      <div className="h-2 bg-parchment-dim rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out relative"
          style={{
            width: `${clamped}%`,
            background: "linear-gradient(90deg, #6B7A5E 0%, #7D8E6E 50%, #6B7A5E 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(107,122,94,0.3)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 60%)",
            }}
          />
        </div>
      </div>
      {label && (
        <p className="text-[13px] text-ink-soft mt-2.5 leading-relaxed">{label}</p>
      )}
    </div>
  );
}

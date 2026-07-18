"use client";

interface MomentumBarProps {
  progress: number;
  value?: number;
  label?: string;
}

export function MomentumBar({ progress, value, label }: MomentumBarProps) {
  return (
    <div>
      {value !== undefined && (
        <div className="font-mono text-2xl font-semibold mb-0.5">
          {value}
        </div>
      )}
      <div className="h-1.5 bg-parchment-dim rounded-sm overflow-hidden">
        <div
          className="h-full bg-moss rounded-sm transition-[width] duration-500 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
          }}
        />
      </div>
      {label && (
        <p className="text-[13px] text-ink-soft mt-2.5">{label}</p>
      )}
    </div>
  );
}

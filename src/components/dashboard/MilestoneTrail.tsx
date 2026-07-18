"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: string;
  month: number;
  label: string;
  completed: boolean;
}

interface MilestoneTrailProps {
  milestones: Milestone[];
  pathTitle?: string;
  onToggle?: (id: string, completed: boolean) => void;
}

export function MilestoneTrail({
  milestones,
  pathTitle = "Your path",
  onToggle,
}: MilestoneTrailProps) {
  // Use props directly — no internal state to avoid sync issues
  const doneCount = useMemo(
    () => milestones.filter((m) => m.completed).length,
    [milestones]
  );

  const grouped = useMemo(() => {
    return milestones.reduce<Record<number, Milestone[]>>((acc, m) => {
      (acc[m.month] ||= []).push(m);
      return acc;
    }, {});
  }, [milestones]);

  if (milestones.length === 0) {
    return (
      <div className="bg-card border border-line rounded-card p-7 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber/60 via-amber to-amber/60" />
        <h3 className="font-serif text-xl font-semibold mb-3">
          Your roadmap
        </h3>
        <p className="text-ink-soft text-[14.5px] mb-5">
          Take the assessment to get your personalized 90-day roadmap with actionable milestones.
        </p>
        <a
          href="/assessment"
          className="inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 rounded-card bg-ink text-parchment hover:bg-amber-deep hover:shadow-[0_3px_12px_rgba(156,110,46,0.25)] hover:-translate-y-px active:translate-y-0 text-[15px] px-6 py-3"
        >
          Start assessment
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-baseline mb-5">
        <h3 className="font-serif text-xl font-semibold">
          Your roadmap: {pathTitle}
        </h3>
        <span className="font-mono text-[12.5px] text-ink-soft">
          {doneCount} of {milestones.length} milestones
        </span>
      </div>

      <div className="bg-card border border-line rounded-card overflow-hidden">
        {Object.entries(grouped).map(([month, monthMilestones]) => {
          const monthDone = monthMilestones.filter((m) => m.completed).length;
          return (
            <div
              key={month}
              className="py-6 px-7 border-b border-line last:border-b-0 group/month"
            >
              <div className="flex items-center justify-between mb-3.5">
                <span className="font-mono text-[11.5px] text-amber-deep uppercase tracking-[0.06em]">
                  Month {month}
                </span>
                <span className="font-mono text-[11px] text-ink-soft/60">
                  {monthDone}/{monthMilestones.length}
                </span>
              </div>
              <div className="space-y-0.5">
                {monthMilestones.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onToggle?.(m.id, !m.completed)}
                    className={cn(
                      "flex items-start gap-3.5 w-full text-left py-[10px] px-3 -mx-3 cursor-pointer select-none group bg-transparent border-none rounded-card transition-colors duration-150",
                      "hover:bg-parchment-dim/60"
                    )}
                  >
                    <div
                      className={cn(
                        "w-[18px] h-[18px] rounded-[3px] border-[1.5px] flex-shrink-0 mt-0.5 relative transition-all duration-200",
                        m.completed
                          ? "bg-amber border-amber shadow-[0_1px_4px_rgba(192,138,62,0.3)]"
                          : "border-line group-hover:border-amber/60"
                      )}
                    >
                      {m.completed && (
                        <div className="absolute left-1 top-0.5 w-[5px] h-[9px] border-r-2 border-b-2 border-card rotate-45 animate-pulse-check" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[14.5px] font-sans transition-all duration-200",
                        m.completed
                          ? "text-ink-soft line-through opacity-60"
                          : "text-ink"
                      )}
                    >
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

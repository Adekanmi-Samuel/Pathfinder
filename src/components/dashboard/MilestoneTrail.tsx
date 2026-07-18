"use client";

import { useState } from "react";
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
  pathTitle = "UX Designer",
  onToggle,
}: MilestoneTrailProps) {
  const [items, setItems] = useState(milestones);
  const doneCount = items.filter((m) => m.completed).length;

  const grouped = items.reduce<Record<number, Milestone[]>>((acc, m) => {
    (acc[m.month] ||= []).push(m);
    return acc;
  }, {});

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
    const item = items.find((m) => m.id === id);
    if (item) onToggle?.(id, !item.completed);
  };

  return (
    <div>
      <div className="flex justify-between items-baseline mb-5">
        <h3 className="font-serif text-xl font-semibold">
          Your roadmap: {pathTitle}
        </h3>
        <span className="font-mono text-[12.5px] text-ink-soft">
          {doneCount} of {items.length} milestones
        </span>
      </div>

      <div className="bg-card border border-line rounded-card px-7">
        {Object.entries(grouped).map(([month, monthMilestones]) => (
          <div
            key={month}
            className="py-6 border-b border-line last:border-b-0"
          >
            <span className="font-mono text-[11.5px] text-amber-deep uppercase tracking-[0.06em] block mb-3.5">
              Month {month}
            </span>
            {monthMilestones.map((m) => (
              <button
                key={m.id}
                onClick={() => toggle(m.id)}
                className={cn(
                  "flex items-start gap-3.5 w-full text-left py-[9px] cursor-pointer select-none group bg-transparent border-none p-0"
                )}
              >
                <div
                  className={cn(
                    "w-[18px] h-[18px] rounded-[3px] border-[1.5px] flex-shrink-0 mt-0.5 relative transition-all duration-150",
                    m.completed
                      ? "bg-amber border-amber"
                      : "border-line group-hover:border-amber"
                  )}
                >
                  {m.completed && (
                    <div className="absolute left-1 top-0.5 w-[5px] h-[9px] border-r-2 border-b-2 border-card rotate-45 animate-pulse-check" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[15px] font-sans transition-all duration-150",
                    m.completed
                      ? "text-ink-soft line-through opacity-70"
                      : "text-ink"
                  )}
                >
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

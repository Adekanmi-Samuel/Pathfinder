"use client";

import { ProgressRing } from "@/components/ui/ProgressRing";
import { MomentumBar } from "@/components/ui/MomentumBar";

interface SidebarProps {
  progress: number;
  momentum: number;
  checkIns: number;
  milestonesDone: number;
  timeLogged: number;
}

export function Sidebar({
  progress,
  momentum,
  checkIns,
  milestonesDone,
  timeLogged,
}: SidebarProps) {
  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="bg-card border border-line rounded-card p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber/50 via-amber to-amber/50" />
        <h4 className="font-mono text-[11.5px] text-ink-soft uppercase tracking-[0.06em] mb-5">
          Path progress
        </h4>
        <ProgressRing
          progress={progress}
          label="of 90-day plan"
        />
      </div>

      {/* Momentum */}
      <div className="bg-card border border-line rounded-card p-6">
        <h4 className="font-mono text-[11.5px] text-ink-soft uppercase tracking-[0.06em] mb-5">
          Momentum
        </h4>
        <MomentumBar
          progress={momentum}
          value={momentum}
          label="Based on check-in consistency and milestones completed this month."
        />
      </div>

      {/* This week */}
      <div className="bg-card border border-line rounded-card overflow-hidden">
        <h4 className="font-mono text-[11.5px] text-ink-soft uppercase tracking-[0.06em] px-6 pt-6 pb-4">
          This week
        </h4>
        <div className="px-6 pb-5 space-y-0">
          <div className="flex justify-between items-center py-3 border-t border-line text-[14px]">
            <span className="text-ink-soft">Check-ins</span>
            <b className="font-mono font-semibold tabular-nums">{checkIns} / 7</b>
          </div>
          <div className="flex justify-between items-center py-3 border-t border-line text-[14px]">
            <span className="text-ink-soft">Milestones done</span>
            <b className="font-mono font-semibold tabular-nums">{milestonesDone}</b>
          </div>
          <div className="flex justify-between items-center py-3 border-t border-line text-[14px]">
            <span className="text-ink-soft">Time logged</span>
            <b className="font-mono font-semibold tabular-nums">{timeLogged} hrs</b>
          </div>
        </div>
      </div>
    </div>
  );
}

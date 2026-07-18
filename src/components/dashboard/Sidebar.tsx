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
    <div>
      {/* Progress */}
      <div className="bg-card border border-line rounded-card p-6 mb-5">
        <h4 className="font-mono text-[11.5px] text-ink-soft uppercase tracking-[0.06em] mb-4">
          Path progress
        </h4>
        <ProgressRing
          progress={progress}
          label="of 90-day plan"
        />
      </div>

      {/* Momentum */}
      <div className="bg-card border border-line rounded-card p-6 mb-5">
        <h4 className="font-mono text-[11.5px] text-ink-soft uppercase tracking-[0.06em] mb-4">
          Momentum
        </h4>
        <MomentumBar
          progress={momentum}
          value={momentum}
          label="Based on check-in consistency and milestones completed this month."
        />
      </div>

      {/* This week */}
      <div className="bg-card border border-line rounded-card p-6">
        <h4 className="font-mono text-[11.5px] text-ink-soft uppercase tracking-[0.06em] mb-4">
          This week
        </h4>
        <div className="flex justify-between py-2.5 border-t border-line first:border-t-0 text-[14px]">
          <span>Check-ins</span>
          <b className="font-mono font-semibold">{checkIns} / 7</b>
        </div>
        <div className="flex justify-between py-2.5 border-t border-line text-[14px]">
          <span>Milestones done</span>
          <b className="font-mono font-semibold">{milestonesDone}</b>
        </div>
        <div className="flex justify-between py-2.5 border-t border-line text-[14px]">
          <span>Time logged</span>
          <b className="font-mono font-semibold">{timeLogged} hrs</b>
        </div>
      </div>
    </div>
  );
}

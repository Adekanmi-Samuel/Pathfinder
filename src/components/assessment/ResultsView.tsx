"use client";

import { useState } from "react";
import type { CareerPath } from "@/types";
import { cn } from "@/lib/utils";

interface ResultsViewProps {
  paths: CareerPath[];
}

export function ResultsView({ paths }: ResultsViewProps) {
  return (
    <div>
      <div className="mb-10">
        <div className="font-mono text-xs text-amber-deep uppercase tracking-[0.06em] mb-3">
          Mile 1 &middot; Your paths
        </div>
        <h2 className="font-serif font-medium text-[clamp(26px,3.6vw,36px)] leading-[1.2]">
          Three directions worth considering
        </h2>
        <p className="text-ink-soft mt-3 text-[15.5px]">
          Ranked by fit. Expand any of them to see the full 90-day roadmap.
        </p>
      </div>

      {paths.map((path, i) => (
        <PathCard key={i} path={path} />
      ))}
    </div>
  );
}

function PathCard({ path }: { path: CareerPath }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-line rounded-card p-7 mb-5">
      <div className="flex justify-between items-start gap-4 mb-4">
        <h4 className="font-serif text-[22px] font-semibold">{path.title}</h4>
        <div className="flex flex-col items-center justify-center flex-shrink-0 w-[54px] h-[54px] rounded-full border-2 border-amber">
          <span className="font-mono text-[13px] font-semibold text-amber-deep">
            {path.matchScore}
          </span>
          <span className="font-mono text-[8.5px] text-ink-soft font-normal">
            match
          </span>
        </div>
      </div>

      <p className="text-[14.5px] text-ink-soft mb-5 leading-[1.6]">
        {path.why}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {path.skillsNeeded.map((s) => (
          <span
            key={s}
            className="font-mono text-[11.5px] bg-parchment-dim border border-line px-2.5 py-[5px] rounded-sm text-ink-soft"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="font-mono text-[13px] text-ink-soft mb-5">
        Typical range: <b className="text-ink">{path.salaryRange}</b>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="bg-transparent border border-line text-ink text-[13.5px] px-4 py-2.5 rounded-sm cursor-pointer font-sans hover:border-amber transition-colors duration-150"
      >
        {open ? "Hide roadmap" : "View 90-day roadmap"}
      </button>

      <div
        className={cn(
          "mt-5 pt-5 border-t border-line",
          open ? "block" : "hidden"
        )}
      >
        {(["month1", "month2", "month3"] as const).map((m, mi) => (
          <div key={m} className="mb-4">
            <span className="font-mono text-[11.5px] text-amber-deep uppercase tracking-[0.05em] block mb-1.5">
              Month {mi + 1}
            </span>
            <ul className="list-none p-0">
              {path.roadmap[m].map((item, ii) => (
                <li
                  key={ii}
                  className="text-[14px] text-ink-soft py-1 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-amber-deep"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {path.resources && path.resources.length > 0 && (
          <div className="mt-4">
            <span className="font-mono text-[11.5px] text-amber-deep uppercase tracking-[0.05em] block mb-2">
              Resources
            </span>
            {path.resources.map((r, ri) => (
              <div key={ri} className="text-[14px] text-ink-soft py-1">
                {r.name}{" "}
                <span className="text-ink-soft/60">({r.type})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { formatDate, getTimeOfDay } from "@/lib/utils";

interface GreetingProps {
  userName?: string;
}

export function Greeting({ userName = "Sam" }: GreetingProps) {
  const timeOfDay = getTimeOfDay();
  const greetings: Record<string, string> = {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
  };

  return (
    <div className="mb-9">
      <span className="font-mono text-[12.5px] text-amber-deep uppercase tracking-[0.06em] block mb-2.5">
        {formatDate(new Date())}
      </span>
      <h1 className="font-serif font-medium text-[clamp(26px,3.2vw,34px)]">
        {greetings[timeOfDay]}, {userName}.
      </h1>
    </div>
  );
}

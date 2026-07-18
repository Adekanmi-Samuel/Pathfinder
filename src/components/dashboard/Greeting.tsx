"use client";

import { formatDate, getTimeOfDay } from "@/lib/utils";
import { useAuth } from "@/components/layout/AuthProvider";

export function Greeting({ userName }: { userName?: string }) {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();
  const greetings: Record<string, string> = {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
  };

  // Priority: prop > auth user full_name > auth user email prefix
  const name =
    userName ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <div className="mb-9">
      <span className="font-mono text-[12.5px] text-amber-deep uppercase tracking-[0.06em] block mb-2.5">
        {formatDate(new Date())}
      </span>
      <h1 className="font-serif font-medium text-[clamp(26px,3.2vw,34px)]">
        {greetings[timeOfDay]}, {name}.
      </h1>
    </div>
  );
}

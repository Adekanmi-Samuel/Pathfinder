"use client";

import { useState, useEffect } from "react";

interface CheckInCardProps {
  todayCheckIn?: string;
  onSave?: (focus: string) => void;
}

export function CheckInCard({ todayCheckIn, onSave }: CheckInCardProps) {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(!!todayCheckIn);
  const [savedText, setSavedText] = useState(todayCheckIn || "");

  // Sync with external state changes (e.g., data refetch)
  useEffect(() => {
    if (todayCheckIn) {
      setSaved(true);
      setSavedText(todayCheckIn);
    }
  }, [todayCheckIn]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setSavedText(trimmed);
    setSaved(true);
    onSave?.(trimmed);
    setValue("");
  };

  return (
    <div className="bg-card border border-line rounded-card p-7 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif text-lg font-semibold">Today&apos;s focus</h3>
        <span
          className={`font-mono text-[11.5px] uppercase tracking-[0.05em] ${
            saved ? "text-moss" : "text-ink-soft"
          }`}
        >
          {saved ? "Set for today" : "Not set"}
        </span>
      </div>

      <p className="text-[14.5px] text-ink-soft mb-3.5">
        What&apos;s one thing you&apos;ll move forward today?
      </p>

      {!saved ? (
        <div className="flex gap-2.5">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="e.g. Finish the second UX case study draft"
            className="flex-1 bg-parchment-dim border border-line rounded-card px-3.5 py-3 font-sans text-[14.5px] text-ink placeholder:text-[#A6A190] focus:outline-none focus:border-amber transition-colors duration-150"
          />
          <button
            onClick={handleSave}
            disabled={!value.trim()}
            className="bg-ink text-parchment border-none rounded-card px-5 py-3 text-[14px] font-medium cursor-pointer hover:bg-amber-deep transition-colors duration-150 disabled:bg-line disabled:text-ink-soft disabled:cursor-not-allowed"
          >
            Set focus
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 text-ink-soft text-[14.5px] italic">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 flex-shrink-0"
          >
            <path
              d="M4 12l5 5L20 6"
              stroke="#6B7A5E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{savedText}</span>
        </div>
      )}
    </div>
  );
}

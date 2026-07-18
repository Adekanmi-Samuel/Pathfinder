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
  const [showCheck, setShowCheck] = useState(!!todayCheckIn);

  // Sync with external state changes (e.g., data refetch)
  useEffect(() => {
    if (todayCheckIn) {
      setSaved(true);
      setSavedText(todayCheckIn);
      setShowCheck(true);
    }
  }, [todayCheckIn]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setSavedText(trimmed);
    setShowCheck(false);
    // Brief delay so the fade-out plays before the check appears
    requestAnimationFrame(() => {
      onSave?.(trimmed);
      setValue("");
      setSaved(true);
      setTimeout(() => setShowCheck(true), 40);
    });
  };

  return (
    <div className="bg-card border border-line rounded-card p-7 mb-8 relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber/60 via-amber to-amber/60" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif text-lg font-semibold">Today&apos;s focus</h3>
        <span
          className={`font-mono text-[11.5px] uppercase tracking-[0.05em] transition-colors duration-300 ${
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
            className="flex-1 bg-parchment-dim border border-line rounded-card px-3.5 py-3 font-sans text-[14.5px] text-ink placeholder:text-[#A6A190] focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/15 transition-all duration-200"
          />
          <button
            onClick={handleSave}
            disabled={!value.trim()}
            className="bg-ink text-parchment border-none rounded-card px-5 py-3 text-[14px] font-medium cursor-pointer transition-all duration-200 hover:bg-amber-deep hover:shadow-[0_2px_8px_rgba(156,110,46,0.25)] hover:-translate-y-px active:translate-y-0 disabled:bg-line disabled:text-ink-soft disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
          >
            Set focus
          </button>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2.5 text-[14.5px] py-3 px-4 rounded-card bg-moss/8 border border-moss/15 transition-all duration-300 ${
            showCheck ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-[18px] h-[18px] flex-shrink-0 animate-pulse-check"
          >
            <path
              d="M4 12l5 5L20 6"
              stroke="#6B7A5E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="italic text-ink-soft font-serif leading-snug">
            &ldquo;{savedText}&rdquo;
          </span>
        </div>
      )}
    </div>
  );
}

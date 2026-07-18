"use client";

import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-start gap-3.5 text-left cursor-pointer group",
        className
      )}
    >
      <div
        className={cn(
          "w-[18px] h-[18px] rounded-[3px] border-[1.5px] flex-shrink-0 mt-0.5 relative transition-all duration-150",
          checked
            ? "bg-amber border-amber"
            : "border-line group-hover:border-amber"
        )}
      >
        {checked && (
          <div className="absolute left-1 top-0.5 w-[5px] h-[9px] border-r-2 border-b-2 border-card rotate-45 animate-pulse-check" />
        )}
      </div>
      {label && (
        <span
          className={cn(
            "text-[15px] transition-all duration-150",
            checked
              ? "text-ink-soft line-through opacity-70"
              : "text-ink"
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
}

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "match" | "skill" | "status";
}

export function Badge({
  className,
  variant = "skill",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-[11.5px] rounded-sm px-2.5 py-1",
        variant === "skill" &&
          "bg-parchment-dim border border-line text-ink-soft",
        variant === "match" &&
          "flex flex-col items-center justify-center w-[52px] h-[52px] rounded-full border-2 border-amber text-amber-deep font-semibold text-[13px]",
        variant === "status" &&
          "text-ink-soft uppercase tracking-[0.05em]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

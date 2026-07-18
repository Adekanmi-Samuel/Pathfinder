import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-150 rounded-card",
          variant === "primary" &&
            "bg-ink text-parchment hover:bg-amber-deep hover:-translate-y-px active:translate-y-0",
          variant === "secondary" &&
            "bg-transparent text-ink border border-ink hover:bg-ink hover:text-parchment",
          variant === "ghost" &&
            "bg-transparent text-ink-soft hover:text-ink",
          size === "sm" && "text-sm px-5 py-2.5",
          size === "md" && "text-[15px] px-6 py-3",
          size === "lg" && "text-base px-8 py-3.5",
          (disabled || loading) &&
            "bg-line text-ink-soft cursor-not-allowed hover:translate-y-0 hover:bg-line",
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };

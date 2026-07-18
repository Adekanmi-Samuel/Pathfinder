import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-card border border-line rounded-card",
        hover &&
          "transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(26,29,41,0.25)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";
export { Card };

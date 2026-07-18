import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ClosingCTA() {
  return (
    <section id="start" className="py-28 text-center relative z-[2]">
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(192,138,62,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1120px] mx-auto px-8">
        <h2 className="font-serif font-medium text-[clamp(32px,4.5vw,52px)] max-w-[680px] mx-auto mb-5 leading-[1.15] tracking-tight">
          Ten minutes from now, you could have an actual plan.
        </h2>
        <p className="text-ink-soft text-[17px] max-w-[480px] mx-auto mb-10 leading-relaxed">
          No pressure, no spam. Just answers you already have, organized into
          something you can use.
        </p>
        <Link href="/assessment">
          <Button size="lg">Start your assessment — free</Button>
        </Link>
        <p className="mt-5 text-[13px] text-ink-soft font-mono">
          No credit card required
        </p>
      </div>
    </section>
  );
}

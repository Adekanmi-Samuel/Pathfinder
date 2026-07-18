import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ClosingCTA() {
  return (
    <section id="start" className="py-24 text-center relative z-[2]">
      <div className="max-w-[1120px] mx-auto px-8">
        <h2 className="font-serif font-medium text-[clamp(32px,4.5vw,52px)] max-w-[680px] mx-auto mb-5 leading-[1.15]">
          Ten minutes from now, you could have an actual plan.
        </h2>
        <p className="text-ink-soft text-[17px] max-w-[480px] mx-auto mb-9">
          No pressure, no spam. Just answers you already have, organized into
          something you can use.
        </p>
        <Link href="/assessment">
          <Button size="lg">Start your assessment — free</Button>
        </Link>
      </div>
    </section>
  );
}

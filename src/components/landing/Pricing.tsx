"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/components/layout/AuthProvider";

const tiers = [
  {
    id: "free",
    name: "Free",
    desc: "See if this is worth it",
    price: "$0",
    features: [
      "Full assessment",
      "1 career path with rationale",
      "7-day starter roadmap",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    desc: "For an active job or career change",
    price: "$12",
    period: "/month",
    features: [
      "All 3 ranked paths",
      "Full 90-day roadmap",
      "Daily check-ins",
      "Progress tracking",
    ],
    cta: "Start Pro trial",
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    desc: "For coaches and small teams",
    price: "$29",
    period: "/month",
    features: ["Everything in Pro", "Group / team view", "Exportable reports"],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleSelect = async (planId: string) => {
    if (planId === "free") {
      router.push("/assessment");
      return;
    }

    if (planId === "business") {
      // For business tier, open contact
      window.location.href = "mailto:hello@pathfinder.app?subject=Business%20Plan%20Inquiry";
      return;
    }

    if (!user) {
      router.push("/signup");
      return;
    }

    setLoading(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, email: user.email }),
      });

      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-22 relative z-[2]">
      <div className="max-w-[1120px] mx-auto px-8">
        <div className="max-w-[600px] mb-14">
          <span className="font-mono text-xs text-amber-deep uppercase tracking-[0.08em] mb-3.5 block">
            Pricing
          </span>
          <h2 className="font-serif font-medium text-[clamp(28px,3.4vw,40px)] tracking-tight leading-[1.15]">
            Start free. Upgrade if it&apos;s working.
          </h2>
          <p className="mt-4 text-ink-soft text-[17px] max-w-[520px]">
            No trial tricks. The free tier is genuinely useful on its own.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              hover
              className={`p-9 relative ${tier.featured ? "!border-amber shadow-[0_4px_24px_-4px_rgba(192,138,62,0.2)] bg-gradient-to-b from-amber/[0.03] to-card" : ""}`}
            >
              {tier.featured && (
                <span className="absolute -top-[13px] left-7 bg-amber text-card font-mono text-[11px] px-2.5 py-1 rounded-sm uppercase tracking-[0.05em] shadow-[0_2px_8px_rgba(192,138,62,0.3)]">
                  Most common
                </span>
              )}
              <h3 className="font-serif text-[22px] font-semibold mb-1.5">
                {tier.name}
              </h3>
              <p className="text-sm text-ink-soft mb-4">{tier.desc}</p>
              <div className="font-serif text-[38px] font-medium mb-1">
                {tier.price}
                {tier.period && (
                  <span className="text-base text-ink-soft font-sans font-normal">
                    {tier.period}
                  </span>
                )}
              </div>
              <ul className="my-7">
                {tier.features.map((f, i) => (
                  <li
                    key={i}
                    className="text-[14.5px] text-ink-soft py-2 border-t border-line first:border-t-0 flex gap-2.5"
                  >
                    <span className="text-amber-deep flex-shrink-0">
                      &mdash;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.featured ? "primary" : "secondary"}
                className="w-full justify-center"
                onClick={() => handleSelect(tier.id)}
                loading={loading === tier.id}
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

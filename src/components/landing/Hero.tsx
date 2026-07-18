"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <header className="relative pt-24 pb-16 overflow-visible">
      <div className="max-w-[1120px] mx-auto px-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-deep uppercase tracking-[0.08em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          Now in early access
        </div>

        {/* Headline */}
        <h1 className="font-serif font-medium text-[clamp(40px,6vw,68px)] leading-[1.05] tracking-tight max-w-[820px]">
          You don&apos;t need another career quiz.
          <br />
          You need{" "}
          <em className="italic text-amber-deep font-normal">
            a direction.
          </em>
        </h1>

        {/* Sub */}
        <p className="mt-6 text-[19px] text-ink-soft max-w-[520px] leading-relaxed">
          Answer honestly for ten minutes. Get a specific, three-month plan
          built around your actual skills, constraints, and what you value —
          not generic advice you&apos;d find in a listicle.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 mt-9 flex-wrap">
          <Link href="/assessment">
            <Button size="lg">Start your assessment — free</Button>
          </Link>
          <a href="#preview">
            <Button variant="secondary" size="lg">
              See a sample plan
            </Button>
          </a>
        </div>

        <p className="mt-4 text-[13.5px] text-ink-soft font-mono">
          No credit card. Takes about 10 minutes.
        </p>
      </div>

      {/* Trail SVG */}
      <div className="max-w-[1120px] mx-auto px-8 mt-20">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1056 220"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            className="trail-path"
            d="M20,180 C160,180 180,60 320,60 C440,60 460,160 580,160 C700,160 720,40 860,40 C940,40 980,80 1036,80"
          />
          {/* Waypoint 0 */}
          <g
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <circle
              cx="20"
              cy="180"
              r="6"
              fill="var(--card)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text
              x="20"
              y="205"
              className="font-mono text-[11.5px]"
              fill="var(--ink-soft)"
              letterSpacing="0.06em"
            >
              MILE 0
            </text>
            <text
              x="20"
              y="150"
              className="font-sans text-[14.5px] font-semibold"
              fill="var(--ink)"
            >
              Where you are
            </text>
          </g>
          {/* Waypoint 1 */}
          <g
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "1.1s" }}
          >
            <circle
              cx="320"
              cy="60"
              r="6"
              fill="var(--card)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text
              x="320"
              y="30"
              className="font-mono text-[11.5px]"
              fill="var(--ink-soft)"
              letterSpacing="0.06em"
            >
              MILE 1
            </text>
            <text
              x="320"
              y="105"
              className="font-sans text-[14.5px] font-semibold"
              fill="var(--ink)"
            >
              The assessment
            </text>
          </g>
          {/* Waypoint 2 */}
          <g
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "1.6s" }}
          >
            <circle
              cx="580"
              cy="160"
              r="6"
              fill="var(--card)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text
              x="580"
              y="185"
              className="font-mono text-[11.5px]"
              fill="var(--ink-soft)"
              letterSpacing="0.06em"
            >
              MILE 2
            </text>
            <text
              x="580"
              y="135"
              className="font-sans text-[14.5px] font-semibold"
              fill="var(--ink)"
            >
              Your roadmap
            </text>
          </g>
          {/* Waypoint 3 */}
          <g
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "2.1s" }}
          >
            <circle
              cx="860"
              cy="40"
              r="6"
              fill="var(--card)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text
              x="860"
              y="20"
              className="font-mono text-[11.5px]"
              fill="var(--ink-soft)"
              letterSpacing="0.06em"
            >
              MILE 3
            </text>
            <text
              x="810"
              y="80"
              className="font-sans text-[14.5px] font-semibold"
              fill="var(--ink)"
            >
              Daily momentum
            </text>
          </g>
        </svg>
      </div>
    </header>
  );
}

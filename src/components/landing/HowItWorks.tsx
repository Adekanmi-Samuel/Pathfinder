const stops = [
  {
    mile: "Mile 0 — 5 minutes",
    title: "Tell us where you are",
    desc: "Current role, skills, interests, values, and real constraints — location, income needs, time available. No generic personality quiz.",
  },
  {
    mile: "Mile 1 — instant",
    title: "Get 3 real paths, ranked",
    desc: "Each one comes with a match rationale, the specific skill gaps you'd need to close, and an honest salary range — not a hype number.",
  },
  {
    mile: "Mile 2 — ongoing",
    title: "Follow a 90-day roadmap",
    desc: "Month-by-month milestones with free resources attached to each one — courses, communities, and concrete first steps.",
  },
  {
    mile: "Mile 3 — daily",
    title: "Check in, don't drift",
    desc: "A 30-second morning and evening prompt keeps the plan alive instead of becoming another bookmark you never open again.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-22 relative z-[2]">
      <div className="max-w-[1120px] mx-auto px-8">
        <div className="max-w-[600px] mb-14">
          <span className="font-mono text-xs text-amber-deep uppercase tracking-[0.08em] mb-3.5 block">
            How it works
          </span>
          <h2 className="font-serif font-medium text-[clamp(28px,3.4vw,40px)] tracking-tight leading-[1.15]">
            Four stops, not forty steps.
          </h2>
          <p className="mt-4 text-ink-soft text-[17px] max-w-[520px]">
            The whole thing is designed to get you moving quickly, then keep
            you accountable without becoming another chore.
          </p>
        </div>

        <div>
          {stops.map((stop, i) => (
            <div
              key={i}
              className="grid grid-cols-[56px_1fr] gap-6 py-8 border-t border-line last:border-b"
            >
              <div className="flex items-start justify-center pt-1">
                <div className="w-3 h-3 rounded-full bg-card border-2 border-amber" />
              </div>
              <div>
                <div className="font-mono text-xs text-amber-deep uppercase tracking-[0.06em] mb-1.5">
                  {stop.mile}
                </div>
                <h3 className="font-serif font-medium text-[22px] mb-2">
                  {stop.title}
                </h3>
                <p className="text-ink-soft text-[15.5px] max-w-[520px]">
                  {stop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

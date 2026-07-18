export function SampleRoadmap() {
  return (
    <section id="preview" className="py-22 relative z-[2]">
      <div className="max-w-[1120px] mx-auto px-8">
        <div className="bg-ink text-parchment rounded overflow-hidden shadow-[0_25px_80px_-20px_rgba(26,29,41,0.35)]">
          <div className="py-16 px-14 grid md:grid-cols-[1fr_1.1fr] gap-14 items-center">
            {/* Left copy */}
            <div>
              <span className="font-mono text-xs text-amber uppercase tracking-[0.08em] mb-3.5 block">
                Sample output
              </span>
              <h2 className="font-serif font-medium text-[clamp(26px,3vw,34px)] text-parchment leading-[1.2]">
                This is what a real plan looks like.
              </h2>
              <p className="mt-4 text-[#B8BAC4] text-base">
                Not a job title. A rationale, a gap list, and a first move —
                generated from one person&apos;s actual answers.
              </p>
            </div>

            {/* Right path card */}
            <div className="bg-card text-ink rounded-card p-7 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2),0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-line/50">
              <div className="flex justify-between items-start mb-5">
                <h4 className="font-serif text-[21px] font-semibold">
                  UX Designer
                </h4>
                <div className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-full border-2 border-amber bg-amber/10">
                  <span className="font-mono text-[13px] font-semibold text-amber-deep">
                    92
                  </span>
                  <span className="font-mono text-[9px] text-ink-soft font-normal">
                    match
                  </span>
                </div>
              </div>
              <p className="text-sm text-ink-soft mb-5 leading-[1.55]">
                Your background in customer support plus the visual work you
                already do for your side project points here — you&apos;re
                closer than it feels.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Figma", "User research", "Prototyping"].map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11.5px] bg-parchment-dim border border-line px-3 py-[6px] rounded-sm text-ink-soft tracking-wide"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="h-px bg-line my-5" />
              <div className="flex justify-between text-[13px] text-ink-soft">
                <span>Month 1</span>
                <b className="text-ink font-semibold">
                  Complete UX certificate, build 3 pieces
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

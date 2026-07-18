export function ProblemStatement() {
  return (
    <section className="py-24 bg-parchment-dim border-y border-line relative z-[2]">
      <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
        <div className="relative">
          {/* Decorative quote mark */}
          <span
            className="absolute -top-3 -left-2 font-serif text-[80px] leading-none text-amber/20 select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="font-serif italic font-normal text-[clamp(22px,2.6vw,30px)] leading-[1.4] relative">
            I know I should be doing something different. I just
            don&apos;t know what, or where to start.
          </p>
          <span
            className="font-serif text-[60px] leading-none text-amber/20 select-none pointer-events-none"
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </div>
        <div>
          <p className="text-ink-soft text-base mb-5 leading-relaxed">
            That&apos;s the feeling most career tools skip past. They ask for
            your resume and hand back job titles. They don&apos;t ask what you
            actually value, what you&apos;re willing to give up, or what&apos;s
            realistic given where you are right now.
          </p>
          <p className="text-ink-soft text-base leading-relaxed">
            Pathfinder starts with the harder questions — the ones that
            actually change what plan makes sense for you — and turns your
            answers into something you can act on this week, not someday.
          </p>
        </div>
      </div>
    </section>
  );
}

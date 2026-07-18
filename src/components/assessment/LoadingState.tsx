"use client";

export function AssessmentLoading() {
  return (
    <div className="text-center py-20">
      <div className="relative mb-8">
        <svg
          viewBox="0 0 220 60"
          className="w-[220px] h-[60px] mx-auto"
        >
          <path
            className="marching-path"
            d="M4,44 C50,44 60,14 110,14 C160,14 170,44 216,44"
          />
        </svg>
        {/* Orbiting dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[32px]"
          style={{ marginTop: "-2px" }}
        >
          <div
            className="w-2 h-2 rounded-full bg-amber shadow-[0_0_8px_rgba(192,138,62,0.4)]"
            style={{
              animation: "orbitDot 2.4s ease-in-out infinite",
              position: "absolute",
              inset: 0,
            }}
          />
        </div>
      </div>
      <h3 className="font-serif font-medium text-[22px] mb-2.5 tracking-[-0.01em]">
        Building your roadmap
      </h3>
      <p className="text-ink-soft text-[14.5px] leading-relaxed">
        Matching your answers to real paths — this takes a few seconds.
      </p>
      {/* Subtle pulsing dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber/30 animate-pulse" style={{ animationDelay: "0ms", animationDuration: "1.4s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-amber/50 animate-pulse" style={{ animationDelay: "200ms", animationDuration: "1.4s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-amber/30 animate-pulse" style={{ animationDelay: "400ms", animationDuration: "1.4s" }} />
      </div>
    </div>
  );
}

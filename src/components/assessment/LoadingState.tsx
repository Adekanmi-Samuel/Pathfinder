"use client";

export function AssessmentLoading() {
  return (
    <div className="text-center py-20">
      <svg
        viewBox="0 0 220 60"
        className="w-[220px] h-[60px] mx-auto mb-7"
      >
        <path
          className="marching-path"
          d="M4,44 C50,44 60,14 110,14 C160,14 170,44 216,44"
        />
      </svg>
      <h3 className="font-serif font-medium text-[22px] mb-2">
        Building your roadmap
      </h3>
      <p className="text-ink-soft text-[14.5px]">
        Matching your answers to real paths — this takes a few seconds.
      </p>
    </div>
  );
}

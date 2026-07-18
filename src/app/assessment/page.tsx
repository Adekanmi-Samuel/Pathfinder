"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { AssessmentLoading } from "@/components/assessment/LoadingState";
import { ResultsView } from "@/components/assessment/ResultsView";
import { questions } from "@/constants/questions";
import type { AssessmentAnswers, CareerPath } from "@/types";

type ViewState = "assessment" | "loading" | "error" | "results";

export default function AssessmentPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});
  const [viewState, setViewState] = useState<ViewState>("assessment");
  const [error, setError] = useState("");
  const [results, setResults] = useState<CareerPath[]>([]);

  const q = questions[current];
  const pct = ((current + 1) / questions.length) * 100;

  const canNext = (() => {
    const val = answers[q.id as keyof AssessmentAnswers];
    if (q.type === "text") return typeof val === "string" && val.trim().length > 2;
    if (q.type === "single") return !!val;
    if (q.type === "multi") return Array.isArray(val) && val.length > 0;
    return false;
  })();

  const handleNext = useCallback(() => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      generateRoadmap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleBack = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  const updateAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  async function generateRoadmap() {
    setViewState("loading");
    setError("");

    const prompt = `A person is looking for career direction. Here is their honest self-assessment:

- Current situation: ${answers.situation}
- Self-identified strengths: ${answers.skills}
- What genuinely interests them: ${answers.interests}
- What they value most right now: ${answers.values?.join(", ")}
- Real constraints: ${answers.constraints}
- Time available per week: ${answers.time}
- Most relevant credential/experience: ${answers.education}
- Their 90-day definition of "better": ${answers.goal}

Generate exactly 3 realistic career paths that fit this specific person. Consider their actual constraints and time availability.

Respond with ONLY valid JSON matching this structure:
{
  "paths": [
    {
      "title": "string",
      "matchScore": number 0-100,
      "why": "string - 1-2 sentences specific to their answers",
      "skillsNeeded": ["string", "string"],
      "salaryRange": "string",
      "roadmap": {
        "month1": ["string action"],
        "month2": ["string action"],
        "month3": ["string action"]
      },
      "resources": [
        {"name": "string", "type": "course/book/community/tool"}
      ]
    }
  ]
}`;

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, prompt }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data.paths || !Array.isArray(data.paths)) {
        throw new Error("Unexpected response shape");
      }

      setResults(data.paths);
      setViewState("results");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setViewState("error");
    }
  }

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <header className="py-7 border-b border-line">
        <div className="max-w-[720px] mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className="font-serif font-semibold text-lg flex items-center gap-2"
          >
            <Logo size={18} />
            Pathfinder
          </Link>
          <Link
            href="/"
            className="font-mono text-[13px] text-ink-soft no-underline hover:text-ink transition-colors"
          >
            Exit
          </Link>
        </div>
      </header>

      <main className="py-14 pb-24">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Assessment view */}
          {viewState === "assessment" && (
            <>
              {/* Progress */}
              <div className="h-1 bg-line/60 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-amber rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-mono text-xs text-ink-soft uppercase tracking-[0.06em] mb-12 block">
                Step {current + 1} of {questions.length}
              </span>

              {/* Question */}
              <div className="min-h-[340px]">
                <div className="mb-4 font-mono text-[11px] text-amber-deep uppercase tracking-[0.08em]">
                  {q.mile} &middot; Question {current + 1} of {questions.length}
                </div>
                <h2 className="font-serif font-medium text-[clamp(24px,3.2vw,32px)] leading-[1.25] mb-2.5 max-w-[560px] tracking-[-0.01em]">
                  {q.title}
                </h2>
                <p className="text-ink-soft text-[14.5px] mb-7 leading-relaxed">{q.hint}</p>

                <QuestionCard
                  question={q}
                  value={
                    (answers[q.id as keyof AssessmentAnswers] as
                      | string
                      | string[]) ?? (q.type === "multi" ? [] : "")
                  }
                  onChange={(val) => updateAnswer(q.id, val)}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-11 pt-6 border-t border-line/40">
                <button
                  onClick={handleBack}
                  className="bg-transparent text-ink-soft py-3 px-3 cursor-pointer font-sans hover:text-ink transition-colors duration-200 rounded-sm"
                  style={{
                    visibility: current === 0 ? "hidden" : "visible",
                  }}
                >
                  &larr; Back
                </button>
                <Button onClick={handleNext} disabled={!canNext}>
                  {current === questions.length - 1
                    ? "Generate my roadmap"
                    : "Continue"}
                </Button>
              </div>
            </>
          )}

          {/* Loading */}
          {viewState === "loading" && <AssessmentLoading />}

          {/* Error */}
          {viewState === "error" && (
            <div className="bg-[#FBEDE9] border border-[#E8BDAF] rounded-card p-6 mt-5">
              <h3 className="font-serif text-lg text-error mb-2">
                Couldn&apos;t generate your roadmap
              </h3>
              <p className="text-[14.5px] text-ink-soft mb-4">{error}</p>
              <Button onClick={() => setViewState("assessment")}>
                Try again
              </Button>
            </div>
          )}

          {/* Results */}
          {viewState === "results" && (
            <>
              <ResultsView paths={results} />
              <div className="mt-4">
                <button
                  onClick={() => {
                    setCurrent(0);
                    setAnswers({});
                    setViewState("assessment");
                  }}
                  className="bg-transparent border-none text-ink-soft font-mono text-[13px] cursor-pointer underline"
                >
                  Start over
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

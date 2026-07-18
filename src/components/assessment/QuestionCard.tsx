"use client";

import type { Question } from "@/constants/questions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  if (question.type === "text") {
    return <TextQuestion question={question} value={value as string} onChange={onChange} />;
  }
  if (question.type === "single") {
    return <SingleSelect question={question} value={value as string} onChange={onChange} />;
  }
  if (question.type === "multi") {
    return <MultiSelect question={question} value={value as string[]} onChange={onChange} />;
  }
  return null;
}

function TextQuestion({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      className="w-full bg-card border border-line rounded-card px-4 py-4 font-sans text-base text-ink resize-y min-h-[100px] placeholder:text-[#A6A190] focus:outline-none focus:border-amber transition-colors duration-150"
    />
  );
}

function SingleSelect({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {question.options?.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "flex items-center gap-3.5 text-left bg-card border rounded-card px-[18px] py-4 text-[15.5px] font-sans cursor-pointer",
            "transition-all duration-200 ease-out",
            value === opt
              ? "border-amber bg-[#FAF3E7] shadow-[0_1px_8px_rgba(192,138,62,0.1)]"
              : "border-line/80 hover:border-amber/60 hover:bg-[#FDFAF5]"
          )}
        >
          <span
            className={cn(
              "w-[18px] h-[18px] rounded-full border-[1.5px] flex-shrink-0 relative transition-colors duration-200",
              value === opt ? "border-amber" : "border-line"
            )}
          >
            {value === opt && (
              <span className="absolute inset-[3px] rounded-full bg-amber transition-all duration-200" />
            )}
          </span>
          <span className={cn("transition-colors duration-200", value === opt ? "text-ink" : "text-ink/90")}>
            {opt}
          </span>
        </button>
      ))}
    </div>
  );
}

function MultiSelect({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    let next: string[];
    if (value.includes(opt)) {
      next = value.filter((v) => v !== opt);
    } else {
      if (question.max && value.length >= question.max) {
        next = [...value.slice(1), opt];
      } else {
        next = [...value, opt];
      }
    }
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {question.options?.map((opt) => (
        <button
          key={opt}
          onClick={() => toggle(opt)}
          className={cn(
            "flex items-center gap-3.5 text-left bg-card border rounded-card px-[18px] py-4 text-[15.5px] font-sans cursor-pointer",
            "transition-all duration-200 ease-out",
            value.includes(opt)
              ? "border-amber bg-[#FAF3E7] shadow-[0_1px_8px_rgba(192,138,62,0.1)]"
              : "border-line/80 hover:border-amber/60 hover:bg-[#FDFAF5]"
          )}
        >
          <span
            className={cn(
              "w-[18px] h-[18px] rounded-[3px] border-[1.5px] flex-shrink-0 relative transition-colors duration-200",
              value.includes(opt) ? "border-amber" : "border-line"
            )}
          >
            {value.includes(opt) && (
              <span className="absolute left-[4px] top-[1px] w-[5px] h-[9px] border-r-2 border-b-2 border-amber rotate-45" />
            )}
          </span>
          <span className={cn("transition-colors duration-200", value.includes(opt) ? "text-ink" : "text-ink/90")}>
            {opt}
          </span>
        </button>
      ))}
    </div>
  );
}

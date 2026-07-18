export interface Question {
  id: string;
  mile: string;
  type: "text" | "single" | "multi";
  title: string;
  hint: string;
  placeholder?: string;
  options?: string[];
  max?: number;
}

export const questions: Question[] = [
  {
    id: "situation",
    mile: "Mile 0",
    type: "single",
    title: "What's your current situation?",
    hint: "Pick the closest one.",
    options: [
      "Student",
      "Employed, but restless",
      "Employed and fairly settled",
      "Unemployed / between things",
      "Freelancing or self-employed",
    ],
  },
  {
    id: "skills",
    mile: "Mile 0",
    type: "text",
    title: "What are you already good at?",
    hint: "Things you do well, whether or not they're your job. Comma-separated is fine.",
    placeholder:
      "e.g. explaining complex things simply, organizing chaotic projects, visual design…",
  },
  {
    id: "interests",
    mile: "Mile 0",
    type: "text",
    title: "What pulls your attention when nobody's making you focus?",
    hint: "Hobbies, topics you read about for fun, things you'd do even if unpaid.",
    placeholder:
      "e.g. building small tools, cooking, understanding how markets work…",
  },
  {
    id: "values",
    mile: "Mile 0",
    type: "multi",
    max: 2,
    title: "What matters most right now?",
    hint: "Pick up to two — being honest here changes the whole plan.",
    options: [
      "Financial stability",
      "Creative freedom",
      "Making an impact",
      "Flexibility & time",
      "Growth & learning",
      "Recognition or status",
    ],
  },
  {
    id: "constraints",
    mile: "Mile 0",
    type: "text",
    title: "What can't move right now?",
    hint: "Location, family obligations, financial runway, health — anything real that shapes what's possible.",
    placeholder:
      "e.g. can't relocate for 2 years, need to keep current income…",
  },
  {
    id: "time",
    mile: "Mile 0",
    type: "single",
    title: "How much time can you realistically give this per week?",
    hint: "Outside of existing obligations. Be honest, not aspirational.",
    options: ["Under 2 hours", "2–5 hours", "5–10 hours", "10+ hours"],
  },
  {
    id: "education",
    mile: "Mile 0",
    type: "text",
    title: "What's your most relevant credential or experience?",
    hint: "Degree, certification, years in a field — whatever's most relevant.",
    placeholder:
      "e.g. BA in Communications, 4 years in customer support…",
  },
  {
    id: "goal",
    mile: "Mile 1",
    type: "text",
    title: 'In one sentence, what does "better" look like in 90 days?',
    hint: "This is what we'll build the roadmap toward.",
    placeholder:
      "e.g. I've started freelancing and replaced 30% of my income…",
  },
];

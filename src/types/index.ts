export interface AssessmentAnswers {
  situation: string;
  skills: string;
  interests: string;
  values: string[];
  constraints: string;
  time: string;
  education: string;
  goal: string;
}

export interface Roadmap {
  month1: string[];
  month2: string[];
  month3: string[];
}

export interface Resource {
  name: string;
  type: string;
}

export interface CareerPath {
  id?: string;
  title: string;
  matchScore: number;
  why: string;
  skillsNeeded: string[];
  salaryRange: string;
  roadmap: Roadmap;
  resources: Resource[];
}

export interface Milestone {
  id: string;
  pathId: string;
  month: number;
  sortOrder: number;
  label: string;
  completed: boolean;
  completedAt?: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  focus: string;
  date: string;
}

export interface WeeklyStats {
  checkIns: number;
  milestonesDone: number;
  timeLogged: number;
}

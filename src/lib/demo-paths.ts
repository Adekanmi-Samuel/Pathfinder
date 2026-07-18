import type { CareerPath, AssessmentAnswers } from "@/types";

// Career path templates organized by interest/skill domains
const careerTemplates: Array<{
  keywords: string[];
  paths: Array<Omit<CareerPath, "matchScore">>;
}> = [
  {
    keywords: ["design", "ui", "ux", "visual", "figma", "creative", "aesthetic", "interface"],
    paths: [
      {
        title: "UX Designer",
        why: "Your creative instincts and people-oriented thinking align well with user experience design — a field where empathy and visual problem-solving converge.",
        skillsNeeded: ["Figma", "User research", "Prototyping", "Usability testing"],
        salaryRange: "$65,000 – $110,000",
        roadmap: {
          month1: [
            "Complete Google UX Design Certificate (Coursera)",
            "Learn Figma fundamentals through practice projects",
            "Study 3 award-winning case studies on Mobbin",
            "Join ADPList and book 2 mentor sessions",
          ],
          month2: [
            "Redesign an existing app as a portfolio case study",
            "Conduct 5 guerrilla usability tests",
            "Build a simple portfolio site (Carrd or Framer)",
            "Connect with 10 working UX designers on LinkedIn",
          ],
          month3: [
            "Complete second case study with before/after metrics",
            "Apply to 15 junior UX or product design roles",
            "Practice design challenge exercises (Daily UI)",
            "Prepare portfolio presentation for interviews",
          ],
        },
        resources: [
          { name: "Google UX Design Certificate", type: "course" },
          { name: "Mobbin", type: "tool" },
          { name: "ADPList", type: "community" },
          { name: "Laws of UX", type: "book" },
        ],
      },
      {
        title: "Visual Designer",
        why: "Your eye for aesthetics and creative background could translate into visual design — crafting brand identities, marketing materials, and digital experiences.",
        skillsNeeded: ["Adobe Creative Suite", "Typography", "Brand identity", "Motion graphics"],
        salaryRange: "$55,000 – $95,000",
        roadmap: {
          month1: [
            "Master Adobe Illustrator and Photoshop basics",
            "Study 5 brand identity case studies",
            "Practice daily design challenges (36 Days of Type)",
            "Build a Behance profile with 3 concept projects",
          ],
          month2: [
            "Create a full brand identity for a fictional company",
            "Learn basic motion graphics with After Effects",
            "Design social media templates for a real or mock client",
            "Get feedback from design communities on Dribbble",
          ],
          month3: [
            "Complete a portfolio site showcasing 5+ projects",
            "Reach out to 3 local businesses for pro-bono design work",
            "Apply to visual design or graphic design roles",
            "Attend a local design meetup or virtual conference",
          ],
        },
        resources: [
          { name: "Refactoring UI", type: "book" },
          { name: "Flaticon", type: "tool" },
          { name: "Dribbble", type: "community" },
          { name: "Skillshare Design Courses", type: "course" },
        ],
      },
    ],
  },
  {
    keywords: ["code", "programming", "developer", "software", "tech", "engineering", "build", "tools", "javascript", "python"],
    paths: [
      {
        title: "Full-Stack Developer",
        why: "Your technical aptitude and problem-solving mindset position you well for full-stack development — building complete web applications from frontend to backend.",
        skillsNeeded: ["React/Next.js", "Node.js", "PostgreSQL", "TypeScript"],
        salaryRange: "$75,000 – $130,000",
        roadmap: {
          month1: [
            "Complete a React fundamentals course (Scrimba or freeCodeCamp)",
            "Build 3 small projects: todo app, weather app, calculator",
            "Learn Git workflow and publish code to GitHub",
            "Join a developer community (Dev.to, Discord servers)",
          ],
          month2: [
            "Learn Node.js and Express for backend development",
            "Build a full-stack project with authentication",
            "Study database design with PostgreSQL or SQLite",
            "Contribute to one open-source project",
          ],
          month3: [
            "Build a capstone project with deployment (Vercel/Railway)",
            "Write 3 technical blog posts about what you learned",
            "Apply to 20 junior developer positions",
            "Practice coding interviews on LeetCode or CodeWars",
          ],
        },
        resources: [
          { name: "Scrimba", type: "course" },
          { name: "The Odin Project", type: "course" },
          { name: "Exercism", type: "tool" },
          { name: "Dev.to", type: "community" },
        ],
      },
      {
        title: "Technical Product Manager",
        why: "Your combination of technical understanding and people skills could bridge the gap between engineering teams and business goals in product management.",
        skillsNeeded: ["Agile/Scrum", "Data analysis", "User stories", "Roadmapping"],
        salaryRange: "$85,000 – $140,000",
        roadmap: {
          month1: [
            "Study product management frameworks (Jobs to Be Done)",
            "Take a free PM course (Product School or Pragmatic Institute)",
            "Practice writing user stories and acceptance criteria",
            "Shadow a product manager or read their retrospective posts",
          ],
          month2: [
            "Build a product teardown of an app you use daily",
            "Learn basic SQL for data analysis",
            "Practice wireframing in Figma or Balsamiq",
            "Network with PMs through Lenny's Newsletter community",
          ],
          month3: [
            "Create a product spec for a feature you'd build",
            "Apply to associate PM or APM roles",
            "Prepare for product case study interviews",
            "Start a newsletter or blog about product insights",
          ],
        },
        resources: [
          { name: "Inspired by Marty Cagan", type: "book" },
          { name: "Product School", type: "course" },
          { name: "Lenny's Newsletter", type: "community" },
          { name: "Maze (user testing)", type: "tool" },
        ],
      },
    ],
  },
  {
    keywords: ["writing", "content", "communication", "storytelling", "marketing", "social media", "blog", "words"],
    paths: [
      {
        title: "Content Strategist",
        why: "Your communication skills and understanding of what resonates with people make content strategy a natural fit — shaping how brands tell their story.",
        skillsNeeded: ["SEO writing", "Content planning", "Analytics", "Editorial calendars"],
        salaryRange: "$60,000 – $100,000",
        roadmap: {
          month1: [
            "Learn SEO fundamentals (Moz or Ahrefs free courses)",
            "Start a blog and publish 4 articles in your area of expertise",
            "Study content frameworks (AIDA, PAS, StoryBrand)",
            "Build a content portfolio with 5 diverse writing samples",
          ],
          month2: [
            "Learn Google Analytics basics for content measurement",
            "Create a 30-day editorial calendar for a mock brand",
            "Write case studies showing content impact",
            "Connect with content marketers on LinkedIn",
          ],
          month3: [
            "Build a personal website showcasing your portfolio",
            "Apply to content strategist or senior copywriter roles",
            "Guest post on 2 industry publications",
            "Prepare a content strategy presentation for interviews",
          ],
        },
        resources: [
          { name: "Everybody Writes by Ann Handley", type: "book" },
          { name: "HubSpot Content Marketing Certification", type: "course" },
          { name: "Superpath", type: "community" },
          { name: "Notion (content planning)", type: "tool" },
        ],
      },
    ],
  },
  {
    keywords: ["business", "entrepreneur", "startup", "sales", "management", "leadership", "strategy", "finance"],
    paths: [
      {
        title: "Product Manager",
        why: "Your strategic thinking and ability to understand both business and user needs positions you well for product management — driving what gets built and why.",
        skillsNeeded: ["Product strategy", "Data analysis", "User research", "Stakeholder management"],
        salaryRange: "$90,000 – $150,000",
        roadmap: {
          month1: [
            "Complete Product Management fundamentals (Product School)",
            "Study successful product launches and their frameworks",
            "Practice writing PRDs and product requirements",
            "Build a product sense through daily app teardowns",
          ],
          month2: [
            "Learn SQL and basic data analysis for product decisions",
            "Create a product strategy document for a real product",
            "Practice running user interviews and synthesizing insights",
            "Network with PMs through events and online communities",
          ],
          month3: [
            "Build a product portfolio with 2-3 case studies",
            "Apply to PM, APM, or associate product roles",
            "Practice product estimation and analytical interview questions",
            "Start writing about product insights on LinkedIn",
          ],
        },
        resources: [
          { name: "Cracking the PM Interview", type: "book" },
          { name: "Product School courses", type: "course" },
          { name: "PMHQ community", type: "community" },
          { name: "Amplitude (analytics)", type: "tool" },
        ],
      },
    ],
  },
  {
    keywords: ["help", "people", "community", "education", "teaching", "support", "care", "service", "health"],
    paths: [
      {
        title: "Customer Success Manager",
        why: "Your empathy and problem-solving skills make you ideal for customer success — ensuring users get real value from products and building lasting relationships.",
        skillsNeeded: ["CRM tools", "Data analysis", "Communication", "Onboarding design"],
        salaryRange: "$60,000 – $95,000",
        roadmap: {
          month1: [
            "Study customer success frameworks (health scores, QBRs)",
            "Learn HubSpot or Salesforce CRM basics",
            "Document 5 customer success stories from your experience",
            "Join the Customer Success subreddit and SuccessCOACHING community",
          ],
          month2: [
            "Build a sample customer onboarding flow",
            "Learn basic SQL for querying customer data",
            "Practice creating QBR presentations",
            "Map out a customer journey for a SaaS product",
          ],
          month3: [
            "Create a customer health score framework",
            "Apply to customer success or account manager roles",
            "Prepare for behavioral interviews using STAR method",
            "Get a reference from a previous manager or client",
          ],
        },
        resources: [
          { name: "Customer Success by Nick Mehta", type: "book" },
          { name: "Gainsight Pulse", type: "community" },
          { name: "HubSpot Academy", type: "course" },
          { name: "Gainsight (platform)", type: "tool" },
        ],
      },
    ],
  },
  {
    keywords: ["data", "analytics", "statistics", "numbers", "research", "analysis", "insights"],
    paths: [
      {
        title: "Data Analyst",
        why: "Your analytical mindset and curiosity about patterns make data analysis a strong fit — turning raw data into actionable business insights.",
        skillsNeeded: ["SQL", "Python/Pandas", "Tableau", "Statistical thinking"],
        salaryRange: "$65,000 – $110,000",
        roadmap: {
          month1: [
            "Complete Google Data Analytics Certificate",
            "Learn SQL fundamentals through practice on Mode Analytics",
            "Study basic statistics and probability concepts",
            "Build 2 practice datasets and analyses in Python",
          ],
          month2: [
            "Master Tableau or Power BI for data visualization",
            "Complete 5 SQL challenges on LeetCode or HackerRank",
            "Build a dashboard project with real public data",
            "Learn Excel advanced functions for quick analysis",
          ],
          month3: [
            "Create a portfolio with 3 end-to-end analysis projects",
            "Apply to data analyst or business intelligence roles",
            "Practice communicating data findings to non-technical audiences",
            "Get a Google Data Analytics certification badge",
          ],
        },
        resources: [
          { name: "Google Data Analytics Certificate", type: "course" },
          { name: "Mode Analytics SQL Tutorial", type: "course" },
          { name: "Kaggle", type: "community" },
          { name: "Storytelling with Data", type: "book" },
        ],
      },
    ],
  },
];

// Fallback generic paths when no keyword match is found
const genericPaths: Omit<CareerPath, "matchScore">[] = [
  {
    title: "Project Coordinator",
    why: "Your organizational skills and ability to work with people translate well into project coordination — keeping teams aligned and deliverables on track.",
    skillsNeeded: ["Project management", "Communication", "Scheduling", "Stakeholder updates"],
    salaryRange: "$50,000 – $80,000",
    roadmap: {
      month1: [
        "Learn project management fundamentals (Google PM Certificate)",
        "Master a project management tool (Asana, Trello, or Notion)",
        "Practice creating project timelines and Gantt charts",
        "Shadow a project manager or read case studies",
      ],
      month2: [
        "Build a sample project plan for a real or mock project",
        "Learn basic Agile and Scrum methodologies",
        "Practice running stand-ups and status meetings",
        "Connect with project managers in your network",
      ],
      month3: [
        "Create a portfolio showing your project planning skills",
        "Apply to project coordinator or assistant PM roles",
        "Get a CAPM or Google PM certification",
        "Practice stakeholder communication scenarios",
      ],
    },
    resources: [
      { name: "Google PM Certificate", type: "course" },
      { name: "Asana Academy", type: "course" },
      { name: "PMI Community", type: "community" },
      { name: "The Mythical Man-Month", type: "book" },
    ],
  },
  {
    title: "Operations Specialist",
    why: "Your practical problem-solving and attention to detail could thrive in operations — optimizing processes, managing workflows, and keeping businesses running smoothly.",
    skillsNeeded: ["Process improvement", "Data tracking", "Vendor management", "Documentation"],
    salaryRange: "$50,000 – $85,000",
    roadmap: {
      month1: [
        "Study Lean Six Sigma fundamentals (free Yellow Belt courses)",
        "Learn to map and document business processes",
        "Master Excel/Sheets for operational tracking",
        "Read The Goal by Eliyahu Goldratt",
      ],
      month2: [
        "Identify and document 3 process improvements in your current role",
        "Learn basic data analysis for operational metrics",
        "Study supply chain or workflow optimization basics",
        "Practice creating SOPs (Standard Operating Procedures)",
      ],
      month3: [
        "Build a case study of a process improvement you made",
        "Apply to operations analyst or coordinator roles",
        "Get familiar with tools like Notion or Confluence",
        "Network with operations professionals",
      ],
    },
    resources: [
      { name: "Lean Six Sigma Yellow Belt", type: "course" },
      { name: "The Goal by Goldratt", type: "book" },
      { name: "OpsHounds Community", type: "community" },
      { name: "Notion", type: "tool" },
    ],
  },
];

/**
 * Generate career paths based on the user's assessment answers.
 * Uses keyword matching against templates, with a scoring algorithm.
 */
export function generateMockPaths(
  answers: Partial<AssessmentAnswers>
): CareerPath[] {
  const allText = [
    answers.situation || "",
    answers.skills || "",
    answers.interests || "",
    answers.constraints || "",
    answers.education || "",
    answers.goal || "",
  ]
    .join(" ")
    .toLowerCase();

  // Find matching templates and score them
  const scored: Array<{ paths: Omit<CareerPath, "matchScore">[]; score: number }> = [];

  for (const template of careerTemplates) {
    let matchCount = 0;
    for (const keyword of template.keywords) {
      if (allText.includes(keyword)) matchCount++;
    }
    if (matchCount > 0) {
      scored.push({
        paths: template.paths,
        score: Math.min(95, 60 + matchCount * 10),
      });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Pick top paths — fill up to 3
  const selected: CareerPath[] = [];

  for (const group of scored) {
    for (const path of group.paths) {
      if (selected.length >= 3) break;
      selected.push({ ...path, matchScore: group.score });
    }
    if (selected.length >= 3) break;
  }

  // Fill remaining slots with generic paths if needed
  while (selected.length < 3) {
    const generic = genericPaths[selected.length % genericPaths.length];
    selected.push({
      ...generic,
      matchScore: Math.max(40, 70 - selected.length * 10),
    });
  }

  // Adjust scores to ensure descending order and add variety
  if (selected.length >= 3) {
    selected[0].matchScore = Math.min(95, selected[0].matchScore + 5);
    selected[1].matchScore = Math.max(
      selected[0].matchScore - 15,
      Math.min(85, selected[1].matchScore)
    );
    selected[2].matchScore = Math.max(
      35,
      Math.min(selected[1].matchScore - 10, selected[2].matchScore)
    );
  }

  return selected;
}

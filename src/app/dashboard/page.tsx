"use client";

import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Greeting } from "@/components/dashboard/Greeting";
import { CheckInCard } from "@/components/dashboard/CheckInCard";
import { MilestoneTrail } from "@/components/dashboard/MilestoneTrail";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";

// Sample milestones for demo — will come from Supabase in production
const sampleMilestones = [
  { id: "m1", month: 1, label: "Complete Google UX Design Certificate — module 1", completed: true },
  { id: "m2", month: 1, label: "Build first portfolio case study", completed: true },
  { id: "m3", month: 1, label: "Join two design communities (Designer Hangout, ADPList)", completed: true },
  { id: "m4", month: 1, label: "Complete Google UX Design Certificate — module 2", completed: false },
  { id: "m5", month: 2, label: "Find first freelance or volunteer UX project", completed: true },
  { id: "m6", month: 2, label: "Complete second portfolio case study", completed: false },
  { id: "m7", month: 2, label: "Get feedback from 3 working designers via ADPList", completed: false },
  { id: "m8", month: 2, label: "Publish portfolio site", completed: false },
  { id: "m9", month: 3, label: "Apply to 20 relevant roles", completed: false },
  { id: "m10", month: 3, label: "Complete third portfolio case study", completed: false },
  { id: "m11", month: 3, label: "Do 5 mock interviews", completed: false },
  { id: "m12", month: 3, label: "Start networking with hiring managers directly", completed: false },
];

export default function DashboardPage() {
  const [milestones, setMilestones] = useState(sampleMilestones);

  const doneCount = milestones.filter((m) => m.completed).length;
  const progress = Math.round((doneCount / milestones.length) * 100);

  const handleToggle = (id: string, completed: boolean) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed } : m))
    );
  };

  return (
    <ProtectedRoute>
      <Header />
      <main className="py-12 pb-24">
        <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Main content */}
          <div>
            <Greeting />
            <CheckInCard />
            <MilestoneTrail
              milestones={milestones}
              pathTitle="UX Designer"
              onToggle={handleToggle}
            />
          </div>

          {/* Sidebar */}
          <div className="sticky top-[100px]">
            <Sidebar
              progress={progress}
              momentum={72}
              checkIns={5}
              milestonesDone={doneCount}
              timeLogged={6.5}
            />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

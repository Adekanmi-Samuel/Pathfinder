"use client";

import { Header } from "@/components/layout/Header";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Greeting } from "@/components/dashboard/Greeting";
import { CheckInCard } from "@/components/dashboard/CheckInCard";
import { MilestoneTrail } from "@/components/dashboard/MilestoneTrail";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useEffect, useState, useCallback } from "react";

interface Milestone {
  id: string;
  month: number;
  label: string;
  completed: boolean;
  pathTitle?: string;
}

interface DashboardData {
  milestones: Milestone[];
  pathTitle: string;
  todayCheckIn: string | null;
  checkInsThisWeek: number;
  userName: string | null;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      const [milestonesRes, checkInsRes, userRes] = await Promise.all([
        fetch("/api/milestones"),
        fetch("/api/check-ins"),
        fetch("/api/user"),
      ]);

      if (!milestonesRes.ok || !checkInsRes.ok || !userRes.ok) {
        throw new Error("Failed to load dashboard data");
      }

      const milestonesData = await milestonesRes.json();
      const checkInsData = await checkInsRes.json();
      const userData = await userRes.json();

      const milestones: Milestone[] = (milestonesData.milestones || []).map(
        (m: Record<string, unknown>) => ({
          id: m.id as string,
          month: m.month as number,
          label: m.title as string,
          completed: m.completed as boolean,
          pathTitle: (m.paths as Record<string, string>)?.path_title,
        })
      );

      const pathTitle =
        milestones.length > 0 && milestones[0].pathTitle
          ? milestones[0].pathTitle
          : "Your path";

      setData({
        milestones,
        pathTitle,
        todayCheckIn: checkInsData.todayCheckIn?.focus || null,
        checkInsThisWeek: checkInsData.checkInsThisWeek || 0,
        userName: userData.user?.fullName || userData.user?.email?.split("@")[0] || null,
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleToggle = async (id: string, completed: boolean) => {
    // Optimistic update
    setData((prev) =>
      prev
        ? {
            ...prev,
            milestones: prev.milestones.map((m) =>
              m.id === id ? { ...m, completed } : m
            ),
          }
        : prev
    );

    try {
      const res = await fetch(`/api/milestone/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) {
        // Revert on failure
        setData((prev) =>
          prev
            ? {
                ...prev,
                milestones: prev.milestones.map((m) =>
                  m.id === id ? { ...m, completed: !completed } : m
                ),
              }
            : prev
        );
      }
    } catch {
      // Revert on error
      setData((prev) =>
        prev
          ? {
              ...prev,
              milestones: prev.milestones.map((m) =>
                m.id === id ? { ...m, completed: !completed } : m
              ),
            }
          : prev
      );
    }
  };

  const handleCheckIn = async (focus: string) => {
    try {
      const res = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focus }),
      });

      if (res.ok) {
        setData((prev) =>
          prev ? { ...prev, todayCheckIn: focus } : prev
        );
      }
    } catch (err) {
      console.error("Check-in error:", err);
    }
  };

  // Show sample data when no milestones exist (free tier or first visit)
  const milestones =
    data && data.milestones.length > 0
      ? data.milestones
      : [
          { id: "m1", month: 1, label: "Complete Google UX Design Certificate — module 1", completed: false },
          { id: "m2", month: 1, label: "Build first portfolio case study", completed: false },
          { id: "m3", month: 1, label: "Join two design communities", completed: false },
          { id: "m4", month: 2, label: "Find first freelance or volunteer project", completed: false },
          { id: "m5", month: 2, label: "Publish portfolio site", completed: false },
          { id: "m6", month: 3, label: "Apply to 20 relevant roles", completed: false },
        ];

  const doneCount = milestones.filter((m) => m.completed).length;
  const progress =
    milestones.length > 0 ? Math.round((doneCount / milestones.length) * 100) : 0;

  // Calculate momentum: based on check-ins this week and milestones completed
  const momentum = Math.min(
    100,
    Math.round(
      ((data?.checkInsThisWeek || 0) / 7) * 50 +
        (milestones.length > 0 ? (doneCount / milestones.length) * 50 : 0)
    )
  );

  return (
    <ProtectedRoute>
      <Header />
      <main className="py-12 pb-24">
        <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Main content */}
          <div>
            {loading ? (
              <div className="text-center py-20">
                <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-ink-soft text-sm font-mono">Loading your path…</p>
              </div>
            ) : error ? (
              <div className="bg-[#FBEDE9] border border-[#E8BDAF] rounded-card p-6">
                <h3 className="font-serif text-lg text-error mb-2">
                  Something went wrong
                </h3>
                <p className="text-[14.5px] text-ink-soft mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError("");
                    setLoading(true);
                    fetchDashboard();
                  }}
                  className="text-ink font-medium underline cursor-pointer"
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <Greeting userName={data?.userName || undefined} />
                <CheckInCard
                  todayCheckIn={data?.todayCheckIn || undefined}
                  onSave={handleCheckIn}
                />
                <MilestoneTrail
                  milestones={milestones}
                  pathTitle={data?.pathTitle}
                  onToggle={handleToggle}
                />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="sticky top-[100px]">
            <Sidebar
              progress={progress}
              momentum={momentum}
              checkIns={data?.checkInsThisWeek || 0}
              milestonesDone={doneCount}
              timeLogged={0}
            />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get recent check-ins (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: checkIns, error } = await supabase
      .from("check_ins")
      .select("id, focus, date")
      .eq("user_id", user.id)
      .gte("date", thirtyDaysAgo.toISOString().split("T")[0])
      .order("date", { ascending: false });

    if (error) {
      console.error("Check-ins fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch check-ins" },
        { status: 500 }
      );
    }

    // Get today's check-in
    const today = new Date().toISOString().split("T")[0];
    const todayCheckIn = checkIns?.find((c) => c.date === today);

    // Count check-ins this week
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekStartStr = weekStart.toISOString().split("T")[0];
    const checkInsThisWeek = checkIns?.filter(
      (c) => c.date >= weekStartStr
    ).length || 0;

    return NextResponse.json({
      checkIns: checkIns || [],
      todayCheckIn: todayCheckIn || null,
      checkInsThisWeek,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch check-ins" },
      { status: 500 }
    );
  }
}

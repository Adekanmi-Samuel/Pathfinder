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

    // Get milestones joined with paths to verify ownership
    const { data: milestones, error } = await supabase
      .from("milestones")
      .select("id, path_id, title, month, sort_order, completed, completed_at, paths!inner(user_id, title as path_title)")
      .eq("paths.user_id", user.id)
      .order("month")
      .order("sort_order");

    if (error) {
      console.error("Milestones fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch milestones" },
        { status: 500 }
      );
    }

    return NextResponse.json({ milestones: milestones || [] });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch milestones" },
      { status: 500 }
    );
  }
}

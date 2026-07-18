import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await request.json();
    const { id } = params;

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "completed boolean is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the milestone and its path to verify ownership
    const { data: milestone } = await supabase
      .from("milestones")
      .select("id, path_id")
      .eq("id", id)
      .single();

    if (!milestone) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Verify the path belongs to this user
    const { data: path } = await supabase
      .from("paths")
      .select("id")
      .eq("id", milestone.path_id)
      .eq("user_id", user.id)
      .single();

    if (!path) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { error } = await supabase
      .from("milestones")
      .update({
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      console.error("Milestone update error:", error);
      return NextResponse.json(
        { error: "Failed to update milestone" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update milestone" },
      { status: 500 }
    );
  }
}

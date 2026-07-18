import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { focus } = await request.json();
    if (!focus || typeof focus !== "string") {
      return NextResponse.json(
        { error: "Focus text is required" },
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

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("check_ins")
      .upsert(
        { user_id: user.id, focus, date: today },
        { onConflict: "user_id,date" }
      )
      .select()
      .single();

    if (error) {
      console.error("Check-in error:", error);
      return NextResponse.json(
        { error: "Failed to save check-in" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to save check-in" },
      { status: 500 }
    );
  }
}

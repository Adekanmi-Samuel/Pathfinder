import { NextRequest, NextResponse } from "next/server";
import { generateMockPaths } from "@/lib/demo-paths";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { answers, prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    let parsedPaths;

    // Use Claude API only if a valid key exists, otherwise use demo mode
    if (apiKey && apiKey.length > 10) {
      console.log("[assessment] Using Claude API (key present)");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Anthropic API error:", response.status, text);
        // Fall back to demo mode on API error
        console.log("[assessment] API error, falling back to demo mode");
        parsedPaths = generateMockPaths(answers);
      } else {
        const data = await response.json();
        const textBlock = data.content?.find(
          (b: { type: string }) => b.type === "text"
        );
        if (!textBlock) {
          parsedPaths = generateMockPaths(answers);
        } else {
          let clean = textBlock.text.trim();
          clean = clean
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```\s*$/i, "");
          const parsed = JSON.parse(clean);
          parsedPaths = parsed.paths || generateMockPaths(answers);
        }
      }
    } else {
      // Demo mode — generate paths from templates based on answers
      console.log("[assessment] Using demo mode (no API key)");
      parsedPaths = generateMockPaths(answers);
    }

    // Try to save to Supabase if user is authenticated (best effort)
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && answers) {
        const { data: assessment } = await supabase
          .from("assessments")
          .insert({ user_id: user.id, answers })
          .select("id")
          .single();

        if (assessment) {
          for (const path of parsedPaths) {
            const { data: pathRecord } = await supabase
              .from("paths")
              .insert({
                assessment_id: assessment.id,
                user_id: user.id,
                title: path.title,
                match_score: path.matchScore,
                why: path.why,
                skills_needed: path.skillsNeeded,
                salary_range: path.salaryRange,
                roadmap: path.roadmap,
                resources: path.resources,
              })
              .select("id")
              .single();

            if (pathRecord && path.roadmap) {
              const milestones: Array<{
                path_id: string;
                title: string;
                month: number;
                sort_order: number;
              }> = [];

              for (const [monthKey, actions] of Object.entries(
                path.roadmap as Record<string, string[]>
              )) {
                const monthNum = parseInt(monthKey.replace("month", ""));
                actions.forEach((action, idx) => {
                  milestones.push({
                    path_id: pathRecord.id,
                    title: action,
                    month: monthNum,
                    sort_order: idx,
                  });
                });
              }

              if (milestones.length > 0) {
                await supabase.from("milestones").insert(milestones);
              }
            }
          }
        }

        // Send assessment complete email (fire and forget)
        if (user.email) {
          const { sendAssessmentCompleteEmail } = await import("@/lib/email");
          sendAssessmentCompleteEmail({
            email: user.email,
            name: user.user_metadata?.full_name || user.email.split("@")[0],
            paths: parsedPaths.map((p: { title: string; matchScore: number }) => ({
              title: p.title,
              matchScore: p.matchScore,
            })),
          }).catch(() => {});
        }
      }
    } catch (supabaseErr) {
      // Supabase save is optional — don't fail the assessment
      console.log("[assessment] Supabase save skipped:", supabaseErr);
    }

    return NextResponse.json({ paths: parsedPaths });
  } catch (err) {
    console.error("Assessment generation error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to generate roadmap",
      },
      { status: 500 }
    );
  }
}

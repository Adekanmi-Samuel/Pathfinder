import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateMockPaths } from "@/lib/demo-paths";

export async function POST(request: NextRequest) {
  try {
    const { answers, prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Get authenticated user (optional — works without auth for demo)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    let parsedPaths;

    if (apiKey && apiKey.length > 5) {
      // Use Claude API for real AI-powered paths
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
        return NextResponse.json(
          { error: `AI service error: ${response.status}` },
          { status: 502 }
        );
      }

      const data = await response.json();
      const textBlock = data.content?.find(
        (b: { type: string }) => b.type === "text"
      );
      if (!textBlock) {
        return NextResponse.json(
          { error: "No content returned from AI" },
          { status: 502 }
        );
      }

      // Parse JSON from response
      let clean = textBlock.text.trim();
      clean = clean
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "");
      const parsed = JSON.parse(clean);

      if (!parsed.paths || !Array.isArray(parsed.paths)) {
        return NextResponse.json(
          { error: "Invalid response structure" },
          { status: 502 }
        );
      }

      parsedPaths = parsed.paths;
    } else {
      // Demo mode — generate paths from templates based on answers
      console.log("No ANTHROPIC_API_KEY — using demo mode");
      parsedPaths = generateMockPaths(answers);
    }

    // Save to Supabase if user is authenticated
    if (user && answers) {
      // Save assessment
      const { data: assessment } = await supabase
        .from("assessments")
        .insert({ user_id: user.id, answers })
        .select("id")
        .single();

      if (assessment) {
        // Save paths and milestones
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
            // Insert milestones from roadmap
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
    }

    // Send assessment complete email (fire and forget)
    if (user?.email) {
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

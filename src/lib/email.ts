import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = "Pathfinder <hello@pathfinder.app>";

export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  if (!resend) {
    console.log("Resend not configured — skipping welcome email");
    return { success: false, skipped: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to Pathfinder — let's find your direction",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#F6F3EC;font-family:Georgia,serif;">
          <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
            <h1 style="font-size:28px;font-weight:600;color:#1A1D29;margin-bottom:16px;">
              Welcome to Pathfinder, ${name}.
            </h1>
            <p style="font-size:16px;line-height:1.6;color:#4A4D5A;margin-bottom:24px;">
              You're here because you want something better — a clearer direction, a plan that actually fits your life.
            </p>
            <p style="font-size:16px;line-height:1.6;color:#4A4D5A;margin-bottom:32px;">
              Here's what to do next:
            </p>
            <div style="background-color:#FFFFFC;border:1px solid #DCD5C4;border-radius:3px;padding:24px;margin-bottom:32px;">
              <p style="font-size:14px;color:#4A4D5A;margin:0 0 12px 0;">
                <strong style="color:#1A1D29;">1.</strong> Take the 8-question assessment (about 10 minutes)
              </p>
              <p style="font-size:14px;color:#4A4D5A;margin:0 0 12px 0;">
                <strong style="color:#1A1D29;">2.</strong> Get 3 personalized career paths with 90-day roadmaps
              </p>
              <p style="font-size:14px;color:#4A4D5A;margin:0;">
                <strong style="color:#1A1D29;">3.</strong> Start checking in daily to stay on track
              </p>
            </div>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://pathfinder-app-548.netlify.app"}/assessment"
               style="display:inline-block;background-color:#1A1D29;color:#F6F3EC;padding:14px 28px;border-radius:3px;text-decoration:none;font-size:15px;font-weight:500;">
              Start your assessment
            </a>
            <p style="font-size:13px;color:#A6A190;margin-top:40px;line-height:1.5;">
              No credit card required. Your answers are private and used only to generate your roadmap.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Failed to send welcome email:", err);
    return { success: false, error: err };
  }
}

export async function sendAssessmentCompleteEmail({
  email,
  name,
  paths,
}: {
  email: string;
  name: string;
  paths: Array<{ title: string; matchScore: number }>;
}) {
  if (!resend) {
    console.log("Resend not configured — skipping assessment email");
    return { success: false, skipped: true };
  }

  const pathList = paths
    .map(
      (p) =>
        `<li style="padding:8px 0;border-bottom:1px solid #DCD5C4;">
          <strong style="color:#1A1D29;">${p.title}</strong>
          <span style="color:#C08A3E;font-size:13px;margin-left:8px;">${p.matchScore}% match</span>
        </li>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your career paths are ready — ${paths.length} directions found`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#F6F3EC;font-family:Georgia,serif;">
          <div style="max-width:560px;margin:0 auto;padding:48px 24px;">
            <h1 style="font-size:24px;font-weight:600;color:#1A1D29;margin-bottom:16px;">
              Your roadmap is ready, ${name}.
            </h1>
            <p style="font-size:16px;line-height:1.6;color:#4A4D5A;margin-bottom:24px;">
              Based on your assessment, here are the career paths we found for you:
            </p>
            <ul style="list-style:none;padding:0;margin:0 0 32px 0;background-color:#FFFFFC;border:1px solid #DCD5C4;border-radius:3px;">
              ${pathList}
            </ul>
            <p style="font-size:16px;line-height:1.6;color:#4A4D5A;margin-bottom:24px;">
              Each path comes with a detailed 90-day roadmap. Log in to your dashboard to track milestones and set daily check-ins.
            </p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://pathfinder-app-548.netlify.app"}/dashboard"
               style="display:inline-block;background-color:#1A1D29;color:#F6F3EC;padding:14px 28px;border-radius:3px;text-decoration:none;font-size:15px;font-weight:500;">
              View your dashboard
            </a>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Failed to send assessment email:", err);
    return { success: false, error: err };
  }
}

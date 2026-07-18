import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata = {
  title: "Privacy Policy — Pathfinder",
  description: "How Pathfinder handles your data and protects your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <header className="py-6 border-b border-line">
        <div className="max-w-[720px] mx-auto px-6">
          <Link
            href="/"
            className="font-serif font-semibold text-lg flex items-center gap-2"
          >
            <Logo size={18} />
            Pathfinder
          </Link>
        </div>
      </header>

      <main className="py-14 pb-24">
        <div className="max-w-[720px] mx-auto px-6">
          <h1 className="font-serif font-medium text-[clamp(28px,3.6vw,38px)] mb-8">
            Privacy Policy
          </h1>
          <p className="text-ink-soft text-sm font-mono mb-8">
            Last updated: July 18, 2026
          </p>

          <div className="prose prose-ink space-y-8">
            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                What we collect
              </h2>
              <p className="text-ink-soft leading-relaxed">
                When you use Pathfinder, we collect the information you provide
                during your career assessment — your skills, interests, values,
                constraints, and goals. We also collect your account information
                (name and email) when you create an account.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                How we use it
              </h2>
              <ul className="text-ink-soft leading-relaxed space-y-2 list-disc pl-5">
                <li>
                  To generate your personalized career roadmap and paths
                </li>
                <li>To track your progress and milestones over time</li>
                <li>
                  To send you daily check-in reminders (if you opt in)
                </li>
                <li>To improve our product and recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                AI processing
              </h2>
              <p className="text-ink-soft leading-relaxed">
                Your assessment answers are sent to Anthropic&apos;s Claude API
                to generate career recommendations. This data is processed
                according to Anthropic&apos;s privacy policy and is not used to
                train their models. We do not store the raw AI responses
                separately from your account data.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                Data storage
              </h2>
              <p className="text-ink-soft leading-relaxed">
                Your data is stored securely in Supabase (hosted on AWS) with
                row-level security policies that ensure only you can access your
                information. We do not sell or share your personal data with
                third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                Your rights
              </h2>
              <p className="text-ink-soft leading-relaxed">
                You can request deletion of your account and all associated data
                at any time by contacting us. You can also export your data
                through your dashboard.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                Contact
              </h2>
              <p className="text-ink-soft leading-relaxed">
                For privacy-related questions, email us at{" "}
                <a
                  href="mailto:hello@pathfinder.app"
                  className="text-ink underline hover:text-amber-deep transition-colors"
                >
                  hello@pathfinder.app
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

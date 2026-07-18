import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata = {
  title: "Terms of Service — Pathfinder",
  description: "Terms and conditions for using Pathfinder.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-ink-soft text-sm font-mono mb-8">
            Last updated: July 18, 2026
          </p>

          <div className="prose prose-ink space-y-8">
            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                What Pathfinder is
              </h2>
              <p className="text-ink-soft leading-relaxed">
                Pathfinder is a career direction tool that uses AI to generate
                personalized career paths and 90-day roadmaps based on your
                self-assessment answers. It is not career counseling, coaching,
                or professional advice.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                What we are not
              </h2>
              <p className="text-ink-soft leading-relaxed">
                We are not a recruitment agency, training provider, or
                employment service. We do not guarantee job placement, income
                levels, or career outcomes. The paths and roadmaps we generate
                are suggestions based on your inputs — your results will vary
                based on effort, market conditions, and many other factors.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                Subscriptions and payments
              </h2>
              <p className="text-ink-soft leading-relaxed">
                Pro and Business plans are billed monthly through Paystack. You
                can cancel your subscription at any time. Cancellation takes
                effect at the end of your current billing period. We do not
                offer partial refunds for unused time within a billing period.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                Account responsibility
              </h2>
              <p className="text-ink-soft leading-relaxed">
                You are responsible for maintaining the security of your account
                and for all activities that occur under your account. You must
                provide accurate information during the assessment to receive
                useful recommendations.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                Changes to these terms
              </h2>
              <p className="text-ink-soft leading-relaxed">
                We may update these terms from time to time. We will notify you
                of material changes by email or through the app. Continued use
                of Pathfinder after changes constitutes acceptance of the
                updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold mb-3">
                Contact
              </h2>
              <p className="text-ink-soft leading-relaxed">
                For questions about these terms, email us at{" "}
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

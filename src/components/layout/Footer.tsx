import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-parchment-dim/40 relative z-[2]">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8">
        {/* Main footer */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-serif font-semibold text-lg tracking-tight flex items-center gap-2 mb-3"
            >
              <Logo size={18} />
              Pathfinder
            </Link>
            <p className="text-[13.5px] text-ink-soft leading-relaxed max-w-[260px]">
              Your personalized 90-day career roadmap, built from a thoughtful assessment and guided by AI coaching.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/assessment" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Start Assessment
                </Link>
              </li>
              <li>
                <a href="#how" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#preview" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Sample Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Career Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.08em] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-150">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-line/70 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12.5px] text-ink-soft/70 font-mono">
            &copy; 2026 Pathfinder. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-[12.5px] text-ink-soft/70 hover:text-ink transition-colors duration-150"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[12.5px] text-ink-soft/70 hover:text-ink transition-colors duration-150"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-[12.5px] text-ink-soft/70 hover:text-ink transition-colors duration-150"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

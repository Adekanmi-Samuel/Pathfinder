"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/layout/AuthProvider";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/");
    router.refresh();
  };

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "?";

  return (
    <nav
      className={`sticky top-0 z-50 bg-parchment/85 backdrop-blur-md border-b border-line transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_12px_rgba(26,29,41,0.06)]" : "shadow-none"
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8 flex items-center justify-between h-[68px] sm:h-[76px]">
        <Link
          href="/"
          className="font-serif font-semibold text-xl tracking-tight flex items-center gap-2"
        >
          <Logo size={20} />
          Pathfinder
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            <a
              href="#how"
              className="text-[15px] text-ink-soft hover:text-ink transition-colors duration-150"
            >
              How it works
            </a>
            <a
              href="#preview"
              className="text-[15px] text-ink-soft hover:text-ink transition-colors duration-150"
            >
              See a roadmap
            </a>
            <a
              href="#pricing"
              className="text-[15px] text-ink-soft hover:text-ink transition-colors duration-150"
            >
              Pricing
            </a>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-[34px] h-[34px] rounded-full bg-ink text-parchment flex items-center justify-center font-serif text-sm cursor-pointer hover:bg-amber-deep transition-colors duration-150 hover:scale-105 active:scale-95"
              >
                {initials}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/assessment">
                <Button size="sm">Start your assessment</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-card hover:bg-parchment-dim transition-colors duration-150"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`absolute h-[1.5px] w-5 bg-ink rounded-full transition-all duration-200 ease-out ${
              mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-ink rounded-full transition-all duration-200 ease-out ${
              mobileOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-ink rounded-full transition-all duration-200 ease-out ${
              mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-[6px]"
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-1 flex flex-col gap-1 border-t border-line/60">
          <a
            href="#how"
            onClick={closeMobile}
            className="text-[15px] text-ink-soft hover:text-ink hover:bg-parchment-dim rounded-card px-3 py-2.5 transition-colors duration-150"
          >
            How it works
          </a>
          <a
            href="#preview"
            onClick={closeMobile}
            className="text-[15px] text-ink-soft hover:text-ink hover:bg-parchment-dim rounded-card px-3 py-2.5 transition-colors duration-150"
          >
            See a roadmap
          </a>
          <a
            href="#pricing"
            onClick={closeMobile}
            className="text-[15px] text-ink-soft hover:text-ink hover:bg-parchment-dim rounded-card px-3 py-2.5 transition-colors duration-150"
          >
            Pricing
          </a>
          <div className="h-px bg-line/60 my-1" />
          {user ? (
            <>
              <Link href="/dashboard" onClick={closeMobile}>
                <span className="text-[15px] text-ink font-medium block px-3 py-2.5 hover:bg-parchment-dim rounded-card transition-colors duration-150">
                  Dashboard
                </span>
              </Link>
              <button
                onClick={() => { handleLogout(); closeMobile(); }}
                className="text-left text-[15px] text-ink-soft hover:text-error px-3 py-2.5 rounded-card transition-colors duration-150"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeMobile}>
                <span className="text-[15px] text-ink font-medium block px-3 py-2.5 hover:bg-parchment-dim rounded-card transition-colors duration-150">
                  Sign in
                </span>
              </Link>
              <Link href="/assessment" onClick={closeMobile} className="block mt-1">
                <span className="text-[14px] font-medium bg-ink text-parchment text-center block rounded-card px-4 py-3 hover:bg-amber-deep transition-colors duration-150">
                  Start your assessment
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

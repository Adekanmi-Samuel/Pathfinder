"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/layout/AuthProvider";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/");
    router.refresh();
  };

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "?";

  return (
    <nav className="sticky top-0 z-50 bg-parchment/85 backdrop-blur-md border-b border-line">
      <div className="max-w-[1120px] mx-auto px-8 flex items-center justify-between h-[76px]">
        <Link
          href="/"
          className="font-serif font-semibold text-xl tracking-tight flex items-center gap-2"
        >
          <Logo size={20} />
          Pathfinder
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
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
                className="w-[34px] h-[34px] rounded-full bg-ink text-parchment flex items-center justify-center font-serif text-sm cursor-pointer hover:bg-amber-deep transition-colors"
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
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!supabase) {
      setError("Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If email confirmation is enabled, show success message
    // Otherwise redirect to dashboard
    setSuccess(true);
    setLoading(false);

    // Try to sign in immediately (if email confirmation is disabled)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!signInError) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif font-semibold text-xl flex items-center gap-2 justify-center mb-10"
        >
          <Logo size={20} />
          Pathfinder
        </Link>

        <div className="bg-card border border-line rounded-card p-8">
          <h1 className="font-serif text-2xl font-medium text-center mb-2">
            Create your account
          </h1>
          <p className="text-ink-soft text-sm text-center mb-8">
            Start finding your direction.
          </p>

          {error && (
            <div className="bg-[#FBEDE9] border border-[#E8BDAF] rounded-card px-4 py-3 mb-6 text-sm text-error">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-[#E8F0E4] border border-[#B8D4A8] rounded-card px-4 py-3 mb-6 text-sm text-moss">
              Check your email for a confirmation link, or you&apos;ll be
              redirected shortly.
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-mono text-xs text-ink-soft uppercase tracking-[0.06em] mb-2"
              >
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full bg-parchment-dim border border-line rounded-card px-4 py-3 font-sans text-base text-ink placeholder:text-[#A6A190] focus:outline-none focus:border-amber transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs text-ink-soft uppercase tracking-[0.06em] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-parchment-dim border border-line rounded-card px-4 py-3 font-sans text-base text-ink placeholder:text-[#A6A190] focus:outline-none focus:border-amber transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-mono text-xs text-ink-soft uppercase tracking-[0.06em] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full bg-parchment-dim border border-line rounded-card px-4 py-3 font-sans text-base text-ink placeholder:text-[#A6A190] focus:outline-none focus:border-amber transition-colors duration-150"
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center mt-2"
            >
              Create account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-ink-soft mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-ink font-medium underline underline-offset-2 hover:text-amber-deep transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

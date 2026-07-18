"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-parchment-dim rounded-card animate-pulse",
        className
      )}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="py-12 pb-24">
      <div className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-[1fr_320px] gap-12 items-start">
        <div>
          {/* Greeting skeleton */}
          <div className="mb-9">
            <Skeleton className="h-3 w-40 mb-3" />
            <Skeleton className="h-9 w-72" />
          </div>

          {/* Check-in card skeleton */}
          <div className="bg-card border border-line rounded-card p-7 mb-8">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-64 mb-4" />
            <div className="flex gap-2.5">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-24" />
            </div>
          </div>

          {/* Milestone skeleton */}
          <div className="flex justify-between items-baseline mb-5">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="bg-card border border-line rounded-card px-7">
            {[1, 2, 3].map((month) => (
              <div key={month} className="py-6 border-b border-line last:border-b-0">
                <Skeleton className="h-3 w-20 mb-4" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3.5 py-2">
                    <Skeleton className="w-[18px] h-[18px] rounded-[3px] flex-shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="space-y-5">
          <div className="bg-card border border-line rounded-card p-6">
            <Skeleton className="h-3 w-28 mb-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-[76px] h-[76px] rounded-full" />
              <div>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
          <div className="bg-card border border-line rounded-card p-6">
            <Skeleton className="h-3 w-24 mb-4" />
            <Skeleton className="h-8 w-12 mb-2" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <div className="bg-card border border-line rounded-card p-6">
            <Skeleton className="h-3 w-24 mb-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between py-2.5 border-t border-line first:border-t-0">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

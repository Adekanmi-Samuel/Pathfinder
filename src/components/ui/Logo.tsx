"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 20, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 20C6 16 8 10 12 10C16 10 15 17 19 17C21 17 22 14 22 12"
        stroke="#C08A3E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="10" r="1.8" fill="#1A1D29" />
    </svg>
  );
}

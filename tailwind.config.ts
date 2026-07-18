import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: { DEFAULT: "#F6F3EC", dim: "#EFEAE0" },
        ink: { DEFAULT: "#1A1D29", soft: "#4A4D5A" },
        amber: { DEFAULT: "#C08A3E", deep: "#9C6E2E" },
        moss: "#6B7A5E",
        line: "#DCD5C4",
        card: "#FFFFFC",
        error: "#A8432F",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: { card: "3px" },
      animation: {
        "draw-path": "drawPath 2.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "march-ants": "marchAnts 1.1s linear infinite",
        "pulse-check": "pulseCheck 420ms cubic-bezier(0.16,1,0.3,1)",
        "fade-in": "fadeIn 0.6s ease forwards",
      },
      keyframes: {
        drawPath: {
          from: { strokeDashoffset: "1400" },
          to: { strokeDashoffset: "0" },
        },
        marchAnts: { to: { strokeDashoffset: "-44" } },
        pulseCheck: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

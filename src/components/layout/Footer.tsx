export function Footer() {
  return (
    <footer className="border-t border-line py-10 relative z-[2]">
      <div className="max-w-[1120px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <p className="text-[13.5px] text-ink-soft font-mono">
          &copy; 2026 Pathfinder
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-[13.5px] text-ink-soft hover:text-ink transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[13.5px] text-ink-soft hover:text-ink transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-[13.5px] text-ink-soft hover:text-ink transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

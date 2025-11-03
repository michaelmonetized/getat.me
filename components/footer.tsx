import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 text-xs text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="m-0">© {year} Get At Me. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <span className="opacity-50">•</span>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}



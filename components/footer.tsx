import Link from "next/link";
import { Container } from "./layout/container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-border/60">
      <Container size="boxed" className="py-8 text-xs text-muted-foreground">
        <p className="text-center">
          Made with ♥︎ in <abbr title="North Carolina">NC</abbr> by{" "}
          <Link
            href="https://www.michaechurley.com/"
            className="hover:text-foreground"
          >
            Michael C. Hurley
          </Link>
        </p>
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
      </Container>
    </footer>
  );
}

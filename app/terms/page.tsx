import Link from "next/link";
import { PiFileTextLight } from "react-icons/pi";

export default function TermsPage() {
  const sections = [
    { id: "acceptance", label: "Acceptance of Terms" },
    { id: "accounts", label: "Accounts" },
    { id: "content", label: "User Content" },
    { id: "acceptable-use", label: "Acceptable Use" },
    { id: "billing", label: "Subscriptions & Billing" },
    { id: "ip", label: "Intellectual Property" },
    { id: "liability", label: "Disclaimers & Liability" },
    { id: "termination", label: "Termination" },
    { id: "governing-law", label: "Governing Law" },
    { id: "changes", label: "Changes" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 py-28 pt-36">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute -top-24 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-radial-[at_50%_0%] from-primary/15 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <PiFileTextLight className="h-4 w-4" />
            <span>Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            These Terms govern your access to and use of Get At Me. Please read
            them carefully.
          </p>
          <p className="text-xs text-muted-foreground">
            Last updated: January 27, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 grid gap-12 md:grid-cols-[220px_1fr]">
          {/* Sidebar Navigation */}
          <nav className="sticky top-24 self-start hidden md:block">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              On This Page
            </p>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-card/50"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="space-y-12">
            <section id="acceptance" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By creating an account or using Get At Me you agree to these
                Terms and our{" "}
                <Link
                  className="text-primary hover:underline"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="accounts" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">Accounts</h2>
              <ul className="space-y-3">
                {[
                  "You are responsible for maintaining the confidentiality of your account and credentials.",
                  "You must provide accurate information and keep it up to date.",
                  "We may suspend or terminate accounts that violate these Terms.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="border-t border-border/30" />

            <section id="content" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                User Content
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of the content you post. By posting
                content, you grant us a limited license to host and display it
                to operate the service.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="acceptable-use" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Acceptable Use
              </h2>
              <ul className="space-y-3">
                {[
                  "No illegal, infringing, or harmful activities.",
                  "No spam, malware, scraping, or attempts to disrupt the service.",
                  "Respect others' rights and comply with applicable laws.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="border-t border-border/30" />

            <section id="billing" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Subscriptions & Billing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Paid plans are billed via our payment partners. You can cancel
                anytime; cancellations take effect at the end of the current
                billing period.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Refunds are handled in accordance with applicable consumer laws
                and our policies.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="ip" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All rights in and to the Get At Me service, trademarks, and
                content (excluding your content) are owned by us or our
                licensors.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="liability" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Disclaimers & Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The service is provided &quot;as is&quot; without warranties of
                any kind. To the maximum extent permitted by law, our liability
                is limited to the amounts you paid in the 12 months preceding
                the claim.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="termination" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You can stop using the service at any time. We may suspend or
                terminate your access if you violate these Terms.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="governing-law" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of the State of Delaware,
                USA, without regard to conflict of law principles.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="changes" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">Changes</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms from time to time. The updated date
                will appear at the top of this page.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="contact" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about these Terms? Email{" "}
                <a
                  className="text-primary hover:underline"
                  href="mailto:contact@getatme.com"
                >
                  contact@getatme.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

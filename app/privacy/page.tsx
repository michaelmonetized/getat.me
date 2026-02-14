import Link from "next/link";
import { PiShieldCheckLight } from "react-icons/pi";

export default function PrivacyPage() {
  const sections = [
    { id: "info-we-collect", label: "Information we collect" },
    { id: "how-we-use", label: "How we use information" },
    { id: "cookies", label: "Cookies & tracking" },
    { id: "sharing", label: "Sharing with third parties" },
    { id: "retention", label: "Data retention" },
    { id: "security", label: "Security" },
    { id: "rights", label: "Your rights" },
    { id: "children", label: "Children's privacy" },
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
            <PiShieldCheckLight className="h-4 w-4" />
            <span>Your Data, Your Control</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your privacy matters. This page explains what we collect, why we
            collect it, and how you can control it.
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
            <section id="info-we-collect" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Information we collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information to operate Get At Me and provide you with
                a reliable service.
              </p>
              <ul className="space-y-3">
                {[
                  "Account information: name, email, profile details you choose to add.",
                  "Content: links, bios, images, and other media you upload.",
                  "Usage data: interactions, device info, IP, and log data to improve performance and security.",
                  "Payment data: processed by our payment partners (e.g., Stripe). We do not store full card numbers.",
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

            <section id="how-we-use" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                How we use information
              </h2>
              <ul className="space-y-3">
                {[
                  "Provide and personalize the service you request.",
                  "Process payments and prevent fraud and abuse.",
                  "Monitor performance, debug issues, and improve features.",
                  "Communicate important updates, security notices, and support responses.",
                  <>
                    Comply with legal obligations and enforce our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms
                    </Link>
                    .
                  </>,
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

            <section id="cookies" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Cookies & tracking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use essential cookies to keep you signed in and remember
                preferences. With your consent, we may use analytics to
                understand usage and improve the product.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="sharing" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Sharing with third parties
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We share data only with trusted providers necessary to deliver
                the service (e.g., authentication, hosting, payments, analytics,
                email). These providers process data on our behalf under
                appropriate agreements.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="retention" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Data retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We keep data for as long as your account is active or as needed
                to provide the service, comply with legal obligations, resolve
                disputes, and enforce agreements. You can request deletion at
                any time.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="security" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard safeguards to protect
                information. No method of transmission or storage is 100%
                secure; we continuously work to improve our protections.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="rights" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Your rights
              </h2>
              <ul className="space-y-3">
                {[
                  "Access, correct, or delete your data.",
                  "Export your data in a portable format.",
                  "Object to or restrict certain processing where applicable.",
                  "Withdraw consent where processing is based on consent.",
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

            <section id="children" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Children&rsquo;s privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Get At Me is not directed to children under 13. We do not
                knowingly collect personal information from children.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="changes" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">
                Changes to this policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this policy from time to time. We will post the
                updated date at the top of this page.
              </p>
            </section>

            <div className="border-t border-border/30" />

            <section id="contact" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about this policy? Email{" "}
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

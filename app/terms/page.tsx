import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="w-full">
      <section className="border-b border-border/60 bg-muted/10 py-24 pt-32">
        <div className="mx-auto w-full max-w-3xl px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">
            These Terms govern your access to and use of Get At Me. Please read them carefully.
          </p>
          <p className="text-xs text-muted-foreground">Last updated: January 27, 2025</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-3xl px-4 grid gap-10 md:grid-cols-[220px_1fr]">
          <nav className="sticky top-20 self-start hidden md:block">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#acceptance" className="hover:text-foreground">Acceptance of Terms</a></li>
              <li><a href="#accounts" className="hover:text-foreground">Accounts</a></li>
              <li><a href="#content" className="hover:text-foreground">User Content</a></li>
              <li><a href="#acceptable-use" className="hover:text-foreground">Acceptable Use</a></li>
              <li><a href="#billing" className="hover:text-foreground">Subscriptions & Billing</a></li>
              <li><a href="#ip" className="hover:text-foreground">Intellectual Property</a></li>
              <li><a href="#liability" className="hover:text-foreground">Disclaimers & Liability</a></li>
              <li><a href="#termination" className="hover:text-foreground">Termination</a></li>
              <li><a href="#governing-law" className="hover:text-foreground">Governing Law</a></li>
              <li><a href="#changes" className="hover:text-foreground">Changes</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </nav>

          <div className="space-y-10">
            <section id="acceptance" className="space-y-3">
              <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By creating an account or using Get At Me you agree to these Terms and our
                <Link className="underline ml-1" href="/privacy">Privacy Policy</Link>.
              </p>
            </section>

            <section id="accounts" className="space-y-3">
              <h2 className="text-2xl font-semibold">Accounts</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account and credentials.</li>
                <li>You must provide accurate information and keep it up to date.</li>
                <li>We may suspend or terminate accounts that violate these Terms.</li>
              </ul>
            </section>

            <section id="content" className="space-y-3">
              <h2 className="text-2xl font-semibold">User Content</h2>
              <p className="text-muted-foreground">You retain ownership of the content you post. By posting content, you grant us a limited license to host and display it to operate the service.</p>
            </section>

            <section id="acceptable-use" className="space-y-3">
              <h2 className="text-2xl font-semibold">Acceptable Use</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>No illegal, infringing, or harmful activities.</li>
                <li>No spam, malware, scraping, or attempts to disrupt the service.</li>
                <li>Respect others’ rights and comply with applicable laws.</li>
              </ul>
            </section>

            <section id="billing" className="space-y-3">
              <h2 className="text-2xl font-semibold">Subscriptions & Billing</h2>
              <p className="text-muted-foreground">Paid plans are billed via our payment partners. You can cancel anytime; cancelations take effect at the end of the current billing period.</p>
              <p className="text-muted-foreground">Refunds are handled in accordance with applicable consumer laws and our policies.</p>
            </section>

            <section id="ip" className="space-y-3">
              <h2 className="text-2xl font-semibold">Intellectual Property</h2>
              <p className="text-muted-foreground">All rights in and to the Get At Me service, trademarks, and content (excluding your content) are owned by us or our licensors.</p>
            </section>

            <section id="liability" className="space-y-3">
              <h2 className="text-2xl font-semibold">Disclaimers & Limitation of Liability</h2>
              <p className="text-muted-foreground">The service is provided “as is” without warranties of any kind. To the maximum extent permitted by law, our liability is limited to the amounts you paid in the 12 months preceding the claim.</p>
            </section>

            <section id="termination" className="space-y-3">
              <h2 className="text-2xl font-semibold">Termination</h2>
              <p className="text-muted-foreground">You can stop using the service at any time. We may suspend or terminate your access if you violate these Terms.</p>
            </section>

            <section id="governing-law" className="space-y-3">
              <h2 className="text-2xl font-semibold">Governing Law</h2>
              <p className="text-muted-foreground">These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of law principles.</p>
            </section>

            <section id="changes" className="space-y-3">
              <h2 className="text-2xl font-semibold">Changes</h2>
              <p className="text-muted-foreground">We may update these Terms from time to time. The updated date will appear at the top of this page.</p>
            </section>

            <section id="contact" className="space-y-3">
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="text-muted-foreground">Questions about these Terms? Email <a className="underline" href="mailto:contact@getatme.com">contact@getatme.com</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

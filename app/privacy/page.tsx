import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="w-full">
      <section className="border-b border-border/60 bg-muted/10 py-24 pt-32">
        <div className="mx-auto w-full max-w-3xl px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Your privacy matters. This page explains what we collect, why we
            collect it, and how you can control it.
          </p>
          <p className="text-xs text-muted-foreground">
            Last updated: January 27, 2025
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-3xl px-4 grid gap-10 md:grid-cols-[220px_1fr]">
          <nav className="sticky top-20 self-start hidden md:block">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#info-we-collect" className="hover:text-foreground">
                  Information we collect
                </a>
              </li>
              <li>
                <a href="#how-we-use" className="hover:text-foreground">
                  How we use information
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-foreground">
                  Cookies & tracking
                </a>
              </li>
              <li>
                <a href="#sharing" className="hover:text-foreground">
                  Sharing with third parties
                </a>
              </li>
              <li>
                <a href="#retention" className="hover:text-foreground">
                  Data retention
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-foreground">
                  Security
                </a>
              </li>
              <li>
                <a href="#rights" className="hover:text-foreground">
                  Your rights
                </a>
              </li>
              <li>
                <a href="#children" className="hover:text-foreground">
                  Children&rsquo;s privacy
                </a>
              </li>
              <li>
                <a href="#changes" className="hover:text-foreground">
                  Changes
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="space-y-10">
            <section id="info-we-collect" className="space-y-3">
              <h2 className="text-2xl font-semibold">Information we collect</h2>
              <p className="text-muted-foreground">
                We collect information to operate Get At Me and provide you with
                a reliable service.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Account information: name, email, profile details you choose
                  to add.
                </li>
                <li>
                  Content: links, bios, images, and other media you upload.
                </li>
                <li>
                  Usage data: interactions, device info, IP, and log data to
                  improve performance and security.
                </li>
                <li>
                  Payment data: processed by our payment partners (e.g.,
                  Stripe). We do not store full card numbers.
                </li>
              </ul>
            </section>

            <section id="how-we-use" className="space-y-3">
              <h2 className="text-2xl font-semibold">How we use information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and personalize the service you request.</li>
                <li>Process payments and prevent fraud and abuse.</li>
                <li>
                  Monitor performance, debug issues, and improve features.
                </li>
                <li>
                  Communicate important updates, security notices, and support
                  responses.
                </li>
                <li>
                  Comply with legal obligations and enforce our{" "}
                  <Link href="/terms" className="underline">
                    Terms
                  </Link>
                  .
                </li>
              </ul>
            </section>

            <section id="cookies" className="space-y-3">
              <h2 className="text-2xl font-semibold">Cookies & tracking</h2>
              <p className="text-muted-foreground">
                We use essential cookies to keep you signed in and remember
                preferences. With your consent, we may use analytics to
                understand usage and improve the product.
              </p>
            </section>

            <section id="sharing" className="space-y-3">
              <h2 className="text-2xl font-semibold">
                Sharing with third parties
              </h2>
              <p className="text-muted-foreground">
                We share data only with trusted providers necessary to deliver
                the service (e.g., authentication, hosting, payments, analytics,
                email). These providers process data on our behalf under
                appropriate agreements.
              </p>
            </section>

            <section id="retention" className="space-y-3">
              <h2 className="text-2xl font-semibold">Data retention</h2>
              <p className="text-muted-foreground">
                We keep data for as long as your account is active or as needed
                to provide the service, comply with legal obligations, resolve
                disputes, and enforce agreements. You can request deletion at
                any time.
              </p>
            </section>

            <section id="security" className="space-y-3">
              <h2 className="text-2xl font-semibold">Security</h2>
              <p className="text-muted-foreground">
                We implement industry-standard safeguards to protect
                information. No method of transmission or storage is 100%
                secure; we continuously work to improve our protections.
              </p>
            </section>

            <section id="rights" className="space-y-3">
              <h2 className="text-2xl font-semibold">Your rights</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access, correct, or delete your data.</li>
                <li>Export your data in a portable format.</li>
                <li>
                  Object to or restrict certain processing where applicable.
                </li>
                <li>Withdraw consent where processing is based on consent.</li>
              </ul>
            </section>

            <section id="children" className="space-y-3">
              <h2 className="text-2xl font-semibold">
                Children&rsquo;s privacy
              </h2>
              <p className="text-muted-foreground">
                Get At Me is not directed to children under 13. We do not
                knowingly collect personal information from children.
              </p>
            </section>

            <section id="changes" className="space-y-3">
              <h2 className="text-2xl font-semibold">Changes to this policy</h2>
              <p className="text-muted-foreground">
                We may update this policy from time to time. We will post the
                updated date at the top of this page.
              </p>
            </section>

            <section id="contact" className="space-y-3">
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="text-muted-foreground">
                Questions about this policy? Email{" "}
                <a className="underline" href="mailto:contact@getatme.com">
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

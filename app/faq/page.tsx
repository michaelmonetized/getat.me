export default function FAQPage() {
  const faqs: Array<{ q: string; a: string }> = [
    {
      q: "What is Get At Me?",
      a: "Get At Me is a modern link page that helps you turn your audience into fans and customers with bookings, payments, referrals, social proof, and more.",
    },
    {
      q: "Is there a free plan?",
      a: "Yes. You can use the Free plan forever and add up to 3 links. Upgrade anytime to unlock, Unlimited Links, Pro and ProMax features.",
    },
    {
      q: "Can I change plans later?",
      a: "Absolutely. You can upgrade or downgrade at any time. Changes take effect immediately.",
    },
    {
      q: "Do you support bookings and payments?",
      a: "Yes. Pro includes bookings; ProMax adds accepting payments and custom availability.",
    },
    {
      q: "How do referrals and social proof work?",
      a: "You can recommend other pros, collect ratings and testimonials, shown prominently on your profile to build trust.",
    },
    {
      q: "How do I get verified or vetted?",
      a: "You can get verified or vetted by upgrading to a paid plan. All paid plans include verification and vetting. Verification and vetting are subject to review and approval.",
    },
    {
      q: "Can I post anything I want?",
      a: "Yes. You can post anything you want on your profile. However, we reserve the right to remove any content that violates our terms of service.",
    },
  ];

  return (
    <div className="w-full">
      <section className="border-b border-border/60 bg-muted/10 py-24 pt-32">
        <div className="mx-auto w-full max-w-3xl px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Answers to common questions about plans, features, and using Get At
            Me.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-3xl px-4 space-y-6">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group border border-border/60 rounded-lg p-4"
            >
              <summary className="list-none cursor-pointer text-left font-semibold">
                {item.q}
              </summary>
              <div className="mt-2 text-muted-foreground leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

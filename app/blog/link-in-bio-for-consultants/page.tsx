import type { Metadata } from "next";
import Link from "next/link";
import { BlogJsonLd } from "@/components/blog-jsonld";

export const metadata: Metadata = {
  title: "Link in Bio for Consultants — Why You Need More Than Links",
  description:
    "Consultants need a bio link that books calls, collects payments, and builds trust. Here's how to set one up that actually grows your practice.",
  keywords: [
    "link in bio for consultants",
    "consultant link in bio",
    "booking link in bio",
    "consultant personal branding",
    "getat.me for consultants",
  ],
  openGraph: {
    title: "Link in Bio for Consultants — Why You Need More Than Links",
    description:
      "Your bio link should book calls and collect payments, not just list URLs.",
    type: "article",
    publishedTime: "2026-03-09T12:00:00Z",
  },
  alternates: {
    canonical: "https://getat.me/blog/link-in-bio-for-consultants",
  },
};

export default function LinkInBioForConsultants() {
  return (
    <>
      <BlogJsonLd
        title="Link in Bio for Consultants — Why You Need More Than Links"
        description="Consultants need a bio link that books calls, collects payments, and builds trust. Here's how to set one up that actually grows your practice."
        slug="link-in-bio-for-consultants"
        publishedTime="2026-03-09T12:00:00Z"
      />
    <article className="prose prose-invert mx-auto max-w-3xl px-6 py-16">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
          For Consultants
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Link in Bio for Consultants — Why You Need More Than Links
        </h1>
        <p className="mt-3 text-neutral-400">March 9, 2026 · 5 min read</p>
      </header>

      <p className="lead">
        You&apos;re a consultant. Your Instagram bio is prime real estate. And
        you&apos;re wasting it on a list of links that goes nowhere.
      </p>

      <h2>The Problem With Generic Link-in-Bio Tools</h2>
      <p>
        Most link-in-bio tools were built for influencers sharing affiliate
        links. They give you a page of buttons. That&apos;s it. As a
        consultant, you need something fundamentally different:
      </p>
      <ul>
        <li>
          <strong>Booking</strong> — Let prospects schedule a discovery call
          without leaving your page
        </li>
        <li>
          <strong>Social proof</strong> — Show client reviews and testimonials
          right on your bio page
        </li>
        <li>
          <strong>Payments</strong> — Accept deposits, session fees, or
          retainers directly
        </li>
        <li>
          <strong>Referrals</strong> — Turn happy clients into a growth engine
        </li>
      </ul>

      <h2>What a Consultant&apos;s Bio Page Should Look Like</h2>
      <p>Think of it as a micro-website with one job: convert visitors into booked calls.</p>
      <ol>
        <li>
          <strong>Hero section</strong> — Your photo, one-line value prop, and a
          &quot;Book a Call&quot; button
        </li>
        <li>
          <strong>Services</strong> — 2-3 offerings with clear pricing
        </li>
        <li>
          <strong>Reviews</strong> — 3-5 client testimonials (collected
          automatically)
        </li>
        <li>
          <strong>About</strong> — Brief credentials and your story
        </li>
        <li>
          <strong>Links</strong> — Your podcast, newsletter, socials — the
          secondary stuff
        </li>
      </ol>

      <h2>How to Set This Up With GetAt.Me</h2>
      <p>
        GetAt.Me was built for exactly this use case. Here&apos;s the 5-minute
        setup:
      </p>
      <ol>
        <li>
          Sign up and claim your handle (e.g.,{" "}
          <code>getat.me/yourname</code>)
        </li>
        <li>Add your sections: Hero → Services → Reviews → About → Links</li>
        <li>Connect Stripe for payments</li>
        <li>Enable the booking widget with your availability</li>
        <li>Turn on the referral program — clients get a share for referrals</li>
      </ol>

      <h2>Real Results</h2>
      <p>
        Consultants using relationship-first bio pages see{" "}
        <strong>3-5x higher conversion rates</strong> compared to generic
        link-in-bio tools. Why? Because every element on the page is designed to
        build trust and reduce friction.
      </p>

      <h2>Stop Linking. Start Converting.</h2>
      <p>
        Your bio link is the most-clicked URL in your entire online presence.
        Make it count. Don&apos;t send people to a list of links — send them to
        a page that books calls, collects reviews, and grows your practice on
        autopilot.
      </p>

      <div className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center">
        <p className="text-lg font-semibold">
          Build your consultant bio page in 5 minutes
        </p>
        <Link
          href="/register"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white no-underline transition hover:bg-blue-500"
        >
          Get Started Free →
        </Link>
      </div>
    </article>
    </>
  );
}

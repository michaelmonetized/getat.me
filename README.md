# GetAt.Me &nbsp;—&nbsp; The Relationship-First Link-In-Bio Platform

[![Live Product](https://img.shields.io/badge/live-getat.me-6C47FF.svg)](https://getat.me)&nbsp;
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)&nbsp;
![Convex](https://img.shields.io/badge/Convex-real_time-blue.svg)

GetAt.Me turns a static “link in bio” into an interactive landing page that helps creators, consultants, and service-led businesses convert attention into loyal relationships. From personalized branding to bookings, reviews, referrals, and payments, every surface is designed to feel premium to fans while giving operators data-rich insights that investors love.

---

### Table of Contents

- [Why GetAt.Me](#why-getatme)
- [Audience-Focused Value](#audience-focused-value)
- [Signature Product Capabilities](#signature-product-capabilities)
- [Plans & Monetization](#plans--monetization)
- [Traction Signals & Roadmap](#traction-signals--roadmap)
- [Product Experience Highlights](#product-experience-highlights)
- [Technology & Infrastructure](#technology--infrastructure)
- [Getting Started Locally](#getting-started-locally)
- [Connect With Us](#connect-with-us)

---

## Why GetAt.Me

- **Built for the next wave of solo brands.** A modern, mobile-native profile that feels on-brand, loads instantly, and converts casual views into high-value actions.
- **Retention over vanity metrics.** Two-way interactions (chat, reviews, referrals) give creators a CRM-grade console without enterprise setup.
- **Investor-aligned economics.** A subscription-first model with clear expansion revenue levers (Pro & ProMax) and embedded payments, enabling attractive LTV/CAC ratios as acquisition scales.
- **YC-ready ambition.** GetAt.Me integrates marketing, scheduling, monetization, and community engagement into one cohesive UX—exactly the sort of wedge YC partners expect before demo day.

---

## Audience-Focused Value

### For Creators & Agencies
- Replaces “link farms” with a customizable microsite that mirrors your brand kit and tone.
- Offers always-on booking, reviews, and DMs so every profile visit becomes a chance to transact or gather social proof.
- Automates analytics and notifications, letting teams prioritize their highest converting formats.

### For Investors & YC Scouts
- Demonstrates a clear GTM strategy that ladders from a free footprint to premium upgrades tied to measurable outcomes.
- Unlocks proprietary engagement data (referrals, messaging, booking velocity) to forecast retention and expansion.
- Features a modular architecture that accelerates shipping net-new vertical offerings (ex: paid communities, affiliate hubs).

### For End Users & Fans
- Delivers a polished destination for discovering services, leaving reviews, booking time, and supporting talent.
- Enables frictionless payments, referrals, or digital product access without leaving the page.
- Signals credibility through verified profiles, dynamic testimonials, and rich updates.

---

## Signature Product Capabilities

| Capability | What Users Experience | Why It Matters |
|------------|----------------------|----------------|
| **Visual Identity Engine** | Upload hero media, theme colors, and typography presets for a premium look on any device. | Keeps the profile brand-consistent across campaigns. |
| **Dynamic Link Management** | Drag-and-drop links, segment by category, and highlight timely offers. | Drives higher click-through rates without editing HTML. |
| **Bookings & Calendar Sync** | Offer availability, intake forms, and Google Calendar sync within the same profile. | Converts profile visits into qualified meetings faster. |
| **Ratings & Testimonials** | Collect and display social proof with moderation controls. | Builds trust and increases conversion for services and referrers. |
| **Referrals & Partner Hub** | Send, receive, and track referrals with transparent attribution. | Opens a new growth channel beyond paid ads. |
| **Live Chat & Messaging** | Real-time conversations triggered directly from the profile. | Turns intent into conversions while the visitor is engaged. |
| **Creator Analytics** | Monitor traffic, clicks, referrals, bookings, and revenue trends. | Powers data-driven upgrades and sponsor conversations. |
| **Monetized Updates** | Publish rich media updates, exclusive drops, or gated paywalls. | Adds recurring revenue streams without additional tools. |

---

## Plans & Monetization

### Free
- Personalized link landing page with essential branding.
- Link management, basic analytics, and social profile integrations.

### Premium
- Unlock unlimited links and advanced customization to keep campaigns fresh.
- Priority support and automation workflows as audiences scale.

### Pro
- Everything in Premium plus:
  - Booking forms with Google Calendar sync.
  - Ratings and featured testimonials.
  - Referrals, live chat, and granular notification controls.
  - Conversion-grade analytics for revenue storytelling.

### ProMax
- All Pro features plus:
  - Paid appointments and direct payments from any visitor.
  - Referral commissions and affiliate tagging.
  - Rich content posts with photos and video embeds.
  - Custom availability templates and pre-qualified booking flows.
  - Vetted verification badge for social credibility.

> **Expansion Strategy:** Each tier unlocks leverage for both sides of the marketplace (creators monetize more; fans get higher quality service). Higher tiers directly correlate with revenue-driving features (payments, commissions), making upgrades easy to justify.

---

## Traction Signals & Roadmap

**Signals we are proud of**
- Fast shipping velocity unlocks new monetization surfaces without disrupting existing creators.
- Feedback loops baked into the onboarding flow capture feature requests from day one.
- Enterprise-ready guardrails (authentication, observability, auditing) are already in place to ease brand partnerships.

**Roadmap highlights**
- Deepen integrations across calendars, CRMs, and payment providers to support agency-level workflows.
- Expand analytics into cohort insights and growth experiments to help creators benchmark success.
- Launch creator-to-creator marketplace features that increase referrals and network effects.

---

## Product Experience Highlights

- **Responsive-first UI:** Built on modern React patterns with Radix UI primitives for accessible and keyboard-friendly interactions.
- **Personalization at scale:** Themes, typography, and layout controls ensure every profile feels like a native extension of the creator’s brand.
- **Data visibility:** PostHog-powered analytics pipelines surface actionable funnels and export-ready insights.
- **Trust infrastructure:** Clerk-managed authentication, Stripe-powered payments, and Sentry-backed monitoring keep the platform dependable.

---

## Technology & Infrastructure

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 15 with the App Router, React 19, Tailwind CSS 4, Radix UI |
| Authentication & Access | Clerk for user/session management and multi-tenant orgs |
| Real-Time Backend | Convex powers low-latency data sync and transactional workflows |
| Payments & Monetization | Stripe for billing, payouts, and appointments |
| Analytics & Observability | PostHog, Sentry, and Resend for telemetry and lifecycle messaging |
| Dev Experience | Bun-powered tooling, TypeScript 5.9, Zod for schema validation |

This architecture lets us ship quickly while maintaining enterprise-grade security, auditability, and real-time personalization.

---

## Getting Started Locally

```bash
# Install dependencies
bun install

# Run the development server
bun run dev

# Visit the app
open http://localhost:3000
```

> _Before running locally, copy `.env.example` (if present) to `.env.local` and supply Clerk, Stripe, Convex, and PostHog keys. Reach out for sandbox credentials if you’re evaluating the platform._

---

## Connect With Us

- **Founding Team:** builders with experience in creator economy tools, growth loops, and realtime infrastructure.
- **Pitch Deck & Metrics:** investors@team.getat.me (deck, metrics, and Cohort reports available on request).
- **YC & Accelerator Conversations:** We’re actively exploring strategic partners—reach out for a focused walkthrough tailored to your thesis.

> Let’s craft a future where every personal brand has the infrastructure of a modern SaaS.  
> **[Schedule a founder call →](https://getat.me)**

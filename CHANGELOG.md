## 2025-10-31

- Fix: Use `@clerk/nextjs` in `context/convex.tsx` so Clerk sessions are propagated to Convex. This resolves errors like: `User not found. Please sign in.` when calling `links:updateLink`.
- Feature: Enhanced `PlanInfo` component to dynamically display user's current plan and conditional upgrade options
  - Added `getCurrentPlan` query to Convex to detect user's active subscription tier
  - Implemented intelligent upgrade display: Premium users see Pro & ProMax, Pro users see ProMax only, ProMax users see nothing
  - Supports three-tier plan structure: Premium ($3.99/mo), Pro ($7.99/mo), and ProMax ($14.99/mo)



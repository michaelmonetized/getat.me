## 2025-10-31

- Fix: Use `@clerk/nextjs` in `context/convex.tsx` so Clerk sessions are propagated to Convex. This resolves errors like: `User not found. Please sign in.` when calling `links:updateLink`.



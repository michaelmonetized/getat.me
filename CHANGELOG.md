## 2025-01-27

- Feature: Created modern, beautiful features landing page inspired by Raycast and Linear
  - Designed comprehensive hero section with gradient backgrounds and grid patterns
  - Organized features into three sections: Core Features, Pro Features, and ProMax Features
  - Added 20+ feature cards with Lucide icons, hover animations, and category badges
  - Implemented smooth transitions and modern card designs with backdrop blur effects
  - Added grid pattern background utility to globals.css for subtle texture
  - Included call-to-action sections with multiple buttons for conversion
  - Features organized by plan tier with clear visual hierarchy
  - Responsive grid layout that works on all screen sizes
  - Modern typography with gradient text accents and proper spacing
- Fix: Resolved TypeScript lint errors in features page
  - Removed unused `CardContent` import
  - Replaced `any` types with proper `React.ComponentType<{ className?: string }>` for icon props
- Feature: Added sitewide footer with privacy and terms links
  - New `components/footer.tsx` and wired into `app/layout.tsx`
  - Includes copyright line and links to `/privacy` and `/terms`

## 2025-10-31

- Enhancement: Redesigned pricing page with improved layout, custom header, and FAQ section
  - Added beautiful custom header with title and description
  - Wrapped PricingTable in proper container with max-width constraint
  - Added FAQ section with common pricing questions
  - Comprehensive Tailwind styling for all PricingTable elements using appearance prop
  - Styled pricing cards with hover effects, proper spacing, and responsive grid layout
  - Customized typography, colors, badges, and buttons to match app design system
  - Fixed navbar overlap by adding proper top padding (pt-24) to pricing page container
  - Beautifully styled plan details drawer with backdrop blur, proper spacing, and elegant typography
  - Enhanced drawer with feature list dividers, improved readability, and smooth scrolling
  - Added global CSS overrides with !important flags to ensure drawer styling applies properly
  - Reduced drawer horizontal padding and added proper top padding for better spacing
  - Fixed badge contrast by using secondary background/foreground colors
  - Fixed pricing card footer alignment with flexbox (mt-auto on footer, flex-1 on feature areas)
  - Improved typography with larger titles, better spacing, and enhanced feature list styling
- Fix: Use `@clerk/nextjs` in `context/convex.tsx` so Clerk sessions are propagated to Convex. This resolves errors like: `User not found. Please sign in.` when calling `links:updateLink`.
- Feature: Enhanced `PlanInfo` component to dynamically display user's current plan and conditional upgrade options
  - Uses Clerk's `has()` function to check user's active subscription tier (as Clerk handles all billing)
  - Implemented intelligent upgrade display: Premium users see Pro & ProMax, Pro users see ProMax only, ProMax users see nothing
  - Supports three-tier plan structure: Premium ($3.99/mo), Pro ($7.99/mo), and ProMax ($14.99/mo)
  - Removed obsolete `getCurrentPlan` Convex query since billing is managed entirely by Clerk
- Refactor: Centralized plan configuration in `.config/plans.ts` to eliminate hardcoded plan IDs across components
  - Updated `PlanInfo` and `LimitBanner` to import from centralized config
  - Added `@/config/*` path alias for cleaner imports
  - Fixed brittle array indexing by using `getPlanByName` helper function
- Fix: Eliminated SetHandleModal flash by removing loading state and only showing modal when user definitively lacks a handle
  - Modal now appears only after confirming the user doesn't exist in Convex (`userProfile === null`) or has no handle
  - Removed temporary "Setting up your profile..." loading message to allow page to render naturally
- Enhancement: Added CSS view transition for handle heading to smoothly animate across loading, error, and loaded states

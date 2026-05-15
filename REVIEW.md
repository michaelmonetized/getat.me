# FALLOW REVIEW

## HEALTH

## Vital Signs

| Metric | Value |
|:-------|------:|
| Total LOC | 20665 |
| Avg Cyclomatic | 2.8 |
| P90 Cyclomatic | 6 |
| Dead Files | 12.6% |
| Dead Exports | 8.3% |
| Maintainability (avg) | 90.8 |
| Circular Deps | 0 |
| Unused Deps | 13 |

## Fallow: 142 high complexity functions

| File | Function | Severity | Cyclomatic | Cognitive | CRAP | Lines |
|:-----|:---------|:---------|:-----------|:----------|:-----|:------|
| `app/%5Bhandle%5D/page.tsx:110` | `ProfilePage` | critical | 60 **!** | 44 **!** | 3660.0 **!** | 441 |
| `convex/booking.ts:50` | `handler` | critical | 42 **!** | 32 **!** | 1806.0 **!** | 54 |
| `components/views/posts/card.tsx:37` | `PostCard` | critical | 39 **!** | 28 **!** | 1560.0 **!** | 367 |
| `app/%5Bhandle%5D/dashboard/page.tsx:147` | `DashboardPage` | critical | 32 **!** | 20 **!** | 1056.0 **!** | 388 |
| `app/onboarding/page.tsx:46` | `OnboardingPage` | critical | 32 **!** | 22 **!** | 1056.0 **!** | 254 |
| `lib/qr.ts:320` | `isDataModule` | critical | 30 **!** | 39 **!** | 930.0 **!** | 32 |
| `components/features/feature-gate.tsx:31` | `hasAccess` | critical | 20 | 12 | 420.0 **!** | 23 |
| `lib/qr.ts:121` | `placeFinderPattern` | critical | 19 | 13 | 380.0 **!** | 19 |
| `components/features/verification-badge.tsx:24` | `VerificationBadge` | critical | 18 | 16 **!** | 342.0 **!** | 135 |
| `convex/links.ts:131` | `handler` | critical | 18 | 18 **!** | 342.0 **!** | 42 |
| `components/features/live-chat-widget.tsx:19` | `LiveChatWidget` | critical | 17 | 11 | 306.0 **!** | 209 |
| `components/set-handle-modal.tsx:20` | `SetHandleModal` | critical | 17 | 11 | 306.0 **!** | 104 |
| `components/features/referrals-widget.tsx:37` | `handleSubmit` | critical | 17 | 12 | 306.0 **!** | 91 |
| `components/features/message-threads.tsx:15` | `MessageThreads` | critical | 16 | 12 | 272.0 **!** | 193 |
| `components/features/message-threads.tsx:209` | `ConversationItem` | critical | 16 | 8 | 272.0 **!** | 69 |
| `components/features/live-messaging-widget.tsx:13` | `LiveMessagingWidget` | critical | 15 | 16 **!** | 240.0 **!** | 194 |
| `components/features/recommendations-widget.tsx:24` | `RecommendationsWidget` | critical | 15 | 14 | 240.0 **!** | 235 |
| `lib/qr.ts:202` | `encodeData` | critical | 14 | 20 **!** | 210.0 **!** | 73 |
| `lib/qr.ts:398` | `penaltyScore` | critical | 14 | 30 **!** | 210.0 **!** | 43 |
| `components/editor/tiptap-editor.tsx:22` | `TiptapEditor` | critical | 14 | 13 | 210.0 **!** | 322 |
| `components/forms/user/link-item.tsx:36` | `LinkItem` | critical | 13 | 8 | 182.0 **!** | 119 |
| `components/forms/user/avatar.tsx:10` | `AvatarUpload` | critical | 13 | 13 | 182.0 **!** | 159 |
| `components/forms/user/cover.tsx:10` | `CoverUpload` | critical | 13 | 9 | 182.0 **!** | 136 |
| `convex/booking.ts:155` | `handler` | critical | 12 | 12 | 156.0 **!** | 59 |
| `components/forms/user/avatar.tsx:24` | `handleFileChange` | critical | 12 | 10 | 156.0 **!** | 52 |
| `convex/notifications.ts:39` | `handler` | critical | 12 | 12 | 156.0 **!** | 44 |
| `components/features/appointments-table.tsx:89` | `AppointmentsTable` | critical | 12 | 8 | 156.0 **!** | 340 |
| `components/forms/user/cover.tsx:24` | `handleFileChange` | critical | 12 | 10 | 156.0 **!** | 52 |
| `components/forms/user/edit-link.tsx:60` | `handleSubmit` | critical | 11 | 14 | 132.0 **!** | 51 |
| `components/features/referrals-tables.tsx:19` | `ReferralsTables` | critical | 11 | 9 | 132.0 **!** | 110 |
| `app/upgraded/page.tsx:13` | `UpgradedPage` | critical | 11 | 5 | 132.0 **!** | 86 |
| `components/features/feature-gate.tsx:19` | `FeatureGate` | critical | 11 | 14 | 132.0 **!** | 93 |
| `components/navbar.tsx:11` | `Navbar` | critical | 10 | 6 | 110.0 **!** | 142 |
| `components/forms/user/sortable-item.tsx:44` | `SortableItem` | critical | 10 | 8 | 110.0 **!** | 137 |
| `components/features/social-proof-widget.tsx:9` | `SocialProofWidget` | critical | 10 | 7 | 110.0 **!** | 90 |
| `components/features/commissions-dashboard.tsx:26` | `CommissionsDashboard` | critical | 10 | 7 | 110.0 **!** | 91 |
| `hooks/user.ts:35` | `useUser` | critical | 10 | 9 | 110.0 **!** | 66 |
| `components/features/public-booking-widget.tsx:98` | `PublicBookingWidget` | critical | 10 | 10 | 110.0 **!** | 329 |
| `components/profile/public/avatar.tsx:7` | `Avatar` | critical | 10 | 5 | 110.0 **!** | 36 |
| `components/forms/user/add-link.tsx:31` | `handleSubmit` | critical | 10 | 9 | 110.0 **!** | 42 |
| `lib/qr.ts:278` | `placeData` | high | 9 | 20 **!** | 90.0 **!** | 26 |
| `components/forms/user/brand-settings.tsx:60` | `BrandSettings` | high | 9 | 6 | 90.0 **!** | 240 |
| `components/features/recommendations-widget.tsx:49` | `<arrow>` | high | 9 | 12 | 90.0 **!** | 20 |
| `app/%5Bhandle%5D/dashboard/page.tsx:48` | `MetricCard` | high | 9 | 7 | 90.0 **!** | 60 |
| `convex/users.ts:388` | `handler` | high | 9 | 9 | 90.0 **!** | 34 |
| `convex/http.ts:34` | `handler` | high | 9 | 6 | 90.0 **!** | 48 |
| `convex/payments.ts:58` | `handler` | high | 9 | 9 | 90.0 **!** | 37 |
| `components/forms/user/edit-link.tsx:47` | `EditLinkForm` | high | 8 | 5 | 72.0 **!** | 159 |
| `components/features/referrals-tables.tsx:130` | `ReferralRow` | high | 8 | 4 | 72.0 **!** | 30 |
| `components/forms/user/edit-post.tsx:12` | `EditPostForm` | high | 8 | 5 | 72.0 **!** | 70 |
| `convex/analytics.ts:25` | `handler` | high | 8 | 9 | 72.0 **!** | 72 |
| `app/api/resend/route.ts:12` | `POST` | high | 8 | 6 | 72.0 **!** | 36 |
| `lib/qr.ts:164` | `placeFixedPatterns` | high | 8 | 12 | 72.0 **!** | 24 |
| `components/features/public-booking-widget.tsx:200` | `handleSubmit` | high | 8 | 7 | 72.0 **!** | 46 |
| `convex/links.ts:217` | `handler` | high | 8 | 9 | 72.0 **!** | 25 |
| `convex/users.ts:504` | `handler` | high | 8 | 9 | 72.0 **!** | 51 |
| `components/user-handle.tsx:10` | `UserHandle` | high | 7 | 6 | 56.0 **!** | 55 |
| `scripts/ship.mts:23` | `run` | high | 7 | 6 | 56.0 **!** | 17 |
| `components/features/analytics-dashboard.tsx:16` | `AnalyticsDashboard` | high | 7 | 4 | 56.0 **!** | 97 |
| `hooks/use-toast.ts:74` | `reducer` | high | 7 | 6 | 56.0 **!** | 52 |
| `components/forms/user/brand-settings.tsx:76` | `<arrow>` | high | 7 | 11 | 56.0 **!** | 9 |
| `lib/qr.ts:189` | `reserveFormatBits` | high | 7 | 10 | 56.0 **!** | 10 |
| `lib/qr.ts:377` | `placeFormatInfo` | high | 7 | 10 | 56.0 **!** | 18 |
| `components/ui/link.tsx:105` | `<arrow>` | high | 7 | 2 | 56.0 **!** | 14 |
| `convex/posts.ts:264` | `handler` | high | 7 | 9 | 56.0 **!** | 44 |
| `convex/sections.ts:86` | `handler` | high | 7 | 6 | 56.0 **!** | 19 |
| `convex/links.ts:181` | `handler` | high | 7 | 7 | 56.0 **!** | 28 |
| `components/features/posts-widget.tsx:16` | `PostsWidget` | high | 7 | 5 | 56.0 **!** | 88 |
| `components/ui/flip-clock.tsx:5` | `getTimeParts` | high | 7 | 6 | 56.0 **!** | 11 |
| `components/views/posts/card.tsx:181` | `handleRepost` | high | 7 | 6 | 56.0 **!** | 54 |
| `convex/messages.ts:11` | `getUserDisplayName` | high | 7 | 6 | 56.0 **!** | 28 |
| `app/onboarding/page.tsx:94` | `handleSubmit` | high | 7 | 7 | 56.0 **!** | 41 |
| `app/account/page.tsx:17` | `<arrow>` | high | 7 | 4 | 56.0 **!** | 19 |
| `components/features/appointments-table.tsx:119` | `handleReschedule` | high | 7 | 4 | 56.0 **!** | 46 |
| `components/features/message-threads.tsx:71` | `handleSend` | high | 7 | 3 | 56.0 **!** | 22 |
| `components/features/booking-widget.tsx:15` | `BookingWidget` | high | 7 | 3 | 56.0 **!** | 124 |
| `components/forms/user/brand-settings.tsx:122` | `<arrow>` | moderate | 6 | 5 | 42.0 **!** | 21 |
| `components/forms/user/brand-settings.tsx:180` | `<arrow>` | moderate | 6 | 6 | 42.0 **!** | 26 |
| `hooks/user.ts:50` | `fetchClerkUser` | moderate | 6 | 8 | 42.0 **!** | 16 |
| `components/forms/user/link-item.tsx:59` | `handleLinkClick` | moderate | 6 | 9 | 42.0 **!** | 24 |
| `components/features/payment-widget.tsx:44` | `handleToggle` | moderate | 6 | 4 | 42.0 **!** | 23 |
| `components/features/live-messaging-widget.tsx:42` | `handleSendMessage` | moderate | 6 | 3 | 42.0 **!** | 26 |
| `convex/seedDemoProfiles.ts:516` | `handler` | moderate | 6 | 10 | 42.0 **!** | 49 |
| `components/forms/user/bio.tsx:27` | `debouncedUpdate` | moderate | 6 | 5 | 42.0 **!** | 13 |
| `lib/qr.ts:141` | `placeAlignmentPattern` | moderate | 6 | 5 | 42.0 **!** | 8 |
| `components/ui/link.tsx:19` | `prefetchImages` | moderate | 6 | 4 | 42.0 **!** | 15 |
| `components/features/public-booking-widget.tsx:50` | `getAvailableDays` | moderate | 6 | 7 | 42.0 **!** | 47 |
| `components/features/public-booking-widget.tsx:394` | `<arrow>` | moderate | 6 | 5 | 42.0 **!** | 23 |
| `components/features/live-chat-widget.tsx:65` | `handleSend` | moderate | 6 | 3 | 42.0 **!** | 22 |
| `components/features/availability-form.tsx:24` | `AvailabilityForm` | moderate | 6 | 4 | 42.0 **!** | 158 |
| `convex/sections.ts:113` | `handler` | moderate | 6 | 6 | 42.0 **!** | 25 |
| `convex/users.ts:26` | `handler` | moderate | 6 | 5 | 42.0 **!** | 20 |
| `convex/users.ts:95` | `handler` | moderate | 6 | 5 | 42.0 **!** | 20 |
| `convex/users.ts:146` | `handler` | moderate | 6 | 3 | 42.0 **!** | 28 |
| `components/set-handle-modal.tsx:50` | `handleSubmit` | moderate | 6 | 5 | 42.0 **!** | 31 |
| `components/features/share-profile.tsx:95` | `getSocialShareUrl` | moderate | 6 | 1 | 42.0 **!** | 19 |
| `components/features/share-profile.tsx:133` | `ShareProfile` | moderate | 6 | 4 | 42.0 **!** | 125 |
| `app/upgraded/page.tsx:33` | `<arrow>` | moderate | 6 | 2 | 42.0 **!** | 9 |
| `components/views/posts/card.tsx:151` | `submitReply` | moderate | 6 | 3 | 42.0 **!** | 29 |
| `components/views/posts/list-all.tsx:9` | `PostsList` | moderate | 6 | 3 | 42.0 **!** | 30 |
| `components/profile/public/handle.tsx:8` | `Handle` | moderate | 6 | 5 | 42.0 **!** | 36 |
| `app/%5Bhandle%5D/page.tsx:136` | `<arrow>` | moderate | 6 | 6 | 42.0 **!** | 16 |
| `components/ui/collapsible-section.tsx:14` | `CollapsibleSection` | moderate | 6 | 4 | 42.0 **!** | 28 |
| `components/editor/tiptap-editor.tsx:133` | `handleDrop` | moderate | 6 | 4 | 42.0 **!** | 39 |
| `components/editor/tiptap-editor.tsx:172` | `handlePaste` | moderate | 6 | 7 | 42.0 **!** | 28 |
| `components/editor/tiptap-editor.tsx:212` | `<arrow>` | moderate | 6 | 6 | 42.0 **!** | 13 |
| `app/contact/page.tsx:27` | `onSubmit` | moderate | 6 | 4 | 42.0 **!** | 36 |
| `components/features/booking-widget.tsx:55` | `handleToggle` | moderate | 6 | 4 | 42.0 **!** | 33 |
| `components/forms/user/section-manager.tsx:24` | `handleCreate` | moderate | 5 | 3 | 30.0 **!** | 13 |
| `components/forms/user/section-manager.tsx:38` | `handleUpdate` | moderate | 5 | 3 | 30.0 **!** | 9 |
| `components/forms/user/section-manager.tsx:48` | `handleDelete` | moderate | 5 | 3 | 30.0 **!** | 9 |
| `components/forms/user/sortable-item.tsx:20` | `getScheduleStatus` | moderate | 5 | 4 | 30.0 **!** | 9 |
| `components/forms/user/sortable-item.tsx:78` | `handleLinkClick` | moderate | 5 | 4 | 30.0 **!** | 18 |
| `components/forms/user/edit-post.tsx:20` | `handleSubmit` | moderate | 5 | 3 | 30.0 **!** | 32 |
| `components/forms/user/brand-settings.tsx:259` | `<arrow>` | moderate | 5 | 7 | 30.0 **!** | 28 |
| `components/forms/user/link-item.tsx:11` | `getScheduleStatus` | moderate | 5 | 4 | 30.0 **!** | 9 |
| `convex/stripe.ts:63` | `handler` | moderate | 5 | 5 | 30.0 **!** | 56 |
| `components/features/payment-widget.tsx:23` | `PaymentWidget` | moderate | 5 | 3 | 30.0 **!** | 145 |
| `components/features/public-posts-widget.tsx:15` | `PublicPostsWidget` | moderate | 5 | 4 | 30.0 **!** | 43 |
| `components/features/recommendations-widget.tsx:78` | `handleSubmit` | moderate | 5 | 3 | 30.0 **!** | 33 |
| `components/features/recommendations-widget.tsx:260` | `RecommenderAvatar` | moderate | 5 | 3 | 30.0 **!** | 20 |
| `components/features/verification-badge.tsx:36` | `handleApply` | moderate | 5 | 3 | 30.0 **!** | 25 |
| `lib/qr.ts:115` | `setModule` | moderate | 5 | 2 | 30.0 **!** | 5 |
| `lib/qr.ts:353` | `applyMask` | moderate | 5 | 7 | 30.0 **!** | 18 |
| `app/%5Bhandle%5D/dashboard/page.tsx:173` | `<arrow>` | moderate | 5 | 2 | 30.0 **!** | 5 |
| `convex/posts.ts:105` | `handler` | moderate | 5 | 4 | 30.0 **!** | 49 |
| `convex/posts.ts:392` | `handler` | moderate | 5 | 5 | 30.0 **!** | 29 |
| `components/features/live-chat-widget.tsx:53` | `<arrow>` | moderate | 5 | 2 | 30.0 **!** | 11 |
| `components/features/live-chat-widget.tsx:175` | `<arrow>` | moderate | 5 | 3 | 30.0 **!** | 29 |
| `convex/sections.ts:146` | `handler` | moderate | 5 | 5 | 30.0 **!** | 14 |
| `convex/links.ts:18` | `handler` | moderate | 5 | 5 | 30.0 **!** | 27 |
| `convex/links.ts:68` | `liveLinks` | moderate | 5 | 4 | 30.0 **!** | 5 |
| `components/features/share-profile.tsx:56` | `<arrow>` | moderate | 5 | 6 | 30.0 **!** | 24 |
| `components/views/posts/card.tsx:92` | `handleLike` | moderate | 5 | 3 | 30.0 **!** | 28 |
| `components/views/posts/card.tsx:121` | `handleReply` | moderate | 5 | 3 | 30.0 **!** | 29 |
| `convex/messages.ts:81` | `<arrow>` | moderate | 5 | 4 | 30.0 **!** | 15 |
| `app/%5Bhandle%5D/page.tsx:162` | `<arrow>` | moderate | 5 | 4 | 30.0 **!** | 13 |
| `app/%5Bhandle%5D/page.tsx:233` | `getButtonClasses` | moderate | 5 | 1 | 30.0 **!** | 12 |
| `components/forms/user/add-post.tsx:17` | `handleSubmit` | moderate | 5 | 3 | 30.0 **!** | 33 |
| `components/features/referrals-widget.tsx:21` | `ReferralsWidget` | moderate | 5 | 4 | 30.0 **!** | 186 |
| `convex/payments.ts:22` | `handler` | moderate | 5 | 5 | 30.0 **!** | 25 |
| `components/features/booking-widget.tsx:26` | `<arrow>` | moderate | 5 | 2 | 30.0 **!** | 28 |

**167** files, **875** functions analyzed (thresholds: cyclomatic > 20, cognitive > 15, CRAP >= 30.0)



## AUDIT

Comparing against baseline: /Users/michael/Projects/getat.me/.fallow/baselines/dead-code.json
Comparing against duplication baseline: /Users/michael/Projects/getat.me/.fallow/baselines/dupes.json
Comparing against health baseline: /Users/michael/Projects/getat.me/.fallow/baselines/health.json

Audit scope: 124 changed files vs main (64c4e7c..HEAD)
■ Metrics: dead code 0 · complexity 0 · duplication 41
## Fallow: 41 clone groups found (8.9% duplication)

### Duplicates

**Clone group 1** (11 lines, 2 instances)

- `app/%5Bhandle%5D/page.tsx:73-83`
- `components/forms/user/sortable-item.tsx:78-88`

**Clone group 2** (23 lines, 2 instances)

- `app/%5Bhandle%5D/page.tsx:393-414`
- `app/%5Bhandle%5D/page.tsx:420-442`

**Clone group 3** (28 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:84-111`
- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:112-138`

**Clone group 4** (19 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:151-169`
- `app/blog/link-in-bio-for-consultants/page.tsx:57-73`

**Clone group 5** (22 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:152-173`
- `app/blog/link-in-bio-for-consultants/page.tsx:77-94`

**Clone group 6** (19 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:156-174`
- `app/blog/link-in-bio-for-consultants/page.tsx:58-75`

**Clone group 7** (29 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:170-225`
- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:250-276`

**Clone group 8** (40 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:195-234`
- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:247-285`

**Clone group 9** (22 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:309-325`
- `app/blog/link-in-bio-for-consultants/page.tsx:50-71`

**Clone group 10** (24 lines, 2 instances)

- `app/blog/link-in-bio-for-consultants/page.tsx:34-57`
- `app/blog/linktree-vs-getat-me/page.tsx:34-56`

**Clone group 11** (17 lines, 2 instances)

- `app/blog/linktree-vs-getat-me/page.tsx:78-94`
- `app/blog/linktree-vs-getat-me/page.tsx:98-114`

**Clone group 12** (20 lines, 2 instances)

- `app/contact/page.tsx:74-93`
- `app/faq/page.tsx:55-74`

**Clone group 13** (23 lines, 2 instances)

- `app/features/page.tsx:272-294`
- `app/features/page.tsx:338-352`

**Clone group 14** (37 lines, 2 instances)

- `app/privacy/page.tsx:27-63`
- `app/terms/page.tsx:28-63`

**Clone group 15** (24 lines, 5 instances)

- `app/privacy/page.tsx:69-85`
- `app/privacy/page.tsx:88-111`
- `app/privacy/page.tsx:157-173`
- `app/terms/page.tsx:79-94`
- `app/terms/page.tsx:107-122`

**Clone group 16** (34 lines, 2 instances)

- `app/privacy/page.tsx:173-206`
- `app/terms/page.tsx:168-201`

**Clone group 17** (21 lines, 3 instances)

- `components/editor/tiptap-editor.tsx:54-73`
- `components/forms/user/avatar.tsx:39-59`
- `components/forms/user/cover.tsx:39-59`

**Clone group 18** (6 lines, 2 instances)

- `components/features/appointments-table.tsx:227-232`
- `components/features/appointments-table.tsx:239-244`

**Clone group 19** (6 lines, 2 instances)

- `components/features/appointments-table.tsx:240-245`
- `convex/booking.ts:137-141`

**Clone group 20** (12 lines, 2 instances)

- `components/features/appointments-table.tsx:265-276`
- `components/features/appointments-table.tsx:342-353`

**Clone group 21** (11 lines, 3 instances)

- `components/features/appointments-table.tsx:265-275`
- `components/features/appointments-table.tsx:342-352`
- `components/features/appointments-table.tsx:384-394`

**Clone group 22** (16 lines, 2 instances)

- `components/features/appointments-table.tsx:288-303`
- `components/features/appointments-table.tsx:361-376`

**Clone group 23** (12 lines, 3 instances)

- `components/features/appointments-table.tsx:288-299`
- `components/features/appointments-table.tsx:361-372`
- `components/features/appointments-table.tsx:402-413`

**Clone group 24** (22 lines, 2 instances)

- `components/features/live-chat-widget.tsx:41-62`
- `components/features/message-threads.tsx:47-68`

**Clone group 25** (37 lines, 2 instances)

- `components/features/live-chat-widget.tsx:159-195`
- `components/features/message-threads.tsx:136-172`

**Clone group 26** (21 lines, 2 instances)

- `components/features/posts-widget.tsx:22-41`
- `components/views/posts/card.tsx:70-90`

**Clone group 27** (8 lines, 2 instances)

- `components/features/public-booking-widget.tsx:3-10`
- `components/features/referrals-widget.tsx:4-11`

**Clone group 28** (35 lines, 2 instances)

- `components/features/recommendations-widget.tsx:137-171`
- `components/features/recommendations-widget.tsx:193-227`

**Clone group 29** (17 lines, 2 instances)

- `components/features/referrals-tables.tsx:62-78`
- `components/features/referrals-tables.tsx:97-113`

**Clone group 30** (48 lines, 2 instances)

- `components/forms/user/add-link.tsx:24-67`
- `components/forms/user/edit-link.tsx:58-105`

**Clone group 31** (44 lines, 2 instances)

- `components/forms/user/avatar.tsx:22-65`
- `components/forms/user/cover.tsx:22-65`

**Clone group 32** (32 lines, 2 instances)

- `components/forms/user/avatar.tsx:68-99`
- `components/forms/user/cover.tsx:68-99`

**Clone group 33** (31 lines, 2 instances)

- `components/forms/user/link-item.tsx:8-34`
- `components/forms/user/sortable-item.tsx:12-42`

**Clone group 34** (26 lines, 2 instances)

- `components/forms/user/link-item.tsx:39-59`
- `components/forms/user/sortable-item.tsx:53-78`

**Clone group 35** (19 lines, 2 instances)

- `components/forms/user/link-item.tsx:62-80`
- `components/forms/user/sortable-item.tsx:79-94`

**Clone group 36** (19 lines, 2 instances)

- `components/forms/user/link-item.tsx:88-106`
- `components/forms/user/sortable-item.tsx:118-132`

**Clone group 37** (26 lines, 2 instances)

- `components/forms/user/link-item.tsx:127-152`
- `components/forms/user/sortable-item.tsx:154-178`

**Clone group 38** (13 lines, 2 instances)

- `convex/posts.ts:342-354`
- `convex/posts.ts:359-371`

**Clone group 39** (46 lines, 2 instances)

- `convex/users.ts:98-127`
- `convex/users.ts:405-450`

**Clone group 40** (12 lines, 2 instances)

- `convex/users.ts:195-206`
- `convex/users.ts:214-225`

**Clone group 41** (16 lines, 2 instances)

- `convex/users.ts:424-439`
- `convex/users.ts:452-467`

### Clone Families

**Family 1** (5 groups, 121 lines across `components/forms/user/link-item.tsx`, `components/forms/user/sortable-item.tsx`)

- Extract 5 shared clone groups (121 lines) from link-item.tsx, sortable-item.tsx into components/forms/user (~121 lines saved)

**Family 2** (3 groups, 97 lines across `app/blog/best-link-in-bio-alternatives-2026/page.tsx`)

- Extract 3 shared clone groups (97 lines) from page.tsx into app/blog/best-link-in-bio-alternatives-2026 (~97 lines saved)

**Family 3** (3 groups, 95 lines across `app/privacy/page.tsx`, `app/terms/page.tsx`)

- Extract 3 shared clone groups (95 lines) from page.tsx, page.tsx into a shared directory (~167 lines saved)

**Family 4** (4 groups, 82 lines across `app/blog/best-link-in-bio-alternatives-2026/page.tsx`, `app/blog/link-in-bio-for-consultants/page.tsx`)

- Extract 4 shared clone groups (82 lines) from page.tsx, page.tsx into a shared directory (~82 lines saved)

**Family 5** (2 groups, 76 lines across `components/forms/user/avatar.tsx`, `components/forms/user/cover.tsx`)

- Extract 2 shared clone groups (76 lines) from avatar.tsx, cover.tsx into components/forms/user (~76 lines saved)

**Family 6** (3 groups, 74 lines across `convex/users.ts`)

- Extract 3 shared clone groups (74 lines) from users.ts into convex (~74 lines saved)

**Family 7** (2 groups, 59 lines across `components/features/live-chat-widget.tsx`, `components/features/message-threads.tsx`)

- Extract 2 shared clone groups (59 lines) from live-chat-widget.tsx, message-threads.tsx into components/features (~59 lines saved)

**Family 8** (5 groups, 57 lines across `components/features/appointments-table.tsx`)

- Extract 5 shared clone groups (57 lines) from appointments-table.tsx into components/features (~80 lines saved)

**Family 9** (1 group, 48 lines across `components/forms/user/add-link.tsx`, `components/forms/user/edit-link.tsx`)

- Extract shared function (48 lines) from add-link.tsx, edit-link.tsx (~48 lines saved)

**Family 10** (1 group, 35 lines across `components/features/recommendations-widget.tsx`)

- Extract shared function (35 lines) from recommendations-widget.tsx, recommendations-widget.tsx (~35 lines saved)

**Family 11** (1 group, 24 lines across `app/blog/link-in-bio-for-consultants/page.tsx`, `app/blog/linktree-vs-getat-me/page.tsx`)

- Extract shared function (24 lines) from page.tsx, page.tsx (~24 lines saved)

**Family 12** (1 group, 23 lines across `app/%5Bhandle%5D/page.tsx`)

- Extract shared function (23 lines) from page.tsx, page.tsx (~23 lines saved)

**Family 13** (1 group, 23 lines across `app/features/page.tsx`)

- Extract shared function (23 lines) from page.tsx, page.tsx (~23 lines saved)

**Family 14** (1 group, 21 lines across `components/editor/tiptap-editor.tsx`, `components/forms/user/avatar.tsx`, `components/forms/user/cover.tsx`)

- Extract shared function (21 lines) from tiptap-editor.tsx, avatar.tsx, cover.tsx (~42 lines saved)

**Family 15** (1 group, 21 lines across `components/features/posts-widget.tsx`, `components/views/posts/card.tsx`)

- Extract shared function (21 lines) from posts-widget.tsx, card.tsx (~21 lines saved)

**Family 16** (1 group, 20 lines across `app/contact/page.tsx`, `app/faq/page.tsx`)

- Extract shared function (20 lines) from page.tsx, page.tsx (~20 lines saved)

**Family 17** (1 group, 17 lines across `app/blog/linktree-vs-getat-me/page.tsx`)

- Extract shared function (17 lines) from page.tsx, page.tsx (~17 lines saved)

**Family 18** (1 group, 17 lines across `components/features/referrals-tables.tsx`)

- Extract shared function (17 lines) from referrals-tables.tsx, referrals-tables.tsx (~17 lines saved)

**Family 19** (1 group, 13 lines across `convex/posts.ts`)

- Extract shared function (13 lines) from posts.ts, posts.ts (~13 lines saved)

**Family 20** (1 group, 11 lines across `app/%5Bhandle%5D/page.tsx`, `components/forms/user/sortable-item.tsx`)

- Extract shared function (11 lines) from page.tsx, sortable-item.tsx (~11 lines saved)

**Family 21** (1 group, 8 lines across `components/features/public-booking-widget.tsx`, `components/features/referrals-widget.tsx`)

- Extract shared function (8 lines) from public-booking-widget.tsx, referrals-widget.tsx (~8 lines saved)

**Family 22** (1 group, 6 lines across `components/features/appointments-table.tsx`, `convex/booking.ts`)

- Extract shared function (6 lines) from appointments-table.tsx, booking.ts (~6 lines saved)

**Summary:** 1683 duplicated lines (8.9%) across 28 files

✓ duplication: 41 clone groups (warn) · 124 changed files (0.68s)
  audit gate excluded 13 inherited findings (run with --gate all to enforce)


## DEAD

## Fallow: 65 issues found

### Unused files (21)

- `components/features/live-messaging-widget.tsx`
- `components/features/posts-widget.tsx`
- `components/features/public-posts-widget.tsx`
- `components/features/referrals-management.tsx`
- `components/forms/user/edit-post.tsx`
- `components/forms/user/handle.tsx`
- `components/profile/index.tsx`
- `components/set-handle-modal.tsx`
- `components/ui/avatar.tsx`
- `components/ui/flip-clock.tsx`
- `components/ui/form.tsx`
- `components/ui/link.tsx`
- `components/ui/radio-group.tsx`
- `components/ui/skeleton.tsx`
- `components/ui/toaster.tsx`
- `components/ui/toggle-group.tsx`
- `components/ui/toggle.tsx`
- `components/ui/tooltip.tsx`
- `components/user-handle.tsx`
- `context/clerk.tsx`
- `lib/server-utils.ts`

### Unused exports (27)

- `app/opengraph-image.tsx`
  - :3 `runtime`
- `app/twitter-image.tsx`
  - :3 `runtime`
- `components/ui/badge.tsx`
  - :35 `badgeVariants`
- `components/ui/button.tsx`
  - :49 `buttonVariants`
- `components/ui/scroll-area.tsx`
  - :46 `ScrollBar`
- `components/ui/select.tsx`
  - :144 `SelectGroup`
  - :148 `SelectLabel`
  - :150 `SelectSeparator`
  - :151 `SelectScrollUpButton`
  - :152 `SelectScrollDownButton`
- `components/ui/table.tsx`
  - :91 `TableCaption`
  - :91 `TableFooter`
- `components/ui/toggle.tsx`
  - :43 `Toggle`
  - :43 `toggleVariants`
- `hooks/use-toast.ts`
  - :74 `reducer`
  - :189 `toast`
- `hooks/user.ts`
  - :107 `useUserByHandle`
  - :107 `useUserVerified`
  - :107 `useUserVetted`
- `lib/analytics.ts`
  - :9 `trackButtonClick`
  - :19 `trackLinkClick`
  - :28 `trackSignUp`
  - :33 `trackSignIn`
  - :43 `trackLinkAdded`
  - :53 `trackUpgradeStarted`
  - :58 `trackUpgradeCompleted`
  - :68 `track`

### Unused type exports (1)

- `components/ui/button.tsx`
  - :33 `ButtonProps`

### Unused dependencies (12)

- `@hookform/resolvers`
- `@react-email/components`
- `@tailwindcss/aspect-ratio`
- `@tailwindcss/container-queries`
- `@tailwindcss/forms`
- `@tailwindcss/typography`
- `@uiw/react-md-editor`
- `bun`
- `clerk`
- `react-email`
- `sentry`
- `tailwindcss-animate`

### Unused devDependencies (1)

- `eslint-config-next`

### Unlisted dependencies (3)

- `@clerk/types`
- `@tiptap/extension-link`
- `postcss-load-config`




## DUPLICATION

## Fallow: 46 clone groups found (9.5% duplication)

### Duplicates

**Clone group 1** (11 lines, 2 instances)

- `app/%5Bhandle%5D/page.tsx:73-83`
- `components/forms/user/sortable-item.tsx:78-88`

**Clone group 2** (23 lines, 2 instances)

- `app/%5Bhandle%5D/page.tsx:393-414`
- `app/%5Bhandle%5D/page.tsx:420-442`

**Clone group 3** (28 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:84-111`
- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:112-138`

**Clone group 4** (19 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:151-169`
- `app/blog/link-in-bio-for-consultants/page.tsx:57-73`

**Clone group 5** (22 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:152-173`
- `app/blog/link-in-bio-for-consultants/page.tsx:77-94`

**Clone group 6** (19 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:156-174`
- `app/blog/link-in-bio-for-consultants/page.tsx:58-75`

**Clone group 7** (29 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:170-225`
- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:250-276`

**Clone group 8** (40 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:195-234`
- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:247-285`

**Clone group 9** (22 lines, 2 instances)

- `app/blog/best-link-in-bio-alternatives-2026/page.tsx:309-325`
- `app/blog/link-in-bio-for-consultants/page.tsx:50-71`

**Clone group 10** (24 lines, 2 instances)

- `app/blog/link-in-bio-for-consultants/page.tsx:34-57`
- `app/blog/linktree-vs-getat-me/page.tsx:34-56`

**Clone group 11** (17 lines, 2 instances)

- `app/blog/linktree-vs-getat-me/page.tsx:78-94`
- `app/blog/linktree-vs-getat-me/page.tsx:98-114`

**Clone group 12** (20 lines, 2 instances)

- `app/contact/page.tsx:74-93`
- `app/faq/page.tsx:55-74`

**Clone group 13** (23 lines, 2 instances)

- `app/features/page.tsx:272-294`
- `app/features/page.tsx:338-352`

**Clone group 14** (37 lines, 2 instances)

- `app/privacy/page.tsx:27-63`
- `app/terms/page.tsx:28-63`

**Clone group 15** (24 lines, 5 instances)

- `app/privacy/page.tsx:69-85`
- `app/privacy/page.tsx:88-111`
- `app/privacy/page.tsx:157-173`
- `app/terms/page.tsx:79-94`
- `app/terms/page.tsx:107-122`

**Clone group 16** (34 lines, 2 instances)

- `app/privacy/page.tsx:173-206`
- `app/terms/page.tsx:168-201`

**Clone group 17** (21 lines, 3 instances)

- `components/editor/tiptap-editor.tsx:54-73`
- `components/forms/user/avatar.tsx:39-59`
- `components/forms/user/cover.tsx:39-59`

**Clone group 18** (6 lines, 2 instances)

- `components/features/appointments-table.tsx:227-232`
- `components/features/appointments-table.tsx:239-244`

**Clone group 19** (6 lines, 2 instances)

- `components/features/appointments-table.tsx:240-245`
- `convex/booking.ts:137-141`

**Clone group 20** (12 lines, 2 instances)

- `components/features/appointments-table.tsx:265-276`
- `components/features/appointments-table.tsx:342-353`

**Clone group 21** (11 lines, 3 instances)

- `components/features/appointments-table.tsx:265-275`
- `components/features/appointments-table.tsx:342-352`
- `components/features/appointments-table.tsx:384-394`

**Clone group 22** (16 lines, 2 instances)

- `components/features/appointments-table.tsx:288-303`
- `components/features/appointments-table.tsx:361-376`

**Clone group 23** (12 lines, 3 instances)

- `components/features/appointments-table.tsx:288-299`
- `components/features/appointments-table.tsx:361-372`
- `components/features/appointments-table.tsx:402-413`

**Clone group 24** (10 lines, 2 instances)

- `components/features/availability-form.tsx:25-33`
- `components/features/booking-widget.tsx:16-25`

**Clone group 25** (22 lines, 2 instances)

- `components/features/live-chat-widget.tsx:41-62`
- `components/features/message-threads.tsx:47-68`

**Clone group 26** (37 lines, 2 instances)

- `components/features/live-chat-widget.tsx:159-195`
- `components/features/message-threads.tsx:136-172`

**Clone group 27** (21 lines, 2 instances)

- `components/features/posts-widget.tsx:22-41`
- `components/views/posts/card.tsx:70-90`

**Clone group 28** (8 lines, 2 instances)

- `components/features/public-booking-widget.tsx:3-10`
- `components/features/referrals-widget.tsx:4-11`

**Clone group 29** (35 lines, 2 instances)

- `components/features/recommendations-widget.tsx:137-171`
- `components/features/recommendations-widget.tsx:193-227`

**Clone group 30** (17 lines, 2 instances)

- `components/features/referrals-tables.tsx:62-78`
- `components/features/referrals-tables.tsx:97-113`

**Clone group 31** (48 lines, 2 instances)

- `components/forms/user/add-link.tsx:24-67`
- `components/forms/user/edit-link.tsx:58-105`

**Clone group 32** (12 lines, 2 instances)

- `components/forms/user/avatar.tsx:11-22`
- `components/forms/user/cover.tsx:11-22`

**Clone group 33** (44 lines, 2 instances)

- `components/forms/user/avatar.tsx:22-65`
- `components/forms/user/cover.tsx:22-65`

**Clone group 34** (32 lines, 2 instances)

- `components/forms/user/avatar.tsx:68-99`
- `components/forms/user/cover.tsx:68-99`

**Clone group 35** (10 lines, 2 instances)

- `components/forms/user/bio.tsx:13-22`
- `components/forms/user/theme-selector.tsx:26-35`

**Clone group 36** (31 lines, 2 instances)

- `components/forms/user/link-item.tsx:8-34`
- `components/forms/user/sortable-item.tsx:12-42`

**Clone group 37** (26 lines, 2 instances)

- `components/forms/user/link-item.tsx:39-59`
- `components/forms/user/sortable-item.tsx:53-78`

**Clone group 38** (19 lines, 2 instances)

- `components/forms/user/link-item.tsx:62-80`
- `components/forms/user/sortable-item.tsx:79-94`

**Clone group 39** (19 lines, 2 instances)

- `components/forms/user/link-item.tsx:88-106`
- `components/forms/user/sortable-item.tsx:118-132`

**Clone group 40** (26 lines, 2 instances)

- `components/forms/user/link-item.tsx:127-152`
- `components/forms/user/sortable-item.tsx:154-178`

**Clone group 41** (9 lines, 2 instances)

- `convex/branding.ts:33-41`
- `convex/sections.ts:13-20`

**Clone group 42** (18 lines, 2 instances)

- `convex/links.ts:47-64`
- `convex/links.ts:85-102`

**Clone group 43** (13 lines, 2 instances)

- `convex/posts.ts:342-354`
- `convex/posts.ts:359-371`

**Clone group 44** (46 lines, 2 instances)

- `convex/users.ts:98-127`
- `convex/users.ts:405-450`

**Clone group 45** (12 lines, 2 instances)

- `convex/users.ts:195-206`
- `convex/users.ts:214-225`

**Clone group 46** (16 lines, 2 instances)

- `convex/users.ts:424-439`
- `convex/users.ts:452-467`

### Clone Families

**Family 1** (1 group, 23 lines across `app/%5Bhandle%5D/page.tsx`)

- Extract shared function (23 lines) from page.tsx, page.tsx (~23 lines saved)

**Family 2** (1 group, 11 lines across `app/%5Bhandle%5D/page.tsx`, `components/forms/user/sortable-item.tsx`)

- Extract shared function (11 lines) from page.tsx, sortable-item.tsx (~11 lines saved)

**Family 3** (3 groups, 97 lines across `app/blog/best-link-in-bio-alternatives-2026/page.tsx`)

- Extract 3 shared clone groups (97 lines) from page.tsx into app/blog/best-link-in-bio-alternatives-2026 (~97 lines saved)

**Family 4** (4 groups, 82 lines across `app/blog/best-link-in-bio-alternatives-2026/page.tsx`, `app/blog/link-in-bio-for-consultants/page.tsx`)

- Extract 4 shared clone groups (82 lines) from page.tsx, page.tsx into a shared directory (~82 lines saved)

**Family 5** (1 group, 24 lines across `app/blog/link-in-bio-for-consultants/page.tsx`, `app/blog/linktree-vs-getat-me/page.tsx`)

- Extract shared function (24 lines) from page.tsx, page.tsx (~24 lines saved)

**Family 6** (1 group, 17 lines across `app/blog/linktree-vs-getat-me/page.tsx`)

- Extract shared function (17 lines) from page.tsx, page.tsx (~17 lines saved)

**Family 7** (1 group, 20 lines across `app/contact/page.tsx`, `app/faq/page.tsx`)

- Extract shared function (20 lines) from page.tsx, page.tsx (~20 lines saved)

**Family 8** (1 group, 23 lines across `app/features/page.tsx`)

- Extract shared function (23 lines) from page.tsx, page.tsx (~23 lines saved)

**Family 9** (3 groups, 95 lines across `app/privacy/page.tsx`, `app/terms/page.tsx`)

- Extract 3 shared clone groups (95 lines) from page.tsx, page.tsx into a shared directory (~167 lines saved)

**Family 10** (1 group, 21 lines across `components/editor/tiptap-editor.tsx`, `components/forms/user/avatar.tsx`, `components/forms/user/cover.tsx`)

- Extract shared function (21 lines) from tiptap-editor.tsx, avatar.tsx, cover.tsx (~42 lines saved)

**Family 11** (5 groups, 57 lines across `components/features/appointments-table.tsx`)

- Extract 5 shared clone groups (57 lines) from appointments-table.tsx into components/features (~80 lines saved)

**Family 12** (1 group, 6 lines across `components/features/appointments-table.tsx`, `convex/booking.ts`)

- Extract shared function (6 lines) from appointments-table.tsx, booking.ts (~6 lines saved)

**Family 13** (1 group, 10 lines across `components/features/availability-form.tsx`, `components/features/booking-widget.tsx`)

- Extract shared function (10 lines) from availability-form.tsx, booking-widget.tsx (~10 lines saved)

**Family 14** (2 groups, 59 lines across `components/features/live-chat-widget.tsx`, `components/features/message-threads.tsx`)

- Extract 2 shared clone groups (59 lines) from live-chat-widget.tsx, message-threads.tsx into components/features (~59 lines saved)

**Family 15** (1 group, 21 lines across `components/features/posts-widget.tsx`, `components/views/posts/card.tsx`)

- Extract shared function (21 lines) from posts-widget.tsx, card.tsx (~21 lines saved)

**Family 16** (1 group, 8 lines across `components/features/public-booking-widget.tsx`, `components/features/referrals-widget.tsx`)

- Extract shared function (8 lines) from public-booking-widget.tsx, referrals-widget.tsx (~8 lines saved)

**Family 17** (1 group, 35 lines across `components/features/recommendations-widget.tsx`)

- Extract shared function (35 lines) from recommendations-widget.tsx, recommendations-widget.tsx (~35 lines saved)

**Family 18** (1 group, 17 lines across `components/features/referrals-tables.tsx`)

- Extract shared function (17 lines) from referrals-tables.tsx, referrals-tables.tsx (~17 lines saved)

**Family 19** (1 group, 48 lines across `components/forms/user/add-link.tsx`, `components/forms/user/edit-link.tsx`)

- Extract shared function (48 lines) from add-link.tsx, edit-link.tsx (~48 lines saved)

**Family 20** (3 groups, 88 lines across `components/forms/user/avatar.tsx`, `components/forms/user/cover.tsx`)

- Extract 3 shared clone groups (88 lines) from avatar.tsx, cover.tsx into components/forms/user (~88 lines saved)

**Family 21** (1 group, 10 lines across `components/forms/user/bio.tsx`, `components/forms/user/theme-selector.tsx`)

- Extract shared function (10 lines) from bio.tsx, theme-selector.tsx (~10 lines saved)

**Family 22** (5 groups, 121 lines across `components/forms/user/link-item.tsx`, `components/forms/user/sortable-item.tsx`)

- Extract 5 shared clone groups (121 lines) from link-item.tsx, sortable-item.tsx into components/forms/user (~121 lines saved)

**Family 23** (1 group, 9 lines across `convex/branding.ts`, `convex/sections.ts`)

- Extract shared function (9 lines) from branding.ts, sections.ts (~9 lines saved)

**Family 24** (1 group, 18 lines across `convex/links.ts`)

- Extract shared function (18 lines) from links.ts, links.ts (~18 lines saved)

**Family 25** (1 group, 13 lines across `convex/posts.ts`)

- Extract shared function (13 lines) from posts.ts, posts.ts (~13 lines saved)

**Family 26** (3 groups, 74 lines across `convex/users.ts`)

- Extract 3 shared clone groups (74 lines) from users.ts into convex (~74 lines saved)

**Summary:** 1797 duplicated lines (9.5%) across 35 files



## DOCSTRINGS

### Docstring Coverage

- Status: fail
- Coverage: 0.89%
- Documented symbols: 2/225
- Missing docstrings: 223


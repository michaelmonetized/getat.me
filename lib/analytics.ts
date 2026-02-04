import posthog from "posthog-js";

// Track page views
export function trackPageView(path: string, properties?: Record<string, unknown>) {
  posthog.capture("$pageview", { path, ...properties });
}

// Track button clicks
export function trackButtonClick(buttonName: string, properties?: Record<string, unknown>) {
  posthog.capture("button_clicked", { button_name: buttonName, ...properties });
}

// Track form submissions
export function trackFormSubmit(formName: string, properties?: Record<string, unknown>) {
  posthog.capture("form_submitted", { form_name: formName, ...properties });
}

// Track link clicks
export function trackLinkClick(linkName: string, href: string, properties?: Record<string, unknown>) {
  posthog.capture("link_clicked", { link_name: linkName, href, ...properties });
}

// Track sign up
export function trackSignUp(method?: string) {
  posthog.capture("user_signed_up", { method });
}

// Track sign in
export function trackSignIn(method?: string) {
  posthog.capture("user_signed_in", { method });
}

// Track profile creation
export function trackProfileCreated(handle: string) {
  posthog.capture("profile_created", { handle });
}

// Track link added
export function trackLinkAdded(linkType?: string) {
  posthog.capture("link_added", { link_type: linkType });
}

// Track link clicked (on profile)
export function trackProfileLinkClicked(handle: string, linkUrl: string) {
  posthog.capture("profile_link_clicked", { handle, link_url: linkUrl });
}

// Track upgrade
export function trackUpgradeStarted(plan: string) {
  posthog.capture("upgrade_started", { plan });
}

// Track upgrade completed
export function trackUpgradeCompleted(plan: string) {
  posthog.capture("upgrade_completed", { plan });
}

// Track contact form
export function trackContactFormSubmitted() {
  posthog.capture("contact_form_submitted");
}

// Generic event tracker
export function track(eventName: string, properties?: Record<string, unknown>) {
  posthog.capture(eventName, properties);
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import AddPostForm from "@/components/forms/user/add-post";
import { Container } from "@/components/layout/container";
import { PostsList } from "@/components/views/posts/list-all";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="flex flex-col min-h-dvh min-w-dvw">
          {/* Hero Section */}
          <section className="relative flex-1 flex items-center justify-center px-4 py-28 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-radial-[at_50%_0%] from-primary/25 via-transparent to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-linear-to-tr from-secondary/20 to-transparent blur-3xl" />

            <div className="relative max-w-5xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <span>Launch your link page in minutes</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                Turn your audience into
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  fans & customers
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get At Me gives you a beautiful, high-converting link page with
                bookings, payments, referrals, and live messaging— everything
                you need to grow your brand from a single link.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base"
                >
                  <Link href="/pricing">See Plans & Pricing</Link>
                </Button>
                <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding">
                  <Button size="lg" className="text-base">
                    Create Your Free Page
                  </Button>
                </SignUpButton>
              </div>
              <div className="text-xs text-muted-foreground">
                No credit card required
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 bg-muted/20 border-t border-border/60">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Choose Get At Me?
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customizable</CardTitle>
                    <CardDescription>Design your page your way</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Personalize your link page with custom colors, fonts, and
                      layouts that match your brand.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Easy to Use</CardTitle>
                    <CardDescription>Simple link management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Add, edit, and organize your links with our intuitive
                      interface. No coding required.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Professional</CardTitle>
                    <CardDescription>Stand out from the crowd</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Create a professional link page that showcases your work
                      and helps you grow your audience.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground">
                Create your link page in minutes and share it with the world.
              </p>
              <Button asChild size="lg">
                <Link href="/register">Create Your Page Now</Link>
              </Button>
            </div>
          </section>
        </div>
      </SignedOut>
      <SignedIn>
        <Container
          size="boxed"
          className="space-y-6 pt-20 justify-start items-stretch w-full"
        >
          <h1>Welcome back!</h1>
          <AddPostForm />
          <PostsList />
        </Container>
      </SignedIn>
    </>
  );
}

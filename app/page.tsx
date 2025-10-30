import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight">
            Get At Me
          </h1>
          <p className="text-2xl text-muted-foreground">
            Truly Engaging Link Pages
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a beautiful, customizable link page that truly represents you.
            Share your links, showcase your work, and connect with your audience.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Get At Me?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customizable</CardTitle>
                <CardDescription>
                  Design your page your way
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Personalize your link page with custom colors, fonts, and layouts that match your brand.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Easy to Use</CardTitle>
                <CardDescription>
                  Simple link management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Add, edit, and organize your links with our intuitive interface. No coding required.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>
                  Stand out from the crowd
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Create a professional link page that showcases your work and helps you grow your audience.</p>
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
  );
}

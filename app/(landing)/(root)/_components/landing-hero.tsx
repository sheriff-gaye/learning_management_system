"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-[36rem] w-[36rem] -translate-y-1/3 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
        <Badge
          variant="outline"
          className="gap-x-1.5 border-primary/30 bg-primary/5 text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-powered learning, reimagined
        </Badge>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block min-h-[1.2em] bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            <Typewriter
              options={{
                strings: [
                  "AI-Driven Learning Modules",
                  "Real-Time Progress Tracking",
                  "Personalized Learning Paths"
                ],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50
              }}
            />
          </span>
          <span className="mt-2 block">for the modern learner</span>
        </h1>

        <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          Embark on a transformative learning journey with a state-of-the-art
          AI-driven platform. Get personalized courses, real-time feedback,
          and the tools to master new skills at your own pace.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SignedIn>
            <Button size="lg" asChild className="rounded-full px-8 font-semibold">
              <Link href="/dashboard">
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button size="lg" asChild className="rounded-full px-8 font-semibold">
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full px-8 font-semibold"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

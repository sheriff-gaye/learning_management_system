"use client";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  useAuth,
  UserButton
} from "@clerk/nextjs";
import { Loader, PlayCircle } from "lucide-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className=" py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  space-y-5 font-extrabold">
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
        <div className="text-transparent  bg-clip-text bg-gradient-to-r  p-2  from-green-400 to-green-600">
          Learning Management Platform
        </div>
      </div>
      <div className=" flex justify-center  md:text-xl px-[10rem]">
        Embark on a transformative learning journey with our state of the art
        AI-driven platform. Experience personalized education tailored to your
        needs. Unlock a world of knowledge and skills, empowering you to thrive
        in today's dynamic landscape. Join our community and revolutionize the
        way you learn!
      </div>
      <div className="flex gap-x-2  justify-center">
        <Button
          size="lg"
          variant="outline"
          className="md:text-lg  p-4 md:p-6  rounded-full font-semibold"
        >
          <PlayCircle className="mr-2" />
          Get Started
        </Button>

        <SignedIn>
          <Button
            size="lg"
            variant="default"
            asChild
            className="md:text-lg  p-4 md:p-6  rounded-full font-semibold"
          >
            <Link href="/dashboard">Continue Learning</Link>
          </Button>
        </SignedIn>
      </div>
    </div>
  );
};

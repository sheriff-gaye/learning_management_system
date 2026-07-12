import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="mx-auto mb-24 max-w-6xl px-6">
      <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-emerald-700 px-8 py-16 text-center shadow-xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Unlock Your Potential
        </h2>
        <p className="text-lg text-white/90">Join our LMS and learn smarter</p>
        <p className="max-w-xl text-sm text-white/80 sm:text-base">
          Elevate your skills with our AI-powered Learning Management System.
          Whether you're starting out or looking to advance, our platform
          offers tailored content to help you succeed.
        </p>

        <Button variant="secondary" size="lg" asChild className="mt-2 rounded-full font-semibold">
          <Link href="/sign-up">
            Sign Up for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTA;

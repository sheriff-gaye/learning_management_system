"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const CTA = () => {
  const onClick = () => {
    redirect("/sign-up");
  };
  return (
    <div className="flex flex-col items-center gap-6 text-center bg-gradient-to-r from-green-500 to-green-700 p-8 rounded-lg shadow-lg mb-[6rem]">
      <div>
        <h2 className="text-4xl font-bold text-white mt-4">
          Unlock Your Potential
        </h2>
        <h3 className="text-2xl text-white mb-4">
          Join Our LMS and Learn Smarter
        </h3>
      </div>
      <p className="max-w-2xl text-lg text-white">
        Elevate your skills with our AI-powered Learning Management System.
        Whether you're starting out or looking to advance, our platform offers
        tailored content to help you succeed.
      </p>

      <div>
        <Button variant="secondary" size="lg" onClick={onClick}>
          Sign Up for Free
        </Button>
      </div>
    </div>
  );
};

export default CTA;

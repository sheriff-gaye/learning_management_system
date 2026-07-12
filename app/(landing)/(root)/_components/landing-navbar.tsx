"use client";

import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Loader, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Logo from "@/app/(dashboard)/_components/Logo";

const LandingNavBar = () => {
  const { isSignedIn } = useAuth();
  const { setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <Logo />

      <div className="flex items-center gap-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ClerkLoading>
          <Loader className="h-4 w-4 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button className="rounded-full font-semibold" size="lg">
              {isSignedIn ? "Dashboard" : "Sign In"}
            </Button>
          </Link>
        </ClerkLoaded>
      </div>
    </nav>
  );
};

export default LandingNavBar;

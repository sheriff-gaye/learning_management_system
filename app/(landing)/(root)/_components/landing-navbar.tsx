"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Loader, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Logo from "@/app/(dashboard)/_components/Logo";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingNavBar = () => {
  const { isSignedIn } = useAuth();

  const { theme, setTheme } = useTheme();
  const [isSunIcon, setIsSunIcon] = useState(true);

  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsSunIcon((prev: any) => !prev);
  };

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between w-full border-b">
      <Logo />

      <div className="flex  items-center gap-x-2">
        <ClerkLoading>
          <Loader className="h-4 w-4 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button variant="success"  size="lg" className="rounded-full">
              {
                isSignedIn ? "Dashboard" : "Sign In"
              }
            </Button>
          </Link>
        </ClerkLoaded>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
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
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;

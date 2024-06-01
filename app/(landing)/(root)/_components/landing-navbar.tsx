"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Loader, Moon, Sun } from "lucide-react"
import Link from "next/link";
import { useState } from "react";


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
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4 gap-3">
          <Image src="/logo.svg" alt="logo" fill />
          <h2 className="text-2xl font-bold ml-9">PluseAI</h2>
        </div>
        <h1
          className={cn("text-2xl  font-bold text-white", font.className)}
        ></h1>
      </Link>

      <div className="flex  items-center gap-x-2">
       <ClerkLoading>
        <Loader className="h-4 w-4 animate-spin"/>
       </ClerkLoading>
       <ClerkLoaded>
       <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="success" className="rounded-full">
            Get Stared
          </Button>
        </Link>
       </ClerkLoaded>
        <div>
        <button onClick={onClick} className="flex items-center transition pt-1.5">
            {isSunIcon ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;

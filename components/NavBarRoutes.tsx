"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { isTeacher } from "@/lib/teacher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react";

const NabBarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/courses");
  const isSearchPage = pathname === "/search";
  

  const{userId}=useAuth();

  const { theme, setTheme } = useTheme();

  return (


    <>
      { isSearchPage && (
        <div className="hidden md:block">
          <SearchInput/>
        </div>
      )}
    
      <div className="flex  gap-x-2 ml-auto z-[100]">
    
        {isTeacherPage || isPlayerPage ? (
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <LogOut />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button variant="ghost" size="sm">
              Teacher Mode
            </Button>
          </Link>
        ): null }
        <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-10">
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
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NabBarRoutes;

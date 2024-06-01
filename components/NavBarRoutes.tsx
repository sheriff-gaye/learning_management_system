"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { isTeacher } from "@/lib/teacher";

import { useState } from "react";

const NabBarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/courses");
  const isSearchPage = pathname === "/search";
  

  const{userId}=useAuth();

  const { theme, setTheme } = useTheme();
  const [isSunIcon, setIsSunIcon] = useState(true);

  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsSunIcon((prev: any) => !prev);
  };


  return (


    <>
      { isSearchPage && (
        <div className="hidden md:block">
          <SearchInput/>
        </div>
      )}
    
      <div className="flex  gap-x-2 ml-auto">
    
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
        <button onClick={onClick} className="flex items-center transition pt-1.5">
            {isSunIcon ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NabBarRoutes;

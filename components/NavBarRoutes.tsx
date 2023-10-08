"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { isTeacher } from "@/lib/teacher";

const NabBarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/courses");
  const isSearchPage = pathname === "/search";

  const{userId}=useAuth();

  return (


    <>
      { isSearchPage && (
        <div className="hidden md:block">
          <SearchInput/>
        </div>
      )}
      <div className="flex  gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
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
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NabBarRoutes;

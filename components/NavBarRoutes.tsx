"use client"
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NabBarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/chapter");

  return (
    <div className="flex  gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
         <Link href="/">
        <Button variant="ghost" size="sm">
          <LogOut />
          Exit
        </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button variant="ghost" size="sm">Teacher Mode</Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NabBarRoutes;

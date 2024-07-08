"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SiderBarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SiderBarItem = ({ icon: Icon, label, href }: SiderBarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6  transition-all hover:text-slate-600  hover:bg-slate-300/20",
        isActive &&
          "text-white bg-primary hover:bg-green-600/40 hover:text-green-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-primary", isActive && "text-white")}
        />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-green-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />

     
    </button>

    
  );
};



export default SiderBarItem;
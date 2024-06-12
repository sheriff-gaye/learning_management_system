"use client";

import React, { Suspense, useEffect, useState } from "react";
import { BarChart, Cog, Compass, Layout, List, MessageSquare, Newspaper } from "lucide-react";
import SiderBarItem from "./SiderBarItem";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const guestRoute = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search"
  },
  {
    icon: Newspaper,
    label: "Newsletter",
    href: "/newsletter"
  },
  {
    icon: MessageSquare,
    label: "Chatify",
    href: "/chatify"
  }
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics"
  }
];

const SideBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const [isLoading , setIsLoading]=useState(false);

  useEffect(()=>{

    setIsLoading(true)
    
  },[])

  if(!isLoading){
    return (
      <>
        <div className="flex items-center gap-x-2 p-4">
          <Skeleton className="h-6 w-6 bg-slate-200 rounded-md" />
          <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-md" />
        </div>
        <div className="flex items-center gap-x-2 p-4">
          <Skeleton className="h-6 w-6 bg-slate-200 rounded-md" />
          <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-md" />
        </div>
        <div className="flex items-center gap-x-2 p-4">
          <Skeleton className="h-6 w-6 bg-slate-200 rounded-md" />
          <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-md" />
        </div>
        <div className="flex items-center gap-x-2 p-4">
          <Skeleton className="h-6 w-6 bg-slate-200 rounded-md" />
          <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-md" />
        </div>
      </>
    );
  }

  

 
  const routes = isTeacherPage ? teacherRoutes : guestRoute;

  return (
    <div className="flex flex-col w-full ">
      {routes.map((route) => (
        <SiderBarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};


export default SideBarRoutes;

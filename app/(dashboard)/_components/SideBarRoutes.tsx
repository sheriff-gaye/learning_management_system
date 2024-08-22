"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  AirVent,
  BarChart,
  Cog,
  Compass,
  Layout,
  List,
  MessageSquare,
  Newspaper,
  NewspaperIcon,
  User,
  Users,
  Zap
} from "lucide-react";
import SiderBarItem from "./SiderBarItem";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const guestRoute = [
  {
    icon: Layout,
    label: "My Learning",
    href: "/dashboard"
  },
  {
    icon: Compass,
    label: "All Courses",
    href: "/search"
  },
  {
    icon: AirVent,
    label: "Contentify",
    href: "/contentify"
  },
  {
    icon: MessageSquare,
    label: "Chatify",
    href: "/chatify"
  },
  {
    icon: Newspaper,
    label: "Newsletter",
    href: "/newsletter"
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile"
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
  },
  {
    icon: NewspaperIcon,
    label: "NewsLetter",
    href: "/teacher/newsletter"
  },
  {
    icon: Users,
    label: "Users",
    href: "/teacher/users"
  }
];

const SideBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
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

      {isTeacherPage || (
        <div className="px-3 mt-[400px]">
          <Card className="bg-white/10 border-0">
            <CardContent className="py-6">
              <div className="text-center text-sm text-white mb-4 space-y-2">
                <p>hello</p>
                <Progress className="h-3" value={70} variant="premium" />
              </div>
              <Button variant="success" className="w-full">
                AI Credits
                <Zap className="w-4 h-4 ml-2 fill-white" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SideBarRoutes;

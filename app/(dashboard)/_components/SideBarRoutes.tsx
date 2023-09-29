"use client";

import React from "react";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SiderBarItem from "./SiderBarItem";
import { usePathname } from "next/navigation";

const guestRoute = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search"
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

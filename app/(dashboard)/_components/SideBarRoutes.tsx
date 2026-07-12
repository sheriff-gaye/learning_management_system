"use client";

import {
  AirVent,
  BarChart,
  Compass,
  Layout,
  List,
  MessageSquare,
  Newspaper,
  NewspaperIcon,
  User,
  Users
} from "lucide-react";
import SiderBarItem from "./SiderBarItem";
import { usePathname } from "next/navigation";

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
  const routes = isTeacherPage ? teacherRoutes : guestRoute;

  return (
    <div className="flex flex-col w-full gap-y-1 px-3">
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

import { Chapter, Course, UserProgress } from "@prisma/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSideBar from "./CourseSideBar";

interface CoursMobileSideBarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSideBar = ({
  course,
  progressCount
}: CoursMobileSideBarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden  pr-4  hover:opacity-75  transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-wite p-0 w-72">
        <CourseSideBar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSideBar;

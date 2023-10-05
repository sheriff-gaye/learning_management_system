import { Chapter, Course, UserProgress } from "@prisma/client";
import NavBarRoutes from '@/components/NavBarRoutes';
import CourseMobileSideBar from "./CourseMobileSideBar";




interface CourseNavBarProps {
    course: Course & {
      chapters: (Chapter & {
        userProgress: UserProgress[] | null;
      })[];
    };
    progressCount: number;
  }
  

const CourseNavBar = ({course,progressCount}:CourseNavBarProps) => {
  return (
    <div className=" p-4 border-b  h-full flex items-center bg-white shadow-sm">
        <CourseMobileSideBar course={course} progressCount={progressCount}/>
        <NavBarRoutes/>

    </div>
  )
}

export default CourseNavBar
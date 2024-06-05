import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
       <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <Suspense fallback={<CourseCard.Skeleton/>}>
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
          </Suspense>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )} 
    </div>
  );
};

// CoursesList.Skeleton = function CourseListSkeleto() {
//   return (
//     <Skeleton className="animate-pulse space-y-4 p-4 border rounded-md">
//       <Skeleton className="h-40 bg-slate-200 rounded-md"></Skeleton>
//       <Skeleton className="h-6 bg-slate-200 rounded-md"></Skeleton>
//       <Skeleton className="h-4 bg-slate-200 rounded-md"></Skeleton>
//       <Skeleton className="h-4 bg-red-200 rounded-md w-1/2"></Skeleton>
//     </Skeleton>
//   );
// };



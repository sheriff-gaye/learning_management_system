
import { redirect } from "next/navigation";
import { getDashbaordCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs";
import  {CoursesList}  from "@/components/courses-list";
import { Clock } from "lucide-react";
import { InfoCard } from "./_components/InfoCard";
import { Suspense } from "react";
import { Skeleton } from '@/components/ui/skeleton';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashbaordCourses(userId);


  return (
    <div className="p-6  space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
       <InfoCard icon={Clock} label="In Progress"  numberOfItems={coursesInProgress.length}/>
       <InfoCard icon={Clock} label="Completed"  numberOfItems={completedCourses.length} variant="success"/>



      </div>

   
     <CoursesList items={[...completedCourses, ...coursesInProgress]}/>
    

    </div>
  );
}

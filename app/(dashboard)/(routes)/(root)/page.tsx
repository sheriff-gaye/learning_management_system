
import { redirect } from "next/navigation";
import { getDashbaordCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs";
import { CoursesList } from "@/components/courses-list";
import { Clock } from "lucide-react";
import { InfoCard } from "./_components/InfoCard";

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
       <InfoCard icon={Clock} label="In Progress"  numberOfItems={coursesInProgress.length} variant="success"/>



      </div>

      <CoursesList items={[...completedCourses, ...coursesInProgress]}/>

    </div>
  );
}

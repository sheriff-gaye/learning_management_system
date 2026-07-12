import { redirect } from "next/navigation";
import { getDashbaordCourses } from "@/actions/get-dashboard-courses";
import { auth, currentUser } from "@clerk/nextjs";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/InfoCard";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const [user, { completedCourses, coursesInProgress }] = await Promise.all([
    currentUser(),
    getDashbaordCourses(userId),
  ]);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your courses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
      </div>

      <CoursesList items={[...completedCourses, ...coursesInProgress]} />
    </div>
  );
}

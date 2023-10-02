import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const CourseChapter = async ({
  params
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }


  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }



  const requiredFields=[
    chapter.title,
    chapter.description,

    chapter.videoUrl
  ]

  const totalFields=requiredFields.length
  const compltedFields=requiredFields.filter(Boolean).length;
  const completionText=`(${compltedFields}/${totalFields})`


  return(
    <div className="p-6">
        <div className="flex items-center  justify-between">
            <div className="w-full">
                <Link href={`/teacher/courses/${params.courseId}`} className="flex  items-center text-sm hover:opacity-75 transition mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2 "/>

                    Back to course setup
                </Link>

            </div>

        </div>

    </div>
  )
};

export default CourseChapter;

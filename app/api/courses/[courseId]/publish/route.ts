import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { transporter } from "@/components/email/transporter";



export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });


    const subscribers = await db.newsLetter.findMany();
    const emailPromises = subscribers.map((subscriber) =>
      transporter.sendMail({
        from: '"Course Platform" <sheriffgaye5@gmail.com>', 
        to: subscriber.email,
        subject: "New Course Published",
        text: `A new course titled "${course.title}" has been published. Check it out now!`,
        html: `<p>A new course titled "<strong>${course.title}</strong>" has been published. Check it out now!</p>`,
      })
    );

    await Promise.all(emailPromises);


    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
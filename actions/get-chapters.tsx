import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  chapterId,
  courseId
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId
      },
      select: {
        price: true
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        isPublished: true,
        id: chapterId
      }
    });

    if (!chapter || !course) {
      throw new Error("Course or Chapter Not Found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextCahpeter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          id: courseId
        }
      });

      nextCahpeter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position
          }
        },
        orderBy:{
            position:"asc"
        }
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId
        }
      });
    }


    const userProgress=await db.userProgress.findUnique({
        where:{
            userId_chapterId:{
                userId,
                chapterId
            }
        }
    });


    return{course,chapter,muxData,purchase,userProgress,attachments,nextCahpeter}
  } catch (error) {
    console.log("[GET CHAPTERS]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null
    };
  }
};

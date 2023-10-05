import { getChapter } from "@/actions/get-chapters";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/VideoPlayer";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    purchase,
    muxData,
    userProgress
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You have completed this cahpter" variant="success" />
      )}

      {isLocked && (
        <Banner label="You need to purchase this course to watch this chapter" variant="warning" />
      )}
      <div className="flex flex-col  max-w-4xl pb-20">
        <div className="p-4">
        <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>

      </div>
    </div>
  );
};
export default ChapterIdPage;

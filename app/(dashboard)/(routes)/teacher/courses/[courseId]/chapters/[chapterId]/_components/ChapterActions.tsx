"use client";

import ConfirmModel from "@/components/modals/ConfirmModel";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished
}: ChapterActionProps) => {
  const [isLoding, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter Unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter Published");
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");

      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex items-center gapx-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoding}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModel onConfirm={onDelete}>
        <Button size="sm" disabled={isLoding}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModel>
    </div>
  );
};

export default ChapterActions;

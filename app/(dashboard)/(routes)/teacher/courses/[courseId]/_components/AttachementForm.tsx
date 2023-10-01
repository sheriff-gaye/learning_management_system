"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachemntFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1)
});

export const AttachementForm = ({
  initialData,
  courseId
}: AttachemntFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachements`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachements/${id}`);
      toast.success("Attachement Deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const attachenum = initialData.attachments.length;

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachements
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a File
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {attachenum === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}

          {attachenum > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachement) => (
                <div
                  key={attachement.id}
                  className="flex items-center w-full p-3  bg-sky-100 border-sky-200 border  text-sky-700 rounded-md"
                >
                  <File className="h-4 mr-2 flex-shrink-0 w-4 " />
                  <p>{attachement.name}</p>
                  {deletingId === attachement.id && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {deletingId !== attachement.id && (
                    <button className="ml-auto hover:opacity-75 transition" onClick={()=>onDelete(attachement.id)}>
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            add anything your student might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

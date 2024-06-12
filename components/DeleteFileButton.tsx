"use client"

import { Loader2, Trash } from "lucide-react";
import { useTransition } from "react";
import { deleteFile } from "@/actions/delete-files";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

export const DeleteFileButton: React.FC<{ userId: string; fileId: string }> = ({
  userId,
  fileId,
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          const res = await deleteFile(userId, fileId);
          if (res.error) toast.error(res.error);
          if (res.success) toast.success("File deleted successfully");
        });
      }}
      size='sm'
      className='w-auto'
      variant='destructive'
    >
      {isPending ? (
        <Loader2 className='h-4 w-4 animate-spin' />
      ) : (
        <Trash className='h-4 w-4' />
      )}
    </Button>
  );
};
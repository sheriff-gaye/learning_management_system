"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
});

export async function deleteFile(userId: string, fileId: string) {
  try {
    const file = await db.file.findFirst({
      where: {
        id: fileId,
        userId,
      },
    });
    if (!file) return { error: "File not found" };

    await db.file.delete({
      where: {
        id: fileId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/${fileId}`);

    utapi.deleteFiles(file.key).then((res) => {
      console.log(
        `deleted filename:${file.name} and key:${file.key} from uploadThing`
      );
    });

    return { success: "File deleted" };
  } catch (error) {
    return { error: "Something went wrong deleting the file" };
  }
}
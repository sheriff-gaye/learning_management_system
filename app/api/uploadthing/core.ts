import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { UploadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { UploadThingError } from 'uploadthing/server';
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';

const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const f = createUploadthing();

const middleware = async () => {
  const { userId } = auth();
  if (!userId) throw new UploadThingError("Unauthorized");

  return { userId: userId };
};

const getUserQuestionLimit = async (userId: string) => {
  let userQuestionLimit = await db.quesLimit.findUnique({
    where: { userId },
  });

  if (!userQuestionLimit) {
    userQuestionLimit = await db.quesLimit.create({
      data: { userId, count: 0 },
    });
  }

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  if (!userQuestionLimit.updatedAt || new Date(userQuestionLimit.updatedAt) < oneDayAgo) {
    await resetUserQuestionCount(userId);
    userQuestionLimit.count = 0;
  }

  return userQuestionLimit;
};

const incrementUserQuestionCount = async (userId: string) => {
  await db.quesLimit.update({
    where: { userId },
    data: { count: { increment: 1 } },
  });
};

const resetUserQuestionCount = async (userId: string) => {
  await db.quesLimit.update({
    where: { userId },
    data: { count: 0 },
  });
};

const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = isTeacher(userId);
  if (!userId || !isAuthorized) throw new Error("Unauthorized");
  return { userId };
};

const UpdateFile = async (status: UploadStatus, fileId: string) => {
  await db.file.update({
    data: {
      uploadStatus: status,
    },
    where: {
      id: fileId,
    },
  });
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    readonly type: string;
    readonly name: string;
    readonly size: number;
    readonly customId: string | null;
    readonly url: string;
    readonly key: string;
  };
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      userId: metadata.userId!,
      key: file.key,
      url: `https://utfs.io/f/${file.key}`,
      name: file.name,
      uploadStatus: "SUCCESS",
    },
  });

  revalidatePath("/chatify");

  try {
    const response = await fetch(`https://utfs.io/f/${file.key}`);
    const blob = await response.blob();

    const loader = new PDFLoader(blob);
    let pageLevelDocs = await loader.load();
    pageLevelDocs = pageLevelDocs.map((page) => {
      return {
        ...page,
        metadata: { ...page.metadata, fileId: createdFile.id },
      };
    });

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const client = createClient(url, privateKey);

    await SupabaseVectorStore.fromDocuments(pageLevelDocs, embeddings, {
      client,
      tableName: "documents",
      queryName: "match_documents",
    });

    await incrementUserQuestionCount(metadata.userId!);
    // Open PDF viewer
    window.open(`https://utfs.io/f/${file.key}`, '_blank');
  } catch (error) {
    await UpdateFile("FAILED", createdFile.id);
    console.error("Upload failed:", error);
  }
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),

  freePlanPdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
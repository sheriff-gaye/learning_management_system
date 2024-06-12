import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { UploadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PLANS } from "@/lib/stripe";
import { UploadThingError } from 'uploadthing/server';
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';



const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);


const f = createUploadthing();

const middleware = async () => {
 
  const {userId} = auth();
 
  if (!userId) throw new UploadThingError("Unauthorized");

  // const subscriptionPlan = await getUserSubscriptionPlan();

  return { userId: userId };
};


const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = isTeacher(userId);
  if (!userId || !isAuthorized) throw new Error("Unauthorized");
  return { userId }
}


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
      uploadStatus: "PROCESSING",
    },
  });

  revalidatePath("/chatify");


  try {
    // generate some pages so supabase can index.
    const response = await fetch(`https://utfs.io/f/${file.key}`);
    const blob = await response.blob();

    //Get the pdf response to a memory
    const loader = new PDFLoader(blob);

    //Extract the page level text of the pdf
    //loading the content of each page in the PDF document into pageLevelDocs.
    let pageLevelDocs = await loader.load();
    pageLevelDocs = pageLevelDocs.map((page) => {
      return {
        ...page,
        metadata: { ...page.metadata, fileId: createdFile.id },
      };
    });

    const pageAmount = pageLevelDocs.length;

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const client = createClient(url, privateKey);

    await SupabaseVectorStore.fromDocuments(pageLevelDocs, embeddings, {
      client,
      tableName: "documents",
      queryName: "match_documents",
    });

    

   
  }


  catch (error) {
    await UpdateFile("FAILED", createdFile.id);

  }


}


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

  proPlanPdfUploader: f({ pdf: { maxFileSize: "16MB" } })

    .middleware(middleware)
    .onUploadComplete( onUploadComplete),

} satisfies FileRouter;


export type OurFileRouter = typeof ourFileRouter;
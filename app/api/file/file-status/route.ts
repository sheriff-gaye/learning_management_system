
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(request: Request) {
  const {userId} = auth();
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }

  const file = await db.file.findFirst({
    where: {
      userId:userId,
      id: fileId,
    },
  });

  if (!file) return Response.json({ status: "PENDING" as const });

  return Response.json({ status: file?.uploadStatus });
}
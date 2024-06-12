import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const {userId} = auth();


  const key = searchParams.get("key");


  const name = searchParams.get("name");

  if (!userId || (!key && !name)) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }

  const file = await db.file.findFirst({
    where: {
      userId,
      ...(key && { key }),
      ...(name && { name }),
    },
  });

  if (!file) {
    return Response.json({ message: "File not found" }, { status: 404 });
  }

  return Response.json(file);
}
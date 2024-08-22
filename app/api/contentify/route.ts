import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request,) {
  try {
    const { userId } = auth();
    const body = await req.json();

   
    const { formData, aiResponse, templateSlug } = body;


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const content = await db.contentify.create({
      data: {
        userId,
        formData,
        aiResponse,
        templateSlug,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("[SAVE CONTENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
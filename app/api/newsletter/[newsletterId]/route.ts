import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { subscriberId } = await req.json();

    if (!subscriberId) {
      return new NextResponse("Subscriber ID is required", { status: 400 });
    }

    const deletedSubscriber = await db.newsLetter.delete({
      where: {
        id: subscriberId,
      },
    });

    return NextResponse.json(deletedSubscriber);
  } catch (error) {
    console.error("SUBSCRIBER_DELETE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
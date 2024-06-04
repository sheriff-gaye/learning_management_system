import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {

        const { userId } = auth();
        const { email } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const newsletter = await db.newsLetter.create({
            data: {
                email,
                userId
            }
        });

        return NextResponse.json(newsletter);

    } catch (error) {

        console.log("[NEWSLETTER]", error);
        return new NextResponse("Internal Error ");

    }
}
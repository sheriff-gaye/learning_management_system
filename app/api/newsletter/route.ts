import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { email } = await req.json();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return new NextResponse("Invalid email", { status: 400 });
        }

        const existingEmail = await db.newsLetter.findUnique({
            where: {
                email
            }
        });

        if (existingEmail) {
            
            return new NextResponse("Email is already subscribed", { status: 400 });
        }

        const newsletter = await db.newsLetter.create({
            data: {
                email,
                userId,
            },
        });

        return NextResponse.json(newsletter);

    } catch (error) {
        console.error("[NEWSLETTER]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

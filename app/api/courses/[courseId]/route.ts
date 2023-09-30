import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export  async function PATCH(reg:Request,{params}:{params:{courseId:string}}){
    try {
        const{userId}=auth();
        const{courseId}=params;
        const values=await reg.json();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }

        const course=await db.course.update({
            where:{id:courseId,userId},
            data:{
                ...values
            }
        })

        return NextResponse.json(course);


        
    } catch (error) {
        console.log("[COURSE ID]",error)
        return new NextResponse("Internal Error",{status:500})
        
    }
}
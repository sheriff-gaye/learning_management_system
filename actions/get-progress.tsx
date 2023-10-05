import { db } from '@/lib/db';
import React from 'react'
import { string } from 'zod';

const getprogress =  async(userId:string,courseId:string):Promise<number> => {
 try {
    const publishedChapters=await db.chapter.findMany({
        where:{
            courseId:courseId,
            isPublished:true
        },
        select:{
            id:true
        }
    })


    const publishedChaptersIds=publishedChapters.map((chapter)=>chapter.id);

    const validCCompltedChapters=await db.userProgress.count({
        where:{
            userId:userId,
            chapterId:{
                in:publishedChaptersIds
            },
            isCompleted:true
        }
    });

    const progressPercentage=(validCCompltedChapters)/(publishedChaptersIds.length)*100;

    return progressPercentage;
    
 } catch (error) {
    console.log("[GET_PROGRESS]",error)
    return 0;
    
 }
}

export default getprogress
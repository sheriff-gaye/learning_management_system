import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Newscolumns } from "./_components/news-column";
import { db } from "@/lib/db";
import { NewsDataTable } from "./_components/new-datatable";

 const Page=async()=>{

    const { userId } = auth();
    if (!userId) {
      return redirect("/");
    }
    const newsletter = await db.newsLetter.findMany({
       where: {
         userId
       },
       orderBy:{
              createdAt:"desc"
       }
    })
   
    return (
        <div className="p-6">
        <NewsDataTable columns={Newscolumns} data={newsletter} />
    </div>
    )
}

export default Page
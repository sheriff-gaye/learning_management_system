import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/datatable";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

async function getData(): Promise<any[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com"
    }
  ];
}

const page =async () => {
    const {userId}=auth();
    if(!userId){
        return redirect("/");
    }

    const courses=await db.course.findMany({
        where:{
            userId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
  return (
    <div className="p-6">
    <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default page;

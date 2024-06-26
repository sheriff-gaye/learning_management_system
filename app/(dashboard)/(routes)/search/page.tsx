import React, { Suspense } from 'react'
import { db } from '@/lib/db';
import { Categories } from './_components/Categories';
import { SearchInput } from '@/components/SearchInput';
import { getCourses } from '@/actions/get-courses';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {CoursesList} from '@/components/courses-list';



interface searchParamsProps{
  searchParams:{
    title:string
    categoryId:string
  }
}

const page = async({searchParams}:searchParamsProps) => {

  const {userId}=auth();

  if (!userId){
    return  redirect("/");
  }

  const categories=await db.category.findMany({
    orderBy:{
      name:"asc"
    }
  })

  const courses= await getCourses({
    userId,
    ...searchParams
  });
  return (
    <>

    <div className='px-6 pt-6 md:hidden md:mb-0  block'>
      <SearchInput/>

    </div>
    <div className='p-6 '>
      <Categories items={categories}/>

     
      <CoursesList items={courses}/>
     

    </div>
    </>
  )
}

export default page
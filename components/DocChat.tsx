
import { Files } from "@/components/Files"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import { UploadButton } from "./UploadButton";
import { auth } from "@clerk/nextjs";


interface IProps {
    userId: string;
  }

const ChatifyPage=async()=>{


  const {userId}=auth()

    return(
        <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-3xl'>
          My Files
        </h1>

        <UploadButton userId={userId!} isSubscribed={false}/>
      </div>

      <Suspense fallback={<Skeleton  className='my-2 h-full' />}>
        <Files userId={userId!} />
      </Suspense>
    </main>

        )
}

export default ChatifyPage
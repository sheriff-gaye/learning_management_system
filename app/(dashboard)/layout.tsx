"use client";
import { useEffect, useState } from "react";
import NavBar from "./_components/NavBar";
import SideBar from "./_components/SideBar";

const DashbaordLayout = ({ children }: { children: React.ReactNode }) => {


  const [isLoading , setIsLoading]=useState(false);


  useEffect(()=>{
    setIsLoading(true);
  },[])

  if(!isLoading) return null;


  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56  fixed inset-y-0 w-full z-[100]">
        <NavBar />
      </div>
      <div className="hidden md:flex  h-full w-56  flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>

      <main className="md:pl-56  pt-[80px] h-full ">{children}</main>
    </div>
  );
};

export default DashbaordLayout;

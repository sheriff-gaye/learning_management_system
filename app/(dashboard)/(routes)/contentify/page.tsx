"use client"


import { useState } from "react"
import SearchSection from "./_components/search-section"
import TemplateSection from "./_components/template-section"


const ContentPage=()=>{

    const [userSearchInput,setUserSearchInput]=useState<string>()

    return(
        <div>
            <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)}/>
            <TemplateSection  userSearchInput={userSearchInput}/>
        </div>
    )
}


export default ContentPage
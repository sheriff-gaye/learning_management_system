import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"


const SearchSection=({onSearchInput}:any)=>{

    return(

        <div className="p-10  bg-gradient-to-br from-green-500 via-green-700 to-green-300 flex flex-col justify-center items-center text-white ">
            <h2 className="text-3xl  font-bold">Browse All Templates</h2>
            <p>What would you like to create today ? </p>
            <div className="w-full flex justify-center">
                <div className="flex  gap-2 items-center rounded border p-2 bg-white my-5 w-[50%]">
                    <Search  className="text-black"/>
                    <input  placeholder="search " className=" bg-transparent w-full outline-none text-black" onChange={(event)=>onSearchInput(event?.target.value)}/>
                </div>
            </div>

        </div>


    )
}

export default SearchSection
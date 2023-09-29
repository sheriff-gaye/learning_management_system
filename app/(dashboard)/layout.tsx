import NavBar from "./_components/NavBar";
import SideBar from "./_components/SideBar";

const DashbaordLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full">
        <div className="h-[80px] md:pl-56  fixed inset-y-0 w-full z-50">
            <NavBar/>

        </div>
        <div className="hidden md:flex  h-full w-56  flex-col fixed inset-y-0 z-50">
            <SideBar/>

        </div>
        
       <main className="md:pl-56  pt-[80px] h-full">
       {children}
       </main>
       </div>
    );
  };
  
  export default DashbaordLayout;
  
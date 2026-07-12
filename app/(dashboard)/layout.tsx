import NavBar from "./_components/NavBar";
import SideBar from "./_components/SideBar";

const DashbaordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 w-full h-[72px] md:pl-56 z-[100]">
        <NavBar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>

      <main className="md:pl-56 pt-[72px] h-full bg-muted/30">{children}</main>
    </div>
  );
};

export default DashbaordLayout;

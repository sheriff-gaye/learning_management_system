import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBar from "./SideBar";

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="mr-4 rounded-md p-2 transition hover:bg-accent md:hidden">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-56">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;

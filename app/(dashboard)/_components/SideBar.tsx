import Logo from "./Logo";
import SideBarRoutes from "./SideBarRoutes";

const SideBar = () => {
  return (
    <div className="h-full border-r bg-background flex flex-col overflow-y-auto">
      <div className="px-6 py-5 border-b">
        <Logo />
      </div>
      <div className="flex flex-col w-full py-3">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;

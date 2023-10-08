"use client";
import React from "react";
import Logo from "./Logo";
import SideBarRoutes from "./SideBarRoutes";

import toast from "react-hot-toast";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col  overflow-y-auto  shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;

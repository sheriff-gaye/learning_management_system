import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image src="/logo.png" alt="logo" width={32} height={32} className="h-8 w-8" />
      <span className="text-xl font-bold">EduCraft</span>
    </Link>
  );
};

export default Logo;

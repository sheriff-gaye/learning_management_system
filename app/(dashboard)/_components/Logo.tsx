import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      {/* <Image src="/logo.svg" height={20} width={20} alt="logo" /> */}
      <h2 className="text-2xl font-bold">
        Skills Pluse
      </h2>
    </Link>
  );
};

export default Logo;

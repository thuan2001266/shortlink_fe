import Link from "next/link";
import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex justify-between w-[90%] m-auto mt-10 mb-2 select-none">
      <div className="cursor-pointer">Made by Nauht</div>
      <Link href={"/term"}>
        <div className="cursor-pointer">Terms of use</div>
      </Link>
    </div>
  );
};
export default Footer;

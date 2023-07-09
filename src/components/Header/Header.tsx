import React, { useEffect } from "react";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const {} = useAuth();
  const router = useRouter();

  return (
    <div
      className={`w-full ${
        router.pathname === "/dashboard" && "bg-[#ffffff] dark:bg-[#0e0f11]"
      }`}
    >
      <div
        className={`flex justify-between m-auto w-[90%] md:w-[80%] py-3 items-center select-none `}
      >
        <Leftside></Leftside>
        <Rightside></Rightside>
      </div>
    </div>
  );
};
export default Header;

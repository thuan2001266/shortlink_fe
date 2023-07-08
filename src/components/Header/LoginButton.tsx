import Link from "next/link";
import React, { useEffect, useState } from "react";

type LoginButtonProps = {};

const LoginButton: React.FC<LoginButtonProps> = () => {
  return (
    <div>
      <Link href={"/auth"}>
        <button className="bg-[#006cff] dark:bg-[#343a40] px-3 py-2 text-base rounded-md select-none font-medium text-white">
          Log In
        </button>
      </Link>
    </div>
  );
};
export default LoginButton;

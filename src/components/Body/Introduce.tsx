import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React from "react";

type IntroduceProps = {};

const Introduce: React.FC<IntroduceProps> = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col items-center py-12 my-28 select-none">
      <div className="font-bold text-xl md:text-3xl mt-2 ">The best</div>
      <div className="text-center font-extrabold mt-2 text-transparent text-3xl md:text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        URL Shortener
      </div>
      <div className="font-bold  text-xl md:text-2xl mt-2">
        Super human, very easy to use
      </div>
      <div className="mt-6">
        <Link href={user.access_token ? "/dashboard" : "/auth"}>
          <button className="font-bold text-lg md:text-xl bg-[#006cff] px-4 py-3 rounded-lg text-[#e1e1e1]">
            Getting Started
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Introduce;

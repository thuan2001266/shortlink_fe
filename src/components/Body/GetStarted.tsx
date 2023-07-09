import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React from "react";

type GetStartedProps = {};

const GetStarted: React.FC<GetStartedProps> = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col w-[90%] md:w-[80%] lg:w-[70%] mt-12 items-center my-28 select-none">
      <div className="font-semibold text-base md:text-xl">
        Getting started right now
      </div>
      <div className="font-bold text-lg md:text-2xl mt-3 text-center">
        Link Less, Share More: Simplify Your URLs with Ease!
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
export default GetStarted;

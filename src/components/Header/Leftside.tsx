import Link from "next/link";
import React from "react";

type LeftsideProps = {};

const Leftside: React.FC<LeftsideProps> = () => {
  return (
    <Link href={"/"}>
      <div className="flex space-x-1 text-lg md:text-2xl font-bold">
        <div className="flex-shrink-0 bg-[#006cff] px-[4px]  py-[1px] rounded-md text-white dark:text-[#0b2343] ">
          SL
        </div>
        <div className="flex-shrink-0">Shortlink</div>
      </div>
    </Link>
  );
};
export default Leftside;

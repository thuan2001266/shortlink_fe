import {
  findLink,
  findNone,
  sortClick,
  sortRecent,
} from "@/store/features/linkSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";

type DashboardHeaderProps = {};

const DashboardHeader: React.FC<DashboardHeaderProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>("Sort by Resent");
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.links);
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input != "") {
        dispatch(findLink({ input: input, sortType: sortType }));
      } else {
        dispatch(findNone());
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="w-full bg-[#f8faff] dark:bg-[#18191b] h-20  ">
      <div className="w-[90%] md:w-[80%] flex justify-between m-auto h-full items-center">
        <div className="text-lg font-semibold hidden md:block select-none">
          Your Links
        </div>
        <div className="flex items-center w-full md:w-auto">
          <div className="flex-1 relative flex mr-2">
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search..."
              className="w-full placeholder:text-sm px-3 py-1 rounded-sm outline-none border border-[#ced0d1] focus:border-[#85858d] dark:border-[#3a3c42] dark:bg-[#25262b] dark:focus:border-[#61646c]"
            />
            <div className="absolute right-2 h-full text-lg flex items-center z-10">
              <AiOutlineSearch></AiOutlineSearch>
            </div>
            <div className="absolute right-3 h-full bg-gradient-to-r from-transparent to-white dark:to-[#25262b] w-8 mt-[1px] mb-[1px]"></div>
          </div>
          <div className="">
            <div className="relative text-sm md:text-base font-medium">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex text-[#353535] h-full py-1 px-3 items-center space-x-2 overflow-hidden outline-none border bg-[#ffffff] border-[#ced0d1] focus:border-[#85858d] dark:border-[#3a3c42] dark:bg-[#25262b] dark:focus:border-[#61646c] rounded-sm select-none font-medium dark:text-white w-full"
              >
                <div className="flex items-center space-x-1 w-full h-full pr-14">
                  {sortType}
                </div>
                <div className="text-xs">
                  <FaExchangeAlt></FaExchangeAlt>
                </div>
              </button>
              {open && (
                <div className="z-10 absolute w-full py-2 border dark:border-none bg-[#ffffff]  dark:bg-[#343a40] border-[#ced0d1] dark:border-[#3a3c42] dark:text-white top-[44px] right-0 rounded-md p-2 flex flex-col">
                  <div
                    onClick={() => {
                      setSortType("Sort by Click Count");
                      setOpen(false);
                      dispatch(sortClick());
                    }}
                    className="cursor-pointer select-none  pb-1 overflow-hidden w-full"
                  >
                    Sort by Click Count
                  </div>
                  <div
                    onClick={() => {
                      setSortType("Sort by Resent");
                      setOpen(false);
                      dispatch(sortRecent());
                    }}
                    className="cursor-pointer select-none  pb-1 overflow-hidden w-full"
                  >
                    Sort by Resent
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;

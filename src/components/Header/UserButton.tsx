import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiFillCaretDown } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { BiSolidDashboard } from "react-icons/bi";
import { useRouter } from "next/router";
import { toggleForm } from "@/store/features/formSlice";

type UserButtonProps = {};

const UserButton: React.FC<UserButtonProps> = () => {
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center">
      {router.pathname !== "/dashboard" ? (
        <Link href={user.access_token ? "/dashboard" : "/auth"}>
          <button className="hidden md:block bg-[#006cff] dark:bg-[#343a40] mr-2 px-3 py-2  rounded-md select-none text-base font-medium text-white">
            Dashboard
          </button>
        </Link>
      ) : (
        <button
          onClick={() => dispatch(toggleForm({ open: true, view: "create" }))}
          className="hidden md:block bg-[#006cff] dark:bg-[#343a40] mr-2 px-3 py-2  rounded-md select-none text-base font-medium text-white"
        >
          Create Link
        </button>
      )}

      <div className="relative  w-40 text-base font-medium">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="py-2 text-base rounded-md select-none font-medium dark:text-white w-full"
        >
          <div className="flex items-center space-x-1 w-full">
            <div>
              <AiOutlineUser></AiOutlineUser>
            </div>
            <div className="flex-1 text-left overflow-hidden">
              {user.user_name}
            </div>
            <div>
              <AiFillCaretDown></AiFillCaretDown>
            </div>
          </div>
        </button>
        {open && (
          <div className=" z-10 absolute w-full py-2 border border-[#a7a9ac] dark:border-none bg-white dark:bg-[#343a40] dark:text-white top-[44px] right-0 rounded-md p-2 flex flex-col">
            <div className="border-b dark:border-[#282727] border-[#a7a9ac] pb-1 overflow-hidden w-full">
              Greeting {user.user_name}!
            </div>
            {router.pathname !== "/dashboard" && (
              <Link href={user.access_token ? "/dashboard" : "/auth"}>
                <div className="md:hidden flex items-center space-x-2 mt-1 cursor-pointer my-1">
                  <div className="text-lg">
                    <BiSolidDashboard></BiSolidDashboard>
                  </div>
                  {/* onClick={() => logout()} , qua la vjp luon*/}
                  <div className="flex-1">Dashboard</div>
                </div>
              </Link>
            )}

            <div className="flex items-center space-x-2 mt-1 cursor-pointer my-1">
              <div className="text-lg">
                <GoSignOut></GoSignOut>
              </div>
              <div onClick={() => logout()} className="flex-1">
                Signout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserButton;

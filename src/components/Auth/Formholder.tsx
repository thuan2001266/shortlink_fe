import React, { useState } from "react";
import Leftside from "../Header/Leftside";
import LoginForm, { LoginFormData } from "./LoginForm";
import RegisterForm, { RegisterData } from "./RegisterForm";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import useRefreshToken from "@/hooks/useRefreshToken";

type FormholderProps = {};

type view = "login" | "register";

const Formholder: React.FC<FormholderProps> = () => {
  const [view, setView] = useState<view>("login");
  const toggleView = () => {
    setView((prev) => (prev === "login" ? "register" : "login"));
  };
  return (
    <div className="w-full flex flex-col items-center">
      {/* <button onClick={refresh}>Test refresh</button> */}
      <div className="dark:bg-[#0e0f11] bg-[#ffffff] py-4 w-[82%] sm:w-[60%] md:w-[56%]  lg:w-[36%] xl:w-[30%] m-auto rounded-xl p-3 flex flex-col">
        <div>
          <div className="flex justify-center mt-9 mb-5">
            <Leftside></Leftside>
          </div>
          <div>
            {view === "login" && <LoginForm toggle={toggleView}></LoginForm>}
            {view === "register" && (
              <RegisterForm toggle={toggleView}></RegisterForm>
            )}
          </div>
        </div>
      </div>
      <Link href="/">
        <div className="mt-3 cursor-pointer">Back to homepage</div>
      </Link>
    </div>
  );
};
export default Formholder;

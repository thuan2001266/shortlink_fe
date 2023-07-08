import { selectForm } from "@/store/features/formSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { toggleForm } from "@/store/features/formSlice";
import LinkForm from "./LinkForm";
import ConformAction from "./ConformAction";

type PopUpProps = {};

const PopUp: React.FC<PopUpProps> = () => {
  const { open, view } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  return (
    <>
      {open && (
        <div
          onClick={() => dispatch(toggleForm({ open: false, view: "" }))}
          className="z-40 w-full h-screen fixed top-0 left-0 flex flex-col items-center justify-center"
        >
          <div className="w-full h-screen bg-black opacity-75 z-40 absolute top-0 left-0"></div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="z-40 dark:bg-[#0e0f11] bg-[#ffffff] p-6 rounded-lg w-[82%] sm:w-[60%] md:w-[56%]  lg:w-[36%] xl:w-[30%]"
          >
            {(view === "create" || view === "update") && <LinkForm></LinkForm>}
            {(view === "delete" || view === "duplicate") && (
              <ConformAction action={view}></ConformAction>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default PopUp;

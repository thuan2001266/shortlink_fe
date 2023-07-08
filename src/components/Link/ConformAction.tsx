import { toggleForm } from "@/store/features/formSlice";
import { addLink, removeLink } from "@/store/features/linkSlice";
import { toggle } from "@/store/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useState } from "react";

type ConformActionProps = { action: string };

const ConformAction: React.FC<ConformActionProps> = ({ action }) => {
  const { selectedLink } = useAppSelector((state) => state.links);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const submitHandle = () => {
    try {
      const createLink = async () => {
        if (user.access_token !== "") {
          const token = user.access_token;
          const pathFinal =
            action == "delete"
              ? `/${selectedLink.id}`
              : `/duplicate/${selectedLink.id}`;
          const response = await fetch(
            "http://localhost:8080/api/v1/linkmap" + pathFinal,
            {
              method: action == "delete" ? "DELETE" : "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              // body: JSON.stringify(values),
            }
          );
          if (response.status == 200) {
            if (action === "delete") {
              dispatch(removeLink(selectedLink.id));
              dispatch(toggleForm({ open: false, view: "" }));
            } else {
              const data = await response.json();
              dispatch(addLink(data));
              dispatch(toggleForm({ open: false, view: "" }));
            }
          } else {
            setError("Error orrcurs while perform action");
          }
          return response.status;
        }
      };
      createLink();
    } catch (e: any) {}
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        {action} link with code {selectedLink.shortedLink}?
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => submitHandle()}
          className={`w-full  ${
            action == "delete" ? "bg-[#b72323]" : "bg-[#1c1c1d]"
          } h-[36px] py-1 px-2 rounded-md mt-4 text-white font-medium`}
        >
          <div className="flex justify-center items-center space-x-2">
            <div>Accept</div>
          </div>
        </button>
        <button
          onClick={() => dispatch(toggleForm({ open: false, view: "" }))}
          className={`w-full border border-[#999999] dark:border-0 h-[36px] py-1 px-2 rounded-md mt-4 dark:text-white font-medium`}
        >
          <div className="flex justify-center items-center space-x-2">
            <div>Cancel</div>
          </div>
        </button>
      </div>
    </div>
  );
};
export default ConformAction;

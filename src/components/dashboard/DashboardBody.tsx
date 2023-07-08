import React, { useEffect } from "react";
import LinkItem from "./LinkItem";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LinkState, setLinks } from "@/store/features/linkSlice";
import { toggleForm } from "@/store/features/formSlice";

import { headers } from "next/dist/client/components/headers";
import axios from "axios";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useRouter } from "next/router";

type DashboardBodyProps = {};

const DashboardBody: React.FC<DashboardBodyProps> = () => {
  const axiosPrivate = useAxiosPrivate();
  const user = useAppSelector((state) => state.user);
  const links = useAppSelector((state) => state.links);
  const dispatch = useAppDispatch();
  const { refresh } = useRefreshToken();

  useEffect(() => {
    try {
      const getData = async () => {
        if (user.access_token !== "") {
          const token = user.access_token;
          const response = await fetch(
            "https://shortlink-osak.onrender.com/api/v1/linkmap",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          if (response.status == 200) {
            const data: LinkState[] = await response.json();
            console.log(data);

            dispatch(setLinks(data.sort((a, b) => b.createdAt - a.createdAt)));
          }
          return response.status;
        }
      };
      const fetchPrivateData = async () => {
        if ((await getData()) == 403) {
          refresh();
          await getData();
        }
      };
      fetchPrivateData();
    } catch (e: any) {}
  }, []);

  return (
    <div className="w-[90%] md:w-[80%] flex flex-col justify-between m-auto h-full items-center mt-7">
      <div className="mb-7 md:hidden w-full">
        <button
          onClick={() => dispatch(toggleForm({ open: true, view: "create" }))}
          className=" bg-[#006cff] dark:bg-[#343a40] w-full mr-2 px-3 py-2  rounded-md select-none text-base font-medium text-white"
        >
          Create Link
        </button>
      </div>
      <div className="w-full flex flex-wrap">
        {links.links.map((i) => (
          <LinkItem key={i.shortedLink} data={i}></LinkItem>
        ))}
        {links.links.length === 0 && (
          <div className="flex flex-col items-center space-y-2 w-full">
            <div className="text-3xl font-semibold pt-48 pb-48">
              Such empty!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardBody;

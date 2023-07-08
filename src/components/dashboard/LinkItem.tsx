import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LinkState, selectLink } from "@/store/features/linkSlice";
import { useRouter } from "next/router";
import moment from "moment";
import { FiCopy } from "react-icons/fi";
import { BiDownload, BiSolidDuplicate } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import html2canvas from "html2canvas";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useAppDispatch } from "@/store/hooks";
import { toggleForm } from "@/store/features/formSlice";

type LinkItemProps = {
  data: LinkState;
};

const LinkItem: React.FC<LinkItemProps> = ({ data }) => {
  const url = window.location.origin;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSaveImage = async () => {
    function convertElementToDataURL(element: HTMLElement) {
      return new Promise((resolve, reject) => {
        html2canvas(element)
          .then((canvas) => {
            resolve(canvas.toDataURL("image/png"));
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    const element = document.getElementById("myElement");
    const dataUrl = await convertElementToDataURL(element!);
    const link = document.createElement("a");
    link.href = dataUrl as string;
    link.download = "QR.png";
    link.click();
  };

  return (
    <div className="w-[100%] lg:w-[50%] py-2 md:p-2">
      <div className="w-full py-4 px-4 lg:py-4 lg:px-8 flex flex-col bg-[#ffffff] rounded-md border border-[#c9c7c7] dark:border-[#0e0f11] dark:bg-[#0e0f11] ">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#0358ce] bg-[#e5f0ff] dark:bg-[#0d1829] py-1 px-2 rounded-full">
              {data.clickedTime}
            </span>{" "}
            Clicks
          </div>
          <div className="flex items-center space-x-4 text-lg text-[#0358ce]">
            <div
              onClick={() => {
                navigator.clipboard.writeText(url + "/" + data.shortedLink);
              }}
              className="group relative flex flex-col items-center cursor-pointer"
            >
              <FiCopy></FiCopy>
              <div className="opacity-0 group-hover:opacity-100 bottom-5 w-16 absolute text-sm text-center">
                Copy link
              </div>
            </div>

            <div
              onClick={handleSaveImage}
              className="group relative flex flex-col items-center cursor-pointer"
            >
              <BiDownload></BiDownload>
              <div className="opacity-0 group-hover:opacity-100 bottom-5 w-16 absolute text-sm text-center">
                Get QR
              </div>
            </div>
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="py-2 px-1 dark:bg-[#373737] rounded-lg cursor-pointer relative"
            >
              <SlOptionsVertical></SlOptionsVertical>

              {open && (
                <div className=" select-none text-sm absolute py-2 border border-[#a7a9ac] dark:border-none bg-white dark:bg-[#343a40] dark:text-white top-[44px] right-0 rounded-md p-2 flex flex-col">
                  <div
                    onClick={() => {
                      dispatch(selectLink(data));
                      dispatch(toggleForm({ open: true, view: "update" }));
                    }}
                    className="flex items-center space-x-2 mt-1 cursor-pointer my-1"
                  >
                    <div className="text-lg">
                      <AiFillEdit></AiFillEdit>
                    </div>
                    <div className="flex-1">Edit</div>
                  </div>
                  <div
                    onClick={() => {
                      dispatch(selectLink(data));
                      dispatch(toggleForm({ open: true, view: "duplicate" }));
                    }}
                    className="flex items-center space-x-2 mt-1 cursor-pointer my-1"
                  >
                    <div className="text-lg">
                      <BiSolidDuplicate></BiSolidDuplicate>
                    </div>
                    <div className="flex-1">Duplicate</div>
                  </div>
                  <div className="w-full h-1 border-b border-[#6f7070]"></div>
                  <div
                    onClick={() => {
                      dispatch(selectLink(data));
                      dispatch(toggleForm({ open: true, view: "delete" }));
                    }}
                    className="flex items-center space-x-2 mt-1 cursor-pointer my-1 text-red-600"
                  >
                    <div className="text-lg">
                      <MdDeleteForever></MdDeleteForever>
                    </div>
                    <div className="flex-1 ">Delete</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex mt-4 items-center">
          <div
            className="w-32 h-32 md:w-44 md:h-44 lg:w-36 lg:h-36 bg-white p-3 rounded-xl"
            id="myElement"
          >
            <QRCodeSVG
              value={url + "/" + data.shortedLink}
              width="100%"
              height="100%"
            />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden pl-3">
            <div className=" font-bold lg:text-sm w-full break-words">
              {url + "/" + data.shortedLink}
            </div>
            <div className="break-words w-full max-h-24 overflow-y-hidden font-light text-sm">
              Shorted for {data.link}{" "}
            </div>
            <div className="text-sm">
              {moment(new Date(data.createdAt)).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LinkItem;

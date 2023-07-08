import useRefreshToken from "@/hooks/useRefreshToken";
import { toggleForm } from "@/store/features/formSlice";
import { LinkState, addLink, sortRecent } from "@/store/features/linkSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AiOutlineDown,
  AiOutlineLink,
  AiOutlineLoading3Quarters,
  AiOutlineUp,
} from "react-icons/ai";

type LinkFormProps = {};

type FormData = {
  link: string;
  shortedLink: string;
  utmsource: string;
  utmmedium: string;
  utmcampaign: string;
  utmterm: string;
  utmcontent: string;
  createdAt: number;
};

const LinkForm: React.FC<LinkFormProps> = () => {
  const [loading, setLoading] = useState();
  const [utmVisible, setUtmVisible] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { refresh } = useRefreshToken();
  const [error, setError] = useState("");
  const { view } = useAppSelector((state) => state.form);
  const { selectedLink } = useAppSelector((state) => state.links);

  const submitHandle = (values: FormData) => {
    values.createdAt = Date.now();
    try {
      const createLink = async () => {
        if (user.access_token !== "") {
          const token = user.access_token;
          console.log(token);
          const pathFinal = view == "update" ? "/updateLink" : "";
          const response = await fetch(
            "https://shortlink-osak.onrender.com/api/v1/linkmap" + pathFinal,
            {
              method: view == "update" ? "PUT" : "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );
          if (response.status == 201) {
            const data = await response.json();
            dispatch(toggleForm({ open: false, view: "" }));
            dispatch(addLink(data));
            dispatch(sortRecent());
          } else if (response.status == 200) {
            const data = await response.json();
            dispatch(toggleForm({ open: false, view: "" }));
            dispatch(addLink(data));
            dispatch(sortRecent());
          } else {
            setError("Short link code has been taken");
          }
          return response.status;
        }
      };
      createLink();
    } catch (e: any) {}
  };
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold flex items-center space-x-1 select-none">
        <AiOutlineLink></AiOutlineLink>
        <div>{view === "create" ? "Create New Link" : "Edit Link"}</div>
      </div>
      <Formik
        initialValues={
          view == "create"
            ? {
                link: "",
                shortedLink: "",
                utmsource: "",
                utmmedium: "",
                utmcampaign: "",
                utmterm: "",
                utmcontent: "",
                createdAt: -1,
              }
            : selectedLink
        }
        validate={(values: FormData) => {
          const errors: Partial<FormData> = {};
          if (!values.link) {
            errors.link = "Required";
          }
          if (!values.shortedLink) {
            errors.shortedLink = "Required";
          }
          if (/\s/.test(values.shortedLink)) {
            errors.shortedLink = "No space allowed";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitHandle(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-full">
            <div onClick={() => {}} className="text-sm mt-4 mb-1 font-medium">
              Original URL
            </div>
            <Field
              type="text"
              name="link"
              className="h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779]  border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
              placeholder="Enter original URL"
            />
            <ErrorMessage
              name="link"
              component="div"
              className="text-sm text-[#b12124]"
            />
            <div onClick={() => {}} className="text-sm mt-3 mb-1 font-medium">
              Short code
            </div>
            <Field
              disabled={view == "update" && true}
              type="text"
              name="shortedLink"
              className="h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
              placeholder="Enter your shortcode"
              autoComplete="off"
            />
            <ErrorMessage
              name="shortedLink"
              component="div"
              className="text-sm text-[#b12124]"
            />
            {error && <div className="text-sm text-[#b12124]">{error}</div>}
            <div className="flex justify-center cursor-pointer mt-2 mb-1">
              {utmVisible ? (
                <div
                  onClick={() => setUtmVisible((prev) => !prev)}
                  className="flex items-center space-x-1 text-sm"
                >
                  <div>UTM Setting</div>
                  <AiOutlineUp></AiOutlineUp>
                </div>
              ) : (
                <div
                  onClick={() => setUtmVisible((prev) => !prev)}
                  className="flex items-center space-x-1 text-sm"
                >
                  <div>UTM Setting</div>
                  <AiOutlineDown></AiOutlineDown>
                </div>
              )}
            </div>
            {utmVisible && (
              <div className="flex flex-col space-y-2">
                <ErrorMessage
                  name="shortcode"
                  component="div"
                  className="text-sm text-[#b12124]"
                />
                <div className="flex items-center space-x-1">
                  <div className="w-16 text-sm">Source</div>
                  <Field
                    type="text"
                    name="utmsource"
                    className="flex-1 h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                    placeholder="Enter your Source"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="utmsource"
                  component="div"
                  className="text-sm text-[#b12124]"
                />
                <div className="flex items-center space-x-1">
                  <div className="w-16 text-sm">Medium</div>
                  <Field
                    type="text"
                    name="utmmedium"
                    className="flex-1 h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                    placeholder="Enter your medium"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="utmmedium"
                  component="div"
                  className="text-sm text-[#b12124]"
                />
                <div className="flex items-center space-x-1">
                  <div className="w-16 text-sm">Campaign</div>
                  <Field
                    type="text"
                    name="utmcampaign"
                    className="flex-1 h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                    placeholder="Enter your campaign"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="utmcampaign"
                  component="div"
                  className="text-sm text-[#b12124]"
                />
                <div className="flex items-center space-x-1">
                  <div className="w-16 text-sm">Term</div>
                  <Field
                    type="text"
                    name="utmterm"
                    className="flex-1 h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                    placeholder="Enter your term"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="utmterm"
                  component="div"
                  className="text-sm text-[#b12124]"
                />
                <div className="flex items-center space-x-1">
                  <div className="w-16 text-sm">Content</div>
                  <Field
                    type="text"
                    name="utmcontent"
                    className="flex-1 h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                    placeholder="Enter your content"
                    autoComplete="off"
                  />
                </div>
                <ErrorMessage
                  name="utmcontent"
                  component="div"
                  className="text-sm text-[#b12124]"
                />
              </div>
            )}
            <button
              type="submit"
              className={`w-full bg-[#1c1c1d] h-[36px] py-1 px-2 rounded-md mt-4 text-white font-medium ${
                loading && "bg-[#343435] text-[#838385]"
              }`}
            >
              <div className="flex justify-center items-center space-x-2">
                {loading && (
                  <div className="animate-spin">
                    <AiOutlineLoading3Quarters></AiOutlineLoading3Quarters>
                  </div>
                )}
                <div>{view == "create" ? "Create" : "Update"}</div>
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LinkForm;

import React from "react";
import { BsQrCodeScan } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { IoAnalyticsSharp } from "react-icons/io5";

type FeatureProps = {};

const Feature: React.FC<FeatureProps> = () => {
  return (
    <div className="flex flex-col md:flex-row w-[90%] md:w-[80%] lg:w-[70%] my-24 select-none">
      <div className="w-full md:w-[50%] flex flex-col px-6 mb-6 md:mb-0">
        <div className="font-semibold text-lg">What we offer</div>
        <div className="font-bold text-xl">
          to make full use of shorten link
        </div>
        <div className="bg-[#d7d5d5] bg-opacity-50 dark:bg-[#0e0f11] py-6 px-8 mb-3 rounded-xl mt-6">
          <div className="py-5">
            <img
              src="https://camo.githubusercontent.com/56ea24702a43a27f55794275849e38c16cd393e244a59297a71266b9b34e3e53/68747470733a2f2f617368616c6c656e64657369676e2e636f2e756b2f696d616765732f637573746f6d2f73686f72742d75726c2d6c6f676f2e706e67"
              alt="shortlink"
            ></img>
          </div>
          <div className="">
            Introducing our website, the perfect tool for shortening long and
            complex URLs. With our user-friendly interface and powerful link
            shortening technology, you can transform any lengthy web address
            into a concise and easy-to-share link. Whether you need to post a
            link on social media, send it via email, or simply make it more
            manageable, our website provides a quick and efficient solution.
          </div>
        </div>
      </div>
      <div className="w-full md:w-[66%] px-6">
        <div className="pb-6 bg-[#d7d5d5] bg-opacity-50 dark:bg-[#0e0f11] py-6 px-8 mb-3 rounded-xl">
          <div className="text-3xl text-[#006cff]  mb-3">
            <SiGoogleanalytics></SiGoogleanalytics>
          </div>
          <div>
            <div className="font-semibold text-lg">Analytics</div>
            <div>
              Gain valuable insights into your shortened URLs with comprehensive
              click tracking and performance analytics.
            </div>
          </div>
        </div>
        <div className="pb-6 bg-[#d7d5d5] bg-opacity-50 dark:bg-[#0e0f11] py-6 px-8 mb-3 rounded-xl">
          <div className="text-3xl text-[#006cff] mb-3">
            <BsQrCodeScan></BsQrCodeScan>
          </div>
          <div>
            <div className="font-semibold text-lg">QR Code generator</div>
            <div>
              Generate QR codes instantly for your shortened URLs, making it
              easy for users to access your content on the go.
            </div>
          </div>
        </div>
        <div className="pb-6 bg-[#d7d5d5] bg-opacity-50 dark:bg-[#0e0f11] py-6 px-8 mb-3 rounded-xl">
          <div className="text-3xl text-[#006cff] mb-3">
            <IoAnalyticsSharp></IoAnalyticsSharp>
          </div>
          <div>
            <div className="font-semibold text-lg">UMT builder</div>
            <div>
              Effortlessly add UTM parameters to your shortened URLs, enabling
              accurate tracking and analysis of your marketing campaigns.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feature;

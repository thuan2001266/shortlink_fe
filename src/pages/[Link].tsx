import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type LinkProps = {};

const Link: React.FC<LinkProps> = () => {
  const router = useRouter();
  const { access_token } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (router.asPath.slice(1) !== "[Link]") {
      try {
        const userAgent = navigator.userAgent;
        let browserName: string;
        let deviceName: string;

        if (userAgent.indexOf("Firefox") > -1) {
          browserName = "Mozilla Firefox";
        } else if (userAgent.indexOf("Chrome") > -1) {
          browserName = "Google Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
          browserName = "Apple Safari";
        } else if (
          userAgent.indexOf("Opera") > -1 ||
          userAgent.indexOf("OPR") > -1
        ) {
          browserName = "Opera";
        } else if (userAgent.indexOf("Edge") > -1) {
          browserName = "Microsoft Edge";
        } else if (
          userAgent.indexOf("MSIE") > -1 ||
          userAgent.indexOf("Trident/") > -1
        ) {
          browserName = "Internet Explorer";
        } else {
          browserName = "Unknown";
        }

        if (userAgent.match(/Android/i)) {
          deviceName = "Android Device";
        } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
          deviceName = "iOS Device";
        } else if (userAgent.match(/Windows Phone/i)) {
          deviceName = "Windows Phone";
        } else if (userAgent.match(/Windows/i)) {
          deviceName = "Windows PC";
        } else if (userAgent.match(/Macintosh/i)) {
          deviceName = "Macintosh";
        } else if (userAgent.match(/Linux/i)) {
          deviceName = "Linux PC";
        } else {
          deviceName = "Unknown";
        }
        const redirect = async () => {
          const response = await fetch(
            "https://shortlink-osak.onrender.com/api/v1/statistic/click",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                shortLink: router.asPath.slice(1),
                timeClick: Date.now(),
                location: "",
                device: deviceName,
                browser: browserName,
              }),
            }
          );

          if (response.status == 200) {
            const data = await response.json();
            window.location.href = data.url;
          }
        };
        redirect();
      } catch (error) {}
    }
    return () => {};
  }, [router.asPath.slice(1)]);

  return (
    <div className="flex space-x-2 items-center justify-center h-screen">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters></AiOutlineLoading3Quarters>
      </div>
      <div>Redirecting you...</div>
    </div>
  );
};
export default Link;

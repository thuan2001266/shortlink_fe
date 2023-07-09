import HeaderFooterLayout from "@/components/Layout/HeaderFooterLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardBody from "@/components/dashboard/DashboardBody";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

type dashboardProps = {};

const Dashboard: React.FC<dashboardProps> = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    const pushAuth = setTimeout(() => {
      if (user.access_token == "" && router.asPath == "/dashboard") {
        router.push("/auth");
      }
    }, 2000);

    return () => {
      clearTimeout(pushAuth);
    };
  }, [router.asPath, user.access_token]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard." />
      </Head>
      <HeaderFooterLayout>
        {user.access_token ? (
          <>
            <DashboardHeader></DashboardHeader>
            <DashboardBody></DashboardBody>
          </>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="text-center mb-16 text-lg">
              You must <span className="font-semibold">login</span> to access
              this page
            </div>
          </div>
        )}
      </HeaderFooterLayout>
    </>
  );
};
export default Dashboard;

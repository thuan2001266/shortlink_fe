import HeaderFooterLayout from "@/components/Layout/HeaderFooterLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardBody from "@/components/dashboard/DashboardBody";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

type dashboardProps = {};

const Dashboard: React.FC<dashboardProps> = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  return (
    <HeaderFooterLayout>
      {user.access_token ? (
        <>
          <DashboardHeader></DashboardHeader>
          <DashboardBody></DashboardBody>
        </>
      ) : (
        <></>
      )}
    </HeaderFooterLayout>
  );
};
export default Dashboard;

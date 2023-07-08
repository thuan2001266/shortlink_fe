import React, { ReactComponentElement } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PopUp from "../Link/PopUp";
import { useRouter } from "next/router";

type HeaderFooterLayoutProps = {};

const HeaderFooterLayout = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      <Header></Header>
      <main>{children}</main>
      {path == "/" && <Footer></Footer>}
      <PopUp></PopUp>
    </>
  );
};
export default HeaderFooterLayout;

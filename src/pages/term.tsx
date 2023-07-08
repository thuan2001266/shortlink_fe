import HeaderFooterLayout from "@/components/Layout/HeaderFooterLayout";
import Head from "next/head";
import React from "react";

type termProps = {};

const Term: React.FC<termProps> = () => {
  return (
    <>
      <Head>
        <title>Term</title>
        <meta name="description" content="Term." />
      </Head>
      <HeaderFooterLayout>
        <div>Have a good coding</div>
      </HeaderFooterLayout>
    </>
  );
};
export default Term;

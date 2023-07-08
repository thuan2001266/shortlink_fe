import Body from "@/components/Body/Body";

import HeaderFooterLayout from "@/components/Layout/HeaderFooterLayout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Short link for everyone." />
      </Head>
      <HeaderFooterLayout>
        <Body></Body>
      </HeaderFooterLayout>
    </>
  );
}

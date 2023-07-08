import Formholder from "@/components/Auth/Formholder";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import React from "react";

type authProps = {};

const Auth: React.FC<authProps> = () => {
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="description" content="Short link for everyone." />
      </Head>
      <div className="h-screen flex justify-center items-center">
        <Formholder></Formholder>
      </div>
    </>
  );
};
export default Auth;

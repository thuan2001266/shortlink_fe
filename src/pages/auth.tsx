import Formholder from "@/components/Auth/Formholder";
import useTheme from "@/hooks/useTheme";
import React from "react";

type authProps = {};

const auth: React.FC<authProps> = () => {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="h-screen flex justify-center items-center">
      <Formholder></Formholder>
    </div>
  );
};
export default auth;

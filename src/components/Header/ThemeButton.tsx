import useTheme from "@/hooks/useTheme";
import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
type ThemeButtonProps = {};

const ThemeButton: React.FC<ThemeButtonProps> = () => {
  const [theme, toggleTheme] = useTheme();
  return (
    <div>
      {theme.theme === "dark" ? (
        <div
          className="cursor-pointer hover:rotate-90 transition duration-500 p-1 hover:bg-[#4d535a] rounded-md"
          onClick={() => toggleTheme()}
        >
          <BsSun />
        </div>
      ) : (
        <div
          className="cursor-pointer transform hover:scale-125 duration-500 p-1 hover:bg-[#c9c9ca] rounded-md"
          onClick={() => toggleTheme()}
        >
          <BsMoon />
        </div>
      )}
    </div>
  );
};
export default ThemeButton;

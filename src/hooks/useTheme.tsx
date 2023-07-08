import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggle, setTheme, firstSetTheme } from "@/store/features/themeSlice";

interface useThemeReturnType {}

const useTheme = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!theme.first_set) {
      dispatch(setTheme(localStorage.theme));
      dispatch(firstSetTheme());
    }
  }, []);

  useEffect(() => {
    if (theme.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme() {
    dispatch(toggle());
    theme.theme == "dark"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
  }

  return [theme, toggleTheme] as const;
};
export default useTheme;

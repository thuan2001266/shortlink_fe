import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ThemeState {
  theme: string;
  first_set: boolean;
}

const initialState: ThemeState = {
  theme: "dark",
  first_set: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    firstSetTheme: (state) => {
      state.first_set = true;
    },
  },
});

export const { toggle, setTheme, firstSetTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;

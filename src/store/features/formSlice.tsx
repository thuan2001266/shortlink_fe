import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface formState {
  open: boolean;
  view: "update" | "delete" | "create" | "duplicate" | "";
}

const initialState: formState = {
  open: false,
  view: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggleForm: (state, action: PayloadAction<formState>) => {
      state.open = action.payload.open;
      state.view = action?.payload.view || "";
    },
  },
});

export const { toggleForm } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;

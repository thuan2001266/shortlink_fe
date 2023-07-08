import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";
import userSlice from "./features/userSlice";
import linkSlice from "./features/linkSlice";
import formSlice from "./features/formSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    links: linkSlice,
    form: formSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

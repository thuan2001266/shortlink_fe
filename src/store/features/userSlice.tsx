import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import jwt_decode from "jwt-decode";

interface UserState {
  role: string;
  access_token: string;
  user_name: string;
  active: boolean | null;
  first_refresh?: boolean;
}

const initialState: UserState = {
  role: "",
  access_token: "",
  user_name: "",
  active: null,
  first_refresh: false,
};

interface decodedToken {
  active: boolean;
  exp: number;
  iat: number;
  sub: string;
  userFirstName: string;
  userLastName: string;
  userRole: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      const decoded: decodedToken = jwt_decode(action.payload);
      state.role = decoded.userRole;
      state.active = decoded.active;
      state.user_name = decoded.sub.split("@")[0].trim();
      state.access_token = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
    userLoggedout: (state) => {
      state.role = initialState.role;
      state.active = initialState.active;
      state.user_name = initialState.user_name;
      state.access_token = initialState.access_token;
    },
    setRefresh: (state) => {
      state.first_refresh = true;
    },
  },
});

export const { setUser, setAccessToken, userLoggedout, setRefresh } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

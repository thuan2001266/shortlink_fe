import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { setUser } from "@/store/features/userSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    try {
      const response = await axios.post(
        "/api/v1/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.refresh_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("refresh_token", response.data.refresh_token);
      dispatch(setUser(response.data.access_token));
      return response.data.access_token;
    } catch (e: any) {}
  };

  return { refresh };
};

export default useRefreshToken;

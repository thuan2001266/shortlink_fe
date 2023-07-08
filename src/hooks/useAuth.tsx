import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, userLoggedout, setRefresh } from "@/store/features/userSlice";
import axios from "@/api/axios";
import { LoginFormData } from "@/components/Auth/LoginForm";
import { RegisterData } from "@/components/Auth/RegisterForm";
import { useRouter } from "next/router";
import useRefreshToken from "./useRefreshToken";

type useAuthProps = {};

const useAuth = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { refresh } = useRefreshToken();

  useEffect(() => {
    if (
      user.access_token === "" &&
      localStorage.getItem("refresh_token") !== "" &&
      user.first_refresh === false
    ) {
      refresh();
      dispatch(setRefresh());
      if (router.pathname === "/auth") {
        router.push("/");
      }
    }
  }, [user.first_refresh]);

  const login = async (loginData: LoginFormData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/auth/authenticate", {
        email: loginData.email,
        password: loginData.password,
      });
      dispatch(setUser(response.data.access_token));
      if (response.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }

      setTimeout(() => {
        router.push("/");
        setError("");
        setLoading(false);
      }, 1000);
    } catch (e: any) {
      setError("Error occurred");
      setLoading(false);
    }
  };

  const register = async (registerData: RegisterData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/auth/register", {
        email: registerData.email,
        password: registerData.password,
      });
      dispatch(setUser(response.data.access_token));
      if (response.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }

      setError("");
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      });
    } catch (e: any) {
      setError("Error occurred");
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userLoggedout());
      localStorage.setItem("refresh_token", "");
    } catch (e: any) {
      setError("Error occurred");
    }
  };

  return { login, register, logout, error, loading };
};
export default useAuth;

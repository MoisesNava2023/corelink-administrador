import { api } from "./apiClient";

export const loginRequest = async (username: string, password: string) => {
  const res = await api.post("/auth/login", {
    username,
    password,
  });

  return res.data;
};

export const refreshRequest = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", {
    refreshToken,
  });

  return res.data;
};
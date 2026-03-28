import { api } from "./apiClient";

export const getAllOrders = async () => {
  const res = await api.get("/orders/all");
  return res.data;
};
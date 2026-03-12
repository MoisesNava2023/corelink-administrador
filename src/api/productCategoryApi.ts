import { api } from "./apiClient";
import { ProductCategory } from "@/types/ProductCategory";

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  const res = await api.get("/service/product-category");
  return res.data.response;
};
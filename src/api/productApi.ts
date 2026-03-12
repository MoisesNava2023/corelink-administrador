import { api } from "./apiClient";

export interface CreateProductPayload {
  name: string;
  price: number;
  categoryId: number;
  branchId: number;
}

export interface UpdateProductPayload {
  id: number;
  name?: string;
  price?: number;
  categoryId?: number;
}

export const createProduct = async (data: CreateProductPayload) => {
  const res = await api.post("/product", data);
  return res.data;
};

export const updateProduct = async (data: UpdateProductPayload) => {
  const res = await api.patch(`/product/${data.id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/product/${id}`);
  return res.data;
};
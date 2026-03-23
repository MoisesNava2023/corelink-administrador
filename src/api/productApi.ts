import { api } from "./apiClient";

export interface CreateProductPayload {
  name: string;
  originalPrice: number;
  categoryId: number;
  branchId: number;
}

export interface UpdateProductPayload {
  id: number;
  name?: string;
  originalPrice?: number;
  categoryId?: number;
}

export const createProduct = async (data: CreateProductPayload) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("originalPrice", data.originalPrice.toString());
  formData.append("categoryId", data.categoryId.toString());
  formData.append("branchId", data.branchId.toString());

  const res = await api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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
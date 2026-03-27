import { api } from "./apiClient";

export interface CreateProductPayload {
  name: string;
  price: number;
  branchId: number;
  image?: File;
}

export interface UpdateProductPayload {
  id: number;
  name?: string;
  price?: number;
  branchId: number;
  image?: File; // 🔥 importante
}

export const createProduct = async (data: CreateProductPayload) => {
  const formData = new FormData();

  formData.append("Name", data.name);
  formData.append("Price", data.price.toString());
  formData.append("BranchId", data.branchId.toString());
  formData.append("CategoryId", "1");
  formData.append("Stock", "0");

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateProduct = async (data: UpdateProductPayload) => {
  const formData = new FormData();

  if (data.name) formData.append("Name", data.name);

  if (data.price !== undefined) {
    formData.append("Price", data.price.toString());
  }

  formData.append("BranchId", data.branchId.toString());
  formData.append("Stock", "0");

  // 🔥 ESTE ES EL CAMBIO IMPORTANTE
  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.patch(`/product/${data.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
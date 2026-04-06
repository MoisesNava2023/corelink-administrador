import { api } from "./apiClient";
import { ProductCategory } from "@/types/ProductCategory";

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  const res = await api.get("/product-category");
  return res.data.response;
};

export interface CreateCategory {
  name: string;
  description: string;
  imageUrl?: File;
}

export interface UpdateCategory {
  id: number;
  name?: string;
  description?: string;
  imageUrl?: File;
}

export const createCategory = async (data: CreateCategory) => {
  const formData = new FormData();

  formData.append("Name", data.name);
  formData.append("Description", data.description);
  if (data.imageUrl) {
    formData.append("image", data.imageUrl);
  }

  const response = await api.post("/product-category", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateCategory = async (data: UpdateCategory) => {
  const formData = new FormData();

  if (data.name) formData.append("Name", data.name);
  if (data.description) formData.append("Description", data.description)
  if (data.imageUrl) {
    formData.append("image", data.imageUrl);
  }

  const response = await api.patch(`/product-category/${data.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

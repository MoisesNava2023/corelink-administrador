import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, deleteProduct } from "@/api/productApi";

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"], exact: false }); 
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });
};
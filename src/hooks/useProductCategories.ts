import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {createCategory, getProductCategories, updateCategory} from "@/api/productCategoryApi";

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories,
  });
};

export const useCreateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["productCategories"], exact: false });
    },
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["productCategories"], exact: false });
    },
  });
};

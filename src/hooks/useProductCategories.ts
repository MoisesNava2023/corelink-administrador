import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "@/api/productCategoryApi";

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories,
  });
};
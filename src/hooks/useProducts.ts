import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiClient";

export const useProducts = (branchId: number) => {
  return useQuery({
    queryKey: ["products", branchId],
    queryFn: async () => {
      const res = await api.get(`/product/branch/${branchId}`);
      return res.data.response;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    throwOnError: false,
  });
};
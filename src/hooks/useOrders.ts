import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/api/orderApi";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    throwOnError: false,
  });
};
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Sale } from "@/types/Sale";
import { mockSales } from "@/data/mockData";

interface SalesContextType {
  sales: Sale[];
  addSale: (s: Omit<Sale, "id">) => void;
}

const SalesContext = createContext<SalesContextType | null>(null);

export const useSales = () => {
  const ctx = useContext(SalesContext);
  if (!ctx) throw new Error("useSales must be used within SalesProvider");
  return ctx;
};

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [sales, setSales] = useState<Sale[]>(mockSales);

  const addSale = (s: Omit<Sale, "id">) => {
    setSales((prev) => [...prev, { ...s, id: crypto.randomUUID() }]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/Product";
import { mockProducts } from "@/data/mockData";

interface ProductContextType {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProduct must be used within ProductProvider");
  return ctx;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const addProduct = (p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: crypto.randomUUID() }]);
  };

  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

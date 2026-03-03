export const PRODUCT_CATEGORIES = ["Ferretería", "Alimentos", "Hogar"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
}

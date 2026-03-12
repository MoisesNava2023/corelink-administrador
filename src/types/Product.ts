export const PRODUCT_CATEGORIES = ["Ferretería", "Alimentos", "Hogar"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
}

export interface Product {
  id: number;
  name: string;
  imageUrl?: string;
  originalPrice: number;
  finalPrice: number;
  offerPrice?: number | null;
  hasDiscount: boolean;
  discountPercentage?: number | null;
}
export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  clientId: string;
  clientName: string;
  items: SaleItem[];
  totalAmount: number;
  date: string;
}

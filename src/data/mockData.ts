import { Product } from "@/types/Product";
import { Client } from "@/types/Client";
import { Sale } from "@/types/Sale";

export const mockProducts: Product[] = [
  { id: 1, name: "Martillo de acero", price: 12.5, category: "Ferretería", originalPrice: 12.5, finalPrice: 12.5, hasDiscount: false },
  { id: 2, name: "Destornillador Phillips", price: 5.0, category: "Ferretería", originalPrice: 5.0, finalPrice: 5.0, hasDiscount: false },
  { id: 3, name: "Arroz premium 1kg", price: 2.8, category: "Alimentos", originalPrice: 2.8, finalPrice: 2.8, hasDiscount: false },
  { id: 4, name: "Aceite de oliva 500ml", price: 6.5, category: "Alimentos", originalPrice: 6.5, finalPrice: 6.5, hasDiscount: false },
  { id: 5, name: "Juego de sábanas", price: 25.0, category: "Hogar", originalPrice: 25.0, finalPrice: 25.0, hasDiscount: false },
  { id: 6, name: "Lámpara de mesa LED", price: 18.0, category: "Hogar", originalPrice: 18.0, finalPrice: 18.0, hasDiscount: false },
];

export const mockClients: Client[] = [
  { id: "1", name: "Carlos Pérez", email: "carlos@email.com", phone: "+58 412-1234567" },
  { id: "2", name: "María García", email: "maria@email.com", phone: "+58 414-7654321" },
  { id: "3", name: "José Rodríguez", email: "jose@email.com", phone: "+58 416-1112233" },
];

export const mockSales: Sale[] = [
  {
    id: "1",
    clientId: "1",
    clientName: "Carlos Pérez",
    items: [
      { productId: "1", productName: "Martillo de acero", quantity: 2, unitPrice: 12.5 },
      { productId: "3", productName: "Arroz premium 1kg", quantity: 5, unitPrice: 2.8 },
    ],
    totalAmount: 39.0,
    date: "2026-02-28",
  },
  {
    id: "2",
    clientId: "2",
    clientName: "María García",
    items: [
      { productId: "5", productName: "Juego de sábanas", quantity: 1, unitPrice: 25.0 },
      { productId: "6", productName: "Lámpara de mesa LED", quantity: 2, unitPrice: 18.0 },
    ],
    totalAmount: 61.0,
    date: "2026-03-01",
  },
];

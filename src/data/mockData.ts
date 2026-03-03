import { Product } from "@/types/Product";
import { Client } from "@/types/Client";
import { Sale } from "@/types/Sale";

export const mockProducts: Product[] = [
  { id: "p1", name: "Martillo de acero", price: 12.5, category: "Ferretería" },
  { id: "p2", name: "Destornillador Phillips", price: 5.0, category: "Ferretería" },
  { id: "p3", name: "Arroz premium 1kg", price: 2.8, category: "Alimentos" },
  { id: "p4", name: "Aceite de oliva 500ml", price: 6.5, category: "Alimentos" },
  { id: "p5", name: "Juego de sábanas", price: 25.0, category: "Hogar" },
  { id: "p6", name: "Lámpara de mesa LED", price: 18.0, category: "Hogar" },
];

export const mockClients: Client[] = [
  { id: "c1", name: "Carlos Pérez", email: "carlos@email.com", phone: "+58 412-1234567" },
  { id: "c2", name: "María García", email: "maria@email.com", phone: "+58 414-7654321" },
  { id: "c3", name: "José Rodríguez", email: "jose@email.com", phone: "+58 416-1112233" },
];

export const mockSales: Sale[] = [
  {
    id: "s1",
    clientId: "c1",
    clientName: "Carlos Pérez",
    items: [
      { productId: "p1", productName: "Martillo de acero", quantity: 2, unitPrice: 12.5 },
      { productId: "p3", productName: "Arroz premium 1kg", quantity: 5, unitPrice: 2.8 },
    ],
    totalAmount: 39.0,
    date: "2026-02-28",
  },
  {
    id: "s2",
    clientId: "c2",
    clientName: "María García",
    items: [
      { productId: "p5", productName: "Juego de sábanas", quantity: 1, unitPrice: 25.0 },
      { productId: "p6", productName: "Lámpara de mesa LED", quantity: 2, unitPrice: 18.0 },
    ],
    totalAmount: 61.0,
    date: "2026-03-01",
  },
];

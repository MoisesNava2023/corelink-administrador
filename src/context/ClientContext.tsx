import React, { createContext, useContext, useState, ReactNode } from "react";
import { Client } from "@/types/Client";
import { mockClients } from "@/data/mockData";

interface ClientContextType {
  clients: Client[];
  addClient: (c: Omit<Client, "id">) => void;
  updateClient: (c: Client) => void;
  deleteClient: (id: string) => void;
}

const ClientContext = createContext<ClientContextType | null>(null);

export const useClient = () => {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error("useClient must be used within ClientProvider");
  return ctx;
};

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>(mockClients);

  const addClient = (c: Omit<Client, "id">) => {
    setClients((prev) => [...prev, { ...c, id: crypto.randomUUID() }]);
  };

  const updateClient = (c: Client) => {
    setClients((prev) => prev.map((x) => (x.id === c.id ? c : x)));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
};

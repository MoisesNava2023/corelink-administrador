import { useOrders } from "@/hooks/useOrders";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Orders = () => {
  const { data, isLoading } = useOrders();

  if (isLoading) {
    return <div className="p-6">Cargando órdenes...</div>;
  }

  const orders = data?.response || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Órdenes</h1>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((o: any) => (
              <TableRow key={o.orderId}>
                <TableCell>{o.orderId}</TableCell>
                <TableCell>{o.customerName}</TableCell>
                <TableCell>${o.total}</TableCell>
                <TableCell>{o.status}</TableCell>
                <TableCell>
                  {new Date(o.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;

import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const Orders = () => {
  const { data, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <div className="p-6">Cargando órdenes...</div>;
  }

  const orders = data?.response || [];

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
    setOpen(true);
  };

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
              <TableRow
                key={o.orderId}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(o)}
              >
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalle de Orden</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedOrder && (
            <Card>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Cliente:</span> {selectedOrder.customerName}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fecha:</span> {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teléfono:</span> {selectedOrder.phone}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dirección:</span> {selectedOrder.address}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sucursal:</span> {selectedOrder.branchName}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Método de pago:</span> {selectedOrder.paymentMethod}
                  </div>
                </div>

                <div className="rounded border overflow-hidden mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>P. Unitario</TableHead>
                        <TableHead>Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((item: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                              className="h-12 w-12 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                          <TableCell>${item.subtotal.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-end gap-4 mt-2">
                  <span className="text-xl font-bold">Total: ${selectedOrder.total.toFixed(2)}</span>
                  <a
                    href={
                      (() => {
                        const phone = selectedOrder.phone?.replace(/[^\d]/g, "");
                        const productList = selectedOrder.products
                          .map((item: any) => `${item.productName} x${item.quantity}`)
                          .join(", ");
                        const msg =
                          `Hola ${selectedOrder.customerName}, su orden #${selectedOrder.orderId} por un total de $${selectedOrder.total.toFixed(2)} está lista.\n` +
                          `Productos: ${productList}.\n` +
                          `Gracias por su compra en ${selectedOrder.branchName}!`;
                        return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
                      })()
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                   Notificar por WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
import { useParams, useNavigate } from "react-router-dom";
import { useSales } from "@/context/SalesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

const SaleDetail = () => {
  const { id } = useParams();
  const { sales } = useSales();
  const navigate = useNavigate();
  const sale = sales.find((s) => s.id === id);

  if (!sale) return <div className="p-6">Venta no encontrada.</div>;

  return (
    <div>
      <Button variant="ghost" onClick={() => navigate("/dashboard/sales")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />Volver
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Venta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Cliente:</span> {sale.clientName}</div>
            <div><span className="text-muted-foreground">Fecha:</span> {sale.date}</div>
          </div>

          <div className="rounded border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>P. Unitario</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="text-right text-xl font-bold">Total: ${sale.totalAmount.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaleDetail;

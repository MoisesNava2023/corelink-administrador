import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSales } from "@/context/SalesContext";
import { useClient } from "@/context/ClientContext";
import { useProduct } from "@/context/ProductContext";
import { SaleItem } from "@/types/Sale";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

const Sales = () => {
  const { sales, addSale } = useSales();
  const { clients } = useClient();
  const { products } = useProduct();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState("1");

  const addItem = () => {
    const prod = products.find((p) => p.id.toString() === selectedProduct);
    if (!prod) return;
    setItems((prev) => [...prev, { productId: prod.id.toString(), productName: prod.name, quantity: parseInt(qty) || 1, unitPrice: prod.price }]);
    setSelectedProduct("");
    setQty("1");
  };

  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const total = items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);

  const handleSave = () => {
    const client = clients.find((c) => c.id === clientId);
    if (!client || items.length === 0) return;
    addSale({ clientId, clientName: client.name, items, totalAmount: total, date: new Date().toISOString().split("T")[0] });
    setOpen(false);
    setClientId("");
    setItems([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ventas</h1>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" />Nueva Venta</Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((s) => (
              <TableRow key={s.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/dashboard/sales/${s.id}`)}>
                <TableCell>{s.date}</TableCell>
                <TableCell>{s.clientName}</TableCell>
                <TableCell>{s.items.length}</TableCell>
                <TableCell>${s.totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Nueva Venta</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger><SelectValue placeholder="Seleccionar cliente" /></SelectTrigger>
                <SelectContent>
                  {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Agregar producto</Label>
              <div className="flex gap-2">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Producto" /></SelectTrigger>
                  <SelectContent>
                    {products.map((p) => <SelectItem key={p.id} value={p.id.toString()}>{p.name} - ${p.price}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} className="w-20" placeholder="Cant" />
                <Button type="button" variant="secondary" onClick={addItem}>+</Button>
              </div>
            </div>

            {items.length > 0 && (
              <div className="rounded border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cant</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                        <TableCell><Button variant="ghost" size="icon" onClick={() => removeItem(idx)}><Trash2 className="h-3 w-3" /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <p className="text-right text-lg font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <DialogFooter><Button onClick={handleSave} disabled={!clientId || items.length === 0}>Guardar Venta</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;
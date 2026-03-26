import { useState } from "react";
import { Product } from "@/types/Product";
import { useProducts } from "@/hooks/useProducts";
import { useProductCategories } from "@/hooks/useProductCategories";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/useProductMutations";

import { Button } from "@/components/ui/button";
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
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil } from "lucide-react";

const branchId = 1;

const Products = () => {
  const { data: products, isLoading } = useProducts(branchId);

 // const { isLoading: categoriesLoading } = useProductCategories();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null as File | null,
  });

  if (isLoading) {
    return <div className="p-6">Cargando productos...</div>;
  }

  // ✏️ EDIT REAL (AHORA CON PRECIO)
  const handleEdit = (p: Product) => {
    const newName = prompt("Nuevo nombre", p.name);
    const newPrice = prompt(
      "Nuevo precio",
      p.finalPrice?.toString() || "0"
    );

    if (!newName || !newPrice) return;

    updateMutation.mutate({
      id: p.id,
      name: newName,
      price: Number(newPrice),
      branchId: branchId,
    });
  };

  // 💾 CREATE REAL
  const handleSave = () => {
    if (!form.name || !form.price) return;

    createMutation.mutate({
      name: form.name,
      price: Number(form.price),
      branchId: branchId,
      image: form.image || undefined,
    });

    setOpen(false);
    setForm({ name: "", price: "", image: null });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>

        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.map((p: Product) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>

                <TableCell>
                  ${p.finalPrice?.toFixed(2) ?? "0.00"}
                </TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(p)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Producto</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Precio</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Imagen</Label>
              <Input
                type="file"
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.files?.[0] || null,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
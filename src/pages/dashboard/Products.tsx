import { useState } from "react";
import { Product } from "@/types/Product";
import { useProducts } from "@/hooks/useProducts";
import { useProductCategories } from "@/hooks/useProductCategories";
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Pencil, Trash2 } from "lucide-react";

const branchId = 1;

const Products = () => {
  const { data: products, isLoading } = useProducts(branchId);

  const { data: categories, isLoading: categoriesLoading } =
    useProductCategories();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
  });

  if (isLoading || categoriesLoading) {
    return <div className="p-6">Cargando productos...</div>;
  }

  const getCategoryName = (categoryId?: number) => {
    const category = categories?.find((c: any) => c.id === categoryId);
    return category?.name ?? "—";
  };

  
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (p: Product) => {
    updateMutation.mutate({
      id: p.id,
      name: `${p.name} (editado)`,
    });
  };

  
  const handleSave = () => {
    if (!form.name || !form.price) return;

    createMutation.mutate({
      name: form.name,
      originalPrice: Number(form.price), 
      categoryId: form.categoryId ? Number(form.categoryId) : 1,
      branchId: branchId,
    });

    setOpen(false);
    setForm({ name: "", price: "", categoryId: "" });
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
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Descuento</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No hay productos
                </TableCell>
              </TableRow>
            )}

            {products?.map((p: Product) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>

                <TableCell>
                  {getCategoryName((p as any).categoryId)}
                </TableCell>

                <TableCell>
                  ${p.finalPrice?.toFixed(2) ?? "0.00"}
                </TableCell>

                <TableCell>
                  {p.hasDiscount ? `${p.discountPercentage}%` : "—"}
                </TableCell>

                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(p)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    {/* DELETE CORRECTO */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDelete((p as any).branchProductId)
                      }
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
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
              <Label>Categoría</Label>
              <Select
                value={form.categoryId}
                onValueChange={(value) =>
                  setForm({ ...form, categoryId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>

                <SelectContent>
                  {categories?.map((c: any) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
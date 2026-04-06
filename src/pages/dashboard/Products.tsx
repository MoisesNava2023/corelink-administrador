import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { useProducts } from "@/hooks/useProducts";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useProductCategories } from "@/hooks/useProductCategories";

const branchId = 1;

const Products = () => {
  const { data: products, isLoading } = useProducts(branchId);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: categories, isLoading: loadingCategories } = useProductCategories();

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null as File | null,
  });

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    image: null as File | null,
  });

  if (isLoading) {
    return <div className="p-6">Cargando productos...</div>;
  }

  const openEditModal = (p: Product) => {
    setSelectedProduct(p);
    setEditForm({
      name: p.name,
      price: p.finalPrice?.toString() || "0",
      image: null,
    });
    setEditOpen(true);
  };

  const handleEditSave = () => {
    if (!selectedProduct) return;

    updateMutation.mutate({
      id: selectedProduct.id,
      name: editForm.name,
      price: Number(editForm.price),
      branchId: branchId,
      image: editForm.image || undefined,
    });

    setEditOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;

    createMutation.mutate({
      name: form.name,
      price: Number(form.price),
      categoryId: selectedCategoryId,
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
              <TableHead>Producto</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.map((p: Product) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {p.imageUrl && (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span>{p.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  ${p.finalPrice?.toFixed(2) ?? "0.00"}
                </TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(p)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* CREATE */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Producto</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              value={form.name}
              placeholder="Nombre del producto"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Precio del producto"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
            <Select
              value={selectedCategoryId.toString()}
              onValueChange={(value) =>
                setSelectedCategoryId(Number(value))
              }
            >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {loadingCategories ? (
                <SelectItem value="loading" disabled>
                  Cargando...
                </SelectItem>
              ) : (
                categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))
              )}
              </SelectContent>
            </Select>
            

            <Input
              type="file"
              placeholder="Suba la imagen del producto"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files?.[0] || null,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />

            <Input
              type="number"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: e.target.value })
              }
            />

            <Input
              type="file"
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  image: e.target.files?.[0] || null,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={handleEditSave}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
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

import { Plus, Pencil, Trash2 } from "lucide-react";

const branchId = 1;

const Products = () => {
  const { data: products, isLoading } = useProducts(branchId);

  const { data: categories, isLoading: categoriesLoading } =
    useProductCategories();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  if (isLoading || categoriesLoading) {
    return <div className="p-6">Cargando productos...</div>;
  }

  const getCategoryName = (categoryId?: number) => {
    const category = categories?.find((c: any) => c.id === categoryId);
    return category?.name ?? "—";
  };

  const handleCreateProduct = () => {
    if (!categories?.length) return;

    createMutation.mutate({
      name: "Producto nuevo",
      price: 10,
      categoryId: categories[0].id,
      branchId: branchId,
    });
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>

        <Button onClick={handleCreateProduct}>
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

                <TableCell>{getCategoryName((p as any).categoryId)}</TableCell>

                <TableCell>${p.finalPrice?.toFixed(2) ?? "0.00"}</TableCell>

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

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(p.id)}
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
    </div>
  );
};

export default Products;
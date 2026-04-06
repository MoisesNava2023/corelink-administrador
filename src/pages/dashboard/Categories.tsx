import { useState } from "react";
import { ProductCategory } from "@/types/ProductCategory.ts";
import { useCreateCategory, useProductCategories, useUpdateCategory } from "@/hooks/useProductCategories.ts";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Pencil } from "lucide-react";

const Categories = () => {
    const { data: categorias, isLoading } = useProductCategories();

    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        image: null as File | null,
    });

    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
        image: null as File | null,
    });

    if (isLoading) {
        return <div className="p-6">Cargando categorias...</div>;
    }

    const openEditModal = (p: ProductCategory) => {
        setSelectedCategory(p);
        setEditForm({
            name: p.name,
            description: p.description || "",
            image: null,
        });
        setEditOpen(true);
    };

    const handleEditSave = () => {
        if (!selectedCategory) return;

        updateMutation.mutate({
            id: selectedCategory.id,
            name: editForm.name,
            description: editForm.description,
            imageUrl: editForm.image || undefined,
        });

        setEditOpen(false);
        setSelectedCategory(null);
    };

    const handleSave = () => {
        if (!form.name || !form.description) return;

        createMutation.mutate({
            name: form.name,
            description: form.description,
            imageUrl: form.image || undefined,
        });

        setOpen(false);
        setForm({ name: "", description: "", image: null });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Categorias</h1>

                <Button onClick={() => setOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar
                </Button>
            </div>

            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Descripcion</TableHead>
                            <TableHead className="w-24">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categorias?.map((pc: ProductCategory) => (
                            <TableRow key={pc.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {pc.imageUrl && (
                                            <img
                                                src={pc.imageUrl}
                                                alt={pc.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        )}
                                        <span>{pc.name}</span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {pc.description || "Sin descripción"}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditModal(pc)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nueva Categoria</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <Input
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

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

                    <DialogFooter>
                        <Button onClick={handleSave}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Categoria</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            value={editForm.name}
                            onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                            }
                        />

                        <Input
                            value={editForm.description}
                            onChange={(e) =>
                                setEditForm({ ...editForm, description: e.target.value })
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

export default Categories;

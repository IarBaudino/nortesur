"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { CategoriaFlyer } from "@/lib/firebase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Trash2, Edit, Plus, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateSlug } from "@/lib/utils";

export function CategoriasManager() {
  const [categorias, setCategorias] = useState<CategoriaFlyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<CategoriaFlyer | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    slug: "",
    imagen: "",
    descripcion: "",
    orden: 0,
  });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.CATEGORIAS_FLYERS), orderBy("orden", "asc"))
      );
      const categoriasData: CategoriaFlyer[] = [];
      querySnapshot.forEach((doc) => {
        categoriasData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as CategoriaFlyer);
      });
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNombreChange = (nombre: string) => {
    setFormData({
      ...formData,
      nombre,
      slug: generateSlug(nombre),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        createdAt: editingCategoria ? editingCategoria.createdAt : Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      if (editingCategoria) {
        await updateDoc(doc(db, COLLECTIONS.CATEGORIAS_FLYERS, editingCategoria.id), data);
      } else {
        // Si es nueva, asignar el orden al final
        const maxOrden = categorias.length > 0 
          ? Math.max(...categorias.map(c => c.orden)) 
          : -1;
        await addDoc(collection(db, COLLECTIONS.CATEGORIAS_FLYERS), {
          ...data,
          orden: maxOrden + 1,
        });
      }

      setIsDialogOpen(false);
      setEditingCategoria(null);
      setFormData({ nombre: "", slug: "", imagen: "", descripcion: "", orden: 0 });
      fetchCategorias();
    } catch (error) {
      console.error("Error saving categoria:", error);
      alert("Error al guardar la categoría");
    }
  };

  const handleEdit = (categoria: CategoriaFlyer) => {
    setEditingCategoria(categoria);
    setFormData({
      nombre: categoria.nombre,
      slug: categoria.slug,
      imagen: categoria.imagen,
      descripcion: categoria.descripcion || "",
      orden: categoria.orden,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría? Los flyers asociados perderán su categoría.")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.CATEGORIAS_FLYERS, id));
      fetchCategorias();
    } catch (error) {
      console.error("Error deleting categoria:", error);
      alert("Error al eliminar la categoría");
    }
  };

  const handleOrderChange = async (categoria: CategoriaFlyer, direction: "up" | "down") => {
    const currentIndex = categorias.findIndex(c => c.id === categoria.id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === categorias.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const targetCategoria = categorias[targetIndex];

    try {
      await updateDoc(doc(db, COLLECTIONS.CATEGORIAS_FLYERS, categoria.id), {
        orden: targetCategoria.orden,
        updatedAt: Timestamp.now(),
      });
      await updateDoc(doc(db, COLLECTIONS.CATEGORIAS_FLYERS, targetCategoria.id), {
        orden: categoria.orden,
        updatedAt: Timestamp.now(),
      });
      fetchCategorias();
    } catch (error) {
      console.error("Error changing order:", error);
      alert("Error al cambiar el orden");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#033671" }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: "#033671" }}>
          Gestión de Categorías de Servicios
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategoria(null);
                setFormData({ nombre: "", slug: "", imagen: "", descripcion: "", orden: 0 });
              }}
              style={{ backgroundColor: "#033671", color: "#ffffff" }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva Categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: "#033671" }}>
                {editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={formData.nombre}
                  onChange={(e) => handleNombreChange(e.target.value)}
                  required
                  placeholder="Ej: Vuelos, Hoteles, Paquetes..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug (URL)</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="vuelos"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se genera automáticamente, pero puedes editarlo
                </p>
              </div>
              <ImageUpload
                value={formData.imagen}
                onChange={(url) => setFormData({ ...formData, imagen: url })}
                folder="nortesur/categorias"
                label="Imagen de la Categoría"
                required
              />
              <div>
                <Label>Descripción del Servicio</Label>
                <Textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describe este servicio/categoría. Este texto aparecerá en la página de la categoría."
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Texto explicativo que se mostrará en la página de esta categoría
                </p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" style={{ backgroundColor: "#033671", color: "#ffffff" }}>
                  {editingCategoria ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((categoria) => (
          <Card key={categoria.id}>
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
              {categoria.imagen && categoria.imagen.trim() !== "" ? (
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="text-gray-400 text-sm text-center p-4">
                  Sin imagen
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: "#033671" }}>
                {categoria.nombre}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 text-gray-600">
                Slug: /servicios/{categoria.slug}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOrderChange(categoria, "up")}
                  disabled={categorias.findIndex(c => c.id === categoria.id) === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOrderChange(categoria, "down")}
                  disabled={categorias.findIndex(c => c.id === categoria.id) === categorias.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(categoria)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(categoria.id)}
                  style={{ color: "#dc2626" }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

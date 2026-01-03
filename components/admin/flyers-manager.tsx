"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Flyer } from "@/lib/firebase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Trash2, Edit, Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FlyersManager() {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState<Flyer | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    destacado: false,
  });

  useEffect(() => {
    fetchFlyers();
  }, []);

  const fetchFlyers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.FLYERS));
      const flyersData: Flyer[] = [];
      querySnapshot.forEach((doc) => {
        flyersData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Flyer);
      });
      setFlyers(flyersData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error("Error fetching flyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        createdAt: editingFlyer ? editingFlyer.createdAt : Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      if (editingFlyer) {
        await updateDoc(doc(db, COLLECTIONS.FLYERS, editingFlyer.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.FLYERS), data);
      }

      setIsDialogOpen(false);
      setEditingFlyer(null);
      setFormData({ titulo: "", descripcion: "", imagen: "", destacado: false });
      fetchFlyers();
    } catch (error) {
      console.error("Error saving flyer:", error);
      alert("Error al guardar el flyer");
    }
  };

  const handleEdit = (flyer: Flyer) => {
    setEditingFlyer(flyer);
    setFormData({
      titulo: flyer.titulo,
      descripcion: flyer.descripcion,
      imagen: flyer.imagen,
      destacado: flyer.destacado,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este flyer?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.FLYERS, id));
      fetchFlyers();
    } catch (error) {
      console.error("Error deleting flyer:", error);
      alert("Error al eliminar el flyer");
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
          Gestión de Flyers
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingFlyer(null);
                setFormData({ titulo: "", descripcion: "", imagen: "", destacado: false });
              }}
              style={{ backgroundColor: "#033671", color: "#ffffff" }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Flyer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: "#033671" }}>
                {editingFlyer ? "Editar Flyer" : "Nuevo Flyer"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Descripción</Label>
                <Textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                />
              </div>
              <ImageUpload
                value={formData.imagen}
                onChange={(url) => setFormData({ ...formData, imagen: url })}
                folder="nortesur/flyers"
                label="Imagen del Flyer"
                required
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="destacado"
                  checked={formData.destacado}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, destacado: checked as boolean })
                  }
                />
                <Label htmlFor="destacado">Destacado</Label>
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
                  {editingFlyer ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flyers.map((flyer) => (
          <Card key={flyer.id}>
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
              {flyer.imagen && flyer.imagen.trim() !== "" ? (
                <img
                  src={flyer.imagen}
                  alt={flyer.titulo}
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
              {flyer.destacado && (
                <div className="absolute top-2 right-2 bg-[#6D4C05] text-white px-2 py-1 rounded text-xs">
                  Destacado
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: "#033671" }}>
                {flyer.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4" style={{ color: "#2E486B" }}>
                {flyer.descripcion}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(flyer)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(flyer.id)}
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





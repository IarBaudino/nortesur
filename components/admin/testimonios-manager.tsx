"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Testimonio } from "@/lib/firebase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function TestimoniosManager() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonio, setEditingTestimonio] = useState<Testimonio | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    destino: "",
    mensaje: "",
    calificacion: 5,
    foto: "",
  });

  useEffect(() => {
    fetchTestimonios();
  }, []);

  const fetchTestimonios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.TESTIMONIOS));
      const testimoniosData: Testimonio[] = [];
      querySnapshot.forEach((doc) => {
        testimoniosData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Testimonio);
      });
      setTestimonios(testimoniosData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error("Error fetching testimonios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        createdAt: editingTestimonio ? editingTestimonio.createdAt : Timestamp.now(),
      };

      if (editingTestimonio) {
        await updateDoc(doc(db, COLLECTIONS.TESTIMONIOS, editingTestimonio.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.TESTIMONIOS), data);
      }

      setIsDialogOpen(false);
      setEditingTestimonio(null);
      setFormData({ nombre: "", destino: "", mensaje: "", calificacion: 5, foto: "" });
      fetchTestimonios();
    } catch (error) {
      console.error("Error saving testimonio:", error);
      alert("Error al guardar el testimonio");
    }
  };

  const handleEdit = (testimonio: Testimonio) => {
    setEditingTestimonio(testimonio);
    setFormData({
      nombre: testimonio.nombre,
      destino: testimonio.destino,
      mensaje: testimonio.mensaje,
      calificacion: testimonio.calificacion,
      foto: testimonio.foto || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este testimonio?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.TESTIMONIOS, id));
      fetchTestimonios();
    } catch (error) {
      console.error("Error deleting testimonio:", error);
      alert("Error al eliminar el testimonio");
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
        <h2 className="text-2xl font-bold" style={{ color: "#033671" }}>
          Gestión de Testimonios
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingTestimonio(null);
                setFormData({ nombre: "", destino: "", mensaje: "", calificacion: 5, foto: "" });
              }}
              style={{ backgroundColor: "#033671", color: "#ffffff" }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Testimonio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: "#033671" }}>
                {editingTestimonio ? "Editar Testimonio" : "Nuevo Testimonio"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <Input
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Destino</Label>
                <Input
                  value={formData.destino}
                  onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Mensaje</Label>
                <Textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Calificación (1-5)</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.calificacion}
                  onChange={(e) => setFormData({ ...formData, calificacion: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <ImageUpload
                  value={formData.foto}
                  onChange={(url) => setFormData({ ...formData, foto: url })}
                  folder="testimonios"
                  label="Foto (opcional)"
                />
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
                  {editingTestimonio ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonios.map((testimonio) => (
          <Card key={testimonio.id}>
            <CardHeader>
              <CardTitle style={{ color: "#033671" }}>{testimonio.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2" style={{ color: "#2E486B" }}>
                {testimonio.destino}
              </p>
              <p className="text-sm mb-4" style={{ color: "#2E486B" }}>
                "{testimonio.mensaje}"
              </p>
              <p className="text-sm mb-4" style={{ color: "#6D4C05" }}>
                ⭐ {testimonio.calificacion}/5
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(testimonio)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(testimonio.id)}
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





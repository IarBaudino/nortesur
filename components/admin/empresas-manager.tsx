"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { EmpresaAsociada } from "@/lib/firebase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function EmpresasManager() {
  const [empresas, setEmpresas] = useState<EmpresaAsociada[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<EmpresaAsociada | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    logo: "",
    url: "",
    orden: 0,
  });

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.EMPRESAS));
      const empresasData: EmpresaAsociada[] = [];
      querySnapshot.forEach((doc) => {
        empresasData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as EmpresaAsociada);
      });
      setEmpresas(empresasData.sort((a, b) => a.orden - b.orden));
    } catch (error) {
      console.error("Error fetching empresas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        orden: parseInt(formData.orden.toString()),
        createdAt: editingEmpresa ? editingEmpresa.createdAt : Timestamp.now(),
      };

      if (editingEmpresa) {
        await updateDoc(doc(db, COLLECTIONS.EMPRESAS, editingEmpresa.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.EMPRESAS), data);
      }

      setIsDialogOpen(false);
      setEditingEmpresa(null);
      setFormData({ nombre: "", logo: "", url: "", orden: 0 });
      fetchEmpresas();
    } catch (error) {
      console.error("Error saving empresa:", error);
      alert("Error al guardar la empresa");
    }
  };

  const handleEdit = (empresa: EmpresaAsociada) => {
    setEditingEmpresa(empresa);
    setFormData({
      nombre: empresa.nombre,
      logo: empresa.logo,
      url: empresa.url || "",
      orden: empresa.orden,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta empresa?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.EMPRESAS, id));
      fetchEmpresas();
    } catch (error) {
      console.error("Error deleting empresa:", error);
      alert("Error al eliminar la empresa");
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
          Gestión de Empresas Asociadas
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingEmpresa(null);
                setFormData({ nombre: "", logo: "", url: "", orden: 0 });
              }}
              style={{ backgroundColor: "#033671", color: "#ffffff" }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva Empresa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: "#033671" }}>
                {editingEmpresa ? "Editar Empresa" : "Nueva Empresa"}
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
                <Label>Logo</Label>
                <ImageUpload
                  value={formData.logo}
                  onChange={(url) => setFormData({ ...formData, logo: url })}
                  folder="empresas"
                />
              </div>
              <div>
                <Label>URL (opcional)</Label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>Orden</Label>
                <Input
                  type="number"
                  value={formData.orden}
                  onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
                  required
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
                  {editingEmpresa ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {empresas.map((empresa) => (
          <Card key={empresa.id}>
            <CardHeader>
              <CardTitle style={{ color: "#033671" }}>{empresa.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-32 mb-4">
                <img
                  src={empresa.logo}
                  alt={empresa.nombre}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              {empresa.url && (
                <p className="text-sm mb-4" style={{ color: "#2E486B" }}>
                  <a href={empresa.url} target="_blank" rel="noopener noreferrer" className="underline">
                    Ver sitio web
                  </a>
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(empresa)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(empresa.id)}
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





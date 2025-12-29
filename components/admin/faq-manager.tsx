"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { FAQ } from "@/lib/firebase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    pregunta: "",
    respuesta: "",
    orden: 0,
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.FAQ));
      const faqsData: FAQ[] = [];
      querySnapshot.forEach((doc) => {
        faqsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as FAQ);
      });
      setFaqs(faqsData.sort((a, b) => a.orden - b.orden));
    } catch (error) {
      console.error("Error fetching FAQs:", error);
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
        createdAt: editingFAQ ? editingFAQ.createdAt : Timestamp.now(),
      };

      if (editingFAQ) {
        await updateDoc(doc(db, COLLECTIONS.FAQ, editingFAQ.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.FAQ), data);
      }

      setIsDialogOpen(false);
      setEditingFAQ(null);
      setFormData({ pregunta: "", respuesta: "", orden: 0 });
      fetchFAQs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("Error al guardar la FAQ");
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      pregunta: faq.pregunta,
      respuesta: faq.respuesta,
      orden: faq.orden,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta FAQ?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.FAQ, id));
      fetchFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Error al eliminar la FAQ");
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
          Gestión de FAQ
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingFAQ(null);
                setFormData({ pregunta: "", respuesta: "", orden: 0 });
              }}
              style={{ backgroundColor: "#033671", color: "#ffffff" }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: "#033671" }}>
                {editingFAQ ? "Editar FAQ" : "Nueva FAQ"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Pregunta</Label>
                <Input
                  value={formData.pregunta}
                  onChange={(e) => setFormData({ ...formData, pregunta: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Respuesta</Label>
                <Textarea
                  value={formData.respuesta}
                  onChange={(e) => setFormData({ ...formData, respuesta: e.target.value })}
                  required
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
                  {editingFAQ ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardHeader>
              <CardTitle style={{ color: "#033671" }}>{faq.pregunta}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4" style={{ color: "#2E486B" }}>
                {faq.respuesta}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(faq)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(faq.id)}
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





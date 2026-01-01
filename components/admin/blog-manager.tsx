"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { BlogPost } from "@/lib/firebase/types";
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

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    slug: "",
    contenido: "",
    resumen: "",
    imagen: "",
    autor: "",
    fechaPublicacion: new Date().toISOString().split("T")[0],
    publicado: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.BLOG));
      const postsData: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        postsData.push({
          id: doc.id,
          ...doc.data(),
          fechaPublicacion: doc.data().fechaPublicacion?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as BlogPost);
      });
      setPosts(postsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (titulo: string) => {
    return titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.slug || generateSlug(formData.titulo);
      const data = {
        ...formData,
        slug,
        fechaPublicacion: Timestamp.fromDate(new Date(formData.fechaPublicacion)),
        createdAt: editingPost ? editingPost.createdAt : Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      if (editingPost) {
        await updateDoc(doc(db, COLLECTIONS.BLOG, editingPost.id), data);
      } else {
        await addDoc(collection(db, COLLECTIONS.BLOG), data);
      }

      setIsDialogOpen(false);
      setEditingPost(null);
      setFormData({
        titulo: "",
        slug: "",
        contenido: "",
        resumen: "",
        imagen: "",
        autor: "",
        fechaPublicacion: new Date().toISOString().split("T")[0],
        publicado: false,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error al guardar el post");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      titulo: post.titulo,
      slug: post.slug,
      contenido: post.contenido,
      resumen: post.resumen,
      imagen: post.imagen || "",
      autor: post.autor,
      fechaPublicacion: new Date(post.fechaPublicacion).toISOString().split("T")[0],
      publicado: post.publicado,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este post?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.BLOG, id));
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error al eliminar el post");
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
          Gestión de Blog
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPost(null);
                setFormData({
                  titulo: "",
                  slug: "",
                  contenido: "",
                  resumen: "",
                  imagen: "",
                  autor: "",
                  fechaPublicacion: new Date().toISOString().split("T")[0],
                  publicado: false,
                });
              }}
              style={{ backgroundColor: "#033671", color: "#ffffff" }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle style={{ color: "#033671" }}>
                {editingPost ? "Editar Post" : "Nuevo Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={formData.titulo}
                  onChange={(e) => {
                    setFormData({ ...formData, titulo: e.target.value });
                    if (!formData.slug || formData.slug === generateSlug(editingPost?.titulo || "")) {
                      setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }));
                    }
                  }}
                  required
                />
              </div>
              <div>
                <Label>Slug (URL del post)</Label>
                <p className="text-xs text-gray-500 mb-2">
                  Se genera automáticamente desde el título. Ejemplo: &quot;Mi Viaje a París&quot; → &quot;mi-viaje-a-paris&quot;
                </p>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="url-del-post"
                />
                {formData.slug && (
                  <p className="text-xs text-gray-500 mt-1">
                    URL: <span className="font-mono">/blog/{formData.slug}</span>
                  </p>
                )}
              </div>
              <div>
                <Label>Resumen</Label>
                <Textarea
                  value={formData.resumen}
                  onChange={(e) => setFormData({ ...formData, resumen: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Contenido (HTML)</Label>
                <Textarea
                  value={formData.contenido}
                  onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                  className="min-h-[200px]"
                  required
                />
              </div>
              <div>
                <ImageUpload
                  value={formData.imagen}
                  onChange={(url) => setFormData({ ...formData, imagen: url })}
                  folder="blog"
                  label="Imagen del Post (opcional)"
                />
              </div>
              <div>
                <Label>Autor</Label>
                <Input
                  value={formData.autor}
                  onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Fecha de Publicación</Label>
                <Input
                  type="date"
                  value={formData.fechaPublicacion}
                  onChange={(e) => setFormData({ ...formData, fechaPublicacion: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="publicado"
                  checked={formData.publicado}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, publicado: checked as boolean })
                  }
                />
                <Label htmlFor="publicado">Publicado</Label>
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
                  {editingPost ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle style={{ color: "#033671" }}>{post.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2" style={{ color: "#2E486B" }}>
                {post.resumen}
              </p>
              <p className="text-xs mb-4" style={{ color: "#2E486B" }}>
                Por {post.autor} • {new Date(post.fechaPublicacion).toLocaleDateString()}
                {post.publicado ? (
                  <span className="ml-2 text-green-600">✓ Publicado</span>
                ) : (
                  <span className="ml-2 text-gray-500">Borrador</span>
                )}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(post)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(post.id)}
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





"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { FlyersManager } from "@/components/admin/flyers-manager";
import { TestimoniosManager } from "@/components/admin/testimonios-manager";
import { FAQManager } from "@/components/admin/faq-manager";
import { EmpresasManager } from "@/components/admin/empresas-manager";
import { BlogManager } from "@/components/admin/blog-manager";
import { ConfigManager } from "@/components/admin/config-manager";
import { ConsultasManager } from "@/components/admin/consultas-manager";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ email: string | null } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: unknown) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  if (!user) {
    return (
      <main
        className="min-h-screen flex items-center justify-center py-20"
        style={{ backgroundColor: "#D9DEE4" }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle style={{ color: "#033671" }}>
              Panel de Administración
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#2E486B" }}
                >
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#2E486B" }}
                >
                  Contraseña
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                style={{ backgroundColor: "#033671", color: "#ffffff" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: "#033671" }}>
            Panel de Administración
          </h1>
          <Button
            onClick={handleLogout}
            style={{ backgroundColor: "#033671", color: "#ffffff" }}
          >
            Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="consultas" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="consultas">Consultas</TabsTrigger>
            <TabsTrigger value="flyers">Flyers</TabsTrigger>
            <TabsTrigger value="testimonios">Testimonios</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="empresas">Empresas</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="consultas">
            <ConsultasManager />
          </TabsContent>

          <TabsContent value="flyers">
            <FlyersManager />
          </TabsContent>

          <TabsContent value="testimonios">
            <TestimoniosManager />
          </TabsContent>

          <TabsContent value="faq">
            <FAQManager />
          </TabsContent>

          <TabsContent value="empresas">
            <EmpresasManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          <TabsContent value="config">
            <ConfigManager />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

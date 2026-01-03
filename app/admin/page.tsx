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
        className="min-h-screen flex items-center justify-center py-8 md:py-20 px-4"
        style={{ backgroundColor: "#D9DEE4" }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl" style={{ color: "#033671" }}>
              Panel de Administración
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
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
                  className="text-base"
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
                  className="text-base"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-base"
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
    <main className="min-h-screen py-8 md:py-12 lg:py-20" style={{ backgroundColor: "#D9DEE4" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: "#033671" }}>
            Panel de Administración
          </h1>
          <Button
            onClick={handleLogout}
            className="w-full md:w-auto text-sm md:text-base"
            style={{ backgroundColor: "#033671", color: "#ffffff" }}
          >
            Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="consultas" className="w-full">
          <div className="overflow-x-auto mb-6 md:mb-8">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 min-w-max md:min-w-0 h-auto">
              <TabsTrigger value="consultas" className="text-xs md:text-sm px-2 md:px-4 py-2">
                Consultas
              </TabsTrigger>
              <TabsTrigger value="flyers" className="text-xs md:text-sm px-2 md:px-4 py-2">
                Flyers
              </TabsTrigger>
              <TabsTrigger value="testimonios" className="text-xs md:text-sm px-2 md:px-4 py-2">
                Testimonios
              </TabsTrigger>
              <TabsTrigger value="faq" className="text-xs md:text-sm px-2 md:px-4 py-2">
                FAQ
              </TabsTrigger>
              <TabsTrigger value="empresas" className="text-xs md:text-sm px-2 md:px-4 py-2">
                Empresas
              </TabsTrigger>
              <TabsTrigger value="blog" className="text-xs md:text-sm px-2 md:px-4 py-2">
                Blog
              </TabsTrigger>
              <TabsTrigger value="config" className="text-xs md:text-sm px-2 md:px-4 py-2">
                Config
              </TabsTrigger>
            </TabsList>
          </div>

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

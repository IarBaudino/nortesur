"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFlyers } from "@/lib/hooks/use-flyers";
import { useCategorias } from "@/lib/hooks/use-categorias";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, ArrowLeft, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoriaPage() {
  const params = useParams();
  const categoriaSlug = params.categoria as string;
  const { flyers, loading: flyersLoading } = useFlyers();
  const { categorias, loading: categoriasLoading } = useCategorias();
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);

  const categoria = categorias.find((c) => c.slug === categoriaSlug);
  const flyersDeCategoria = flyers.filter((f) => f.categoriaId === categoria?.id);

  const loading = flyersLoading || categoriasLoading;

  const openFlyer = (flyerId: string) => {
    setSelectedFlyer(flyerId);
  };

  const closeFlyer = () => {
    setSelectedFlyer(null);
  };

  const selectedFlyerData = flyers.find((f) => f.id === selectedFlyer);

  if (loading) {
    return (
      <main
        className="min-h-screen py-20"
        style={{ backgroundColor: "#D9DEE4" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#033671" }}
            />
          </div>
        </div>
      </main>
    );
  }

  if (!categoria) {
    return (
      <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/servicios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a servicios
            </Link>
          </Button>
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#033671" }}>
              Categoría no encontrada
            </h1>
            <p style={{ color: "#2E486B" }}>
              La categoría que buscas no existe.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/servicios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a servicios
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#033671" }}>
            {categoria.nombre}
          </h1>
          {categoria.descripcion && categoria.descripcion.trim() !== "" ? (
            <div className="max-w-3xl mb-6">
              <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: "#2E486B" }}>
                {categoria.descripcion}
              </p>
            </div>
          ) : (
            <p className="text-lg mb-6" style={{ color: "#2E486B" }}>
              Explora todos nuestros servicios de {categoria.nombre.toLowerCase()}
            </p>
          )}
        </div>

        {flyersDeCategoria.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {flyersDeCategoria.map((flyer, index) => (
                <motion.div
                  key={flyer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="group h-full flex flex-col bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer"
                    onClick={() => openFlyer(flyer.id)}
                  >
                    <div className="relative aspect-[1200/864] overflow-hidden bg-gray-100">
                      {flyer.imagen && flyer.imagen.trim() !== "" ? (
                        <>
                          {flyer.imagen.includes("cloudinary.com") ? (
                            <img
                              src={flyer.imagen}
                              alt={flyer.titulo}
                              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 z-0"
                              onError={(e) => {
                                console.error("❌ Error cargando imagen:", flyer.imagen, e);
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                              onLoad={() => {
                                console.log("✅ Imagen cargada exitosamente:", flyer.imagen);
                              }}
                            />
                          ) : (
                            <Image
                              src={flyer.imagen}
                              alt={flyer.titulo}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-contain transition-transform duration-700 group-hover:scale-110 z-0"
                              onError={(e) => {
                                console.error("❌ Error cargando imagen:", flyer.imagen, e);
                              }}
                              onLoad={() => {
                                console.log("✅ Imagen cargada exitosamente:", flyer.imagen);
                              }}
                            />
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Sin imagen (URL vacía)
                        </div>
                      )}
                      {flyer.destacado && (
                        <div className="absolute top-5 right-5 bg-[#6D4C05] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-20">
                          Destacado
                        </div>
                      )}
                    </div>
                    <CardContent className="p-8">
                      <h3
                        className="text-2xl font-bold mb-3 group-hover:text-[#6D4C05] transition-colors duration-300"
                        style={{ color: "#033671" }}
                      >
                        {flyer.titulo}
                      </h3>
                      <p className="text-base leading-relaxed line-clamp-3" style={{ color: "#2E486B" }}>
                        {flyer.descripcion}
                      </p>
                      <div className="mt-4 text-sm font-semibold text-[#6D4C05] group-hover:text-[#033671] transition-colors">
                        Ver más detalles →
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Dialog para mostrar detalles completos */}
            {selectedFlyerData && (
              <Dialog open={selectedFlyer !== null} onOpenChange={(open) => !open && closeFlyer()}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <DialogTitle className="text-3xl font-bold mb-2" style={{ color: "#033671" }}>
                          {selectedFlyerData.titulo}
                        </DialogTitle>
                        {selectedFlyerData.destacado && (
                          <span className="inline-block bg-[#6D4C05] text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                            Destacado
                          </span>
                        )}
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <DialogDescription asChild>
                    <div className="space-y-6">
                      {/* Imagen */}
                      {selectedFlyerData.imagen && selectedFlyerData.imagen.trim() !== "" && (
                        <div className="relative w-full aspect-[1200/864] rounded-lg overflow-hidden bg-gray-100">
                          {selectedFlyerData.imagen.includes("cloudinary.com") ? (
                            <img
                              src={selectedFlyerData.imagen}
                              alt={selectedFlyerData.titulo}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <Image
                              src={selectedFlyerData.imagen}
                              alt={selectedFlyerData.titulo}
                              fill
                              sizes="(max-width: 768px) 100vw, 800px"
                              className="object-contain"
                            />
                          )}
                        </div>
                      )}

                      {/* Descripción completa */}
                      <div>
                        <h4 className="text-xl font-semibold mb-3" style={{ color: "#033671" }}>
                          Descripción
                        </h4>
                        <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: "#2E486B" }}>
                          {selectedFlyerData.descripcion}
                        </p>
                      </div>

                      {/* Botón Consultar */}
                      <div className="pt-4 border-t border-gray-200">
                        <Button
                          asChild
                          size="lg"
                          className="w-full sm:w-auto px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          style={{ backgroundColor: "#033671", color: "#ffffff" }}
                        >
                          <Link href="/#consulta" className="flex items-center justify-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Consultar sobre este servicio
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: "#2E486B" }}>
              No hay servicios disponibles en esta categoría en este momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

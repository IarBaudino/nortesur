"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCategorias } from "@/lib/hooks/use-categorias";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiciosPage() {
  const { categorias, loading } = useCategorias();

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

  return (
    <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#033671" }}>
            Todos los Servicios
          </h1>
          <p className="text-lg" style={{ color: "#2E486B" }}>
            Explora nuestras categorías de servicios
          </p>
        </div>

        {categorias.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {categorias.map((categoria, index) => (
              <motion.div
                key={categoria.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/servicios/${categoria.slug}`}>
                  <Card className="group h-full flex flex-col bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer">
                    <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                      {categoria.imagen && categoria.imagen.trim() !== "" ? (
                        <>
                          {categoria.imagen.includes("cloudinary.com") ? (
                            <img
                              src={categoria.imagen}
                              alt={categoria.nombre}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                              onError={(e) => {
                                console.error("❌ Error cargando imagen:", categoria.imagen, e);
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <Image
                              src={categoria.imagen}
                              alt={categoria.nombre}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                              priority={index < 4}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h3
                              className="text-xl md:text-2xl font-bold text-white drop-shadow-lg"
                            >
                              {categoria.nombre}
                            </h3>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <h3 className="text-xl font-bold" style={{ color: "#033671" }}>
                            {categoria.nombre}
                          </h3>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: "#2E486B" }}>
              No hay categorías disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

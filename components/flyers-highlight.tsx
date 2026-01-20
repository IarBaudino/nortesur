"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCategorias } from "@/lib/hooks/use-categorias";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FlyersHighlight() {
  const { categorias, loading } = useCategorias();
  

  if (loading) {
    return (
      <section className="py-20" style={{ backgroundColor: "#D9DEE4" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#033671" }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#D9DEE4" }}>
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#033671]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#6D4C05]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative z-20" style={{ color: "#033671" }}>
            Nuestros Servicios
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto relative z-20" style={{ color: "#2E486B" }}>
            Descubre nuestras propuestas destacadas diseñadas para crear experiencias inolvidables
          </p>
        </motion.div>

        {categorias.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
              {categorias.map((categoria, index) => (
                <motion.div
                  key={categoria.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                                  console.error("Error cargando imagen:", categoria.imagen, e);
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#033671", color: "#ffffff" }}
              >
                <Link href="/servicios" className="flex items-center gap-2">
                  Ver Todos los Servicios
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: "#2E486B" }}>
              No hay categorías disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

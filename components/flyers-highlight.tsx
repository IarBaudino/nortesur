"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFlyers } from "@/lib/hooks/use-flyers";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FlyersHighlight() {
  const { flyers, loading } = useFlyers();
  const destacados = flyers.filter((f) => f.destacado).slice(0, 3);
  

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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#033671] to-[#2E486B] bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#2E486B" }}>
            Descubre nuestras propuestas destacadas diseñadas para crear experiencias inolvidables
          </p>
        </motion.div>

        {destacados.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {destacados.map((flyer, index) => (
                <motion.div
                  key={flyer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group h-full flex flex-col bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="relative aspect-[1200/864] overflow-hidden bg-gray-100">
                      {flyer.imagen && flyer.imagen.trim() !== "" ? (
                        <>
                          {flyer.imagen.includes("cloudinary.com") ? (
                            <img
                              src={flyer.imagen}
                              alt={flyer.titulo}
                              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 z-0"
                              onError={(e) => {
                                console.error("Error cargando imagen:", flyer.imagen, e);
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
                              priority={index === 0}
                              onError={(e) => {
                                console.error("Error cargando imagen:", flyer.imagen, e);
                              }}
                              onLoad={() => {
                                console.log("✅ Imagen cargada exitosamente:", flyer.imagen);
                              }}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent z-10"></div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Sin imagen (URL vacía)
                        </div>
                      )}
                      <div className="absolute top-5 right-5 bg-[#6D4C05] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        Destacado
                      </div>
                    </div>
                    <CardContent className="p-8 flex-1 flex flex-col">
                      <h3
                        className="text-2xl font-bold mb-4 group-hover:text-[#6D4C05] transition-colors duration-300"
                        style={{ color: "#033671" }}
                      >
                        {flyer.titulo}
                      </h3>
                      <p className="text-base mb-6 flex-1 leading-relaxed" style={{ color: "#2E486B" }}>
                        {flyer.descripcion}
                      </p>
                      <Link
                        href="/servicios"
                        className="inline-flex items-center text-base font-semibold text-[#6D4C05] hover:text-[#033671] transition-all duration-300 group/link"
                      >
                        Ver más detalles
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-2" />
                      </Link>
                    </CardContent>
                  </Card>
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
              No hay servicios destacados disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

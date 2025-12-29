"use client";

import Image from "next/image";
import { useEmpresas } from "@/lib/hooks/use-empresas";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function EmpresasAsociadasSection() {
  const { empresas, loading } = useEmpresas();

  if (loading) {
    return (
      <section className="py-20" style={{ backgroundColor: "#D9DEE4" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#033671" }} />
          </div>
        </div>
      </section>
    );
  }

  if (empresas.length === 0) {
    return null;
  }

  // Duplicar empresas para efecto infinito
  const empresasDuplicadas = [...empresas, ...empresas];

  return (
    <section className="py-20 overflow-hidden relative" style={{ backgroundColor: "#D9DEE4" }}>
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#033671]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#6D4C05]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#033671] to-[#2E486B] bg-clip-text text-transparent">
            Empresas Asociadas
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#2E486B" }}>
            Trabajamos con las mejores empresas del sector turístico
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="relative">
            <div className="flex animate-scroll-continuous gap-4">
              {empresasDuplicadas.map((empresa, index) => {
                const hasUrl = empresa.url && empresa.url.trim() !== "";
                const wrapperProps = hasUrl
                  ? {
                      href: empresa.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};

                return (
                  <div
                    key={`${empresa.id}-${index}`}
                    className="flex-shrink-0 w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)]"
                  >
                    {hasUrl ? (
                      <Card className="relative aspect-[3/2] rounded-xl border-2 flex items-center justify-center p-6 bg-white transition-all duration-300 hover:shadow-2xl hover:scale-105 group overflow-hidden border-gray-200 hover:border-[#6D4C05]">
                        <a
                          {...wrapperProps}
                          className="absolute inset-0 z-10"
                          aria-label={empresa.nombre}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6D4C05]/0 to-[#6D4C05]/0 group-hover:from-[#6D4C05]/5 group-hover:to-[#033671]/5 transition-all duration-300"></div>
                        <Image
                          src={empresa.logo}
                          alt={empresa.nombre}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110 relative z-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      </Card>
                    ) : (
                      <Card className="relative aspect-[3/2] rounded-xl border-2 flex items-center justify-center p-6 bg-white transition-all duration-300 hover:shadow-2xl hover:scale-105 group overflow-hidden border-gray-200 hover:border-[#6D4C05]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6D4C05]/0 to-[#6D4C05]/0 group-hover:from-[#6D4C05]/5 group-hover:to-[#033671]/5 transition-all duration-300"></div>
                        <Image
                          src={empresa.logo}
                          alt={empresa.nombre}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110 relative z-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



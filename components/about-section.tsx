"use client";

import Image from "next/image";
import { useAbout } from "@/lib/hooks/use-about";
import { Loader2, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AboutSection() {
  const { about, loading } = useAbout();

  if (loading) {
    return (
      <section id="about" className="py-20" style={{ backgroundColor: "#CAD0DA" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#033671" }} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#CAD0DA" }}>
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#033671]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#6D4C05]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#033671] to-[#2E486B] bg-clip-text text-transparent">
              Sobre Nosotros
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#2E486B" }}>
              Conoce la pasión y dedicación detrás de cada viaje que planificamos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={about.foto}
                    alt="Agente de viajes"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Card>
              {/* Decoración */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#6D4C05]/10 rounded-full blur-2xl -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <Card className="p-8 hover:shadow-xl transition-all duration-500">
                <div className="flex items-start gap-5 mb-6">
                  <div className="p-4 rounded-xl bg-[#6D4C05]/10 flex-shrink-0">
                    <Heart className="h-7 w-7 text-[#6D4C05]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: "#033671" }}>
                      Nuestra Pasión
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: "#2E486B" }}>
                      {about.bio}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-500">
                <div className="flex items-start gap-5">
                  <div className="p-4 rounded-xl bg-[#033671]/10 flex-shrink-0">
                    <Award className="h-7 w-7" style={{ color: "#033671" }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-6" style={{ color: "#033671" }}>
                      Certificaciones
                    </h3>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                      <Image
                        src={about.diploma}
                        alt="Diploma"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-6"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

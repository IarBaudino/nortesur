"use client";

import Image from "next/image";
import { useAbout } from "@/lib/hooks/use-about";
import { Loader2, Award, Heart, Target, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

          {/* Sección 1: Acerca de Nosotros */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <Card className="p-4 md:p-8 lg:p-10 hover:shadow-xl transition-all duration-500">
              {/* Versión Desktop: Mostrar siempre */}
              <div className="hidden md:flex items-start gap-4 lg:gap-6">
                <div className="p-2 lg:p-4 rounded-xl bg-[#6D4C05]/10 flex-shrink-0">
                  <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-[#6D4C05]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6" style={{ color: "#033671" }}>
                    Acerca de Nosotros
                  </h3>
                  <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line" style={{ color: "#2E486B" }}>
                    {about.acercaDeNosotros || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                  </p>
                </div>
              </div>

              {/* Versión Mobile: Accordion desplegable */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="acerca-de" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-xl bg-[#6D4C05]/10 flex-shrink-0">
                          <Heart className="h-5 w-5 text-[#6D4C05]" />
                        </div>
                        <h3 className="text-lg font-bold text-left" style={{ color: "#033671" }}>
                          Acerca de Nosotros
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line pl-11" style={{ color: "#2E486B" }}>
                        {about.acercaDeNosotros || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </motion.div>

          {/* Sección 2: Viajes Diseñados a la Medida */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 md:mb-12"
          >
            <Card className="p-4 md:p-8 lg:p-10 hover:shadow-xl transition-all duration-500">
              {/* Versión Desktop: Mostrar siempre */}
              <div className="hidden md:flex items-start gap-4 lg:gap-6">
                <div className="p-2 lg:p-4 rounded-xl bg-[#033671]/10 flex-shrink-0">
                  <Award className="h-6 w-6 lg:h-8 lg:w-8" style={{ color: "#033671" }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6" style={{ color: "#033671" }}>
                    Viajes Diseñados a la Medida de Cada Cliente
                  </h3>
                  <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line" style={{ color: "#2E486B" }}>
                    {about.viajesDiseñados || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                  </p>
                </div>
              </div>

              {/* Versión Mobile: Accordion desplegable */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="viajes-diseñados" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-xl bg-[#033671]/10 flex-shrink-0">
                          <Award className="h-5 w-5" style={{ color: "#033671" }} />
                        </div>
                        <h3 className="text-lg font-bold text-left" style={{ color: "#033671" }}>
                          Viajes Diseñados a la Medida
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line pl-11" style={{ color: "#2E486B" }}>
                        {about.viajesDiseñados || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </motion.div>

          {/* Sección 3: Misión y Visión */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <Card className="p-4 md:p-8 lg:p-10 hover:shadow-xl transition-all duration-500">
              {/* Versión Desktop: Mostrar siempre */}
              <div className="hidden md:block space-y-6 lg:space-y-8">
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="p-2 lg:p-4 rounded-xl bg-[#6D4C05]/10 flex-shrink-0">
                    <Target className="h-6 w-6 lg:h-8 lg:w-8 text-[#6D4C05]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6" style={{ color: "#033671" }}>
                      Misión
                    </h3>
                    <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line" style={{ color: "#2E486B" }}>
                      {about.mision || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200/50 pt-6 lg:pt-8"></div>
                
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="p-2 lg:p-4 rounded-xl bg-[#033671]/10 flex-shrink-0">
                    <Eye className="h-6 w-6 lg:h-8 lg:w-8" style={{ color: "#033671" }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6" style={{ color: "#033671" }}>
                      Visión
                    </h3>
                    <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line" style={{ color: "#2E486B" }}>
                      {about.vision || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Versión Mobile: Accordion desplegable */}
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="mision" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-xl bg-[#6D4C05]/10 flex-shrink-0">
                          <Target className="h-5 w-5 text-[#6D4C05]" />
                        </div>
                        <h3 className="text-lg font-bold text-left" style={{ color: "#033671" }}>
                          Misión
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line pl-11" style={{ color: "#2E486B" }}>
                        {about.mision || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vision" className="border-none border-t border-gray-200/50">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-xl bg-[#033671]/10 flex-shrink-0">
                          <Eye className="h-5 w-5" style={{ color: "#033671" }} />
                        </div>
                        <h3 className="text-lg font-bold text-left" style={{ color: "#033671" }}>
                          Visión
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <p className="text-sm leading-relaxed whitespace-pre-line pl-11" style={{ color: "#2E486B" }}>
                        {about.vision || "No hay contenido disponible. Por favor, completa la información en el panel de administración."}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </motion.div>

          {/* Foto y Certificaciones en grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={about.foto || "/images/agente.jpg"}
                    alt="Agente de viajes"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Card>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#6D4C05]/10 rounded-full blur-2xl -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                <div className="flex items-start gap-3 md:gap-5 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 lg:p-4 rounded-xl bg-[#033671]/10 flex-shrink-0">
                    <Award className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" style={{ color: "#033671" }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{ color: "#033671" }}>
                      Certificaciones
                    </h3>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-200 flex-1">
                  <Image
                    src={about.diploma || "/images/diploma.jpg"}
                    alt="Diploma"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-6"
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

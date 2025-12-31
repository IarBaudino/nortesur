"use client";

import { useFAQ } from "@/lib/hooks/use-faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FAQSection() {
  const { faqs, loading } = useFAQ();

  if (loading) {
    return (
      <section
        id="faq"
        className="py-20"
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
      </section>
    );
  }

  return (
    <section id="faq" className="pt-12 pb-20 relative overflow-hidden" style={{ backgroundColor: "#D9DEE4" }}>
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#033671]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#6D4C05]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative z-20 pb-2"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#033671]/10 mb-4">
              <HelpCircle className="h-8 w-8" style={{ color: "#033671" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#033671] to-[#2E486B] bg-clip-text text-transparent relative z-10 leading-normal pb-2 overflow-visible">
              Preguntas Frecuentes
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto relative z-10 mt-2" style={{ color: "#2E486B" }}>
              Resolvemos tus dudas más comunes sobre nuestros servicios
            </p>
          </motion.div>

          {faqs.length > 0 ? (
            <Card className="p-4 md:p-6 bg-white mb-12 hover:shadow-xl transition-shadow duration-300 relative z-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={faq.id}
                      className="border-b border-gray-100 last:border-0 py-2"
                    >
                      <AccordionTrigger
                        className="text-left font-semibold text-base hover:no-underline hover:text-[#6D4C05] transition-colors duration-300 py-2"
                        style={{ color: "#033671" }}
                      >
                        {faq.pregunta}
                      </AccordionTrigger>
                      <AccordionContent
                        className="text-sm leading-relaxed pt-1 pb-2"
                        style={{ color: "#2E486B" }}
                      >
                        {faq.respuesta}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </Card>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: "#2E486B" }}>
                No hay preguntas frecuentes disponibles en este momento.
              </p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Card className="p-10 bg-gradient-to-br from-[#033671]/5 to-[#6D4C05]/5 hover:shadow-xl transition-shadow duration-300">
              <p className="mb-4 text-xl font-bold" style={{ color: "#033671" }}>
                ¿Tienes más preguntas?
              </p>
              <p className="mb-8 text-base leading-relaxed" style={{ color: "#2E486B" }}>
                Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
              </p>
              <Button
                asChild
                size="lg"
                className="hover:opacity-90 transition-opacity hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "#033671", color: "#ffffff" }}
              >
                <Link href="/#consulta" className="flex items-center gap-2">
                  Contactate con un asesor
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

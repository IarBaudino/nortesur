"use client";

import { useFAQ } from "@/lib/hooks/use-faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, HelpCircle } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useContact } from "@/lib/hooks/use-site-config";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function FAQSection() {
  const { faqs, loading } = useFAQ();
  const { contactData } = useContact();

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
    <section id="faq" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#D9DEE4" }}>
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#033671]/10 mb-6">
              <HelpCircle className="h-8 w-8" style={{ color: "#033671" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#033671] to-[#2E486B] bg-clip-text text-transparent">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#2E486B" }}>
              Resolvemos tus dudas más comunes sobre nuestros servicios
            </p>
          </motion.div>

          {faqs.length > 0 ? (
            <Card className="p-8 md:p-10 bg-white mb-12 hover:shadow-xl transition-shadow duration-300">
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
                      className="border-b border-gray-100 last:border-0 py-5"
                    >
                      <AccordionTrigger
                        className="text-left font-semibold text-lg hover:no-underline hover:text-[#6D4C05] transition-colors duration-300 py-4"
                        style={{ color: "#033671" }}
                      >
                        {faq.pregunta}
                      </AccordionTrigger>
                      <AccordionContent
                        className="text-base leading-relaxed pt-2 pb-4"
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
              <WhatsAppButton
                phoneNumber={contactData.whatsapp.phoneNumber}
                message={contactData.whatsapp.defaultMessage}
                size="lg"
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

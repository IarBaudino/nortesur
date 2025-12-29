"use client";

import { useTestimonios } from "@/lib/hooks/use-testimonios";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Loader2, Quote } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useContact } from "@/lib/hooks/use-site-config";
import { motion } from "framer-motion";

export function TestimoniosSection() {
  const { testimonios, loading } = useTestimonios();
  const { contactData } = useContact();

  if (loading) {
    return (
      <section id="testimonios" className="py-20" style={{ backgroundColor: "#CAD0DA" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#033671" }} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonios" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#CAD0DA" }}>
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
            Testimonios
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#2E486B" }}>
            Lo que dicen nuestros clientes sobre sus experiencias con nosotros
          </p>
        </motion.div>

        {testimonios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonios.map((testimonio, index) => (
              <motion.div
                key={testimonio.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                  <CardContent className="p-8 relative">
                    {/* Icono de comillas decorativo */}
                    <Quote className="absolute top-6 right-6 h-16 w-16 text-[#6D4C05]/5 group-hover:text-[#6D4C05]/10 transition-colors duration-300" />
                    
                    <div className="flex gap-1.5 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 transition-all duration-300 ${
                            i < testimonio.calificacion
                              ? "fill-[#6D4C05] text-[#6D4C05]"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-lg mb-8 leading-relaxed relative z-10" style={{ color: "#2E486B" }}>
                      "{testimonio.mensaje}"
                    </p>
                    
                    <div className="pt-6 border-t border-gray-100">
                      <p className="font-bold text-xl mb-2" style={{ color: "#033671" }}>
                        {testimonio.nombre}
                      </p>
                      <p className="text-sm font-medium flex items-center gap-2" style={{ color: "#2E486B" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6D4C05]"></span>
                        {testimonio.destino}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: "#2E486B" }}>
              No hay testimonios disponibles en este momento.
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
          <p className="mb-6 text-lg font-medium" style={{ color: "#2E486B" }}>
            ¿Quieres ser el próximo en compartir tu experiencia?
          </p>
          <WhatsAppButton
            phoneNumber={contactData.whatsapp.phoneNumber}
            message={contactData.whatsapp.defaultMessage}
            size="lg"
          />
        </motion.div>
      </div>
    </section>
  );
}



"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useContact } from "@/lib/hooks/use-site-config";
import { Card } from "@/components/ui/card";

const consultaSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(10, "Teléfono inválido"),
  tipoConsulta: z.string().min(1, "Selecciona un tipo de consulta"),
  destino: z.string().optional(),
  fechaViaje: z.string().optional(),
  cantidadPersonas: z.string().optional(),
  ciudadSalida: z.string().optional(),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ConsultaFormValues = z.infer<typeof consultaSchema>;

export function ConsultaForm() {
  const { contactData } = useContact();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  console.log("ConsultaForm renderizado");

  const form = useForm<ConsultaFormValues>({
    resolver: zodResolver(consultaSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      tipoConsulta: "",
      destino: "",
      fechaViaje: "",
      cantidadPersonas: "",
      ciudadSalida: "",
      mensaje: "",
    },
  });

  async function onSubmit(data: ConsultaFormValues) {
    setIsSubmitting(true);
    try {
      // Guardar consulta en Firebase
      const { collection, addDoc, Timestamp } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase/config");
      const { COLLECTIONS } = await import("@/lib/firebase/collections");

      await addDoc(collection(db, COLLECTIONS.CONSULTAS), {
        ...data,
        leida: false,
        createdAt: Timestamp.now(),
      });

      setIsSuccess(true);
      form.reset();

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error al enviar la consulta:", error);
      alert("Hubo un error al enviar la consulta. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="consulta"
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#D9DEE4" }}
    >
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#033671]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#6D4C05]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#033671] to-[#2E486B] bg-clip-text text-transparent">
              Consulta tu Viaje
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#2E486B" }}>
              Completa el formulario y te contactaremos con la mejor propuesta personalizada para ti
            </p>
          </div>

          <Card className="p-10 md:p-14 relative overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Decoración con acento dorado mejorada */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: "#6D4C05" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl opacity-10"
              style={{ backgroundColor: "#033671" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-5"
              style={{ backgroundColor: "#6D4C05" }}
            ></div>
            {isSuccess && (
              <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-green-800 shadow-lg">
                <p className="font-bold text-lg mb-2">¡Consulta enviada exitosamente!</p>
                <p className="text-base">
                  Tu consulta ha sido recibida correctamente. Te contactaremos pronto.
                </p>
              </div>
            )}

            {/* Botón de WhatsApp directo */}
            <div className="mb-8 text-center p-6 rounded-xl bg-gradient-to-br from-[#033671]/5 to-[#6D4C05]/5 border-2 border-[#6D4C05]/20">
              <p className="text-base font-semibold mb-4" style={{ color: "#033671" }}>
                ¿Prefieres escribir directamente?
              </p>
              <Button
                onClick={() => {
                  // Mensaje template con todos los campos vacíos para que el cliente complete en WhatsApp
                  const mensajeTemplate = `■ Formulario para tu viaje
■ Nortesur Travel – Asesoría personalizada en viajes

¡Hola! Me interesa realizar una consulta:

Nombre:
Email: 
Teléfono: 
Tipo de consulta: 
Destino:
Fecha de viaje:
Cantidad de personas: 
Ciudad de salida:`;

                  const whatsappUrl = getWhatsAppUrl("+5493512399267", mensajeTemplate);
                  window.open(whatsappUrl, "_blank");
                }}
                size="lg"
                className="hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#25D366", color: "#ffffff" }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contactate con un asesor
              </Button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  onSubmit,
                  (errors) => {
                    console.error("❌ ERRORES DE VALIDACIÓN:", errors);
                    console.error("Formulario no válido, no se ejecuta onSubmit");
                  }
                )}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Juan Pérez"
                            {...field}
                            style={{ backgroundColor: "#ffffff" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="juan@example.com"
                            {...field}
                            style={{ backgroundColor: "#ffffff" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+54 11 1234-5678"
                            {...field}
                            style={{ backgroundColor: "#ffffff" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tipoConsulta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de consulta *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="paquete">
                              Paquete turístico
                            </SelectItem>
                            <SelectItem value="vuelo">Vuelos</SelectItem>
                            <SelectItem value="hotel">Hoteles</SelectItem>
                            <SelectItem value="auto">
                              Alquiler de autos
                            </SelectItem>
                            <SelectItem value="actividad">
                              Actividades
                            </SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="destino"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destino</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: París, Francia"
                            {...field}
                            style={{ backgroundColor: "#ffffff" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fechaViaje"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de viaje</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            style={{ backgroundColor: "#ffffff" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cantidadPersonas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad de personas</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2"
                            min="1"
                            {...field}
                            style={{ backgroundColor: "#ffffff" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ciudadSalida"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad de salida</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Buenos Aires, Córdoba"
                            {...field}
                            style={{ backgroundColor: "#ffffff" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="mensaje"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos más sobre tu viaje ideal..."
                          className="min-h-[120px]"
                          style={{ backgroundColor: "#ffffff" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                  style={{ backgroundColor: "#033671", color: "#ffffff" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Consulta
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}


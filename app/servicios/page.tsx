"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFlyers } from "@/lib/hooks/use-flyers";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ServiciosPage() {
  const { flyers, loading } = useFlyers();

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
            Explora todas nuestras propuestas de viaje
          </p>
        </div>

        {flyers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flyers.map((flyer) => (
              <Card key={flyer.id} className="group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={flyer.imagen}
                    alt={flyer.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {flyer.destacado && (
                    <div className="absolute top-5 right-5 bg-[#6D4C05] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Destacado
                    </div>
                  )}
                </div>
                <CardContent className="p-8">
                  <h3
                    className="text-2xl font-bold mb-3 group-hover:text-[#6D4C05] transition-colors duration-300"
                    style={{ color: "#033671" }}
                  >
                    {flyer.titulo}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#2E486B" }}>
                    {flyer.descripcion}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: "#2E486B" }}>
              No hay servicios disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

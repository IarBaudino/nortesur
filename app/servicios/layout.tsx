import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - Paquetes Turísticos y Viajes",
  description: "Descubre nuestros servicios de viajes: paquetes turísticos, vuelos, hoteles, alquiler de autos y actividades. Encuentra el viaje perfecto para ti con Nortesur Travel.",
  keywords: ["servicios de viajes", "paquetes turísticos", "vuelos", "hoteles", "alquiler de autos", "actividades turísticas"],
  openGraph: {
    title: "Servicios - Nortesur Travel",
    description: "Descubre nuestros servicios de viajes: paquetes turísticos, vuelos, hoteles y más. Encuentra el viaje perfecto para ti.",
    url: "/servicios",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Servicios Nortesur Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios - Nortesur Travel",
    description: "Descubre nuestros servicios de viajes: paquetes turísticos, vuelos, hoteles y más.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "/servicios",
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}





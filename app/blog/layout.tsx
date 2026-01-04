import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Consejos y Artículos de Viaje",
  description: "Descubre artículos, consejos y experiencias de viaje en nuestro blog. Inspírate para tu próximo destino con Nortesur Travel.",
  keywords: ["blog de viajes", "consejos de viaje", "artículos de turismo", "experiencias de viaje", "destinos turísticos"],
  openGraph: {
    title: "Blog - Nortesur Travel",
    description: "Descubre artículos, consejos y experiencias de viaje. Inspírate para tu próximo destino.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Nortesur Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Nortesur Travel",
    description: "Descubre artículos, consejos y experiencias de viaje. Inspírate para tu próximo destino.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}







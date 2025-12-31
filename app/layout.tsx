import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloatWrapper } from "@/components/whatsapp-float-wrapper";
import { SmoothScrollHandler } from "@/components/smooth-scroll-handler";
import { StructuredData } from "@/components/seo/structured-data";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nortesur Travel - Tu agencia de viajes de confianza",
    template: "%s | Nortesur Travel",
  },
  description: "Creamos experiencias únicas que recordarás para siempre. Agencia de viajes especializada en paquetes turísticos, vuelos, hoteles y experiencias inolvidables.",
  keywords: ["agencia de viajes", "turismo", "paquetes turísticos", "vuelos", "hoteles", "viajes", "Nortesur Travel"],
  authors: [{ name: "Nortesur Travel" }],
  creator: "Nortesur Travel",
  publisher: "Nortesur Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nortesurtravel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Nortesur Travel",
    title: "Nortesur Travel - Tu agencia de viajes de confianza",
    description: "Creamos experiencias únicas que recordarás para siempre. Agencia de viajes especializada en paquetes turísticos, vuelos, hoteles y experiencias inolvidables.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nortesur Travel - Agencia de Viajes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nortesur Travel - Tu agencia de viajes de confianza",
    description: "Creamos experiencias únicas que recordarás para siempre",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={inter.className}>
        <StructuredData />
        <SmoothScrollHandler />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloatWrapper />
      </body>
    </html>
  );
}

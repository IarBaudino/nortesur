import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloatWrapper } from "@/components/whatsapp-float-wrapper";
import { SmoothScrollHandler } from "@/components/smooth-scroll-handler";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nortesur Travel - Tu agencia de viajes de confianza",
  description: "Creamos experiencias únicas que recordarás para siempre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={inter.className}>
        <SmoothScrollHandler />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloatWrapper />
      </body>
    </html>
  );
}

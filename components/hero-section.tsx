"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/lib/hooks/use-site-config";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

function useHero() {
  const { config, loading } = useSiteConfig();
  return {
    heroData: {
      titulo: config.hero?.titulo || "Descubre el Mundo con Nortesur Travel",
      subtitulo:
        config.hero?.subtitulo ||
        "Creamos experiencias únicas que recordarás para siempre",
      imagenes: config.hero?.imagenes || [
        "/images/head1.jpg",
        "/images/head2.jpg",
        "/images/head3.jpeg",
        "/images/head4.jpeg",
      ],
    },
    loading,
  };
}

export function HeroSection() {
  const { heroData } = useHero();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroData.imagenes.length);
  }, [heroData.imagenes.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroData.imagenes.length) % heroData.imagenes.length
    );
  }, [heroData.imagenes.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  useEffect(() => {
    if (heroData.imagenes.length === 0 || isPaused || isHovered) return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [heroData.imagenes.length, isPaused, isHovered, nextImage]);

  if (heroData.imagenes.length === 0) {
    return null;
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background images carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {heroData.imagenes.map((image, index) => {
            if (index !== currentImageIndex) return null;
            return (
              <motion.div
                key={`${image}-${index}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={`Background ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Overlay con gradiente mejorado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10"></div>

      {/* Controles de navegación */}
      {heroData.imagenes.length > 1 && (
        <>
          {/* Botón anterior */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Botón play/pause */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group"
            aria-label={isPaused ? "Reanudar" : "Pausar"}
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Pause className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        </>
      )}

      {/* Indicadores de puntos */}
      {heroData.imagenes.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroData.imagenes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className="group"
              aria-label={`Ir a imagen ${index + 1}`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                {heroData.titulo}
              </h1>

              <p
                className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-lg"
                style={{ color: "#D9DEE4" }}
              >
                {heroData.subtitulo}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Botones CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-xl"
              style={{ backgroundColor: "#6D4C05" }}
            >
              <Link href="/#consulta">Consultar Ahora</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 transition-all duration-300 hover:scale-105 shadow-xl"
              style={{ backgroundColor: "transparent" }}
            >
              <Link href="/servicios">Ver Servicios</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

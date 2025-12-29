"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil cuando se cambia a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Servicios", href: "/servicios" },
    { label: "Testimonios", href: "/#testimonios" },
    { label: "Nosotros", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/#consulta" },
  ];

  return (
    <nav
      className="sticky top-0 z-[100] w-full transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: isScrolled ? "rgba(217, 222, 228, 0.9)" : "#D9DEE4",
        backdropFilter: isScrolled ? "blur(12px) saturate(180%)" : "blur(10px)",
        borderBottom: isScrolled
          ? "1px solid rgba(202, 208, 218, 0.5)"
          : "1px solid rgba(202, 208, 218, 0.7)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(0, 0, 0, 0.12)"
          : "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group relative"
          >
            <motion.div
              className="relative h-10 w-10 md:h-12 md:w-12 flex-shrink-0 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src="/images/nortesurlogo.jpg"
                alt="Nortesur Travel Logo"
                fill
                sizes="(max-width: 768px) 40px, 48px"
                className="object-cover transition-all duration-300 group-hover:brightness-110"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span
                className="text-lg md:text-xl font-bold tracking-tight transition-all duration-300"
                style={{ color: "#033671" }}
              >
                Nortesur Travel
              </span>
              <span
                className="hidden md:block text-xs font-medium tracking-wider uppercase"
                style={{ color: "#6D4C05" }}
              >
                Tu viaje, nuestra pasión
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Siempre visible en pantallas medianas y grandes */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-2 lg:px-3 py-2 text-xs lg:text-sm xl:text-base font-medium rounded-lg transition-all duration-300 group whitespace-nowrap"
                style={{ color: "#2E486B" }}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(109, 76, 5, 0.1)" }}
                />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#6D4C05] group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ))}
            <Button
              asChild
              className="ml-1 lg:ml-2 xl:ml-4 px-3 lg:px-4 xl:px-5 py-2 text-xs lg:text-sm xl:text-base rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{
                backgroundColor: "#033671",
                color: "#ffffff",
              }}
            >
              <Link href="/#consulta">Consultar</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button - Solo visible en pantallas pequeñas */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "#033671" }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Solo visible en pantallas pequeñas */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t overflow-hidden"
            style={{
              backgroundColor: "rgba(217, 222, 228, 0.98)",
              borderColor: "rgba(202, 208, 218, 0.5)",
              backdropFilter: "blur(12px)",
            }}
          >
            <nav className="container mx-auto px-4 py-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 px-4 text-base font-medium rounded-lg transition-all duration-200 hover:pl-6"
                    style={{
                      color: "#2E486B",
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(109, 76, 5, 0.1)";
                      e.currentTarget.style.color = "#6D4C05";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#2E486B";
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4"
              >
                <Button
                  asChild
                  className="w-full py-6 rounded-lg font-semibold shadow-lg"
                  style={{
                    backgroundColor: "#033671",
                    color: "#ffffff",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/#consulta">Consultar</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

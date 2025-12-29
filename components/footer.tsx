"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { useSiteConfig } from "@/lib/hooks/use-site-config";

export function Footer() {
  const { config } = useSiteConfig();
  const contact = config.contact;

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#033671", color: "#D9DEE4" }}>
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#6D4C05]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-black/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/nortesurlogo.jpg"
                  alt="Nortesur Travel Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold" style={{ color: "#D9DEE4" }}>
                Nortesur Travel
              </span>
            </div>
            <p className="mb-4 max-w-md" style={{ color: "#CAD0DA" }}>
              Tu agencia de viajes de confianza. Creamos experiencias únicas que
              recordarás para siempre.
            </p>
            <div className="flex gap-4">
              {contact.social.facebook && (
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(109, 76, 5, 0.3)" }}
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" style={{ color: "#6D4C05" }} />
                </a>
              )}
              {contact.social.instagram && (
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(109, 76, 5, 0.3)" }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" style={{ color: "#6D4C05" }} />
                </a>
              )}
              {contact.social.twitter && (
                <a
                  href={contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(109, 76, 5, 0.3)" }}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" style={{ color: "#6D4C05" }} />
                </a>
              )}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-6" style={{ color: "#D9DEE4" }}>Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-[#6D4C05] transition-colors duration-300 inline-block hover:translate-x-1"
                  style={{ color: "#CAD0DA" }}
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonios"
                  className="hover:text-[#6D4C05] transition-colors duration-300 inline-block hover:translate-x-1"
                  style={{ color: "#CAD0DA" }}
                >
                  Testimonios
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-[#6D4C05] transition-colors duration-300 inline-block hover:translate-x-1"
                  style={{ color: "#CAD0DA" }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#6D4C05] transition-colors duration-300 inline-block hover:translate-x-1"
                  style={{ color: "#CAD0DA" }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#consulta"
                  className="hover:text-[#6D4C05] transition-colors duration-300 inline-block hover:translate-x-1"
                  style={{ color: "#CAD0DA" }}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5" style={{ color: "#6D4C05" }} />
                <span style={{ color: "#CAD0DA" }}>{contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="w-5 h-5 mt-0.5"
                  style={{ color: "#6D4C05" }}
                />
                <span style={{ color: "#CAD0DA" }}>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 mt-0.5"
                  style={{ color: "#6D4C05" }}
                />
                <span style={{ color: "#CAD0DA" }}>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm"
          style={{ borderColor: "rgba(109, 76, 5, 0.2)", color: "#CAD0DA" }}
        >
          <p>
            © {new Date().getFullYear()} Nortesur Travel. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

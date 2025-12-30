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
  Lock,
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

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          {/* Primera línea: Logo, enlaces y redes sociales */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <Image
                  src="/images/nortesurlogo.jpg"
                  alt="Nortesur Travel Logo"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="font-semibold" style={{ color: "#D9DEE4" }}>
                Nortesur Travel
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                href="/servicios"
                className="hover:text-[#6D4C05] transition-colors duration-200"
                style={{ color: "#CAD0DA" }}
              >
                Servicios
              </Link>
              <span style={{ color: "#6D4C05" }}>•</span>
              <Link
                href="/#testimonios"
                className="hover:text-[#6D4C05] transition-colors duration-200"
                style={{ color: "#CAD0DA" }}
              >
                Testimonios
              </Link>
              <span style={{ color: "#6D4C05" }}>•</span>
              <Link
                href="/#faq"
                className="hover:text-[#6D4C05] transition-colors duration-200"
                style={{ color: "#CAD0DA" }}
              >
                FAQ
              </Link>
              <span style={{ color: "#6D4C05" }}>•</span>
              <Link
                href="/blog"
                className="hover:text-[#6D4C05] transition-colors duration-200"
                style={{ color: "#CAD0DA" }}
              >
                Blog
              </Link>
              <span style={{ color: "#6D4C05" }}>•</span>
              <Link
                href="/#consulta"
                className="hover:text-[#6D4C05] transition-colors duration-200"
                style={{ color: "#CAD0DA" }}
              >
                Contacto
              </Link>
            </div>
            <div className="flex gap-2">
              {contact.social.facebook && (
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "rgba(109, 76, 5, 0.2)" }}
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" style={{ color: "#6D4C05" }} />
                </a>
              )}
              {contact.social.instagram && (
                <a
                  href={contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "rgba(109, 76, 5, 0.2)" }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" style={{ color: "#6D4C05" }} />
                </a>
              )}
              {contact.social.twitter && (
                <a
                  href={contact.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "rgba(109, 76, 5, 0.2)" }}
                  aria-label="Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" style={{ color: "#6D4C05" }} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Segunda línea: Contacto y Admin */}
        <div
          className="border-t mt-3 pt-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "rgba(109, 76, 5, 0.2)", color: "#CAD0DA" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: "#6D4C05" }} />
              <span>{contact.email}</span>
            </span>
            <span style={{ color: "#6D4C05" }}>•</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: "#6D4C05" }} />
              <span>{contact.phone}</span>
            </span>
            <span style={{ color: "#6D4C05" }}>•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 hover:text-[#6D4C05] transition-colors duration-200"
              style={{ color: "#CAD0DA" }}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} Nortesur Travel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

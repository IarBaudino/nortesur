"use client";

import { useSiteConfig } from "@/lib/hooks/use-site-config";
import { useEffect } from "react";

export function StructuredData() {
  const { config } = useSiteConfig();

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Nortesur Travel",
      description: config.hero?.subtitulo || "Creamos experiencias únicas que recordarás para siempre",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://nortesurtravel.com",
      logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nortesurtravel.com"}/images/nortesurlogo.jpg`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: config.contact?.phone || "",
        contactType: "customer service",
        areaServed: "AR",
        availableLanguage: "Spanish",
      },
      sameAs: [
        config.contact?.social?.facebook,
        config.contact?.social?.instagram,
        config.contact?.social?.twitter,
      ].filter(Boolean),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    script.id = "structured-data-travel-agency";
    
    // Remover script anterior si existe
    const existingScript = document.getElementById("structured-data-travel-agency");
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("structured-data-travel-agency");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [config]);

  return null;
}





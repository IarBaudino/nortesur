"use client";

import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface ContactData {
  email: string;
  phone: string;
  address: string;
  whatsapp: {
    phoneNumber: string;
    defaultMessage: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface HeroData {
  titulo: string;
  subtitulo: string;
  imagenes: string[];
  estadisticas?: {
    paises: number;
    destinos: number;
    aerolineas: number;
    atracciones: number;
  };
}

interface SiteConfig {
  contact: ContactData;
  hero: HeroData;
}

const defaultHeroData: HeroData = {
  titulo: "Descubre el Mundo con Nortesur Travel",
  subtitulo: "Creamos experiencias únicas que recordarás para siempre",
  imagenes: [
    "/images/head1.jpg",
    "/images/head2.jpg",
    "/images/head3.jpeg",
    "/images/head4.jpeg",
  ],
  estadisticas: {
    paises: 50,
    destinos: 200,
    aerolineas: 30,
    atracciones: 500,
  },
};

const defaultContactData: ContactData = {
  email: "nortesurtravelweb@gmail.com",
  phone: "+54 9 3512 39-9267",
  address: "Buenos Aires, Argentina",
  whatsapp: {
    phoneNumber: "5493512399267",
    defaultMessage:
      "¡Hola! Me interesa conocer más sobre sus servicios de viaje.",
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>({
    contact: defaultContactData,
    hero: defaultHeroData,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const configRef = doc(db, "config", "site");
        const configSnap = await getDoc(configRef);

        if (configSnap.exists()) {
          const data = configSnap.data();
          setConfig({
            contact: {
              email: data.contact?.email || defaultContactData.email,
              phone: data.contact?.phone || defaultContactData.phone,
              address: data.contact?.address || defaultContactData.address,
              whatsapp: {
                phoneNumber:
                  data.contact?.whatsapp?.phoneNumber ||
                  defaultContactData.whatsapp.phoneNumber,
                defaultMessage:
                  data.contact?.whatsapp?.defaultMessage ||
                  defaultContactData.whatsapp.defaultMessage,
              },
              social: {
                facebook: data.contact?.social?.facebook || "",
                instagram: data.contact?.social?.instagram || "",
                twitter: data.contact?.social?.twitter || "",
              },
            },
            hero: {
              titulo: data.hero?.titulo || defaultHeroData.titulo,
              subtitulo: data.hero?.subtitulo || defaultHeroData.subtitulo,
              imagenes: data.hero?.imagenes || defaultHeroData.imagenes,
              estadisticas: data.hero?.estadisticas || defaultHeroData.estadisticas,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching site config:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading };
}

export function useContact() {
  const { config, loading } = useSiteConfig();
  return { contactData: config.contact, loading };
}

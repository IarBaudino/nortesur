"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { AboutContent } from "@/lib/firebase/types";

const defaultAbout: AboutContent = {
  acercaDeNosotros: "Agente de viajes con años de experiencia creando experiencias únicas.",
  viajesDiseñados: "",
  mision: "",
  vision: "",
  foto: "/images/agente.jpg",
  diploma: "/images/diploma.jpg",
};

export function useAbout() {
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const aboutRef = doc(db, COLLECTIONS.ABOUT, "content");
        const aboutSnap = await getDoc(aboutRef);

        if (aboutSnap.exists()) {
          const data = aboutSnap.data() as Partial<AboutContent>;
          
          // Manejar migración de misionVision a mision y vision separados
          let mision = data.mision || "";
          let vision = data.vision || "";
          
          if (data.misionVision && !mision && !vision) {
            // Si existe misionVision pero no mision ni vision, separar
            const visionIndex = data.misionVision.indexOf("Visión");
            if (visionIndex !== -1) {
              mision = data.misionVision.substring(0, visionIndex).replace(/^Misión\s*/i, "").trim();
              vision = data.misionVision.substring(visionIndex + "Visión".length).trim();
            } else {
              mision = data.misionVision.replace(/^Misión\s*/i, "").trim();
            }
          }
          
          setAbout({
            ...defaultAbout,
            ...data,
            // Asegurar que los campos nuevos tengan valores por defecto si no existen
            acercaDeNosotros: data.acercaDeNosotros || data.bio || defaultAbout.acercaDeNosotros,
            viajesDiseñados: data.viajesDiseñados || defaultAbout.viajesDiseñados,
            mision: mision || defaultAbout.mision,
            vision: vision || defaultAbout.vision,
          });
        }
      } catch (error) {
        console.error("Error fetching about:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  return { about, loading };
}





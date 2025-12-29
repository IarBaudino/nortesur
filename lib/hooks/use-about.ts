"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { AboutContent } from "@/lib/firebase/types";

const defaultAbout: AboutContent = {
  bio: "Agente de viajes con años de experiencia creando experiencias únicas.",
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
          setAbout(aboutSnap.data() as AboutContent);
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





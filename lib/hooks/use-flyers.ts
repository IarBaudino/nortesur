"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Flyer } from "@/lib/firebase/types";

export function useFlyers() {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usar onSnapshot para escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(
      collection(db, COLLECTIONS.FLYERS),
      (querySnapshot) => {
        const flyersData: Flyer[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const flyer = {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || data.updatedAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as Flyer;
          flyersData.push(flyer);
        });
        // Ordenar por fecha de actualización (más recientes primero)
        flyersData.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        console.log("Flyers actualizados:", flyersData.length, flyersData);
        setFlyers(flyersData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching flyers:", error);
        setLoading(false);
      }
    );

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return { flyers, loading };
}





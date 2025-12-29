"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Testimonio } from "@/lib/firebase/types";

export function useTestimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonios() {
      try {
        const q = query(
          collection(db, COLLECTIONS.TESTIMONIOS),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const testimoniosData: Testimonio[] = [];
        querySnapshot.forEach((doc) => {
          testimoniosData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as Testimonio);
        });
        setTestimonios(testimoniosData);
      } catch (error) {
        console.error("Error fetching testimonios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonios();
  }, []);

  return { testimonios, loading };
}





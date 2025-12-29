"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Flyer } from "@/lib/firebase/types";

export function useFlyers() {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlyers() {
      try {
        const q = query(
          collection(db, COLLECTIONS.FLYERS),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const flyersData: Flyer[] = [];
        querySnapshot.forEach((doc) => {
          flyersData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          } as Flyer);
        });
        setFlyers(flyersData);
      } catch (error) {
        console.error("Error fetching flyers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlyers();
  }, []);

  return { flyers, loading };
}





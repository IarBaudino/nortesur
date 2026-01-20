"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { CategoriaFlyer } from "@/lib/firebase/types";

export function useCategorias() {
  const [categorias, setCategorias] = useState<CategoriaFlyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, COLLECTIONS.CATEGORIAS_FLYERS), orderBy("orden", "asc")),
      (querySnapshot) => {
        const categoriasData: CategoriaFlyer[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const categoria = {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || data.updatedAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as CategoriaFlyer;
          categoriasData.push(categoria);
        });
        setCategorias(categoriasData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching categorias:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { categorias, loading };
}

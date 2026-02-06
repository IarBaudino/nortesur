"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { EmpresaAsociada } from "@/lib/firebase/types";

export function useEmpresas() {
  const [empresas, setEmpresas] = useState<EmpresaAsociada[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        // Intentar con orderBy por si existe índice
        try {
          const q = query(
            collection(db, COLLECTIONS.EMPRESAS),
            orderBy("orden", "asc")
          );
          const querySnapshot = await getDocs(q);
          const empresasData: EmpresaAsociada[] = [];
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            empresasData.push({
              id: docSnap.id,
              ...data,
              createdAt: data.createdAt?.toDate?.() || new Date(),
            } as EmpresaAsociada);
          });
          setEmpresas(empresasData);
          return;
        } catch (orderByError) {
          // Si falla (índice faltante o permisos), intentar sin orderBy y ordenar en memoria
          console.warn(
            "useEmpresas: orden por Firestore falló, usando orden en memoria.",
            orderByError
          );
        }

        const querySnapshot = await getDocs(
          collection(db, COLLECTIONS.EMPRESAS)
        );
        const empresasData: EmpresaAsociada[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          empresasData.push({
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
          } as EmpresaAsociada);
        });
        empresasData.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
        setEmpresas(empresasData);
      } catch (error) {
        console.error(
          "Error fetching empresas (revisa permisos Firestore para la colección 'empresas'):",
          error
        );
        setEmpresas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEmpresas();
  }, []);

  return { empresas, loading };
}

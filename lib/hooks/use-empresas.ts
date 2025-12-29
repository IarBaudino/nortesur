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
        const q = query(
          collection(db, COLLECTIONS.EMPRESAS),
          orderBy("orden", "asc")
        );
        const querySnapshot = await getDocs(q);
        const empresasData: EmpresaAsociada[] = [];
        querySnapshot.forEach((doc) => {
          empresasData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as EmpresaAsociada);
        });
        setEmpresas(empresasData);
      } catch (error) {
        console.error("Error fetching empresas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmpresas();
  }, []);

  return { empresas, loading };
}





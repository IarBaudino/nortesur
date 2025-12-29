"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { FAQ } from "@/lib/firebase/types";

export function useFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQ() {
      try {
        const q = query(
          collection(db, COLLECTIONS.FAQ),
          orderBy("orden", "asc")
        );
        const querySnapshot = await getDocs(q);
        const faqsData: FAQ[] = [];
        querySnapshot.forEach((doc) => {
          faqsData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as FAQ);
        });
        setFaqs(faqsData);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFAQ();
  }, []);

  return { faqs, loading };
}





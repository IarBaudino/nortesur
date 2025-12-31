"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { BlogPost } from "@/lib/firebase/types";

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        // Primero obtener todos los posts y filtrar en el cliente
        // Esto evita la necesidad de un índice compuesto
        const q = query(
          collection(db, COLLECTIONS.BLOG),
          orderBy("fechaPublicacion", "desc")
        );
        const querySnapshot = await getDocs(q);
        const postsData: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Filtrar solo los publicados en el cliente
          if (data.publicado === true) {
            postsData.push({
              id: doc.id,
              ...data,
              fechaPublicacion: data.fechaPublicacion?.toDate() || new Date(),
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            } as BlogPost);
          }
        });
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog:", error);
        // Si falla, intentar sin orderBy
        try {
          const q = query(collection(db, COLLECTIONS.BLOG));
          const querySnapshot = await getDocs(q);
          const postsData: BlogPost[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.publicado === true) {
              postsData.push({
                id: doc.id,
                ...data,
                fechaPublicacion: data.fechaPublicacion?.toDate() || new Date(),
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
              } as BlogPost);
            }
          });
          // Ordenar en el cliente
          postsData.sort((a, b) => 
            b.fechaPublicacion.getTime() - a.fechaPublicacion.getTime()
          );
          setPosts(postsData);
        } catch (fallbackError) {
          console.error("Error en fallback:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, []);

  return { posts, loading };
}





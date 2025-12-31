"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { BlogPost } from "@/lib/firebase/types";

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        // Obtener todos los posts sin ordenar para evitar necesidad de índice compuesto
        // Filtrar y ordenar en el cliente
        const q = query(collection(db, COLLECTIONS.BLOG));
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
        
        // Ordenar por fecha de publicación (más reciente primero) en el cliente
        postsData.sort((a, b) => 
          b.fechaPublicacion.getTime() - a.fechaPublicacion.getTime()
        );
        
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, []);

  return { posts, loading };
}





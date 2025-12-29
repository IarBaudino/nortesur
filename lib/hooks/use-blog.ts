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
        const q = query(
          collection(db, COLLECTIONS.BLOG),
          where("publicado", "==", true),
          orderBy("fechaPublicacion", "desc")
        );
        const querySnapshot = await getDocs(q);
        const postsData: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          postsData.push({
            id: doc.id,
            ...doc.data(),
            fechaPublicacion: doc.data().fechaPublicacion?.toDate() || new Date(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          } as BlogPost);
        });
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





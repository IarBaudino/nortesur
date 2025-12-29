"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { BlogPost } from "@/lib/firebase/types";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        // Intentar buscar por slug primero
        const postsRef = collection(db, COLLECTIONS.BLOG);
        const q = query(postsRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        let postData: BlogPost | null = null;

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          postData = {
            id: doc.id,
            ...doc.data(),
            fechaPublicacion: doc.data().fechaPublicacion?.toDate() || new Date(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          } as BlogPost;
        } else {
          // Si no se encuentra por slug, intentar por ID
          const postRef = doc(db, COLLECTIONS.BLOG, slug);
          const postSnap = await getDoc(postRef);

          if (postSnap.exists()) {
            postData = {
              id: postSnap.id,
              ...postSnap.data(),
              fechaPublicacion: postSnap.data().fechaPublicacion?.toDate() || new Date(),
              createdAt: postSnap.data().createdAt?.toDate() || new Date(),
              updatedAt: postSnap.data().updatedAt?.toDate() || new Date(),
            } as BlogPost;
          }
        }

        if (postData && postData.publicado) {
          setPost(postData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#033671" }} />
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#033671" }}>
              Artículo no encontrado
            </h1>
            <p className="mb-8" style={{ color: "#2E486B" }}>
              El artículo que buscas no existe o no está disponible.
            </p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al blog
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            asChild
            variant="ghost"
            className="mb-8"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Link>
          </Button>

          {post.imagen && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imagen}
                alt={post.titulo}
                fill
                className="object-cover"
              />
            </div>
          )}

          <article>
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#033671" }}>
              {post.titulo}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: "#2E486B" }}>
              <span>Por {post.autor}</span>
              <span>•</span>
              <span>
                {new Date(post.fechaPublicacion).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div
              className="prose prose-lg max-w-none"
              style={{ color: "#2E486B" }}
              dangerouslySetInnerHTML={{ __html: post.contenido }}
            />
          </article>
        </div>
      </div>
    </main>
  );
}


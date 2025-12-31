import type { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    // Intentar buscar por slug primero
    const postsRef = doc(db, COLLECTIONS.BLOG, slug);
    const postSnap = await getDoc(postsRef);
    
    let postData: any = null;
    
    if (postSnap.exists()) {
      postData = postSnap.data();
    } else {
      // Si no se encuentra, buscar en la colección por slug
      const { collection, query, where, getDocs } = await import("firebase/firestore");
      const q = query(collection(db, COLLECTIONS.BLOG), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        postData = querySnapshot.docs[0].data();
      }
    }
    
    if (postData && postData.publicado) {
      const title = postData.titulo || "Artículo del Blog";
      const description = postData.resumen || postData.contenido?.substring(0, 160) || "Descubre este artículo en nuestro blog de viajes";
      const image = postData.imagen || "/images/og-image.jpg";
      
      return {
        title: title,
        description: description,
        openGraph: {
          title: title,
          description: description,
          url: `/blog/${slug}`,
          type: "article",
          publishedTime: postData.fechaPublicacion?.toDate?.()?.toISOString(),
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: title,
          description: description,
          images: [image],
        },
        alternates: {
          canonical: `/blog/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  // Metadata por defecto si no se encuentra el post
  return {
    title: "Artículo no encontrado",
    description: "El artículo que buscas no está disponible.",
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


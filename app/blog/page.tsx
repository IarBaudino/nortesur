"use client";

import Link from "next/link";
import Image from "next/image";
import { useBlog } from "@/lib/hooks/use-blog";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function BlogPage() {
  const { posts, loading } = useBlog();

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

  return (
    <main className="min-h-screen py-20" style={{ backgroundColor: "#D9DEE4" }}>
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#033671" }}>
            Blog
          </h1>
          <p className="text-lg" style={{ color: "#2E486B" }}>
            Descubre nuestros artículos y consejos de viaje
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {post.imagen && (
                  <div className="relative h-72">
                    <Image
                      src={post.imagen}
                      alt={post.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#033671" }}>
                    {post.titulo}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "#2E486B" }}>
                    {post.resumen}
                  </p>
                  <Link
                    href={`/blog/${post.slug || post.id}`}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#6D4C05" }}
                  >
                    Leer más →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: "#2E486B" }}>
              No hay artículos disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}





import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/config";

// Configuración para App Router
export const runtime = "nodejs";
export const maxDuration = 30;

// Límite de tamaño: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB en bytes

export async function POST(request: NextRequest) {
  try {
    // Verificar que Cloudinary esté configurado
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Cloudinary no está configurado correctamente");
      return NextResponse.json(
        { error: "Error de configuración: Cloudinary no está configurado. Verifica las variables de entorno." },
        { status: 500 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error("Error parseando FormData:", error);
      return NextResponse.json(
        { error: "Error al procesar el archivo. Verifica que el archivo no sea demasiado grande." },
        { status: 400 }
      );
    }

    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Validar tamaño del archivo
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `El archivo es demasiado grande. Tamaño máximo: 10MB. Tu archivo: ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 413 }
      );
    }

    // Convertir File a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convertir Buffer a base64
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Subir a Cloudinary
    interface CloudinaryResult {
      secure_url: string;
      public_id: string;
    }

    const uploadOptions = {
      resource_type: "auto" as const, // Detecta automáticamente si es imagen, video, etc.
      folder: folder || "nortesur", // Carpeta en Cloudinary
    };

    const result = await new Promise<CloudinaryResult>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        uploadOptions,
        (error: unknown, result: CloudinaryResult | undefined) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error("No result from Cloudinary"));
        }
      );
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: unknown) {
    console.error("Error uploading to Cloudinary:", error);
    const errorMessage = error instanceof Error ? error.message : "Error al subir la imagen";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}




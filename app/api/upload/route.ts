import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/config";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
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




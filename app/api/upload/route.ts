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
    const uploadOptions: any = {
      resource_type: "auto", // Detecta automáticamente si es imagen, video, etc.
      folder: folder || "nortesur", // Carpeta en Cloudinary
    };

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        uploadOptions,
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json({
      success: true,
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
    });
  } catch (error: any) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: error.message || "Error al subir la imagen" },
      { status: 500 }
    );
  }
}




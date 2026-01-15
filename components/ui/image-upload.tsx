"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  required?: boolean;
  previewClassName?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "nortesur",
  label = "Imagen",
  required = false,
  previewClassName = "mt-2 w-full h-48 object-cover rounded",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen");
      return;
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen no debe superar los 10MB");
      return;
    }

    // Preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Subir a Cloudinary
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      let response: Response;
      try {
        response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
      } catch (fetchError: unknown) {
        // Error de red o conexión
        console.error("Error de red al subir imagen:", fetchError);
        const isNetworkError = fetchError instanceof TypeError && fetchError.message.includes("fetch");
        throw new Error(
          isNetworkError
            ? "Error de conexión. Verifica que el servidor esté corriendo y que tengas conexión a internet."
            : `Error al conectar con el servidor: ${fetchError instanceof Error ? fetchError.message : "Error desconocido"}`
        );
      }

      // Verificar el tipo de contenido de la respuesta
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonError) {
          // Si falla el parseo JSON, leer como texto
          const text = await response.text();
          console.error("Error parseando JSON. Respuesta del servidor:", text);
          throw new Error(
            response.status === 413
              ? "El archivo es demasiado grande. Por favor, reduce el tamaño de la imagen (máximo 10MB)."
              : `Error del servidor (${response.status}): ${text.substring(0, 200)}`
          );
        }
      } else {
        // Si no es JSON, leer como texto para ver el error
        const text = await response.text();
        console.error("Respuesta no-JSON del servidor:", text);
        throw new Error(
          response.status === 413
            ? "El archivo es demasiado grande. Por favor, reduce el tamaño de la imagen (máximo 10MB)."
            : `Error del servidor: ${response.status} ${response.statusText}. ${text.substring(0, 200)}`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || `Error al subir la imagen: ${response.status} ${response.statusText}`);
      }

      onChange(data.url);
      setPreview(data.url);
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      let errorMessage = "Error al subir la imagen";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      
      alert(errorMessage);
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label} {required && <span className="text-red-500">*</span>}</Label>
      <div className="flex gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              {preview ? "Cambiar Imagen" : "Subir Imagen"}
            </>
          )}
        </Button>
        {preview && (
          <Button
            type="button"
            variant="outline"
            onClick={handleRemove}
            disabled={uploading}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
            Eliminar
          </Button>
        )}
      </div>
      
      {/* Campo de URL manual (opcional) */}
      <div className="flex gap-2">
        <Input
          type="url"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
          }}
          placeholder="O ingresa una URL de imagen"
          disabled={uploading}
          className="flex-1"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className={previewClassName}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
        </div>
      )}

      {!preview && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Haz clic en &quot;Subir Imagen&quot; o ingresa una URL
          </p>
        </div>
      )}
    </div>
  );
}




"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message,
  variant = "default",
  size = "default",
  className = "",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const url = getWhatsAppUrl(phoneNumber, message);
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`hover:opacity-90 transition-opacity ${className}`}
      style={
        variant === "default"
          ? { backgroundColor: "#25D366", color: "#ffffff" }
          : undefined
      }
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Contactate con un asesor
    </Button>
  );
}





"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppFloatProps {
  phoneNumber: string;
  message: string;
}

export function WhatsAppFloat({ phoneNumber, message }: WhatsAppFloatProps) {
  const handleClick = () => {
    const url = getWhatsAppUrl(phoneNumber, message);
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:block text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        WhatsApp
      </span>
    </button>
  );
}





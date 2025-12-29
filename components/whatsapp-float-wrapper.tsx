"use client";

import { WhatsAppFloat } from "@/components/whatsapp-float";
import { useContact } from "@/lib/hooks/use-site-config";

export function WhatsAppFloatWrapper() {
  const { contactData, loading } = useContact();

  if (loading) return null;

  return (
    <WhatsAppFloat
      phoneNumber={contactData.whatsapp.phoneNumber}
      message={contactData.whatsapp.defaultMessage}
    />
  );
}





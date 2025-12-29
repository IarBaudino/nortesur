/**
 * Utilidades para generar URLs y mensajes de WhatsApp
 */

export interface ConsultaFormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  destino?: string;
  fechaViaje?: string;
  cantidadPersonas?: string;
  mensaje: string;
}

/**
 * Genera un mensaje formateado para WhatsApp a partir de los datos del formulario
 */
export function generateWhatsAppMessage(data: ConsultaFormData): string {
  const tipoConsultaMap: Record<string, string> = {
    paquete: "Paquete turístico",
    vuelo: "Vuelos",
    hotel: "Hoteles",
    auto: "Alquiler de autos",
    actividad: "Actividades",
    otro: "Otro",
  };

  let mensaje = `¡Hola! Me interesa realizar una consulta:\n\n`;
  mensaje += `*Nombre:* ${data.nombre}\n`;
  mensaje += `*Email:* ${data.email}\n`;
  mensaje += `*Teléfono:* ${data.telefono}\n`;
  mensaje += `*Tipo de consulta:* ${tipoConsultaMap[data.tipoConsulta] || data.tipoConsulta}\n`;

  if (data.destino) {
    mensaje += `*Destino:* ${data.destino}\n`;
  }

  if (data.fechaViaje) {
    mensaje += `*Fecha de viaje:* ${data.fechaViaje}\n`;
  }

  if (data.cantidadPersonas) {
    mensaje += `*Cantidad de personas:* ${data.cantidadPersonas}\n`;
  }

  mensaje += `\n*Mensaje:*\n${data.mensaje}`;

  return mensaje;
}

/**
 * Genera una URL de WhatsApp con el número de teléfono y mensaje
 * @param phoneNumber - Número de teléfono en formato internacional (ej: "5491112345678")
 * @param message - Mensaje a enviar
 * @returns URL de WhatsApp
 */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  // Limpiar el número de teléfono (remover espacios, guiones, paréntesis, etc.)
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, "");

  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);

  // Generar URL de WhatsApp
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}





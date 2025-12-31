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
  console.log("generateWhatsAppMessage - datos recibidos:", data);
  
  const tipoConsultaMap: Record<string, string> = {
    paquete: "Paquete turístico",
    vuelo: "Vuelos",
    hotel: "Hoteles",
    auto: "Alquiler de autos",
    actividad: "Actividades",
    otro: "Otro",
  };

  // Construir el mensaje paso a paso
  let mensaje = "¡Hola! Me interesa realizar una consulta:\n\n";
  
  // Nombre (siempre presente)
  const nombre = data.nombre?.trim() || "No especificado";
  mensaje += `*Nombre:* ${nombre}\n`;
  console.log("Agregado nombre:", nombre);
  
  // Email (siempre presente)
  const email = data.email?.trim() || "No especificado";
  mensaje += `*Email:* ${email}\n`;
  console.log("Agregado email:", email);
  
  // Teléfono (siempre presente)
  const telefono = data.telefono?.trim() || "No especificado";
  mensaje += `*Teléfono:* ${telefono}\n`;
  console.log("Agregado telefono:", telefono);
  
  // Tipo de consulta (siempre presente)
  const tipoConsulta = tipoConsultaMap[data.tipoConsulta] || data.tipoConsulta || "No especificado";
  mensaje += `*Tipo de consulta:* ${tipoConsulta}\n`;
  console.log("Agregado tipoConsulta:", tipoConsulta);

  // Destino (opcional)
  if (data.destino && data.destino.trim() !== "") {
    mensaje += `*Destino:* ${data.destino.trim()}\n`;
    console.log("Agregado destino:", data.destino);
  }

  // Fecha de viaje (opcional)
  if (data.fechaViaje && data.fechaViaje.trim() !== "") {
    try {
      const fecha = new Date(data.fechaViaje);
      const fechaFormateada = fecha.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      mensaje += `*Fecha de viaje:* ${fechaFormateada}\n`;
      console.log("Agregado fechaViaje:", fechaFormateada);
    } catch (e) {
      mensaje += `*Fecha de viaje:* ${data.fechaViaje}\n`;
      console.log("Agregado fechaViaje (sin formatear):", data.fechaViaje);
    }
  }

  // Cantidad de personas (opcional)
  if (data.cantidadPersonas && data.cantidadPersonas.trim() !== "") {
    mensaje += `*Cantidad de personas:* ${data.cantidadPersonas.trim()}\n`;
    console.log("Agregado cantidadPersonas:", data.cantidadPersonas);
  }

  // Mensaje (siempre presente)
  if (data.mensaje && data.mensaje.trim() !== "") {
    mensaje += `\n*Mensaje:*\n${data.mensaje.trim()}`;
    console.log("Agregado mensaje:", data.mensaje);
  }

  console.log("Mensaje final generado:", mensaje);
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

  // Codificar el mensaje para URL usando encodeURIComponent
  // Esto debería manejar correctamente los emojis Unicode
  let encodedMessage = encodeURIComponent(message);
  
  // WhatsApp tiene un límite de ~2000 caracteres en la URL
  // Si excede, truncamos el mensaje
  const MAX_URL_LENGTH = 2000;
  
  if (encodedMessage.length > MAX_URL_LENGTH) {
    // Truncar y agregar indicador
    encodedMessage = encodedMessage.substring(0, MAX_URL_LENGTH - 50) + encodeURIComponent("\n\n[Mensaje truncado]");
  }

  // Generar URL de WhatsApp
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}





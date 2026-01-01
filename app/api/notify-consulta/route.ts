import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const consulta = await request.json();

    // Verificar qué servicio de email está configurado
    const useResend = !!process.env.RESEND_API_KEY;
    const useGmail = !!process.env.EMAIL_USER && !!process.env.EMAIL_PASSWORD;

    if (!useResend && !useGmail) {
      console.log("Email no configurado, saltando notificación");
      return NextResponse.json({ 
        success: true, 
        message: "Consulta guardada, pero email no configurado" 
      });
    }

    // Mapeo de tipos de consulta
    const tipoConsultaMap: Record<string, string> = {
      paquete: "Paquete turístico",
      vuelo: "Vuelos",
      hotel: "Hoteles",
      auto: "Alquiler de autos",
      actividad: "Actividades",
      otro: "Otro",
    };

    // Formatear fecha de viaje si existe
    let fechaViajeFormateada = "No especificada";
    if (consulta.fechaViaje && consulta.fechaViaje.trim() !== "") {
      try {
        const fecha = new Date(consulta.fechaViaje);
        fechaViajeFormateada = fecha.toLocaleDateString("es-AR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        fechaViajeFormateada = consulta.fechaViaje;
      }
    }

    // Construir el cuerpo del email (texto plano)
    const emailBody = `
Nueva consulta recibida desde el sitio web de Nortesur Travel

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre: ${consulta.nombre}
Email: ${consulta.email}
Teléfono: ${consulta.telefono}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DETALLES DE LA CONSULTA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tipo de consulta: ${tipoConsultaMap[consulta.tipoConsulta] || consulta.tipoConsulta}
Destino: ${consulta.destino || "No especificado"}
Fecha de viaje: ${fechaViajeFormateada}
Cantidad de personas: ${consulta.cantidadPersonas || "No especificada"}
Ciudad de salida: ${consulta.ciudadSalida || "No especificada"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${consulta.mensaje}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fecha y hora: ${new Date().toLocaleString("es-AR")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Puedes responder directamente a este email o contactar al cliente por WhatsApp.
    `.trim();

    // Construir versión HTML del email (más bonita)
    const emailBodyHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #033671; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
    .section { margin-bottom: 20px; }
    .label { font-weight: bold; color: #033671; }
    .divider { border-top: 2px solid #6D4C05; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nueva Consulta - Nortesur Travel</h1>
    </div>
    <div class="content">
      <div class="section">
        <h2>Datos del Cliente</h2>
        <p><span class="label">Nombre:</span> ${consulta.nombre}</p>
        <p><span class="label">Email:</span> ${consulta.email}</p>
        <p><span class="label">Teléfono:</span> ${consulta.telefono}</p>
      </div>
      <div class="divider"></div>
      <div class="section">
        <h2>Detalles de la Consulta</h2>
        <p><span class="label">Tipo de consulta:</span> ${tipoConsultaMap[consulta.tipoConsulta] || consulta.tipoConsulta}</p>
        <p><span class="label">Destino:</span> ${consulta.destino || "No especificado"}</p>
        <p><span class="label">Fecha de viaje:</span> ${fechaViajeFormateada}</p>
        <p><span class="label">Cantidad de personas:</span> ${consulta.cantidadPersonas || "No especificada"}</p>
        <p><span class="label">Ciudad de salida:</span> ${consulta.ciudadSalida || "No especificada"}</p>
      </div>
      <div class="divider"></div>
      <div class="section">
        <h2>Mensaje</h2>
        <p>${consulta.mensaje.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="divider"></div>
      <p style="color: #666; font-size: 12px;">Fecha y hora: ${new Date().toLocaleString("es-AR")}</p>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">Puedes responder directamente a este email o contactar al cliente por WhatsApp.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Enviar email usando Resend o Gmail
    if (useResend) {
      // Usar Resend (más fácil) - formato similar al ejemplo de Resend
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const toEmail = process.env.RESEND_TO_EMAIL || process.env.EMAIL_TO || "";
      
      const result =       // Enviar email con Resend (formato similar al ejemplo oficial)
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: consulta.email,
        subject: `Nueva Consulta: ${consulta.nombre} - ${tipoConsultaMap[consulta.tipoConsulta] || consulta.tipoConsulta}`,
        text: emailBody,
        html: emailBodyHTML,
      });
      
      console.log("✅ Email enviado con Resend:", result);
    } else if (useGmail) {
      // Usar Gmail con Nodemailer (fallback)
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Nortesur Travel" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `Nueva Consulta: ${consulta.nombre} - ${tipoConsultaMap[consulta.tipoConsulta] || consulta.tipoConsulta}`,
        text: emailBody,
        replyTo: consulta.email,
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Notificación enviada correctamente" 
    });
  } catch (error: unknown) {
    console.error("Error enviando notificación:", error);
    const errorMessage = error instanceof Error ? error.message : "Error al enviar notificación";
    // No fallar si el email no se puede enviar, la consulta ya está guardada
    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      message: "Consulta guardada, pero no se pudo enviar la notificación" 
    }, { status: 500 });
  }
}


# 📧 Configuración de Email

Este documento explica cómo configurar el envío de emails para las consultas del formulario.

> ⚠️ **¿No puedes usar contraseñas de aplicación de Gmail?** 
> Ve a [EMAIL_SETUP_ALTERNATIVO.md](./EMAIL_SETUP_ALTERNATIVO.md) para opciones más fáciles como Resend o SendGrid.

## 🔧 Configuración de Gmail

Para que el sistema pueda enviar emails, necesitas crear una **"Contraseña de aplicación"** en tu cuenta de Gmail.

### Paso 1: Habilitar verificación en 2 pasos

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Ve a **Seguridad** → **Verificación en 2 pasos**
3. Activa la verificación en 2 pasos si no está activada

### Paso 2: Crear contraseña de aplicación

1. Ve a: https://myaccount.google.com/apppasswords
2. Si no aparece directamente, ve a **Seguridad** → **Verificación en 2 pasos** → **Contraseñas de aplicaciones**
3. Selecciona:
   - **Aplicación**: Correo
   - **Dispositivo**: Otro (nombre personalizado)
   - **Nombre**: "Nortesur Travel"
4. Haz clic en **Generar**
5. **Copia la contraseña generada** (16 caracteres sin espacios)
   - Ejemplo: `abcd efgh ijkl mnop` → usa `abcdefghijklmnop`

### Paso 3: Configurar variables de entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Agrega las siguientes variables:

```env
# Email Configuration
EMAIL_USER=nortesurtravelweb@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
EMAIL_TO=nortesurtravelweb@gmail.com
```

**Importante:**
- `EMAIL_USER`: El email desde el cual se enviarán los correos (debe ser el mismo de Gmail)
- `EMAIL_PASSWORD`: La contraseña de aplicación que generaste (16 caracteres, sin espacios)
- `EMAIL_TO`: El email donde recibirás las consultas

### Paso 4: Reiniciar el servidor

Después de agregar las variables de entorno, reinicia el servidor de desarrollo:

```bash
# Detén el servidor (Ctrl + C) y luego:
npm run dev
```

## ✅ Verificación

1. Completa el formulario de consulta en: http://localhost:3000/#consulta
2. Envía el formulario
3. **Automáticamente recibirás un email** en `EMAIL_TO` con todos los datos de la consulta
4. La consulta también se guarda en el panel de administración

## 📧 Notificaciones Automáticas

Una vez configurado el email, **cada vez que un cliente envíe una consulta desde el formulario**, recibirás automáticamente un email con:

- Nombre, email y teléfono del cliente
- Tipo de consulta
- Destino, fecha de viaje, cantidad de personas
- Mensaje completo
- Fecha y hora de la consulta

**Ventaja:** Puedes responder directamente al email (Reply) y tu respuesta llegará al email del cliente.

## 🔍 Solución de Problemas

### Error: "Invalid login"

- Verifica que `EMAIL_USER` sea exactamente `nortesurtravelweb@gmail.com`
- Verifica que `EMAIL_PASSWORD` sea la contraseña de aplicación (16 caracteres, sin espacios)
- Asegúrate de que la verificación en 2 pasos esté activada

### Error: "Connection timeout"

- Verifica tu conexión a internet
- Algunos proveedores bloquean el puerto SMTP (587), prueba desde otra red

### No recibo emails

- Revisa la carpeta de spam
- Verifica que `EMAIL_TO` sea correcto
- Revisa los logs del servidor para ver errores específicos

## 📱 WhatsApp

El número de WhatsApp está configurado como: **+54 9 3512 39-9267** (5493512399267)

Este número se usa automáticamente cuando se envía una consulta desde el formulario.


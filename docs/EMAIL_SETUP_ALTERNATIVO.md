# 📧 Configuración de Email - Alternativa (Resend)

Si no puedes usar contraseñas de aplicación de Gmail, puedes usar **Resend**, un servicio de email más fácil de configurar.

## 🚀 Opción 1: Usar Resend (Recomendado - Más Fácil) ✅ IMPLEMENTADO

**¡Buenas noticias!** El código ya está configurado para usar Resend. Solo necesitas configurarlo.

### Paso 1: Crear cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Haz clic en **"Sign Up"** o **"Get Started"**
3. Crea una cuenta gratuita (100 emails/día gratis, suficiente para empezar)
4. Verifica tu email

### Paso 2: Obtener API Key

1. Una vez dentro de Resend, en el menú lateral ve a **"API Keys"**
2. Haz clic en el botón **"Create API Key"**
3. Dale un nombre descriptivo (ej: "Nortesur Travel")
4. Selecciona permisos **"Full Access"** (o solo "Sending Access" si prefieres)
5. Haz clic en **"Add"**
6. **¡IMPORTANTE!** Copia la API Key inmediatamente (empieza con `re_`)
   - Ejemplo: `re_AbCdEfGhIjKlMnOpQrStUvWxYz123456`
   - ⚠️ Solo se muestra una vez, guárdala bien

### Paso 3: Verificar dominio (Opcional pero recomendado)

**Para producción (recomendado):**
1. Ve a **"Domains"** en Resend
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: `nortesurtravel.com`)
4. Sigue las instrucciones para agregar los registros DNS
5. Una vez verificado, podrás usar `noreply@nortesurtravel.com`

**Para pruebas (rápido):**
- Puedes usar `onboarding@resend.dev` sin verificar dominio
- Funciona perfectamente para pruebas

### Paso 4: Configurar variables de entorno

Abre tu archivo `.env.local` y agrega:

```env
# Resend Configuration (Recomendado)
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=onboarding@resend.dev
# O si verificaste dominio: noreply@tudominio.com
RESEND_TO_EMAIL=tu_email@ejemplo.com
```

**Ejemplo completo:**
```env
RESEND_API_KEY=re_AbCdEfGhIjKlMnOpQrStUvWxYz123456
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=nortesurtravelweb@gmail.com
```

### Paso 5: Reiniciar el servidor

```bash
# Detén el servidor (Ctrl + C) y luego:
npm run dev
```

### ✅ Verificación

1. Completa el formulario de consulta en tu sitio
2. Envía el formulario
3. Deberías recibir un email en `RESEND_TO_EMAIL` con todos los datos de la consulta

> 💡 **Ventaja:** Resend es mucho más fácil que Gmail, no requiere contraseñas de aplicación ni verificación en 2 pasos.

---

## 📧 Opción 2: Usar SendGrid

### Paso 1: Crear cuenta

1. Ve a [https://sendgrid.com](https://sendgrid.com)
2. Crea una cuenta gratuita (100 emails/día gratis)
3. Verifica tu email

### Paso 2: Crear API Key

1. Ve a **Settings** → **API Keys**
2. Haz clic en **"Create API Key"**
3. Dale un nombre y permisos "Full Access"
4. **Copia la API Key**

### Paso 3: Configurar variables

```env
SENDGRID_API_KEY=SG.tu_api_key_aqui
SENDGRID_FROM_EMAIL=noreply@tudominio.com
SENDGRID_TO_EMAIL=tu_email@ejemplo.com
```

---

## 🔧 Opción 3: Solución Temporal - Solo Panel Admin

Si prefieres no configurar email por ahora:

- Las consultas se seguirán guardando en Firebase
- Puedes verlas en el panel de administración
- Solo necesitas revisar el panel periódicamente
- No recibirás notificaciones automáticas

---

## ✅ ¿Cuál opción elegir?

- **Resend:** Más fácil, moderno, buena documentación
- **SendGrid:** Más establecido, más opciones avanzadas
- **Solo Panel:** Si no necesitas notificaciones inmediatas

---

## 📝 Nota Importante

Una vez que elijas una opción, necesitarás que el desarrollador actualice el código para usar ese servicio. El código actual está configurado para Gmail con Nodemailer.


# 🚀 Guía de Deploy en Vercel - Nortesur Travel

Esta guía te ayudará a desplegar tu sitio web de Nortesur Travel en Vercel.

---

## 📋 Checklist Pre-Deploy

Antes de hacer el deploy, asegúrate de:

- [ ] Tener una cuenta de Vercel (gratis)
- [ ] Tener tu código en GitHub (recomendado) o GitLab/Bitbucket
- [ ] Tener todas las variables de entorno listas
- [ ] Haber probado el sitio localmente (`npm run build` debe funcionar)

---

## 🔧 Paso 1: Preparar el Repositorio

1. **Asegúrate de que todo esté commiteado:**
   ```bash
   git add .
   git commit -m "Preparar para deploy"
   git push
   ```

2. **Verifica que el build funcione:**
   ```bash
   npm run build
   ```
   Si hay errores, corrígelos antes de continuar.

---

## 🌐 Paso 2: Conectar con Vercel

1. **Ve a [vercel.com](https://vercel.com)**
2. **Inicia sesión** con GitHub (recomendado) o crea una cuenta
3. **Haz clic en "Add New Project"** o **"Import Project"**
4. **Selecciona tu repositorio** de GitHub
5. **Vercel detectará automáticamente** que es un proyecto Next.js

---

## ⚙️ Paso 3: Configurar Variables de Entorno

**IMPORTANTE:** Debes agregar todas las variables de entorno en Vercel antes de hacer el deploy.

### En la pantalla de configuración del proyecto:

1. **Expande "Environment Variables"**
2. **Agrega cada variable** una por una:

#### Firebase (Obligatorio)
```
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

#### Cloudinary (Obligatorio si usas upload de imágenes)
```
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

#### Resend (Opcional - para notificaciones por email)
```
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=tu_email@ejemplo.com
```

#### Gmail (Opcional - alternativa a Resend)
```
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_aplicacion
EMAIL_TO=tu_email@ejemplo.com
```

#### Site URL (Recomendado para SEO)
```
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

> ⚠️ **Importante:** 
> - NO uses `NEXT_PUBLIC_` para variables secretas (como `CLOUDINARY_API_SECRET`, `RESEND_API_KEY`, `EMAIL_PASSWORD`)
> - Solo usa `NEXT_PUBLIC_` para variables que se exponen al cliente (como Firebase config)
> - Para producción, selecciona "Production" en el dropdown al agregar cada variable

---

## 🚀 Paso 4: Deploy

1. **Revisa la configuración:**
   - Framework Preset: **Next.js** (debería detectarse automáticamente)
   - Root Directory: **./** (raíz del proyecto)
   - Build Command: **npm run build** (por defecto)
   - Output Directory: **.next** (por defecto)

2. **Haz clic en "Deploy"**

3. **Espera a que termine el build** (2-5 minutos)

4. **¡Listo!** Tu sitio estará disponible en una URL como: `https://nortesur-travel.vercel.app`

---

## 🔗 Paso 5: Configurar Dominio Personalizado (Opcional)

1. En el dashboard de Vercel, ve a tu proyecto
2. Ve a **Settings** → **Domains**
3. Agrega tu dominio (ej: `nortesurtravel.com`)
4. Sigue las instrucciones para configurar los DNS
5. Vercel te dará los registros DNS que necesitas agregar en tu proveedor de dominio

---

## ✅ Paso 6: Verificar que Todo Funcione

Después del deploy, verifica:

- [ ] El sitio carga correctamente
- [ ] Puedes iniciar sesión en `/admin`
- [ ] El formulario de consulta funciona
- [ ] Las imágenes se cargan correctamente
- [ ] El panel de administración funciona
- [ ] Las notificaciones por email funcionan (si las configuraste)

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push` a la rama principal:

1. Vercel detectará automáticamente los cambios
2. Creará un nuevo deploy
3. Te notificará cuando esté listo
4. Puedes ver el historial de deploys en el dashboard

---

## 🐛 Solución de Problemas Comunes

### Error: "Environment variables not found"

- Verifica que hayas agregado todas las variables en Vercel
- Asegúrate de seleccionar "Production" para las variables de producción
- Reinicia el deploy después de agregar variables

### Error: "Build failed"

- Revisa los logs del build en Vercel
- Verifica que `npm run build` funcione localmente
- Asegúrate de que todas las dependencias estén en `package.json`

### Las imágenes no se cargan

- Verifica que Cloudinary esté configurado correctamente
- Revisa que las variables de Cloudinary estén en Vercel
- Verifica que las imágenes estén subidas a Cloudinary

### El admin no funciona

- Verifica que las variables de Firebase estén configuradas
- Asegúrate de que el usuario admin exista en Firebase Authentication
- Revisa las reglas de seguridad de Firestore

### No recibo emails de notificaciones

- Verifica que Resend o Gmail estén configurados
- Revisa los logs de Vercel para ver errores
- Asegúrate de que las variables de email estén en Vercel

---

## 📞 Soporte

Si tienes problemas durante el deploy:

1. Revisa los logs en Vercel (muy útiles para debugging)
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que el build funcione localmente primero
4. Contacta al desarrollador si el problema persiste

---

## 🎉 ¡Éxito!

Una vez que el deploy esté completo, tu sitio estará en vivo y accesible desde cualquier lugar del mundo.

**URL de ejemplo:** `https://nortesur-travel.vercel.app`

¡Felicidades por tu nuevo sitio web! 🌍✈️








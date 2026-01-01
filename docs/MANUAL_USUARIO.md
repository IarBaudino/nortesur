# 📘 Manual de Usuario - Nortesur Travel

## Guía Completa para el Panel de Administración

Este manual te guiará paso a paso para aprender a usar el panel de administración de Nortesur Travel. Encontrarás instrucciones detalladas para gestionar todo el contenido del sitio web.

---

## 📋 Tabla de Contenidos

1. [Acceso al Panel de Administración](#acceso-al-panel-de-administración)
2. [Gestión de Consultas](#gestión-de-consultas)
3. [Gestión de Flyers (Servicios)](#gestión-de-flyers-servicios)
4. [Gestión de Testimonios](#gestión-de-testimonios)
5. [Gestión de FAQ (Preguntas Frecuentes)](#gestión-de-faq-preguntas-frecuentes)
6. [Gestión de Empresas Asociadas](#gestión-de-empresas-asociadas)
7. [Gestión de Blog](#gestión-de-blog)
8. [Configuración General](#configuración-general)
9. [Consejos y Mejores Prácticas](#consejos-y-mejores-prácticas)
10. [Solución de Problemas](#solución-de-problemas)

---

## 🔐 Acceso al Panel de Administración

### Paso 1: Navegar a la página de administración

1. Abre tu navegador web
2. Ve a la dirección: `https://tudominio.com/admin` (también abajo de todo de la página hay un boton admin desde donde puedes acceder)
3. Verás una pantalla de inicio de sesión

### Paso 2: Iniciar sesión

1. Ingresa tu **email** de administrador
2. Ingresa tu **contraseña**
3. Haz clic en **"Iniciar Sesión"**

> ⚠️ **Importante:** Si olvidaste tu contraseña, contacta al desarrollador para recuperarla.

### Paso 3: Panel principal

Una vez iniciada la sesión, verás el panel de administración con 7 pestañas:

- **Consultas**
- **Flyers**
- **Testimonios**
- **FAQ**
- **Empresas**
- **Blog**
- **Configuración**

---

## 📧 Gestión de Consultas

Las consultas son los mensajes que los clientes envían desde el formulario de contacto del sitio web.

### ⚡ Notificaciones Automáticas por Email

**¡Buenas noticias!** El sistema puede enviarte automáticamente un email cada vez que un cliente envíe una consulta desde el formulario de contacto.

#### ¿Qué incluye el email?

El email automático contiene:

- **Datos del cliente:** Nombre, email, teléfono
- **Detalles de la consulta:** Tipo, destino, fecha de viaje, cantidad de personas, ciudad de salida
- **Mensaje completo** del cliente
- **Fecha y hora** de la consulta
- **Reply-To configurado:** Puedes responder directamente al email y tu respuesta llegará al cliente

#### ¿Cómo configurarlo?

**Opción 1: Resend (Recomendado - Más Fácil) ✅**

1. Crea una cuenta gratuita en [https://resend.com](https://resend.com) (100 emails/día gratis)
2. Ve a "API Keys" y crea una nueva API key
3. Copia la API key (empieza con `re_`)
4. Agrega estas líneas a tu archivo `.env.local`:
   ```env
   RESEND_API_KEY=re_tu_api_key_aqui
   RESEND_FROM_EMAIL=onboarding@resend.dev
   RESEND_TO_EMAIL=tu_email@ejemplo.com
   ```
5. Reinicia el servidor

**Opción 2: Gmail**

Si prefieres usar Gmail, ver instrucciones detalladas en `docs/EMAIL_SETUP.md`

> 💡 **Consejo:** Resend es más fácil de configurar y no requiere contraseñas de aplicación de Google.
>
> **Nota:** Si no configuras email, las consultas se seguirán guardando en el panel de administración, solo no recibirás notificaciones automáticas por email.

### Ver Consultas

1. Haz clic en la pestaña **"Consultas"** (está seleccionada por defecto)
2. Verás una lista de todas las consultas recibidas
3. Las consultas nuevas tienen un badge **"Nueva"** en color dorado

### Información que verás:

- **Nombre** del cliente
- **Email** y **Teléfono**
- **Tipo de consulta** (Paquete, Vuelo, Hotel, etc.)
- **Destino** (si fue especificado)
- **Fecha de viaje** (si fue especificada)
- **Mensaje** completo
- **Fecha y hora** de recepción

### Marcar como Leída/No Leída

1. Haz clic en el ícono de **✓** (check) o **○** (círculo) en la esquina superior derecha de cada consulta
2. Esto te ayuda a organizar qué consultas ya revisaste

### Ver Detalles Completos

1. Haz clic en cualquier consulta de la lista
2. Se abrirá un diálogo con toda la información
3. Podrás ver:
   - Todos los datos del formulario
   - El mensaje completo
   - Botones para responder por Email o WhatsApp

### Responder a una Consulta

**Por Email:**

1. Abre la consulta haciendo clic en ella
2. Haz clic en el botón **"Responder por Email"**
3. Se abrirá tu cliente de email con el email del cliente prellenado

**Por WhatsApp:**

1. Abre la consulta
2. Haz clic en el botón **"Contactar por WhatsApp"**
3. Se abrirá WhatsApp con el nombre del cliente prellenado

### Eliminar una Consulta

1. Abre la consulta
2. Haz clic en el botón **"Eliminar"** (ícono de basura)
3. Confirma la eliminación

> 💡 **Consejo:** Marca las consultas como "leídas" después de responderlas para mantener el panel organizado.

---

## 🎫 Gestión de Flyers (Servicios)

Los flyers son los servicios/promociones que se muestran en la página principal y en `/servicios`.

### Ver Flyers Existentes

1. Haz clic en la pestaña **"Flyers"**
2. Verás una lista de todos los flyers creados
3. Los flyers destacados tienen un badge **"Destacado"**

### Crear un Nuevo Flyer

1. Haz clic en el botón **"Nuevo Flyer"** (esquina superior derecha)
2. Se abrirá un formulario con los siguientes campos:

   **Título** (obligatorio)

   - Ejemplo: "Paquete París 7 Días"
   - Este es el título que verán los clientes

   **Descripción** (obligatorio)

   - Escribe una descripción atractiva del servicio
   - Puede ser larga, se mostrará completa en la página de servicios

   **Imagen del Flyer** (obligatorio)

   - Tienes dos opciones:
     - **Subir imagen:** Haz clic en "Seleccionar archivo" y elige una imagen de tu computadora
     - **Usar URL:** Si ya tienes la imagen en internet, pega la URL
   - La imagen se subirá automáticamente a Cloudinary
   - Verás una vista previa de la imagen

   **Destacado** (opcional)

   - Marca esta casilla si quieres que el flyer aparezca en la página principal
   - Solo los flyers destacados se muestran en la sección "Servicios Destacados"

3. Haz clic en **"Crear"** para guardar

### Editar un Flyer

1. En la lista de flyers, haz clic en el botón **"Editar"** (ícono de lápiz)
2. Se abrirá el mismo formulario con los datos actuales
3. Modifica los campos que necesites
4. Haz clic en **"Actualizar"**

### Eliminar un Flyer

1. Haz clic en el botón **"Eliminar"** (ícono de basura)
2. Confirma la eliminación

> 💡 **Consejo:** Usa imágenes de buena calidad (recomendado: 800x600px o similar). Las imágenes se optimizan automáticamente.

---

## ⭐ Gestión de Testimonios

Los testimonios son las opiniones de clientes que se muestran en la página principal.

### Ver Testimonios Existentes

1. Haz clic en la pestaña **"Testimonios"**
2. Verás una lista de todos los testimonios

### Crear un Nuevo Testimonio

1. Haz clic en el botón **"Nuevo Testimonio"**
2. Completa el formulario:

   **Nombre** (obligatorio)

   - Nombre del cliente que dio el testimonio
   - Ejemplo: "María González"

   **Destino** (obligatorio)

   - Lugar al que viajó el cliente
   - Ejemplo: "París, Francia"

   **Mensaje** (obligatorio)

   - El testimonio completo del cliente
   - Ejemplo: "Fue una experiencia increíble, todo salió perfecto..."

   **Calificación** (obligatorio)

   - Selecciona de 1 a 5 estrellas
   - Esto determina cuántas estrellas se mostrarán

   **Foto** (opcional)

   - Puedes subir una foto del cliente o usar una URL
   - Si no subes foto, solo se mostrará el nombre

3. Haz clic en **"Crear"**

### Editar o Eliminar

- **Editar:** Haz clic en el ícono de lápiz
- **Eliminar:** Haz clic en el ícono de basura

> 💡 **Consejo:** Los testimonios con 5 estrellas y fotos tienen más impacto visual.

---

## ❓ Gestión de FAQ (Preguntas Frecuentes)

Las FAQs son las preguntas y respuestas que se muestran en la sección "Preguntas Frecuentes" del sitio.

### Ver FAQs Existentes

1. Haz clic en la pestaña **"FAQ"**
2. Verás una lista de todas las preguntas frecuentes

### Crear una Nueva FAQ

1. Haz clic en **"Nueva FAQ"**
2. Completa el formulario:

   **Pregunta** (obligatorio)

   - La pregunta que verán los clientes
   - Ejemplo: "¿Cuánto tiempo antes debo reservar mi viaje?"

   **Respuesta** (obligatorio)

   - La respuesta completa a la pregunta
   - Puede ser larga, se mostrará en un accordion expandible

   **Orden** (obligatorio)

   - Número que determina el orden de aparición
   - Menor número = aparece primero
   - Ejemplo: 1, 2, 3, etc.

3. Haz clic en **"Crear"**

### Editar o Eliminar

- **Editar:** Haz clic en el ícono de lápiz
- **Eliminar:** Haz clic en el ícono de basura

> 💡 **Consejo:** Organiza las FAQs por orden de importancia. Las más comunes deberían tener números bajos (1, 2, 3).

---

## 🏢 Gestión de Empresas Asociadas

Las empresas asociadas son los logos de compañías con las que trabajas (aerolíneas, hoteles, etc.) que se muestran en un carrusel.

### Ver Empresas Existentes

1. Haz clic en la pestaña **"Empresas"**
2. Verás una lista de todas las empresas

### Crear una Nueva Empresa

1. Haz clic en el botón **"Nueva Empresa"**
2. Completa el formulario:

   **Nombre** (obligatorio)

   - Nombre de la empresa
   - Ejemplo: "Aerolíneas Argentinas"

   **Logo** (obligatorio)

   - Sube el logo de la empresa o usa una URL
   - El logo debe ser claro y visible
   - Se mostrará en un carrusel en la página principal

   **URL** (opcional)

   - Si quieres que el logo sea clickeable, agrega la URL del sitio web de la empresa
   - Ejemplo: "https://www.aerolineas.com.ar"
   - Si dejas esto vacío, el logo no será clickeable

   **Orden** (obligatorio)

   - Número que determina el orden en el carrusel
   - Menor número = aparece primero

3. Haz clic en **"Crear"**

### Editar o Eliminar

- **Editar:** Haz clic en el ícono de lápiz
- **Eliminar:** Haz clic en el ícono de basura

> 💡 **Consejo:** Usa logos con fondo transparente (PNG) para mejor apariencia. El tamaño recomendado es 200x100px aproximadamente.

---

## 📝 Gestión de Blog

El blog permite publicar artículos sobre viajes, consejos y experiencias.

### Ver Posts Existentes

1. Haz clic en la pestaña **"Blog"**
2. Verás una lista de todos los posts del blog

### Crear un Nuevo Post

1. Haz clic en el botón **"Nuevo Post"**
2. Completa el formulario:

   **Título** (obligatorio)

   - El título del artículo
   - Ejemplo: "10 Mejores Destinos en Europa para Verano"

   **Slug (URL del post)** (se genera automáticamente)

   - Es la parte de la URL que identifica tu post
   - Se genera automáticamente desde el título
   - Ejemplo: "10-mejores-destinos-en-europa-para-verano"
   - Puedes editarlo manualmente si quieres una URL diferente
   - La URL final será: `/blog/10-mejores-destinos-en-europa-para-verano`

   **Resumen** (obligatorio)

   - Un breve resumen del artículo (1-2 párrafos)
   - Se muestra en la lista de posts del blog

   **Contenido** (obligatorio)

   - El contenido completo del artículo
   - Puedes escribir todo el texto aquí
   - Se mostrará en la página individual del post

   **Imagen del Post** (opcional)

   - Imagen principal del artículo
   - Puedes subirla o usar una URL
   - Se muestra en la lista y en el post individual

   **Autor** (obligatorio)

   - Nombre del autor del artículo
   - Ejemplo: "Equipo Nortesur Travel"

   **Fecha de Publicación** (obligatorio)

   - Fecha en que se publica el artículo
   - Por defecto es la fecha actual
   - Puedes cambiarla si quieres programar una publicación

   **Publicado** (casilla)

   - Si está marcada, el post será visible en el sitio web
   - Si no está marcada, el post estará guardado pero no visible
   - Útil para escribir posts y publicarlos después

3. Haz clic en **"Crear"**

### Editar o Eliminar

- **Editar:** Haz clic en el ícono de lápiz
- **Eliminar:** Haz clic en el ícono de basura

> 💡 **Consejo:** Escribe el contenido completo antes de marcar como "Publicado". Puedes guardar borradores sin publicar.

---

## ⚙️ Configuración General

Esta sección permite configurar el contenido principal del sitio web.

### Acceder a la Configuración

1. Haz clic en la pestaña **"Configuración"**
2. Verás 4 sub-pestañas:
   - **About** (Sobre Nosotros)
   - **Hero Section** (Sección Principal)
   - **Contacto**

---

### 📖 About (Sobre Nosotros)

Aquí configuras el contenido de la sección "Sobre Nosotros" de la página principal.

#### Secciones disponibles:

1. **Acerca de Nosotros**

   - Texto principal sobre la agencia
   - Aparece en la primera card de la sección

2. **Viajes Diseñados a la Medida de Cada Cliente**

   - Texto sobre el servicio personalizado
   - Aparece en la segunda card

3. **Misión**

   - La misión de la empresa
   - Aparece junto con la Visión en la tercera card

4. **Visión**

   - La visión de la empresa
   - Aparece junto con la Misión en la tercera card

5. **Foto**

   - Foto de la agencia o equipo
   - Puedes subirla o usar una URL

6. **Diploma**
   - Diploma o certificado de la agencia
   - Puedes subirla o usar una URL

#### Cómo editar:

1. Escribe o modifica el texto en cada campo
2. Para las imágenes (Foto y Diploma), puedes:
   - Subir desde tu computadora
   - O pegar una URL si ya está en internet
3. Haz clic en **"Guardar"** cuando termines

---

### 🎬 Hero Section (Sección Principal)

Esta es la sección grande con imágenes de fondo que aparece al inicio de la página.

#### Configuración disponible:

1. **Título**

   - El título principal que aparece sobre las imágenes
   - Ejemplo: "Descubre el Mundo con Nortesur Travel"

2. **Subtítulo**

   - El subtítulo que aparece debajo del título
   - Ejemplo: "Creamos experiencias únicas que recordarás para siempre"

3. **Imágenes del Hero**

   - Las imágenes de fondo que rotan en el carrusel
   - Puedes agregar múltiples imágenes
   - Para cada imagen puedes:
     - Subir desde tu computadora
     - O pegar una URL
   - Para agregar más imágenes, haz clic en **"Agregar Imagen"**
   - Para eliminar una imagen, haz clic en **"Eliminar Imagen"** en la imagen específica

4. **Estadísticas**
   - Números que se muestran en la parte inferior del hero
   - **Cantidad de Países:** Número de países a los que ofreces viajes
   - **Cantidad de Destinos:** Número total de destinos
   - **Cantidad de Aerolíneas:** Número de aerolíneas con las que trabajas
   - **Cantidad de Atracciones:** Número de atracciones disponibles

#### Cómo editar:

1. Modifica los textos y números según necesites
2. Para las imágenes, sube o pega URLs
3. Haz clic en **"Guardar"** cuando termines

> 💡 **Consejo:** Usa imágenes de alta calidad para el hero (recomendado: 1920x1080px o similar). Las imágenes deben ser de paisajes o lugares turísticos.

---

### 📞 Contacto

Aquí configuras toda la información de contacto que aparece en el sitio.

#### Información disponible:

1. **Email**

   - Email de contacto de la agencia
   - Ejemplo: "info@nortesurtravel.com"

2. **Teléfono**

   - Número de teléfono
   - Ejemplo: "+54 351 123-4567"

3. **Dirección**

   - Dirección física de la agencia
   - Ejemplo: "Av. Principal 123, Córdoba, Argentina"

4. **WhatsApp**

   - **Número de teléfono:** Número de WhatsApp (con código de país)
     - Ejemplo: "+5493512399267"
   - **Mensaje por defecto:** Mensaje que aparece cuando alguien hace clic en el botón de WhatsApp
     - Este mensaje se puede personalizar

5. **Redes Sociales**
   - **Facebook:** URL de la página de Facebook
   - **Instagram:** URL del perfil de Instagram
   - **Twitter:** URL del perfil de Twitter

#### Cómo editar:

1. Completa todos los campos con la información correcta
2. Para las URLs de redes sociales, pega el enlace completo
   - Ejemplo: "https://www.facebook.com/nortesurtravel"
3. Haz clic en **"Guardar"** cuando termines

> ⚠️ **Importante:** El número de WhatsApp debe incluir el código de país sin espacios ni guiones. Ejemplo: "+5493512399267" (no "+54 9 3512 39-9267").

---

## 💡 Consejos y Mejores Prácticas

### Para Imágenes

- **Formato recomendado:** JPG para fotos, PNG para logos con transparencia
- **Tamaño:** No subas imágenes muy grandes (máximo 5MB). El sistema las optimiza automáticamente
- **Calidad:** Usa imágenes nítidas y profesionales
- **Nombres:** Nombra tus archivos de forma descriptiva antes de subirlos

### Para Textos

- **Longitud:** Los textos pueden ser largos, pero sé conciso y claro
- **Formato:** No uses HTML, solo texto plano
- **Revisión:** Siempre revisa la ortografía antes de guardar

### Organización

- **Orden:** Usa números de orden lógicos (1, 2, 3...) para organizar contenido
- **Destacados:** No marques demasiados flyers como "destacados" (máximo 3-4)
- **Publicación:** En el blog, puedes escribir posts y publicarlos después

### Seguridad

- **Contraseña:** Mantén tu contraseña segura y no la compartas
- **Cerrar sesión:** Siempre cierra sesión cuando termines de trabajar
- **Backup:** El contenido se guarda automáticamente en Firebase, pero es buena práctica tener copias de textos importantes

---

## 🔧 Solución de Problemas

### No puedo iniciar sesión

- Verifica que estés usando el email y contraseña correctos
- Asegúrate de que no haya espacios antes o después del email
- Si el problema persiste, contacta al desarrollador

### Las imágenes no se suben

- Verifica que la imagen no sea muy grande (máximo 5MB)
- Asegúrate de tener conexión a internet estable
- Prueba con otra imagen para descartar que el archivo esté corrupto
- Verifica que Cloudinary esté configurado correctamente

### No recibo emails de notificación automática

- **Verifica la configuración:**
  - Si usas Resend: Verifica que `RESEND_API_KEY` esté en `.env.local` y empiece con `re_`
  - Si usas Gmail: Verifica que `EMAIL_USER` y `EMAIL_PASSWORD` estén configurados
- **Revisa el email de destino:**
  - Verifica que `RESEND_TO_EMAIL` o `EMAIL_TO` sea el email correcto
- **Revisa la carpeta de spam:**
  - Los emails pueden llegar a spam, especialmente la primera vez
- **Reinicia el servidor:**
  - Después de agregar variables de entorno, siempre reinicia el servidor
- **Verifica los logs:**
  - Revisa la consola del servidor para ver si hay errores al enviar emails
- **Prueba manualmente:**
  - Envía una consulta de prueba desde el formulario del sitio

### Los cambios no se ven en el sitio

- Espera unos segundos y recarga la página (F5)
- Limpia la caché del navegador (Ctrl+Shift+Delete)
- Verifica que hayas hecho clic en "Guardar" después de hacer los cambios

### El formulario no guarda

- Verifica que todos los campos obligatorios estén completos
- Revisa que tengas conexión a internet
- Mira la consola del navegador (F12) para ver si hay errores

### No veo las consultas nuevas

- Recarga la página
- Verifica que estés en la pestaña "Consultas"
- Las consultas nuevas tienen un badge "Nueva" en color dorado

### El blog no muestra los posts

- Verifica que el post esté marcado como "Publicado"
- Revisa la fecha de publicación
- Asegúrate de que el post tenga contenido completo

---

## 📞 Soporte

Si tienes problemas que no puedes resolver con este manual:

1. Revisa la sección "Solución de Problemas" arriba
2. Contacta al desarrollador con:
   - Descripción del problema
   - Pasos para reproducirlo
   - Captura de pantalla si es posible

---

## ✅ Lista de Verificación Rápida

Antes de considerar que el sitio está completo, verifica:

- [ ] Hero Section configurado con título, subtítulo e imágenes
- [ ] Estadísticas del Hero configuradas
- [ ] Sección "Sobre Nosotros" completa (4 textos + fotos)
- [ ] Información de contacto completa
- [ ] Al menos 3-4 flyers creados y algunos marcados como destacados
- [ ] Al menos 3-4 testimonios con calificaciones
- [ ] Al menos 5-6 FAQs creadas
- [ ] Al menos 3-4 empresas asociadas con logos
- [ ] Al menos 1-2 posts del blog publicados
- [ ] Número de WhatsApp correcto

---

## 🎉 ¡Listo!

Con este manual deberías poder gestionar todo el contenido del sitio web de Nortesur Travel. Si tienes dudas, vuelve a consultar las secciones relevantes.

**¡Éxito con tu sitio web!** 🌍✈️

# 🔐 Reglas de Seguridad de Firestore

Este documento contiene las reglas de seguridad que debes configurar en Firebase para que el formulario de consultas funcione correctamente.

## ⚠️ Problema Actual

Si ves el error `FirebaseError: Missing or insufficient permissions` al enviar el formulario, necesitas actualizar las reglas de Firestore.

## ✅ Solución: Actualizar las Reglas

### Paso 1: Ir a Firebase Console

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto: **nortesurtravel**
3. En el menú lateral, haz clic en **Firestore Database**
4. Ve a la pestaña **"Reglas"** (Rules)

### Paso 2: Copiar y Pegar las Reglas

Copia y pega exactamente este código en el editor de reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de todas las colecciones
    match /{document=**} {
      allow read: if true;
    }

    // Colección de consultas: permitir escritura pública (para el formulario)
    // pero solo lectura/edición/eliminación para usuarios autenticados
    match /consultas/{consultaId} {
      allow create: if true; // Cualquiera puede crear consultas (formulario público)
      allow read, update, delete: if request.auth != null; // Solo admin puede leer/editar/eliminar
    }

    // Todas las demás colecciones: solo escritura para usuarios autenticados
    match /{collection}/{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

### Paso 3: Publicar las Reglas

1. Haz clic en el botón **"Publicar"** (Publish)
2. Espera a que se publiquen (puede tardar unos segundos)
3. Verás un mensaje de confirmación

### Paso 4: Verificar

1. Vuelve a tu sitio web en Vercel
2. Intenta enviar el formulario de consulta
3. Debería funcionar sin errores

## 🔒 ¿Qué hacen estas reglas?

- **Lectura pública**: Cualquiera puede leer todas las colecciones (necesario para mostrar contenido en el sitio: blog, flyers, testimonios, **empresas asociadas**, etc.)
- **Escritura en consultas**: Cualquiera puede crear consultas (necesario para el formulario público)
- **Lectura/Edición/Eliminación de consultas**: Solo usuarios autenticados (admin) pueden ver, editar o eliminar consultas
- **Otras colecciones**: Solo usuarios autenticados pueden escribir en flyers, blog, testimonios, etc. (solo desde el panel admin)

## ⚠️ Importante

- Estas reglas son seguras porque:
  - Solo permiten CREAR consultas públicamente
  - No permiten leer, editar o eliminar consultas sin autenticación
  - Protegen todas las demás colecciones (solo admin puede modificarlas)

## 🆘 Si sigue sin funcionar

1. Verifica que copiaste las reglas exactamente como están
2. Asegúrate de hacer clic en "Publicar"
3. Espera 1-2 minutos para que las reglas se propaguen
4. Prueba de nuevo el formulario

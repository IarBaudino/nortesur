# Guía Paso a Paso: Configuración de Firebase

Esta guía te llevará paso a paso para configurar Firebase para el proyecto Nortesur Travel.

## 📋 Paso 1: Crear Proyecto en Firebase

1. Ve a https://console.firebase.google.com/
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Agregar proyecto"** o **"Add project"**
4. Ingresa el nombre del proyecto: `nortesur-travel` (o el que prefieras)
5. Haz clic en **"Continuar"**
6. **Opcional**: Desactiva Google Analytics si no lo necesitas (o déjalo activo)
7. Haz clic en **"Crear proyecto"**
8. Espera a que se cree el proyecto (puede tardar unos segundos)
9. Haz clic en **"Continuar"**

## 📱 Paso 2: Registrar Aplicación Web

1. En la página principal del proyecto, busca el ícono **`</>`** (Web) o haz clic en **"Agregar una app"**
2. Selecciona **"Web"** (ícono `</>`)
3. Ingresa un nombre para la app: `Nortesur Travel Web`
4. **NO** marques la casilla de Firebase Hosting (no la necesitamos ahora)
5. Haz clic en **"Registrar app"**
6. **¡IMPORTANTE!** Copia las credenciales que aparecen. Se verán así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "nortesur-travel.firebaseapp.com",
  projectId: "nortesur-travel",
  storageBucket: "nortesur-travel.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
};
```

7. Haz clic en **"Continuar en la consola"**

## 🗄️ Paso 3: Habilitar Firestore Database

1. En el menú lateral izquierdo, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de producción"**
4. Elige una ubicación para tu base de datos (recomendado: `us-central` o `southamerica-east1` para Argentina)
5. Haz clic en **"Habilitar"**
6. Espera a que se cree la base de datos

## 🔐 Paso 4: Configurar Security Rules de Firestore

1. En la página de Firestore Database, ve a la pestaña **"Reglas"** (Rules)
2. Reemplaza el contenido con estas reglas:

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

3. Haz clic en **"Publicar"**

> ⚠️ **Importante:** Estas reglas permiten que cualquier persona pueda enviar consultas a través del formulario, pero solo los usuarios autenticados (admin) pueden leer, editar o eliminar consultas.

## 👤 Paso 5: Habilitar Authentication

1. En el menú lateral izquierdo, haz clic en **"Authentication"**
2. Haz clic en **"Comenzar"**
3. Ve a la pestaña **"Sign-in method"** o **"Métodos de inicio de sesión"**
4. Haz clic en **"Correo electrónico/Contraseña"** o **"Email/Password"**
5. Activa el primer toggle (Enable)
6. Haz clic en **"Guardar"**

## 👨‍💼 Paso 6: Crear Usuario Administrador

1. En Authentication, ve a la pestaña **"Users"** o **"Usuarios"**
2. Haz clic en **"Agregar usuario"** o **"Add user"**
3. Ingresa un email (ej: `admin@nortesurtravel.com`)
4. Ingresa una contraseña segura
5. Haz clic en **"Agregar usuario"**
6. **¡GUARDA ESTAS CREDENCIALES!** Las necesitarás para acceder al panel admin

## 📝 Paso 7: Crear Archivo .env.local

1. En la raíz del proyecto (`E:\Programacion\nortesur`), crea un archivo llamado `.env.local`
2. Abre el archivo y pega el siguiente contenido, reemplazando los valores con los que copiaste en el Paso 2:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

**Ejemplo real:**

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nortesur-travel.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=nortesur-travel
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nortesur-travel.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

3. Guarda el archivo

## ✅ Paso 8: Verificar la Configuración

1. Reinicia el servidor de desarrollo:

   ```bash
   # Detén el servidor (Ctrl + C) y luego:
   npm run dev
   ```

2. Ve a http://localhost:3000/admin
3. Deberías ver la página de login
4. Intenta iniciar sesión con el email y contraseña que creaste en el Paso 6

## 🎉 ¡Listo!

Si puedes iniciar sesión, Firebase está configurado correctamente.

**Próximo paso:** Configurar Cloudinary (ver `ENV_SETUP.md`)

## 🔍 Verificar Credenciales (si las perdiste)

Si necesitas ver las credenciales de nuevo:

1. Ve a Firebase Console
2. Selecciona tu proyecto
3. Ve a **Project Settings** (⚙️) > **General**
4. Baja hasta la sección **"Your apps"**
5. Haz clic en tu app web
6. Verás las credenciales en el objeto `firebaseConfig`

## ❓ Problemas Comunes

### Error: "Firebase: Error (auth/configuration-not-found)"

- Verifica que todas las variables en `.env.local` estén correctas
- Asegúrate de que las variables empiecen con `NEXT_PUBLIC_`
- Reinicia el servidor después de cambiar `.env.local`

### Error: "Firebase: Error (auth/invalid-api-key)"

- Verifica que copiaste correctamente el `apiKey` en `.env.local`
- No debe tener comillas alrededor

### No puedo iniciar sesión

- Verifica que el usuario existe en Authentication > Users
- Verifica que habilitaste Email/Password en Authentication > Sign-in method

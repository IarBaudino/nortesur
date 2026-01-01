# 🌍 Nortesur Travel - Sitio Web de Agencia de Viajes

Sitio web moderno y elegante para **Nortesur Travel**, una agencia de viajes especializada en crear experiencias únicas e inolvidables. Desarrollado con Next.js 15, React 18, TypeScript y Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38b2ac?style=flat-square&logo=tailwind-css)

## ✨ Características Principales

- 🎨 **Diseño Moderno y Elegante**: Interfaz de usuario moderna con animaciones suaves y transiciones fluidas
- 📱 **Totalmente Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- 🖼️ **Carousel de Imágenes**: Hero section con carousel automático de imágenes de fondo
- 📝 **Formulario de Consulta**: Sistema de contacto integrado con validación
- 💬 **Integración WhatsApp**: Botón flotante de WhatsApp para contacto directo
- 🎯 **Secciones Dinámicas**:
  - Hero Section con carousel
  - Servicios destacados (Flyers)
  - Testimonios de clientes
  - Sobre nosotros
  - Preguntas frecuentes (FAQ)
  - Empresas asociadas
  - Blog de viajes
- 🔐 **Panel de Administración**: Gestión de contenido a través de Firebase
- ⚡ **Optimización de Imágenes**: Uso de Next.js Image para carga optimizada
- 🎭 **Animaciones**: Framer Motion para transiciones y animaciones suaves

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Next.js 15.1.0** - Framework React con SSR y SSG
- **React 18.3.1** - Biblioteca de UI
- **TypeScript 5.3.0** - Tipado estático
- **Tailwind CSS 3.4.19** - Framework CSS utility-first
- **Framer Motion 11.0.5** - Biblioteca de animaciones
- **Shadcn/ui** - Componentes UI accesibles y personalizables

### Backend & Servicios

- **Firebase 10.7.1** - Backend as a Service
  - Firestore - Base de datos NoSQL
  - Firebase Storage - Almacenamiento de archivos
  - Firebase Authentication - Autenticación de usuarios
- **Cloudinary** - Gestión de imágenes (configuración pendiente)

### Herramientas de Desarrollo

- **ESLint** - Linter para JavaScript/TypeScript
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Compatibilidad de navegadores

## 🎨 Paleta de Colores

El sitio utiliza una paleta de colores personalizada para Nortesur Travel:

- **Azul Oscuro**: `#033671` - Color principal, títulos y elementos destacados
- **Azul Medio**: `#2E486B` - Textos secundarios y acentos
- **Gris Claro**: `#D9DEE4` - Fondos y elementos sutiles
- **Gris Medio**: `#CAD0DA` - Bordes y separadores
- **Dorado/Marrón**: `#6D4C05` - Acentos y elementos de énfasis

## 📦 Instalación

### Prerrequisitos

- Node.js 18.x o superior
- npm o yarn
- Cuenta de Firebase (para funcionalidades completas)
- Cuenta de Cloudinary (opcional, para optimización de imágenes)

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/IarBaudino/nortesur.git
   cd nortesur
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

   # Cloudinary (opcional)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=tu_api_key
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=tu_api_secret
   ```

   Puedes usar `env.example.txt` como referencia.

4. **Ejecutar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**

   Navega a [http://localhost:3000](http://localhost:3000)

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter para verificar errores

## 📚 Documentación

- **[Manual de Usuario](./docs/MANUAL_USUARIO.md)** - Guía completa para usar el panel de administración
- **[Deploy en Vercel](./docs/DEPLOY_VERCEL.md)** - Guía paso a paso para desplegar el sitio
- **[Configuración de Firebase](./docs/FIREBASE_SETUP.md)** - Instrucciones para configurar Firebase
- **[Configuración de Email](./docs/EMAIL_SETUP.md)** - Configurar notificaciones por email (Gmail)
- **[Configuración de Email Alternativa](./docs/EMAIL_SETUP_ALTERNATIVO.md)** - Configurar con Resend (más fácil)
- **[Configuración de Imagen Open Graph](./docs/OG_IMAGE_SETUP.md)** - Cómo crear la imagen para redes sociales

## 📁 Estructura del Proyecto

```
nortesur/
├── app/                    # Páginas y rutas de Next.js
│   ├── admin/             # Panel de administración
│   ├── blog/              # Páginas del blog
│   ├── servicios/         # Página de servicios
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── admin/            # Componentes del panel admin
│   ├── ui/               # Componentes UI reutilizables (Shadcn)
│   ├── about-section.tsx
│   ├── consulta-form.tsx
│   ├── empresas-asociadas-section.tsx
│   ├── faq-section.tsx
│   ├── flyers-highlight.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navbar.tsx
│   └── testimonios-section.tsx
├── lib/                   # Utilidades y configuraciones
│   ├── firebase/         # Configuración de Firebase
│   ├── hooks/            # Custom hooks
│   ├── cloudinary/       # Configuración de Cloudinary
│   └── utils.ts          # Funciones utilitarias
├── public/               # Archivos estáticos
│   ├── images/           # Imágenes del sitio
│   ├── flyers/           # Flyers de servicios
│   └── logos/            # Logos de empresas asociadas
├── docs/                 # Documentación
│   ├── FIREBASE_SETUP.md
│   └── FIRESTORE_RULES.md
└── tailwind.config.ts    # Configuración de Tailwind CSS
```

## 🔧 Configuración

### Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Firestore Database
3. Habilita Firebase Storage
4. Configura las reglas de seguridad (ver `docs/FIRESTORE_RULES.md`)
5. Obtén las credenciales y agrégalas a `.env.local`

### Cloudinary (Opcional)

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. Obtén tus credenciales de la consola
3. Agrégalas a `.env.local`
4. Descomenta la configuración en `lib/cloudinary/config.ts`

## 🎯 Características de Diseño

- **Navbar Sticky**: Barra de navegación fija con efecto de transparencia al hacer scroll
- **Hero Section**: Carousel automático de imágenes con controles de navegación
- **Cards Modernas**: Diseño de tarjetas con efectos hover y gradientes sutiles
- **Animaciones Suaves**: Transiciones fluidas en todos los componentes
- **Scroll Suave**: Navegación suave entre secciones
- **Responsive Design**: Adaptación perfecta a todos los tamaños de pantalla

## 📝 Notas Importantes

- El proyecto utiliza **Tailwind CSS v3** (no v4) para compatibilidad con Next.js y Shadcn/ui
- Las imágenes deben estar optimizadas antes de subirlas
- El panel de administración requiere autenticación con Firebase
- El formulario de consulta envía datos a Firebase Firestore

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propiedad de Nortesur Travel.

## 👤 Autor

**Iara Baudino**

- GitHub: [@IarBaudino](https://github.com/IarBaudino)
- Email: iaba.sur@gmail.com

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [Firebase](https://firebase.google.com/) - Backend as a Service

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

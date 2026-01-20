export interface CategoriaFlyer {
  id: string;
  nombre: string;
  slug: string;
  imagen: string;
  descripcion?: string;
  orden: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Flyer {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoriaId?: string;
  destacado: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonio {
  id: string;
  nombre: string;
  destino: string;
  mensaje: string;
  calificacion: number;
  foto?: string;
  createdAt: Date;
}

export interface FAQ {
  id: string;
  pregunta: string;
  respuesta: string;
  orden: number;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  resumen: string;
  imagen?: string;
  autor: string;
  fechaPublicacion: Date;
  publicado: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmpresaAsociada {
  id: string;
  nombre: string;
  logo: string;
  url?: string;
  orden: number;
  createdAt: Date;
}

export interface SiteContent {
  contact: {
    email: string;
    phone: string;
    address: string;
    whatsapp: {
      phoneNumber: string;
      defaultMessage: string;
    };
    social: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  hero: {
    titulo: string;
    subtitulo: string;
    imagenes: string[];
    estadisticas?: {
      paises: number;
      destinos: number;
      aerolineas: number;
      atracciones: number;
    };
  };
}

export interface AboutContent {
  acercaDeNosotros: string;
  viajesDiseñados: string;
  mision: string;
  vision: string;
  foto: string;
  diploma: string;
}

export interface Consulta {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  destino?: string;
  fechaViaje?: string;
  cantidadPersonas?: string;
  ciudadSalida?: string;
  mensaje: string;
  leida: boolean;
  createdAt: Date;
}

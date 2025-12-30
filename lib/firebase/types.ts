export interface Flyer {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
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

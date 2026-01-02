# Configuración de Imagen Open Graph

## ¿Qué es la imagen Open Graph?

La imagen Open Graph es la imagen que aparece cuando compartes el sitio web en redes sociales (Facebook, Twitter, LinkedIn, WhatsApp, etc.).

## Especificaciones

- **Tamaño:** 1200 x 630 píxeles
- **Formato:** JPG o PNG
- **Ubicación:** `/public/images/og-image.jpg`
- **Peso recomendado:** Menos de 1MB

## Cómo crear la imagen

### Opción 1: Usar Canva (Recomendado - Gratis)

1. Ve a [Canva.com](https://www.canva.com/)
2. Busca "Open Graph" o crea un diseño personalizado de 1200x630px
3. Incluye:
   - Logo de Nortesur Travel (puedes usar `/public/images/nortesurlogo.jpg`)
   - Texto: "Nortesur Travel - Tu agencia de viajes de confianza"
   - Colores de la marca:
     - Azul oscuro: `#033671`
     - Dorado: `#6D4C05`
   - Imagen de fondo relacionada con viajes (opcional)
4. Descarga como JPG
5. Guarda en `/public/images/og-image.jpg`

### Opción 2: Redimensionar imagen existente

Puedes usar una de las imágenes del hero y redimensionarla:

```bash
# Si tienes ImageMagick instalado:
convert public/images/head1.jpg -resize 1200x630^ -gravity center -extent 1200x630 public/images/og-image.jpg

# O usa cualquier editor de imágenes (Photoshop, GIMP, Paint.NET, etc.)
```

### Opción 3: Herramientas online

- [OG Image Generator](https://www.opengraph.xyz/)
- [Bannerbear](https://www.bannerbear.com/)
- [Social Share Preview](https://socialsharepreview.com/)

## Verificar que funciona

1. Una vez creada la imagen, reinicia el servidor de desarrollo
2. Visita: `http://localhost:3000`
3. Usa estas herramientas para verificar:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Nota importante

Mientras no tengas la imagen, el sitio funcionará correctamente, pero las redes sociales mostrarán una imagen por defecto o ninguna imagen al compartir el sitio. Es recomendable crear la imagen antes de hacer el deploy a producción.





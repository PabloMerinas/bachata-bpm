# BachataBPM

Catálogo para practicar bachata: busca una canción, mira su BPM real, si se baila más
natural en **derecho** o **majao**, y practica con metrónomo, contador de tiempo,
control de velocidad y bucle A-B antes de llevarlo a la pista.

🔗 Demo (cuando el repo sea público): https://pablomerinas.github.io/bachata-bpm/

## Funcionalidades

- **Catálogo** de 15 bachatas conocidas (clásica, moderna, sensual, pop), cada una con
  BPM real, nivel recomendado y una nota sobre por qué se sugiere romper derecho o majao.
- **Filtros y orden**: por nombre/artista, estilo de rotura, nivel, rango de BPM,
  favoritos y orden por BPM o título.
- **Favoritos** guardados en `localStorage`, sin cuenta ni backend.
- **Enlaces directos**: cada canción tiene su propia URL (`?cancion=<id>`) y un botón
  "Compartir" que copia el enlace — se puede recargar o compartir y abre directamente
  esa ficha.
- **Reproductor real** vía YouTube IFrame API (no un iframe estático): permite leer el
  tiempo de reproducción en directo para sincronizar las herramientas de abajo.
- **Contador de tiempo 1-8** sincronizado al BPM real, con calibración manual (±0.05s)
  guardada por canción si el "1" no coincide con el acento real.
- **Metrónomo** con punto visual pulsante y clic sonoro (Web Audio API).
- **Control de velocidad** (0.5x/0.75x/0.9x/1x) y **bucle A-B** para repetir un tramo
  concreto sin soltar el ratón — ambos actúan sobre el vídeo real, no son simulados.
- Accesible: navegación por teclado, foco gestionado en el modal, `aria-label`s en
  controles interactivos.

## Sobre los datos (importante)

El **BPM es un dato real**, citado de bases de datos públicas de análisis de audio
(Tunebat o Shazam — enlace "fuente" en cada ficha); puede variar ±1-2 BPM entre bases de
datos distintas porque usan algoritmos distintos.

El **estilo de rotura (derecho/majao) no es un dato medible del audio**: es una decisión
de técnica de baile, no una propiedad física de la canción. Se presenta siempre como
sugerencia pedagógica razonada (qué acento musical la motiva), nunca como un hecho
objetivo — contrástala con tu instructor.

El dataset vive en `src/data/songs.ts` y está pensado para corregirse o ampliarse
fácilmente con pull requests (cada canción enlaza a su fuente de BPM y a su vídeo oficial
de YouTube).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- YouTube IFrame Player API (reproducción + control de velocidad + tiempo en directo)
- Despliegue automático a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`)
  — requiere que el repo sea público (o GitHub Pro) para que Pages se sirva gratis.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build / lint

```bash
npm run build
npm run lint
```

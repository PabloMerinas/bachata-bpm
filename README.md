# BachataBPM

Catálogo para practicar bachata: busca una canción, mira su BPM y si se baila más
natural en **derecho** o **majao**, y practica con un metrónomo visual/sonoro antes de
llevarlo a la pista.

🔗 Demo: https://pablomerinas.github.io/bachata-bpm/

## Cómo funciona

- **Catálogo curado** con canciones de bachata conocidas (clásica, moderna, sensual,
  pop), cada una con BPM, nivel recomendado y una nota sobre por qué se sugiere
  romper derecho o majao.
- **Filtros** por nombre/artista, estilo de rotura, nivel y rango de BPM.
- **Reproducción** vía reproductor embebido oficial de YouTube — esta web no aloja ni
  distribuye audio, solo metadatos.
- **Metrónomo** con punto visual pulsante y clic sonoro (Web Audio API) sincronizado al
  BPM de la canción abierta.

## Sobre los datos (importante)

El BPM y la recomendación de estilo (derecho/majao) de cada canción son **orientativos**,
estimados a partir del género y la sensación de tempo, no medidos con un analizador de
audio profesional. Se marcan en la ficha de cada canción con la etiqueta "BPM estimado".
Úsalos como punto de partida para practicar, no como sustituto de lo que te diga tu
instructor. El dataset vive en `src/data/songs.ts` y está pensado para poder corregirse
o ampliarse fácilmente con pull requests.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Despliegue automático a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

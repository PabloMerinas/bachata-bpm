export interface Fuente {
  nombre: string
  url: string
}

export interface SeccionReal {
  inicio: number
  fin: number
  etiqueta: string
}

export interface Song {
  id: string
  title: string
  artist: string
  youtubeId: string
  /** BPM medido por análisis de audio real (AcousticBrainz/Essentia), redondeado para mostrar. */
  bpm: number
  /**
   * Primer beat detectado por análisis de audio real (AcousticBrainz/Essentia), en segundos.
   * Campo obligatorio a propósito: solo entran en el catálogo canciones con este dato verificado,
   * nunca una suposición a 0.
   */
  beatOffset: number
  fuenteBpm: Fuente
  fuenteBeat: Fuente
  /** Aviso cuando el único análisis disponible es de una mezcla/versión distinta a la del vídeo embebido. */
  notaCalibrado?: string
  /**
   * true si el beat viene de nuestro propio análisis sobre un clip de 30s de Deezer
   * (en vez de AcousticBrainz, que analiza la canción completa). Ese clip no siempre empieza
   * en el segundo 0 de la canción, así que el offset puede estar mal — por eso se marca
   * explícitamente como experimental en vez de darlo por bueno.
   */
  experimental?: boolean
  /**
   * Lista completa de beats reales detectados en toda la canción (solo disponible cuando
   * analizamos el archivo de audio entero, no un clip). Permite contar usando la posición
   * real de cada beat en vez de una fórmula aproximada — elimina la deriva por redondeo.
   */
  beatsCompletos?: number[]
  /**
   * Índice (dentro de beatsCompletos) del beat elegido como "1", basado en qué posición del
   * compás tiene más energía real medida (acento más fuerte) — una estimación razonada, no
   * una certeza absoluta de que sea el "1" que cuenta un instructor.
   */
  beatsAnclaIdx?: number
  /**
   * Estructura real detectada por análisis de audio (energía + proporción de voz + planitud
   * espectral) sobre el archivo completo. Solo marca cambios de textura/energía reales — no
   * dice si es derecho/majao/mambo, eso sigue sin ser medible.
   */
  estructuraReal?: SeccionReal[]
  genero: string
  anio: number
  notaEstilo: string
  nivel: 'principiante' | 'intermedio' | 'avanzado'
}

export const songs: Song[] = [
  {
    id: 'propuesta-indecente',
    title: 'Propuesta Indecente',
    artist: 'Romeo Santos',
    youtubeId: 'QFs3PIZb3js',
    bpm: 123,
    beatOffset: 0.067,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Propuesta-Indecente-Romeo-Santos/5PycBIeabfvX3n9ILG7Vrv' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/6e4e08d5-5247-41a6-ba55-d180cbd7b400/low-level' },
    genero: 'Bachata moderna',
    anio: 2014,
    notaEstilo: 'El acento de la guira cae ligeramente retrasado respecto al bajo, por lo que mucha gente la siente más natural rompiendo majao.',
    nivel: 'intermedio',
  },
  {
    id: 'obsesion',
    title: 'Obsesión',
    artist: 'Aventura (ft. Judy Santos)',
    youtubeId: 'yC9u00F-NF0',
    bpm: 134,
    beatOffset: 0.306,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Obsesion-Aventura/64sSpGnQG05qu54wTqfekE' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/fdb657f7-b82e-458e-9fa6-0969d5412c17/low-level' },
    genero: 'Bachata clásica dominicana',
    anio: 2002,
    notaEstilo: 'Patrón de guira muy marcado en el tiempo fuerte: referencia clásica para practicar la rotura derecho.',
    nivel: 'principiante',
  },
  {
    id: 'darte-un-beso',
    title: 'Darte un Beso',
    artist: 'Prince Royce',
    youtubeId: 'bdOXnTbyk0g',
    bpm: 140,
    beatOffset: 0.464,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Darte-un-Beso-Prince-Royce/6cJLfIqwh0tCKRjYM3WpZ5' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/b9213293-69ea-4edb-bcdc-3ef77761697e/low-level' },
    genero: 'Bachata moderna',
    anio: 2013,
    notaEstilo: 'Ritmo muy regular y rápido, buena referencia para subir de velocidad manteniendo la rotura derecho.',
    nivel: 'avanzado',
  },
  {
    id: 'bachata-rosa',
    title: 'Bachata Rosa',
    artist: 'Juan Luis Guerra 4.40',
    youtubeId: 'Hct_iDOt4D0',
    bpm: 117,
    beatOffset: 0.615,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Bachata-Rosa-Juan-Luis-Guerra-4-40/5DAcQYhc2MurNpTHtX8kZ3' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/0168874e-90bd-41bd-9000-be6d30526228/low-level' },
    genero: 'Bachata tradicional',
    anio: 1990,
    notaEstilo: 'Tempo más lento y tradicional, buena referencia histórica del género antes de la bachata urbana.',
    nivel: 'principiante',
  },
  {
    id: 'hasta-el-fin',
    title: 'Hasta el Fin',
    artist: 'Monchy & Alexandra',
    youtubeId: 'vf8pyXzwOgM',
    bpm: 125,
    beatOffset: 0.055,
    fuenteBpm: { nombre: 'Shazam', url: 'https://www.shazam.com/en-us/song/178470677/hasta-el-fin' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/fa11e207-f69a-4d93-b87d-2eef933a23e8/low-level' },
    genero: 'Bachata clásica dominicana',
    anio: 2004,
    notaEstilo: 'Tempo vivo con acentos muy claros, se baila casi siempre derecho en pista social.',
    nivel: 'intermedio',
  },
  {
    id: 'te-extrano',
    title: 'Te Extraño',
    artist: 'Xtreme',
    youtubeId: 'Spz1YgguUOM',
    bpm: 130,
    beatOffset: 0.105,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Te-Extra-o-Bachata-Version-Xtreme/0muI8DpTEpLqqibPm3sKYf' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/aa20bd07-4474-40af-9b00-91cddc7bc052/low-level' },
    genero: 'Bachata moderna',
    anio: 2005,
    notaEstilo: 'De las más rápidas del repertorio clásico de salones: buena para trabajar velocidad de giro.',
    nivel: 'avanzado',
  },
  {
    id: 'tengo-un-amor',
    title: 'Tengo un Amor',
    artist: 'Toby Love',
    youtubeId: 'jioYwyg3lmo',
    bpm: 134,
    beatOffset: 0.453,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Tengo-un-Amor-Toby-Love/5q9ZLBQHuaQd8juV2MtYzc' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/bf3e28bd-72aa-4d57-93c7-6c4c16c0fc2b/low-level' },
    genero: 'Bachata moderna / urbana',
    anio: 2006,
    notaEstilo: 'Base muy marcada y constante, ideal para automatizar el paso básico derecho.',
    nivel: 'principiante',
  },
  {
    id: 'be-my-baby',
    title: 'Be My Baby',
    artist: 'Leslie Grace',
    youtubeId: 'WcUgA5-UN20',
    bpm: 133,
    beatOffset: 0.43,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Be-My-Baby-Leslie-Grace/4Ij0WiYuPR4a1XGCmLBwXX' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/c36ac0a5-a761-4171-83f7-5ded942874aa/low-level' },
    genero: 'Bachata pop',
    anio: 2012,
    notaEstilo: 'La producción pop desplaza el acento percusivo: muchos instructores la usan para introducir el majao.',
    nivel: 'intermedio',
  },
  {
    id: 'eres-mia',
    title: 'Eres Mía',
    artist: 'Romeo Santos',
    youtubeId: '8iPcqtHoR3U',
    bpm: 123,
    beatOffset: 0.406,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Eres-M-a-Romeo-Santos/6I86RF3odBlcuZA9Vfjzeq' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/fa854c46-6c8c-44a4-98f2-d9cb521d1624/low-level' },
    genero: 'Bachata sensual',
    anio: 2014,
    notaEstilo: 'Fraseo sensual con pausas: se presta a jugar con la rotura majao y cambios de dirección.',
    nivel: 'avanzado',
  },
  {
    id: 'stand-by-me',
    title: 'Stand By Me',
    artist: 'Prince Royce',
    youtubeId: 'PPgQ4nDLh0s',
    bpm: 132,
    beatOffset: 0.395,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Stand-by-Me-Prince-Royce/0DQd0tWurMHUAv0cMnDELH' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/f22893fe-6b85-48ab-9f24-8803195dbcf8/low-level' },
    notaCalibrado: 'El análisis de audio disponible es de una "dance version"; si tu vídeo usa otra mezcla, puede que necesites recalibrar.',
    genero: 'Bachata moderna',
    anio: 2010,
    notaEstilo: 'Estructura muy predecible, cómoda para practicar musicalidad básica antes de complicarse con majao.',
    nivel: 'principiante',
  },
  {
    id: 'hermanita',
    title: 'Hermanita',
    artist: 'Aventura',
    youtubeId: 'mVYQSAm8hB0',
    bpm: 126,
    beatOffset: 0.511,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Hermanita-Aventura/6ExIo2QuQcqkJKYRIfNtNE' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/0bca0a4d-b671-4f84-b349-a4cc59d195c0/low-level' },
    genero: 'Bachata clásica dominicana',
    anio: 2003,
    notaEstilo: 'Guira muy presente y directa: referencia clara de rotura derecho a tempo medio-alto.',
    nivel: 'intermedio',
  },
  {
    id: 'you',
    title: 'You',
    artist: 'Romeo Santos',
    youtubeId: 'ElU-VcWEhRU',
    bpm: 132,
    beatOffset: 0.464,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/You-Romeo-Santos/1sQrCwV8vvtYLqa0KQlwE9' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/880ba2bc-0dfb-4de9-9232-eaf0ac19352f/low-level' },
    genero: 'Bachata moderna',
    anio: 2012,
    notaEstilo: 'Fraseo con mucho aire entre frases, típico de la bachata sensual donde el majao se siente más cómodo.',
    nivel: 'intermedio',
  },
  {
    id: 'corazon-sin-cara',
    title: 'Corazón Sin Cara',
    artist: 'Prince Royce',
    youtubeId: 'XNGWDH-6yv8',
    bpm: 127,
    beatOffset: 0.418,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Coraz-n-Sin-Cara-Prince-Royce/0u4N6w5lBw5xMrzJitRWUo' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/c5ef4286-190f-4295-8719-28132e2fa530/low-level' },
    genero: 'Bachata moderna',
    anio: 2010,
    notaEstilo: 'Número 1 histórico del género en EE.UU.: base muy regular, perfecta para consolidar el derecho antes de improvisar.',
    nivel: 'principiante',
  },
  {
    id: 'un-beso',
    title: 'Un Beso',
    artist: 'Aventura',
    youtubeId: 'uBwk106e3es',
    bpm: 125,
    beatOffset: 0.453,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Un-Beso-Aventura/1SaEt8dwTuLDzenUu5BqI6' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/ab9d1b73-f73b-495f-9b25-e440059fd736/low-level' },
    notaCalibrado: 'El análisis de esta grabación muestra saltos de tempo irregulares más allá de la intro (no solo al principio), algo que no vimos en las demás canciones — el offset puede no ser fiable en ningún punto de la canción. Revísalo de oído con más cuidado que en el resto.',
    genero: 'Bachata clásica dominicana',
    anio: 2005,
    notaEstilo: 'Tempo medio muy bailable, de las más usadas en clases para introducir combinaciones de giros en derecho.',
    nivel: 'intermedio',
  },
  {
    id: 'imitadora',
    title: 'Imitadora',
    artist: 'Romeo Santos',
    youtubeId: 'FAq4OIRDo68',
    bpm: 126,
    beatOffset: 0.429,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Imitadora-Romeo-Santos/6r46lnXFbE9fr2d3KNaGbe' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/9fe08b42-f81f-4f35-930c-dbf8588890d1/low-level' },
    genero: 'Bachata moderna',
    anio: 2017,
    notaEstilo: 'Fraseo vocal muy libre con pausas marcadas, típico de la bachata moderna donde el majao se apoya mejor en el silencio.',
    nivel: 'avanzado',
  },
  {
    id: 'tu-veneno',
    title: 'Tu Veneno',
    artist: 'Héctor Acosta "El Torito"',
    youtubeId: '7634eY2u6ew',
    bpm: 130,
    beatOffset: 0.488,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Tu-Veneno-H-ctor-Acosta-El-Torito-/1QnFi4ONNMCWEOpXHwat2O' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/d092e3b1-068f-4662-8d4b-032873fcced6/low-level' },
    genero: 'Bachata dominicana de salón',
    anio: 2012,
    notaEstilo: 'Voz con mucho vibrato sobre una base muy regular: clásico de boda dominicana, se baila casi siempre derecho.',
    nivel: 'intermedio',
  },
  {
    id: 'tu-eres-ajena',
    title: 'Tú Eres Ajena',
    artist: 'Frank Reyes',
    youtubeId: '0mFaIxl1wgQ',
    bpm: 130,
    beatOffset: 0.406,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Tu-Eres-Ajena-Frank-Reyes/64zjvItFmkY8Q96tcmGQ6n' },
    fuenteBeat: { nombre: 'AcousticBrainz', url: 'https://acousticbrainz.org/4f928e37-66cb-42aa-bd6a-90c4eb8a5e48/low-level' },
    genero: 'Bachata dominicana de salón',
    anio: 2007,
    notaEstilo: 'Letra muy popular en pista social; patrón de guira directo, ideal para derecho a tempo medio-alto.',
    nivel: 'intermedio',
  },
  {
    id: 'la-bachata',
    title: 'La Bachata (preview 30s)',
    artist: 'Manuel Turizo',
    youtubeId: 'A7m8lQOMz1A',
    bpm: 125,
    beatOffset: 0.38,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/La-Bachata-Manuel-Turizo/5ww2BF9slyYgNOk37BlC4u' },
    fuenteBeat: { nombre: 'Análisis propio sobre clip de 30s (Deezer)', url: 'https://www.deezer.com/track/1753549417' },
    notaCalibrado: 'Analizado solo con los primeros 30 segundos (preview de Deezer). Compárala con "La Bachata (archivo completo)" para ver cuánto cambia el resultado al analizar la canción entera.',
    experimental: true,
    genero: 'Bachata moderna / pop',
    anio: 2022,
    notaEstilo: 'Superéxito global de 2022 con producción muy pop; el fraseo relajado se presta a romper majao.',
    nivel: 'principiante',
  },
  {
    id: 'la-bachata-completa',
    title: 'La Bachata (archivo completo)',
    artist: 'Manuel Turizo',
    youtubeId: 'A7m8lQOMz1A',
    bpm: 125,
    beatOffset: 0,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/La-Bachata-Manuel-Turizo/5ww2BF9slyYgNOk37BlC4u' },
    fuenteBeat: { nombre: 'BeatNet + madmom (downbeat-tracking con red neuronal, archivo completo)', url: 'https://www.youtube.com/watch?v=A7m8lQOMz1A' },
    notaCalibrado: 'Actualizado: el "1" ya no viene de mi estimación por energía, sino de un modelo de IA especializado en detectar downbeats (BeatNet/madmom) corriendo sobre tu mp3 completo — reduce la ambigüedad de 8 posibles beats a solo 2 candidatos reales (el downbeat se repite cada 4 beats, y nuestro compás de 8 tiempos son 2 de esos downbeats). Sigue sin poder decirte cuál de esos dos es el "1" exacto que cuenta un instructor, pero ya no es una suposición mía por energía — es un downbeat real detectado por un modelo entrenado para esto.',
    experimental: true,
    beatsAnclaIdx: 33,
    estructuraReal: [
      { inicio: 0, fin: 11, etiqueta: 'Intro instrumental (voz real casi ausente, confirmado separando las pistas)' },
      { inicio: 11, fin: 36, etiqueta: 'Primer verso: voz claramente dominante' },
      { inicio: 36, fin: 131, etiqueta: 'Cuerpo: mezcla llena, voz e instrumentación equilibradas' },
      { inicio: 131, fin: 163, etiqueta: 'Outro instrumental: voz real casi ausente (corregido tras separar las pistas de verdad)' },
    ],
    beatsCompletos: [0.2,0.7,1.18,1.66,2.12,2.6,3.08,3.58,4.06,4.52,5.0,5.48,5.96,6.44,6.92,7.42,7.9,8.36,8.82,9.28,9.78,10.26,10.72,11.22,11.68,12.18,12.66,13.14,13.6,14.08,14.58,15.06,15.52,16.0,16.5,16.98,17.48,17.96,18.42,18.9,19.38,19.86,20.34,20.82,21.3,21.8,22.26,22.74,23.14,23.58,24.0,24.42,24.9,25.38,25.86,26.34,26.82,27.3,27.76,28.26,28.74,29.22,29.7,30.18,30.66,31.14,31.62,32.08,32.58,33.04,33.54,34.0,34.5,34.96,35.46,35.92,36.42,36.9,37.36,37.86,38.34,38.82,39.3,39.78,40.26,40.74,41.22,41.7,42.18,42.66,43.14,43.62,44.1,44.58,45.06,45.54,46.02,46.5,46.98,47.46,47.94,48.42,48.9,49.38,49.86,50.34,50.8,51.3,51.78,52.26,52.74,53.22,53.7,54.18,54.66,55.14,55.62,56.1,56.58,57.06,57.54,58.02,58.5,58.98,59.46,59.94,60.4,60.9,61.38,61.86,62.34,62.82,63.3,63.78,64.26,64.74,65.22,65.7,66.18,66.66,67.14,67.62,68.1,68.58,69.06,69.54,70.02,70.52,70.98,71.46,71.94,72.44,72.9,73.38,73.86,74.34,74.82,75.3,75.8,76.26,76.74,77.22,77.7,78.18,78.66,79.14,79.62,80.1,80.58,81.06,81.54,82.02,82.5,82.98,83.46,83.94,84.42,84.9,85.38,85.86,86.34,86.82,87.3,87.78,88.26,88.74,89.22,89.68,90.16,90.66,91.12,91.62,92.1,92.58,93.06,93.54,94.02,94.5,94.98,95.46,95.94,96.42,96.9,97.38,97.84,98.34,98.82,99.28,99.78,100.24,100.74,101.22,101.7,102.18,102.66,103.14,103.62,104.1,104.58,105.06,105.54,106.02,106.5,106.98,107.46,107.94,108.42,108.9,109.38,109.86,110.34,110.82,111.3,111.78,112.24,112.74,113.22,113.7,114.18,114.66,115.14,115.62,116.1,116.58,117.06,117.54,118.02,118.5,118.98,119.46,119.94,120.42,120.9,121.38,121.86,122.34,122.82,123.3,123.78,124.26,124.74,125.22,125.7,126.18,126.66,127.14,127.6,128.1,128.58,129.06,129.54,130.02,130.5,130.98,131.54,132.12,132.66,133.14,133.62,134.12,134.58,135.06,135.54,136.02,136.5,136.98,137.46,137.94,138.42,138.9,139.38,139.86,140.34,140.82,141.3,141.78,142.26,142.74,143.22,143.7,144.18,144.66,145.16,145.62,146.1,146.58,147.06,147.5,147.96,148.42,148.86,149.28,149.72,150.16,150.64,151.12,151.6,152.1,152.58,153.04,153.54,154.02,154.48,154.96,155.44,155.94,156.42,156.9,157.38,157.86,158.34,158.8,159.28,159.78,160.26,160.74,161.22,161.7,162.16],
    genero: 'Bachata moderna / pop',
    anio: 2022,
    notaEstilo: 'Superéxito global de 2022 con producción muy pop; el fraseo relajado se presta a romper majao.',
    nivel: 'principiante',
  },
  {
    id: 'solo-conmigo',
    title: 'Solo Conmigo',
    artist: 'Romeo Santos',
    youtubeId: '69ppp5Ipook',
    bpm: 123,
    beatOffset: 0.12,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Solo-Conmigo-Romeo-Santos/22iCMlT0xYryKNnz4X5Vwn' },
    fuenteBeat: { nombre: 'Análisis propio sobre clip de 30s (Deezer)', url: 'https://www.deezer.com/track/1893035937' },
    experimental: true,
    genero: 'Bachata moderna',
    anio: 2022,
    notaEstilo: 'Bachata lenta y sensual de "Fórmula, Vol. 3"; el fraseo pausado se presta a majao.',
    nivel: 'intermedio',
  },
  {
    id: 'calumnia',
    title: 'Calumnia',
    artist: 'Carlos Rivera & Prince Royce',
    youtubeId: '7I5jAaO03pk',
    bpm: 140,
    beatOffset: 0.39,
    fuenteBpm: { nombre: 'Beatsource', url: 'https://www.beatsource.com/release/calumnia/1955440' },
    fuenteBeat: { nombre: 'Análisis propio sobre clip de 30s (Deezer)', url: 'https://www.deezer.com/track/2678656662' },
    experimental: true,
    genero: 'Bachata moderna',
    anio: 2024,
    notaEstilo: 'Colaboración reciente con tempo rápido y acento muy marcado: tiende a derecho.',
    nivel: 'avanzado',
  },
  {
    id: 'clavaito',
    title: 'Clavaíto',
    artist: 'Chanel & Abraham Mateo',
    youtubeId: 'RW58hNjQ_Bw',
    bpm: 133,
    beatOffset: 0.15,
    fuenteBpm: { nombre: 'Tunebat/Beatsource', url: 'https://www.beatsource.com/release/clavaito/1600022' },
    fuenteBeat: { nombre: 'Análisis propio sobre clip de 30s (Deezer)', url: 'https://www.deezer.com/track/2239757117' },
    experimental: true,
    genero: 'Bachata pop',
    anio: 2023,
    notaEstilo: 'Producción pop muy comercial (Eurovisión 2023-adyacente); fraseo con mucho aire, se presta a majao.',
    nivel: 'principiante',
  },
]

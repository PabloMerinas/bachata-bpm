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
    fuenteBeat: { nombre: 'Análisis propio sobre archivo completo (163s, mp3 propio)', url: 'https://www.youtube.com/watch?v=A7m8lQOMz1A' },
    notaCalibrado: 'A diferencia de la versión "preview 30s", aquí usamos los 328 beats reales detectados en toda la canción (no una fórmula aproximada), y el "1" está anclado en la posición del compás con más energía real medida (el acento más fuerte) en vez de en el primer beat detectado. Sigue siendo una estimación razonada, no una certeza absoluta — compáralas entre sí.',
    experimental: true,
    beatsAnclaIdx: 31,
    estructuraReal: [
      { inicio: 0, fin: 34, etiqueta: 'Intro + primer verso (energía baja/media, mucha voz)' },
      { inicio: 34, fin: 128, etiqueta: 'Cuerpo: energía alta, mezcla llena (verso/coro alternando)' },
      { inicio: 128, fin: 163, etiqueta: 'Cierre: energía cae, casi solo voz al final' },
    ],
    beatsCompletos: [0.71,1.19,1.67,2.15,2.63,3.12,3.6,4.08,4.555,5.03,5.505,5.98,6.48,6.96,7.44,7.91,8.4,8.84,9.31,9.83,10.29,10.76,11.25,11.73,12.21,12.68,13.15,13.64,14.13,14.61,15.09,15.56,15.99,16.53,17.02,17.49,17.97,18.45,18.93,19.4,19.89,20.38,20.88,21.33,21.81,22.3,22.76,23.23,23.82,24.44,24.92,25.39,25.87,26.35,26.84,27.31,27.79,28.28,28.76,29.23,29.71,30.2,30.65,31.15,31.63,32.12,32.6,33.07,33.55,34.03,34.51,34.99,35.47,35.95,36.44,36.905,37.37,37.87,38.36,38.83,39.32,39.79,40.27,40.76,41.23,41.71,42.19,42.68,43.16,43.63,44.11,44.6,45.07,45.56,46.04,46.52,46.99,47.47,47.96,48.44,48.91,49.39,49.87,50.35,50.83,51.31,51.8,52.28,52.75,53.24,53.72,54.2,54.68,55.15,55.63,56.12,56.6,57.07,57.55,58.04,58.52,58.99,59.47,59.96,60.44,60.91,61.39,61.88,62.35,62.83,63.32,63.8,64.28,64.75,65.23,65.72,66.2,66.67,67.15,67.64,68.12,68.6,69.07,69.56,70.04,70.52,71.02,71.48,71.93,72.415,72.9,73.4,73.88,74.36,74.84,75.32,75.81,76.27,76.76,77.24,77.71,78.2,78.68,79.17,79.64,80.12,80.59,81.09,81.56,82.04,82.52,82.99,83.46,83.95,84.43,84.91,85.395,85.88,86.36,86.83,87.31,87.79,88.27,88.75,89.23,89.7,90.18,90.66,91.14,91.63,92.11,92.59,93.07,93.55,94.04,94.52,94.99,95.48,95.95,96.43,96.9,97.39,97.86,98.37,98.84,99.31,99.8,100.27,100.75,101.23,101.71,102.2,102.67,103.15,103.63,104.12,104.59,105.07,105.55,106.03,106.51,107,107.48,107.95,108.43,108.91,109.4,109.87,110.35,110.83,111.31,111.79,112.27,112.75,113.24,113.72,114.2,114.68,115.16,115.64,116.12,116.6,117.07,117.56,118.04,118.51,118.99,119.48,119.96,120.43,120.91,121.4,121.88,122.35,122.83,123.32,123.79,124.27,124.76,125.24,125.72,126.19,126.67,127.16,127.64,128.11,128.59,129.07,129.56,130.03,130.52,130.998,131.476,131.954,132.432,132.91,133.41,133.89,134.38,134.86,135.33,135.81,136.29,136.77,137.243,137.717,138.19,138.68,139.163,139.647,140.13,140.6,141.085,141.57,142.05,142.52,143.005,143.49,143.97,144.44,144.92,145.4,145.88,146.358,146.836,147.314,147.792,148.27,148.75,149.23,149.71,150.19,150.67,151.15,151.63,152.11,152.59,153.07,153.55,154.03,154.51,154.99,155.47,155.95,156.43,156.91,157.39,157.87],
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

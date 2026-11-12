export type EstiloRotura = 'derecho' | 'majao' | 'ambos'

export interface Fuente {
  nombre: string
  url: string
}

export interface Song {
  id: string
  title: string
  artist: string
  youtubeId: string
  bpm: number
  fuenteBpm: Fuente
  genero: string
  anio: number
  estilo: EstiloRotura
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
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Propuesta-Indecente-Romeo-Santos/5PycBIeabfvX3n9ILG7Vrv' },
    genero: 'Bachata moderna',
    anio: 2014,
    estilo: 'majao',
    notaEstilo: 'El acento de la guira cae ligeramente retrasado respecto al bajo, por lo que mucha gente la siente más natural rompiendo majao.',
    nivel: 'intermedio',
  },
  {
    id: 'obsesion',
    title: 'Obsesión',
    artist: 'Aventura (ft. Judy Santos)',
    youtubeId: 'yC9u00F-NF0',
    bpm: 134,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Obsesion-Aventura/64sSpGnQG05qu54wTqfekE' },
    genero: 'Bachata clásica dominicana',
    anio: 2002,
    estilo: 'derecho',
    notaEstilo: 'Patrón de guira muy marcado en el tiempo fuerte: referencia clásica para practicar la rotura derecho.',
    nivel: 'principiante',
  },
  {
    id: 'darte-un-beso',
    title: 'Darte un Beso',
    artist: 'Prince Royce',
    youtubeId: 'bdOXnTbyk0g',
    bpm: 140,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Darte-un-Beso-Prince-Royce/6cJLfIqwh0tCKRjYM3WpZ5' },
    genero: 'Bachata moderna',
    anio: 2013,
    estilo: 'derecho',
    notaEstilo: 'Ritmo muy regular y rápido, buena referencia para subir de velocidad manteniendo la rotura derecho.',
    nivel: 'avanzado',
  },
  {
    id: 'bachata-rosa',
    title: 'Bachata Rosa',
    artist: 'Juan Luis Guerra 4.40',
    youtubeId: 'Hct_iDOt4D0',
    bpm: 116,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Bachata-Rosa-Juan-Luis-Guerra-4-40/5DAcQYhc2MurNpTHtX8kZ3' },
    genero: 'Bachata tradicional',
    anio: 1990,
    estilo: 'derecho',
    notaEstilo: 'Tempo más lento y tradicional, buena referencia histórica del género antes de la bachata urbana.',
    nivel: 'principiante',
  },
  {
    id: 'hasta-el-fin',
    title: 'Hasta el Fin',
    artist: 'Monchy & Alexandra',
    youtubeId: 'vf8pyXzwOgM',
    bpm: 125,
    fuenteBpm: { nombre: 'Shazam', url: 'https://www.shazam.com/en-us/song/178470677/hasta-el-fin' },
    genero: 'Bachata clásica dominicana',
    anio: 2004,
    estilo: 'derecho',
    notaEstilo: 'Tempo vivo con acentos muy claros, se baila casi siempre derecho en pista social.',
    nivel: 'intermedio',
  },
  {
    id: 'te-extrano',
    title: 'Te Extraño',
    artist: 'Xtreme',
    youtubeId: 'Spz1YgguUOM',
    bpm: 130,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Te-Extra-o-Bachata-Version-Xtreme/0muI8DpTEpLqqibPm3sKYf' },
    genero: 'Bachata moderna',
    anio: 2005,
    estilo: 'derecho',
    notaEstilo: 'De las más rápidas del repertorio clásico de salones: buena para trabajar velocidad de giro.',
    nivel: 'avanzado',
  },
  {
    id: 'tengo-un-amor',
    title: 'Tengo un Amor',
    artist: 'Toby Love',
    youtubeId: 'jioYwyg3lmo',
    bpm: 134,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Tengo-un-Amor-Toby-Love/5q9ZLBQHuaQd8juV2MtYzc' },
    genero: 'Bachata moderna / urbana',
    anio: 2006,
    estilo: 'derecho',
    notaEstilo: 'Base muy marcada y constante, ideal para automatizar el paso básico derecho.',
    nivel: 'principiante',
  },
  {
    id: 'be-my-baby',
    title: 'Be My Baby',
    artist: 'Leslie Grace',
    youtubeId: 'WcUgA5-UN20',
    bpm: 133,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Be-My-Baby-Leslie-Grace/4Ij0WiYuPR4a1XGCmLBwXX' },
    genero: 'Bachata pop',
    anio: 2012,
    estilo: 'majao',
    notaEstilo: 'La producción pop desplaza el acento percusivo: muchos instructores la usan para introducir el majao.',
    nivel: 'intermedio',
  },
  {
    id: 'eres-mia',
    title: 'Eres Mía',
    artist: 'Romeo Santos',
    youtubeId: '8iPcqtHoR3U',
    bpm: 123,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Eres-M-a-Romeo-Santos/6I86RF3odBlcuZA9Vfjzeq' },
    genero: 'Bachata sensual',
    anio: 2014,
    estilo: 'majao',
    notaEstilo: 'Fraseo sensual con pausas: se presta a jugar con la rotura majao y cambios de dirección.',
    nivel: 'avanzado',
  },
  {
    id: 'stand-by-me',
    title: 'Stand By Me',
    artist: 'Prince Royce',
    youtubeId: 'PPgQ4nDLh0s',
    bpm: 128,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Stand-by-Me-Prince-Royce/0DQd0tWurMHUAv0cMnDELH' },
    genero: 'Bachata moderna',
    anio: 2010,
    estilo: 'derecho',
    notaEstilo: 'Estructura muy predecible, cómoda para practicar musicalidad básica antes de complicarse con majao.',
    nivel: 'principiante',
  },
  {
    id: 'hermanita',
    title: 'Hermanita',
    artist: 'Aventura',
    youtubeId: 'mVYQSAm8hB0',
    bpm: 126,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/Hermanita-Aventura/6ExIo2QuQcqkJKYRIfNtNE' },
    genero: 'Bachata clásica dominicana',
    anio: 2003,
    estilo: 'derecho',
    notaEstilo: 'Guira muy presente y directa: referencia clara de rotura derecho a tempo medio-alto.',
    nivel: 'intermedio',
  },
  {
    id: 'you',
    title: 'You',
    artist: 'Romeo Santos',
    youtubeId: 'ElU-VcWEhRU',
    bpm: 132,
    fuenteBpm: { nombre: 'Tunebat', url: 'https://tunebat.com/Info/You-Romeo-Santos/1sQrCwV8vvtYLqa0KQlwE9' },
    genero: 'Bachata moderna',
    anio: 2012,
    estilo: 'majao',
    notaEstilo: 'Fraseo con mucho aire entre frases, típico de la bachata sensual donde el majao se siente más cómodo.',
    nivel: 'intermedio',
  },
]

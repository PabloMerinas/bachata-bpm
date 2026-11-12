import type { EstiloRotura } from '../data/songs'

export type TipoSeccion = 'intro' | 'verso' | 'coro' | 'mambo' | 'final'

export interface Seccion {
  tipo: TipoSeccion
  etiqueta: string
  inicio: number // segundos
  fin: number // segundos
  estilo: EstiloRotura | 'mambo'
}

const PLANTILLA: Array<{ tipo: TipoSeccion; etiqueta: string; pct: number }> = [
  { tipo: 'intro', etiqueta: 'Intro', pct: 0.08 },
  { tipo: 'verso', etiqueta: 'Verso 1', pct: 0.17 },
  { tipo: 'coro', etiqueta: 'Coro', pct: 0.15 },
  { tipo: 'verso', etiqueta: 'Verso 2', pct: 0.15 },
  { tipo: 'coro', etiqueta: 'Coro', pct: 0.15 },
  { tipo: 'mambo', etiqueta: 'Puente / mambo', pct: 0.12 },
  { tipo: 'coro', etiqueta: 'Coro final', pct: 0.13 },
  { tipo: 'final', etiqueta: 'Salida', pct: 0.05 },
]

/**
 * Genera una estructura orientativa y proporcional a la duración real del vídeo,
 * siguiendo la anatomía típica de un tema de bachata (intro - versos - coros -
 * puente/mambo instrumental - coro final). No está verificada compás a compás
 * contra la grabación: es una plantilla para ubicarte, no una transcripción.
 */
export function generarEstructura(duracionSeg: number, estiloBase: EstiloRotura): Seccion[] {
  let acumulado = 0
  return PLANTILLA.map((parte) => {
    const inicio = acumulado
    const duracionParte = duracionSeg * parte.pct
    acumulado += duracionParte
    const estilo: Seccion['estilo'] = parte.tipo === 'mambo' ? 'mambo' : estiloBase
    return {
      tipo: parte.tipo,
      etiqueta: parte.etiqueta,
      inicio,
      fin: acumulado,
      estilo,
    }
  })
}

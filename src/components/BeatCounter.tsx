interface BeatCounterProps {
  bpm: number
  currentTime: number
  offset: number
  defaultOffset: number
  onOffsetChange: (offset: number) => void
  /** Beats reales de toda la canción (si existen, se usan en vez de la fórmula aproximada). */
  beatsCompletos?: number[]
  /** Índice dentro de beatsCompletos que se considera el "1". */
  beatsAnclaIdx?: number
}

function indiceBeatMasCercano(beats: number[], t: number): number {
  let lo = 0
  let hi = beats.length - 1
  if (t < beats[0]) return -1
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2)
    if (beats[mid] <= t) lo = mid
    else hi = mid - 1
  }
  return lo
}

export function BeatCounter({
  bpm,
  currentTime,
  offset,
  defaultOffset,
  onOffsetChange,
  beatsCompletos,
  beatsAnclaIdx,
}: BeatCounterProps) {
  let count: number

  if (beatsCompletos && beatsCompletos.length > 0 && beatsAnclaIdx !== undefined) {
    const tAjustado = currentTime - offset
    const idx = indiceBeatMasCercano(beatsCompletos, tAjustado)
    count = idx === -1 ? 1 : (((idx - beatsAnclaIdx) % 8) + 8) % 8 + 1
  } else {
    const beatDuration = 60 / bpm
    const elapsed = Math.max(0, currentTime - offset)
    const beatIndex = Math.floor(elapsed / beatDuration)
    count = ((beatIndex % 8) + 8) % 8 + 1
  }

  const esToque = count === 4 || count === 8
  const esValorReal = Math.abs(offset - defaultOffset) < 0.001

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-2xl font-bold transition-colors ${
          esToque
            ? 'border-rose-400 bg-rose-500/20 text-rose-200'
            : 'border-white/20 bg-white/5 text-white/80'
        }`}
      >
        {count}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-white/70">Tiempo en el compás</span>
        <span className="text-xs text-white/40">
          {esToque ? 'Toque / rotura típica (4 y 8)' : 'Paso base'}
          {beatsCompletos && ' · usando beats reales de toda la canción'}
        </span>
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <span className="text-xs text-white/40">
          {esValorReal ? '"1" = beat real medido' : '"1" calibrado a mano'}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onOffsetChange(offset - 0.05)}
            className="rounded-md border border-white/15 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
          >
            −0.05s
          </button>
          <span className="w-16 text-center font-mono text-xs text-white/50">{offset.toFixed(2)}s</span>
          <button
            onClick={() => onOffsetChange(offset + 0.05)}
            className="rounded-md border border-white/15 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
          >
            +0.05s
          </button>
          {!esValorReal && (
            <button
              onClick={() => onOffsetChange(defaultOffset)}
              className="ml-1 rounded-md border border-sky-500/30 px-2 py-1 text-xs text-sky-300 hover:bg-sky-500/10"
            >
              Restablecer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

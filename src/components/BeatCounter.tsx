interface BeatCounterProps {
  bpm: number
  currentTime: number
  offset: number
  onOffsetChange: (offset: number) => void
}

export function BeatCounter({ bpm, currentTime, offset, onOffsetChange }: BeatCounterProps) {
  const beatDuration = 60 / bpm
  const elapsed = Math.max(0, currentTime - offset)
  const beatIndex = Math.floor(elapsed / beatDuration)
  const count = ((beatIndex % 8) + 8) % 8 + 1
  const esToque = count === 4 || count === 8

  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
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
        </span>
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <span className="text-xs text-white/40">Calibrar inicio del 1</span>
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
        </div>
      </div>
    </div>
  )
}

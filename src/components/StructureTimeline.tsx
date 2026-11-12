import type { SeccionReal } from '../data/songs'

const COLORS = ['bg-slate-500/60 hover:bg-slate-400/80', 'bg-rose-500/60 hover:bg-rose-400/80', 'bg-sky-500/60 hover:bg-sky-400/80']

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface StructureTimelineProps {
  secciones: SeccionReal[]
  duracion: number
  currentTime: number
  onSeek: (seconds: number) => void
}

export function StructureTimeline({ secciones, duracion, currentTime, onSeek }: StructureTimelineProps) {
  const playheadPct = Math.min(100, (currentTime / duracion) * 100)

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-white/50">Estructura real (detectada por audio)</span>
      <div className="relative flex h-8 w-full overflow-hidden rounded-lg border border-white/10">
        {secciones.map((s, i) => (
          <button
            key={i}
            title={`${s.etiqueta} (${formatTime(s.inicio)}-${formatTime(s.fin)})`}
            onClick={() => onSeek(s.inicio)}
            className={`group relative h-full transition ${COLORS[i % COLORS.length]}`}
            style={{ width: `${((s.fin - s.inicio) / duracion) * 100}%` }}
          >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center truncate px-1 text-[10px] font-medium text-black/70 opacity-0 group-hover:opacity-100">
              {formatTime(s.inicio)}
            </span>
          </button>
        ))}
        <div
          className="pointer-events-none absolute top-0 h-full w-0.5 bg-white"
          style={{ left: `${playheadPct}%` }}
        />
      </div>
      <p className="text-[11px] text-white/35">
        Tramos reales detectados por cambios de energía, proporción de voz y textura espectral en
        el archivo completo — no indican si ahí se baila derecho, majao o mambo (eso no es
        medible). Pasa el ratón o haz clic para saltar a cada tramo.
      </p>
    </div>
  )
}

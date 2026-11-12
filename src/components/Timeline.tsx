import type { Seccion } from '../lib/estructura'

const COLOR: Record<Seccion['estilo'], string> = {
  derecho: 'bg-amber-500/60 hover:bg-amber-400/80',
  majao: 'bg-fuchsia-500/60 hover:bg-fuchsia-400/80',
  ambos: 'bg-sky-500/60 hover:bg-sky-400/80',
  mambo: 'bg-teal-500/60 hover:bg-teal-400/80',
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface TimelineProps {
  secciones: Seccion[]
  duracion: number
  currentTime: number
  onSeek: (seconds: number) => void
}

export function Timeline({ secciones, duracion, currentTime, onSeek }: TimelineProps) {
  if (duracion <= 0) return null
  const playheadPct = Math.min(100, (currentTime / duracion) * 100)

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex h-8 w-full overflow-hidden rounded-lg border border-white/10">
        {secciones.map((s, i) => (
          <button
            key={i}
            title={`${s.etiqueta} (${formatTime(s.inicio)} - ${formatTime(s.fin)})`}
            onClick={() => onSeek(s.inicio)}
            className={`group relative h-full transition ${COLOR[s.estilo]}`}
            style={{ width: `${((s.fin - s.inicio) / duracion) * 100}%` }}
          >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center truncate px-1 text-[10px] font-medium text-black/70 opacity-0 group-hover:opacity-100">
              {s.etiqueta}
            </span>
          </button>
        ))}
        <div
          className="pointer-events-none absolute top-0 h-full w-0.5 bg-white"
          style={{ left: `${playheadPct}%` }}
        />
      </div>
      <p className="text-[11px] text-white/35">
        Estructura orientativa generada proporcionalmente a la duración del vídeo
        (intro · versos · coros · puente/mambo · final) — no verificada compás a compás.
        Haz clic en una sección para saltar ahí.
      </p>
    </div>
  )
}

import type { Song } from '../data/songs'
import { BeatDot } from './BeatDot'

interface SongCardProps {
  song: Song
  onOpen: (song: Song) => void
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

const NIVEL_LABEL: Record<Song['nivel'], string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

export function SongCard({ song, onOpen, isFavorite, onToggleFavorite }: SongCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-0.5 hover:border-rose-500/40 hover:bg-white/[0.06]">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(song.id)
        }}
        aria-label={isFavorite ? `Quitar ${song.title} de favoritos` : `Añadir ${song.title} a favoritos`}
        aria-pressed={isFavorite}
        className={`absolute right-4 top-4 text-lg transition ${
          isFavorite ? 'text-amber-300' : 'text-white/20 hover:text-white/50'
        }`}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <button
        onClick={() => onOpen(song)}
        aria-label={`Abrir ${song.title} de ${song.artist}, ${song.bpm} BPM`}
        className="flex flex-col gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-xl"
      >
        <div className="flex items-start justify-between gap-3 pr-6">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-semibold text-white leading-snug">{song.title}</h3>
              {song.experimental && (
                <span
                  title="Beat calculado con un clip de 30s, puede estar desalineado"
                  className="rounded-full border border-orange-500/40 bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-medium text-orange-300"
                >
                  Experimental
                </span>
              )}
            </div>
            <p className="text-sm text-white/55">{song.artist}</p>
          </div>
          <BeatDot bpm={song.bpm} running={false} />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-0.5 text-xs font-mono text-rose-300">
            {song.bpm} BPM
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/50">
            {NIVEL_LABEL[song.nivel]}
          </span>
        </div>

        <p className="text-xs text-white/40">{song.genero} · {song.anio}</p>
      </button>
    </div>
  )
}

import type { Song } from '../data/songs'
import { StylePill } from './StylePill'
import { BeatDot } from './BeatDot'

interface SongCardProps {
  song: Song
  onOpen: (song: Song) => void
}

const NIVEL_LABEL: Record<Song['nivel'], string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

export function SongCard({ song, onOpen }: SongCardProps) {
  return (
    <button
      onClick={() => onOpen(song)}
      className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-0.5 hover:border-rose-500/40 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white leading-snug">{song.title}</h3>
          <p className="text-sm text-white/55">{song.artist}</p>
        </div>
        <BeatDot bpm={song.bpm} running={false} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-0.5 text-xs font-mono text-rose-300">
          {song.bpm} BPM
        </span>
        <StylePill estilo={song.estilo} />
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/50">
          {NIVEL_LABEL[song.nivel]}
        </span>
      </div>

      <p className="text-xs text-white/40">{song.genero} · {song.anio}</p>
    </button>
  )
}

import { useEffect, useState } from 'react'
import type { Song } from '../data/songs'
import { StylePill } from './StylePill'
import { Metronome } from './Metronome'
import { VideoPlayer, type VideoPlayerHandle } from './VideoPlayer'
import { BeatCounter } from './BeatCounter'
import { PracticeTools } from './PracticeTools'

interface SongModalProps {
  song: Song
  onClose: () => void
}

function offsetKey(songId: string) {
  return `bachatabpm:offset:${songId}`
}

export function SongModal({ song, onClose }: SongModalProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [offset, setOffset] = useState(() => {
    const stored = localStorage.getItem(offsetKey(song.id))
    return stored ? Number(stored) : 0
  })
  const [player, setPlayer] = useState<VideoPlayerHandle | null>(null)

  useEffect(() => {
    localStorage.setItem(offsetKey(song.id), String(offset))
  }, [offset, song.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1b1016] p-4 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">{song.title}</h2>
            <p className="text-sm text-white/55 sm:text-base">{song.artist} · {song.genero} · {song.anio}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/10 px-3 py-1 text-white/60 hover:bg-white/10 hover:text-white"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4">
          <VideoPlayer
            youtubeId={song.youtubeId}
            onTimeUpdate={setCurrentTime}
            onDuration={() => {}}
            onReady={setPlayer}
          />
        </div>

        <div className="mt-4">
          <PracticeTools player={player} currentTime={currentTime} />
        </div>

        <div className="mt-4">
          <BeatCounter
            bpm={song.bpm}
            currentTime={currentTime}
            offset={offset}
            onOffsetChange={setOffset}
          />
        </div>

        <div className="mt-4">
          <Metronome bpm={song.bpm} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StylePill estilo={song.estilo} />
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/50">
            Nivel: {song.nivel}
          </span>
          <a
            href={song.fuenteBpm.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-300 hover:bg-emerald-500/20"
          >
            BPM real · fuente: {song.fuenteBpm.nombre} ↗
          </a>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/70">{song.notaEstilo}</p>

        <p className="mt-4 text-xs text-white/35">
          El BPM es un dato real tomado de una base de datos pública de análisis de audio (enlace
          arriba); puede variar ±1-2 BPM entre bases de datos distintas. El estilo de rotura
          (derecho/majao) es una sugerencia pedagógica, no una propiedad medible del audio —
          contrástala siempre con tu instructor. El contador de tiempo asume que el BPM es
          correcto; usa la calibración si el "1" no coincide con el acento real. La reproducción
          se hace vía YouTube, el audio no se aloja en esta web.
        </p>
      </div>
    </div>
  )
}

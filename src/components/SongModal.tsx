import { useEffect } from 'react'
import type { Song } from '../data/songs'
import { StylePill } from './StylePill'
import { Metronome } from './Metronome'

interface SongModalProps {
  song: Song
  onClose: () => void
}

export function SongModal({ song, onClose }: SongModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#1b1016] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">{song.title}</h2>
            <p className="text-white/55">{song.artist} · {song.genero} · {song.anio}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-1 text-white/60 hover:bg-white/10 hover:text-white"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${song.youtubeId}`}
            title={`${song.title} - ${song.artist}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-5">
          <Metronome bpm={song.bpm} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StylePill estilo={song.estilo} />
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/50">
            Nivel: {song.nivel}
          </span>
          {song.bpmEstimado && (
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/40">
              BPM estimado
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/70">{song.notaEstilo}</p>

        <p className="mt-4 text-xs text-white/35">
          El BPM y el estilo de rotura son orientativos, pensados como punto de partida para practicar —
          no sustituyen lo que te diga tu instructor. La reproducción se hace vía YouTube, el audio no se
          aloja en esta web.
        </p>
      </div>
    </div>
  )
}

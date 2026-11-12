import { useEffect, useMemo, useRef, useState } from 'react'
import type { Song } from '../data/songs'
import { StylePill } from './StylePill'
import { Metronome } from './Metronome'
import { VideoPlayer } from './VideoPlayer'
import { BeatCounter } from './BeatCounter'
import { Timeline } from './Timeline'
import { generarEstructura } from '../lib/estructura'

interface SongModalProps {
  song: Song
  onClose: () => void
}

function offsetKey(songId: string) {
  return `bachatabpm:offset:${songId}`
}

export function SongModal({ song, onClose }: SongModalProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [offset, setOffset] = useState(() => {
    const stored = localStorage.getItem(offsetKey(song.id))
    return stored ? Number(stored) : 0
  })
  const seekToRef = useRef<((seconds: number) => void) | null>(null)

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

  const secciones = useMemo(
    () => (duration > 0 ? generarEstructura(duration, song.estilo) : []),
    [duration, song.estilo],
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1b1016] p-6 shadow-2xl"
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

        <div className="mt-4">
          <VideoPlayer
            youtubeId={song.youtubeId}
            onTimeUpdate={setCurrentTime}
            onDuration={setDuration}
            seekToRef={seekToRef}
          />
        </div>

        {secciones.length > 0 && (
          <div className="mt-4">
            <Timeline
              secciones={secciones}
              duracion={duration}
              currentTime={currentTime}
              onSeek={(s) => seekToRef.current?.(s)}
            />
          </div>
        )}

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
          {song.bpmEstimado && (
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/40">
              BPM estimado
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/70">{song.notaEstilo}</p>

        <p className="mt-4 text-xs text-white/35">
          El BPM, el estilo de rotura y la estructura son orientativos, pensados como punto de
          partida para practicar — no sustituyen lo que te diga tu instructor. El contador de
          tiempo asume que el BPM es correcto; usa la calibración si el "1" no coincide con el
          acento real de la canción. La reproducción se hace vía YouTube, el audio no se aloja en
          esta web.
        </p>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import type { Song } from '../data/songs'
import { Metronome } from './Metronome'
import { VideoPlayer, type VideoPlayerHandle } from './VideoPlayer'
import { BeatCounter } from './BeatCounter'
import { PracticeTools } from './PracticeTools'
import { StructureTimeline } from './StructureTimeline'

interface SongModalProps {
  song: Song
  onClose: () => void
}

function offsetKey(songId: string) {
  return `bachatabpm:offset:${songId}`
}

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function SongModal({ song, onClose }: SongModalProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [offset, setOffset] = useState(() => {
    const stored = localStorage.getItem(offsetKey(song.id))
    return stored ? Number(stored) : song.beatOffset
  })
  const [player, setPlayer] = useState<VideoPlayerHandle | null>(null)
  const [copied, setCopied] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<Element | null>(null)

  useEffect(() => {
    localStorage.setItem(offsetKey(song.id), String(offset))
  }, [offset, song.id])

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    closeButtonRef.current?.focus()
    return () => {
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus()
      }
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="song-modal-title"
        className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1b1016] p-4 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="song-modal-title" className="text-xl font-semibold text-white sm:text-2xl">
                {song.title}
              </h2>
              {song.experimental && (
                <span className="rounded-full border border-orange-500/40 bg-orange-500/15 px-2 py-0.5 text-xs font-medium text-orange-300">
                  Experimental
                </span>
              )}
            </div>
            <p className="text-sm text-white/55 sm:text-base">{song.artist} · {song.genero} · {song.anio}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={copyLink}
              aria-label="Copiar enlace directo a esta canción"
              className="rounded-lg border border-white/10 px-3 py-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              {copied ? '¡Copiado!' : 'Compartir'}
            </button>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Cerrar ficha de la canción"
              className="rounded-lg border border-white/10 px-3 py-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="relative mt-4">
          <VideoPlayer
            youtubeId={song.youtubeId}
            onTimeUpdate={setCurrentTime}
            onDuration={setDuration}
            onReady={setPlayer}
          />
          <div className="pointer-events-none absolute bottom-2 right-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-xs text-white/70 backdrop-blur-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {song.estructuraReal && duration > 0 && (
          <div className="mt-4">
            <StructureTimeline
              secciones={song.estructuraReal}
              duracion={duration}
              currentTime={currentTime}
              onSeek={(s) => player?.seekTo(s)}
            />
          </div>
        )}

        <div className="mt-4">
          <PracticeTools player={player} currentTime={currentTime} />
        </div>

        <div className="mt-4">
          <BeatCounter
            bpm={song.bpm}
            currentTime={currentTime}
            offset={offset}
            defaultOffset={song.beatOffset}
            beatsCompletos={song.beatsCompletos}
            beatsAnclaIdx={song.beatsAnclaIdx}
            onOffsetChange={setOffset}
          />
        </div>

        <div className="mt-4">
          <Metronome bpm={song.bpm} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
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
          <a
            href={song.fuenteBeat.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full border px-2.5 py-0.5 text-xs ${
              song.experimental
                ? 'border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20'
                : 'border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20'
            }`}
          >
            Beat {song.experimental ? 'experimental' : 'real'} · fuente: {song.fuenteBeat.nombre} ↗
          </a>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/70">{song.notaEstilo}</p>

        {song.experimental && (
          <p className="mt-2 rounded-lg border border-orange-500/20 bg-orange-500/5 px-3 py-2 text-xs text-orange-200/80">
            ⚠ Experimental: el offset de esta canción no viene de AcousticBrainz (no tiene
            cobertura por ser posterior a 2022) sino de un análisis de audio propio nuestro. En
            nuestras pruebas este método acierta la mayoría de las veces pero no siempre — el
            detalle de qué se analizó exactamente está debajo. Verifícalo de oído con la
            calibración antes de confiar en él.
          </p>
        )}

        {song.notaCalibrado && (
          <p className="mt-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-200/80">
            ⚠ {song.notaCalibrado}
          </p>
        )}

        <p className="mt-4 text-xs text-white/35">
          El BPM y el instante inicial del "1" (offset) son datos reales: el BPM viene citado de
          una base de datos pública de audio y el offset se calculó analizando el beat real de la
          grabación (AcousticBrainz, o análisis propio en las marcadas como experimentales — enlaces
          arriba) — no es una suposición a 0. Aun así puede no encajar exactamente con el vídeo
          embebido si usa una mezcla o edición distinta a la analizada; por eso la calibración
          manual sigue disponible. La nota de arriba sobre derecho/majao es solo una sugerencia
          orientativa para un momento concreto de la canción — en la práctica una misma canción
          puede combinar ambos varias veces, así que no la tomes como una etiqueta fija de toda la
          canción; contrástalo siempre con tu instructor. La reproducción se hace vía YouTube, el
          audio no se aloja en esta web.
        </p>
      </div>
    </div>
  )
}

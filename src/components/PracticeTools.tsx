import { useEffect, useState } from 'react'
import type { VideoPlayerHandle } from './VideoPlayer'

const SPEEDS = [0.5, 0.75, 0.9, 1]

interface PracticeToolsProps {
  player: VideoPlayerHandle | null
  currentTime: number
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function PracticeTools({ player, currentTime }: PracticeToolsProps) {
  const [speed, setSpeed] = useState(1)
  const [loopStart, setLoopStart] = useState<number | null>(null)
  const [loopEnd, setLoopEnd] = useState<number | null>(null)
  const [looping, setLooping] = useState(false)

  useEffect(() => {
    player?.setPlaybackRate(speed)
  }, [speed, player])

  useEffect(() => {
    if (!looping || loopStart === null || loopEnd === null || !player) return
    if (currentTime >= loopEnd || currentTime < loopStart - 0.5) {
      player.seekTo(loopStart)
    }
  }, [currentTime, looping, loopStart, loopEnd, player])

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-white/50">Velocidad</span>
        <div className="flex gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-md px-2.5 py-1 text-xs font-mono transition ${
                speed === s ? 'bg-rose-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
        <span className="text-[11px] text-white/35">
          Baja la velocidad para automatizar un paso difícil sin perder el conteo.
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-3">
        <span className="text-xs text-white/50">Bucle A-B</span>
        <button
          onClick={() => setLoopStart(currentTime)}
          className="rounded-md border border-white/15 px-2.5 py-1 text-xs text-white/70 hover:bg-white/10"
        >
          Marcar inicio {loopStart !== null && `(${formatTime(loopStart)})`}
        </button>
        <button
          onClick={() => setLoopEnd(currentTime)}
          className="rounded-md border border-white/15 px-2.5 py-1 text-xs text-white/70 hover:bg-white/10"
        >
          Marcar fin {loopEnd !== null && `(${formatTime(loopEnd)})`}
        </button>
        <button
          disabled={loopStart === null || loopEnd === null || loopStart >= loopEnd}
          onClick={() => setLooping((v) => !v)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-30 ${
            looping ? 'bg-rose-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          {looping ? 'Bucle activo' : 'Practicar en bucle'}
        </button>
        {(loopStart !== null || loopEnd !== null) && (
          <button
            onClick={() => {
              setLoopStart(null)
              setLoopEnd(null)
              setLooping(false)
            }}
            className="text-xs text-white/35 hover:text-white/60"
          >
            Borrar marcas
          </button>
        )}
      </div>
    </div>
  )
}

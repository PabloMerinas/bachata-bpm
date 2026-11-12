import { useEffect, useRef, useState } from 'react'
import { BeatDot } from './BeatDot'

interface MetronomeProps {
  bpm: number
}

export function Metronome({ bpm }: MetronomeProps) {
  const [running, setRunning] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<number | null>(null)

  const playClick = () => {
    if (!audioCtxRef.current) return
    const ctx = audioCtxRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.frequency.value = 1000
    gain.gain.value = 0.15
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)
    osc.stop(ctx.currentTime + 0.08)
  }

  const toggle = () => {
    if (running) {
      setRunning(false)
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      return
    }
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    setRunning(true)
    playClick()
    intervalRef.current = window.setInterval(playClick, (60 / bpm) * 1000)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      audioCtxRef.current?.close()
    }
  }, [])

  useEffect(() => {
    if (running && intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = window.setInterval(playClick, (60 / bpm) * 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm])

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
      <BeatDot bpm={bpm} running={running} size="lg" />
      <div className="flex flex-col">
        <span className="font-mono text-lg text-white">{bpm} BPM</span>
        <span className="text-xs text-white/50">Metrónomo de referencia</span>
      </div>
      <button
        onClick={toggle}
        className={`ml-auto rounded-lg px-4 py-2 text-sm font-medium transition ${
          running
            ? 'bg-rose-600 text-white hover:bg-rose-500'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        {running ? 'Detener' : 'Reproducir clic'}
      </button>
    </div>
  )
}

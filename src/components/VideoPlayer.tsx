import { useEffect, useRef, useState } from 'react'
import { loadYouTubeApi } from '../lib/youtube'

export interface VideoPlayerHandle {
  seekTo: (seconds: number) => void
  setPlaybackRate: (rate: number) => void
  getCurrentTime: () => number
}

interface VideoPlayerProps {
  youtubeId: string
  onTimeUpdate: (currentTime: number) => void
  onDuration: (duration: number) => void
  onReady?: (handle: VideoPlayerHandle) => void
}

export function VideoPlayer({ youtubeId, onTimeUpdate, onDuration, onReady }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const rafRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    loadYouTubeApi().then(() => {
      if (cancelled || !containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeId,
        playerVars: { rel: 0 },
        events: {
          onReady: () => {
            if (cancelled) return
            setReady(true)
            const duration = playerRef.current.getDuration()
            if (duration) onDuration(duration)

            onReady?.({
              seekTo: (seconds: number) => playerRef.current?.seekTo(seconds, true),
              setPlaybackRate: (rate: number) => playerRef.current?.setPlaybackRate(rate),
              getCurrentTime: () => playerRef.current?.getCurrentTime?.() ?? 0,
            })

            const tick = () => {
              if (playerRef.current?.getCurrentTime) {
                onTimeUpdate(playerRef.current.getCurrentTime())
                const d = playerRef.current.getDuration()
                if (d) onDuration(d)
              }
              rafRef.current = requestAnimationFrame(tick)
            }
            tick()
          },
        },
      })
    })

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      playerRef.current?.destroy?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [youtubeId])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      <div ref={containerRef} className="h-full w-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/40">
          Cargando reproductor…
        </div>
      )}
    </div>
  )
}

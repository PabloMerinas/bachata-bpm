interface BeatDotProps {
  bpm: number
  running: boolean
  size?: 'sm' | 'lg'
}

export function BeatDot({ bpm, running, size = 'sm' }: BeatDotProps) {
  const beatDuration = 60 / bpm
  const dims = size === 'lg' ? 'w-10 h-10' : 'w-3 h-3'

  return (
    <div className={`relative ${dims} flex items-center justify-center`}>
      <div
        className={`${dims} rounded-full bg-rose-500 ${running ? 'beat-dot' : 'opacity-60'}`}
        style={running ? ({ '--beat-duration': `${beatDuration}s` } as React.CSSProperties) : undefined}
      />
    </div>
  )
}

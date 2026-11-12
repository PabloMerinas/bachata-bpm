import type { EstiloRotura } from '../data/songs'

const LABELS: Record<EstiloRotura, { text: string; classes: string }> = {
  derecho: { text: 'Derecho', classes: 'bg-amber-500/15 text-amber-300 border-amber-500/40' },
  majao: { text: 'Majao', classes: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40' },
  ambos: { text: 'Derecho / Majao', classes: 'bg-sky-500/15 text-sky-300 border-sky-500/40' },
}

export function StylePill({ estilo }: { estilo: EstiloRotura }) {
  const { text, classes } = LABELS[estilo]
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${classes}`}>
      {text}
    </span>
  )
}

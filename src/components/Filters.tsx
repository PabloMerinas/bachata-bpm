import type { EstiloRotura, Song } from '../data/songs'

export type Orden = 'titulo' | 'bpm-asc' | 'bpm-desc'

export interface FilterState {
  query: string
  estilo: EstiloRotura | 'todos'
  nivel: Song['nivel'] | 'todos'
  artista: string
  bpmMin: number
  bpmMax: number
  soloFavoritos: boolean
  orden: Orden
}

interface FiltersProps {
  value: FilterState
  onChange: (value: FilterState) => void
  artistas: string[]
}

export function Filters({ value, onChange, artistas }: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <label htmlFor="buscar" className="sr-only">
        Buscar canción o artista
      </label>
      <input
        id="buscar"
        type="text"
        placeholder="Buscar canción o artista..."
        value={value.query}
        onChange={(e) => onChange({ ...value, query: e.target.value })}
        className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-white placeholder-white/35 outline-none focus:border-rose-500/60"
      />

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="estilo" className="text-xs text-white/50">
            Estilo de rotura
          </label>
          <select
            id="estilo"
            value={value.estilo}
            onChange={(e) => onChange({ ...value, estilo: e.target.value as FilterState['estilo'] })}
            className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-rose-500/60"
          >
            <option value="todos">Todos</option>
            <option value="derecho">Derecho</option>
            <option value="majao">Majao</option>
            <option value="ambos">Derecho / Majao</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="artista" className="text-xs text-white/50">
            Cantante
          </label>
          <select
            id="artista"
            value={value.artista}
            onChange={(e) => onChange({ ...value, artista: e.target.value })}
            className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-rose-500/60"
          >
            <option value="todos">Todos</option>
            {artistas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nivel" className="text-xs text-white/50">
            Nivel
          </label>
          <select
            id="nivel"
            value={value.nivel}
            onChange={(e) => onChange({ ...value, nivel: e.target.value as FilterState['nivel'] })}
            className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-rose-500/60"
          >
            <option value="todos">Todos</option>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="orden" className="text-xs text-white/50">
            Ordenar por
          </label>
          <select
            id="orden"
            value={value.orden}
            onChange={(e) => onChange({ ...value, orden: e.target.value as Orden })}
            className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-rose-500/60"
          >
            <option value="titulo">Título</option>
            <option value="bpm-asc">BPM (menor a mayor)</option>
            <option value="bpm-desc">BPM (mayor a menor)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/50" id="bpm-range-label">
            BPM entre {value.bpmMin} y {value.bpmMax}
          </span>
          <div className="flex items-center gap-2" role="group" aria-labelledby="bpm-range-label">
            <input
              type="range"
              min={100}
              max={150}
              value={value.bpmMin}
              aria-label="BPM mínimo"
              onChange={(e) => onChange({ ...value, bpmMin: Math.min(Number(e.target.value), value.bpmMax) })}
              className="accent-rose-500"
            />
            <input
              type="range"
              min={100}
              max={150}
              value={value.bpmMax}
              aria-label="BPM máximo"
              onChange={(e) => onChange({ ...value, bpmMax: Math.max(Number(e.target.value), value.bpmMin) })}
              className="accent-rose-500"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 self-end pb-1 text-sm text-white/60">
          <input
            type="checkbox"
            checked={value.soloFavoritos}
            onChange={(e) => onChange({ ...value, soloFavoritos: e.target.checked })}
            className="accent-rose-500"
          />
          Solo favoritos ★
        </label>
      </div>
    </div>
  )
}

import type { EstiloRotura, Song } from '../data/songs'

export interface FilterState {
  query: string
  estilo: EstiloRotura | 'todos'
  nivel: Song['nivel'] | 'todos'
  bpmMin: number
  bpmMax: number
}

interface FiltersProps {
  value: FilterState
  onChange: (value: FilterState) => void
}

export function Filters({ value, onChange }: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <input
        type="text"
        placeholder="Buscar canción o artista..."
        value={value.query}
        onChange={(e) => onChange({ ...value, query: e.target.value })}
        className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-white placeholder-white/35 outline-none focus:border-rose-500/60"
      />

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/50">Estilo de rotura</label>
          <select
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
          <label className="text-xs text-white/50">Nivel</label>
          <select
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
          <label className="text-xs text-white/50">
            BPM entre {value.bpmMin} y {value.bpmMax}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={100}
              max={150}
              value={value.bpmMin}
              onChange={(e) => onChange({ ...value, bpmMin: Math.min(Number(e.target.value), value.bpmMax) })}
              className="accent-rose-500"
            />
            <input
              type="range"
              min={100}
              max={150}
              value={value.bpmMax}
              onChange={(e) => onChange({ ...value, bpmMax: Math.max(Number(e.target.value), value.bpmMin) })}
              className="accent-rose-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

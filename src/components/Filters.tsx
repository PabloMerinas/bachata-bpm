import type { Song } from '../data/songs'

export type Orden = 'titulo' | 'bpm-asc' | 'bpm-desc'

export interface FilterState {
  query: string
  nivel: Song['nivel'] | 'todos'
  artista: string
  bpmMin: number
  bpmMax: number
  soloFavoritos: boolean
  ocultarExperimentales: boolean
  orden: Orden
}

interface FiltersProps {
  value: FilterState
  onChange: (value: FilterState) => void
  artistas: string[]
}

const SELECT_CLASSES =
  "appearance-none rounded-lg border border-white/15 bg-black/30 bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23ffffff80%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_0.6rem_center] bg-no-repeat py-2 pl-3 pr-9 text-sm text-white outline-none focus:border-rose-500/60"

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

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="artista" className="text-xs text-white/50">
            Cantante
          </label>
          <select
            id="artista"
            value={value.artista}
            onChange={(e) => onChange({ ...value, artista: e.target.value })}
            className={SELECT_CLASSES}
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
            className={SELECT_CLASSES}
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
            className={SELECT_CLASSES}
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
          <div
            className="flex h-[38px] items-center gap-2"
            role="group"
            aria-labelledby="bpm-range-label"
          >
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

        <div className="flex flex-col gap-1">
          <span className="text-xs text-transparent select-none" aria-hidden="true">
            ·
          </span>
          <label className="flex h-[38px] items-center gap-2 text-sm text-white/60">
            <input
              type="checkbox"
              checked={value.soloFavoritos}
              onChange={(e) => onChange({ ...value, soloFavoritos: e.target.checked })}
              className="accent-rose-500"
            />
            Solo favoritos ★
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-transparent select-none" aria-hidden="true">
            ·
          </span>
          <label className="flex h-[38px] items-center gap-2 text-sm text-white/60">
            <input
              type="checkbox"
              checked={value.ocultarExperimentales}
              onChange={(e) => onChange({ ...value, ocultarExperimentales: e.target.checked })}
              className="accent-orange-500"
            />
            Ocultar experimentales
          </label>
        </div>
      </div>
    </div>
  )
}

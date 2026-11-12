import { useMemo, useState } from 'react'
import { songs, type Song } from './data/songs'
import { SongCard } from './components/SongCard'
import { SongModal } from './components/SongModal'
import { Filters, type FilterState } from './components/Filters'

const initialFilters: FilterState = {
  query: '',
  estilo: 'todos',
  nivel: 'todos',
  bpmMin: 100,
  bpmMax: 150,
}

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [selected, setSelected] = useState<Song | null>(null)

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return songs.filter((song) => {
      if (q && !`${song.title} ${song.artist}`.toLowerCase().includes(q)) return false
      if (filters.estilo !== 'todos' && song.estilo !== filters.estilo) return false
      if (filters.nivel !== 'todos' && song.nivel !== filters.nivel) return false
      if (song.bpm < filters.bpmMin || song.bpm > filters.bpmMax) return false
      return true
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-[#140c10] text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% -10%, rgba(244,63,94,0.25), transparent 50%), radial-gradient(circle at 90% 10%, rgba(217,70,239,0.15), transparent 45%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-3 text-center">
          <span className="mx-auto rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">
            Catálogo para practicar bachata
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Bachata<span className="text-rose-400">BPM</span>
          </h1>
          <p className="mx-auto max-w-xl text-white/60">
            Encuentra el tempo exacto de tus canciones favoritas, descubre si se bailan
            más natural en <strong className="text-amber-300">derecho</strong> o{' '}
            <strong className="text-fuchsia-300">majao</strong>, y practica con un metrónomo
            sincronizado antes de llevarlo a la pista.
          </p>
        </header>

        <section className="mt-8">
          <Filters value={filters} onChange={setFilters} />
        </section>

        <section className="mt-6">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-white/40">
              Ninguna canción coincide con esos filtros. Prueba a ampliar el rango de BPM.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((song) => (
                <SongCard key={song.id} song={song} onOpen={setSelected} />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/35">
          <p>
            Los datos de BPM y estilo de rotura son orientativos (estimados a partir del género y
            el tempo), pensados como punto de partida para practicar — contrastalos siempre con tu
            instructor. La reproducción de las canciones se realiza mediante el reproductor oficial
            de YouTube; esta web no aloja ni distribuye audio.
          </p>
          <p className="mt-2">Hecho con cariño por un aprendiz de bachata.</p>
        </footer>
      </div>

      {selected && <SongModal song={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default App

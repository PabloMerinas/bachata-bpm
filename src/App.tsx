import { useEffect, useMemo, useState } from 'react'
import { songs, type Song } from './data/songs'
import { SongCard } from './components/SongCard'
import { SongModal } from './components/SongModal'
import { Filters, type FilterState } from './components/Filters'
import { AboutSection } from './components/AboutSection'
import { useFavorites } from './lib/favorites'

const initialFilters: FilterState = {
  query: '',
  nivel: 'todos',
  artista: 'todos',
  bpmMin: 100,
  bpmMax: 150,
  soloFavoritos: false,
  ocultarExperimentales: false,
  orden: 'titulo',
}

const artistas = Array.from(new Set(songs.map((s) => s.artist))).sort((a, b) => a.localeCompare(b))

function songFromUrl(): Song | null {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('cancion')
  return songs.find((s) => s.id === id) ?? null
}

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [selected, setSelected] = useState<Song | null>(() => songFromUrl())
  const { isFavorite, toggle } = useFavorites()

  useEffect(() => {
    const onPopState = () => setSelected(songFromUrl())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openSong = (song: Song) => {
    setSelected(song)
    const url = new URL(window.location.href)
    url.searchParams.set('cancion', song.id)
    window.history.pushState({}, '', url)
  }

  const closeSong = () => {
    setSelected(null)
    const url = new URL(window.location.href)
    url.searchParams.delete('cancion')
    window.history.pushState({}, '', url)
  }

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    const result = songs.filter((song) => {
      if (q && !`${song.title} ${song.artist}`.toLowerCase().includes(q)) return false
      if (filters.nivel !== 'todos' && song.nivel !== filters.nivel) return false
      if (filters.artista !== 'todos' && song.artist !== filters.artista) return false
      if (song.bpm < filters.bpmMin || song.bpm > filters.bpmMax) return false
      if (filters.soloFavoritos && !isFavorite(song.id)) return false
      if (filters.ocultarExperimentales && song.experimental) return false
      return true
    })

    const porCriterio =
      filters.orden === 'bpm-asc'
        ? (a: Song, b: Song) => a.bpm - b.bpm
        : filters.orden === 'bpm-desc'
          ? (a: Song, b: Song) => b.bpm - a.bpm
          : (a: Song, b: Song) => a.title.localeCompare(b.title)

    result.sort((a, b) => {
      if (!!a.experimental !== !!b.experimental) return a.experimental ? -1 : 1
      return porCriterio(a, b)
    })

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-3 text-center">
          <span className="mx-auto rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">
            Catálogo para practicar bachata
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Bachata<span className="text-rose-400">BPM</span>
          </h1>
          <p className="mx-auto max-w-xl text-sm text-white/60 sm:text-base">
            Encuentra el tempo exacto de tus canciones favoritas y practica con un metrónomo y un
            contador de tiempo sincronizados antes de llevarlo a la pista. También verás ideas
            sobre cuándo cada canción se presta más a <strong className="text-amber-300">derecho</strong> o{' '}
            <strong className="text-fuchsia-300">majao</strong> — aunque, como en toda bachata, lo normal es mezclar ambos dentro de la misma canción.
          </p>
        </header>

        <AboutSection />

        <section className="mt-8">
          <Filters value={filters} onChange={setFilters} artistas={artistas} />
        </section>

        <section className="mt-6">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-white/40">
              Ninguna canción coincide con esos filtros. Prueba a ampliar el rango de BPM.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onOpen={openSong}
                  isFavorite={isFavorite(song.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/35">
          <p>
            El BPM y el instante del primer beat ("1") de cada canción son datos reales: el BPM
            viene citado de bases de datos públicas (Tunebat / Shazam) y el beat se calculó
            analizando el audio real con AcousticBrainz/Essentia — no es una suposición a 0. Aun
            así puede no encajar al 100% si tu vídeo usa otra mezcla; por eso hay calibración
            manual. Las notas sobre derecho/majao son sugerencias orientativas para un momento
            concreto, no una etiqueta fija de toda la canción — una misma canción suele combinar
            ambos varios veces; contrástalo siempre con tu instructor. La reproducción se realiza
            mediante el reproductor oficial de YouTube; esta web no aloja ni distribuye audio.
          </p>
          <p className="mt-2">Hecho con cariño por un aprendiz de bachata.</p>
        </footer>
      </div>

      {selected && <SongModal key={selected.id} song={selected} onClose={closeSong} />}
    </div>
  )
}

export default App

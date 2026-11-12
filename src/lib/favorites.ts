import { useEffect, useState } from 'react'

const KEY = 'bachatabpm:favoritos'

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => read())

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggle = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return { favorites, toggle, isFavorite }
}

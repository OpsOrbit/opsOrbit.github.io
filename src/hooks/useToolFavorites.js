import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'devops-hub-tool-favorites-v1'

function loadIds() {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return new Set()
    return new Set(arr.filter((x) => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

function persist(ids) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    /* quota */
  }
}

export function useToolFavorites() {
  const [ids, setIds] = useState(() => loadIds())

  useEffect(() => {
    setIds(loadIds())
  }, [])

  const isFavorite = useCallback((toolId) => ids.has(toolId), [ids])

  const toggleFavorite = useCallback((toolId) => {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(toolId)) next.delete(toolId)
      else next.add(toolId)
      persist(next)
      return next
    })
  }, [])

  return { isFavorite, toggleFavorite, favoriteIds: ids }
}

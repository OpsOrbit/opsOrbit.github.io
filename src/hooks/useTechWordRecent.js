import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'devops-hub-techword-recent-v1'
const MAX = 12

function loadIds() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr.filter((x) => typeof x === 'string')
  } catch {
    return []
  }
}

function persist(ids) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* quota */
  }
}

export function useTechWordRecent() {
  const [ids, setIds] = useState(() => loadIds())

  const recordView = useCallback((termId) => {
    if (!termId) return
    setIds((prev) => {
      const without = prev.filter((x) => x !== termId)
      const next = [termId, ...without].slice(0, MAX)
      persist(next)
      return next
    })
  }, [])

  useEffect(() => {
    setIds(loadIds())
  }, [])

  return { recentIds: ids, recordView }
}

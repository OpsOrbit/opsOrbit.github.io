import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'opsorbit-lab-progress-v1'

function defaultState() {
  return { learned: {}, notes: {} }
}

function loadState() {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const p = JSON.parse(raw)
    return {
      learned: typeof p.learned === 'object' && p.learned ? p.learned : {},
      notes: typeof p.notes === 'object' && p.notes ? p.notes : {},
    }
  } catch {
    return defaultState()
  }
}

function persist(state) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* quota */
  }
}

/**
 * Per-topic notes and learned flags for LAB (scripting workspace).
 */
export function useLabProgress() {
  const [state, setState] = useState(defaultState)

  useEffect(() => {
    setState(loadState())
  }, [])

  const setLearned = useCallback((topicId, value) => {
    setState((prev) => {
      const next = {
        ...prev,
        learned: { ...prev.learned, [topicId]: Boolean(value) },
      }
      persist(next)
      return next
    })
  }, [])

  const toggleLearned = useCallback((topicId) => {
    setState((prev) => {
      const next = {
        ...prev,
        learned: { ...prev.learned, [topicId]: !prev.learned[topicId] },
      }
      persist(next)
      return next
    })
  }, [])

  const setNotes = useCallback((topicId, text) => {
    setState((prev) => {
      const next = {
        ...prev,
        notes: { ...prev.notes, [topicId]: text },
      }
      persist(next)
      return next
    })
  }, [])

  const isLearned = useCallback((topicId) => Boolean(state.learned[topicId]), [state.learned])

  return {
    learned: state.learned,
    notes: state.notes,
    isLearned,
    setLearned,
    toggleLearned,
    setNotes,
  }
}

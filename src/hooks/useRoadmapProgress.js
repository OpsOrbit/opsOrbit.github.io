import { useCallback, useEffect, useMemo, useState } from 'react'
import { ROADMAP_MODULE_IDS, getRoadmapModuleXp } from '../data/roadmapData'

const STORAGE_KEY = 'opsorbit-roadmap-progress-v1'

/** @typedef {'unlocked' | 'in_progress' | 'completed'} RoadmapUiStatus */

/**
 * Persisted shape — backend-friendly: swap load/save for API later.
 * @typedef {{
 *   v: 1
 *   moduleState: Record<string, 'not_started' | 'in_progress' | 'completed'>
 *   xp: number
 *   learningMode: boolean
 * }} RoadmapProgressPayload
 */

function defaultPayload() {
  return {
    v: 1,
    moduleState: {},
    xp: 0,
    learningMode: false,
  }
}

function loadPayload() {
  if (typeof window === 'undefined') return defaultPayload()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPayload()
    const parsed = JSON.parse(raw)
    if (parsed?.v !== 1 || typeof parsed.moduleState !== 'object') return defaultPayload()
    return {
      v: 1,
      moduleState: parsed.moduleState || {},
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      learningMode: Boolean(parsed.learningMode),
    }
  } catch {
    return defaultPayload()
  }
}

function savePayload(payload) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* quota / private mode */
  }
}

/**
 * All modules are always accessible — no lock state.
 * @param {string[]} order
 * @param {Record<string, string>} moduleState
 * @param {string} id
 * @returns {RoadmapUiStatus}
 */
export function deriveModuleStatus(order, moduleState, id) {
  if (order.indexOf(id) < 0) return 'unlocked'
  const stored = moduleState[id] || 'not_started'
  if (stored === 'completed') return 'completed'
  if (stored === 'in_progress') return 'in_progress'
  return 'unlocked'
}

export function learnerTierFromXp(xp) {
  if (xp >= 900) return { id: 'pro', label: 'DevOps Pro', emoji: '🔴', tier: 'advanced' }
  if (xp >= 300) return { id: 'builder', label: 'Builder', emoji: '🔵', tier: 'intermediate' }
  return { id: 'starter', label: 'Starter', emoji: '🟢', tier: 'beginner' }
}

export function useRoadmapProgress(orderIds = ROADMAP_MODULE_IDS) {
  const [payload, setPayload] = useState(defaultPayload)

  useEffect(() => {
    setPayload(loadPayload())
  }, [])

  const statuses = useMemo(() => {
    const map = {}
    for (const id of orderIds) {
      map[id] = deriveModuleStatus(orderIds, payload.moduleState, id)
    }
    return map
  }, [orderIds, payload.moduleState])

  const completedCount = useMemo(
    () => orderIds.filter((id) => payload.moduleState[id] === 'completed').length,
    [orderIds, payload.moduleState]
  )

  const total = orderIds.length

  const startModule = useCallback((id) => {
    setPayload((prev) => {
      if (prev.moduleState[id] === 'completed') return prev
      const next = {
        ...prev,
        moduleState: { ...prev.moduleState, [id]: 'in_progress' },
      }
      savePayload(next)
      return next
    })
  }, [])

  const completeModule = useCallback((id) => {
    setPayload((prev) => {
      if (prev.moduleState[id] === 'completed') return prev
      const addXp = getRoadmapModuleXp(id)
      const next = {
        ...prev,
        xp: prev.xp + addXp,
        moduleState: { ...prev.moduleState, [id]: 'completed' },
      }
      savePayload(next)
      return next
    })
  }, [])

  const setLearningMode = useCallback((on) => {
    setPayload((prev) => {
      const next = { ...prev, learningMode: on }
      savePayload(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const next = defaultPayload()
    setPayload(next)
    savePayload(next)
  }, [])

  /** First module on the path that is not completed (suggested “next”). */
  const recommendedId = useMemo(() => {
    for (const id of orderIds) {
      if (payload.moduleState[id] !== 'completed') return id
    }
    return null
  }, [orderIds, payload.moduleState])

  /** Prefer in-progress; else first not-started / incomplete on the path. */
  const resumeTargetId = useMemo(() => {
    for (const id of orderIds) {
      if (payload.moduleState[id] === 'in_progress') return id
    }
    for (const id of orderIds) {
      if (payload.moduleState[id] !== 'completed') return id
    }
    return null
  }, [orderIds, payload.moduleState])

  const totalXpAvailable = useMemo(
    () => orderIds.reduce((sum, id) => sum + getRoadmapModuleXp(id), 0),
    [orderIds]
  )

  return {
    payload,
    statuses,
    completedCount,
    total,
    xp: payload.xp,
    totalXpAvailable,
    learningMode: payload.learningMode,
    tier: learnerTierFromXp(payload.xp),
    startModule,
    completeModule,
    setLearningMode,
    resetProgress,
    recommendedId,
    resumeTargetId,
  }
}

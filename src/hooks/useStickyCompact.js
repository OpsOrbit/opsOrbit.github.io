import { useEffect, useRef, useState } from 'react'

/**
 * When a sentinel element scrolls out of view (above the sticky region), `compact` becomes true.
 * Mirrors the Tools page filter bar behavior.
 */
export function useStickyCompact(options = {}) {
  const { rootMargin = '0px 0px -1px 0px', threshold = 0 } = options
  const sentinelRef = useRef(null)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { root: null, rootMargin, threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, threshold])

  return { sentinelRef, compact }
}

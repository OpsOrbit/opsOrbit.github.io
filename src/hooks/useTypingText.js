import { useState, useEffect, useRef } from 'react'

/**
 * Reveals `fullText` one character at a time. Resets when fullText changes.
 * @param {string} fullText
 * @param {{ enabled?: boolean, msPerChar?: number }} opts
 */
export function useTypingText(fullText, opts = {}) {
  const { enabled = true, msPerChar = 8 } = opts
  const [displayed, setDisplayed] = useState('')
  const lenRef = useRef(0)

  useEffect(() => {
    if (!enabled || fullText == null) {
      setDisplayed('')
      lenRef.current = 0
      return
    }

    setDisplayed('')
    lenRef.current = 0
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      lenRef.current += 1
      setDisplayed(fullText.slice(0, lenRef.current))
      if (lenRef.current < fullText.length) {
        window.setTimeout(tick, msPerChar)
      }
    }
    const id = window.setTimeout(tick, 0)
    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [fullText, enabled, msPerChar])

  const done = Boolean(fullText && displayed.length >= fullText.length)

  return { displayed, done }
}

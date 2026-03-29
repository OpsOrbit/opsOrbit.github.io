import {
  Children,
  createElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Pixels: wider = larger “influence” zone around the cursor */
const SIGMA = 86
/** Peak scale at cursor center (reduced motion → 1) */
const MAX_SCALE = 1.24

function scaleFromDistance(dist) {
  if (dist > SIGMA * 3) return 1
  return 1 + (MAX_SCALE - 1) * Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA))
}

/**
 * macOS-style dock magnification: items scale based on pointer distance to their center.
 * Works for vertical stacks, horizontal rows, and wrapped pill grids (2D distance).
 *
 * Each item is wrapped in a non-transformed clip shell (`itemClipClassName`) so scaled
 * painting cannot spill past the slot (parent overflow-hidden alone is unreliable with transforms).
 *
 * @param {string} [as='div'] Root element tag (e.g. 'nav').
 */
export default function DockMagnify({
  as: Component = 'div',
  className = '',
  /** Layout + overflow clip for each slot; match child border-radius (e.g. rounded-md / rounded-full). */
  itemClipClassName = 'inline-flex max-w-full min-w-0 shrink-0 overflow-hidden',
  itemWrapperClassName = 'inline-flex shrink-0 justify-center',
  children,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const itemRefs = useRef([])
  const [scales, setScales] = useState([])
  const childArray = Children.toArray(children).filter(isValidElement)
  const n = childArray.length

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, n)
    setScales(Array.from({ length: n }, () => 1))
  }, [n])

  const onMove = useCallback(
    (e) => {
      if (reduceMotion) return
      const mx = e.clientX
      const my = e.clientY
      const next = itemRefs.current.map((el) => {
        if (!el) return 1
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        return scaleFromDistance(Math.hypot(mx - cx, my - cy))
      })
      setScales(next)
    },
    [reduceMotion]
  )

  const onLeave = useCallback(() => {
    setScales(Array.from({ length: n }, () => 1))
  }, [n])

  return createElement(
    Component,
    {
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      ...rest,
      // Last so callers cannot accidentally drop isolate; helps clip + rounded corners with scaled children
      className: [className, 'isolate'].filter(Boolean).join(' '),
    },
    childArray.map((child, i) => (
      <div
        key={child.key ?? i}
        ref={(el) => {
          itemRefs.current[i] = el
        }}
        className={itemClipClassName}
      >
        <motion.div
          className={itemWrapperClassName}
          initial={false}
          animate={{ scale: scales[i] ?? 1 }}
          transition={{ type: 'spring', stiffness: 440, damping: 29, mass: 0.55 }}
          style={{ transformOrigin: 'center center' }}
        >
          {child}
        </motion.div>
      </div>
    ))
  )
}

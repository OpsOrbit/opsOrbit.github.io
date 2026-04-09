import { useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const LIFECYCLE = [
  { id: 'plan', label: 'Plan', hint: 'Issues & design', icon: '📋' },
  { id: 'code', label: 'Code', hint: 'SCM & review', icon: '💻' },
  { id: 'build', label: 'Build', hint: 'CI & artifacts', icon: '🔨' },
  { id: 'test', label: 'Test', hint: 'Quality & security', icon: '🧪' },
  { id: 'release', label: 'Release', hint: 'Deploy & config', icon: '🚀' },
  { id: 'operate', label: 'Operate', hint: 'Run & observe', icon: '⚙️' },
  { id: 'monitor', label: 'Monitor', hint: 'SLOs & incidents', icon: '📈' },
]

const SWIPE_THRESHOLD_PX = 48

/**
 * @param {{ selectedId: string | null, onSelectStage: (id: string | null) => void }} props
 */
export default function LifecycleStrip({ selectedId, onSelectStage }) {
  const scrollerRef = useRef(null)
  const touchRef = useRef({ x: 0, y: 0 })

  const scrollByStep = useCallback((direction) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = direction * Math.min(200, Math.max(120, el.clientWidth * 0.42))
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }, [])

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
  }, [])

  const onTouchEnd = useCallback(
    (e) => {
      const t = e.changedTouches[0]
      const dx = t.clientX - touchRef.current.x
      const dy = t.clientY - touchRef.current.y
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return
      scrollByStep(dx < 0 ? 1 : -1)
    },
    [scrollByStep]
  )

  const toggle = (id) => {
    onSelectStage(selectedId === id ? null : id)
  }

  return (
    <div className="tools-glass mb-4 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-50/90 via-white/80 to-indigo-50/40 p-3 pb-2 shadow-[0_8px_32px_-8px_rgba(79,70,229,0.15)] backdrop-blur-xl dark:border-white/10 dark:from-slate-900/80 dark:via-[var(--hub-elevated)]/90 dark:to-indigo-950/40 dark:shadow-black/40 sm:mb-6 sm:p-4 lg:p-6">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2 sm:mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600/90 dark:text-cyan-300/90">
            DevOps lifecycle
          </p>
          <p className="text-xs text-[var(--hub-muted)]">Tap a stage to filter tools · tap again to clear</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/30 bg-white/50 text-[var(--hub-muted)] backdrop-blur-sm transition-colors hover:border-indigo-400/50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:hover:text-cyan-300"
            aria-label="Previous lifecycle phases"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/30 bg-white/50 text-[var(--hub-muted)] backdrop-blur-sm transition-colors hover:border-indigo-400/50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:hover:text-cyan-300"
            aria-label="Next lifecycle phases"
          >
            →
          </button>
        </div>
      </div>
      <p className="mb-2 text-[10px] text-[var(--hub-faint)] lg:hidden">Swipe or use arrows to explore stages</p>
      <div className="-mx-3 min-w-0 px-3 sm:mx-0 sm:px-0">
        <div
          ref={scrollerRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="hub-inline-scroll scrollbar-hide w-full min-w-0 max-w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden pb-2 lg:snap-none lg:overflow-x-visible lg:pb-0"
          tabIndex={0}
          role="region"
          aria-label="DevOps lifecycle — tap a stage to filter tools"
        >
          <div
            className="flex w-max min-w-0 flex-nowrap items-stretch gap-0 lg:w-full lg:max-w-full lg:flex-wrap lg:justify-between lg:gap-2"
            role="list"
          >
            {LIFECYCLE.map((step, i) => {
              const active = selectedId === step.id
              return (
                <div
                  key={step.id}
                  className="flex shrink-0 snap-center snap-always items-center gap-0 lg:snap-none lg:min-w-0 lg:flex-1"
                  role="listitem"
                >
                  <motion.button
                    type="button"
                    onClick={() => toggle(step.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex min-h-[48px] min-w-[112px] shrink-0 flex-col justify-center rounded-xl border px-3 py-2 text-center transition-shadow lg:min-h-0 lg:min-w-0 lg:w-full lg:flex-1 ${
                      active
                        ? 'border-cyan-400/60 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-cyan-400/50 dark:from-indigo-500 dark:to-violet-600'
                        : 'border-white/40 bg-white/60 text-[var(--hub-text)] backdrop-blur-md hover:border-indigo-300/60 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="text-sm" aria-hidden>
                      {step.icon}
                    </span>
                    <span className="whitespace-nowrap text-xs font-extrabold sm:text-[11px]">{step.label}</span>
                    <span className="hidden text-[9px] opacity-90 lg:block">{step.hint}</span>
                  </motion.button>
                  {i < LIFECYCLE.length - 1 && (
                    <div className="hidden shrink-0 px-0.5 lg:flex lg:items-center" aria-hidden>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        className="text-lg text-indigo-400/80 dark:text-cyan-400/70"
                      >
                        →
                      </motion.span>
                    </div>
                  )}
                  {i < LIFECYCLE.length - 1 && (
                    <span className="px-1 text-indigo-300 dark:text-indigo-500 lg:hidden" aria-hidden>
                      ·
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedId ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-center text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
          >
            Filtering by <strong className="capitalize">{selectedId}</strong> — matching categories only
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

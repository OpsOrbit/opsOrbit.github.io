import { useEffect, useRef, useState } from 'react'
import { motion, useDragControls } from 'motion/react'
import { createPortal } from 'react-dom'
import { categoryLabel } from '../../data/toolsData'

/**
 * @param {{
 *   tool: object | null
 *   isFavorite: boolean
 *   onToggleFavorite: () => void
 *   onClose: () => void
 * }} props
 */
export default function ToolModal({ tool, isFavorite, onToggleFavorite, onClose }) {
  const panelRef = useRef(null)
  const dragControls = useDragControls()
  const [narrowViewport, setNarrowViewport] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 639px)')
    const fn = () => setNarrowViewport(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (!tool) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [tool])

  useEffect(() => {
    if (!tool) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tool, onClose])

  if (typeof document === 'undefined' || !tool) return null

  const lic = tool.license
  const content = (
    <motion.div
      key={tool.id}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-modal-title"
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[var(--hub-text)]/40 backdrop-blur-sm dark:bg-black/60"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        className="relative z-10 flex max-h-[min(90dvh,880px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] shadow-2xl dark:bg-[var(--hub-elevated)] sm:rounded-2xl"
        drag={narrowViewport ? 'y' : false}
        dragControls={narrowViewport ? dragControls : undefined}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 260 }}
        dragElastic={{ top: 0, bottom: 0.3 }}
        onDragEnd={(_, info) => {
          if (!narrowViewport) return
          if (info.offset.y > 72 || info.velocity.y > 420) onClose()
        }}
        style={{
          paddingBottom: narrowViewport ? 'max(0px, env(safe-area-inset-bottom, 0px))' : undefined,
        }}
      >
        <div
          className="flex shrink-0 touch-none flex-col items-center pt-2 pb-1 sm:hidden"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div
            className="h-1.5 w-12 cursor-grab rounded-full bg-[var(--hub-border2)] active:cursor-grabbing"
            aria-hidden
          />
        </div>
        <div className="flex shrink-0 items-start gap-3 border-b border-[var(--hub-line)] p-4 sm:p-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] text-2xl">
            {tool.logo || '◆'}
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="tool-modal-title" className="text-lg font-extrabold text-[var(--hub-text)] sm:text-xl">
              {tool.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-[var(--hub-brand)]">{categoryLabel(tool.categoryId)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-[var(--hub-elevated)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--hub-muted)]">
                {lic}
              </span>
              {tool.cloudNative && (
                <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-sky-800 dark:text-sky-200">
                  Cloud native
                </span>
              )}
              {tool.popularity === 'popular' && (
                <span className="text-[11px] text-[var(--hub-muted)]">🔥 Popular</span>
              )}
              {tool.popularity === 'enterprise' && (
                <span className="text-[11px] text-[var(--hub-muted)]">⭐ Enterprise</span>
              )}
            </div>
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={onToggleFavorite}
              className={`rounded-lg border px-2.5 py-2 text-sm font-bold transition-colors ${
                isFavorite
                  ? 'border-amber-400/60 bg-amber-400/10 text-amber-700 dark:text-amber-200'
                  : 'border-[var(--hub-line)] text-[var(--hub-muted)] hover:border-[var(--hub-tool)]'
              }`}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '★ Saved' : '☆ Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[var(--hub-line)] px-2.5 py-2 text-sm font-bold text-[var(--hub-muted)] hover:text-[var(--hub-text)]"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
          <section className="mb-5">
            <h3 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Description</h3>
            <p className="text-[15px] leading-relaxed text-[var(--hub-text)]">{tool.description}</p>
          </section>
          <section className="mb-5">
            <h3 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Used for</h3>
            <p className="text-sm leading-relaxed text-[var(--hub-sub)]">{tool.usedFor}</p>
          </section>
          <section className="mb-5">
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Key features</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-[var(--hub-text)]">
              {(tool.features || []).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
          <section className="mb-5">
            <h3 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Why use it</h3>
            <p className="text-sm leading-relaxed text-[var(--hub-sub)]">{tool.why}</p>
          </section>
          <section className="mb-2">
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Alternatives</h3>
            <div className="flex flex-wrap gap-2">
              {(tool.alternatives || []).map((a) => (
                <span
                  key={a}
                  className="rounded-lg border border-[var(--hub-line)] bg-[var(--hub-card)] px-2.5 py-1 text-xs font-medium text-[var(--hub-text)]"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>
          <p className="mt-6 border-t border-[var(--hub-line)] pt-4 text-[11px] text-[var(--hub-faint)]">
            Learning path: pair this tool with your stack’s CI/CD and observability layers — see{' '}
            <strong className="text-[var(--hub-muted)]">Roadmap</strong> and{' '}
            <strong className="text-[var(--hub-muted)]">LAB</strong> for hands-on modules.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )

  return createPortal(content, document.body)
}

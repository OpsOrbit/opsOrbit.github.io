import { motion } from 'motion/react'

/**
 * Shared glass hero for Tools, Commands, LAB, Roadmap, Tech Words.
 */
export default function WorkspaceHero({ eyebrow, title, description, children, className = '' }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`relative mb-6 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-100/30 p-4 shadow-[0_12px_40px_-12px_rgba(79,70,229,0.2)] backdrop-blur-xl dark:border-white/10 dark:from-slate-900/90 dark:via-indigo-950/50 dark:to-violet-950/40 dark:shadow-black/40 sm:p-6 ${className}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-600/10" />
      <div className="relative">
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-400/90">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--hub-text)] sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--hub-muted)]">{description}</p>
        ) : null}
        {children}
      </div>
    </motion.header>
  )
}

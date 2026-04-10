import { motion } from 'motion/react'

/**
 * Shared glass hero for Tools, Commands, LAB, Roadmap, Tech Words.
 * @param {{ compact?: boolean }} props — tighter padding and type when vertical space is scarce (e.g. Tools workspace).
 */
export default function WorkspaceHero({ eyebrow, title, description, children, className = '', compact = false }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-100/30 backdrop-blur-xl dark:border-white/10 dark:from-slate-900/90 dark:via-indigo-950/50 dark:to-violet-950/40 ${
        compact
          ? 'mb-3 p-3 shadow-[0_8px_28px_-10px_rgba(79,70,229,0.14)] dark:shadow-black/30 sm:mb-3 sm:p-4'
          : 'mb-6 p-4 shadow-[0_12px_40px_-12px_rgba(79,70,229,0.2)] dark:shadow-black/40 sm:p-6'
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10 ${compact ? 'h-28 w-28' : 'h-40 w-40'}`}
      />
      <div
        className={`pointer-events-none absolute -bottom-16 -left-16 rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-600/10 ${compact ? 'h-24 w-24' : 'h-36 w-36'}`}
      />
      <div className="relative">
        {eyebrow ? (
          <p
            className={`font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-400/90 ${compact ? 'text-[9px] tracking-[0.16em]' : 'text-[10px]'}`}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`mt-0.5 font-extrabold tracking-tight text-[var(--hub-text)] ${compact ? 'text-lg sm:text-xl' : 'mt-1 text-2xl sm:text-3xl'}`}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={`max-w-2xl text-[var(--hub-muted)] ${compact ? 'mt-1 text-xs leading-snug sm:max-w-xl' : 'mt-2 text-sm leading-relaxed'}`}
          >
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </motion.header>
  )
}

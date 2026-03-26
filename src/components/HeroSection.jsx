import { motion } from 'motion/react'
import Button from './ui/Button'

const secondaryCtaClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-hub-line bg-hub-surface px-6 py-3 text-base font-semibold tracking-tight text-hub-text shadow-card transition-all duration-250 ease-out hover:border-hub-primary/40 hover:bg-hub-elevated hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-bg active:scale-[0.98] dark:hover:bg-hub-elevated/80'

export default function HeroSection({ onBrowseCommands }) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-hub-line/80 bg-gradient-to-br from-hub-primary/[0.08] via-hub-bg to-hub-accent/[0.06] dark:from-hub-primary/[0.12] dark:via-hub-bg dark:to-hub-accent/[0.08]"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, var(--hub-primary), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, var(--hub-accent), transparent)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left,0px))] py-12 sm:px-[max(1.5rem,env(safe-area-inset-left,0px))] sm:py-16 lg:px-[max(2rem,env(safe-area-inset-left,0px))] lg:py-20">
        <div className="max-w-3xl">
          <motion.p
            className="font-[family-name:Orbitron] text-xs font-bold uppercase tracking-[0.2em] text-hub-brand sm:text-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            thewhitetechnologies
          </motion.p>
          <motion.h2
            id="hero-heading"
            className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight text-hub-text sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            Run infrastructure with clarity — commands that match how teams ship.
          </motion.h2>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-hub-sub sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Search and filter by tool and level. One hub for Git, cloud, containers, and automation.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button type="button" size="lg" variant="primary" onClick={onBrowseCommands}>
              Browse commands
            </Button>
            <a href="#main-content" className={secondaryCtaClass}>
              Jump to commands
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

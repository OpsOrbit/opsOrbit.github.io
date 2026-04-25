import { motion } from 'motion/react'
import CommandCard from './CommandCard'
import { COMMAND_EXTRAS } from '../data/commandExtras'
import { enrichCommand, resolveRelatedCommands, buildCommandFlow, getRealUseCaseText } from '../utils/commandEnrichment'

const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced']

const viewport = { once: true, margin: '-32px' }

export default function CommandListByLevel({ commandsByLevel, onSelect, toolLabel, levelLabel }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {LEVEL_ORDER.map((level, sectionIndex) => {
        const list = commandsByLevel[level] || []
        if (list.length === 0) return null
        return (
          <motion.section
            key={level}
            aria-labelledby={`level-section-${level}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.45, delay: sectionIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              id={`level-section-${level}`}
              className="section-title mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)] sm:text-sm"
            >
              <span className="h-px flex-1 bg-[var(--hub-line)]" aria-hidden />
              <span className="shrink-0">{levelLabel(level)}</span>
              <span className="h-px flex-1 bg-[var(--hub-line)]" aria-hidden />
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4 xl:gap-4">
              {list.map((cmd, i) => {
                const extras = COMMAND_EXTRAS[cmd.id] || {}
                const enriched = enrichCommand(cmd)
                const related = resolveRelatedCommands(cmd, 5)
                const flowSteps = buildCommandFlow(cmd)
                const realUseCaseText = getRealUseCaseText(cmd, extras)
                return (
                  <li key={cmd.id}>
                    <CommandCard
                      command={cmd}
                      enriched={enriched}
                      index={i}
                      onOpenExplain={onSelect}
                      toolLabel={toolLabel}
                      levelLabel={levelLabel}
                      relatedCommands={related}
                      flowSteps={flowSteps}
                      realUseCaseText={realUseCaseText}
                    />
                  </li>
                )
              })}
            </ul>
          </motion.section>
        )
      })}
    </div>
  )
}

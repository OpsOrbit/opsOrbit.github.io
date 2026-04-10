import { useMemo, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import WorkspaceHero from '../workspace/WorkspaceHero'
import FilterChip from '../tools/FilterChip'
import {
  SCENARIO_CATEGORY_OPTIONS,
  SCENARIO_DIFFICULTY_OPTIONS,
  scenarioCategoryLabel,
  scenarioDifficultyLabel,
} from '../../data/scenariosData'
import { filterScenarios } from '../../utils/scenariosFilter'

/** @type {Record<string, string>} */
const CATEGORY_CHIP_STYLES = {
  aws: 'border-amber-400/45 bg-amber-50/90 text-amber-950 dark:border-amber-500/35 dark:bg-amber-950/45 dark:text-amber-100',
  kubernetes:
    'border-sky-400/45 bg-sky-50/90 text-sky-950 dark:border-sky-500/35 dark:bg-sky-950/45 dark:text-sky-100',
  linux: 'border-slate-400/45 bg-slate-50/90 text-slate-900 dark:border-slate-500/35 dark:bg-slate-900/55 dark:text-slate-100',
  networking:
    'border-violet-400/45 bg-violet-50/90 text-violet-950 dark:border-violet-500/35 dark:bg-violet-950/45 dark:text-violet-100',
}

/** @type {Record<string, string>} */
const DIFF_BADGE_STYLES = {
  beginner: 'border-emerald-400/40 bg-emerald-50/90 text-emerald-950 dark:border-emerald-500/35 dark:bg-emerald-950/40 dark:text-emerald-100',
  intermediate: 'border-amber-400/40 bg-amber-50/90 text-amber-950 dark:border-amber-500/35 dark:bg-amber-950/40 dark:text-amber-100',
  advanced: 'border-rose-400/40 bg-rose-50/90 text-rose-950 dark:border-rose-500/35 dark:bg-rose-950/40 dark:text-rose-100',
}

function ScenarioExpanded({ scenario }) {
  return (
    <motion.div
      key="body"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden border-t border-[var(--hub-line)] bg-[var(--hub-elevated)]/50"
    >
      <div className="space-y-5 p-4 sm:p-5">
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Problem</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--hub-text)]">{scenario.problem}</p>
        </section>
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Symptoms</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--hub-sub)]">
            {scenario.symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">
            Step-by-step troubleshooting
          </p>
          <ol className="mt-3 space-y-4">
            {scenario.steps.map((st, idx) => (
              <li key={idx} className="text-sm">
                <p className="font-bold text-[var(--hub-text)]">
                  {idx + 1}. {st.title}
                </p>
                <p className="mt-1 leading-relaxed text-[var(--hub-sub)]">{st.detail}</p>
                {st.commands?.length ? (
                  <ul className="mt-2 space-y-1.5">
                    {st.commands.map((cmd, ci) => (
                      <li key={ci}>
                        <code className="block w-full overflow-x-auto rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-2 font-mono text-[11px] text-[var(--hub-text)] sm:text-xs">
                          {cmd}
                        </code>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Commands (quick ref)</p>
          <ul className="mt-2 space-y-1.5">
            {scenario.commandSummary.map((cmd, i) => (
              <li key={i}>
                <code className="block w-full overflow-x-auto rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-2 font-mono text-[11px] text-[var(--hub-text)] sm:text-xs">
                  {cmd}
                </code>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-emerald-400/35 bg-emerald-50/60 p-3 dark:border-emerald-500/25 dark:bg-emerald-950/35">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300/90">
            Final solution
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100/95">{scenario.solution}</p>
        </section>
      </div>
    </motion.div>
  )
}

/**
 * @param {{
 *   query: string
 *   activeCategoryId: string
 *   onSelectCategory: (id: string) => void
 *   activeDifficultyId: string
 *   onSelectDifficulty: (id: string) => void
 * }} props
 */
export default function ScenariosPage({
  query,
  activeCategoryId,
  onSelectCategory,
  activeDifficultyId,
  onSelectDifficulty,
}) {
  const filtered = useMemo(
    () => filterScenarios(query, activeCategoryId, activeDifficultyId),
    [query, activeCategoryId, activeDifficultyId]
  )
  const [expandedId, setExpandedId] = useState(/** @type {string | null} */ (null))

  const toggleExpand = useCallback((id) => {
    setExpandedId((cur) => (cur === id ? null : id))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-w-0 pb-8"
    >
      <WorkspaceHero
        eyebrow="Debug & interviews"
        title="Scenarios"
        description="Real-world DevOps incidents with structured checks, commands, and resolutions — filter with the search bar under the header (e.g. 502, crashloop, SSH)."
      />

      <div className="mb-2 mt-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Category</p>
        <div className="flex min-w-0 flex-wrap gap-2">
          {SCENARIO_CATEGORY_OPTIONS.map((c) => {
            const active = activeCategoryId === c.id || (!activeCategoryId && c.id === 'all')
            const icons = { all: '✦', aws: '☁', kubernetes: '☸', linux: '🐧', networking: '📡' }
            return (
              <FilterChip
                key={c.id}
                active={active}
                label={c.label}
                icon={icons[c.id] || '◇'}
                onClick={() => onSelectCategory(c.id)}
              />
            )
          })}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Difficulty</p>
        <div className="flex min-w-0 flex-wrap gap-2">
          {SCENARIO_DIFFICULTY_OPTIONS.map((d) => {
            const active = activeDifficultyId === d.id || (!activeDifficultyId && d.id === 'all')
            const icons = { all: '◎', beginner: '①', intermediate: '②', advanced: '③' }
            return (
              <FilterChip
                key={d.id}
                active={active}
                label={d.label}
                icon={icons[d.id] || '◇'}
                onClick={() => onSelectDifficulty(d.id)}
              />
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-4 py-12 text-center text-sm text-[var(--hub-muted)]">
          No scenarios match your search or filters. Try clearing keywords or setting filters to “All”.
        </p>
      ) : (
        <ul className="grid list-none gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((scenario) => {
            const open = expandedId === scenario.id
            return (
              <motion.li
                key={scenario.id}
                layout
                className="min-w-0 overflow-hidden rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-card)] shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(scenario.id)}
                  className="flex w-full flex-col gap-2 p-4 text-left transition-colors hover:bg-[var(--hub-elevated)]/40 sm:p-5"
                  aria-expanded={open}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${CATEGORY_CHIP_STYLES[scenario.categoryId] || 'border-[var(--hub-line)] bg-[var(--hub-surface)]'}`}
                    >
                      {scenarioCategoryLabel(scenario.categoryId)}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${DIFF_BADGE_STYLES[scenario.difficulty] || ''}`}
                    >
                      {scenarioDifficultyLabel(scenario.difficulty)}
                    </span>
                  </div>
                  <span className="text-base font-extrabold leading-snug text-[var(--hub-text)]">{scenario.title}</span>
                  <p className="text-sm leading-relaxed text-[var(--hub-muted)]">{scenario.shortDescription}</p>
                  <span className="text-xs font-semibold text-[var(--hub-tool)]">{open ? '▼ Hide details' : '▶ Show walkthrough'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? <ScenarioExpanded scenario={scenario} /> : null}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
      )}
    </motion.div>
  )
}

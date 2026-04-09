import { Fragment, useCallback, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Card from './ui/Card'
import { ROADMAP_FINAL_ORDER, ROADMAP_FLOW_STEPS } from '../data/roadmapData'
import RoadmapModuleCard from './roadmap/RoadmapModuleCard'
import RoadmapMobileDock from './roadmap/RoadmapMobileDock'
import WorkspaceHero from './workspace/WorkspaceHero'

/** Connectors between modules: horizontal chevron on mobile, vertical pipeline-style arrow on desktop. */
function FlowConnectorBetweenModules() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.li
      className="flex list-none items-center justify-center py-1 md:min-h-[2rem] md:py-0"
      aria-hidden
      initial={{ opacity: 0.5 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: [0.55, 1, 0.55] }}
      transition={reduceMotion ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="roadmap-flow-connector flex items-center text-indigo-500 dark:text-cyan-400 md:hidden">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_10px_rgba(99,102,241,0.55)]">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="roadmap-flow-connector hidden flex-col items-center text-indigo-500 dark:text-cyan-400 md:flex">
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
          animate={reduceMotion ? { y: 0 } : { y: [0, 5, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M12 5v14M6 11l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>
    </motion.li>
  )
}

/**
 * OpsOrbit learning path: ordered modules with topics and deep links (no progress tracking UI).
 */
export default function RoadmapFlow({ steps = [], finalOrderLines = ROADMAP_FINAL_ORDER, onSwitchToCommands }) {
  const [expandedId, setExpandedId] = useState(null)

  const displaySteps = useMemo(() => {
    if (steps.length > 0) return steps
    return ROADMAP_FLOW_STEPS
  }, [steps])

  const scrollToModulesTop = useCallback(() => {
    document.getElementById('roadmap-modules-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleDockCommands = useCallback(() => {
    onSwitchToCommands?.()
  }, [onSwitchToCommands])

  const toggleExpand = useCallback((id) => {
    setExpandedId((cur) => (cur === id ? null : id))
  }, [])

  const showEmptySearch = steps.length === 0

  return (
    <section className="relative space-y-8 pb-8 max-md:pb-24">
      <WorkspaceHero
        eyebrow="Structured learning"
        title="OpsOrbit roadmap"
        description="Follow the journey in order — expand modules for topics and deep links into Commands, LAB, and Tools."
        className="mb-2"
      />
      {showEmptySearch ? (
        <Card className="border-dashed border-indigo-300/40 bg-gradient-to-br from-white/90 to-indigo-50/40 px-8 py-14 text-center dark:border-indigo-500/25 dark:from-[var(--hub-card)] dark:to-indigo-950/30">
          <p className="text-base leading-relaxed text-[var(--hub-sub)]">
            No roadmap modules match your search. Try different keywords.
          </p>
        </Card>
      ) : (
        <div className="relative w-full min-w-0 px-3 sm:px-5">
          <header id="roadmap-modules-top" className="mb-6 scroll-mt-4 text-center">
            <h2 className="mx-auto inline-block rounded-2xl border border-white/30 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-center text-[15px] font-extrabold leading-snug tracking-tight text-white shadow-lg shadow-indigo-500/25 sm:text-lg">
              Learning path modules
            </h2>
            <p className="mt-3 text-[12px] text-[var(--hub-muted)]">
              Swipe horizontally on mobile — vertical flow on desktop with the animated pipeline.
            </p>
          </header>

          <div className="relative max-md:-mx-1 max-md:px-1 md:pl-11">
            <div
              className="roadmap-pipeline-line pointer-events-none absolute bottom-2 left-[15px] top-2 hidden w-[3px] overflow-hidden rounded-full md:block sm:left-[17px]"
              aria-hidden
            >
              <div className="roadmap-pipeline-line-inner absolute inset-0 rounded-full" />
            </div>

            <ol
              className="relative z-[1] m-0 flex list-none flex-row gap-0 overflow-x-auto overflow-y-visible pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory md:flex-col md:gap-0 md:overflow-visible md:pb-0 md:pl-0 [&::-webkit-scrollbar]:hidden"
              aria-label="Learning path"
            >
              {displaySteps.map((step, index) => (
                <Fragment key={step.id}>
                  {index > 0 ? <FlowConnectorBetweenModules /> : null}
                  <li className="relative max-md:min-w-[min(100%,420px)] max-md:shrink-0 max-md:snap-center md:w-full md:pb-10 md:last:pb-3 sm:pb-12">
                    <span
                      className="absolute left-[11px] top-[1.125rem] z-[2] hidden h-2.5 w-2.5 rounded-full border-[2.5px] border-indigo-500 bg-[var(--hub-bg)] shadow-[0_0_12px_2px_rgba(99,102,241,0.55)] dark:border-cyan-400 dark:bg-[var(--hub-bg)] md:block sm:left-[13px] sm:top-[1.2rem]"
                      aria-hidden
                    />
                    <div className="flex flex-col gap-3 pl-0 md:flex-row md:items-start md:gap-6 md:pl-2">
                      <div className="mx-auto hidden w-full max-w-[13rem] shrink-0 rounded-xl border border-indigo-400/40 bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-2.5 text-center text-[13px] font-bold leading-snug text-white shadow-lg shadow-indigo-500/20 md:mx-0 md:block sm:px-5 sm:text-sm">
                        {step.mainTitle}
                      </div>
                      <div className="min-w-0 flex-1">
                        <RoadmapModuleCard
                          step={step}
                          expanded={expandedId === step.id}
                          onToggleExpand={toggleExpand}
                        />
                      </div>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>
        </div>
      )}

      {finalOrderLines.length > 0 ? (
        <section className="w-full min-w-0 rounded-2xl border border-white/20 bg-gradient-to-br from-white/90 via-indigo-50/40 to-violet-50/30 p-4 shadow-[0_12px_40px_-12px_rgba(79,70,229,0.15)] backdrop-blur-xl ring-1 ring-indigo-500/10 sm:p-5 dark:border-white/10 dark:from-[var(--hub-surface)] dark:via-indigo-950/30 dark:to-violet-950/20 dark:ring-indigo-400/15">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-cyan-300 dark:to-indigo-300">
            Summary path
          </h3>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-[var(--hub-sub)]">
            {finalOrderLines.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {onSwitchToCommands ? (
        <RoadmapMobileDock onRoadmap={scrollToModulesTop} onCommands={handleDockCommands} />
      ) : null}
    </section>
  )
}

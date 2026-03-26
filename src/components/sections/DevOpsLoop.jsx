import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { getInfinityPathD } from '../../utils/infinityPath'
import './DevOpsLoop.css'

const VB_W = 800
const VB_H = 280

const DEV_STAGES = [
  { id: 'plan', label: 'Plan', hint: 'Goals, backlog, and prioritization before code.' },
  { id: 'code', label: 'Code', hint: 'Branch, review, and merge with quality gates.' },
  { id: 'build', label: 'Build', hint: 'Compile packages and produce versioned artifacts.' },
  { id: 'test', label: 'Test', hint: 'Automated unit, integration, and security checks.' },
]

const OPS_STAGES = [
  { id: 'release', label: 'Release', hint: 'Version, changelog, and promote to staging or prod.' },
  { id: 'deploy', label: 'Deploy', hint: 'Roll out to environments with pipelines and approvals.' },
  { id: 'operate', label: 'Operate', hint: 'Run, scale, and observe production systems.' },
  { id: 'monitor', label: 'Monitor', hint: 'Metrics, logs, alerts, and continuous feedback.' },
]

function StageChip({ stage, side, index, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto"
      style={{ position: 'absolute', ...stage.pos }}
    >
      <button
        type="button"
        title={stage.hint}
        className={`group flex min-h-[44px] items-center rounded-xl border px-3 py-2 text-left text-xs font-bold uppercase tracking-wide shadow-sm transition-all duration-250 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-[0.65rem] ${
          side === 'dev'
            ? 'border-[#2c5282]/35 bg-white/95 text-[#1a365d] hover:scale-105 hover:border-[#2c5282]/60 hover:shadow-md dark:border-[#8b9dc3]/40 dark:bg-[#161b22]/95 dark:text-[#c5d4f0] dark:hover:border-[#8b9dc3]/70'
            : 'border-[#2f855a]/35 bg-white/95 text-[#22543d] hover:scale-105 hover:border-[#2f855a]/55 hover:shadow-md dark:border-[#3fb950]/35 dark:bg-[#161b22]/95 dark:text-[#86efac] dark:hover:border-[#3fb950]/60'
        } `}
      >
        <span className="whitespace-nowrap">{stage.label}</span>
        <span
          className={`ml-1.5 hidden max-w-[12rem] truncate text-[0.6rem] font-normal normal-case tracking-normal opacity-0 transition-opacity group-hover:opacity-100 sm:block ${
            side === 'dev' ? 'text-[#2c5282] dark:text-[#a0aec0]' : 'text-[#276749] dark:text-[#86efac]/90'
          }`}
        >
          {stage.hint}
        </span>
      </button>
    </motion.div>
  )
}

/* Positions tuned for horizontal lemniscate viewBox 800×280 */
const DEV_LAYOUT = [
  { ...DEV_STAGES[0], pos: { left: '7%', top: '10%' } },
  { ...DEV_STAGES[1], pos: { left: '20%', top: '6%' } },
  { ...DEV_STAGES[2], pos: { left: '8%', top: '68%' } },
  { ...DEV_STAGES[3], pos: { left: '22%', top: '74%' } },
]

const OPS_LAYOUT = [
  { ...OPS_STAGES[0], pos: { right: '7%', top: '10%' } },
  { ...OPS_STAGES[1], pos: { right: '20%', top: '6%' } },
  { ...OPS_STAGES[2], pos: { right: '8%', top: '68%' } },
  { ...OPS_STAGES[3], pos: { right: '22%', top: '74%' } },
]

export default function DevOpsLoop({ className = '' }) {
  const uid = useId().replace(/:/g, '')
  const pathRef = useRef(null)
  const [pathLen, setPathLen] = useState(1600)
  const reduceMotion = useReducedMotion()

  const d = useMemo(() => getInfinityPathD(VB_W, VB_H, 120), [])

  useLayoutEffect(() => {
    const el = pathRef.current
    if (!el || typeof el.getTotalLength !== 'function') return
    setPathLen(Math.ceil(el.getTotalLength()))
  }, [d])

  const gradId = `devops-loop-grad-${uid}`
  const glowId = `devops-loop-glow-${uid}`

  return (
    <section
      className={`border-b border-hub-line/80 bg-gradient-to-b from-hub-surface/60 via-hub-bg to-hub-bg py-10 dark:from-hub-surface/40 dark:via-hub-bg dark:to-hub-bg sm:py-14 ${className}`}
      aria-labelledby={`devops-loop-title-${uid}`}
    >
      <div className="mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-[max(1.5rem,env(safe-area-inset-left,0px))] lg:px-[max(2rem,env(safe-area-inset-left,0px))]">
        <div className="mb-6 text-center sm:mb-8">
          <h2
            id={`devops-loop-title-${uid}`}
            className="text-xl font-bold tracking-tight text-hub-text sm:text-2xl"
          >
            The DevOps lifecycle
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-hub-sub sm:text-base">
            Continuous flow from <span className="font-semibold text-[#2c5282] dark:text-[#8b9dc3]">Dev</span> to{' '}
            <span className="font-semibold text-[#2f855a] dark:text-[#3fb950]">Ops</span> — plan through monitor on one
            loop.
          </p>
        </div>

        {/* Mobile: simplified two-column stages */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-hub-line/80 bg-hub-surface/90 p-4 shadow-card dark:bg-hub-elevated/40">
            <div>
              <p className="mb-3 text-center font-[family-name:Orbitron] text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#2c5282] dark:text-[#8b9dc3]">
                Dev
              </p>
              <ul className="space-y-2">
                {DEV_STAGES.map((s) => (
                  <li key={s.id}>
                    <span
                      className="block rounded-lg border border-[#2c5282]/25 bg-hub-bg/80 px-2.5 py-2 text-center text-[0.7rem] font-semibold uppercase tracking-wide text-[#1a365d] dark:border-[#8b9dc3]/30 dark:bg-hub-bg/50 dark:text-[#c5d4f0]"
                      title={s.hint}
                    >
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-center font-[family-name:Orbitron] text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#2f855a] dark:text-[#3fb950]">
                Ops
              </p>
              <ul className="space-y-2">
                {OPS_STAGES.map((s) => (
                  <li key={s.id}>
                    <span
                      className="block rounded-lg border border-[#2f855a]/25 bg-hub-bg/80 px-2.5 py-2 text-center text-[0.7rem] font-semibold uppercase tracking-wide text-[#22543d] dark:border-[#3fb950]/30 dark:bg-hub-bg/50 dark:text-[#86efac]"
                      title={s.hint}
                    >
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-2xl text-hub-muted" aria-hidden>
            ∞
          </p>
        </div>

        {/* Desktop / tablet: full SVG loop */}
        <div className="devops-loop-float relative mx-auto hidden max-w-4xl md:block">
          <div className="relative aspect-[800/280] w-full overflow-visible rounded-2xl border border-hub-line/70 bg-gradient-to-br from-white/90 via-hub-bg/40 to-white/80 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.2)] dark:from-hub-elevated/50 dark:via-hub-bg dark:to-hub-elevated/30 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
              style={{ ['--devops-loop-len']: String(pathLen) }}
            >
              <defs>
                <linearGradient id={gradId} x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#2c5282" />
                  <stop offset="45%" stopColor="#2d4a6e" />
                  <stop offset="55%" stopColor="#2f855a" />
                  <stop offset="100%" stopColor="#48bb78" />
                </linearGradient>
                <radialGradient id={glowId}>
                  <stop offset="0%" stopColor="#48bb78" stopOpacity="1" />
                  <stop offset="100%" stopColor="#48bb78" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Soft track */}
              <path
                d={d}
                fill="none"
                stroke="currentColor"
                className="text-hub-line dark:text-hub-line/80"
                strokeWidth={18}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.45}
              />

              {/* Main gradient stroke (defines path length + mpath target) */}
              <path
                id={`devops-loop-trace-${uid}`}
                ref={pathRef}
                d={d}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.88}
              />

              {/* Animated flow segment */}
              <path
                d={d}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="devops-loop-flow"
                style={{ filter: 'drop-shadow(0 0 5px rgba(72,187,120,0.4))' }}
              />

              {/* Moving glow dots along path (SMIL) */}
              {!reduceMotion && (
                <>
                  <circle r="5" fill={`url(#${glowId})`} opacity={0.92}>
                    <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                      <mpath href={`#devops-loop-trace-${uid}`} />
                    </animateMotion>
                  </circle>
                  <circle r="4" fill="#2c5282" className="dark:fill-[#8b9dc3]" opacity={0.95}>
                    <animateMotion dur="14s" repeatCount="indefinite" begin="4.5s" rotate="auto">
                      <mpath href={`#devops-loop-trace-${uid}`} />
                    </animateMotion>
                  </circle>
                </>
              )}
            </svg>

            {/* Labels overlay */}
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                className="pointer-events-auto absolute left-[11%] top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <span className="rounded-xl border border-[#2c5282]/40 bg-white/95 px-3 py-1.5 font-[family-name:Orbitron] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#2c5282] shadow-md dark:border-[#8b9dc3]/50 dark:bg-[#161b22]/95 dark:text-[#8b9dc3]">
                  Dev
                </span>
              </motion.div>
              <motion.div
                className="pointer-events-auto absolute right-[11%] top-1/2 translate-x-1/2 -translate-y-1/2"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                <span className="rounded-xl border border-[#2f855a]/45 bg-white/95 px-3 py-1.5 font-[family-name:Orbitron] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#276749] shadow-md dark:border-[#3fb950]/50 dark:bg-[#161b22]/95 dark:text-[#3fb950]">
                  Ops
                </span>
              </motion.div>

              {DEV_LAYOUT.map((stage, i) => (
                <StageChip key={stage.id} stage={stage} side="dev" index={i} reduceMotion={reduceMotion} />
              ))}
              {OPS_LAYOUT.map((stage, i) => (
                <StageChip key={stage.id} stage={stage} side="ops" index={i} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

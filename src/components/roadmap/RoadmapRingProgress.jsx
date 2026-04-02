import { motion } from 'motion/react'

export default function RoadmapRingProgress({ completed, total, size = 72, stroke = 6 }) {
  const pct = total > 0 ? completed / total : 0
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - pct)

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-[var(--hub-line)] dark:text-[var(--hub-elevated)]"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          className="text-hub-primary"
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: 'spring', stiffness: 100, damping: 22 }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold tabular-nums text-[var(--hub-text)] sm:text-xs">
          {Math.round(pct * 100)}%
        </span>
        <span className="text-[8px] text-[var(--hub-muted)] sm:text-[9px]">
          {completed}/{total}
        </span>
      </div>
    </div>
  )
}

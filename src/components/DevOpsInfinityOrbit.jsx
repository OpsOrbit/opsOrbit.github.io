import { useId } from 'react'
import { useReducedMotion } from 'motion/react'
import Galaxy from './Galaxy'
import OrbitImages from './OrbitImages'
import { getInfinityPathD } from '../utils/infinityPath'
import { TOOL_ORBIT_URLS_DEVOPS_FLOW } from '../data/toolOrbitImages'

/* Wide, shallow canvas: compact vertical footprint; path math scales with BASE_H. */
const BASE_W = 920
const BASE_H = 198

/**
 * Classic DevOps ∞: navy→green gradient track, Dev / Ops labels in each lobe, tools on the same path as OrbitImages.
 */
export default function DevOpsInfinityOrbit({ paused }) {
  const uid = useId().replace(/:/g, '')
  const prefersReducedMotion = useReducedMotion()
  const gradId = `devops-inf-${uid}`
  const d = getInfinityPathD(BASE_W, BASE_H)

  const shadowFilterId = `devops-inf-shadow-${uid}`
  const rimGradId = `devops-inf-rim-${uid}`

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-black/[0.06] bg-hub-bg/40 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_1px_3px_rgba(15,23,42,0.08)] aspect-[920/198] dark:border-white/[0.08] dark:bg-hub-bg/30 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_4px_rgba(0,0,0,0.35)]"
    >
      {/* WebGL starfield — only this strip; mouse passes through scrim + orbit layers */}
      <Galaxy
        className="absolute inset-0 z-0"
        transparent
        disableAnimation={paused}
        mouseInteraction
        mouseRepulsion
        density={0.88}
        glowIntensity={0.22}
        saturation={0.12}
        hueShift={172}
        twinkleIntensity={0.22}
        rotationSpeed={0.055}
        repulsionStrength={1.6}
        autoCenterRepulsion={0}
        starSpeed={0.42}
        speed={0.85}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-xl bg-gradient-to-b from-hub-surface/92 via-hub-bg/88 to-[color-mix(in_srgb,var(--hub-bg)_90%,var(--hub-line))] dark:from-[color-mix(in_srgb,var(--hub-elevated)_82%,black)] dark:via-hub-bg/90 dark:to-hub-bg/95"
        aria-hidden
      />
      {/* Perspective tilt: loop lies on a plane receding from the viewer → motion reads toward/away (front/back), not flat up/down on the page. */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          perspective: 'min(100vw, 72rem)',
          perspectiveOrigin: '50% 42%',
        }}
        aria-hidden
      >
        <div
          className="absolute inset-x-0 top-[2%] bottom-[10%] [transform-style:preserve-3d] sm:top-[1%] sm:bottom-[8%]"
          style={
            prefersReducedMotion
              ? { transformOrigin: '50% 55%' }
              : {
                  transform: 'rotateX(22deg) scale3d(1, 0.94, 1)',
                  transformOrigin: '50% 55%',
                }
          }
        >
          <svg
            viewBox={`0 0 ${BASE_W} ${BASE_H}`}
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor="var(--infinity-dev)" />
                <stop offset="45%" stopColor="var(--infinity-dev-mid)" />
                <stop offset="55%" stopColor="var(--infinity-ops)" />
                <stop offset="100%" stopColor="var(--infinity-ops-bright)" />
              </linearGradient>
              <linearGradient id={rimGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
              </linearGradient>
          <filter id={shadowFilterId} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.14" />
          </filter>
            </defs>
            {/* Depth: sunken “lower” rail */}
            <path
              d={d}
              fill="none"
              stroke="rgba(15,23,42,0.2)"
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0 3)"
              className="dark:stroke-black/35"
            />
            <path
              d={d}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={12}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.16}
              filter={`url(#${shadowFilterId})`}
              className="dark:opacity-[0.2]"
            />
            <path
              d={d}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={5.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.42}
              className="dark:opacity-[0.44]"
            />
            {/* Highlight edge for a tube / bevel read */}
            <path
              d={d}
              fill="none"
              stroke={`url(#${rimGradId})`}
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.38}
              className="dark:opacity-32"
            />
          </svg>

          <span
            className="pointer-events-none absolute left-[11%] top-[48%] z-0 -translate-x-1/2 -translate-y-1/2 font-[family-name:Orbitron] text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[var(--infinity-ops-bright)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] sm:left-[12%] sm:text-[0.65rem]"
            aria-hidden
          >
            Dev
          </span>
          <span
            className="pointer-events-none absolute left-[89%] top-[48%] z-0 -translate-x-1/2 -translate-y-1/2 font-[family-name:Orbitron] text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[var(--infinity-dev)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] sm:left-[88%] sm:text-[0.65rem]"
            aria-hidden
          >
            Ops
          </span>

          <div className="relative z-[2] h-full w-full">
            <OrbitImages
              images={TOOL_ORBIT_URLS_DEVOPS_FLOW}
              altPrefix="DevOps tool"
              shape="infinity"
              baseWidth={BASE_W}
              baseHeight={BASE_H}
              rotation={0}
              duration={58}
              itemSize={64}
              responsive
              fill
              direction="normal"
              showPath={false}
              paused={paused}
              className="mx-0 orbit-infinity-3d"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

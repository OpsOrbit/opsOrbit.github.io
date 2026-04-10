import DockMagnify from '../DockMagnify'

/**
 * Small outline icons (24 viewBox) — keeps the nav scannable without adding a dependency.
 * @param {{ className?: string }} props
 */
function NavIcon({ id, className = 'h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]' }) {
  const common = {
    className: `${className} shrink-0`,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    'aria-hidden': true,
  }
  switch (id) {
    case 'tools':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      )
    case 'commands':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l2.5 2.5L8 14m4 4h4" />
        </svg>
      )
    case 'scripting':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597-.237 1.17-.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082m0 0a24.301 24.301 0 014.5 0" />
        </svg>
      )
    case 'roadmap':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25H5.25a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5h3.75m0 0h9a1.5 1.5 0 011.5 1.5v3.75m-12 0v9m0-9h6.75m-6.75 0V6.75m0 0h6.75" />
        </svg>
      )
    case 'techwords':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v15.128A8.997 8.997 0 012 21c1.052 0 2.062-.18 3-.512v-4.5M12 6.042A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v15.128a8.997 8.997 0 01-7-1.122M12 6.042v15.128" />
        </svg>
      )
    case 'concepts':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      )
    case 'ports':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.75m-12.75 3.75v1.5M19.5 15.75v1.5M8.25 19.5v1.5M12 21v-1.5m0-15V3m0 9h6m-6 0H6" />
        </svg>
      )
    case 'scenarios':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z" />
        </svg>
      )
    case 'playground':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
      )
    case 'architecture':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 9.75m12.429 0l4.179-2.25M12 2.25l5.571 3-5.571 3-5.571-3 5.571-3zm0 19.5l-5.571-3 5.571-3 5.571 3-5.571 3z" />
        </svg>
      )
    case 'cheatsheets':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    case 'utilities':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm4.5 12h9.75m-9.75 0a1.125 1.125 0 01-2.25 0m2.25 0a1.125 1.125 0 002.25 0zm-9-4.5h9.75m-9.75 0a1.125 1.125 0 01-2.25 0m2.25 0a1.125 1.125 0 002.25 0zm4.5-4.5h9.75m-9.75 0a1.125 1.125 0 01-2.25 0m2.25 0a1.125 1.125 0 002.25 0z" />
        </svg>
      )
    case 'daily':
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5m-18 0h18" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
  }
}

/** Grouped for visual rhythm — item order must match `WORKSPACE_MODE_ORDER` in `constants/workspaceModes.js`. */
const WORKSPACE_GROUPS = /** @type {const} */ ([
  {
    label: 'Build & run',
    items: [
      { id: 'tools', label: 'Tools', size: 'md', title: 'DevOps tools encyclopedia' },
      { id: 'commands', label: 'Commands', size: 'md', title: 'Command reference by tool' },
      { id: 'scripting', label: 'LAB', size: 'md', title: 'Interactive lab modules' },
      { id: 'roadmap', label: 'Roadmap', size: 'md', title: 'Learning roadmap' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { id: 'techwords', label: 'Tech Words', size: 'sm', title: 'Technical dictionary' },
      { id: 'concepts', label: 'Concepts', size: 'sm', title: 'Core technical concepts' },
      { id: 'ports', label: 'Ports', size: 'sm', title: 'Network ports reference' },
      { id: 'scenarios', label: 'Scenarios', size: 'sm', title: 'DevOps troubleshooting scenarios' },
    ],
  },
  {
    label: 'Practice',
    items: [
      { id: 'playground', label: 'Playground', size: 'sm', title: 'Simulated CLI playground' },
      { id: 'architecture', label: 'Architecture', size: 'sm', title: 'Cloud & DevOps architecture diagrams' },
      { id: 'cheatsheets', label: 'Cheatsheets', size: 'sm', title: 'Quick command cheatsheets' },
      { id: 'utilities', label: 'Utilities', size: 'sm', title: 'CIDR, Base64, JSON, port check' },
      { id: 'daily', label: 'Daily', size: 'sm', title: 'Concept, command, and quiz of the day' },
    ],
  },
])

const BTN =
  'group flex min-h-[44px] min-w-0 items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left font-semibold leading-tight tracking-tight transition-[color,background-color,border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-surface)] whitespace-nowrap sm:min-h-[46px] sm:gap-2 sm:px-3.5 sm:py-2.5'

const SZ = {
  md: 'text-xs sm:text-sm',
  sm: 'text-[11px] sm:text-xs',
}

/**
 * Full-width workspace switcher (desktop). Mobile uses {@link MobileWorkspaceBottomNav}.
 *
 * @param {{ workspaceMode: string, onWorkspaceModeChange: (mode: string) => void }} props
 */
export default function WorkspaceModeNav({ workspaceMode, onWorkspaceModeChange }) {
  return (
    <nav
      className="workspace-mode-nav relative z-[92] hidden w-full min-w-0 shrink-0 border-b border-[var(--hub-line)]/80 bg-gradient-to-b from-indigo-50/90 via-slate-50/80 to-[var(--hub-bg)] py-2.5 backdrop-blur-[2px] dark:from-indigo-950/35 dark:via-[var(--hub-elevated)]/50 dark:to-[var(--hub-bg)] lg:block"
      aria-label="Workspace: Tools, Commands, LAB, Roadmap, and more"
    >
      {/* Top accent line — ties the bar to the brand without a heavy border */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/35 to-transparent dark:via-emerald-500/25"
        aria-hidden
      />

      <div className="w-full min-w-0 bg-[var(--hub-surface)]/85 shadow-[var(--hub-shadow-card)] ring-1 ring-black/[0.03] ring-inset backdrop-blur-md dark:bg-[var(--hub-elevated)]/75 dark:ring-white/[0.06]">
        <DockMagnify
          as="div"
          className="flex w-full min-w-0 flex-wrap items-center justify-center gap-1.5 px-2 py-3 sm:gap-2 sm:px-4 sm:py-3.5 lg:px-6 xl:px-8"
          itemClipClassName="flex max-w-full shrink-0 overflow-hidden rounded-xl"
          itemWrapperClassName="flex shrink-0 justify-center origin-center"
          role="group"
        >
            {WORKSPACE_GROUPS.flatMap((group, gi) => {
              const buttons = group.items.map((item) => {
                const active = workspaceMode === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onWorkspaceModeChange(item.id)}
                    title={item.title}
                    className={`${BTN} ${SZ[item.size]} ${
                      active
                        ? 'border-[var(--hub-tool)]/35 bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] [&_.nav-icon]:text-[var(--hub-tool)] [&_.nav-icon]:opacity-100'
                        : 'text-[var(--hub-muted)] hover:border-[var(--hub-line)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)] [&_.nav-icon]:opacity-55 [&_.nav-icon]:group-hover:opacity-90'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="nav-icon text-[var(--hub-sub)] transition-opacity">
                      <NavIcon id={item.id} />
                    </span>
                    <span className="min-w-0">{item.label}</span>
                  </button>
                )
              })
              if (gi === 0) return buttons
              const divider = (
                <div
                  key={`workspace-nav-divider-${gi}`}
                  className="mx-0.5 hidden h-10 w-px shrink-0 self-center bg-gradient-to-b from-transparent via-[var(--hub-border2)]/70 to-transparent sm:mx-1 sm:block"
                  aria-hidden
                />
              )
              return [divider, ...buttons]
            })}
        </DockMagnify>
      </div>
    </nav>
  )
}

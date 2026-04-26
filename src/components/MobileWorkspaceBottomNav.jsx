/**
 * Fixed bottom workspace switcher for viewports below `lg` (sidebar hidden).
 * Horizontal scroll; compact labels; safe-area aware.
 */
export default function MobileWorkspaceBottomNav({ workspaceMode, onWorkspaceModeChange }) {
  if (typeof onWorkspaceModeChange !== 'function') return null

  const Item = ({ mode, label, icon }) => {
    const active = workspaceMode === mode
    return (
      <button
        type="button"
        onClick={() => onWorkspaceModeChange(mode)}
        className={`flex min-h-[38px] min-w-[2.85rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-0.5 py-0.5 text-[8px] font-bold uppercase tracking-wide transition-[color,background-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-surface)] min-[360px]:min-w-[3.1rem] min-[360px]:text-[8.5px] min-[400px]:min-w-[3.25rem] ${
          active
            ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] ring-1 ring-[var(--hub-tool)]/70 ring-inset shadow-none'
            : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
        }`}
        aria-current={active ? 'page' : undefined}
        aria-pressed={active}
      >
        <span className="text-[0.8rem] leading-none min-[360px]:text-[0.88rem]" aria-hidden>
          {icon}
        </span>
        <span className="max-w-[3.25rem] truncate text-center leading-tight min-[360px]:max-w-[3.85rem]">{label}</span>
      </button>
    )
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[var(--hub-line)] bg-[var(--hub-surface)]/96 pb-[max(0.25rem,env(safe-area-inset-bottom,0px))] pl-[max(0px,env(safe-area-inset-left,0px))] pr-[max(0px,env(safe-area-inset-right,0px))] pt-0.5 shadow-[0_-6px_20px_-10px_rgba(0,0,0,0.12)] backdrop-blur-md dark:bg-[var(--hub-elevated)]/96 lg:hidden"
      aria-label="Workspace"
    >
      <div className="hub-inline-scroll scrollbar-hide mx-auto flex w-full max-w-2xl items-stretch justify-start gap-0.5 overflow-x-auto overscroll-x-contain px-1 pb-0.5 pe-4 pt-0.5 min-[520px]:justify-center min-[520px]:overflow-x-visible min-[520px]:pe-2 sm:gap-1 sm:px-2">
        <Item mode="tools" label="Tools" icon="🧰" />
        <Item mode="commands" label="Cmds" icon="⌘" />
        <Item mode="scripting" label="Lab" icon="⚡" />
        <Item mode="roadmap" label="Map" icon="🗺" />
        <Item mode="concepts" label="Ideas" icon="💡" />
        <Item mode="ports" label="Ports" icon="🔌" />
        <Item mode="scenarios" label="Cases" icon="🧩" />
        <Item mode="playground" label="Play" icon="⌨" />
        <Item mode="architecture" label="Arch" icon="⬡" />
        <Item mode="cheatsheets" label="Sheets" icon="📋" />
        <Item mode="utilities" label="Utils" icon="🔧" />
        <Item mode="daily" label="Daily" icon="📅" />
        <Item mode="techwords" label="Words" icon="📖" />
      </div>
    </nav>
  )
}

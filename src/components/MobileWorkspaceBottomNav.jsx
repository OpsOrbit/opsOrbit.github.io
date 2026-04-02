/**
 * Fixed bottom workspace switcher for viewports below `lg` (sidebar hidden).
 */
export default function MobileWorkspaceBottomNav({ workspaceMode, onWorkspaceModeChange }) {
  if (typeof onWorkspaceModeChange !== 'function') return null

  const Item = ({ mode, label, icon }) => {
    const active = workspaceMode === mode
    return (
      <button
        type="button"
        onClick={() => onWorkspaceModeChange(mode)}
        className={`flex min-h-[48px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-surface)] ${
          active
            ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
            : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
        }`}
        aria-current={active ? 'page' : undefined}
        aria-pressed={active}
      >
        <span className="text-base leading-none" aria-hidden>
          {icon}
        </span>
        <span className="max-w-full truncate">{label}</span>
      </button>
    )
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[85] border-t border-[var(--hub-line)] bg-[var(--hub-surface)]/95 pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] pt-1 shadow-[0_-4px_24px_-2px_rgba(0,0,0,0.08)] backdrop-blur-md dark:bg-[var(--hub-elevated)]/95 lg:hidden"
      aria-label="Workspace"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-center gap-0.5 px-1">
        <Item mode="tools" label="Tools" icon="🧰" />
        <Item mode="commands" label="Commands" icon="⌘" />
        <Item mode="scripting" label="Lab" icon="⚡" />
        <Item mode="roadmap" label="Roadmap" icon="🗺" />
      </div>
    </nav>
  )
}

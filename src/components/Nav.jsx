import CommandFilters from './CommandFilters'

export default function Nav({ tool, onToolChange }) {
  return (
    <nav
      id="command-filters"
      className="relative z-30 scroll-mt-28 border-b border-hub-line bg-hub-surface/95 shadow-sm backdrop-blur-sm dark:bg-hub-surface/90"
      aria-label="Filter commands"
    >
      <div className="mx-auto max-w-7xl space-y-0 py-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))] lg:pl-[max(2rem,env(safe-area-inset-left,0px))] lg:pr-[max(2rem,env(safe-area-inset-right,0px))]">
        <div className="hidden md:block">
          <CommandFilters tool={tool} onToolChange={onToolChange} />
        </div>
        <p className="md:hidden text-sm text-hub-sub">
          Use the <span className="font-semibold text-hub-text">menu</span> to pick a tool on smaller screens.
        </p>
      </div>
    </nav>
  )
}

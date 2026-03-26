/**
 * Placeholder locale control — wire to i18n when available.
 */
export default function LanguageSwitcher({ className = '' }) {
  return (
    <div
      className={`inline-flex items-center rounded-lg border border-hub-line/80 bg-hub-bg/60 p-0.5 text-[0.65rem] font-bold uppercase tracking-wider dark:bg-hub-elevated/40 ${className}`}
      role="group"
      aria-label="Language (coming soon)"
    >
      <span className="rounded-md bg-hub-surface px-2 py-1 text-hub-text shadow-sm dark:bg-hub-surface">EN</span>
      <span
        className="px-2 py-1 text-hub-muted"
        title="Additional languages coming soon"
        aria-disabled="true"
      >
        UA
      </span>
    </div>
  )
}

/**
 * App shell: column flex layout, full viewport height, shared background.
 * Header / hero / nav are composed by the parent; this only provides structure.
 */
export default function MainLayout({ children, className = '' }) {
  return (
    <div
      className={`flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-[var(--hub-bg)] ${className}`}
    >
      {children}
    </div>
  )
}

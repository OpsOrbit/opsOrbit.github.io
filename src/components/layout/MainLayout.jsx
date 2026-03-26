/**
 * App shell: column flex layout, full viewport height, shared background.
 * Header / hero / nav are composed by the parent; this only provides structure.
 */
export default function MainLayout({ children, className = '' }) {
  return (
    <div className={`flex min-h-screen min-h-[100dvh] flex-col bg-[var(--hub-bg)] ${className}`}>{children}</div>
  )
}

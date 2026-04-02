export default function LearnerBadge({ tier, className = '' }) {
  if (!tier) return null
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-hub-line bg-hub-surface px-3 py-1.5 text-left shadow-sm dark:bg-hub-elevated ${className}`}
    >
      <span className="text-lg leading-none" aria-hidden>
        {tier.emoji}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-hub-primary">{tier.label}</p>
      </div>
    </div>
  )
}

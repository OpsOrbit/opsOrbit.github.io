import { motion } from 'motion/react'

/**
 * Surface card with optional hover lift (motion).
 */
export default function Card({ children, className = '', hover = false, elevated = false }) {
  const base =
    'rounded-2xl border border-hub-line/90 bg-hub-surface shadow-card transition-[box-shadow,transform] duration-200 dark:border-hub-line dark:bg-hub-surface'

  const elevatedCls = elevated ? ' hover:shadow-card-hover md:hover:-translate-y-0.5' : ''

  if (hover) {
    return (
      <motion.div
        className={`${base}${elevatedCls} ${className}`}
        whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={`${base}${elevatedCls} ${className}`}>{children}</div>
}

import { motion } from 'motion/react'

/**
 * Surface card with optional hover lift (motion).
 */
export default function Card({ children, className = '', hover = false }) {
  const base =
    'rounded-2xl border border-hub-line/90 bg-hub-surface shadow-card dark:border-hub-line dark:bg-hub-surface'

  if (hover) {
    return (
      <motion.div
        className={`${base} ${className}`}
        whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={`${base} ${className}`}>{children}</div>
}

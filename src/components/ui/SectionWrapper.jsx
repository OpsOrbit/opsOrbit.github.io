import { motion } from 'motion/react'

/**
 * Max-width section with optional title and scroll-reveal.
 */
export default function SectionWrapper({
  children,
  title,
  subtitle,
  className = '',
  contentClassName = '',
  id,
  delay = 0,
}) {
  return (
    <motion.section
      id={id}
      className={`mx-auto w-full max-w-7xl ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {(title || subtitle) && (
        <header className="mb-6 sm:mb-8">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight text-hub-text sm:text-3xl">{title}</h2>
          )}
          {subtitle && <p className="mt-2 max-w-2xl text-base leading-relaxed text-hub-sub">{subtitle}</p>}
        </header>
      )}
      <div className={contentClassName}>{children}</div>
    </motion.section>
  )
}

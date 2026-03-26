import { forwardRef } from 'react'

const variants = {
  primary:
    'bg-hub-primary text-white shadow-md shadow-hub-primary/20 hover:bg-hub-primary-hover hover:shadow-lg hover:shadow-hub-primary/25 dark:text-[#0d1117]',
  secondary:
    'border border-hub-line bg-hub-surface text-hub-text shadow-card hover:border-hub-primary/35 hover:bg-hub-elevated hover:shadow-card-hover',
  ghost: 'text-hub-sub hover:bg-hub-elevated/80 hover:text-hub-text dark:hover:bg-hub-elevated/50',
  outline:
    'border-2 border-hub-primary/40 bg-transparent text-hub-primary hover:bg-hub-primary/10 dark:hover:bg-hub-primary/15',
}

const sizes = {
  sm: 'min-h-9 px-3.5 py-2 text-sm',
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
}

/**
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'|'outline'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]
 */
const Button = forwardRef(function Button(
  { className = '', variant = 'primary', size = 'md', type = 'button', children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex touch-manipulation items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-250 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-bg active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button

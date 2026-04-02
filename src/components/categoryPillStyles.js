/** Shared with CategoryHub (all tools) and SidebarToolTree (single tool). */

/**
 * Horizontal pill rows: use OUTER + INNER together.
 * Outer is the scrollport (`overflow-x` + `min-w-0`); inner is `w-max` below `sm` so content
 * is wider than the viewport and horizontal swipe works. A single flex+overflow element often
 * grows to fit children and never scrolls.
 */
export const CATEGORY_PILL_SCROLL_OUTER_CLASS =
  'hub-inline-scroll w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden pb-1 pe-3 sm:overflow-x-visible sm:pb-0 sm:pe-0'

/** Flex track — pair with CATEGORY_PILL_SCROLL_OUTER_CLASS */
export const CATEGORY_PILL_SCROLL_INNER_CLASS =
  'flex w-max min-w-0 max-w-none flex-nowrap gap-1.5 sm:w-full sm:max-w-full sm:flex-wrap sm:justify-center sm:gap-2'

export const CATEGORY_PILL_BUTTON_CLASS =
  'inline-flex max-w-full min-h-[36px] shrink-0 touch-manipulation items-center rounded-full border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-1.5 text-left text-[9px] font-bold uppercase leading-snug tracking-[0.05em] text-[var(--hub-tool)] shadow-sm transition-all duration-150 hover:border-[var(--hub-tool)]/55 hover:bg-[var(--hub-tool-dim)] active:scale-[0.98] active:bg-[var(--hub-primary)] active:text-white active:shadow-md dark:active:text-[#0d1117] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] sm:min-h-[40px] sm:px-3 sm:text-[10px]'

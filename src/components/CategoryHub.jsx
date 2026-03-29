import { useEffect, useState } from 'react'
import ToolIcon from './ToolIcon'
import { compareTools } from '../data/categoryOrder'
import { CATEGORY_PILL_BUTTON_CLASS, CATEGORY_PILL_NAV_CLASS } from './categoryPillStyles'
import DockMagnify from './DockMagnify'

/**
 * Accordion-style tool sections; categories inside an expanded tool are horizontal pill chips.
 */
export default function CategoryHub({ summaries, onPickCategory, toolLabel, toolFilter, onBackToAllTools }) {
  if (summaries.length === 0) return null

  const byTool = new Map()
  for (const row of summaries) {
    if (!byTool.has(row.tool)) byTool.set(row.tool, [])
    byTool.get(row.tool).push(row)
  }

  const toolKeys = [...byTool.keys()].sort(compareTools)
  /** All sections start collapsed; user expands one at a time. Resets on remount (e.g. switching to All tools). */
  const [openTool, setOpenTool] = useState(null)

  // If the expanded tool vanishes from the list (e.g. search/level filter), collapse — do not auto-open another.
  useEffect(() => {
    if (openTool != null && !toolKeys.includes(openTool)) {
      setOpenTool(null)
    }
  }, [openTool, toolKeys])

  const showAllToolsBack = toolFilter && toolFilter !== 'all' && typeof onBackToAllTools === 'function'

  return (
    <div className="space-y-3">
      {showAllToolsBack && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onBackToAllTools}
            className="min-h-[48px] rounded-lg border border-hub-line bg-hub-bg px-4 py-2.5 text-sm font-medium text-hub-text transition-all duration-200 hover:border-hub-primary/40 hover:bg-hub-elevated active:bg-hub-elevated/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-bg dark:bg-hub-elevated/60"
          >
            ← All tools
          </button>
        </div>
      )}
      {toolKeys.map((tool) => {
        const expanded = openTool === tool
        return (
        <section
          key={tool}
          className={`hub-fade-in overflow-hidden rounded-2xl border bg-hub-surface shadow-card transition-[border-color,box-shadow,transform] duration-250 ${
            expanded
              ? 'border-hub-primary/55 shadow-lg shadow-hub-primary/10 ring-1 ring-hub-primary/25 dark:border-hub-primary/45 dark:ring-hub-primary/20'
              : 'border-hub-line hover:shadow-card-hover md:hover:-translate-y-0.5'
          }`}
          aria-labelledby={`category-tool-${tool}`}
        >
          <button
            type="button"
            id={`category-tool-${tool}`}
            onClick={() => setOpenTool((prev) => (prev === tool ? null : tool))}
            aria-expanded={expanded}
            className={`flex min-h-[52px] w-full touch-manipulation items-center gap-2 border-b px-4 py-3 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-hub-primary ${
              expanded
                ? 'border-hub-primary/30 bg-hub-primary text-white hover:bg-hub-primary-hover dark:border-hub-primary/40 dark:bg-hub-primary dark:text-[#0d1117] dark:hover:bg-hub-primary-hover'
                : 'border-hub-line/60 bg-hub-elevated/40 hover:bg-hub-elevated/70 dark:border-hub-line/60 dark:bg-hub-elevated/50 dark:hover:bg-hub-elevated/80'
            }`}
          >
            <span
              className={`inline-flex w-4 shrink-0 items-center justify-center text-sm leading-none transition-transform duration-200 ${
                expanded ? 'text-white dark:text-[#0d1117]' : 'text-hub-muted'
              } ${expanded ? 'rotate-90' : ''}`}
              aria-hidden
            >
              ›
            </span>
            <ToolIcon
              tool={tool}
              className={`h-4 w-4 shrink-0 ${expanded ? 'text-white dark:text-[#0d1117]' : 'text-hub-muted'}`}
            />
            <span
              className={`text-xs font-semibold uppercase tracking-wider sm:text-sm ${
                expanded ? 'text-white dark:text-[#0d1117]' : 'text-hub-sub'
              }`}
            >
              {toolLabel(tool)}
            </span>
            <span
              className={`ml-auto text-xs font-medium normal-case tracking-normal ${
                expanded ? 'text-white/90 dark:text-[#0d1117]' : 'text-hub-muted'
              }`}
            >
              {byTool.get(tool).reduce((n, r) => n + r.count, 0)} commands
            </span>
          </button>

          {expanded && (
            <div className="border-t border-hub-line/60 bg-hub-bg/40 px-3 py-3 dark:border-hub-line/60 dark:bg-hub-bg/20 sm:px-4 sm:py-3.5">
              <DockMagnify
                as="nav"
                className={CATEGORY_PILL_NAV_CLASS}
                itemClipClassName="inline-flex max-w-full shrink-0 overflow-hidden rounded-full"
                itemWrapperClassName="inline-flex max-w-full shrink-0 origin-center"
                aria-label={`${toolLabel(tool)} — pick a category`}
              >
                {byTool.get(tool).map((row) => (
                  <button
                    key={`${row.tool}-${row.category}`}
                    type="button"
                    onClick={() => onPickCategory({ tool: row.tool, category: row.category })}
                    title={`${row.category} — ${row.count} commands · browse by level`}
                    className={CATEGORY_PILL_BUTTON_CLASS}
                  >
                    <span className="whitespace-nowrap">{row.category}</span>
                    <span className="ml-1 shrink-0 font-mono text-[0.95em] font-bold tabular-nums opacity-90">
                      ({row.count})
                    </span>
                  </button>
                ))}
              </DockMagnify>
            </div>
          )}
        </section>
        )
      })}
    </div>
  )
}

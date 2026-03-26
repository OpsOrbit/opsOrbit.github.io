import { useState } from 'react'
import { getToolInstall } from '../data/toolInstallInfo'
import { getToolExplanation } from '../data/toolExplanations'

const TABS = [
  { id: 'ubuntu', label: 'Ubuntu' },
  { id: 'linux', label: 'Linux' },
  { id: 'windows', label: 'Windows' },
]

/**
 * About + Install in the main workspace (right column beside categories/commands).
 */
export default function ToolGuideColumn({ tool, toolTitle, className = '' }) {
  const explanation = getToolExplanation(tool)
  const data = getToolInstall(tool)
  const [tab, setTab] = useState('ubuntu')

  if (!tool || tool === 'all') return null
  if (!explanation && !data) return null

  const platform = data?.[tab]
  const steps = platform?.steps || []

  const summaryCls =
    'flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--hub-tool-dim2)] [&::-webkit-details-marker]:hidden'

  return (
    <aside
      className={`rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] shadow-[var(--hub-shadow-card)] lg:sticky lg:top-3 lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto lg:overscroll-contain ${className}`}
      aria-label={`${toolTitle} guide`}
    >
      <div className="divide-y divide-[var(--hub-line)]/80 p-1 sm:p-2">
        {explanation && (
          <details className="group px-2 py-2">
            <summary className={summaryCls}>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--hub-text)] sm:text-sm">
                About · {toolTitle}
              </span>
              <span
                className="shrink-0 text-xs text-[var(--hub-muted)] transition-transform duration-150 group-open:rotate-90"
                aria-hidden
              >
                ▸
              </span>
            </summary>
            <div className="space-y-3 px-1 pb-2 pt-2">
              {[
                { t: 'What it is', b: explanation.whatItIs },
                { t: 'Why we use it', b: explanation.whyWeUseIt },
                { t: 'How we use it in practice', b: explanation.howWeUseIt },
              ].map(({ t, b }) => (
                <div key={t}>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-tool)] sm:text-[11px]">{t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--hub-sub)] sm:text-sm">{b}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        {data && (
          <details className={`group px-2 py-2 ${!explanation ? 'pt-2' : ''}`}>
            <summary className={summaryCls}>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--hub-text)] sm:text-sm">
                Install · {toolTitle}
              </span>
              <span
                className="shrink-0 text-xs text-[var(--hub-muted)] transition-transform duration-150 group-open:rotate-90"
                aria-hidden
              >
                ▸
              </span>
            </summary>
            <div className="px-1 pb-2 pt-2">
              <a
                href={data.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-1 break-words text-xs font-semibold text-[var(--hub-tool)] underline underline-offset-2 sm:text-sm"
              >
                {data.officialLabel} ↗
              </a>
              {data.note && (
                <p className="mt-2 text-xs leading-relaxed text-[var(--hub-muted)] sm:text-[13px]">{data.note}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Installation platform">
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={(e) => {
                      e.preventDefault()
                      setTab(id)
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      tab === id
                        ? 'bg-[var(--hub-tool)] text-white'
                        : 'bg-[var(--hub-elevated)] text-[var(--hub-muted)] ring-1 ring-[var(--hub-border2)] hover:text-[var(--hub-text)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed text-[var(--hub-text)] sm:text-[13px]">
                {steps.map((step, i) => (
                  <li key={i} className="pl-1 marker:font-semibold marker:text-[var(--hub-tool)]">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </details>
        )}
      </div>
    </aside>
  )
}

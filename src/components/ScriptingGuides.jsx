import { useState, useMemo, Fragment } from 'react'
import { SCRIPTING_GUIDES } from '../data/scriptingGuides'

function RichBody({ text }) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <p className="mt-2 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]">
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/)
        if (m) {
          return <strong key={i} className="font-semibold text-[var(--hub-text)]">{m[1]}</strong>
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </p>
  )
}

function CodeBlock({ children }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] p-4 text-left font-mono text-[11px] leading-relaxed text-[var(--hub-code-text)] sm:text-xs">
      <code>{children}</code>
    </pre>
  )
}

export default function ScriptingGuides() {
  const [activeId, setActiveId] = useState(SCRIPTING_GUIDES[0].id)
  const guide = useMemo(() => SCRIPTING_GUIDES.find((g) => g.id === activeId) ?? SCRIPTING_GUIDES[0], [activeId])

  return (
    <div className="flex flex-col gap-4 pb-7 sm:gap-6 sm:pb-8 lg:flex-row lg:items-start lg:gap-8">
      <nav
        className="shrink-0 lg:w-[min(100%,220px)]"
        aria-label="Scripting guide topics"
      >
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-faint)]">
          Topics
        </p>
        <div className="flex snap-x snap-mandatory flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:thin]">
          {SCRIPTING_GUIDES.map((g) => {
            const on = g.id === activeId
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveId(g.id)}
                className={`shrink-0 snap-start rounded-lg border px-3 py-2 text-left text-[11px] font-semibold transition-colors sm:text-[13px] lg:w-full ${
                  on
                    ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                    : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:border-[var(--hub-tool)]/40 hover:text-[var(--hub-text)]'
                }`}
              >
                {g.title}
              </button>
            )
          })}
        </div>
      </nav>

      <article
        className="min-w-0 flex-1 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 shadow-[var(--hub-shadow-card)] sm:p-7"
        aria-labelledby="scripting-guide-title"
      >
        <header className="border-b border-[var(--hub-line)]/80 pb-4">
          <h2
            id="scripting-guide-title"
            className="text-lg font-extrabold tracking-tight text-[var(--hub-text)] sm:text-2xl"
          >
            {guide.title}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]">
            {guide.tagline}
          </p>
        </header>

        <div className="mt-5 space-y-6 sm:mt-6 sm:space-y-8">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h3 className="text-[13px] font-bold uppercase tracking-wide text-[var(--hub-tool)] sm:text-sm">
                {section.title}
              </h3>
              {section.body && <RichBody text={section.body} />}
              {section.code && <CodeBlock>{section.code.trim()}</CodeBlock>}
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}

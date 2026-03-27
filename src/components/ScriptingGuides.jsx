import { useMemo, Fragment } from 'react'
import { SCRIPTING_GUIDES } from '../data/scriptingGuides'
import ScriptingTopicsNav from './ScriptingTopicsNav'
import Card from './ui/Card'

function renderRichParts(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/)
    if (m) {
      return <strong key={i} className="font-semibold text-[var(--hub-text)]">{m[1]}</strong>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

/** Block paragraph (default for section prose). */
function RichBody({ text, className = 'mt-2 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]' }) {
  if (!text) return null
  return <p className={className}>{renderRichParts(text)}</p>
}

/** Inline / list item — no wrapping `<p>`. */
function RichInline({ text, className = 'text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]' }) {
  if (!text) return null
  return <span className={className}>{renderRichParts(text)}</span>
}

function CodeBlock({ children }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] p-4 text-left font-mono text-[12px] leading-relaxed text-[var(--hub-code-text)] sm:text-[13px]">
      <code>{children}</code>
    </pre>
  )
}

function DefinitionCard({ term, syntax, body }) {
  return (
    <div className="rounded-lg border border-[var(--hub-line)] bg-[var(--hub-surface)]/70 px-3.5 py-3.5 shadow-sm dark:bg-[var(--hub-elevated)]/40">
      <dt className="text-[15px] font-bold tracking-tight text-[var(--hub-tool)]">{term}</dt>
      {syntax ? (
        <dd className="mt-2 font-mono text-[11px] leading-snug text-[var(--hub-text)] sm:text-xs break-words">
          {syntax}
        </dd>
      ) : null}
      <dd className={syntax ? 'mt-2.5 border-t border-[var(--hub-line)]/60 pt-2.5' : 'mt-2'}>
        <RichBody text={body} className="mt-0 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]" />
      </dd>
    </div>
  )
}

export default function ScriptingGuides({ activeId, onSelectTopic, guides = SCRIPTING_GUIDES }) {
  const guide = useMemo(
    () => guides.find((g) => g.id === activeId) ?? guides[0] ?? SCRIPTING_GUIDES[0],
    [activeId, guides]
  )

  if (guides.length === 0) {
    return (
      <div className="pb-7 sm:pb-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <ScriptingTopicsNav variant="workspace" activeId={activeId} onSelectTopic={onSelectTopic} guides={guides} />
          <Card className="min-w-0 flex-1 border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-8 py-16 text-center">
            <p className="text-base leading-relaxed text-[var(--hub-sub)]">
              No scripting topics match your search. Try different keywords.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-7 sm:pb-8">
      {/* Same pattern as Commands: picker in main workspace + detail beside it (centered max width). */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <ScriptingTopicsNav
          variant="workspace"
          activeId={activeId}
          onSelectTopic={onSelectTopic}
          guides={guides}
        />
        <article
          className="min-w-0 flex-1 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 shadow-[var(--hub-shadow-card)] sm:p-7"
          aria-labelledby="scripting-guide-title"
        >
        <header className="border-b border-[var(--hub-line)]/80 pb-5">
          <h2
            id="scripting-guide-title"
            className="text-xl font-extrabold tracking-tight text-[var(--hub-text)] sm:text-2xl"
          >
            {guide.title}
          </h2>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-[var(--hub-sub)] sm:text-base">
            {guide.tagline}
          </p>
        </header>

        <div className="mx-auto mt-6 max-w-prose space-y-8 sm:mt-8 sm:space-y-10">
          {guide.sections.map((section) => (
            <section key={section.title} className="scroll-mt-4">
              <h3 className="border-b border-[var(--hub-line)]/80 pb-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--hub-tool)] sm:text-[13px]">
                {section.title}
              </h3>
              {section.intro ? (
                <RichBody text={section.intro} className="mt-3 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]" />
              ) : null}
              {section.definitions?.length ? (
                <dl className="mt-4 space-y-3 sm:space-y-4">
                  {section.definitions.map((d) => (
                    <DefinitionCard key={d.term} term={d.term} syntax={d.syntax} body={d.body} />
                  ))}
                </dl>
              ) : null}
              {section.bullets?.length ? (
                <ul className="mt-4 list-none space-y-3.5 pl-0">
                  {section.bullets.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--hub-tool)]"
                        aria-hidden
                      />
                      <RichInline text={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.body && !section.definitions ? <RichBody text={section.body} /> : null}
              {section.body && section.definitions ? (
                <RichBody text={section.body} className="mt-4 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]" />
              ) : null}
              {section.code ? <CodeBlock>{section.code.trim()}</CodeBlock> : null}
            </section>
          ))}
        </div>
        </article>
      </div>
    </div>
  )
}

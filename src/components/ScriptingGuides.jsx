import { useMemo, Fragment, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SCRIPTING_GUIDES } from '../data/scriptingGuides'
import { getLabMeta } from '../data/labGuideMeta'
import Card from './ui/Card'
import ToolIcon from './ToolIcon'
import LabTabBar from './lab/LabTabBar'
import ExpandableSection from './lab/ExpandableSection'
import CodeBlockPanel from './lab/CodeBlockPanel'
import LabFlowDiagram from './lab/LabFlowDiagram'
import LabHandsOnPanel from './lab/LabHandsOnPanel'

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

function RichBody({ text, className = 'mt-2 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]' }) {
  if (!text) return null
  return <p className={className}>{renderRichParts(text)}</p>
}

function RichInline({ text, className = 'text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]' }) {
  if (!text) return null
  return <span className={className}>{renderRichParts(text)}</span>
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

function SectionBody({ section, codeLang }) {
  return (
    <div className="space-y-4">
      {section.intro ? (
        <RichBody text={section.intro} className="mt-0 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]" />
      ) : null}
      {section.definitions?.length ? (
        <dl className="space-y-3 sm:space-y-4">
          {section.definitions.map((d) => (
            <DefinitionCard key={d.term} term={d.term} syntax={d.syntax} body={d.body} />
          ))}
        </dl>
      ) : null}
      {section.bullets?.length ? (
        <ul className="list-none space-y-3.5 pl-0">
          {section.bullets.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--hub-tool)]" aria-hidden />
              <RichInline text={item} />
            </li>
          ))}
        </ul>
      ) : null}
      {section.body && !section.definitions ? <RichBody text={section.body} /> : null}
      {section.body && section.definitions ? (
        <RichBody text={section.body} className="mt-0 text-[14px] leading-relaxed text-[var(--hub-sub)] sm:text-[15px]" />
      ) : null}
      {section.code ? <CodeBlockPanel code={section.code.trim()} lang={codeLang} /> : null}
    </div>
  )
}

/**
 * LAB — interactive DevOps learning module (scripting workspace).
 */
export default function ScriptingGuides({
  activeId,
  onSelectTopic,
  guides = SCRIPTING_GUIDES,
  onOpenCommandsTool,
  resolveToolLabel,
  labProgress,
}) {
  const [tab, setTab] = useState('overview')
  const [draftNotes, setDraftNotes] = useState('')

  const guide = useMemo(
    () => guides.find((g) => g.id === activeId) ?? guides[0] ?? SCRIPTING_GUIDES[0],
    [activeId, guides]
  )

  const meta = useMemo(() => getLabMeta(guide), [guide])

  const idx = guides.findIndex((g) => g.id === guide.id)
  const nextGuide = idx >= 0 && idx < guides.length - 1 ? guides[idx + 1] : null

  const persistedNotes = labProgress?.notes?.[guide.id] ?? ''

  useEffect(() => {
    setTab('overview')
  }, [guide.id])

  useEffect(() => {
    setDraftNotes(persistedNotes)
  }, [guide.id, persistedNotes])

  const handleOpenCommands = useCallback(() => {
    onOpenCommandsTool?.(meta.commandsTool)
  }, [onOpenCommandsTool, meta.commandsTool])

  const toolTitle = resolveToolLabel ? resolveToolLabel(meta.commandsTool) : meta.commandsTool

  if (guides.length === 0) {
    return (
      <div className="pb-7 sm:pb-8">
        <div className="w-full min-w-0">
          <Card className="min-w-0 border-dashed border-indigo-300/40 bg-gradient-to-br from-white/90 to-indigo-50/40 px-8 py-16 text-center dark:border-indigo-500/25 dark:from-[var(--hub-card)] dark:to-indigo-950/30">
            <p className="text-base leading-relaxed text-[var(--hub-sub)]">
              No topics match your search. Try different keywords.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-7 sm:pb-8">
      <div className="w-full min-w-0">
        <article
          className="min-w-0 overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-br from-white/95 via-indigo-50/30 to-violet-50/20 shadow-[0_12px_40px_-12px_rgba(79,70,229,0.12)] backdrop-blur-xl ring-1 ring-indigo-500/10 sm:p-0 dark:border-white/10 dark:from-[var(--hub-surface)] dark:via-indigo-950/25 dark:to-violet-950/20 dark:ring-indigo-400/15"
          aria-labelledby="lab-guide-title"
        >
          <div className="border-b border-[var(--hub-line)]/60 p-4 sm:p-7">
            <header className="pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600 dark:text-cyan-400/90">LAB</p>
              <h2
                id="lab-guide-title"
                className="mt-1 text-xl font-extrabold tracking-tight text-[var(--hub-text)] sm:text-2xl"
              >
                {guide.title}
              </h2>
              <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-[var(--hub-sub)] sm:text-base">
                {guide.tagline}
              </p>
            </header>
            <LabTabBar activeId={tab} onChange={setTab} className="w-full" />
          </div>

          <div
            className="p-4 sm:p-7"
            role="tabpanel"
            id={`lab-panel-${tab}`}
            aria-labelledby={`lab-tab-${tab}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab + guide.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {tab === 'overview' && (
                  <div className="space-y-3">
                    {guide.sections.map((section, si) => (
                      <ExpandableSection key={section.title} title={section.title} defaultOpen={si < 2}>
                        <SectionBody section={section} codeLang={meta.codeLang} />
                      </ExpandableSection>
                    ))}
                  </div>
                )}

                {tab === 'commands' && (
                  <div className="rounded-2xl border border-[var(--hub-line)]/90 bg-[var(--hub-card)]/50 p-6 dark:bg-[var(--hub-elevated)]/30">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)] dark:bg-[var(--hub-elevated)]/80">
                          <ToolIcon tool={meta.commandsTool === 'all' ? 'shell' : meta.commandsTool} className="h-7 w-7 text-[var(--hub-muted)]" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-[var(--hub-text)]">CLI cross-reference</h3>
                          <p className="mt-1 max-w-prose text-[13px] leading-relaxed text-[var(--hub-sub)]">
                            Jump to the <strong className="font-semibold text-[var(--hub-text)]">{toolTitle}</strong>{' '}
                            command list to try real flags and examples alongside this topic.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenCommands}
                        className="shrink-0 rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-tool-dim)] px-5 py-3 text-[12px] font-bold uppercase tracking-wide text-[var(--hub-text)] shadow-sm transition hover:border-hub-primary/40 hover:shadow-md"
                      >
                        Open commands →
                      </button>
                    </div>
                  </div>
                )}

                {tab === 'hands-on' && (
                  <LabHandsOnPanel handsOn={meta.handsOn} codeLang={meta.codeLang} />
                )}

                {tab === 'visual' && <LabFlowDiagram visualFlow={meta.visualFlow} />}

                {tab === 'notes' && (
                  <div className="space-y-4">
                    <label htmlFor="lab-notes-area" className="block text-[13px] font-bold text-[var(--hub-text)]">
                      Your notes
                    </label>
                    <textarea
                      id="lab-notes-area"
                      value={draftNotes}
                      onChange={(e) => {
                        const next = e.target.value
                        setDraftNotes(next)
                        labProgress?.setNotes?.(guide.id, next)
                      }}
                      rows={10}
                      placeholder="Capture commands, links, or reminders for this topic…"
                      className="w-full resize-y rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] px-4 py-3 text-[14px] leading-relaxed text-[var(--hub-text)] outline-none transition placeholder:text-[var(--hub-muted)] focus:border-hub-primary focus:ring-2 focus:ring-hub-primary/20 dark:bg-[var(--hub-elevated)]/50"
                    />
                    <p className="text-[12px] text-[var(--hub-muted)]">
                      Notes are stored in your browser (local only) and auto-saved as you type.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {nextGuide ? (
            <footer className="border-t border-[var(--hub-line)]/80 bg-[var(--hub-tool-dim)]/15 px-4 py-5 sm:px-7">
              <button
                type="button"
                onClick={() => onSelectTopic(nextGuide.id)}
                className="group flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] px-4 py-4 text-left shadow-sm transition hover:border-hub-primary/35 hover:shadow-md dark:bg-[var(--hub-elevated)]/40 sm:px-5"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--hub-muted)]">Next topic</span>
                <span className="text-[15px] font-extrabold text-[var(--hub-text)] transition group-hover:text-hub-primary">
                  {nextGuide.title}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </button>
            </footer>
          ) : null}
        </article>
      </div>
    </div>
  )
}

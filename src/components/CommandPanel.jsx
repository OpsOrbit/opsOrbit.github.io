import { useEffect, useCallback, useState } from 'react'
import ToolIcon from './ToolIcon'
import { isDangerousCommand } from '../utils/commandSafety'

const blockTitle = 'mb-2.5 text-xs font-bold uppercase tracking-wider text-hub-muted'

export default function CommandPanel({
  command,
  suggestedCommands = [],
  onSelectCommand,
  onClose,
  toolLabel,
  levelLabel,
}) {
  const [copied, setCopied] = useState(false)
  const dangerous = isDangerousCommand(command.command)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command.command).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }, [command.command])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.classList.add('panel-open')
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.classList.remove('panel-open')
    }
  }, [onClose])

  const placeholderImg = '/images/commands/placeholder.svg'

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="panel-title">
      <button
        type="button"
        className="absolute inset-0 bg-hub-text/40 backdrop-blur-sm dark:bg-black/60"
        onClick={onClose}
        aria-label="Close panel"
      />
      <div className="relative flex h-full min-h-[100dvh] w-full max-w-full animate-panel-in flex-col border-l-0 border-hub-line bg-hub-surface shadow-2xl motion-reduce:animate-none sm:max-w-md sm:border-l dark:shadow-black/40">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-hub-line px-4 py-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-5 sm:py-6 sm:pl-5 sm:pr-5">
          <div className="min-w-0 pr-2">
            <h2 id="panel-title" className="text-xl font-semibold leading-snug text-hub-text">
              {command.name}
            </h2>
            {command.category && (
              <p className="mt-2 text-sm font-medium leading-relaxed text-hub-primary dark:text-emerald-200/90">{command.category}</p>
            )}
          </div>
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-hub-line text-xl text-hub-muted transition-colors duration-200 hover:bg-hub-elevated hover:text-hub-text active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-surface"
            onClick={onClose}
            aria-label="Close panel"
          >
            ×
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-5 sm:pl-5 sm:pr-5">
          <div className="mb-6 flex flex-col gap-3">
            <code
              className={`block w-full break-all rounded-lg border px-4 py-3.5 font-mono text-sm leading-relaxed sm:text-[0.9375rem] ${
                dangerous
                  ? 'border-hub-danger-border bg-hub-danger-bg text-hub-danger'
                  : 'border-hub-line bg-hub-code text-hub-text'
              }`}
            >
              {command.command}
            </code>
            {dangerous && (
              <p className="text-sm font-medium leading-relaxed text-hub-danger">
                This command can destroy data or harm the system. Double-check before use.
              </p>
            )}
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 self-stretch rounded-lg bg-hub-primary px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-hub-primary-hover hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-surface dark:text-[#0d1117] sm:w-auto sm:self-start sm:min-h-[2.75rem]"
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy command
                </>
              )}
            </button>
          </div>

          <p className="mb-8 text-base leading-relaxed text-hub-sub">{command.description}</p>
          <p className={`${blockTitle} mb-5`}>Elaboration & answers</p>

          {command.image && (
            <div className="mb-8">
              <img
                src={command.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="max-h-52 w-full rounded-lg border border-hub-line bg-hub-code object-contain"
                onError={(e) => {
                  e.target.src = placeholderImg
                }}
              />
            </div>
          )}

          {command.explanation && (
            <div className="mb-8">
              <h3 className={blockTitle}>Explanation</h3>
              <div
                className="prose-hub text-base leading-relaxed text-hub-sub"
                dangerouslySetInnerHTML={{ __html: command.explanation }}
              />
            </div>
          )}

          {(command.example || command.exampleOutput) && (
            <div className="mb-8">
              <h3 className={blockTitle}>Example</h3>
              {command.example && (
                <pre className="mb-3 overflow-x-auto rounded-lg border border-hub-line bg-hub-code p-4 font-mono text-sm leading-relaxed text-hub-text">
                  {command.example}
                </pre>
              )}
              {command.exampleOutput && (
                <>
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-hub-muted">Expected output</span>
                  <pre className="overflow-x-auto rounded-lg border border-hub-line bg-hub-bg p-4 font-mono text-sm leading-relaxed text-hub-sub dark:bg-hub-elevated">
                    {command.exampleOutput}
                  </pre>
                </>
              )}
            </div>
          )}

          {command.whyNeed && (
            <div className="mb-8">
              <h3 className={blockTitle}>Why we need it</h3>
              <p className="text-base leading-relaxed text-hub-sub">{command.whyNeed}</p>
            </div>
          )}

          {command.commonOptions && (
            <div className="mb-8">
              <h3 className={blockTitle}>Common options</h3>
              <p className="text-base leading-relaxed text-hub-sub">{command.commonOptions}</p>
            </div>
          )}

          {command.scenarios && (
            <div className="mb-8">
              <h3 className={blockTitle}>Real-time scenarios</h3>
              <p className="text-base leading-relaxed text-hub-sub">{command.scenarios}</p>
            </div>
          )}

          {suggestedCommands.length > 0 && (
            <div className="mb-8">
              <h3 className={blockTitle}>Suggested next commands</h3>
              <ul className="space-y-2.5">
                {suggestedCommands.map((cmd) => (
                  <li key={cmd.id}>
                    <button
                      type="button"
                      className="min-h-[48px] w-full touch-manipulation rounded-lg border border-hub-line bg-hub-bg px-3 py-3.5 text-left transition-all duration-200 hover:border-hub-primary/40 hover:bg-hub-elevated active:bg-hub-elevated/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-surface dark:bg-hub-elevated/50"
                      onClick={() => onSelectCommand && onSelectCommand(cmd)}
                    >
                      <code className="block font-mono text-sm leading-snug text-hub-primary dark:text-hub-accent">{cmd.command}</code>
                      <span className="mt-1 block text-sm text-hub-sub">{cmd.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-10 flex items-center gap-2 border-t border-hub-line pt-5 text-sm font-medium text-hub-muted">
            <ToolIcon tool={command.tool} className="h-4 w-4 text-hub-muted" />
            {toolLabel(command.tool)} · {levelLabel(command.level)}
          </p>
        </div>
      </div>
    </div>
  )
}

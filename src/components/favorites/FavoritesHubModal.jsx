import { useMemo } from 'react'
import Modal from '../ui/Modal'
import { COMMANDS_DATA } from '../../data/commands'
import { DEVOPS_TOOLS } from '../../data/toolsData'
import { TECH_WORDS } from '../../data/techWordsData'
import { SCRIPTING_GUIDES } from '../../data/scriptingGuides'

const ROW =
  'flex w-full cursor-pointer items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left text-sm transition-colors hover:border-[var(--hub-line)] hover:bg-[var(--hub-elevated)]'

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {Set<string> | string[]} props.commandFavoriteIds
 * @param {Set<string> | string[]} props.toolFavoriteIds
 * @param {Set<string> | string[]} props.techWordFavoriteIds
 * @param {Record<string, boolean>} props.labLearned
 * @param {(p: { type: string, payload: unknown }) => void} props.onNavigate
 */
export default function FavoritesHubModal({
  open,
  onClose,
  commandFavoriteIds,
  toolFavoriteIds,
  techWordFavoriteIds,
  labLearned = {},
  onNavigate,
}) {
  const cmdList = useMemo(() => {
    const ids = new Set([...commandFavoriteIds])
    return COMMANDS_DATA.filter((c) => ids.has(c.id))
  }, [commandFavoriteIds])

  const toolList = useMemo(() => {
    const ids = new Set([...toolFavoriteIds])
    return DEVOPS_TOOLS.filter((t) => ids.has(t.id))
  }, [toolFavoriteIds])

  const wordList = useMemo(() => {
    const ids = new Set([...techWordFavoriteIds])
    return TECH_WORDS.filter((w) => ids.has(w.id))
  }, [techWordFavoriteIds])

  const labDone = useMemo(() => {
    return SCRIPTING_GUIDES.filter((g) => labLearned[g.id])
  }, [labLearned])

  const empty =
    cmdList.length === 0 && toolList.length === 0 && wordList.length === 0 && labDone.length === 0

  return (
    <Modal open={open} onClose={onClose} title="Favorites" titleId="favorites-hub-title" panelClassName="max-w-lg">
      <div className="max-h-[min(70dvh,520px)] space-y-1 overflow-y-auto px-1 py-3">
        {empty ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-medium text-[var(--hub-text)]">No bookmarks yet</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--hub-muted)]">
              Star commands, tools, and glossary terms from each page. LAB topics you mark complete appear here too.
            </p>
          </div>
        ) : null}

        {cmdList.length > 0 ? (
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">
              Commands
            </div>
            {cmdList.map((c) => (
              <button
                key={c.id}
                type="button"
                className={ROW}
                onClick={() => {
                  onNavigate({ type: 'command', payload: c })
                  onClose()
                }}
              >
                <span className="min-w-0 flex-1 truncate font-medium text-[var(--hub-text)]">{c.name}</span>
                <span className="shrink-0 font-mono text-xs text-[var(--hub-sub)]">{c.tool}</span>
              </button>
            ))}
          </div>
        ) : null}

        {toolList.length > 0 ? (
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">
              Tools
            </div>
            {toolList.map((t) => (
              <button
                key={t.id}
                type="button"
                className={ROW}
                onClick={() => {
                  onNavigate({ type: 'tool', payload: t })
                  onClose()
                }}
              >
                <span className="text-base" aria-hidden>
                  {t.logo || '🔧'}
                </span>
                <span className="min-w-0 flex-1 truncate font-medium text-[var(--hub-text)]">{t.name}</span>
              </button>
            ))}
          </div>
        ) : null}

        {labDone.length > 0 ? (
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">
              LAB — completed
            </div>
            {labDone.map((g) => (
              <button
                key={g.id}
                type="button"
                className={ROW}
                onClick={() => {
                  onNavigate({ type: 'lab', payload: g })
                  onClose()
                }}
              >
                <span aria-hidden>✓</span>
                <span className="min-w-0 flex-1 truncate font-medium text-[var(--hub-text)]">{g.title}</span>
              </button>
            ))}
          </div>
        ) : null}

        {wordList.length > 0 ? (
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">
              Tech words
            </div>
            {wordList.map((w) => (
              <button
                key={w.id}
                type="button"
                className={ROW}
                onClick={() => {
                  onNavigate({ type: 'techword', payload: w })
                  onClose()
                }}
              >
                <span className="min-w-0 flex-1 truncate font-medium text-[var(--hub-text)]">{w.term}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

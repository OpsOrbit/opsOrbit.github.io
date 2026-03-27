import { Fragment, useState, useEffect, useCallback } from 'react'

const CACHE_KEY = 'devops-hub-header-news-v8-devto-only'
const CACHE_MS = 12 * 60 * 1000
const TAGS = ['devops', 'cloud', 'ai', 'kubernetes']

/** Solid fills + white label — avoids low-contrast tints and survives parent <a> hover color. */
const SOURCE_BADGE_STYLE = {
  DevOps: { backgroundColor: '#047857', color: '#FFFFFF' },
}

/**
 * Dev.to public API only (no RSS, no third-party CORS proxies). Forem allows browser CORS on this API.
 * @see https://developers.forem.com/api/v1
 */
async function fetchDevtoArticles() {
  const requests = TAGS.map((tag) =>
    fetch(`https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&top=7&per_page=3`)
  )
  const settled = await Promise.allSettled(requests)
  const out = []
  for (const s of settled) {
    if (s.status !== 'fulfilled' || !s.value.ok) continue
    try {
      const arr = await s.value.json()
      if (!Array.isArray(arr)) continue
      for (const a of arr) {
        if (a?.id != null && a.title && a.url) {
          out.push({
            id: `devto-${a.id}`,
            source: 'DevOps',
            title: String(a.title).trim(),
            url: a.url,
          })
        }
      }
    } catch {
      /* ignore */
    }
  }
  return out
}

function normalizeUrl(u) {
  try {
    const x = new URL(u)
    x.hash = ''
    x.search = ''
    let p = x.pathname.replace(/\/$/, '') || '/'
    return `${x.hostname.toLowerCase()}${p}`.toLowerCase()
  } catch {
    return u
  }
}

async function loadHeadlines() {
  const cached = sessionStorage.getItem(CACHE_KEY)
  if (cached) {
    try {
      const { t, items } = JSON.parse(cached)
      if (Date.now() - t < CACHE_MS && Array.isArray(items) && items.length > 0) {
        return { ok: true, items }
      }
    } catch {
      /* ignore */
    }
  }

  const devtoList = await fetchDevtoArticles()

  const byUrl = new Map()

  const add = (item) => {
    const k = normalizeUrl(item.url)
    if (!k || byUrl.has(k)) return
    byUrl.set(k, {
      id: item.id,
      source: item.source,
      title: item.title,
      url: item.url,
    })
  }

  for (const item of devtoList) add(item)

  const items = [...byUrl.values()].slice(0, 28)

  if (items.length > 0) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items }))
    } catch {
      /* quota */
    }
  }

  return { ok: items.length > 0, items }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return reduced
}

/** Marquee: no hover text color on <a> — it would override badge text (green-on-green). */
function linkClassMarquee() {
  return 'inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[11px] font-medium text-[var(--hub-text)] underline-offset-2 hover:underline sm:text-xs'
}

function linkClassCompact() {
  return 'inline-flex min-w-0 max-w-[min(92vw,18rem)] shrink-0 items-center gap-1.5 text-[11px] font-medium text-[var(--hub-text)] underline-offset-2 hover:underline sm:max-w-[22rem] sm:text-xs'
}

function SourceBadge({ source }) {
  const st = SOURCE_BADGE_STYLE[source] || SOURCE_BADGE_STYLE.DevOps
  const bg = st.backgroundColor
  return (
    <span className="news-source-badge relative inline-flex w-max max-w-none shrink-0 items-center justify-center overflow-visible rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5">
      <span
        className="absolute inset-0 z-0 rounded-md shadow-sm ring-1 ring-black/25"
        style={{ backgroundColor: bg }}
        aria-hidden
      />
      <span
        className="news-source-badge__label relative z-[1] whitespace-nowrap text-[10px] font-extrabold uppercase leading-none tracking-wide text-white sm:text-[11px]"
        style={{ color: '#ffffff' }}
      >
        {source}
      </span>
    </span>
  )
}

export default function HeaderNewsBanner() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('idle')
  const reduceMotion = usePrefersReducedMotion()

  const run = useCallback(async () => {
    setStatus('loading')
    const result = await loadHeadlines()
    if (result.ok && result.items.length > 0) {
      setItems(result.items)
      setStatus('ready')
    } else {
      setItems([])
      setStatus('empty')
    }
  }, [])

  useEffect(() => {
    run()
  }, [run])

  const durationSec = Math.min(100, Math.max(28, 18 + items.length * 5))

  if (status === 'loading' && items.length === 0) {
    return (
      <div className="flex min-h-0 min-w-0 w-full max-w-full flex-1 items-center justify-center px-1" aria-hidden>
        <div className="h-3 w-full max-w-full animate-pulse rounded-md bg-[var(--hub-line)]/80" />
      </div>
    )
  }

  if (status !== 'ready' || items.length === 0) {
    return null
  }

  const renderStrip = (keySuffix) => (
    <>
      {items.map((item, i) => (
        <Fragment key={`${item.id}${keySuffix}`}>
          {i > 0 && (
            <span className="mx-2 shrink-0 text-[var(--hub-faint)] sm:mx-3" aria-hidden>
              ·
            </span>
          )}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassMarquee()}
            title={`${item.source}: ${item.title}`}
          >
            <SourceBadge source={item.source} />
            <span className="shrink-0">{item.title}</span>
          </a>
        </Fragment>
      ))}
    </>
  )

  return (
    <div className="flex h-full min-h-0 min-w-0 w-full max-w-full flex-1 items-center px-0.5 sm:px-1">
      <div
        className="flex min-h-[34px] min-w-0 w-full max-w-full items-stretch overflow-hidden rounded-lg border border-[var(--hub-line)] bg-[var(--hub-surface)] shadow-sm dark:bg-[var(--hub-elevated)]"
        role="region"
        aria-label="Latest news from dev.to"
      >
        <div className="flex min-w-[2.85rem] shrink-0 flex-col items-center justify-center border-r border-[var(--hub-line)]/80 bg-[var(--hub-tool-dim2)] px-1.5 py-1 sm:min-w-[3.25rem] sm:px-2.5">
          <span className="text-center font-[family-name:Orbitron] text-[6px] font-bold uppercase leading-tight tracking-[0.08em] text-[var(--hub-brand)] sm:text-[7px] sm:tracking-[0.1em]">
            latest
          </span>
          <span className="text-center font-[family-name:Orbitron] text-[6px] font-bold uppercase leading-tight tracking-[0.08em] text-[var(--hub-brand)] sm:text-[7px] sm:tracking-[0.1em]">
            news
          </span>
        </div>

        {reduceMotion ? (
          <div className="flex min-w-0 flex-1 items-center overflow-x-auto px-2 py-1">
            {items.slice(0, 3).map((item, i) => (
              <Fragment key={item.id}>
                {i > 0 && (
                  <span className="mx-2 shrink-0 text-[var(--hub-faint)]" aria-hidden>
                    ·
                  </span>
                )}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassCompact()}
                  title={`${item.source}: ${item.title}`}
                >
                  <SourceBadge source={item.source} />
                  <span className="min-w-0 truncate">{item.title}</span>
                </a>
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="hub-news-marquee relative min-h-[2rem] min-w-0 flex-1 py-1 pl-1 pr-2">
            <div
              className="hub-news-marquee__track items-center"
              style={{ animationDuration: `${durationSec}s` }}
            >
              <div className="flex shrink-0 items-center px-2 sm:px-3">{renderStrip('')}</div>
              <div className="flex shrink-0 items-center px-2 sm:px-3" aria-hidden>
                {renderStrip('-b')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

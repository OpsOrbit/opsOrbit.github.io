import { Fragment, useState, useEffect, useCallback } from 'react'
import { OFFICIAL_NEWS_FEEDS } from '../../lib/officialNewsFeeds.js'

const CACHE_KEY = 'devops-hub-header-news-v13-cats-dates'
const CACHE_MS = 60 * 60 * 1000
/** Background refetch for long-lived tabs (aligned with session cache window). */
const REFRESH_INTERVAL_MS = 60 * 60 * 1000
/** dev.to tag slugs — Forem API is CORS-friendly in the browser. */
const TAGS = [
  'aws',
  'azure',
  'gcp',
  'ai',
  'machinelearning',
  'llm',
  'openai',
  'devops',
  'cloud',
  'kubernetes',
]

/** Solid fills + white label — avoids low-contrast tints and survives parent <a> hover color. */
const SOURCE_BADGE_STYLE = {
  AWS: { backgroundColor: '#232F3E', color: '#FFFFFF' },
  Azure: { backgroundColor: '#0078D4', color: '#FFFFFF' },
  GCP: { backgroundColor: '#1A73E8', color: '#FFFFFF' },
  AI: { backgroundColor: '#6D28D9', color: '#FFFFFF' },
  DevOps: { backgroundColor: '#047857', color: '#FFFFFF' },
}

/**
 * dev.to public API — CORS-friendly in the browser (community headlines).
 * @see https://developers.forem.com/api/v1
 */
function normalizeTag(t) {
  return String(t || '')
    .toLowerCase()
    .replace(/^#/, '')
    .trim()
}

/**
 * Pick a marquee badge from article tags + the tag used for this fetch (fallback).
 */
function sourceFromArticle(tagList, requestedTag) {
  const bucket = new Set()
  for (const t of tagList || []) bucket.add(normalizeTag(t))
  if (requestedTag) bucket.add(normalizeTag(requestedTag))
  const tags = [...bucket]
  const has = (re) => tags.some((t) => re.test(t))

  if (has(/^aws$/) || has(/amazon/) || has(/^lambda$/)) return 'AWS'
  if (has(/^azure$/) || has(/microsoft-azure/) || has(/^azurerm$/)) return 'Azure'
  if (has(/^gcp$/) || has(/^googlecloud$/) || has(/google-cloud/) || has(/^google-cloud-platform$/)) return 'GCP'
  if (
    has(/^ai$/) ||
    has(/^machinelearning$/) ||
    has(/machine-learning/) ||
    has(/^llm$/) ||
    has(/generative-ai/) ||
    has(/^openai$/) ||
    has(/chatgpt/) ||
    has(/^langchain$/) ||
    has(/anthropic/) ||
    has(/claude/) ||
    has(/^copilot$/) ||
    has(/bedrock/)
  ) {
    return 'AI'
  }
  return 'DevOps'
}

async function fetchDevtoArticles() {
  const requests = TAGS.map((tag) =>
    fetch(`https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&top=7&per_page=4`).then((res) => ({
      res,
      tag,
    }))
  )
  const settled = await Promise.allSettled(requests)
  const out = []
  for (const s of settled) {
    if (s.status !== 'fulfilled') continue
    const { res, tag } = s.value
    if (!res.ok) continue
    try {
      const arr = await res.json()
      if (!Array.isArray(arr)) continue
      for (const a of arr) {
        if (a?.id != null && a.title && a.url) {
          let publishedAt
          if (a.published_at) {
            const d = new Date(a.published_at)
            if (!Number.isNaN(d.getTime())) publishedAt = d.toISOString()
          }
          out.push({
            id: `devto-${a.id}`,
            source: sourceFromArticle(a.tag_list, tag),
            category: 'Community',
            title: String(a.title).trim(),
            url: a.url,
            ...(publishedAt ? { publishedAt } : {}),
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

/** Same path in dev (Vite middleware) and on Netlify (redirect → function). Override with VITE_RSS_PROXY_BASE if needed. */
function rssProxyBase() {
  if (import.meta.env.DEV) return '/api/rss-feed'
  const custom = import.meta.env.VITE_RSS_PROXY_BASE
  if (typeof custom === 'string' && custom.trim()) return custom.replace(/\/$/, '')
  return '/api/rss-feed'
}

/** Baked at build time into `public/official-news.json` (works on GitHub Pages). */
function officialNewsJsonUrl() {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}official-news.json`
}

async function fetchWithTimeout(url, ms = 14000, fetchInit = {}) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { ...fetchInit, signal: ctrl.signal })
  } finally {
    clearTimeout(t)
  }
}

function mapOfficialRows(raw) {
  const out = []
  let idx = 0
  for (const row of raw) {
    if (!row?.title || !row?.url) continue
    const source = row.source || 'DevOps'
    const category = typeof row.category === 'string' && row.category.trim() ? row.category.trim() : undefined
    const publishedAt =
      typeof row.publishedAt === 'string' && row.publishedAt.trim() ? row.publishedAt.trim() : undefined
    out.push({
      id: `official-${source}-${idx}-${normalizeUrl(String(row.url))}`.slice(0, 180),
      source,
      ...(category ? { category } : {}),
      ...(publishedAt ? { publishedAt } : {}),
      title: String(row.title).trim(),
      url: String(row.url).trim(),
    })
    idx += 1
  }
  return out
}

function formatNewsDate(iso) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    const now = new Date()
    const sameYear = d.getFullYear() === now.getFullYear()
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      ...(sameYear ? {} : { year: 'numeric' }),
    }).format(d)
  } catch {
    return ''
  }
}

function headlineSortTime(it) {
  if (!it.publishedAt) return 0
  const t = Date.parse(it.publishedAt)
  return Number.isNaN(t) ? 0 : t
}

function NewsMetaChips({ category, publishedAt }) {
  const dateStr = formatNewsDate(publishedAt)
  if (!category && !dateStr) return null
  return (
    <span className="flex shrink-0 items-center gap-1.5" aria-hidden={!category && !dateStr}>
      {category ? (
        <span className="max-w-[7.5rem] truncate rounded border border-[var(--hub-line)] bg-[var(--hub-bg)]/90 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[var(--hub-muted)] sm:max-w-[9rem] sm:text-[9px]">
          {category}
        </span>
      ) : null}
      {dateStr ? (
        <time
          dateTime={publishedAt}
          className="shrink-0 text-[8px] font-semibold tabular-nums text-[var(--hub-faint)] sm:text-[9px]"
        >
          {dateStr}
        </time>
      ) : null}
    </span>
  )
}

/** Production: static JSON from `prebuild` (GitHub Pages). Dev / fallback: RSS proxy. */
async function fetchOfficialHeadlines() {
  if (!import.meta.env.DEV) {
    try {
      const res = await fetchWithTimeout(officialNewsJsonUrl(), 8000, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        const raw = Array.isArray(data.items) ? data.items : []
        const fromFile = mapOfficialRows(raw)
        if (fromFile.length > 0) return fromFile
      }
    } catch {
      /* ignore */
    }
  }

  const base = rssProxyBase()
  const settled = await Promise.allSettled(
    OFFICIAL_NEWS_FEEDS.map(async ({ source, category, url }) => {
      const res = await fetchWithTimeout(`${base}?url=${encodeURIComponent(url)}`)
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      const raw = Array.isArray(data.items) ? data.items : []
      return raw.slice(0, 5).map((it, idx) => ({
        id: `official-${source}-${idx}-${normalizeUrl(String(it.link || ''))}`.slice(0, 180),
        source,
        category,
        title: String(it.title || '').trim(),
        url: String(it.link || '').trim(),
        ...(it.publishedAt ? { publishedAt: String(it.publishedAt) } : {}),
      }))
    })
  )
  const out = []
  for (const s of settled) {
    if (s.status !== 'fulfilled') continue
    for (const it of s.value) {
      if (it.title && it.url) out.push(it)
    }
  }
  return out
}

async function loadHeadlines(force = false) {
  if (!force) {
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
  }

  const [officialList, devtoList] = await Promise.all([fetchOfficialHeadlines(), fetchDevtoArticles()])

  const byUrl = new Map()

  const add = (item) => {
    const k = normalizeUrl(item.url)
    if (!k) return
    const prev = byUrl.get(k)
    if (!prev) {
      byUrl.set(k, {
        id: item.id,
        source: item.source,
        title: item.title,
        url: item.url,
        ...(item.category ? { category: item.category } : {}),
        ...(item.publishedAt ? { publishedAt: item.publishedAt } : {}),
      })
      return
    }
    const tNew = headlineSortTime(item)
    const tOld = headlineSortTime(prev)
    if (tNew > tOld) {
      byUrl.set(k, {
        id: item.id,
        source: item.source,
        title: item.title,
        url: item.url,
        ...(item.category ? { category: item.category } : {}),
        ...(item.publishedAt ? { publishedAt: item.publishedAt } : {}),
      })
    }
  }

  for (const item of officialList) add(item)
  for (const item of devtoList) add(item)

  const items = [...byUrl.values()].sort((a, b) => headlineSortTime(b) - headlineSortTime(a))
  items.splice(48)

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
  const st = SOURCE_BADGE_STYLE[source] ?? SOURCE_BADGE_STYLE.DevOps
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

  const run = useCallback(async (opts) => {
    const background = Boolean(opts?.background)
    const force = Boolean(opts?.force)
    if (!background) {
      setStatus('loading')
    }
    const result = await loadHeadlines(force)
    if (result.ok && result.items.length > 0) {
      setItems(result.items)
      setStatus('ready')
    } else if (!background) {
      setItems([])
      setStatus('empty')
    }
  }, [])

  useEffect(() => {
    run()
    if (reduceMotion) return undefined
    const id = setInterval(() => run({ background: true, force: true }), REFRESH_INTERVAL_MS)
    return () => clearInterval(id)
  }, [run, reduceMotion])

  /* Higher duration (seconds) = slower scroll. Hover pauses the ticker (see index.css). */
  const durationSec = Math.min(420, Math.max(110, 80 + items.length * 18))

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
            title={`${item.source}${item.category ? ` · ${item.category}` : ''}${item.publishedAt ? ` · ${formatNewsDate(item.publishedAt)}` : ''} — ${item.title}`}
          >
            <span className="flex shrink-0 flex-wrap items-center gap-1.5 sm:gap-2">
              <SourceBadge source={item.source} />
              <NewsMetaChips category={item.category} publishedAt={item.publishedAt} />
            </span>
            <span className="mx-0.5 shrink-0 text-[var(--hub-faint)]" aria-hidden>
              ·
            </span>
            <span className="min-w-0 shrink-0">{item.title}</span>
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
        aria-label="Latest cloud news from official AWS, Azure, and GCP blogs by category, plus community posts"
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
                  title={`${item.source}${item.category ? ` · ${item.category}` : ''}${item.publishedAt ? ` · ${formatNewsDate(item.publishedAt)}` : ''} — ${item.title}`}
                >
                  <span className="flex shrink-0 items-center gap-1">
                    <SourceBadge source={item.source} />
                    <NewsMetaChips category={item.category} publishedAt={item.publishedAt} />
                  </span>
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

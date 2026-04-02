/**
 * Runs before `vite build`. Fetches allowlisted vendor RSS in Node and writes
 * `public/official-news.json` so GitHub Pages (no serverless) can serve headlines same-origin.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { OFFICIAL_NEWS_FEEDS } from '../lib/officialNewsFeeds.js'
import { fetchOfficialRssJson } from '../lib/rssFeedHandler.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const PER_FEED_ITEMS = 4
const BATCH = 8
/** Cap stored rows (deduped, newest first). */
const MAX_STORED = 160

function writePayload(items, extra = {}) {
  const dir = join(root, 'public')
  mkdirSync(dir, { recursive: true })
  const payload = {
    generatedAt: new Date().toISOString(),
    items,
    ...extra,
  }
  writeFileSync(join(dir, 'official-news.json'), JSON.stringify(payload), 'utf8')
}

async function main() {
  const collected = []

  for (let i = 0; i < OFFICIAL_NEWS_FEEDS.length; i += BATCH) {
    const batch = OFFICIAL_NEWS_FEEDS.slice(i, i + BATCH)
    await Promise.all(
      batch.map(async ({ source, category, url }) => {
        try {
          const { items: chunk } = await fetchOfficialRssJson(url)
          for (const it of chunk.slice(0, PER_FEED_ITEMS)) {
            const title = String(it.title || '').trim()
            const link = String(it.link || '').trim()
            if (!title || !link) continue
            collected.push({
              source,
              category,
              title,
              url: link,
              ...(it.publishedAt ? { publishedAt: it.publishedAt } : {}),
            })
          }
        } catch (e) {
          console.warn('[official-news] skip', url, e?.message || e)
        }
      })
    )
  }

  const byUrl = new Map()
  for (const row of collected) {
    const u = row.url
    const prev = byUrl.get(u)
    if (!prev) {
      byUrl.set(u, row)
      continue
    }
    const tNew = row.publishedAt ? Date.parse(row.publishedAt) : 0
    const tOld = prev.publishedAt ? Date.parse(prev.publishedAt) : 0
    if (tNew > tOld) byUrl.set(u, row)
  }

  const merged = [...byUrl.values()].sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0
    return tb - ta
  })

  writePayload(merged.slice(0, MAX_STORED))
  console.log('[official-news] wrote', Math.min(merged.length, MAX_STORED), 'rows → public/official-news.json')
}

main().catch((e) => {
  console.warn('[official-news] failed, writing empty snapshot:', e?.message || e)
  writePayload([], { fetchError: true })
})

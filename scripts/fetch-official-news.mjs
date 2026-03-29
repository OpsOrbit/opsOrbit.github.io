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
  const items = []
  for (const { source, url } of OFFICIAL_NEWS_FEEDS) {
    try {
      const { items: chunk } = await fetchOfficialRssJson(url)
      for (const it of chunk.slice(0, 5)) {
        if (it.title && it.link) {
          items.push({
            source,
            title: it.title.trim(),
            url: it.link.trim(),
          })
        }
      }
    } catch (e) {
      console.warn('[official-news] skip', url, e?.message || e)
    }
  }
  writePayload(items)
  console.log('[official-news] wrote', items.length, 'rows → public/official-news.json')
}

main().catch((e) => {
  console.warn('[official-news] failed, writing empty snapshot:', e?.message || e)
  writePayload([], { fetchError: true })
})

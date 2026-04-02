function stripCDATA(s) {
  return String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, (_, inner) => inner).trim()
}

function stripTags(s) {
  return String(s).replace(/<[^>]+>/g, '').trim()
}

function decodeBasicEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number.parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)))
}

function extractInner(tagName, block) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const m = block.match(re)
  if (!m) return ''
  return decodeBasicEntities(stripTags(stripCDATA(m[1])))
}

/** RFC 822/2822 / ISO-ish date strings from RSS and Atom. */
function parseItemDate(block) {
  const raw =
    extractInner('pubDate', block) ||
    extractInner('published', block) ||
    extractInner('updated', block) ||
    extractInner('dc:date', block)
  if (!raw) return ''
  const d = new Date(raw.trim())
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString()
}

/**
 * @param {string} xml
 * @param {number} limit
 * @returns {{ title: string, link: string, publishedAt?: string }[]}
 */
export function parseRssToItems(xml, limit = 12) {
  const items = []
  if (!xml || typeof xml !== 'string') return items

  const itemBlocks = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map((m) => m[0])
  for (const block of itemBlocks) {
    if (items.length >= limit) break
    const title = extractInner('title', block)
    let link = extractInner('link', block)
    if (!link) {
      const lm = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i)
      link = lm ? decodeBasicEntities(lm[1].trim()) : ''
    }
    if (!title || !link) continue
    const publishedAt = parseItemDate(block)
    items.push({ title, link, ...(publishedAt ? { publishedAt } : {}) })
  }
  if (items.length) return items

  const entries = [...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)].map((m) => m[0])
  for (const block of entries) {
    if (items.length >= limit) break
    const title = extractInner('title', block)
    let link = ''
    const alt = block.match(/<link[^>]+rel=["']alternate["'][^>]*href=["']([^"']+)["']/i)
    if (alt) link = decodeBasicEntities(alt[1].trim())
    if (!link) {
      const lm = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i)
      link = lm ? decodeBasicEntities(lm[1].trim()) : ''
    }
    if (!link) link = extractInner('link', block)
    if (!title || !link) continue
    const publishedAt = parseItemDate(block)
    items.push({ title, link, ...(publishedAt ? { publishedAt } : {}) })
  }
  return items
}

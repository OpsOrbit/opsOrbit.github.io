import { assertOfficialFeedUrl } from './officialNewsFeeds.js'
import { parseRssToItems } from './parseRssXml.js'

const UA = 'OpsOrbit-News/1.0 (RSS aggregator; contact: site owner)'

/**
 * Fetches an allowlisted RSS/Atom URL and returns { items: { title, link, publishedAt? }[] }.
 */
export async function fetchOfficialRssJson(feedUrl) {
  assertOfficialFeedUrl(feedUrl)
  const res = await fetch(feedUrl, {
    headers: { 'User-Agent': UA, Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml' },
  })
  if (!res.ok) {
    const err = new Error('upstream_error')
    err.status = 502
    throw err
  }
  const xml = await res.text()
  const items = parseRssToItems(xml, 12)
  return { items }
}

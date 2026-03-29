/**
 * Official vendor RSS feeds (HTTPS only). Used by the news banner and RSS proxy allowlist.
 * @type {{ source: string, url: string }[]}
 */
export const OFFICIAL_NEWS_FEEDS = [
  { source: 'AWS', url: 'https://aws.amazon.com/blogs/aws/feed/' },
  { source: 'AWS', url: 'https://aws.amazon.com/blogs/machine-learning/feed/' },
  { source: 'Azure', url: 'https://azure.microsoft.com/en-us/blog/feed/' },
  { source: 'GCP', url: 'https://cloudblog.withgoogle.com/products/gcp/rss/' },
  { source: 'GCP', url: 'https://docs.cloud.google.com/feeds/gcp-release-notes.xml' },
  { source: 'AI', url: 'https://blog.google/innovation-and-ai/technology/ai/rss/' },
]

const NORMALIZED = new Set(
  OFFICIAL_NEWS_FEEDS.map(({ url }) => {
    try {
      const u = new URL(url)
      u.hash = ''
      let p = u.pathname.replace(/\/$/, '') || ''
      return `${u.protocol}//${u.hostname.toLowerCase()}${p}`.toLowerCase()
    } catch {
      return url
    }
  })
)

export function assertOfficialFeedUrl(urlStr) {
  let u
  try {
    u = new URL(urlStr)
  } catch {
    throw new Error('invalid_url')
  }
  if (u.protocol !== 'https:') throw new Error('https_only')
  u.hash = ''
  let p = u.pathname.replace(/\/$/, '') || ''
  const key = `${u.protocol}//${u.hostname.toLowerCase()}${p}`.toLowerCase()
  if (!NORMALIZED.has(key)) throw new Error('not_allowlisted')
}

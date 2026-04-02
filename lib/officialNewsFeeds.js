/**
 * Official vendor RSS feeds (HTTPS only). Each row is one blog/category feed.
 * Used by the news banner, RSS proxy allowlist, and `fetch-official-news.mjs`.
 *
 * @type {{ source: string, category: string, url: string }[]}
 */
export const OFFICIAL_NEWS_FEEDS = [
  /* —— AWS —— */
  { source: 'AWS', category: 'News', url: 'https://aws.amazon.com/blogs/aws/feed/' },
  { source: 'AWS', category: 'Architecture', url: 'https://aws.amazon.com/blogs/architecture/feed/' },
  { source: 'AWS', category: 'Database', url: 'https://aws.amazon.com/blogs/database/feed/' },
  { source: 'AWS', category: 'Containers', url: 'https://aws.amazon.com/blogs/containers/feed/' },
  { source: 'AWS', category: 'DevOps', url: 'https://aws.amazon.com/blogs/devops/feed/' },
  { source: 'AWS', category: 'Security', url: 'https://aws.amazon.com/blogs/security/feed/' },
  { source: 'AWS', category: 'Networking', url: 'https://aws.amazon.com/blogs/networking-and-content-delivery/feed/' },
  { source: 'AWS', category: 'Storage', url: 'https://aws.amazon.com/blogs/storage/feed/' },
  { source: 'AWS', category: 'Big Data', url: 'https://aws.amazon.com/blogs/big-data/feed/' },
  { source: 'AWS', category: 'Compute', url: 'https://aws.amazon.com/blogs/compute/feed/' },
  { source: 'AWS', category: 'Machine learning', url: 'https://aws.amazon.com/blogs/machine-learning/feed/' },
  { source: 'AWS', category: 'Mobile', url: 'https://aws.amazon.com/blogs/mobile/feed/' },
  { source: 'AWS', category: 'Games', url: 'https://aws.amazon.com/blogs/gametech/feed/' },
  { source: 'AWS', category: 'Public sector', url: 'https://aws.amazon.com/blogs/publicsector/feed/' },
  { source: 'AWS', category: 'Partner Network', url: 'https://aws.amazon.com/blogs/apn/feed/' },
  { source: 'AWS', category: 'Infrastructure', url: 'https://aws.amazon.com/blogs/infrastructure-and-automation/feed/' },
  { source: 'AWS', category: 'Cost management', url: 'https://aws.amazon.com/blogs/aws-cost-management/feed/' },
  { source: 'AWS', category: 'Developer', url: 'https://aws.amazon.com/blogs/developer/feed/' },
  { source: 'AWS', category: 'Open source', url: 'https://aws.amazon.com/blogs/opensource/feed/' },
  { source: 'AWS', category: 'Contact center', url: 'https://aws.amazon.com/blogs/contact-center/feed/' },
  { source: 'AWS', category: 'IoT', url: 'https://aws.amazon.com/blogs/iot/feed/' },

  /* —— Azure —— */
  { source: 'Azure', category: 'All topics', url: 'https://azure.microsoft.com/en-us/blog/feed/' },
  { source: 'Azure', category: 'AI + ML', url: 'https://azure.microsoft.com/en-us/blog/category/ai-machine-learning/feed/' },
  { source: 'Azure', category: 'Security', url: 'https://azure.microsoft.com/en-us/blog/category/security/feed/' },
  { source: 'Azure', category: 'Containers', url: 'https://azure.microsoft.com/en-us/blog/category/containers/feed/' },
  { source: 'Azure', category: 'DevOps', url: 'https://azure.microsoft.com/en-us/blog/category/devops/feed/' },
  { source: 'Azure', category: 'Databases', url: 'https://azure.microsoft.com/en-us/blog/category/databases/feed/' },
  { source: 'Azure', category: 'Analytics', url: 'https://azure.microsoft.com/en-us/blog/category/analytics/feed/' },
  { source: 'Azure', category: 'Compute', url: 'https://azure.microsoft.com/en-us/blog/category/compute/feed/' },
  { source: 'Azure', category: 'Networking', url: 'https://azure.microsoft.com/en-us/blog/category/networking/feed/' },
  { source: 'Azure', category: 'Storage', url: 'https://azure.microsoft.com/en-us/blog/category/storage/feed/' },
  { source: 'Azure', category: 'Migration', url: 'https://azure.microsoft.com/en-us/blog/category/migration/feed/' },
  { source: 'Azure', category: 'Hybrid & multicloud', url: 'https://azure.microsoft.com/en-us/blog/category/hybrid-multicloud/feed/' },

  /* —— GCP —— */
  { source: 'GCP', category: 'Product blog', url: 'https://cloudblog.withgoogle.com/products/gcp/rss/' },
  { source: 'GCP', category: 'Release notes', url: 'https://docs.cloud.google.com/feeds/gcp-release-notes.xml' },
  { source: 'GCP', category: 'Containers & K8s', url: 'https://cloud.google.com/blog/topics/containers-and-kubernetes/rss' },
  { source: 'GCP', category: 'Data analytics', url: 'https://cloud.google.com/blog/topics/data-analytics/rss' },
  { source: 'GCP', category: 'Databases', url: 'https://cloud.google.com/blog/topics/databases/rss' },
  { source: 'GCP', category: 'AI & ML', url: 'https://cloud.google.com/blog/topics/ai-and-machine-learning/rss' },
  { source: 'GCP', category: 'Networking', url: 'https://cloud.google.com/blog/topics/networking/rss' },
  { source: 'GCP', category: 'Security', url: 'https://cloud.google.com/blog/topics/security/rss' },
  { source: 'GCP', category: 'Productivity', url: 'https://cloud.google.com/blog/topics/productivity-and-collaboration/rss' },
  { source: 'GCP', category: 'Management tools', url: 'https://cloud.google.com/blog/topics/management-tools/rss' },
  { source: 'GCP', category: 'Open source', url: 'https://cloud.google.com/blog/topics/open-source/rss' },
  { source: 'GCP', category: 'Hybrid cloud', url: 'https://cloud.google.com/blog/topics/hybrid-cloud/rss' },
  { source: 'GCP', category: 'Sustainability', url: 'https://cloud.google.com/blog/topics/sustainability/rss' },
  { source: 'GCP', category: 'Inside Google Cloud', url: 'https://cloud.google.com/blog/topics/inside-google-cloud/rss' },
  { source: 'GCP', category: 'Developers', url: 'https://cloud.google.com/blog/topics/developers-practitioners/rss' },

  /* —— Google AI (cross-cloud) —— */
  { source: 'AI', category: 'Google AI blog', url: 'https://blog.google/innovation-and-ai/technology/ai/rss/' },
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

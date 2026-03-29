import { fetchOfficialRssJson } from '../lib/rssFeedHandler.js'

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res)
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    cors(res)
    return res.status(405).json({ items: [], error: 'method' })
  }

  const feedUrl = typeof req.query?.url === 'string' ? req.query.url : req.query?.url?.[0]
  if (!feedUrl) {
    cors(res)
    return res.status(400).json({ items: [], error: 'missing_url' })
  }

  try {
    const data = await fetchOfficialRssJson(feedUrl)
    cors(res)
    return res.status(200).json(data)
  } catch (e) {
    const status = e.status === 502 ? 502 : 400
    cors(res)
    return res.status(status).json({ items: [], error: e.message || 'bad_request' })
  }
}

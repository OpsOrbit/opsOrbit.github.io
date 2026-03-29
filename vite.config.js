import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchOfficialRssJson } from './lib/rssFeedHandler.js'

/** Dev-only: same path as production `/api/rss-feed` on Netlify (see netlify.toml). */
function officialRssProxyPlugin() {
  return {
    name: 'official-rss-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/rss-feed')) return next()
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
          res.end()
          return
        }
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify({ items: [], error: 'method' }))
          return
        }
        let feedUrl = ''
        try {
          feedUrl = new URL(req.url, 'http://vite.local').searchParams.get('url') || ''
        } catch {
          feedUrl = ''
        }
        if (!feedUrl) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify({ items: [], error: 'missing_url' }))
          return
        }
        try {
          const data = await fetchOfficialRssJson(feedUrl)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify(data))
        } catch (e) {
          const status = e.status === 502 ? 502 : 400
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify({ items: [], error: e.message || 'bad_request' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), officialRssProxyPlugin()],
  // For GitHub Pages:
  // - user/org site repo (e.g. username.github.io): keep '/'
  // - project site repo (e.g. repo-name): set VITE_BASE_PATH='/repo-name/'
  base: process.env.VITE_BASE_PATH || '/',
})

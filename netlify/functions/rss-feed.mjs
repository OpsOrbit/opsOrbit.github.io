import { fetchOfficialRssJson } from '../../lib/rssFeedHandler.js'

export async function handler(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'GET, OPTIONS' } }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ items: [], error: 'method' }) }
  }

  const feedUrl = event.queryStringParameters?.url
  if (!feedUrl) {
    return { statusCode: 400, headers, body: JSON.stringify({ items: [], error: 'missing_url' }) }
  }

  try {
    const data = await fetchOfficialRssJson(feedUrl)
    return { statusCode: 200, headers, body: JSON.stringify(data) }
  } catch (e) {
    const status = e.status === 502 ? 502 : 400
    return {
      statusCode: status,
      headers,
      body: JSON.stringify({ items: [], error: e.message || 'bad_request' }),
    }
  }
}

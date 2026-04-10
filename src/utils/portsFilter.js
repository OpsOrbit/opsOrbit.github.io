import { PORTS } from '../data/portsData'

function norm(s) {
  return (s || '').toLowerCase()
}

/**
 * @param {string} query
 * @param {string} categoryId - 'all' or category slug
 */
export function filterPorts(query, categoryId) {
  const q = norm(query.trim())
  let list = PORTS
  if (categoryId && categoryId !== 'all') {
    list = list.filter((p) => p.categoryId === categoryId)
  }
  if (!q) return list
  return list.filter((p) => {
    const blob = [
      String(p.port),
      p.service,
      p.protocol,
      p.description,
      p.useCaseLabel,
      p.categoryId,
      ...p.commands,
    ]
      .join(' ')
    return norm(blob).includes(q)
  })
}

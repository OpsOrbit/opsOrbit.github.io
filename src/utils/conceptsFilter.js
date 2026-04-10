import { CONCEPTS } from '../data/conceptsData'

function norm(s) {
  return (s || '').toLowerCase()
}

/**
 * @param {string} query
 * @param {string} categoryId - 'all' or category
 */
export function filterConcepts(query, categoryId) {
  const q = norm(query.trim())
  let list = CONCEPTS
  if (categoryId && categoryId !== 'all') {
    list = list.filter((c) => c.categoryId === categoryId)
  }
  if (!q) return list
  return list.filter((c) => {
    const blob = [c.title, ...c.summary, c.categoryId, ...c.flow.map((n) => [n.label, n.hint].filter(Boolean).join(' '))]
      .join(' ')
    return norm(blob).includes(q)
  })
}

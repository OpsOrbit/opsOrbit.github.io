import { SCENARIOS } from '../data/scenariosData.js'

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * @param {string} query
 * @param {string} categoryId - 'all' or category
 * @param {string} difficultyId - 'all' or difficulty
 */
export function filterScenarios(query, categoryId, difficultyId) {
  const q = norm(query)
  const cat = categoryId === 'all' || !categoryId ? null : categoryId
  const diff = difficultyId === 'all' || !difficultyId ? null : difficultyId

  return SCENARIOS.filter((s) => {
    if (cat && s.categoryId !== cat) return false
    if (diff && s.difficulty !== diff) return false
    if (!q) return true
    const hay = norm(
      [
        s.title,
        s.shortDescription,
        s.problem,
        s.categoryId,
        s.difficulty,
        ...(s.symptoms || []),
        ...(s.commandSummary || []),
        s.solution,
        ...(s.steps || []).flatMap((st) => [st.title, st.detail, ...(st.commands || [])]),
      ].join(' ')
    )
    return hay.includes(q)
  })
}

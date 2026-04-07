import { TECH_WORDS, categoryLabelForTechWord } from '../data/techWordsData'

function queryWords(query) {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9*./_+-]/gi, ''))
    .filter((w) => w.length > 0)
}

function blobMatchesTokens(blob, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  if (blob.includes(q)) return true
  const words = queryWords(query)
  if (words.length <= 1) return words.length === 0 ? true : blob.includes(words[0])
  return words.every((w) => w.length > 0 && blob.includes(w))
}

function termBlob(t) {
  return [
    t.term,
    t.shortDefinition,
    t.whyWeUseIt,
    t.whereUsed,
    t.example,
    t.snippet,
    t.beginnerExplanation,
    t.categoryId,
    categoryLabelForTechWord(t.categoryId),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

/**
 * @param {string} query
 * @param {string} categoryId - 'all' or category
 */
export function filterTechWords(query, categoryId) {
  let list = TECH_WORDS
  if (categoryId && categoryId !== 'all') {
    list = list.filter((t) => t.categoryId === categoryId)
  }
  const q = query.trim()
  if (!q) return list
  return list.filter((t) => blobMatchesTokens(termBlob(t), q))
}

export function techWordsCountForCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return TECH_WORDS.length
  return TECH_WORDS.filter((t) => t.categoryId === categoryId).length
}

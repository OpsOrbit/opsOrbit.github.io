import { DEVOPS_TOOLS, categoryLabel } from '../data/toolsData'

/**
 * @typedef {{ openSource: boolean, paid: boolean, cloudNative: boolean }} ToolFilterChips
 */

/**
 * @param {import('../data/toolsData').DEVOPS_TOOLS[number]} tool
 * @param {ToolFilterChips} chips
 */
function matchesChips(tool, chips) {
  const { openSource, paid, cloudNative } = chips
  const anyChip = openSource || paid || cloudNative
  if (!anyChip) return true

  const lic = tool.license

  if (openSource || paid) {
    const matchesOpen =
      openSource && (lic === 'Open Source' || lic === 'Hybrid')
    const matchesPaid = paid && (lic === 'Paid' || lic === 'Hybrid')
    if (openSource && paid) {
      if (!matchesOpen && !matchesPaid) return false
    } else if (openSource && !matchesOpen) return false
    else if (paid && !matchesPaid) return false
  }

  if (cloudNative && !tool.cloudNative) return false

  return true
}

/**
 * @param {string} query
 * @param {string | null} categoryId — null or 'all' = all categories
 * @param {ToolFilterChips} chips
 */
export function filterDevopsTools(query, categoryId, chips) {
  const q = query.trim().toLowerCase()
  const cat = categoryId && categoryId !== 'all' ? categoryId : null

  return DEVOPS_TOOLS.filter((tool) => {
    if (cat && tool.categoryId !== cat) return false
    if (!matchesChips(tool, chips)) return false

    if (!q) return true

    const catName = categoryLabel(tool.categoryId).toLowerCase()
    const hay = [
      tool.name,
      tool.description,
      tool.usedFor,
      tool.why,
      catName,
      ...(tool.features || []),
      ...(tool.alternatives || []),
    ]
      .join(' ')
      .toLowerCase()

    return hay.includes(q)
  })
}

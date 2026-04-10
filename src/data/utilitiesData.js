/** @typedef {'cidr' | 'base64' | 'json' | 'portcheck'} UtilitiesToolId */

export const UTILITIES_TOOL_IDS = new Set(['cidr', 'base64', 'json', 'portcheck'])

export const UTILITIES_TOOL_ORDER = /** @type {const} */ (['cidr', 'base64', 'json', 'portcheck'])

/** @type {{ id: UtilitiesToolId, title: string, shortDescription: string, icon: string }[]} */
export const UTILITIES_TOOLS = [
  {
    id: 'cidr',
    title: 'CIDR Calculator',
    shortDescription: 'Network, broadcast, mask, and usable hosts from an IPv4 CIDR.',
    icon: '◈',
  },
  {
    id: 'base64',
    title: 'Base64',
    shortDescription: 'Encode text to Base64 or decode Base64 back to UTF-8 text.',
    icon: '⊕',
  },
  {
    id: 'json',
    title: 'JSON Formatter',
    shortDescription: 'Validate, pretty-print, or minify JSON in the browser.',
    icon: '{ }',
  },
  {
    id: 'portcheck',
    title: 'Port checker',
    shortDescription: 'Validate a host/port and probe HTTP(S); common services reference.',
    icon: '🔌',
  },
]

export const UTILITIES_TOOL_COUNT = UTILITIES_TOOLS.length

/**
 * How many utility cards match the header search (empty query = all).
 * @param {string} query
 */
export function countVisibleUtilityTools(query) {
  const q = query.trim().toLowerCase()
  if (!q) return UTILITIES_TOOLS.length
  return UTILITIES_TOOLS.filter(
    (t) => t.title.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q)
  ).length
}

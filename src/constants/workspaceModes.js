/** Left-to-right order of top workspace tabs (keep in sync with WorkspaceModeNav). */
export const WORKSPACE_MODE_ORDER = /** @type {const} */ ([
  'tools',
  'commands',
  'scripting',
  'roadmap',
  'techwords',
  'concepts',
  'ports',
  'scenarios',
  'playground',
  'architecture',
  'cheatsheets',
  'utilities',
  'daily',
])

/**
 * @param {string} current
 * @param {-1 | 1} delta
 */
export function stepWorkspaceMode(current, delta) {
  const len = WORKSPACE_MODE_ORDER.length
  let i = WORKSPACE_MODE_ORDER.indexOf(current)
  if (i < 0) i = 0
  return WORKSPACE_MODE_ORDER[(i + delta + len) % len]
}

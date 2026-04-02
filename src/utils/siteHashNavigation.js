import { SCRIPTING_GUIDES } from '../data/scriptingGuides'
import { TOOL_CATEGORY_IDS } from '../data/toolsData'

/** Tools that appear in Commands sidebar (excludes `all`). */
export const HASH_COMMAND_TOOLS = new Set([
  'aws',
  'azure',
  'gcp',
  'linux',
  'git',
  'github-actions',
  'docker',
  'terraform',
  'kubernetes',
  'helm',
  'ansible',
  'nginx',
  'apache',
  'tomcat',
  'haproxy',
  'prometheus',
  'grafana',
  'postgresql',
  'redis',
  'maven',
  'shell',
])

const SCRIPTING_IDS = new Set(SCRIPTING_GUIDES.map((g) => g.id))
const DEFAULT_SCRIPTING_TOPIC = SCRIPTING_GUIDES[0]?.id ?? 'dockerfile'

/**
 * @returns {{ mode: 'commands', tool: string } | { mode: 'scripting', topic: string } | { mode: 'roadmap' } | { mode: 'tools', category: string } | null}
 */
export function parseWorkspaceHash(hash) {
  if (hash == null || hash === '' || hash === '#') return null
  const trimmed = String(hash).replace(/^#/, '')
  const match = trimmed.match(/^\/?(commands|scripting|roadmap|tools)(?:\/([^/?#]+))?\/?$/)
  if (!match) return null
  const [, mode, segment] = match
  if (mode === 'roadmap') return { mode: 'roadmap' }
  if (mode === 'tools') {
    if (!segment || segment === 'all') return { mode: 'tools', category: 'all' }
    if (TOOL_CATEGORY_IDS.has(segment)) return { mode: 'tools', category: segment }
    return { mode: 'tools', category: 'all' }
  }
  if (mode === 'scripting') {
    const topic =
      segment && SCRIPTING_IDS.has(segment) ? segment : DEFAULT_SCRIPTING_TOPIC
    return { mode: 'scripting', topic }
  }
  if (mode === 'commands') {
    if (!segment || segment === 'all') return { mode: 'commands', tool: 'all' }
    if (HASH_COMMAND_TOOLS.has(segment)) return { mode: 'commands', tool: segment }
    return { mode: 'commands', tool: 'all' }
  }
  return null
}

/**
 * @param {{ mode: string, tool?: string, topic?: string, toolsCategory?: string }} p
 * @returns {string} Hash starting with #/…
 */
export function buildWorkspaceHash({ mode, tool = 'all', topic, toolsCategory = 'all' }) {
  if (mode === 'roadmap') return '#/roadmap'
  if (mode === 'tools') {
    if (!toolsCategory || toolsCategory === 'all') return '#/tools'
    if (TOOL_CATEGORY_IDS.has(toolsCategory)) return `#/tools/${toolsCategory}`
    return '#/tools'
  }
  if (mode === 'scripting') {
    const tid = topic && SCRIPTING_IDS.has(topic) ? topic : DEFAULT_SCRIPTING_TOPIC
    return `#/scripting/${tid}`
  }
  if (mode === 'commands') {
    if (!tool || tool === 'all') return '#/commands/all'
    if (HASH_COMMAND_TOOLS.has(tool)) return `#/commands/${tool}`
    return '#/commands/all'
  }
  return '#/commands/all'
}

/**
 * @param {{ type: 'commands', tool: string, label?: string } | { type: 'scripting', topic: string, label?: string } | { type: 'tools', category?: string, label?: string }} link
 */
export function workspaceHashFromLink(link) {
  if (link.type === 'commands') {
    return buildWorkspaceHash({ mode: 'commands', tool: link.tool })
  }
  if (link.type === 'scripting') {
    return buildWorkspaceHash({ mode: 'scripting', topic: link.topic })
  }
  if (link.type === 'tools') {
    return buildWorkspaceHash({ mode: 'tools', toolsCategory: link.category || 'all' })
  }
  return '#/commands/all'
}

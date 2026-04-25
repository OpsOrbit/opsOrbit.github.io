import { SCRIPTING_GUIDES } from '../data/scriptingGuides'
import { TOOL_CATEGORY_IDS } from '../data/toolsData'
import { TECH_WORD_CATEGORY_IDS } from '../data/techWordsData'
import { CONCEPT_CATEGORY_IDS } from '../data/conceptsData'
import { PORT_CATEGORY_IDS } from '../data/portsData'
import { PLAYGROUND_TAB_IDS } from '../data/playgroundData'
import { ARCHITECTURE_IDS } from '../data/architectureData'
import { CHEATSHEET_TAB_IDS } from '../data/cheatsheetsData'
import { UTILITIES_TOOL_IDS } from '../data/utilitiesData'

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
 * @returns {{ mode: 'commands', tool: string } | { mode: 'scripting', topic: string } | { mode: 'roadmap' } | { mode: 'tools', category: string } | { mode: 'techwords', category: string } | { mode: 'concepts', category: string } | { mode: 'ports', category: string } | { mode: 'scenarios' } | { mode: 'playground', tab: string } | { mode: 'architecture', architectureId: string | null } | { mode: 'cheatsheets', tab: string } | { mode: 'utilities', tab: string } | { mode: 'daily' } | null}
 */
export function parseWorkspaceHash(hash) {
  if (hash == null || hash === '' || hash === '#') return null
  const trimmed = String(hash).replace(/^#/, '')
  const sc = trimmed.match(/^\/?scenarios(?:\/([^/?#]+))?(?:\/([^/?#]+))?\/?$/)
  if (sc) return { mode: 'scenarios' }
  const pg = trimmed.match(/^\/?playground(?:\/([^/?#]+))?\/?$/)
  if (pg) {
    const seg = pg[1]
    const tab = seg && PLAYGROUND_TAB_IDS.has(seg) ? seg : 'kubernetes'
    return { mode: 'playground', tab }
  }
  const arch = trimmed.match(/^\/?architecture(?:\/([^/?#]+))?\/?$/)
  if (arch) {
    const seg = arch[1]
    if (!seg) return { mode: 'architecture', architectureId: null }
    if (ARCHITECTURE_IDS.has(seg)) return { mode: 'architecture', architectureId: seg }
    return { mode: 'architecture', architectureId: null }
  }
  const ch = trimmed.match(/^\/?cheatsheets(?:\/([^/?#]+))?\/?$/)
  if (ch) {
    const seg = ch[1]
    if (!seg) return { mode: 'cheatsheets', tab: 'git' }
    if (CHEATSHEET_TAB_IDS.has(seg)) return { mode: 'cheatsheets', tab: seg }
    return { mode: 'cheatsheets', tab: 'git' }
  }
  const ut = trimmed.match(/^\/?utilities(?:\/([^/?#]+))?\/?$/)
  if (ut) {
    const seg = ut[1]
    if (!seg) return { mode: 'utilities', tab: 'cidr' }
    if (UTILITIES_TOOL_IDS.has(seg)) return { mode: 'utilities', tab: seg }
    return { mode: 'utilities', tab: 'cidr' }
  }
  if (/^\/?daily\/?$/.test(trimmed)) return { mode: 'daily' }
  const match = trimmed.match(/^\/?(commands|scripting|roadmap|tools|techwords|concepts|ports)(?:\/([^/?#]+))?\/?$/)
  if (!match) return null
  const [, mode, segment] = match
  if (mode === 'roadmap') return { mode: 'roadmap' }
  if (mode === 'techwords') {
    if (!segment || segment === 'all') return { mode: 'techwords', category: 'all' }
    if (TECH_WORD_CATEGORY_IDS.has(segment)) return { mode: 'techwords', category: segment }
    return { mode: 'techwords', category: 'all' }
  }
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
  if (mode === 'concepts') {
    if (!segment || segment === 'all') return { mode: 'concepts', category: 'all' }
    if (CONCEPT_CATEGORY_IDS.has(segment)) return { mode: 'concepts', category: segment }
    return { mode: 'concepts', category: 'all' }
  }
  if (mode === 'ports') {
    if (!segment || segment === 'all') return { mode: 'ports', category: 'all' }
    if (PORT_CATEGORY_IDS.has(segment)) return { mode: 'ports', category: segment }
    return { mode: 'ports', category: 'all' }
  }
  return null
}

/**
 * @param {{ mode: string, tool?: string, topic?: string, toolsCategory?: string, techWordsCategory?: string, conceptsCategory?: string, portsCategory?: string, playgroundTab?: string, architectureId?: string | null, cheatsheetTab?: string, utilitiesTab?: string }} p
 * @returns {string} Hash starting with #/…
 */
export function buildWorkspaceHash({
  mode,
  tool = 'all',
  topic,
  toolsCategory = 'all',
  techWordsCategory = 'all',
  conceptsCategory = 'all',
  portsCategory = 'all',
  playgroundTab = 'kubernetes',
  architectureId = null,
  cheatsheetTab = 'git',
  utilitiesTab = 'cidr',
}) {
  if (mode === 'roadmap') return '#/roadmap'
  if (mode === 'techwords') {
    if (!techWordsCategory || techWordsCategory === 'all') return '#/techwords'
    if (TECH_WORD_CATEGORY_IDS.has(techWordsCategory)) return `#/techwords/${techWordsCategory}`
    return '#/techwords'
  }
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
  if (mode === 'concepts') {
    if (!conceptsCategory || conceptsCategory === 'all') return '#/concepts'
    if (CONCEPT_CATEGORY_IDS.has(conceptsCategory)) return `#/concepts/${conceptsCategory}`
    return '#/concepts'
  }
  if (mode === 'ports') {
    if (!portsCategory || portsCategory === 'all') return '#/ports'
    if (PORT_CATEGORY_IDS.has(portsCategory)) return `#/ports/${portsCategory}`
    return '#/ports'
  }
  if (mode === 'scenarios') return '#/scenarios'
  if (mode === 'playground') {
    const t = playgroundTab || 'kubernetes'
    const safe = PLAYGROUND_TAB_IDS.has(t) ? t : 'kubernetes'
    if (safe === 'kubernetes') return '#/playground'
    return `#/playground/${safe}`
  }
  if (mode === 'architecture') {
    const id = architectureId
    if (!id || !ARCHITECTURE_IDS.has(id)) return '#/architecture'
    return `#/architecture/${id}`
  }
  if (mode === 'cheatsheets') {
    const t = cheatsheetTab || 'git'
    const safe = CHEATSHEET_TAB_IDS.has(t) ? t : 'git'
    if (safe === 'git') return '#/cheatsheets'
    return `#/cheatsheets/${safe}`
  }
  if (mode === 'utilities') {
    const t = utilitiesTab || 'cidr'
    const safe = UTILITIES_TOOL_IDS.has(t) ? t : 'cidr'
    if (safe === 'cidr') return '#/utilities'
    return `#/utilities/${safe}`
  }
  if (mode === 'daily') return '#/daily'
  return '#/tools'
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
  return '#/tools'
}

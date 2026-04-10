import { COMMANDS_DATA } from '../data/commands'
import { COMMAND_EXTRAS } from '../data/commandExtras'
import { DEVOPS_TOOLS } from '../data/toolsData'
import { SCRIPTING_GUIDES } from '../data/scriptingGuides'
import { TECH_WORDS } from '../data/techWordsData'
import { CONCEPTS } from '../data/conceptsData'
import { PORTS } from '../data/portsData'
import { SCENARIOS } from '../data/scenariosData'

const LIMIT = 8

function norm(s) {
  return (s || '').toLowerCase()
}

function includes(hay, q) {
  return norm(hay).includes(q)
}

/**
 * @param {string} rawQuery
 * @returns {{
 *   commands: typeof COMMANDS_DATA,
 *   tools: typeof DEVOPS_TOOLS,
 *   labs: typeof SCRIPTING_GUIDES,
 *   techWords: typeof TECH_WORDS,
 *   concepts: typeof CONCEPTS,
 *   ports: typeof PORTS
 *   scenarios: typeof SCENARIOS
 * }}
 */
export function searchGlobal(rawQuery) {
  const q = norm(rawQuery.trim())
  if (!q) {
    return { commands: [], tools: [], labs: [], techWords: [], concepts: [], ports: [], scenarios: [] }
  }

  const commands = []
  for (const c of COMMANDS_DATA) {
    if (commands.length >= LIMIT) break
    const ex = COMMAND_EXTRAS[c.id] || {}
    const blob = [c.name, c.command, c.description, c.category, c.tool]
      .filter(Boolean)
      .join(' ')
    if (includes(blob, q)) commands.push(c)
  }

  const tools = []
  for (const t of DEVOPS_TOOLS) {
    if (tools.length >= LIMIT) break
    const blob = [t.name, t.description, t.usedFor, t.why, ...(t.features || []), ...(t.alternatives || [])]
      .filter(Boolean)
      .join(' ')
    if (includes(blob, q)) tools.push(t)
  }

  const labs = []
  for (const g of SCRIPTING_GUIDES) {
    if (labs.length >= LIMIT) break
    const blob = [g.title, g.tagline].filter(Boolean).join(' ')
    if (includes(blob, q)) labs.push(g)
  }

  const techWords = []
  for (const w of TECH_WORDS) {
    if (techWords.length >= LIMIT) break
    const blob = [w.term, w.shortDefinition, w.whyWeUseIt, w.whereUsed, w.example, w.beginnerExplanation]
      .filter(Boolean)
      .join(' ')
    if (includes(blob, q)) techWords.push(w)
  }

  const concepts = []
  for (const c of CONCEPTS) {
    if (concepts.length >= LIMIT) break
    const blob = [c.title, ...c.summary, ...c.flow.map((n) => [n.label, n.hint].filter(Boolean).join(' '))]
      .filter(Boolean)
      .join(' ')
    if (includes(blob, q)) concepts.push(c)
  }

  const ports = []
  for (const p of PORTS) {
    if (ports.length >= LIMIT) break
    const blob = [
      String(p.port),
      p.service,
      p.protocol,
      p.description,
      p.useCaseLabel,
      ...p.commands,
    ]
      .filter(Boolean)
      .join(' ')
    if (includes(blob, q)) ports.push(p)
  }

  const scenarios = []
  for (const s of SCENARIOS) {
    if (scenarios.length >= LIMIT) break
    const blob = [
      s.title,
      s.shortDescription,
      s.problem,
      s.categoryId,
      s.difficulty,
      ...(s.symptoms || []),
      ...(s.commandSummary || []),
      s.solution,
    ]
      .filter(Boolean)
      .join(' ')
    if (includes(blob, q)) scenarios.push(s)
  }

  return { commands, tools, labs, techWords, concepts, ports, scenarios }
}

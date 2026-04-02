/** Lowercase haystack for matching; strips simple **bold** markers from guide prose. */
function flattenScriptingGuideText(guide) {
  const parts = [guide.id, guide.title, guide.tagline]
  for (const s of guide.sections || []) {
    parts.push(s.title, s.intro, s.body, s.code)
    s.bullets?.forEach((b) => parts.push(b))
    s.definitions?.forEach((d) => {
      parts.push(d.term, d.syntax, d.body)
    })
  }
  return parts
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/\*\*/g, '')
}

function queryWords(query) {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9*./_+-]/gi, ''))
    .filter((w) => w.length > 0)
}

/** True if every token appears somewhere in blob (order-independent). */
function blobMatchesTokens(blob, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  if (blob.includes(q)) return true
  const words = queryWords(query)
  if (words.length <= 1) return words.length === 0 ? true : blob.includes(words[0])
  return words.every((w) => w.length > 0 && blob.includes(w))
}

export function scriptingGuideMatchesQuery(guide, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const blob = flattenScriptingGuideText(guide)
  return blobMatchesTokens(blob, query)
}

export function filterScriptingGuides(guides, query) {
  const q = query.trim().toLowerCase()
  if (!q) return guides
  return guides.filter((g) => scriptingGuideMatchesQuery(g, query))
}

export function roadmapFlowStepMatchesQuery(step, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const parts = [step.id, step.mainTitle, step.panelTitle, step.level, step.track, ...(step.topics || [])]
  for (const row of step.rows || []) {
    parts.push(row.text)
    for (const l of row.links || []) {
      parts.push(l.label)
      if (l.type === 'commands') parts.push(l.tool)
      if (l.type === 'scripting') parts.push(l.topic)
      if (l.type === 'tools') parts.push(l.category, 'tools')
    }
  }
  const blob = parts.filter(Boolean).join(' ').toLowerCase()
  return blobMatchesTokens(blob, query)
}

export function filterRoadmapFlowSteps(steps, query) {
  const q = query.trim().toLowerCase()
  if (!q) return steps
  return steps.filter((s) => roadmapFlowStepMatchesQuery(s, query))
}

export function filterRoadmapFinalOrder(lines, query) {
  const q = query.trim().toLowerCase()
  if (!q) return lines
  return lines.filter((line) => blobMatchesTokens(line.toLowerCase(), query))
}

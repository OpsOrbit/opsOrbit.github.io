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

export function scriptingGuideMatchesQuery(guide, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return flattenScriptingGuideText(guide).includes(q)
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
  return parts.filter(Boolean).join(' ').toLowerCase().includes(q)
}

export function filterRoadmapFlowSteps(steps, query) {
  const q = query.trim().toLowerCase()
  if (!q) return steps
  return steps.filter((s) => roadmapFlowStepMatchesQuery(s, query))
}

export function filterRoadmapFinalOrder(lines, query) {
  const q = query.trim().toLowerCase()
  if (!q) return lines
  return lines.filter((line) => line.toLowerCase().includes(q))
}

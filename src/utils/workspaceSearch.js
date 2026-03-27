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

export function roadmapLaneMatchesQuery(lane, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const hay = [lane.id, lane.title, lane.tools, ...(lane.topics || [])].join(' ').toLowerCase()
  return hay.includes(q)
}

export function filterRoadmapLanes(lanes, query) {
  const q = query.trim().toLowerCase()
  if (!q) return lanes
  return lanes.filter((l) => roadmapLaneMatchesQuery(l, query))
}

export function filterRoadmapFinalOrder(lines, query) {
  const q = query.trim().toLowerCase()
  if (!q) return lines
  return lines.filter((line) => line.toLowerCase().includes(q))
}

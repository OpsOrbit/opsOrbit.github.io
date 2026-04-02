/**
 * Intent-aware matching for natural-language style queries, e.g. "list s3 buckets".
 */

const STOPWORDS = new Set([
  'a',
  'an',
  'the',
  'to',
  'for',
  'and',
  'or',
  'how',
  'do',
  'i',
  'my',
  'in',
  'on',
  'at',
  'with',
  'is',
  'it',
  'me',
  'we',
  'you',
  'run',
  'use',
  'get',
])

/** @type {{ test: (q: string) => boolean, match: (cmd: object, extras: object) => boolean }[]} */
const INTENT_RULES = [
  {
    test: (q) => /list\s+(all\s+)?s3\s+buckets?|s3\s+buckets?\s+list|show\s+s3\s+buckets?/i.test(q),
    match: (cmd) => /aws\s+s3\s+ls/i.test(cmd.command || ''),
  },
  {
    test: (q) => /upload\s+.*s3|s3\s+upload|push\s+.*s3|copy\s+.*s3/i.test(q),
    match: (cmd) => /aws\s+s3\s+(cp|sync)/i.test(cmd.command || ''),
  },
  {
    test: (q) => /configure\s+aws|aws\s+setup|aws\s+credentials?|set\s+aws\s+keys?/i.test(q),
    match: (cmd) => /aws\s+configure/i.test(cmd.command || ''),
  },
  {
    test: (q) => /who\s+am\s+i|current\s+aws\s+(user|account|identity)/i.test(q),
    match: (cmd) => /sts\s+get-caller-identity/i.test(cmd.command || ''),
  },
  {
    test: (q) => /list\s+(ec2\s+)?instances?|running\s+vms?|show\s+ec2/i.test(q),
    match: (cmd) => /ec2\s+describe-instances/i.test(cmd.command || ''),
  },
  {
    test: (q) => /docker\s+logs?|see\s+container\s+logs?/i.test(q),
    match: (cmd) => /docker\s+(logs|compose\s+logs)/i.test(cmd.command || ''),
  },
  {
    test: (q) => /kubectl\s+get\s+pods?|list\s+pods?/i.test(q),
    match: (cmd) => /kubectl\s+get\s+pod/i.test(cmd.command || ''),
  },
  {
    test: (q) => /git\s+status|what\s+changed|uncommitted/i.test(q),
    match: (cmd) => /^git\s+status\b/i.test(cmd.command || ''),
  },
  {
    test: (q) => /commit\s+changes?|save\s+git|git\s+commit/i.test(q),
    match: (cmd) => /^git\s+commit\b/i.test(cmd.command || ''),
  },
  {
    test: (q) => /push\s+to\s+(origin|remote)|git\s+push/i.test(q),
    match: (cmd) => /^git\s+push\b/i.test(cmd.command || ''),
  },
  {
    test: (q) => /terraform\s+plan|preview\s+infra/i.test(q),
    match: (cmd) => /terraform\s+plan/i.test(cmd.command || ''),
  },
  {
    test: (q) => /terraform\s+apply|deploy\s+infra/i.test(q),
    match: (cmd) => /terraform\s+apply/i.test(cmd.command || ''),
  },
]

function stripHtml(html) {
  if (!html || typeof html !== 'string') return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
}

function searchableBlob(cmd, extras) {
  const parts = [
    cmd.name,
    cmd.command,
    cmd.description,
    cmd.category,
    cmd.tool,
    cmd.level,
    extras.whyNeed,
    extras.scenarios,
    extras.commonOptions,
    stripHtml(cmd.explanation || ''),
  ]
  return parts.filter(Boolean).join(' ').toLowerCase()
}

function tokenMatch(blob, word) {
  if (!word || word.length < 2) return false
  if (blob.includes(word)) return true
  const stem = word.replace(/s$/, '')
  if (stem.length >= 3 && blob.includes(stem)) return true
  return false
}

/**
 * @param {object} cmd
 * @param {string} query
 * @param {object} [extras] COMMAND_EXTRAS merge
 */
export function commandMatchesQuery(cmd, query, extras = {}) {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const blob = searchableBlob(cmd, extras)

  if (blob.includes(q)) return true

  for (const rule of INTENT_RULES) {
    if (rule.test(q) && rule.match(cmd, extras)) return true
  }

  const words = q
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9*./-]/gi, ''))
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))

  if (words.length === 0) {
    return [cmd.name, cmd.command, cmd.description].some((f) => f && String(f).toLowerCase().includes(q))
  }

  const hits = words.filter((w) => tokenMatch(blob, w))
  if (hits.length >= Math.min(words.length, 2) || (words.length === 1 && hits.length === 1)) {
    return true
  }

  return [cmd.name, cmd.command, cmd.description, cmd.category].some(
    (f) => f && String(f).toLowerCase().includes(q)
  )
}

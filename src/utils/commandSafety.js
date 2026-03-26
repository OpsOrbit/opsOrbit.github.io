/**
 * Detect potentially destructive or high-risk shell commands for UI warning styling.
 */
const DANGEROUS_PATTERNS = [
  /\brm\s+-\S*r\S*f\S*(\s|$)/i,
  /\brm\s+-\S*f\S*r\S*(\s|$)/i,
  /\brm\s+.*[\s'"*]\*+/,
  />\s*\/dev\/sd[a-z]/i,
  /mkfs\.?\w*\s+/i,
  /\bdd\s+.*\bof=\/dev\//i,
  /\bchmod\s+777\b/,
  /\bchmod\s+[-+]a=+rwx\b/i,
  /\bshred\s+/i,
  /\bwget\s+[^|]+\|\s*(ba)?sh\b/i,
  /\bcurl\s+[^|]+\|\s*(ba)?sh\b/i,
]

export function isDangerousCommand(commandString) {
  if (!commandString || typeof commandString !== 'string') return false
  const s = commandString.trim()
  return DANGEROUS_PATTERNS.some((re) => re.test(s))
}

import { COMMAND_EXTRAS } from '../data/commandExtras'
import { COMMANDS_DATA } from '../data/commands'

/** Optional explicit flow override: command id → ordered CLI snippets */
const FLOW_OVERRIDE = {
  'aws-s3-cp-recursive': ['aws configure', 'aws s3 ls', 'aws s3 cp ./dist s3://my-bucket/site --recursive'],
  'aws-s3-ls': ['aws configure', 'aws sts get-caller-identity', 'aws s3 ls'],
  'aws-s3-sync': ['aws configure', 'aws s3 ls', 'aws s3 sync ./backup s3://my-bucket/backup --delete'],
}

export function getExtrasForCommand(cmd) {
  return COMMAND_EXTRAS[cmd.id] || {}
}

export function enrichCommand(cmd) {
  return { ...cmd, ...getExtrasForCommand(cmd) }
}

export function resolveRelatedCommands(cmd, max = 6) {
  const ids = getExtrasForCommand(cmd).suggestedNext || []
  const out = []
  for (const id of ids) {
    const c = COMMANDS_DATA.find((x) => x.id === id)
    if (c) out.push(c)
    if (out.length >= max) break
  }
  return out
}

/**
 * Ordered steps for mini flow UI (current command emphasized).
 */
export function buildCommandFlow(cmd) {
  const override = FLOW_OVERRIDE[cmd.id]
  if (override?.length) return override

  const related = resolveRelatedCommands(cmd, 4)
  if (related.length === 0) return [cmd.command]

  const chain = [cmd.command]
  for (const r of related) {
    if (!chain.includes(r.command)) chain.push(r.command)
    if (chain.length >= 4) break
  }
  return chain
}

export function getRealUseCaseText(cmd, extras) {
  if (extras.scenarios) return extras.scenarios
  if (extras.whyNeed) return extras.whyNeed
  const d = cmd.description || ''
  if (d.length > 20) return `Typical use: ${d}`
  return 'Use this command in your daily workflow when the task matches the description above.'
}

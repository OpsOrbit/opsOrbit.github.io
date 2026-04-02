/**
 * Step-by-step token explanations + defaults for the command assistant panel.
 * Optional COMMAND_EXTRAS.stepBreakdown overrides this entirely.
 */

const TOKEN_HINTS = {
  aws: 'AWS CLI — talk to AWS APIs from the terminal',
  configure: 'Interactive setup for keys, region, and output format',
  git: 'Git — version control',
  docker: 'Docker CLI — containers and images',
  kubectl: 'kubectl — Kubernetes cluster control',
  terraform: 'Terraform — infrastructure as code',
  ansible: 'Ansible — automation / configuration',
  helm: 'Helm — Kubernetes packages',
  mvn: 'Maven — Java build and dependencies',
  npm: 'npm — Node packages',
  curl: 'curl — HTTP requests',
  ssh: 'SSH — secure remote shell',
  ls: 'List files or resources',
  cd: 'Change working directory',
  cp: 'Copy files or objects',
  mv: 'Move or rename',
  rm: 'Remove files (destructive)',
  grep: 'Search text in files or streams',
  find: 'Find files by pattern',
  chmod: 'Change file permissions',
  chown: 'Change file ownership',
  sudo: 'Run with elevated privileges',
  systemctl: 'systemd service control',
  journalctl: 'View systemd logs',
  nginx: 'Nginx web server CLI',
  ps: 'Process list',
  kill: 'Send signal to process',
  tar: 'Archive / compress',
  unzip: 'Extract zip archives',
  wget: 'Download files',
  scp: 'Copy over SSH',
  rsync: 'Sync files efficiently',
  env: 'Show or set environment',
  export: 'Export shell variable',
  source: 'Run script in current shell',
  apply: 'Apply manifest or configuration',
  plan: 'Preview infrastructure changes',
  init: 'Initialize project or backend',
  destroy: 'Remove managed infrastructure',
  push: 'Upload commits to remote',
  pull: 'Download and integrate remote changes',
  commit: 'Record staged changes',
  add: 'Stage files for commit',
  status: 'Show working tree state',
  clone: 'Copy a repository locally',
  stash: 'Temporarily shelve changes',
  diff: 'Show changes',
  branch: 'List or manage branches',
  merge: 'Combine branch histories',
  rebase: 'Replay commits on another base',
  run: 'Run a container',
  exec: 'Run command in running container',
  build: 'Build image from Dockerfile',
  logs: 'Show container or pod logs',
  s3: 'Amazon S3 object storage',
  sts: 'AWS Security Token Service',
  ec2: 'Amazon EC2 compute',
  sync: 'Synchronize directories or buckets',
  get: 'Fetch Kubernetes resources',
  describe: 'Detailed resource description',
  create: 'Create a resource',
  delete: 'Delete a resource',
  install: 'Install chart or package',
  upgrade: 'Upgrade release',
  test: 'Run tests',
  package: 'Build artifact',
  clean: 'Remove build outputs',
  compile: 'Compile sources',
  login: 'Authenticate to a registry or cloud',
  logout: 'Clear stored credentials',
}

const TOOL_MISTAKES = {
  aws: ['Invalid or rotated access keys', 'Default region does not match where resources live', 'Using the wrong AWS profile'],
  git: ['Not in a git repository', 'Merge conflicts not resolved before commit', 'Pushing to protected branch without rights'],
  docker: ['Daemon not running', 'Wrong image tag or registry auth', 'Port already in use'],
  kubernetes: ['Wrong kube-context or namespace', 'RBAC denies the operation', 'Resource name typo'],
  terraform: ['State locked by another run', 'Provider version mismatch', 'Wrong workspace'],
  ansible: ['SSH key or inventory host unreachable', 'Become/sudo password required', 'Playbook path typo'],
  linux: ['Permission denied (use sudo or fix ownership)', 'Wrong path or typo', 'Binary not in PATH'],
  shell: ['Unquoted variables with spaces', 'set -e exiting early', 'Wrong interpreter in shebang'],
  nginx: ['Config test fails — check nginx -t', 'Port 80/443 already bound', 'Reload without valid config'],
  postgresql: ['Connection refused or wrong port', 'Wrong database/user', 'SSL mode mismatch'],
  redis: ['AUTH required', 'Wrong host/port', 'OOM or maxmemory policy'],
  maven: ['Wrong JDK version', 'Dependency resolution failure', 'Tests failing the build'],
  default: ['Typos in flags, paths, or resource names', 'Running in the wrong directory or context', 'Missing quotes around arguments with spaces'],
}

export function tokenizeShellCommand(line) {
  if (!line || typeof line !== 'string') return []
  const out = []
  let cur = ''
  let quote = null
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (quote) {
      cur += ch
      if (ch === quote && line[i - 1] !== '\\') quote = null
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      cur += ch
      continue
    }
    if (/\s/.test(ch)) {
      if (cur) {
        out.push(cur)
        cur = ''
      }
      continue
    }
    cur += ch
  }
  if (cur) out.push(cur)
  return out
}

function hintForToken(token) {
  const base = token.replace(/^['"]|['"]$/g, '')
  const key = base.replace(/^-+/, '')
  if (TOKEN_HINTS[base]) return TOKEN_HINTS[base]
  if (TOKEN_HINTS[key]) return TOKEN_HINTS[key]
  if (base.startsWith('-')) return `Flag: ${base}`
  if (/^[./]/.test(base) || base.includes('/')) return 'Path or file reference'
  if (/^[A-Z_][A-Z0-9_]*=?/.test(base)) return 'Environment assignment or variable'
  return 'Part of the command — see docs for this subcommand or argument'
}

/**
 * @param {{ command: string, tool?: string }} command
 * @param {{ stepBreakdown?: { part: string, meaning: string }[] }} extras
 */
export function buildStepBreakdown(command, extras = {}) {
  if (Array.isArray(extras.stepBreakdown) && extras.stepBreakdown.length > 0) {
    return extras.stepBreakdown.map((s, i) => ({
      step: i + 1,
      part: s.part ?? s.token ?? '',
      meaning: s.meaning ?? s.detail ?? '',
    }))
  }
  const tokens = tokenizeShellCommand(command.command)
  if (tokens.length === 0) {
    return [{ step: 1, part: '—', meaning: 'Empty command' }]
  }
  return tokens.map((t, i) => ({
    step: i + 1,
    part: t,
    meaning: hintForToken(t),
  }))
}

export function defaultCommonMistakes(tool, extras = {}) {
  if (Array.isArray(extras.commonMistakes) && extras.commonMistakes.length > 0) {
    return extras.commonMistakes
  }
  const k =
    tool === 'kubernetes' || tool === 'helm'
      ? 'kubernetes'
      : tool === 'shell'
        ? 'shell'
        : tool
  return TOOL_MISTAKES[k] || TOOL_MISTAKES.default
}

/**
 * Lines shown in the fake terminal (strings only).
 * @param {{ command: string }} command
 * @param {{ exampleOutput?: string, simulationLines?: string[] }} extras
 */
export function buildSimulationLines(command, extras = {}) {
  if (Array.isArray(extras.simulationLines) && extras.simulationLines.length > 0) {
    return extras.simulationLines
  }
  const cmd = (command.command || '').trim()
  const out = [`$ ${cmd}`]
  const text = extras.exampleOutput || command.exampleOutput
  if (text && String(text).trim()) {
    const lines = String(text).split('\n')
    for (const line of lines) {
      out.push(line)
    }
  } else {
    out.push('# (simulation) Command finished with exit code 0')
  }
  return out
}

/**
 * @param {string[]} suggestedIds
 * @param {string[]} [extraIds]
 */
export function mergeRelatedIds(suggestedIds = [], extraIds = []) {
  const seen = new Set()
  const out = []
  for (const id of [...suggestedIds, ...extraIds]) {
    if (!id || seen.has(id)) continue
    seen.add(id)
    out.push(id)
  }
  return out
}

/**
 * Ordered command strings for the visual flow strip.
 * @param {{ command: string }} command
 * @param {{ visualFlow?: string[] }} extras
 * @param {Array<{ command?: string }>} relatedCommands
 */
export function buildVisualFlow(command, extras = {}, relatedCommands = []) {
  if (Array.isArray(extras.visualFlow) && extras.visualFlow.length > 0) {
    return extras.visualFlow.map((s) => String(s).trim()).filter(Boolean)
  }
  const primary = (command.command || '').trim()
  const rest = relatedCommands.map((c) => (c.command || '').trim()).filter(Boolean)
  const seen = new Set(primary ? [primary] : [])
  const out = primary ? [primary] : []
  for (const line of rest) {
    if (!line || seen.has(line)) continue
    seen.add(line)
    out.push(line)
    if (out.length >= 4) break
  }
  return out
}

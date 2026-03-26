/**
 * Display order for command categories per tool. Unknown categories sort last, alphabetically.
 */
export const CATEGORY_ORDER = {
  git: [
    'Setup & Config',
    'Repository Initialization',
    'Basic Workflow',
    'Branching',
    'Merging & Rebasing',
    'Stashing',
    'Logs & History',
    'Remote Operations',
    'Tags',
    'Diff & Comparison',
    'Cleaning & Maintenance',
    'Maintenance',
    'Submodules',
    'Patch & Apply',
    'Archive & Bundle',
    'Hooks & Debugging',
    'Sparse Checkout',
    'Advanced / Rare',
    'Plumbing (low-level)',
    'Workflows & Utilities',
  ],
  linux: [
    'Files & navigation',
    'Search & locate',
    'Permissions',
    'Viewing & pagers',
    'Text search & stream editing',
    'Quick utilities',
    'Users & groups',
    'Processes & job control',
    'Memory & performance',
    'Networking',
    'Package management',
    'Disks & filesystems',
    'Archives & compression',
    'System & hardware info',
    'Login & audit',
    'Cron & at',
    'Power & systemd',
    'Shell environment & multiplexers',
    'Shell session & file utilities',
    'Documentation & integrity',
  ],
  aws: [
    'Setup & Identity',
    'S3 Storage',
    'EC2 Compute',
    'EKS & Kubernetes',
    'CloudWatch Logs',
  ],
  helm: [
    'Core',
    'Repositories',
    'Releases',
    'Release Ops',
  ],
  'github-actions': [
    'Setup',
    'Workflows',
    'Runs',
    'Artifacts',
    'Failure Recovery',
  ],
  docker: [
    'Setup & Info',
    'Images',
    'Containers',
    'Volumes',
    'Networks',
    'Docker Compose',
    'Registry & Context',
    'Advanced',
  ],
  terraform: [
    'Core',
    'Workspace',
    'Modules & Dependencies',
    'Import & State',
    'Debug & Misc',
  ],
  ansible: [
    'Core',
    'Ad-hoc',
    'Playbook',
    'Inventory',
    'Galaxy',
    'Vault',
    'Debug & Config',
  ],
  kubernetes: [
    'Cluster Info',
    'Resources',
    'Create / Apply',
    'Delete',
    'Logs & Exec',
    'Scaling & Deployment',
    'Debug',
    'Advanced',
  ],
  nginx: [
    'Config and control',
    'Service (systemd)',
    'Logs and debug',
    'Proxy and upstream',
    'Performance and limits',
    'Observability',
    'TLS (Certbot)',
  ],
  apache: [
    'Config and control',
    'Service (systemd)',
    'Modules and sites',
    'Auth and TLS',
    'Logs and debug',
    'Performance and tuning',
  ],
  tomcat: ['Lifecycle', 'Deploy', 'Logs and debug', 'JVM and tuning', 'Troubleshooting', 'Config'],
  prometheus: ['Prometheus CLI', 'TSDB and ops', 'Runtime', 'Scraping', 'Kubernetes', 'Alertmanager'],
  grafana: ['grafana-cli', 'Admin', 'Service', 'Config', 'HTTP API', 'Containers'],
  haproxy: ['Config & reload', 'Runtime API', 'Patterns', 'Health checks'],
  postgresql: [
    'Connection & session',
    'Meta-commands',
    'Query & performance',
    'Backup & restore',
    'Maintenance',
    'Monitoring',
  ],
  redis: ['Basics', 'Info & memory', 'Keys', 'Danger zone', 'Monitoring', 'Persistence'],
}

const TOOL_ORDER = [
  'git',
  'linux',
  'nginx',
  'apache',
  'haproxy',
  'tomcat',
  'postgresql',
  'redis',
  'docker',
  'kubernetes',
  'helm',
  'terraform',
  'ansible',
  'aws',
  'prometheus',
  'grafana',
  'github-actions',
  'maven',
  'shell',
]

export function compareTools(a, b) {
  const ia = TOOL_ORDER.indexOf(a)
  const ib = TOOL_ORDER.indexOf(b)
  if (ia === -1 && ib === -1) return a.localeCompare(b)
  if (ia === -1) return 1
  if (ib === -1) return -1
  return ia - ib || a.localeCompare(b)
}

export function compareCategories(tool, catA, catB) {
  const order = CATEGORY_ORDER[tool]
  if (!order) return catA.localeCompare(catB)
  const ia = order.indexOf(catA)
  const ib = order.indexOf(catB)
  if (ia === -1 && ib === -1) return catA.localeCompare(catB)
  if (ia === -1) return 1
  if (ib === -1) return -1
  return ia - ib || catA.localeCompare(catB)
}

/**
 * @param {Array<{ tool: string, category?: string }>} commands
 * @returns {Array<{ tool: string, category: string, count: number }>}
 */
export function orderedCategorySummaries(commands) {
  const map = new Map()
  for (const c of commands) {
    if (!c.category) continue
    const key = `${c.tool}\0${c.category}`
    map.set(key, (map.get(key) || 0) + 1)
  }
  const rows = [...map.entries()].map(([key, count]) => {
    const [tool, category] = key.split('\0')
    return { tool, category, count }
  })
  rows.sort((a, b) => compareTools(a.tool, b.tool) || compareCategories(a.tool, a.category, b.category))
  return rows
}

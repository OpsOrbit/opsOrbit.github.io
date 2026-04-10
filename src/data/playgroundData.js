/** @typedef {'kubernetes' | 'docker' | 'git' | 'terraform'} PlaygroundTabId */

export const PLAYGROUND_TAB_IDS = new Set(['kubernetes', 'docker', 'git', 'terraform'])

/** @type {{ id: PlaygroundTabId, label: string, icon: string }[]} */
export const PLAYGROUND_TABS = [
  { id: 'kubernetes', label: 'Kubernetes', icon: '☸' },
  { id: 'docker', label: 'Docker', icon: '🐳' },
  { id: 'git', label: 'Git', icon: '⎇' },
  { id: 'terraform', label: 'Terraform', icon: '▥' },
]

/**
 * @type {Array<{
 *   id: string
 *   tab: PlaygroundTabId
 *   canonical: string
 *   output: string
 *   explain: string
 * }>}
 */
export const PLAYGROUND_SIMULATIONS = [
  {
    id: 'kubectl-get-pods',
    tab: 'kubernetes',
    canonical: 'kubectl get pods',
    output: `NAME                          READY   STATUS    RESTARTS   AGE
api-deployment-7d4b8c9f-xk2jz   1/1     Running   0          3d1h
worker-9ffc7d6b-qp9lm           1/1     Running   1          12h
redis-cache-0                   1/1     Running   0          8d`,
    explain:
      'This lists Pod resources in the current namespace (default unless you pass `-n`). READY shows how many containers in the Pod are ready vs requested. STATUS Running means the Pod was scheduled and containers passed startup; Restarts counts crash loops. AGE is time since object creation — useful to spot brand-new rollouts vs stale workloads.',
  },
  {
    id: 'docker-ps',
    tab: 'docker',
    canonical: 'docker ps',
    output: `CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS          PORTS                    NAMES
a1b2c3d4e5f6   nginx:1.25-alpine     "/docker-entrypoint.…"   2 hours ago    Up 2 hours      0.0.0.0:8080->80/tcp     web-frontend
f6e5d4c3b2a1   redis:7-alpine        "docker-entrypoint.s…"   26 hours ago   Up 26 hours     6379/tcp                 app-redis`,
    explain:
      '`docker ps` shows running containers on this (simulated) host. IMAGE is the pulled image, PORTS maps host→container ports, NAMES is the human-friendly label. Stopped containers are hidden unless you add `-a`. This is the first command people use to verify a compose stack or Kubernetes node agent is actually running workloads.',
  },
  {
    id: 'git-status',
    tab: 'git',
    canonical: 'git status',
    output: `On branch feature/auth-oauth
Your branch is ahead of 'origin/feature/auth-oauth' by 2 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/auth/providers.ts
	modified:   package-lock.json

no changes added to commit (use "git add" and/or "git commit -a")`,
    explain:
      'Git reports your current branch, tracking relationship to `origin`, and whether you have unpushed commits. “Changes not staged” means the working tree differs from the index — you need `git add` before commit. Untracked files would appear in a separate section. This output is what you paste in PR descriptions or when debugging “why is my deploy missing files”.',
  },
  {
    id: 'terraform-plan',
    tab: 'terraform',
    canonical: 'terraform plan',
    output: `Terraform used the selected workspace to select the workspace "default".

aws_instance.app: Refreshing state... [id=i-0abc123def456789]
aws_security_group.web: Refreshing state... [id=sg-0123456789abcdef0]

Terraform will perform the following actions:

  # aws_instance.app will be updated in-place
  ~ resource "aws_instance" "app" {
      ~ instance_type = "t3.small" -> "t3.medium"
        tags          = {
            "Name" = "app-server"
        }
        # (5 unchanged attributes hidden)
    }

Plan: 1 to change, 0 to add, 0 to destroy.`,
    explain:
      '`terraform plan` is a dry-run: it compares desired state (your `.tf` files) with real infrastructure and prints a diff. `~` means update in-place, `+` create, `-` destroy. Here the instance type would change on apply. Always review this output in CI or locally before `terraform apply` — it is the main guardrail against accidental deletes.',
  },
]

export function normalizePlaygroundInput(s) {
  return String(s || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

/**
 * @param {string} raw
 * @param {PlaygroundTabId} tabId
 */
export function findPlaygroundSimulation(raw, tabId) {
  const n = normalizePlaygroundInput(raw)
  if (!n) return { kind: 'empty' }

  const match = PLAYGROUND_SIMULATIONS.find((sim) => sim.canonical === n)
  if (!match) return { kind: 'unknown', normalized: n }

  if (match.tab !== tabId) {
    const tabLabel = PLAYGROUND_TABS.find((t) => t.id === match.tab)?.label || match.tab
    return {
      kind: 'wrongTab',
      message: `That command is simulated under the ${tabLabel} tab. Switch tabs or type the command for this environment.`,
    }
  }

  return { kind: 'ok', simulation: match }
}

/** Suggest strings for the active tab (for autocomplete UI). */
export function suggestionsForTab(tabId) {
  return PLAYGROUND_SIMULATIONS.filter((s) => s.tab === tabId).map((s) => s.canonical)
}

/**
 * Quick-reference commands for the Cheatsheets workspace.
 * @typedef {{ cmd: string, desc: string, important?: boolean }} CheatsheetRow
 * @typedef {{ title: string, rows: CheatsheetRow[] }} CheatsheetSection
 * @typedef {{ id: 'git' | 'docker' | 'kubernetes' | 'linux', label: string, icon: string, sections: CheatsheetSection[] }} CheatsheetTab
 */

/** @type {Set<string>} */
export const CHEATSHEET_TAB_IDS = new Set(['git', 'docker', 'kubernetes', 'linux'])

/** @type {CheatsheetTab['id'][]} */
export const CHEATSHEET_TAB_ORDER = ['git', 'docker', 'kubernetes', 'linux']

/** @type {CheatsheetTab[]} */
export const CHEATSHEET_TABS = [
  {
    id: 'git',
    label: 'Git',
    icon: '⎇',
    sections: [
      {
        title: 'Daily workflow',
        rows: [
          { cmd: 'git status', desc: 'Show working tree and staged changes', important: true },
          { cmd: 'git add -p', desc: 'Stage interactively (hunks)', important: true },
          { cmd: 'git commit -m "msg"', desc: 'Create a commit with message', important: true },
          { cmd: 'git push -u origin main', desc: 'Push and set upstream', important: true },
          { cmd: 'git pull --rebase', desc: 'Fetch and replay local commits on top', important: true },
          { cmd: 'git diff', desc: 'Unstaged changes vs index', important: false },
          { cmd: 'git diff --staged', desc: 'Staged changes vs last commit', important: false },
        ],
      },
      {
        title: 'Branches & merge',
        rows: [
          { cmd: 'git branch -a', desc: 'List local and remote branches', important: true },
          { cmd: 'git checkout -b feature/x', desc: 'Create and switch branch', important: true },
          { cmd: 'git switch main', desc: 'Switch branch (modern)', important: false },
          { cmd: 'git merge --no-ff feature/x', desc: 'Merge preserving branch history', important: false },
          { cmd: 'git rebase main', desc: 'Replay current branch onto main', important: true },
        ],
      },
      {
        title: 'Remotes & sync',
        rows: [
          { cmd: 'git remote -v', desc: 'Show remote URLs', important: false },
          { cmd: 'git fetch --all --prune', desc: 'Update refs and drop stale remotes', important: true },
          { cmd: 'git push origin :old-branch', desc: 'Delete remote branch', important: false },
        ],
      },
      {
        title: 'History & inspect',
        rows: [
          { cmd: 'git log --oneline -n 20', desc: 'Compact recent history', important: true },
          { cmd: 'git show HEAD~1', desc: 'Patch and metadata for prior commit', important: false },
          { cmd: 'git blame -L 10,40 path', desc: 'Line-by-line last change', important: true },
          { cmd: 'git stash push -m "wip"', desc: 'Save WIP including message', important: true },
          { cmd: 'git stash pop', desc: 'Apply and drop latest stash', important: false },
        ],
      },
    ],
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: '🐳',
    sections: [
      {
        title: 'Images & build',
        rows: [
          { cmd: 'docker build -t myapp:1 .', desc: 'Build image from Dockerfile', important: true },
          { cmd: 'docker images', desc: 'List local images', important: true },
          { cmd: 'docker rmi $(docker images -f dangling=true -q)', desc: 'Remove dangling images', important: false },
          { cmd: 'docker scan myapp:1', desc: 'Image vulnerability scan (CLI plugin)', important: false },
        ],
      },
      {
        title: 'Containers',
        rows: [
          { cmd: 'docker ps -a', desc: 'All containers', important: true },
          { cmd: 'docker run -d -p 8080:80 --name web nginx', desc: 'Detached port-mapped container', important: true },
          { cmd: 'docker logs -f --tail 100 web', desc: 'Follow recent logs', important: true },
          { cmd: 'docker exec -it web sh', desc: 'Shell inside running container', important: true },
          { cmd: 'docker stats', desc: 'Live CPU/mem usage', important: false },
          { cmd: 'docker rm -f web', desc: 'Force remove container', important: false },
        ],
      },
      {
        title: 'Volumes & networks',
        rows: [
          { cmd: 'docker volume ls', desc: 'List volumes', important: false },
          { cmd: 'docker network ls', desc: 'List networks', important: false },
          { cmd: 'docker compose up -d', desc: 'Start stack in background', important: true },
          { cmd: 'docker compose down -v', desc: 'Stop and remove volumes', important: true },
        ],
      },
      {
        title: 'Registry',
        rows: [
          { cmd: 'docker login registry.io', desc: 'Authenticate to registry', important: true },
          { cmd: 'docker push myrepo/myapp:1', desc: 'Push image tag', important: true },
          { cmd: 'docker pull alpine:3.20', desc: 'Pull image', important: false },
        ],
      },
    ],
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    icon: '☸',
    sections: [
      {
        title: 'Context & config',
        rows: [
          { cmd: 'kubectl config current-context', desc: 'Active cluster context', important: true },
          { cmd: 'kubectl config use-context prod', desc: 'Switch context', important: true },
          { cmd: 'kubectl cluster-info', desc: 'API server endpoints', important: false },
        ],
      },
      {
        title: 'Pods & workloads',
        rows: [
          { cmd: 'kubectl get pods -A', desc: 'Pods in all namespaces', important: true },
          { cmd: 'kubectl describe pod NAME -n ns', desc: 'Events and spec details', important: true },
          { cmd: 'kubectl logs -f deploy/api -n ns', desc: 'Follow deployment pod logs', important: true },
          { cmd: 'kubectl apply -f manifest.yaml', desc: 'Create/update from manifest', important: true },
          { cmd: 'kubectl delete pod NAME --grace-period=0 --force', desc: 'Hard delete stuck pod', important: false },
        ],
      },
      {
        title: 'Deployments & rollouts',
        rows: [
          { cmd: 'kubectl rollout status deploy/api', desc: 'Wait for rollout', important: true },
          { cmd: 'kubectl rollout undo deploy/api', desc: 'Rollback previous revision', important: true },
          { cmd: 'kubectl set image deploy/api *=myimg:v2', desc: 'Trigger rolling update', important: true },
        ],
      },
      {
        title: 'Services & ingress',
        rows: [
          { cmd: 'kubectl get svc -A', desc: 'List services', important: false },
          { cmd: 'kubectl port-forward svc/api 8080:80', desc: 'Local tunnel to service', important: true },
          { cmd: 'kubectl get ingress -A', desc: 'Ingress rules', important: false },
        ],
      },
      {
        title: 'Debugging',
        rows: [
          { cmd: 'kubectl exec -it POD -n ns -- sh', desc: 'Shell in pod', important: true },
          { cmd: 'kubectl cp ns/POD:/tmp/x ./x', desc: 'Copy file from pod', important: false },
          { cmd: 'kubectl top pods -A', desc: 'CPU/memory (metrics-server)', important: true },
        ],
      },
    ],
  },
  {
    id: 'linux',
    label: 'Linux',
    icon: '🐧',
    sections: [
      {
        title: 'Files & navigation',
        rows: [
          { cmd: 'ls -la', desc: 'Long listing with hidden', important: true },
          { cmd: 'cd -', desc: 'Previous directory', important: false },
          { cmd: 'find . -name "*.log" -mtime -1', desc: 'Recent log files', important: true },
          { cmd: 'du -sh * | sort -h', desc: 'Directory sizes sorted', important: true },
        ],
      },
      {
        title: 'Permissions',
        rows: [
          { cmd: 'chmod +x script.sh', desc: 'Make executable', important: true },
          { cmd: 'chown user:group file', desc: 'Change owner', important: false },
          { cmd: 'umask 027', desc: 'Default file mode mask', important: false },
        ],
      },
      {
        title: 'Processes',
        rows: [
          { cmd: 'ps aux | head', desc: 'Process list snapshot', important: true },
          { cmd: 'top', desc: 'Interactive process viewer', important: false },
          { cmd: 'kill -15 PID', desc: 'Graceful SIGTERM', important: true },
          { cmd: 'systemctl status nginx', desc: 'Service state (systemd)', important: true },
          { cmd: 'journalctl -u nginx -f', desc: 'Follow unit logs', important: true },
        ],
      },
      {
        title: 'Networking',
        rows: [
          { cmd: 'ss -tlnp', desc: 'Listening TCP ports + process', important: true },
          { cmd: 'curl -I https://example.com', desc: 'HTTP headers only', important: true },
          { cmd: 'dig +short example.com', desc: 'DNS resolution', important: false },
          { cmd: 'ip addr', desc: 'Interface addresses', important: false },
        ],
      },
      {
        title: 'Text & search',
        rows: [
          { cmd: 'grep -R "error" /var/log --include="*.log"', desc: 'Recursive grep with filter', important: true },
          { cmd: 'sed -i "s/old/new/g" file', desc: 'In-place replace', important: false },
          { cmd: 'awk "{print $1}" file', desc: 'First column', important: false },
          { cmd: 'tail -f /var/log/syslog', desc: 'Follow log file', important: true },
        ],
      },
      {
        title: 'System info',
        rows: [
          { cmd: 'uname -a', desc: 'Kernel and arch', important: false },
          { cmd: 'df -h', desc: 'Disk space', important: true },
          { cmd: 'free -h', desc: 'Memory summary', important: true },
          { cmd: 'uptime', desc: 'Load averages', important: false },
        ],
      },
    ],
  },
]

/**
 * @param {string} tabId
 * @param {string} query
 * @returns {{ id: string, label: string, icon: string, sections: CheatsheetSection[] }}
 */
export function getFilteredCheatsheetContent(tabId, query) {
  const tab = CHEATSHEET_TABS.find((t) => t.id === tabId)
  if (!tab) return { id: tabId, label: '', icon: '', sections: [] }
  const q = query.trim().toLowerCase()
  if (!q) {
    return { id: tab.id, label: tab.label, icon: tab.icon, sections: tab.sections }
  }
  const sections = tab.sections
    .map((sec) => ({
      ...sec,
      rows: sec.rows.filter((row) => {
        const d = (row.desc || '').toLowerCase()
        return (
          row.cmd.toLowerCase().includes(q) ||
          d.includes(q) ||
          sec.title.toLowerCase().includes(q)
        )
      }),
    }))
    .filter((sec) => sec.rows.length > 0)
  return { id: tab.id, label: tab.label, icon: tab.icon, sections }
}

/**
 * @param {string} tabId
 * @param {string} query
 */
export function countCheatsheetRows(tabId, query) {
  const { sections } = getFilteredCheatsheetContent(tabId, query)
  return sections.reduce((n, s) => n + s.rows.length, 0)
}

/**
 * Helm command reference — chart lifecycle, release management, and troubleshooting.
 */
export const HELM_COMMANDS = [
  {
    id: 'helm-version',
    tool: 'helm',
    category: 'Core',
    level: 'beginner',
    name: 'Check Helm version',
    command: 'helm version',
    description: 'Print local Helm client version information.',
    explanation: 'Use before debugging chart compatibility issues.'
  },
  {
    id: 'helm-repo-add',
    tool: 'helm',
    category: 'Repositories',
    level: 'beginner',
    name: 'Add chart repository',
    command: 'helm repo add bitnami https://charts.bitnami.com/bitnami',
    description: 'Add a remote chart repository by name.',
    explanation: 'Run helm repo update after adding repositories.'
  },
  {
    id: 'helm-repo-update',
    tool: 'helm',
    category: 'Repositories',
    level: 'beginner',
    name: 'Update repo index',
    command: 'helm repo update',
    description: 'Refresh chart metadata for all configured repositories.',
    explanation: 'Needed before searching/installing latest chart versions.'
  },
  {
    id: 'helm-search-repo',
    tool: 'helm',
    category: 'Repositories',
    level: 'intermediate',
    name: 'Search available charts',
    command: 'helm search repo nginx',
    description: 'Search chart names and descriptions across configured repos.',
    explanation: 'Use --versions to list all available versions.'
  },
  {
    id: 'helm-install',
    tool: 'helm',
    category: 'Releases',
    level: 'beginner',
    name: 'Install chart release',
    command: 'helm install my-nginx bitnami/nginx -n web --create-namespace',
    description: 'Install a chart as a named release into a namespace.',
    explanation: 'Release name identifies this deployment for upgrades/rollback.'
  },
  {
    id: 'helm-upgrade-install',
    tool: 'helm',
    category: 'Releases',
    level: 'intermediate',
    name: 'Upgrade or install release',
    command: 'helm upgrade --install my-nginx bitnami/nginx -n web -f values.yaml',
    description: 'Idempotent deploy command used in CI/CD pipelines.',
    explanation: 'Creates release if missing, otherwise upgrades in place.'
  },
  {
    id: 'helm-list',
    tool: 'helm',
    category: 'Releases',
    level: 'beginner',
    name: 'List releases',
    command: 'helm list -A',
    description: 'List releases across namespaces.',
    explanation: 'Add -n namespace to focus on one environment.'
  },
  {
    id: 'helm-history',
    tool: 'helm',
    category: 'Release Ops',
    level: 'advanced',
    name: 'Release history',
    command: 'helm history my-nginx -n web',
    description: 'Show release revisions and deployment status history.',
    explanation: 'Required before choosing a rollback revision.'
  },
  {
    id: 'helm-rollback',
    tool: 'helm',
    category: 'Release Ops',
    level: 'advanced',
    name: 'Rollback release',
    command: 'helm rollback my-nginx 2 -n web',
    description: 'Rollback a release to a previous revision.',
    explanation: 'Common incident response command after failed upgrade.'
  },
  {
    id: 'helm-uninstall',
    tool: 'helm',
    category: 'Release Ops',
    level: 'intermediate',
    name: 'Remove release',
    command: 'helm uninstall my-nginx -n web',
    description: 'Delete a Helm release and managed resources.',
    explanation: 'Use during cleanup of ephemeral or test environments.'
  },
]

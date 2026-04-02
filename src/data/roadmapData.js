/**
 * Site-aligned learning modules: Commands + Scripting links in `rows`.
 * `nextModuleId` suggests path order; all modules are always accessible.
 * `xpReward` is granted when the learner marks the module complete.
 */
export const ROADMAP_FLOW_STEPS = [
  {
    id: 'foundation',
    mainTitle: 'Linux & shell',
    panelTitle: 'Foundation',
    level: 'foundation',
    track: 'beginner',
    xpReward: 100,
    topics: ['Linux CLI', 'Shell', 'Bash & scripting', 'Permissions & files'],
    nextModuleId: 'git-ci',
    rows: [
      {
        text: 'Comfort on the command line and shell scripting — baseline for everything else on the hub.',
        links: [
          { type: 'commands', tool: 'linux', label: 'Linux commands' },
          { type: 'commands', tool: 'shell', label: 'Shell commands' },
          { type: 'scripting', topic: 'bash-devops', label: 'Bash (DevOps) guide' },
        ],
      },
    ],
  },
  {
    id: 'git-ci',
    mainTitle: 'Git & CI',
    panelTitle: 'Version control & CI',
    level: 'foundation',
    track: 'beginner',
    xpReward: 100,
    topics: ['Git workflow', 'CI pipelines', 'GitHub Actions YAML'],
    nextModuleId: 'containers',
    rows: [
      {
        text:
          'Track changes with Git; run automated builds and tests with CI tooling covered here. **DevOps Tools** adds encyclopedia pages for SCM and CI/CD (what/when/why, licenses, alternatives, cloud-native picks) — use the Tools links below with Commands and LAB.',
        links: [
          { type: 'commands', tool: 'git', label: 'Git commands' },
          { type: 'commands', tool: 'github-actions', label: 'Jenkins / CI commands' },
          { type: 'scripting', topic: 'github-actions', label: 'GitHub Actions workflow' },
          { type: 'tools', category: 'scm', label: 'Tools: SCM' },
          { type: 'tools', category: 'cicd', label: 'Tools: CI/CD' },
          { type: 'tools', category: 'build', label: 'Tools: Build' },
        ],
      },
    ],
  },
  {
    id: 'containers',
    mainTitle: 'Containers',
    panelTitle: 'Images & compose',
    level: 'core',
    track: 'intermediate',
    xpReward: 125,
    topics: ['Docker CLI', 'Dockerfile', 'Docker Compose', 'Images & layers'],
    nextModuleId: 'orchestration',
    rows: [
      {
        text: 'Build and run containers locally; express multi-service stacks as code.',
        links: [
          { type: 'commands', tool: 'docker', label: 'Docker CLI' },
          { type: 'scripting', topic: 'dockerfile', label: 'Dockerfile guide' },
          { type: 'scripting', topic: 'docker-compose', label: 'Docker Compose' },
        ],
      },
    ],
  },
  {
    id: 'orchestration',
    mainTitle: 'Kubernetes & Helm',
    panelTitle: 'Orchestration',
    level: 'core',
    track: 'intermediate',
    xpReward: 125,
    topics: ['kubectl', 'Helm', 'Manifests', 'Charts'],
    nextModuleId: 'iac',
    rows: [
      {
        text: 'Deploy workloads on clusters and package apps as Helm charts.',
        links: [
          { type: 'commands', tool: 'kubernetes', label: 'Kubernetes CLI' },
          { type: 'commands', tool: 'helm', label: 'Helm CLI' },
          { type: 'scripting', topic: 'kubernetes-manifest', label: 'K8s manifest guide' },
          { type: 'scripting', topic: 'helm-chart', label: 'Helm chart guide' },
        ],
      },
    ],
  },
  {
    id: 'iac',
    mainTitle: 'Infrastructure as code',
    panelTitle: 'Terraform & Ansible',
    level: 'core',
    track: 'intermediate',
    xpReward: 125,
    topics: ['Terraform', 'Ansible', 'Modules', 'Playbooks & roles'],
    nextModuleId: 'cicd-code',
    rows: [
      {
        text: 'Provision cloud resources and configure servers declaratively.',
        links: [
          { type: 'commands', tool: 'terraform', label: 'Terraform CLI' },
          { type: 'commands', tool: 'ansible', label: 'Ansible CLI' },
          { type: 'scripting', topic: 'terraform', label: 'Terraform (.tf) guide' },
          { type: 'scripting', topic: 'ansible-playbook', label: 'Ansible playbook' },
          { type: 'scripting', topic: 'ansible-role', label: 'Ansible role' },
        ],
      },
    ],
  },
  {
    id: 'cicd-code',
    mainTitle: 'Pipelines as code',
    panelTitle: 'Jenkins & GitLab',
    level: 'core',
    track: 'intermediate',
    xpReward: 125,
    topics: ['Jenkinsfile', 'GitLab CI', 'Pipeline design'],
    nextModuleId: 'cloud',
    rows: [
      {
        text: 'Define pipelines in repos — Jenkinsfiles, GitLab CI, and GitHub Actions YAML (see also Git & CI step).',
        links: [
          { type: 'scripting', topic: 'jenkinsfile', label: 'Jenkinsfile' },
          { type: 'scripting', topic: 'gitlab-ci', label: 'GitLab CI' },
          { type: 'scripting', topic: 'github-actions', label: 'GitHub Actions' },
        ],
      },
    ],
  },
  {
    id: 'cloud',
    mainTitle: 'Cloud CLIs',
    panelTitle: 'AWS · Azure · GCP',
    level: 'platform',
    track: 'intermediate',
    xpReward: 125,
    topics: ['AWS CLI', 'Azure CLI', 'gcloud', 'IAM basics'],
    nextModuleId: 'platform',
    rows: [
      {
        text: 'Official CLIs for the three major clouds — all browsable by category in Commands.',
        links: [
          { type: 'commands', tool: 'aws', label: 'AWS CLI' },
          { type: 'commands', tool: 'azure', label: 'Azure CLI' },
          { type: 'commands', tool: 'gcp', label: 'Google Cloud CLI' },
        ],
      },
    ],
  },
  {
    id: 'platform',
    mainTitle: 'Web, data & proxies',
    panelTitle: 'Platform stack',
    level: 'platform',
    track: 'advanced',
    xpReward: 150,
    topics: ['Nginx', 'Apache', 'Databases', 'HAProxy', 'Redis'],
    nextModuleId: 'observe-build',
    rows: [
      {
        text: 'Front-door web servers, Java apps, proxies, databases, and caches.',
        links: [
          { type: 'commands', tool: 'nginx', label: 'Nginx' },
          { type: 'commands', tool: 'apache', label: 'Apache' },
          { type: 'commands', tool: 'tomcat', label: 'Tomcat' },
          { type: 'commands', tool: 'haproxy', label: 'HAProxy' },
          { type: 'commands', tool: 'postgresql', label: 'PostgreSQL' },
          { type: 'commands', tool: 'redis', label: 'Redis' },
        ],
      },
    ],
  },
  {
    id: 'observe-build',
    mainTitle: 'Observability & build',
    panelTitle: 'Metrics & Maven',
    level: 'platform',
    track: 'advanced',
    xpReward: 150,
    topics: ['Prometheus', 'Grafana', 'Maven', 'Metrics'],
    nextModuleId: 'glue',
    rows: [
      {
        text: 'Metrics, dashboards, and Java builds — common in mature delivery pipelines.',
        links: [
          { type: 'commands', tool: 'prometheus', label: 'Prometheus' },
          { type: 'commands', tool: 'grafana', label: 'Grafana' },
          { type: 'commands', tool: 'maven', label: 'Maven' },
        ],
      },
    ],
  },
  {
    id: 'glue',
    mainTitle: 'Automation glue',
    panelTitle: 'Make & all tools',
    level: 'platform',
    track: 'advanced',
    xpReward: 150,
    topics: ['Make', 'Cross-tool search', 'Automation'],
    nextModuleId: null,
    rows: [
      {
        text: 'Wrap repetitive tasks in Makefiles; use **All tools** in Commands to search across every CLI at once.',
        links: [
          { type: 'scripting', topic: 'makefile-devops', label: 'Makefile (DevOps)' },
          { type: 'commands', tool: 'all', label: 'All commands (hub home)' },
        ],
      },
    ],
  },
]

/** Ordered module ids (path order for “next” / resume hints). */
export const ROADMAP_MODULE_IDS = ROADMAP_FLOW_STEPS.map((s) => s.id)

/** Fallback XP if a step omits `xpReward`. */
export const ROADMAP_XP_PER_MODULE = 120

export function getRoadmapModuleXp(moduleId) {
  const step = ROADMAP_FLOW_STEPS.find((s) => s.id === moduleId)
  return typeof step?.xpReward === 'number' ? step.xpReward : ROADMAP_XP_PER_MODULE
}

export const ROADMAP_FINAL_ORDER = [
  'Foundation (Linux / shell / Bash) → Git & CI entrypoints',
  'Containers (Docker + Dockerfile / Compose) → Kubernetes + Helm (+ guides)',
  'Terraform & Ansible (+ playbook / role guides) → Pipelines as code (Jenkins / GitLab / Actions)',
  'Cloud CLIs (AWS, Azure, GCP) → Web / data / proxies → Observability & Maven → Make + cross-tool search',
]

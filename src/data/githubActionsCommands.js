/**
 * Unified CI command reference under "Jenkins / CI".
 * Includes Jenkins CLI/API, GitLab CI, and GitHub CLI CI commands.
 */
export const GITHUB_ACTIONS_COMMANDS = [
  {
    id: 'ci-jenkins-build',
    tool: 'github-actions',
    category: 'Jenkins',
    level: 'beginner',
    name: 'Trigger Jenkins build',
    command: 'java -jar jenkins-cli.jar -s http://jenkins.local:8080/ build my-job',
    description: 'Start a Jenkins job from the terminal.',
    explanation: 'Add -p KEY=VALUE to pass build parameters.'
  },
  {
    id: 'ci-jenkins-build-params',
    tool: 'github-actions',
    category: 'Jenkins',
    level: 'intermediate',
    name: 'Trigger parameterized build',
    command: 'java -jar jenkins-cli.jar -s http://jenkins.local:8080/ build my-job -p BRANCH=main -p ENV=staging',
    description: 'Run Jenkins pipeline with explicit parameters.',
    explanation: 'Useful when the pipeline reads BRANCH or ENV inputs.'
  },
  {
    id: 'ci-jenkins-console',
    tool: 'github-actions',
    category: 'Jenkins',
    level: 'intermediate',
    name: 'Read Jenkins build logs',
    command: 'java -jar jenkins-cli.jar -s http://jenkins.local:8080/ console my-job 125',
    description: 'Print console logs for a specific Jenkins build number.',
    explanation: 'Add -f to follow log output in real time.'
  },
  {
    id: 'ci-jenkins-list-jobs',
    tool: 'github-actions',
    category: 'Jenkins',
    level: 'beginner',
    name: 'List Jenkins jobs',
    command: 'java -jar jenkins-cli.jar -s http://jenkins.local:8080/ list-jobs',
    description: 'List available jobs on the Jenkins server.',
    explanation: 'Good first step when validating job names.'
  },
  {
    id: 'ci-gitlab-auth',
    tool: 'github-actions',
    category: 'GitLab CI',
    level: 'beginner',
    name: 'Authenticate GitLab CLI',
    command: 'glab auth login',
    description: 'Authenticate glab before running pipeline commands.',
    explanation: 'Use GitLab.com or self-managed host during login.'
  },
  {
    id: 'ci-gitlab-pipeline-list',
    tool: 'github-actions',
    category: 'GitLab CI',
    level: 'beginner',
    name: 'List GitLab pipelines',
    command: 'glab ci list --per-page 20',
    description: 'Show recent GitLab CI pipelines and their status.',
    explanation: 'Run inside a GitLab project directory.'
  },
  {
    id: 'ci-gitlab-pipeline-run',
    tool: 'github-actions',
    category: 'GitLab CI',
    level: 'intermediate',
    name: 'Run GitLab pipeline',
    command: 'glab pipeline run --ref main',
    description: 'Trigger a new GitLab pipeline for a branch/ref.',
    explanation: 'Use --variables KEY=VALUE to pass CI variables.'
  },
  {
    id: 'ci-gitlab-job-trace',
    tool: 'github-actions',
    category: 'GitLab CI',
    level: 'advanced',
    name: 'View GitLab job log',
    command: 'glab ci trace 456789',
    description: 'Stream or fetch logs for a specific GitLab job.',
    explanation: 'Great for quick failure diagnostics.'
  },
  {
    id: 'ci-gitlab-pipeline-cancel',
    tool: 'github-actions',
    category: 'GitLab CI',
    level: 'advanced',
    name: 'Cancel GitLab pipeline',
    command: 'glab pipeline cancel 123456',
    description: 'Cancel an in-progress GitLab pipeline.',
    explanation: 'Use when a newer commit supersedes the running job.'
  },
  {
    id: 'ci-gh-auth-login',
    tool: 'github-actions',
    category: 'GitHub CLI CI',
    level: 'beginner',
    name: 'Authenticate GitHub CLI',
    command: 'gh auth login',
    description: 'Authenticate gh so CI workflow commands can access the repo.',
    explanation: 'Choose HTTPS and browser/device auth flow.'
  },
  {
    id: 'ci-gh-workflow-list',
    tool: 'github-actions',
    category: 'GitHub CLI CI',
    level: 'beginner',
    name: 'List GitHub workflows',
    command: 'gh workflow list',
    description: 'Show workflows configured in the current repository.',
    explanation: 'Use this to confirm workflow names and IDs.'
  },
  {
    id: 'ci-gh-workflow-run',
    tool: 'github-actions',
    category: 'GitHub CLI CI',
    level: 'intermediate',
    name: 'Run GitHub workflow',
    command: 'gh workflow run ci.yml --ref main',
    description: 'Trigger a workflow_dispatch workflow run.',
    explanation: 'Use --field key=value for workflow inputs.'
  },
  {
    id: 'ci-gh-run-list',
    tool: 'github-actions',
    category: 'GitHub CLI CI',
    level: 'beginner',
    name: 'List GitHub runs',
    command: 'gh run list --limit 20',
    description: 'Show recent workflow runs and statuses.',
    explanation: 'Add --workflow name.yml to filter by workflow.'
  },
  {
    id: 'ci-gh-run-view',
    tool: 'github-actions',
    category: 'GitHub CLI CI',
    level: 'intermediate',
    name: 'View GitHub run summary',
    command: 'gh run view 1234567890',
    description: 'Open run details including jobs and status.',
    explanation: 'Use --log to print logs in terminal.'
  },
  {
    id: 'ci-gh-run-rerun-failed',
    tool: 'github-actions',
    category: 'GitHub CLI CI',
    level: 'advanced',
    name: 'Re-run failed GitHub jobs',
    command: 'gh run rerun 1234567890 --failed',
    description: 'Retry only failed jobs from a workflow run.',
    explanation: 'Faster than rerunning the whole workflow.'
  },
]

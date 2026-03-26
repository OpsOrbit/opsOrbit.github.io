/**
 * GitHub Actions command reference using gh CLI for workflow and run operations.
 */
export const GITHUB_ACTIONS_COMMANDS = [
  {
    id: 'gha-auth-login',
    tool: 'github-actions',
    category: 'Setup',
    level: 'beginner',
    name: 'Authenticate gh CLI',
    command: 'gh auth login',
    description: 'Authenticate gh CLI so workflow commands can access your repository.',
    explanation: 'Choose HTTPS and browser/device auth flow.'
  },
  {
    id: 'gha-workflow-list',
    tool: 'github-actions',
    category: 'Workflows',
    level: 'beginner',
    name: 'List workflows',
    command: 'gh workflow list',
    description: 'Show workflows configured in the current repository.',
    explanation: 'Use to verify available workflow names/IDs.'
  },
  {
    id: 'gha-workflow-view',
    tool: 'github-actions',
    category: 'Workflows',
    level: 'intermediate',
    name: 'View workflow details',
    command: 'gh workflow view ci.yml',
    description: 'Display workflow metadata and trigger information.',
    explanation: 'Works with workflow file name or numeric workflow ID.'
  },
  {
    id: 'gha-workflow-run',
    tool: 'github-actions',
    category: 'Workflows',
    level: 'intermediate',
    name: 'Manually trigger workflow',
    command: 'gh workflow run ci.yml --ref main',
    description: 'Trigger a workflow_dispatch workflow run.',
    explanation: 'Use --field key=value for input parameters.'
  },
  {
    id: 'gha-run-list',
    tool: 'github-actions',
    category: 'Runs',
    level: 'beginner',
    name: 'List recent runs',
    command: 'gh run list --limit 20',
    description: 'Show recent workflow runs and statuses.',
    explanation: 'Add --workflow name.yml to filter specific workflow.'
  },
  {
    id: 'gha-run-view',
    tool: 'github-actions',
    category: 'Runs',
    level: 'intermediate',
    name: 'View run summary',
    command: 'gh run view 1234567890',
    description: 'Open run details including jobs and status.',
    explanation: 'Use --log to stream run logs in terminal.'
  },
  {
    id: 'gha-run-watch',
    tool: 'github-actions',
    category: 'Runs',
    level: 'intermediate',
    name: 'Watch run live',
    command: 'gh run watch 1234567890',
    description: 'Watch a workflow run until it completes.',
    explanation: 'Ideal for manual deployments and release validations.'
  },
  {
    id: 'gha-run-download',
    tool: 'github-actions',
    category: 'Artifacts',
    level: 'advanced',
    name: 'Download artifacts',
    command: 'gh run download 1234567890 -D ./artifacts',
    description: 'Download all artifacts from a specific run.',
    explanation: 'Useful for build outputs, reports, and diagnostics.'
  },
  {
    id: 'gha-run-rerun',
    tool: 'github-actions',
    category: 'Failure Recovery',
    level: 'advanced',
    name: 'Re-run failed jobs',
    command: 'gh run rerun 1234567890 --failed',
    description: 'Retry only failed jobs from a run.',
    explanation: 'Faster than rerunning entire workflow for flaky failures.'
  },
  {
    id: 'gha-run-cancel',
    tool: 'github-actions',
    category: 'Failure Recovery',
    level: 'advanced',
    name: 'Cancel workflow run',
    command: 'gh run cancel 1234567890',
    description: 'Cancel an in-progress workflow run.',
    explanation: 'Useful when a run is stuck or obsolete after new commits.'
  },
]

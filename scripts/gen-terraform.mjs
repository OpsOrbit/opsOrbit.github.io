import fs from 'fs'

const outPath = new URL('../src/data/terraformCommands.js', import.meta.url).pathname

const LEGACY_IDS = new Map([
  ['terraform init', 'tf-init'],
  ['terraform plan -out=tfplan', 'terraform-plan'],
  ['terraform apply tfplan', 'tf-apply'],
  ['terraform destroy', 'tf-destroy'],
  ['terraform state list', 'tf-state'],
  ['terraform output', 'tf-output'],
  ['terraform validate', 'tf-validate'],
  ['terraform fmt -recursive', 'tf-fmt'],
  ['terraform refresh', 'tf-refresh'],
  ['terraform import resource.address id', 'tf-import'],
  ['terraform workspace list', 'tf-workspace'],
  ['terraform providers', 'tf-providers'],
])

function makeId(cmd) {
  const norm = cmd.trim().replace(/\s+/g, ' ')
  if (LEGACY_IDS.has(norm)) return LEGACY_IDS.get(norm)
  let slug = norm
    .replace(/^terraform\s+/i, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._<>/=-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  let id = `tf-${slug || 'cmd'}`
  if (id.length > 80) id = id.slice(0, 80).replace(/-$/, '')
  return id
}

const rows = []
function add(category, level, name, command, description, explanation) {
  rows.push({ category, level, name, command, description, explanation })
}

/* Core */
add('Core', 'beginner', 'Terraform version', 'terraform version', 'CLI and optional provider versions.', 'Run in CI to pin compatible versions.')
add('Core', 'beginner', 'Help', 'terraform help', 'List commands or subcommand help.', 'Same as <code>terraform -help</code>.')
add('Core', 'beginner', 'Initialize', 'terraform init', 'Download providers and modules; configure backend.', 'Run after clone or provider changes; use <code>-upgrade</code> to bump locks.')
add('Core', 'beginner', 'Validate configuration', 'terraform validate', 'Check configuration is syntactically valid.', 'Requires init; use in CI before plan.')
add('Core', 'beginner', 'Format files', 'terraform fmt -recursive', 'Canonical formatting for .tf files.', 'Use <code>-check</code> in CI for drift detection.')
add('Core', 'beginner', 'Plan changes', 'terraform plan -out=tfplan', 'Show proposed changes; save binary plan.', 'Review carefully; apply the saved file for exact intent.')
add('Core', 'beginner', 'Plan (console)', 'terraform plan', 'Show plan without saving binary file.', 'Good for quick review; apply without file uses fresh evaluation.')
add('Core', 'beginner', 'Apply plan', 'terraform apply tfplan', 'Apply a saved plan file.', 'Safer in automation than apply without plan file.')
add('Core', 'beginner', 'Apply interactive', 'terraform apply', 'Plan and apply in one step (prompts).', 'Use <code>-auto-approve</code> only in trusted automation.')
add('Core', 'intermediate', 'Destroy infrastructure', 'terraform destroy', 'Remove all resources in state.', 'Use <code>-target</code> sparingly for partial teardown.')
add('Core', 'intermediate', 'Refresh state', 'terraform refresh', 'Re-read real infrastructure into state.', 'Often implicit in plan; explicit refresh updates state only.')
add('Core', 'intermediate', 'Show state or plan', 'terraform show', 'Human-readable state or saved plan.', 'Use <code>terraform show tfplan</code> for plan review.')
add('Core', 'advanced', 'Dependency graph', 'terraform graph', 'Emit graphviz dot graph of resources.', 'Pipe to <code>dot -Tpng</code> for visualization.')
add('Core', 'beginner', 'Output values', 'terraform output', 'Print root module outputs.', '<code>-json</code> for machine-readable; <code>name</code> for one output.')
add('Core', 'intermediate', 'Eval expressions', 'terraform console', 'Interactive expression evaluation against state.', 'Useful for debugging interpolations.')
add('Core', 'intermediate', 'Required providers', 'terraform providers', 'Show provider requirements and sources.', 'Pair with <code>providers lock</code> for reproducible installs.')
add('Core', 'intermediate', 'State list', 'terraform state list', 'List resource addresses in state.', 'Grep for imports and targeted operations.')
add('Core', 'intermediate', 'State show', 'terraform state show aws_instance.web', 'Show attributes for one resource.', 'Inspect IDs and attributes before import.')
add('Core', 'advanced', 'State remove', 'terraform state rm aws_instance.old', 'Remove resource from state without destroying.', 'Infrastructure becomes untracked—cleanup manually if needed.')
add('Core', 'advanced', 'State move', 'terraform state mv aws_instance.a aws_instance.b', 'Rename or restructure state address.', 'Use when refactoring module paths.')
add('Core', 'advanced', 'State pull', 'terraform state pull', 'Print raw state JSON to stdout.', 'Backup before risky edits; remote backends only with access.')
add('Core', 'advanced', 'State push', 'terraform state push state.json', 'Overwrite state from file.', 'Dangerous—ensure no concurrent runs; use with extreme care.')

/* Workspace */
add('Workspace', 'intermediate', 'List workspaces', 'terraform workspace list', 'Show all workspaces in backend.', 'Default is <code>default</code>.')
add('Workspace', 'intermediate', 'New workspace', 'terraform workspace new staging', 'Create and switch to workspace.', 'Separate state per workspace on supported backends.')
add('Workspace', 'intermediate', 'Select workspace', 'terraform workspace select production', 'Switch active workspace.', 'State file path changes per backend strategy.')
add('Workspace', 'advanced', 'Delete workspace', 'terraform workspace delete staging', 'Remove workspace state.', 'Must be empty or use <code>-force</code>; cannot delete default easily.')
add('Workspace', 'intermediate', 'Show current workspace', 'terraform workspace show', 'Print active workspace name.', 'Handy in scripts and prompts.')

/* Modules & Dependencies */
add('Modules & Dependencies', 'intermediate', 'Download modules', 'terraform get', 'Download modules in configuration.', 'Largely superseded by init; still documented for older workflows.')
add('Modules & Dependencies', 'intermediate', 'Lock providers', 'terraform providers lock', 'Write dependency lock file for platforms.', 'Commit .terraform.lock.hcl for CI reproducibility.')
add('Modules & Dependencies', 'advanced', 'Mirror providers', 'terraform providers mirror ./plugins', 'Vendor provider binaries locally.', 'Air-gapped or offline installs.')

/* Import & State */
add('Import & State', 'advanced', 'Import resource', 'terraform import resource.address id', 'Adopt existing infrastructure into state.', 'Define empty resource block first; ID format is provider-specific.')
add('Import & State', 'advanced', 'Replace provider in state', 'terraform state replace-provider old new', 'Rewrite provider source in state.', 'Used during major provider upgrades or renames.')

/* Debug & Misc */
add('Debug & Misc', 'intermediate', 'Terraform Cloud login', 'terraform login', 'Obtain credentials for Terraform Cloud/Enterprise.', 'Stores token locally.')
add('Debug & Misc', 'intermediate', 'Logout', 'terraform logout', 'Remove stored Terraform Cloud credentials.', 'Does not affect cloud backends configured via env vars.')
add('Debug & Misc', 'advanced', 'Force unlock state', 'terraform force-unlock LOCK_ID', 'Release stuck state lock.', 'Only when no other run holds the lock legitimately.')
add('Debug & Misc', 'advanced', 'Taint resource', 'terraform taint aws_instance.web', 'Mark resource for recreation on next apply.', 'Prefer <code>apply -replace=</code> in modern Terraform.')
add('Debug & Misc', 'advanced', 'Untaint', 'terraform untaint aws_instance.web', 'Remove taint marker.', 'Cancel planned replace if not yet applied.')
add('Debug & Misc', 'advanced', 'Providers schema', 'terraform providers schema -json', 'Machine-readable provider schemas.', 'Used by editors and code generation tools.')
add('Debug & Misc', 'intermediate', 'Terraform test', 'terraform test', 'Run integration tests (experimental/1.6+).', 'Uses test files alongside modules/stacks.')
add('Debug & Misc', 'beginner', 'Init upgrade providers', 'terraform init -upgrade', 'Allow newer provider versions per constraints.', 'Updates lock file; review changelog before apply.')

const seen = new Map()
const objs = []
for (const r of rows) {
  let id = makeId(r.command)
  if (seen.has(id)) {
    let n = 2
    while (seen.has(`${id}-${n}`)) n++
    id = `${id}-${n}`
  }
  seen.set(id, true)
  objs.push({
    id,
    tool: 'terraform',
    category: r.category,
    level: r.level,
    name: r.name,
    command: r.command,
    description: r.description,
    explanation: r.explanation,
  })
}

const header = `/**
 * Terraform command reference — categorized (core, workspace, state, etc.).
 * Generated by scripts/gen-terraform.mjs
 */
export const TERRAFORM_COMMANDS = `

fs.writeFileSync(outPath, `${header}${JSON.stringify(objs, null, 2)};\n`)
console.log('Wrote', objs.length, 'terraform commands')

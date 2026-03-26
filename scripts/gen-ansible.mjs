import fs from 'fs'

const outPath = new URL('../src/data/ansibleCommands.js', import.meta.url).pathname

const LEGACY_IDS = new Map([
  ['ansible all -m ping', 'ansible-ping'],
  ['ansible all -a "uptime"', 'ansible-ad-hoc'],
  ['ansible-playbook playbook.yml', 'ansible-playbook'],
  ['ansible-vault encrypt file.yml', 'ansible-vault'],
  ['ansible-galaxy install role.name', 'ansible-galaxy'],
  ['ansible-inventory -i inventory --list', 'ansible-inventory'],
  ['ansible-doc module_name', 'ansible-doc'],
  ['ansible-lint playbook.yml', 'ansible-lint'],
])

function makeId(cmd) {
  const norm = cmd.trim().replace(/\s+/g, ' ')
  if (LEGACY_IDS.has(norm)) return LEGACY_IDS.get(norm)
  let slug = norm
    .toLowerCase()
    .replace(/[^a-z0-9._<>=/-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  let id = `ansible-${slug || 'cmd'}`
  if (id.length > 90) id = id.slice(0, 90).replace(/-$/, '')
  return id
}

const rows = []
function add(category, level, name, command, description, explanation) {
  rows.push({ category, level, name, command, description, explanation })
}

/* Core */
add('Core', 'beginner', 'Ansible version', 'ansible --version', 'Installed Ansible and Python paths.', 'First check in support and CI images.')
add('Core', 'intermediate', 'Ansible CLI overview', 'ansible --help', 'Show ansible command options and subcommands.', 'Entry point for ad-hoc execution.')
add('Core', 'intermediate', 'Run playbook', 'ansible-playbook playbook.yml', 'Execute tasks defined in YAML playbooks.', 'Add <code>-i</code>, <code>--check</code>, <code>--diff</code>, <code>--limit</code> as needed.')
add('Core', 'intermediate', 'Module documentation', 'ansible-doc module_name', 'Show documentation and examples for a module.', '<code>-l</code> lists all; <code>-s</code> snippet.')
add('Core', 'advanced', 'Ansible configuration', 'ansible-config list', 'List all configuration settings and origins.', 'Use <code>dump</code> for effective merged config.')
add('Core', 'advanced', 'Interactive console', 'ansible-console', 'REPL with Ansible context for exploration.', 'Useful for testing variables and Jinja on a host group.')
add('Core', 'intermediate', 'Galaxy CLI', 'ansible-galaxy --help', 'Manage roles and collections from Galaxy.', 'Subcommands: install, init, list, search, etc.')
add('Core', 'intermediate', 'Dynamic/static inventory', 'ansible-inventory -i hosts.yml --list', 'Print inventory as JSON (with plugin resolution).', 'Use <code>--graph</code> for tree view.')
add('Core', 'intermediate', 'Vault encrypt/decrypt', 'ansible-vault encrypt secrets.yml', 'Encrypt sensitive files for playbooks.', 'Use <code>view</code>, <code>edit</code>, <code>decrypt</code>, <code>rekey</code>.')

/* Ad-hoc */
add('Ad-hoc', 'beginner', 'Ping all hosts', 'ansible all -m ping', 'Test SSH/winrm connectivity.', 'First step after defining inventory.')
add('Ad-hoc', 'beginner', 'Command module', 'ansible all -m command -a "uptime"', 'Run a command without shell (no pipes/redirection).', 'Non-interactive; each host runs the same argv.')
add('Ad-hoc', 'beginner', 'Shell module', 'ansible all -m shell -a "df -h | head -5"', 'Run through a shell on remote hosts.', 'Supports pipes; use command module when shell features not needed.')
add('Ad-hoc', 'intermediate', 'Copy file', 'ansible all -m copy -a "src=/local dest=/remote mode=0644"', 'Copy file to managed nodes.', 'Idempotent; use <code>template</code> for Jinja files.')
add('Ad-hoc', 'intermediate', 'File attributes', 'ansible all -m file -a "path=/tmp/dir state=directory mode=0755"', 'Manage files, symlinks, directories.', 'Use <code>state=absent</code> to remove.')
add('Ad-hoc', 'intermediate', 'Yum package', 'ansible all -m yum -a "name=nginx state=present" -b', 'Install packages on RHEL family.', 'Requires become; use <code>dnf</code> module on newer systems.')
add('Ad-hoc', 'intermediate', 'Apt package', 'ansible all -m apt -a "name=nginx state=present" -b', 'Install packages on Debian/Ubuntu.', 'Use <code>update_cache=yes</code> when needed.')
add('Ad-hoc', 'intermediate', 'Service', 'ansible all -m service -a "name=nginx state=started enabled=yes" -b', 'Control systemd/sysv services.', 'Check <code>state=restarted</code> after config changes.')
add('Ad-hoc', 'intermediate', 'User', 'ansible all -m user -a "name=deploy shell=/bin/bash" -b', 'Manage local users.', 'Pair with <code>group</code> module for groups.')

/* Playbook */
add('Playbook', 'beginner', 'Run playbook', 'ansible-playbook site.yml', 'Execute full playbook.', 'Use inventory from ansible.cfg or <code>-i</code>.')
add('Playbook', 'intermediate', 'Custom inventory', 'ansible-playbook -i inventory/hosts site.yml', 'Point to inventory file or directory.', 'Supports dynamic inventory scripts/plugins.')
add('Playbook', 'intermediate', 'Dry run', 'ansible-playbook site.yml --check', 'Predict changes without applying.', 'Not all modules support check mode fully.')
add('Playbook', 'intermediate', 'Show diffs', 'ansible-playbook site.yml --diff', 'Show file/template diffs on change.', 'Pairs with <code>--check</code> for review.')
add('Playbook', 'beginner', 'Syntax check', 'ansible-playbook site.yml --syntax-check', 'Validate YAML and playbook structure.', 'Fast CI gate before inventory is needed.')
add('Playbook', 'intermediate', 'List tasks', 'ansible-playbook site.yml --list-tasks', 'Print task names that would run.', 'Combine with <code>--tags</code> to see subset.')
add('Playbook', 'intermediate', 'List hosts', 'ansible-playbook site.yml --list-hosts', 'Show matched hosts per play.', 'Debug inventory patterns.')
add('Playbook', 'intermediate', 'Run tagged tasks', 'ansible-playbook site.yml --tags "web,db"', 'Only run tasks with given tags.', 'Omit untagged unless <code>--skip-tags</code> used carefully.')
add('Playbook', 'intermediate', 'Skip tags', 'ansible-playbook site.yml --skip-tags slow', 'Exclude tagged tasks.', 'Useful to skip long-running roles.')
add('Playbook', 'advanced', 'Start at task', 'ansible-playbook site.yml --start-at-task="Deploy app"', 'Begin execution at named task.', 'Debugging partial runs.')
add('Playbook', 'intermediate', 'Limit hosts', 'ansible-playbook site.yml --limit webservers', 'Restrict run to pattern or group.', 'Also <code>host1,host2</code> or <code>:5</code> for first five.')

/* Inventory */
add('Inventory', 'intermediate', 'List inventory JSON', 'ansible-inventory -i inventory --list', 'Dump merged inventory (all hosts).', 'Requires working inventory config.')
add('Inventory', 'intermediate', 'Graph', 'ansible-inventory --graph', 'ASCII tree of groups and hosts.', 'Quick visual of group layout.')
add('Inventory', 'intermediate', 'Single host vars', 'ansible-inventory --host web1', 'Merged variables for one host.', 'Debugging vars precedence.')

/* Galaxy */
add('Galaxy', 'intermediate', 'Init role skeleton', 'ansible-galaxy init myrole', 'Create role directory structure.', 'Start of a reusable role.')
add('Galaxy', 'beginner', 'Install role', 'ansible-galaxy install role.name', 'Download role from Galaxy.', 'Use <code>-r requirements.yml</code> for many roles; replace <code>role.name</code> with a real role.')
add('Galaxy', 'intermediate', 'List installed', 'ansible-galaxy list', 'Show roles and versions present.', 'Paths from roles_path.')
add('Galaxy', 'intermediate', 'Remove role', 'ansible-galaxy remove geerlingguy.nginx', 'Delete installed role.', 'Does not remove collections.')
add('Galaxy', 'beginner', 'Search', 'ansible-galaxy search nginx', 'Search Galaxy for roles/collections.', 'Prefer Galaxy website for rich metadata.')

/* Vault */
add('Vault', 'intermediate', 'Create encrypted file', 'ansible-vault create secrets.yml', 'Create new encrypted vars file.', 'Prompts for vault password.')
add('Vault', 'intermediate', 'Edit vault file', 'ansible-vault edit secrets.yml', 'Decrypt to temp editor and re-encrypt.', 'Respects EDITOR env.')
add('Vault', 'beginner', 'View encrypted', 'ansible-vault view secrets.yml', 'Print decrypted content to stdout.', 'Avoid logging output in CI.')
add('Vault', 'intermediate', 'Encrypt existing', 'ansible-vault encrypt vars.yml', 'Encrypt plaintext file in place.', 'Backup first; irreversible without password.')
add('Vault', 'advanced', 'Decrypt', 'ansible-vault decrypt secrets.yml', 'Remove encryption from file.', 'Prefer <code>view</code> or <code>edit</code> to limit exposure.')
add('Vault', 'advanced', 'Rekey', 'ansible-vault rekey secrets.yml', 'Change vault password.', 'Rotates secret protecting the file.')
add('Vault', 'intermediate', 'Encrypt string', 'ansible-vault encrypt_string --name db_password secret', 'Produce inline encrypted var for playbooks.', 'Paste into group_vars; use in play with vault password.')

/* Debug & Config */
add('Debug & Config', 'advanced', 'List all config', 'ansible-config list', 'Every setting with origin (env, cfg, default).', 'Resolve “where did this come from?”')
add('Debug & Config', 'advanced', 'Effective config dump', 'ansible-config dump', 'Active configuration as ini-style.', 'Good for support tickets.')
add('Debug & Config', 'intermediate', 'List modules', 'ansible-doc -l', 'All module names.', 'Pipe to grep for discovery.')

/* Lint */
add('Debug & Config', 'advanced', 'Lint playbooks', 'ansible-lint playbook.yml', 'Style and best-practice checks.', 'Run in CI; configure via .ansible-lint.')

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
    tool: 'ansible',
    category: r.category,
    level: r.level,
    name: r.name,
    command: r.command,
    description: r.description,
    explanation: r.explanation,
  })
}

const header = `/**
 * Ansible command reference — categorized (core, ad-hoc, playbooks, vault, etc.).
 * Generated by scripts/gen-ansible.mjs
 */
export const ANSIBLE_COMMANDS = `

fs.writeFileSync(outPath, `${header}${JSON.stringify(objs, null, 2)};\n`)
console.log('Wrote', objs.length, 'ansible commands')

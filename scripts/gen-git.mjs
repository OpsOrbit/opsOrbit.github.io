import fs from 'fs'

const outPath = new URL('../src/data/gitCommands.js', import.meta.url).pathname

/** Stable ids for COMMAND_EXTRAS / suggestedNext */
const LEGACY_IDS = new Map([
  ['git status', 'git-status'],
  ['git add <file>', 'git-add'],
  ['git commit -m "message"', 'git-commit'],
  ['git push origin <branch>', 'git-push'],
  ['git pull origin <branch>', 'git-pull'],
  ['git clone <url> [folder]', 'git-clone'],
  ['git stash push -m "message"', 'git-stash'],
  ['git diff', 'git-diff'],
  ['git branch -a', 'git-branch'],
  ['git checkout <branch>', 'git-checkout'],
  ['git remote -v', 'git-remote'],
  ['git reset [--soft|--mixed|--hard] [commit]', 'git-reset'],
  ['git rebase main', 'git-rebase'],
  ['git merge <branch>', 'git-merge'],
])

function makeId(cmd) {
  const norm = cmd.trim().replace(/\s+/g, ' ')
  if (LEGACY_IDS.has(norm)) return LEGACY_IDS.get(norm)
  let slug = norm
    .replace(/^git\s+/i, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._<>/-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  let id = `git-${slug || 'cmd'}`
  if (id.length > 80) id = id.slice(0, 80).replace(/-$/, '')
  return id
}

const rows = []

function add(category, level, name, command, description, explanation) {
  rows.push({ category, level, name, command, description, explanation })
}

/* ========== 1. Setup & Config ========== */
add('Setup & Config', 'beginner', 'Configuration overview', 'git config', 'Read or set Git configuration (local, global, system).', 'Without extra args, may show usage; scope flags select which file is affected.')
add('Setup & Config', 'beginner', 'Global user name', 'git config --global user.name "Your Name"', 'Set your name for all repositories on this machine.', 'Stored in ~/.gitconfig. Required for meaningful commit metadata.')
add('Setup & Config', 'beginner', 'Global user email', 'git config --global user.email "you@example.com"', 'Set your email for all repositories on this machine.', 'Use the email associated with your Git host (GitHub, etc.) for linking commits.')
add('Setup & Config', 'beginner', 'List all values', 'git config --list', 'Show all effective configuration entries.', 'Combines system, global, and local; later entries override earlier ones.')
add('Setup & Config', 'intermediate', 'System config file', 'git config --system --list', 'View or edit system-wide configuration (all users).', 'Path is often /etc/gitconfig; requires appropriate permissions to change.')
add('Setup & Config', 'intermediate', 'Local repo config', 'git config --local --list', 'Show configuration for the current repository only.', 'Stored in .git/config; overrides global for this repo.')
add('Setup & Config', 'intermediate', 'Unset a key', 'git config --unset user.name', 'Remove a configuration key from the effective config.', 'Use scope flags: --global, --local, --system.')
add('Setup & Config', 'intermediate', 'Get one value', 'git config --get user.name', 'Print a single configuration value.', 'Returns nothing if unset; exit code 1 when missing (useful in scripts).')
add('Setup & Config', 'intermediate', 'Add multi-valued key', 'git config --add safe.directory /path/to/repo', 'Append a value for a multi-value key (e.g. safe.directory).', 'Use when one key may appear multiple times.')
add('Setup & Config', 'intermediate', 'Open config in editor', 'git config --edit', 'Edit configuration file in your configured editor.', 'Respects core.editor; use --global for ~/.gitconfig.')
add('Setup & Config', 'beginner', 'Set default editor', 'git config --global core.editor "vim"', 'Choose the editor for commits, interactive rebase, etc.', 'Can be a command with flags; VS Code: <code>code --wait</code>.')
add('Setup & Config', 'intermediate', 'Line ending behavior', 'git config --global core.autocrlf true', 'Convert CRLF/LF on Windows (true), input, or false.', 'Set to <code>input</code> on Mac/Linux for consistent LF in repo.')

/* ========== 2. Repository Initialization ========== */
add('Repository Initialization', 'beginner', 'Create repository', 'git init', 'Initialize a new Git repository in the current directory.', 'Creates .git/; add <code>--initial-branch main</code> to set default branch name.')
add('Repository Initialization', 'intermediate', 'Bare repository', 'git init --bare', 'Create a repository without a working tree (for remotes).', 'Used for central repos or server-side storage; push/fetch only.')
add('Repository Initialization', 'beginner', 'Clone repository', 'git clone <url> [directory]', 'Copy a remote repository and check out default branch.', 'Supports HTTPS, SSH, and local paths.')
add('Repository Initialization', 'intermediate', 'Shallow clone', 'git clone --depth 1 <url>', 'Clone with limited history (faster, smaller).', 'Good for CI and large repos; shallow history limits some operations.')
add('Repository Initialization', 'intermediate', 'Clone specific branch', 'git clone --branch <name> <url>', 'Clone and check out the given branch.', 'Still fetches default remote HEAD unless combined with other flags.')
add('Repository Initialization', 'intermediate', 'Single branch clone', 'git clone --single-branch --branch <name> <url>', 'Fetch only one branch from remote.', 'Reduces download size when you only need one branch.')
add('Repository Initialization', 'advanced', 'Mirror clone', 'git clone --mirror <url>', 'Bare clone with all refs configured for mirroring.', 'Use for backups or migrating a repo to a new remote.')

/* ========== 3. Basic Workflow ========== */
add('Basic Workflow', 'beginner', 'Working tree status', 'git status', 'Show modified, staged, and untracked files.', 'Run frequently before commit; use <code>-sb</code> for short branch summary.')
add('Basic Workflow', 'beginner', 'Stage files', 'git add <file>', 'Stage changes for the next commit.', 'Use <code>git add .</code> for all in cwd; <code>-A</code> for whole repo from top.')
add('Basic Workflow', 'beginner', 'Stage all (cwd)', 'git add .', 'Stage new and modified files under current directory.', 'Does not remove deleted files outside cwd in older Git; prefer <code>git add -A</code> from root for full sync.')
add('Basic Workflow', 'beginner', 'Stage everything', 'git add -A', 'Stage all changes in the repository (add, modify, delete).', 'Equivalent to staging the full intent of your working tree.')
add('Basic Workflow', 'intermediate', 'Patch staging', 'git add -p', 'Interactively choose hunks to stage.', 'Great for splitting unrelated edits into separate commits.')
add('Basic Workflow', 'intermediate', 'Unstage / move HEAD', 'git reset', 'Reset current HEAD to the specified state (default: mixed).', 'Without commit: often unstages; with path: unstage file. See soft/mixed/hard.')
add('Basic Workflow', 'advanced', 'Reset soft', 'git reset --soft HEAD~1', 'Move HEAD back; keep index and working tree.', 'Undoes commit but leaves changes staged.')
add('Basic Workflow', 'advanced', 'Reset mixed (default)', 'git reset --mixed HEAD~1', 'Move HEAD; unstage changes; keep working tree.', 'Default mode; most common for undoing commit but keeping edits.')
add('Basic Workflow', 'advanced', 'Reset hard', 'git reset --hard <commit>', 'Move HEAD and discard index and working tree changes.', 'Destructive; cannot recover uncommitted work without reflog/backups.')
add('Basic Workflow', 'intermediate', 'Remove file from repo', 'git rm <file>', 'Remove file from working tree and index.', 'Next commit records the deletion; use <code>--cached</code> to keep file on disk.')
add('Basic Workflow', 'intermediate', 'Stop tracking file', 'git rm --cached <file>', 'Remove file from index but keep on disk.', 'Use with .gitignore to ignore already-tracked files.')
add('Basic Workflow', 'beginner', 'Rename or move', 'git mv <old> <new>', 'Rename file and stage the change.', 'Equivalent to mv + git add -A on those paths.')
add('Basic Workflow', 'beginner', 'Create commit', 'git commit', 'Open editor to write message and create commit from index.', 'Requires staged changes unless using <code>-a</code> or <code>--allow-empty</code>.')
add('Basic Workflow', 'beginner', 'Commit with message', 'git commit -m "message"', 'Create a commit with the given message.', 'Keep subject line short; use body for details (second <code>-m</code>).')
add('Basic Workflow', 'intermediate', 'Commit all tracked', 'git commit -am "message"', 'Stage modified tracked files and commit in one step.', 'Does not add new untracked files.')
add('Basic Workflow', 'intermediate', 'Amend last commit', 'git commit --amend', 'Replace the last commit with new tree/message.', 'Rewrites history; avoid on shared branches without coordination.')
add('Basic Workflow', 'intermediate', 'Empty commit', 'git commit --allow-empty -m "message"', 'Create a commit with no file changes.', 'Sometimes used to trigger CI or mark milestones.')
add('Basic Workflow', 'intermediate', 'Skip hooks', 'git commit --no-verify', 'Commit without running pre-commit / commit-msg hooks.', 'Use sparingly; hooks often enforce quality or policy.')
add('Basic Workflow', 'beginner', 'Restore working tree', 'git restore <file>', 'Restore file in working tree from index or commit.', 'Modern replacement for <code>git checkout -- file</code>.')
add('Basic Workflow', 'intermediate', 'Unstage file', 'git restore --staged <file>', 'Remove file from index (keep working tree).', 'Pairs with <code>git restore</code> for discarding local edits.')
add('Basic Workflow', 'intermediate', 'Restore from commit', 'git restore --source=<commit> <file>', 'Restore file content from a specific revision.', 'Useful to bring back an old version without checkout.')

/* ========== 4. Branching ========== */
add('Branching', 'beginner', 'List local branches', 'git branch', 'List branches; current branch marked with *.', 'Add <code>-v</code> for last commit per branch.')
add('Branching', 'beginner', 'List all branches', 'git branch -a', 'List local and remote-tracking branches.', 'Helps see what exists locally and on remotes.')
add('Branching', 'intermediate', 'List remote branches', 'git branch -r', 'List remote-tracking branches only.', 'Shows refs like origin/main.')
add('Branching', 'beginner', 'Create branch', 'git branch <name>', 'Create a new branch pointing at current HEAD.', 'Does not switch; use <code>git switch</code> or <code>checkout</code> to move.')
add('Branching', 'intermediate', 'Delete merged branch', 'git branch -d <name>', 'Delete local branch if fully merged.', 'Safer than <code>-D</code>; fails if not merged.')
add('Branching', 'advanced', 'Force delete branch', 'git branch -D <name>', 'Delete local branch even if not merged.', 'May lose commits only reachable from that branch; check with <code>git log</code>.')
add('Branching', 'intermediate', 'Rename branch', 'git branch -m <old> <new>', 'Rename a branch (or current if one name given).', 'Useful after typo or naming conventions.')
add('Branching', 'intermediate', 'Verbose branch info', 'git branch -vv', 'Show branches with upstream and last commit.', 'Helps debug tracking and out-of-date branches.')
add('Branching', 'beginner', 'Switch branch (legacy)', 'git checkout <branch>', 'Switch to another branch or restore paths.', 'Prefer <code>git switch</code> for branches only.')
add('Branching', 'beginner', 'Create and switch', 'git checkout -b <branch>', 'Create branch at HEAD and switch to it.', 'Same as <code>git switch -c</code>.')
add('Branching', 'beginner', 'Switch branch', 'git switch <branch>', 'Switch to an existing branch.', 'Clearer than checkout for branch operations.')
add('Branching', 'beginner', 'Create branch and switch', 'git switch -c <branch>', 'Create and switch to new branch.', 'Can start from another commit: <code>git switch -c feat origin/main</code>.')
add('Branching', 'intermediate', 'Switch previous branch', 'git switch -', 'Switch to the previously checked-out branch.', 'Like <code>cd -</code> for branches.')
add('Branching', 'advanced', 'Show branch relationships', 'git show-branch', 'Display branches and their commit relationships.', 'ASCII graph of recent commits across branches.')
add('Branching', 'advanced', 'Worktree overview', 'git worktree', 'Manage multiple working trees attached to one repo.', 'Allows checking out two branches in two folders simultaneously.')
add('Branching', 'advanced', 'Add worktree', 'git worktree add ../path <branch>', 'Create new directory with another branch checked out.', 'Share same .git object database; efficient for parallel work.')
add('Branching', 'advanced', 'Remove worktree', 'git worktree remove <path>', 'Remove a linked working tree.', 'Ensure no uncommitted work or use <code>--force</code>.')
add('Branching', 'intermediate', 'List worktrees', 'git worktree list', 'Show all worktrees and their branches.', 'Includes main repo path.')

/* ========== 5. Merging & Rebasing ========== */
add('Merging & Rebasing', 'intermediate', 'Merge branch', 'git merge <branch>', 'Integrate another branch into the current branch.', 'Creates merge commit unless fast-forward is possible.')
add('Merging & Rebasing', 'intermediate', 'Merge no fast-forward', 'git merge --no-ff <branch>', 'Always create a merge commit even if FF possible.', 'Preserves branch topology in history.')
add('Merging & Rebasing', 'intermediate', 'Squash merge', 'git merge --squash <branch>', 'Combine changes as single staged snapshot (no merge commit yet).', 'Then <code>git commit</code> for one commit with all changes.')
add('Merging & Rebasing', 'intermediate', 'Abort merge', 'git merge --abort', 'Cancel an in-progress merge and restore pre-merge state.', 'Use after conflicts you want to abandon.')
add('Merging & Rebasing', 'advanced', 'Rebase onto branch', 'git rebase <upstream>', 'Replay commits from current branch on top of upstream.', 'Rewrites commits; coordinate before rebasing shared branches.')
add('Merging & Rebasing', 'advanced', 'Interactive rebase', 'git rebase -i HEAD~n', 'Reorder, squash, edit, or drop last n commits.', 'Powerful history cleanup before merge or push.')
add('Merging & Rebasing', 'advanced', 'Continue rebase', 'git rebase --continue', 'Continue after resolving conflicts during rebase.', 'Stages resolved files first.')
add('Merging & Rebasing', 'advanced', 'Abort rebase', 'git rebase --abort', 'Cancel rebase and return to pre-rebase state.', 'Use when rebase goes wrong.')
add('Merging & Rebasing', 'advanced', 'Skip commit in rebase', 'git rebase --skip', 'Skip current patch during rebase.', 'Use when commit is empty or should be dropped.')
add('Merging & Rebasing', 'intermediate', 'Cherry-pick commit', 'git cherry-pick <commit>', 'Apply a single commit onto current branch.', 'Useful for backporting fixes.')
add('Merging & Rebasing', 'advanced', 'Continue cherry-pick', 'git cherry-pick --continue', 'Continue after resolving cherry-pick conflicts.', 'Similar flow to merge/rebase.')
add('Merging & Rebasing', 'advanced', 'Abort cherry-pick', 'git cherry-pick --abort', 'Cancel cherry-pick operation.', 'Restores state before cherry-pick started.')
add('Merging & Rebasing', 'intermediate', 'Revert commit', 'git revert <commit>', 'Create a new commit that undoes a past commit.', 'Safe for shared history; does not rewrite past commits.')
add('Merging & Rebasing', 'intermediate', 'Revert without commit', 'git revert --no-commit <commit>', 'Apply revert to index/working tree without committing.', 'Batch multiple reverts into one commit.')

/* ========== 6. Stashing ========== */
add('Stashing', 'intermediate', 'Stash changes', 'git stash', 'Stash tracked modifications and staged changes.', 'Default: <code>git stash push</code>.')
add('Stashing', 'intermediate', 'Stash with message', 'git stash save "message"', 'Legacy syntax to stash with description.', 'Prefer <code>git stash push -m</code> in modern Git.')
add('Stashing', 'intermediate', 'Stash push options', 'git stash push -m "msg" -- <paths>', 'Stash with message and optional pathspec.', 'Use <code>-u</code> to include untracked files.')
add('Stashing', 'intermediate', 'Apply and drop stash', 'git stash pop', 'Apply latest stash and remove it from stash list.', 'Conflicts leave stash entry if apply fails.')
add('Stashing', 'intermediate', 'Apply stash', 'git stash apply', 'Apply stash but keep it in the list.', 'Use <code>stash@{n}</code> to pick a specific stash.')
add('Stashing', 'intermediate', 'List stashes', 'git stash list', 'Show all stash entries.', 'Most recent is stash@{0}.')
add('Stashing', 'intermediate', 'Drop stash', 'git stash drop stash@{n}', 'Delete a single stash entry.', 'Cannot undo easily; ensure stash is applied or obsolete.')
add('Stashing', 'advanced', 'Clear all stashes', 'git stash clear', 'Remove every stash entry.', 'Destructive; use with care.')
add('Stashing', 'intermediate', 'Show stash diff', 'git stash show -p stash@{0}', 'Display diff for a stash.', 'Default show is stat-only; <code>-p</code> for patch.')
add('Stashing', 'advanced', 'Branch from stash', 'git stash branch <name> stash@{0}', 'Create branch starting at stash base and apply stash.', 'Useful if stash does not apply cleanly on current HEAD.')

/* ========== 7. Logs & History ========== */
add('Logs & History', 'beginner', 'Commit log', 'git log', 'Show commit history.', 'Many options; pipe to <code>less</code> on long repos.')
add('Logs & History', 'beginner', 'One-line log', 'git log --oneline', 'Compact one line per commit.', 'Often combined with <code>-n 20</code> or graph options.')
add('Logs & History', 'intermediate', 'ASCII graph', 'git log --oneline --graph --all', 'Visualize branch and merge structure.', 'Essential for understanding history shape.')
add('Logs & History', 'intermediate', 'Decorate refs', 'git log --decorate', 'Show branch and tag names on commits.', 'Often default in modern Git; explicit for scripts.')
add('Logs & History', 'intermediate', 'Log with stats', 'git log --stat', 'Include file change statistics per commit.', 'Good middle ground between oneline and full patch.')
add('Logs & History', 'intermediate', 'Log with patch', 'git log -p', 'Show full diff for each commit.', 'Verbose; use with <code>-n</code> to limit.')
add('Logs & History', 'intermediate', 'Filter by author', 'git log --author="Name"', 'Limit log to commits by author pattern.', 'Pattern matches author string, not just exact name.')
add('Logs & History', 'intermediate', 'Commits since date', 'git log --since="2024-01-01"', 'Show commits after a date.', 'Also <code>--until</code> for upper bound.')
add('Logs & History', 'intermediate', 'Commits until date', 'git log --until="2024-12-31"', 'Show commits before a date.', 'Combine with since for ranges.')
add('Logs & History', 'intermediate', 'Search commit messages', 'git log --grep="fix"', 'Filter commits whose message matches regex.', 'Use <code>-i</code> for case insensitive.')
add('Logs & History', 'intermediate', 'Patch for range', 'git log -p <commit1>..<commit2>', 'Show commits and diffs in range.', 'Two-dot range is symmetric difference contextually.')
add('Logs & History', 'intermediate', 'Summary by author', 'git shortlog -sn', 'Count commits grouped by author.', 'Useful for release notes and stats.')
add('Logs & History', 'advanced', 'Reflog', 'git reflog', 'Show history of HEAD (and other refs) movements.', 'Recovery tool after reset or rebase; entries expire.')
add('Logs & History', 'intermediate', 'Show object', 'git show <commit>', 'Show commit message and diff (or tag/blob).', 'Defaults to HEAD if commit omitted in some contexts.')
add('Logs & History', 'intermediate', 'Line-by-line blame', 'git blame <file>', 'Show last commit that touched each line.', 'Use <code>-L</code> for line range.')
add('Logs & History', 'intermediate', 'Annotate file', 'git annotate <file>', 'Similar to blame (vendor-specific details may differ).', 'Often alias or identical to blame.')
add('Logs & History', 'intermediate', 'Describe reachable tag', 'git describe', 'Human-readable name from nearest tag.', 'Outputs like v1.2-5-gabc1234 for distance from tag.')
add('Logs & History', 'advanced', 'Bisect start', 'git bisect start', 'Begin binary search for bad commit.', 'Then mark good/bad commits to narrow regression.')
add('Logs & History', 'advanced', 'Bisect good', 'git bisect good <commit>', 'Mark commit as known good.', 'Git checks out midpoint between good and bad.')
add('Logs & History', 'advanced', 'Bisect bad', 'git bisect bad <commit>', 'Mark commit as bad (or current).', 'Continue until first bad commit found.')
add('Logs & History', 'advanced', 'Bisect reset', 'git bisect reset', 'End bisect and return to original branch.', 'Run when finished or cancelling.')

/* ========== 8. Remote Operations ========== */
add('Remote Operations', 'beginner', 'List remotes', 'git remote', 'Show remote short names.', 'Add <code>-v</code> for URLs.')
add('Remote Operations', 'beginner', 'Remote URLs', 'git remote -v', 'List remotes with fetch and push URLs.', 'Default remote is often origin.')
add('Remote Operations', 'beginner', 'Add remote', 'git remote add origin <url>', 'Register a new remote.', 'Name can be anything; origin is convention.')
add('Remote Operations', 'intermediate', 'Remove remote', 'git remote remove origin', 'Delete remote configuration.', 'Does not delete remote server repo.')
add('Remote Operations', 'intermediate', 'Rename remote', 'git remote rename old new', 'Rename a remote.', 'Updates remote-tracking branch names accordingly.')
add('Remote Operations', 'beginner', 'Fetch updates', 'git fetch', 'Download objects and refs from remote without merging.', 'Updates remote-tracking branches; safe operation.')
add('Remote Operations', 'intermediate', 'Fetch all remotes', 'git fetch --all', 'Fetch from every configured remote.', 'Useful in multi-remote setups.')
add('Remote Operations', 'intermediate', 'Fetch prune', 'git fetch --prune', 'Remove remote-tracking branches deleted on server.', 'Keeps local refs tidy.')
add('Remote Operations', 'beginner', 'Pull changes', 'git pull', 'Fetch and integrate into current branch.', 'Default merge; can be configured to rebase.')
add('Remote Operations', 'intermediate', 'Pull with rebase', 'git pull --rebase', 'Fetch then rebase local commits on top.', 'Cleaner linear history on shared branches when agreed.')
add('Remote Operations', 'beginner', 'Push commits', 'git push', 'Upload local commits to remote.', 'Requires upstream set or remote and refspec.')
add('Remote Operations', 'beginner', 'Push set upstream', 'git push -u origin <branch>', 'Push and set upstream tracking branch.', 'After first push, plain <code>git push</code> works.')
add('Remote Operations', 'advanced', 'Force push', 'git push --force', 'Overwrite remote branch (dangerous).', 'Can lose others work; avoid on shared branches.')
add('Remote Operations', 'advanced', 'Force with lease', 'git push --force-with-lease', 'Force push only if remote unchanged since fetch.', 'Safer than --force; prevents clobbering unknown updates.')
add('Remote Operations', 'intermediate', 'Push all tags', 'git push --tags', 'Push all local tags to remote.', 'Does not push branches by default.')
add('Remote Operations', 'intermediate', 'Delete remote branch', 'git push origin --delete <branch>', 'Remove branch on remote.', 'Or <code>git push origin :branch</code> refspec syntax.')
add('Remote Operations', 'intermediate', 'Remote details', 'git remote show origin', 'Display remote branches, tracking, and fetch/push URLs.', 'Helps verify configuration.')

/* ========== 9. Tags ========== */
add('Tags', 'beginner', 'List tags', 'git tag', 'List tags (optional pattern).', 'Lightweight tags are names only; annotated carry message and signer.')
add('Tags', 'beginner', 'List matching tags', 'git tag -l "v1.*"', 'List tags matching glob pattern.', 'Quotes prevent shell glob expansion.')
add('Tags', 'intermediate', 'Annotated tag', 'git tag -a v1.0 -m "Release 1.0"', 'Create signed or annotated tag object.', 'Preferred for releases; includes metadata.')
add('Tags', 'intermediate', 'Delete local tag', 'git tag -d v1.0', 'Remove tag locally.', 'Also delete on remote with push refspec.')
add('Tags', 'advanced', 'Force tag move', 'git tag -f v1.0 <commit>', 'Move tag to different commit (force).', 'Coordinate with team; update remote explicitly.')
add('Tags', 'intermediate', 'Push all tags', 'git push origin --tags', 'Push tags to remote.', 'Complement to branch pushes.')
add('Tags', 'intermediate', 'Delete remote tag', 'git push origin :refs/tags/v1.0', 'Delete tag on remote via refspec.', 'Syntax deletes ref on remote side.')
add('Tags', 'intermediate', 'Show tag', 'git show v1.0', 'Display tag object and target.', 'Annotated tags show message and commit.')

/* ========== 10. Diff & Comparison ========== */
add('Diff & Comparison', 'beginner', 'Unstaged diff', 'git diff', 'Diff working tree vs index.', 'See what is not yet staged.')
add('Diff & Comparison', 'intermediate', 'Staged diff', 'git diff --staged', 'Diff index vs last commit (what will be committed).', 'Same as <code>--cached</code>.')
add('Diff & Comparison', 'intermediate', 'Diff vs HEAD', 'git diff HEAD', 'Show all changes vs last commit.', 'Includes staged and unstaged.')
add('Diff & Comparison', 'intermediate', 'Changed files only', 'git diff --name-only', 'List only paths that differ.', 'Good for scripting.')
add('Diff & Comparison', 'intermediate', 'Diff stat', 'git diff --stat', 'Summary of files and line counts.', 'Quick overview before full patch.')
add('Diff & Comparison', 'intermediate', 'Diff two branches', 'git diff branch1..branch2', 'Compare tips of two branches.', 'Three-dot syntax differs; two-dot is symmetric diff range.')
add('Diff & Comparison', 'intermediate', 'Diff two commits', 'git diff commit1 commit2', 'Diff between any two commits.', 'Order matters: shows path from first to second.')
add('Diff & Comparison', 'intermediate', 'External difftool', 'git difftool', 'Open visual diff tool for conflicts or diffs.', 'Configure merge.tool / diff.tool.')
add('Diff & Comparison', 'advanced', 'Range diff', 'git range-diff', 'Compare two commit ranges (e.g. rebased vs original).', 'Useful after interactive rebase.')

/* ========== 11. Cleaning & Maintenance ========== */
add('Cleaning & Maintenance', 'advanced', 'Preview clean', 'git clean -n', 'Show what would be removed (dry run).', 'Always run before <code>-f</code>.')
add('Cleaning & Maintenance', 'advanced', 'Remove untracked', 'git clean -f', 'Delete untracked files.', 'Irreversible; does not touch ignored by default.')
add('Cleaning & Maintenance', 'advanced', 'Remove untracked dirs', 'git clean -fd', 'Remove untracked files and directories.', 'Still respects .gitignore unless <code>-x</code>.')
add('Cleaning & Maintenance', 'intermediate', 'Garbage collect', 'git gc', 'Pack objects and prune unreachable loose objects.', 'Run periodically; improves performance.')
add('Cleaning & Maintenance', 'advanced', 'Aggressive GC', 'git gc --aggressive', 'More thorough repack (slower).', 'Rarely needed; try normal gc first.')
add('Cleaning & Maintenance', 'advanced', 'Verify integrity', 'git fsck', 'Check object database integrity.', 'Finds dangling commits and corruption.')
add('Cleaning & Maintenance', 'advanced', 'Prune unreachable', 'git prune', 'Remove loose unreachable objects.', 'Usually invoked by gc; low-level.')
add('Maintenance', 'advanced', 'Maintenance CLI', 'git maintenance start', 'Register scheduled maintenance for repo.', 'Git 2.30+; automates gc and prefetch.')
add('Maintenance', 'advanced', 'Stop maintenance', 'git maintenance stop', 'Disable scheduled maintenance tasks.', 'Per-repo configuration.')

/* ========== 12. Submodules ========== */
add('Submodules', 'intermediate', 'Submodule status', 'git submodule', 'Show submodule summary or subcommands help.', 'Submodules pin external repos at specific commits.')
add('Submodules', 'intermediate', 'Add submodule', 'git submodule add <url> path', 'Clone repo into path and record in .gitmodules.', 'Commit both .gitmodules and gitlink.')
add('Submodules', 'intermediate', 'Init submodules', 'git submodule init', 'Initialize submodule config from .gitmodules.', 'Often followed by update.')
add('Submodules', 'intermediate', 'Update submodules', 'git submodule update', 'Checkout commits recorded in superproject.', 'Use <code>--recursive</code> for nested submodules.')
add('Submodules', 'advanced', 'Update to remote tip', 'git submodule update --remote', 'Fetch and update submodule to remote tracking branch.', 'Changes superproject pointer when committed.')
add('Submodules', 'advanced', 'Command in each submodule', 'git submodule foreach git pull', 'Run shell command in every submodule.', 'Powerful for bulk operations.')
add('Submodules', 'advanced', 'Deinit submodule', 'git submodule deinit path', 'Unregister submodule working tree.', 'Does not remove submodule section from .gitmodules until manual edit.')

/* ========== 13. Patch & Apply ========== */
add('Patch & Apply', 'advanced', 'Format patches', 'git format-patch origin/main', 'Create mailbox-style patches for each commit.', 'For email or code review workflows.')
add('Patch & Apply', 'intermediate', 'Apply patch file', 'git apply patch.diff', 'Apply a unified diff to working tree.', 'Does not create commits; use <code>git am</code> for that.')
add('Patch & Apply', 'advanced', 'Apply mailbox', 'git am < patches.mbox', 'Apply series of patches as commits.', 'Preserves author/date from patch headers.')
add('Patch & Apply', 'advanced', 'Continue am', 'git am --continue', 'Continue after resolving apply conflicts.', 'Stage resolved files first.')
add('Patch & Apply', 'advanced', 'Abort am', 'git am --abort', 'Cancel patch application series.', 'Returns to state before git am.')
add('Patch & Apply', 'advanced', 'Skip patch in am', 'git am --skip', 'Skip current patch in series.', 'Use when patch already upstream.')

/* ========== 14. Archive & Bundle ========== */
add('Archive & Bundle', 'intermediate', 'Export tree archive', 'git archive --format=zip HEAD -o out.zip', 'Create archive of tree at revision.', 'Excludes .git; good for source releases.')
add('Archive & Bundle', 'advanced', 'Create bundle', 'git bundle create repo.bundle --all', 'Package refs and objects for offline transfer.', 'Move repo without network access.')
add('Archive & Bundle', 'advanced', 'Verify bundle', 'git bundle verify repo.bundle', 'Check bundle file integrity.', 'Before clone or fetch from bundle.')
add('Archive & Bundle', 'advanced', 'List bundle heads', 'git bundle list-heads repo.bundle', 'Show branch tips contained in bundle.', 'Plan unbundle or fetch.')
add('Archive & Bundle', 'advanced', 'Unbundle', 'git bundle unbundle repo.bundle', 'Extract refs from bundle into repository.', 'Lower-level; often use <code>git clone repo.bundle</code>.')

/* ========== 15. Hooks & Debugging ========== */
add('Hooks & Debugging', 'intermediate', 'Hooks location', 'git help githooks', 'Documentation for server and client hook scripts.', 'Hooks live under .git/hooks (samples with .sample suffix).')
add('Hooks & Debugging', 'intermediate', 'Git environment variables', 'git var GIT_AUTHOR_IDENT', 'Print expanded value of a Git logical variable.', 'Useful for debugging identity and paths.')
add('Hooks & Debugging', 'beginner', 'Help overview', 'git help', 'List common Git commands and guides.', 'Gateway to documentation.')
add('Hooks & Debugging', 'beginner', 'Help command', 'git help <command>', 'Open manpage or HTML help for command.', 'Same as <code>git <command> --help</code>.')
add('Hooks & Debugging', 'beginner', 'Git version', 'git version', 'Show installed Git version.', 'Include in bug reports.')
add('Hooks & Debugging', 'intermediate', 'Diagnose', 'git diagnose', 'Collect environment info for bug reports (newer Git).', 'May not exist on very old versions.')

/* ========== 16. Sparse Checkout ========== */
add('Sparse Checkout', 'advanced', 'Sparse checkout', 'git sparse-checkout', 'Restrict working tree to subset of files.', 'Common with monorepos; requires cone/patterns config.')
add('Sparse Checkout', 'advanced', 'Init sparse', 'git sparse-checkout init', 'Enable sparse checkout in repo.', 'Then use set to define paths.')
add('Sparse Checkout', 'advanced', 'Set sparse paths', 'git sparse-checkout set path1 path2', 'Define which paths populate working tree.', 'Non-matching paths removed from working tree.')
add('Sparse Checkout', 'advanced', 'Disable sparse', 'git sparse-checkout disable', 'Turn off sparse checkout and restore full tree.', 'May take time on large repos.')

/* ========== 17. Advanced / Rare ========== */
add('Advanced / Rare', 'advanced', 'Replace objects', 'git replace <bad> <good>', 'Substitute one object for another locally.', 'History rewriting aid; use with care.')
add('Advanced / Rare', 'advanced', 'Filter branch (legacy)', 'git filter-branch', 'Rewrite history with filters (deprecated).', 'Prefer git-filter-repo for large or complex rewrites.')
add('Advanced / Rare', 'advanced', 'Filter repository', 'git filter-repo', 'Third-party powerful history rewriter (install separately).', 'Replacement for filter-branch; not bundled in all Git installs.')
add('Advanced / Rare', 'advanced', 'Notes add', 'git notes add -m "note" <commit>', 'Attach note to commit without changing commit hash.', 'Stored separately; visible in log with notes ref.')
add('Advanced / Rare', 'advanced', 'Notes show', 'git notes show <commit>', 'Display note for commit.', 'Empty if no note.')
add('Advanced / Rare', 'advanced', 'Notes remove', 'git notes remove <commit>', 'Delete note for commit.', 'Updates notes ref.')
add('Advanced / Rare', 'advanced', 'Notes list', 'git notes list', 'List notes in default notes namespace.', 'Integrate with code review tools.')
add('Advanced / Rare', 'advanced', 'Rerere status', 'git rerere status', 'Show conflict resolution reuse status.', 'rerere records how you resolved conflicts.')
add('Advanced / Rare', 'advanced', 'Rerere diff', 'git rerere diff', 'Show current conflict diff rerere would use.', 'Debugging rerere.')
add('Advanced / Rare', 'advanced', 'Rerere clear', 'git rerere clear', 'Clear rerere cache.', 'Rare maintenance.')
add('Advanced / Rare', 'advanced', 'Rerere forget', 'git rerere forget <path>', 'Discard recorded resolution for path.', 'Before trying a different resolution.')

/* ========== 18. Plumbing Commands ========== */
add('Plumbing (low-level)', 'advanced', 'Hash object', 'git hash-object -w file', 'Compute object ID; -w stores blob in object db.', 'Building blocks for low-level tools.')
add('Plumbing (low-level)', 'advanced', 'Cat object', 'git cat-file -p <sha>', 'Print content of object by SHA.', '-t for type, -s for size.')
add('Plumbing (low-level)', 'advanced', 'Update index', 'git update-index', 'Manipulate index entries directly.', 'Used by scripts and advanced workflows.')
add('Plumbing (low-level)', 'advanced', 'Write tree', 'git write-tree', 'Create tree object from current index.', 'Returns tree SHA.')
add('Plumbing (low-level)', 'advanced', 'Read tree', 'git read-tree', 'Populate index from tree object.', 'Used in scripted commits.')
add('Plumbing (low-level)', 'advanced', 'Commit tree', 'git commit-tree', 'Create commit object from tree and parents.', 'Low-level commit creation.')
add('Plumbing (low-level)', 'advanced', 'Rev parse', 'git rev-parse <ref>', 'Resolve ref to full SHA.', 'Essential in shell scripts around Git.')
add('Plumbing (low-level)', 'advanced', 'Rev list', 'git rev-list', 'List commit objects reachable from revs.', 'Powers log and automation.')
add('Plumbing (low-level)', 'advanced', 'Show ref', 'git show-ref', 'List refs in repository.', 'Useful for debugging refs.')
add('Plumbing (low-level)', 'advanced', 'Symbolic ref', 'git symbolic-ref HEAD', 'Show or set symbolic ref (e.g. HEAD).', 'HEAD usually points to branch name.')
add('Plumbing (low-level)', 'advanced', 'Update ref', 'git update-ref refs/heads/main <new-sha>', 'Move branch ref to commit.', 'Low-level branch manipulation.')
add('Plumbing (low-level)', 'advanced', 'For each ref', 'git for-each-ref', 'Iterate refs with format strings.', 'Scripting-friendly ref listing.')
add('Plumbing (low-level)', 'advanced', 'List files (index)', 'git ls-files', 'Show files in index.', 'Options for status simulation.')
add('Plumbing (low-level)', 'advanced', 'List tree', 'git ls-tree <tree>', 'List entries in tree object.', 'Inspect tree without checkout.')
add('Plumbing (low-level)', 'intermediate', 'Check ignore rules', 'git check-ignore -v path', 'Show why path is ignored.', 'Debug .gitignore issues.')
add('Plumbing (low-level)', 'advanced', 'Make tag object', 'git mktag', 'Create tag object from stdin.', 'Plumbing for custom tools.')
add('Plumbing (low-level)', 'advanced', 'Unpack objects', 'git unpack-objects', 'Write loose objects from pack stream.', 'Recovery or import.')
add('Plumbing (low-level)', 'advanced', 'Pack objects', 'git pack-objects', 'Build pack files from set of objects.', 'Used by gc and transfer.')
add('Plumbing (low-level)', 'advanced', 'Index pack', 'git index-pack pack.pack', 'Build pack index for packfile.', 'Verify downloaded packs.')
add('Plumbing (low-level)', 'advanced', 'Verify pack', 'git verify-pack -v pack.idx', 'Validate pack integrity.', 'Deep diagnostics.')
add('Plumbing (low-level)', 'intermediate', 'Count objects', 'git count-objects', 'Report object database disk usage.', 'See loose vs packed.')
add('Plumbing (low-level)', 'advanced', 'Expire reflog', 'git reflog expire --expire=90.days refs/heads/main', 'Prune old reflog entries.', 'Part of maintenance.')

/* ========== 19. Workflows & Utilities ========== */
add('Workflows & Utilities', 'intermediate', 'Search tracked files', 'git grep "pattern"', 'Search working tree version of tracked files.', 'Fast; respects line endings in repo.')
add('Workflows & Utilities', 'advanced', 'Instaweb', 'git instaweb', 'Start temporary web server browsing repo (if configured).', 'Requires lighttpd/apache etc.; rarely used today.')
add('Workflows & Utilities', 'advanced', 'Request pull summary', 'git request-pull start url', 'Generate summary text for pull request email.', 'Legacy distributed workflow helper.')
add('Workflows & Utilities', 'intermediate', 'What changed (legacy)', 'git whatchanged', 'Show commits with diffstat (legacy interface).', 'Prefer <code>git log</code> with options.')
add('Workflows & Utilities', 'advanced', 'Git daemon', 'git daemon --export-all --base-path=/srv/git', 'Serve repositories over git:// protocol.', 'Use with caution; network exposure.')
add('Workflows & Utilities', 'advanced', 'Backend for remote helpers', 'git serve', 'Low-level command for protocol experiments.', 'Not typical daily use.')
add('Workflows & Utilities', 'advanced', 'Fast export', 'git fast-export', 'Stream repository history in fast-import format.', 'Migration between VCS or repos.')
add('Workflows & Utilities', 'advanced', 'Fast import', 'git fast-import', 'Import stream to create history.', 'Pair with fast-export for transforms.')

/* Extras aligned with user list (aliases / duplicates consolidated above) */
add('Logs & History', 'intermediate', 'Log patch alias', 'git log -p -2', 'Last two commits with full patch.', 'Same as <code>--patch</code> limit.')

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
    tool: 'git',
    category: r.category,
    level: r.level,
    name: r.name,
    command: r.command,
    description: r.description,
    explanation: r.explanation,
  })
}

const header = `/**
 * Git command reference — categorized catalog (config, workflow, branching, remotes, history, etc.).
 * Merged into COMMANDS_DATA in commands.js.
 */
export const GIT_COMMANDS = `

fs.writeFileSync(outPath, `${header}${JSON.stringify(objs, null, 2)};\n`)
console.log('Wrote', objs.length, 'git commands')

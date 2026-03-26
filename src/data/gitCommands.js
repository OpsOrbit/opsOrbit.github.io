/**
 * Git command reference — categorized catalog (config, workflow, branching, remotes, history, etc.).
 * Merged into COMMANDS_DATA in commands.js.
 */
export const GIT_COMMANDS = [
  {
    "id": "git-config",
    "tool": "git",
    "category": "Setup & Config",
    "level": "beginner",
    "name": "Configuration overview",
    "command": "git config",
    "description": "Read or set Git configuration (local, global, system).",
    "explanation": "Without extra args, may show usage; scope flags select which file is affected."
  },
  {
    "id": "git-config-global-user.name-your-name",
    "tool": "git",
    "category": "Setup & Config",
    "level": "beginner",
    "name": "Global user name",
    "command": "git config --global user.name \"Your Name\"",
    "description": "Set your name for all repositories on this machine.",
    "explanation": "Stored in ~/.gitconfig. Required for meaningful commit metadata."
  },
  {
    "id": "git-config-global-user.email-youexample.com",
    "tool": "git",
    "category": "Setup & Config",
    "level": "beginner",
    "name": "Global user email",
    "command": "git config --global user.email \"you@example.com\"",
    "description": "Set your email for all repositories on this machine.",
    "explanation": "Use the email associated with your Git host (GitHub, etc.) for linking commits."
  },
  {
    "id": "git-config-list",
    "tool": "git",
    "category": "Setup & Config",
    "level": "beginner",
    "name": "List all values",
    "command": "git config --list",
    "description": "Show all effective configuration entries.",
    "explanation": "Combines system, global, and local; later entries override earlier ones."
  },
  {
    "id": "git-config-system-list",
    "tool": "git",
    "category": "Setup & Config",
    "level": "intermediate",
    "name": "System config file",
    "command": "git config --system --list",
    "description": "View or edit system-wide configuration (all users).",
    "explanation": "Path is often /etc/gitconfig; requires appropriate permissions to change."
  },
  {
    "id": "git-config-local-list",
    "tool": "git",
    "category": "Setup & Config",
    "level": "intermediate",
    "name": "Local repo config",
    "command": "git config --local --list",
    "description": "Show configuration for the current repository only.",
    "explanation": "Stored in .git/config; overrides global for this repo."
  },
  {
    "id": "git-config-unset-user.name",
    "tool": "git",
    "category": "Setup & Config",
    "level": "intermediate",
    "name": "Unset a key",
    "command": "git config --unset user.name",
    "description": "Remove a configuration key from the effective config.",
    "explanation": "Use scope flags: --global, --local, --system."
  },
  {
    "id": "git-config-get-user.name",
    "tool": "git",
    "category": "Setup & Config",
    "level": "intermediate",
    "name": "Get one value",
    "command": "git config --get user.name",
    "description": "Print a single configuration value.",
    "explanation": "Returns nothing if unset; exit code 1 when missing (useful in scripts)."
  },
  {
    "id": "git-config-add-safe.directory-/path/to/repo",
    "tool": "git",
    "category": "Setup & Config",
    "level": "intermediate",
    "name": "Add multi-valued key",
    "command": "git config --add safe.directory /path/to/repo",
    "description": "Append a value for a multi-value key (e.g. safe.directory).",
    "explanation": "Use when one key may appear multiple times."
  },
  {
    "id": "git-config-edit",
    "tool": "git",
    "category": "Setup & Config",
    "level": "intermediate",
    "name": "Open config in editor",
    "command": "git config --edit",
    "description": "Edit configuration file in your configured editor.",
    "explanation": "Respects core.editor; use --global for ~/.gitconfig."
  },
  {
    "id": "git-config-global-core.editor-vim",
    "tool": "git",
    "category": "Setup & Config",
    "level": "beginner",
    "name": "Set default editor",
    "command": "git config --global core.editor \"vim\"",
    "description": "Choose the editor for commits, interactive rebase, etc.",
    "explanation": "Can be a command with flags; VS Code: <code>code --wait</code>."
  },
  {
    "id": "git-config-global-core.autocrlf-true",
    "tool": "git",
    "category": "Setup & Config",
    "level": "intermediate",
    "name": "Line ending behavior",
    "command": "git config --global core.autocrlf true",
    "description": "Convert CRLF/LF on Windows (true), input, or false.",
    "explanation": "Set to <code>input</code> on Mac/Linux for consistent LF in repo."
  },
  {
    "id": "git-init",
    "tool": "git",
    "category": "Repository Initialization",
    "level": "beginner",
    "name": "Create repository",
    "command": "git init",
    "description": "Initialize a new Git repository in the current directory.",
    "explanation": "Creates .git/; add <code>--initial-branch main</code> to set default branch name."
  },
  {
    "id": "git-init-bare",
    "tool": "git",
    "category": "Repository Initialization",
    "level": "intermediate",
    "name": "Bare repository",
    "command": "git init --bare",
    "description": "Create a repository without a working tree (for remotes).",
    "explanation": "Used for central repos or server-side storage; push/fetch only."
  },
  {
    "id": "git-clone-<url>-directory",
    "tool": "git",
    "category": "Repository Initialization",
    "level": "beginner",
    "name": "Clone repository",
    "command": "git clone <url> [directory]",
    "description": "Copy a remote repository and check out default branch.",
    "explanation": "Supports HTTPS, SSH, and local paths."
  },
  {
    "id": "git-clone-depth-1-<url>",
    "tool": "git",
    "category": "Repository Initialization",
    "level": "intermediate",
    "name": "Shallow clone",
    "command": "git clone --depth 1 <url>",
    "description": "Clone with limited history (faster, smaller).",
    "explanation": "Good for CI and large repos; shallow history limits some operations."
  },
  {
    "id": "git-clone-branch-<name>-<url>",
    "tool": "git",
    "category": "Repository Initialization",
    "level": "intermediate",
    "name": "Clone specific branch",
    "command": "git clone --branch <name> <url>",
    "description": "Clone and check out the given branch.",
    "explanation": "Still fetches default remote HEAD unless combined with other flags."
  },
  {
    "id": "git-clone-single-branch-branch-<name>-<url>",
    "tool": "git",
    "category": "Repository Initialization",
    "level": "intermediate",
    "name": "Single branch clone",
    "command": "git clone --single-branch --branch <name> <url>",
    "description": "Fetch only one branch from remote.",
    "explanation": "Reduces download size when you only need one branch."
  },
  {
    "id": "git-clone-mirror-<url>",
    "tool": "git",
    "category": "Repository Initialization",
    "level": "advanced",
    "name": "Mirror clone",
    "command": "git clone --mirror <url>",
    "description": "Bare clone with all refs configured for mirroring.",
    "explanation": "Use for backups or migrating a repo to a new remote."
  },
  {
    "id": "git-status",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Working tree status",
    "command": "git status",
    "description": "Show modified, staged, and untracked files.",
    "explanation": "Run frequently before commit; use <code>-sb</code> for short branch summary."
  },
  {
    "id": "git-add",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Stage files",
    "command": "git add <file>",
    "description": "Stage changes for the next commit.",
    "explanation": "Use <code>git add .</code> for all in cwd; <code>-A</code> for whole repo from top."
  },
  {
    "id": "git-add-.",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Stage all (cwd)",
    "command": "git add .",
    "description": "Stage new and modified files under current directory.",
    "explanation": "Does not remove deleted files outside cwd in older Git; prefer <code>git add -A</code> from root for full sync."
  },
  {
    "id": "git-add-a",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Stage everything",
    "command": "git add -A",
    "description": "Stage all changes in the repository (add, modify, delete).",
    "explanation": "Equivalent to staging the full intent of your working tree."
  },
  {
    "id": "git-add-p",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Patch staging",
    "command": "git add -p",
    "description": "Interactively choose hunks to stage.",
    "explanation": "Great for splitting unrelated edits into separate commits."
  },
  {
    "id": "git-reset",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Unstage / move HEAD",
    "command": "git reset",
    "description": "Reset current HEAD to the specified state (default: mixed).",
    "explanation": "Without commit: often unstages; with path: unstage file. See soft/mixed/hard."
  },
  {
    "id": "git-reset-soft-head1",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "advanced",
    "name": "Reset soft",
    "command": "git reset --soft HEAD~1",
    "description": "Move HEAD back; keep index and working tree.",
    "explanation": "Undoes commit but leaves changes staged."
  },
  {
    "id": "git-reset-mixed-head1",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "advanced",
    "name": "Reset mixed (default)",
    "command": "git reset --mixed HEAD~1",
    "description": "Move HEAD; unstage changes; keep working tree.",
    "explanation": "Default mode; most common for undoing commit but keeping edits."
  },
  {
    "id": "git-reset-hard-<commit>",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "advanced",
    "name": "Reset hard",
    "command": "git reset --hard <commit>",
    "description": "Move HEAD and discard index and working tree changes.",
    "explanation": "Destructive; cannot recover uncommitted work without reflog/backups."
  },
  {
    "id": "git-rm-<file>",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Remove file from repo",
    "command": "git rm <file>",
    "description": "Remove file from working tree and index.",
    "explanation": "Next commit records the deletion; use <code>--cached</code> to keep file on disk."
  },
  {
    "id": "git-rm-cached-<file>",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Stop tracking file",
    "command": "git rm --cached <file>",
    "description": "Remove file from index but keep on disk.",
    "explanation": "Use with .gitignore to ignore already-tracked files."
  },
  {
    "id": "git-mv-<old>-<new>",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Rename or move",
    "command": "git mv <old> <new>",
    "description": "Rename file and stage the change.",
    "explanation": "Equivalent to mv + git add -A on those paths."
  },
  {
    "id": "git-commit",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Create commit",
    "command": "git commit",
    "description": "Open editor to write message and create commit from index.",
    "explanation": "Requires staged changes unless using <code>-a</code> or <code>--allow-empty</code>."
  },
  {
    "id": "git-commit-2",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Commit with message",
    "command": "git commit -m \"message\"",
    "description": "Create a commit with the given message.",
    "explanation": "Keep subject line short; use body for details (second <code>-m</code>)."
  },
  {
    "id": "git-commit-am-message",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Commit all tracked",
    "command": "git commit -am \"message\"",
    "description": "Stage modified tracked files and commit in one step.",
    "explanation": "Does not add new untracked files."
  },
  {
    "id": "git-commit-amend",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Amend last commit",
    "command": "git commit --amend",
    "description": "Replace the last commit with new tree/message.",
    "explanation": "Rewrites history; avoid on shared branches without coordination."
  },
  {
    "id": "git-commit-allow-empty-m-message",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Empty commit",
    "command": "git commit --allow-empty -m \"message\"",
    "description": "Create a commit with no file changes.",
    "explanation": "Sometimes used to trigger CI or mark milestones."
  },
  {
    "id": "git-commit-no-verify",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Skip hooks",
    "command": "git commit --no-verify",
    "description": "Commit without running pre-commit / commit-msg hooks.",
    "explanation": "Use sparingly; hooks often enforce quality or policy."
  },
  {
    "id": "git-restore-<file>",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "beginner",
    "name": "Restore working tree",
    "command": "git restore <file>",
    "description": "Restore file in working tree from index or commit.",
    "explanation": "Modern replacement for <code>git checkout -- file</code>."
  },
  {
    "id": "git-restore-staged-<file>",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Unstage file",
    "command": "git restore --staged <file>",
    "description": "Remove file from index (keep working tree).",
    "explanation": "Pairs with <code>git restore</code> for discarding local edits."
  },
  {
    "id": "git-restore-source<commit>-<file>",
    "tool": "git",
    "category": "Basic Workflow",
    "level": "intermediate",
    "name": "Restore from commit",
    "command": "git restore --source=<commit> <file>",
    "description": "Restore file content from a specific revision.",
    "explanation": "Useful to bring back an old version without checkout."
  },
  {
    "id": "git-branch",
    "tool": "git",
    "category": "Branching",
    "level": "beginner",
    "name": "List local branches",
    "command": "git branch",
    "description": "List branches; current branch marked with *.",
    "explanation": "Add <code>-v</code> for last commit per branch."
  },
  {
    "id": "git-branch-2",
    "tool": "git",
    "category": "Branching",
    "level": "beginner",
    "name": "List all branches",
    "command": "git branch -a",
    "description": "List local and remote-tracking branches.",
    "explanation": "Helps see what exists locally and on remotes."
  },
  {
    "id": "git-branch-r",
    "tool": "git",
    "category": "Branching",
    "level": "intermediate",
    "name": "List remote branches",
    "command": "git branch -r",
    "description": "List remote-tracking branches only.",
    "explanation": "Shows refs like origin/main."
  },
  {
    "id": "git-branch-<name>",
    "tool": "git",
    "category": "Branching",
    "level": "beginner",
    "name": "Create branch",
    "command": "git branch <name>",
    "description": "Create a new branch pointing at current HEAD.",
    "explanation": "Does not switch; use <code>git switch</code> or <code>checkout</code> to move."
  },
  {
    "id": "git-branch-d-<name>",
    "tool": "git",
    "category": "Branching",
    "level": "intermediate",
    "name": "Delete merged branch",
    "command": "git branch -d <name>",
    "description": "Delete local branch if fully merged.",
    "explanation": "Safer than <code>-D</code>; fails if not merged."
  },
  {
    "id": "git-branch-d-<name>-2",
    "tool": "git",
    "category": "Branching",
    "level": "advanced",
    "name": "Force delete branch",
    "command": "git branch -D <name>",
    "description": "Delete local branch even if not merged.",
    "explanation": "May lose commits only reachable from that branch; check with <code>git log</code>."
  },
  {
    "id": "git-branch-m-<old>-<new>",
    "tool": "git",
    "category": "Branching",
    "level": "intermediate",
    "name": "Rename branch",
    "command": "git branch -m <old> <new>",
    "description": "Rename a branch (or current if one name given).",
    "explanation": "Useful after typo or naming conventions."
  },
  {
    "id": "git-branch-vv",
    "tool": "git",
    "category": "Branching",
    "level": "intermediate",
    "name": "Verbose branch info",
    "command": "git branch -vv",
    "description": "Show branches with upstream and last commit.",
    "explanation": "Helps debug tracking and out-of-date branches."
  },
  {
    "id": "git-checkout",
    "tool": "git",
    "category": "Branching",
    "level": "beginner",
    "name": "Switch branch (legacy)",
    "command": "git checkout <branch>",
    "description": "Switch to another branch or restore paths.",
    "explanation": "Prefer <code>git switch</code> for branches only."
  },
  {
    "id": "git-checkout-b-<branch>",
    "tool": "git",
    "category": "Branching",
    "level": "beginner",
    "name": "Create and switch",
    "command": "git checkout -b <branch>",
    "description": "Create branch at HEAD and switch to it.",
    "explanation": "Same as <code>git switch -c</code>."
  },
  {
    "id": "git-switch-<branch>",
    "tool": "git",
    "category": "Branching",
    "level": "beginner",
    "name": "Switch branch",
    "command": "git switch <branch>",
    "description": "Switch to an existing branch.",
    "explanation": "Clearer than checkout for branch operations."
  },
  {
    "id": "git-switch-c-<branch>",
    "tool": "git",
    "category": "Branching",
    "level": "beginner",
    "name": "Create branch and switch",
    "command": "git switch -c <branch>",
    "description": "Create and switch to new branch.",
    "explanation": "Can start from another commit: <code>git switch -c feat origin/main</code>."
  },
  {
    "id": "git-switch",
    "tool": "git",
    "category": "Branching",
    "level": "intermediate",
    "name": "Switch previous branch",
    "command": "git switch -",
    "description": "Switch to the previously checked-out branch.",
    "explanation": "Like <code>cd -</code> for branches."
  },
  {
    "id": "git-show-branch",
    "tool": "git",
    "category": "Branching",
    "level": "advanced",
    "name": "Show branch relationships",
    "command": "git show-branch",
    "description": "Display branches and their commit relationships.",
    "explanation": "ASCII graph of recent commits across branches."
  },
  {
    "id": "git-worktree",
    "tool": "git",
    "category": "Branching",
    "level": "advanced",
    "name": "Worktree overview",
    "command": "git worktree",
    "description": "Manage multiple working trees attached to one repo.",
    "explanation": "Allows checking out two branches in two folders simultaneously."
  },
  {
    "id": "git-worktree-add-../path-<branch>",
    "tool": "git",
    "category": "Branching",
    "level": "advanced",
    "name": "Add worktree",
    "command": "git worktree add ../path <branch>",
    "description": "Create new directory with another branch checked out.",
    "explanation": "Share same .git object database; efficient for parallel work."
  },
  {
    "id": "git-worktree-remove-<path>",
    "tool": "git",
    "category": "Branching",
    "level": "advanced",
    "name": "Remove worktree",
    "command": "git worktree remove <path>",
    "description": "Remove a linked working tree.",
    "explanation": "Ensure no uncommitted work or use <code>--force</code>."
  },
  {
    "id": "git-worktree-list",
    "tool": "git",
    "category": "Branching",
    "level": "intermediate",
    "name": "List worktrees",
    "command": "git worktree list",
    "description": "Show all worktrees and their branches.",
    "explanation": "Includes main repo path."
  },
  {
    "id": "git-merge",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "intermediate",
    "name": "Merge branch",
    "command": "git merge <branch>",
    "description": "Integrate another branch into the current branch.",
    "explanation": "Creates merge commit unless fast-forward is possible."
  },
  {
    "id": "git-merge-no-ff-<branch>",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "intermediate",
    "name": "Merge no fast-forward",
    "command": "git merge --no-ff <branch>",
    "description": "Always create a merge commit even if FF possible.",
    "explanation": "Preserves branch topology in history."
  },
  {
    "id": "git-merge-squash-<branch>",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "intermediate",
    "name": "Squash merge",
    "command": "git merge --squash <branch>",
    "description": "Combine changes as single staged snapshot (no merge commit yet).",
    "explanation": "Then <code>git commit</code> for one commit with all changes."
  },
  {
    "id": "git-merge-abort",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "intermediate",
    "name": "Abort merge",
    "command": "git merge --abort",
    "description": "Cancel an in-progress merge and restore pre-merge state.",
    "explanation": "Use after conflicts you want to abandon."
  },
  {
    "id": "git-rebase-<upstream>",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "advanced",
    "name": "Rebase onto branch",
    "command": "git rebase <upstream>",
    "description": "Replay commits from current branch on top of upstream.",
    "explanation": "Rewrites commits; coordinate before rebasing shared branches."
  },
  {
    "id": "git-rebase-i-headn",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "advanced",
    "name": "Interactive rebase",
    "command": "git rebase -i HEAD~n",
    "description": "Reorder, squash, edit, or drop last n commits.",
    "explanation": "Powerful history cleanup before merge or push."
  },
  {
    "id": "git-rebase-continue",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "advanced",
    "name": "Continue rebase",
    "command": "git rebase --continue",
    "description": "Continue after resolving conflicts during rebase.",
    "explanation": "Stages resolved files first."
  },
  {
    "id": "git-rebase-abort",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "advanced",
    "name": "Abort rebase",
    "command": "git rebase --abort",
    "description": "Cancel rebase and return to pre-rebase state.",
    "explanation": "Use when rebase goes wrong."
  },
  {
    "id": "git-rebase-skip",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "advanced",
    "name": "Skip commit in rebase",
    "command": "git rebase --skip",
    "description": "Skip current patch during rebase.",
    "explanation": "Use when commit is empty or should be dropped."
  },
  {
    "id": "git-cherry-pick-<commit>",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "intermediate",
    "name": "Cherry-pick commit",
    "command": "git cherry-pick <commit>",
    "description": "Apply a single commit onto current branch.",
    "explanation": "Useful for backporting fixes."
  },
  {
    "id": "git-cherry-pick-continue",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "advanced",
    "name": "Continue cherry-pick",
    "command": "git cherry-pick --continue",
    "description": "Continue after resolving cherry-pick conflicts.",
    "explanation": "Similar flow to merge/rebase."
  },
  {
    "id": "git-cherry-pick-abort",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "advanced",
    "name": "Abort cherry-pick",
    "command": "git cherry-pick --abort",
    "description": "Cancel cherry-pick operation.",
    "explanation": "Restores state before cherry-pick started."
  },
  {
    "id": "git-revert-<commit>",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "intermediate",
    "name": "Revert commit",
    "command": "git revert <commit>",
    "description": "Create a new commit that undoes a past commit.",
    "explanation": "Safe for shared history; does not rewrite past commits."
  },
  {
    "id": "git-revert-no-commit-<commit>",
    "tool": "git",
    "category": "Merging & Rebasing",
    "level": "intermediate",
    "name": "Revert without commit",
    "command": "git revert --no-commit <commit>",
    "description": "Apply revert to index/working tree without committing.",
    "explanation": "Batch multiple reverts into one commit."
  },
  {
    "id": "git-stash",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "Stash changes",
    "command": "git stash",
    "description": "Stash tracked modifications and staged changes.",
    "explanation": "Default: <code>git stash push</code>."
  },
  {
    "id": "git-stash-save-message",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "Stash with message",
    "command": "git stash save \"message\"",
    "description": "Legacy syntax to stash with description.",
    "explanation": "Prefer <code>git stash push -m</code> in modern Git."
  },
  {
    "id": "git-stash-push-m-msg-<paths>",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "Stash push options",
    "command": "git stash push -m \"msg\" -- <paths>",
    "description": "Stash with message and optional pathspec.",
    "explanation": "Use <code>-u</code> to include untracked files."
  },
  {
    "id": "git-stash-pop",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "Apply and drop stash",
    "command": "git stash pop",
    "description": "Apply latest stash and remove it from stash list.",
    "explanation": "Conflicts leave stash entry if apply fails."
  },
  {
    "id": "git-stash-apply",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "Apply stash",
    "command": "git stash apply",
    "description": "Apply stash but keep it in the list.",
    "explanation": "Use <code>stash@{n}</code> to pick a specific stash."
  },
  {
    "id": "git-stash-list",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "List stashes",
    "command": "git stash list",
    "description": "Show all stash entries.",
    "explanation": "Most recent is stash@{0}."
  },
  {
    "id": "git-stash-drop-stashn",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "Drop stash",
    "command": "git stash drop stash@{n}",
    "description": "Delete a single stash entry.",
    "explanation": "Cannot undo easily; ensure stash is applied or obsolete."
  },
  {
    "id": "git-stash-clear",
    "tool": "git",
    "category": "Stashing",
    "level": "advanced",
    "name": "Clear all stashes",
    "command": "git stash clear",
    "description": "Remove every stash entry.",
    "explanation": "Destructive; use with care."
  },
  {
    "id": "git-stash-show-p-stash0",
    "tool": "git",
    "category": "Stashing",
    "level": "intermediate",
    "name": "Show stash diff",
    "command": "git stash show -p stash@{0}",
    "description": "Display diff for a stash.",
    "explanation": "Default show is stat-only; <code>-p</code> for patch."
  },
  {
    "id": "git-stash-branch-<name>-stash0",
    "tool": "git",
    "category": "Stashing",
    "level": "advanced",
    "name": "Branch from stash",
    "command": "git stash branch <name> stash@{0}",
    "description": "Create branch starting at stash base and apply stash.",
    "explanation": "Useful if stash does not apply cleanly on current HEAD."
  },
  {
    "id": "git-log",
    "tool": "git",
    "category": "Logs & History",
    "level": "beginner",
    "name": "Commit log",
    "command": "git log",
    "description": "Show commit history.",
    "explanation": "Many options; pipe to <code>less</code> on long repos."
  },
  {
    "id": "git-log-oneline",
    "tool": "git",
    "category": "Logs & History",
    "level": "beginner",
    "name": "One-line log",
    "command": "git log --oneline",
    "description": "Compact one line per commit.",
    "explanation": "Often combined with <code>-n 20</code> or graph options."
  },
  {
    "id": "git-log-oneline-graph-all",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "ASCII graph",
    "command": "git log --oneline --graph --all",
    "description": "Visualize branch and merge structure.",
    "explanation": "Essential for understanding history shape."
  },
  {
    "id": "git-log-decorate",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Decorate refs",
    "command": "git log --decorate",
    "description": "Show branch and tag names on commits.",
    "explanation": "Often default in modern Git; explicit for scripts."
  },
  {
    "id": "git-log-stat",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Log with stats",
    "command": "git log --stat",
    "description": "Include file change statistics per commit.",
    "explanation": "Good middle ground between oneline and full patch."
  },
  {
    "id": "git-log-p",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Log with patch",
    "command": "git log -p",
    "description": "Show full diff for each commit.",
    "explanation": "Verbose; use with <code>-n</code> to limit."
  },
  {
    "id": "git-log-authorname",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Filter by author",
    "command": "git log --author=\"Name\"",
    "description": "Limit log to commits by author pattern.",
    "explanation": "Pattern matches author string, not just exact name."
  },
  {
    "id": "git-log-since2024-01-01",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Commits since date",
    "command": "git log --since=\"2024-01-01\"",
    "description": "Show commits after a date.",
    "explanation": "Also <code>--until</code> for upper bound."
  },
  {
    "id": "git-log-until2024-12-31",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Commits until date",
    "command": "git log --until=\"2024-12-31\"",
    "description": "Show commits before a date.",
    "explanation": "Combine with since for ranges."
  },
  {
    "id": "git-log-grepfix",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Search commit messages",
    "command": "git log --grep=\"fix\"",
    "description": "Filter commits whose message matches regex.",
    "explanation": "Use <code>-i</code> for case insensitive."
  },
  {
    "id": "git-log-p-<commit1>..<commit2>",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Patch for range",
    "command": "git log -p <commit1>..<commit2>",
    "description": "Show commits and diffs in range.",
    "explanation": "Two-dot range is symmetric difference contextually."
  },
  {
    "id": "git-shortlog-sn",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Summary by author",
    "command": "git shortlog -sn",
    "description": "Count commits grouped by author.",
    "explanation": "Useful for release notes and stats."
  },
  {
    "id": "git-reflog",
    "tool": "git",
    "category": "Logs & History",
    "level": "advanced",
    "name": "Reflog",
    "command": "git reflog",
    "description": "Show history of HEAD (and other refs) movements.",
    "explanation": "Recovery tool after reset or rebase; entries expire."
  },
  {
    "id": "git-show-<commit>",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Show object",
    "command": "git show <commit>",
    "description": "Show commit message and diff (or tag/blob).",
    "explanation": "Defaults to HEAD if commit omitted in some contexts."
  },
  {
    "id": "git-blame-<file>",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Line-by-line blame",
    "command": "git blame <file>",
    "description": "Show last commit that touched each line.",
    "explanation": "Use <code>-L</code> for line range."
  },
  {
    "id": "git-annotate-<file>",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Annotate file",
    "command": "git annotate <file>",
    "description": "Similar to blame (vendor-specific details may differ).",
    "explanation": "Often alias or identical to blame."
  },
  {
    "id": "git-describe",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Describe reachable tag",
    "command": "git describe",
    "description": "Human-readable name from nearest tag.",
    "explanation": "Outputs like v1.2-5-gabc1234 for distance from tag."
  },
  {
    "id": "git-bisect-start",
    "tool": "git",
    "category": "Logs & History",
    "level": "advanced",
    "name": "Bisect start",
    "command": "git bisect start",
    "description": "Begin binary search for bad commit.",
    "explanation": "Then mark good/bad commits to narrow regression."
  },
  {
    "id": "git-bisect-good-<commit>",
    "tool": "git",
    "category": "Logs & History",
    "level": "advanced",
    "name": "Bisect good",
    "command": "git bisect good <commit>",
    "description": "Mark commit as known good.",
    "explanation": "Git checks out midpoint between good and bad."
  },
  {
    "id": "git-bisect-bad-<commit>",
    "tool": "git",
    "category": "Logs & History",
    "level": "advanced",
    "name": "Bisect bad",
    "command": "git bisect bad <commit>",
    "description": "Mark commit as bad (or current).",
    "explanation": "Continue until first bad commit found."
  },
  {
    "id": "git-bisect-reset",
    "tool": "git",
    "category": "Logs & History",
    "level": "advanced",
    "name": "Bisect reset",
    "command": "git bisect reset",
    "description": "End bisect and return to original branch.",
    "explanation": "Run when finished or cancelling."
  },
  {
    "id": "git-remote",
    "tool": "git",
    "category": "Remote Operations",
    "level": "beginner",
    "name": "List remotes",
    "command": "git remote",
    "description": "Show remote short names.",
    "explanation": "Add <code>-v</code> for URLs."
  },
  {
    "id": "git-remote-2",
    "tool": "git",
    "category": "Remote Operations",
    "level": "beginner",
    "name": "Remote URLs",
    "command": "git remote -v",
    "description": "List remotes with fetch and push URLs.",
    "explanation": "Default remote is often origin."
  },
  {
    "id": "git-remote-add-origin-<url>",
    "tool": "git",
    "category": "Remote Operations",
    "level": "beginner",
    "name": "Add remote",
    "command": "git remote add origin <url>",
    "description": "Register a new remote.",
    "explanation": "Name can be anything; origin is convention."
  },
  {
    "id": "git-remote-remove-origin",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Remove remote",
    "command": "git remote remove origin",
    "description": "Delete remote configuration.",
    "explanation": "Does not delete remote server repo."
  },
  {
    "id": "git-remote-rename-old-new",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Rename remote",
    "command": "git remote rename old new",
    "description": "Rename a remote.",
    "explanation": "Updates remote-tracking branch names accordingly."
  },
  {
    "id": "git-fetch",
    "tool": "git",
    "category": "Remote Operations",
    "level": "beginner",
    "name": "Fetch updates",
    "command": "git fetch",
    "description": "Download objects and refs from remote without merging.",
    "explanation": "Updates remote-tracking branches; safe operation."
  },
  {
    "id": "git-fetch-all",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Fetch all remotes",
    "command": "git fetch --all",
    "description": "Fetch from every configured remote.",
    "explanation": "Useful in multi-remote setups."
  },
  {
    "id": "git-fetch-prune",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Fetch prune",
    "command": "git fetch --prune",
    "description": "Remove remote-tracking branches deleted on server.",
    "explanation": "Keeps local refs tidy."
  },
  {
    "id": "git-pull",
    "tool": "git",
    "category": "Remote Operations",
    "level": "beginner",
    "name": "Pull changes",
    "command": "git pull",
    "description": "Fetch and integrate into current branch.",
    "explanation": "Default merge; can be configured to rebase."
  },
  {
    "id": "git-pull-rebase",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Pull with rebase",
    "command": "git pull --rebase",
    "description": "Fetch then rebase local commits on top.",
    "explanation": "Cleaner linear history on shared branches when agreed."
  },
  {
    "id": "git-push",
    "tool": "git",
    "category": "Remote Operations",
    "level": "beginner",
    "name": "Push commits",
    "command": "git push",
    "description": "Upload local commits to remote.",
    "explanation": "Requires upstream set or remote and refspec."
  },
  {
    "id": "git-push-u-origin-<branch>",
    "tool": "git",
    "category": "Remote Operations",
    "level": "beginner",
    "name": "Push set upstream",
    "command": "git push -u origin <branch>",
    "description": "Push and set upstream tracking branch.",
    "explanation": "After first push, plain <code>git push</code> works."
  },
  {
    "id": "git-push-force",
    "tool": "git",
    "category": "Remote Operations",
    "level": "advanced",
    "name": "Force push",
    "command": "git push --force",
    "description": "Overwrite remote branch (dangerous).",
    "explanation": "Can lose others work; avoid on shared branches."
  },
  {
    "id": "git-push-force-with-lease",
    "tool": "git",
    "category": "Remote Operations",
    "level": "advanced",
    "name": "Force with lease",
    "command": "git push --force-with-lease",
    "description": "Force push only if remote unchanged since fetch.",
    "explanation": "Safer than --force; prevents clobbering unknown updates."
  },
  {
    "id": "git-push-tags",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Push all tags",
    "command": "git push --tags",
    "description": "Push all local tags to remote.",
    "explanation": "Does not push branches by default."
  },
  {
    "id": "git-push-origin-delete-<branch>",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Delete remote branch",
    "command": "git push origin --delete <branch>",
    "description": "Remove branch on remote.",
    "explanation": "Or <code>git push origin :branch</code> refspec syntax."
  },
  {
    "id": "git-remote-show-origin",
    "tool": "git",
    "category": "Remote Operations",
    "level": "intermediate",
    "name": "Remote details",
    "command": "git remote show origin",
    "description": "Display remote branches, tracking, and fetch/push URLs.",
    "explanation": "Helps verify configuration."
  },
  {
    "id": "git-tag",
    "tool": "git",
    "category": "Tags",
    "level": "beginner",
    "name": "List tags",
    "command": "git tag",
    "description": "List tags (optional pattern).",
    "explanation": "Lightweight tags are names only; annotated carry message and signer."
  },
  {
    "id": "git-tag-l-v1.",
    "tool": "git",
    "category": "Tags",
    "level": "beginner",
    "name": "List matching tags",
    "command": "git tag -l \"v1.*\"",
    "description": "List tags matching glob pattern.",
    "explanation": "Quotes prevent shell glob expansion."
  },
  {
    "id": "git-tag-a-v1.0-m-release-1.0",
    "tool": "git",
    "category": "Tags",
    "level": "intermediate",
    "name": "Annotated tag",
    "command": "git tag -a v1.0 -m \"Release 1.0\"",
    "description": "Create signed or annotated tag object.",
    "explanation": "Preferred for releases; includes metadata."
  },
  {
    "id": "git-tag-d-v1.0",
    "tool": "git",
    "category": "Tags",
    "level": "intermediate",
    "name": "Delete local tag",
    "command": "git tag -d v1.0",
    "description": "Remove tag locally.",
    "explanation": "Also delete on remote with push refspec."
  },
  {
    "id": "git-tag-f-v1.0-<commit>",
    "tool": "git",
    "category": "Tags",
    "level": "advanced",
    "name": "Force tag move",
    "command": "git tag -f v1.0 <commit>",
    "description": "Move tag to different commit (force).",
    "explanation": "Coordinate with team; update remote explicitly."
  },
  {
    "id": "git-push-origin-tags",
    "tool": "git",
    "category": "Tags",
    "level": "intermediate",
    "name": "Push all tags",
    "command": "git push origin --tags",
    "description": "Push tags to remote.",
    "explanation": "Complement to branch pushes."
  },
  {
    "id": "git-push-origin-refs/tags/v1.0",
    "tool": "git",
    "category": "Tags",
    "level": "intermediate",
    "name": "Delete remote tag",
    "command": "git push origin :refs/tags/v1.0",
    "description": "Delete tag on remote via refspec.",
    "explanation": "Syntax deletes ref on remote side."
  },
  {
    "id": "git-show-v1.0",
    "tool": "git",
    "category": "Tags",
    "level": "intermediate",
    "name": "Show tag",
    "command": "git show v1.0",
    "description": "Display tag object and target.",
    "explanation": "Annotated tags show message and commit."
  },
  {
    "id": "git-diff",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "beginner",
    "name": "Unstaged diff",
    "command": "git diff",
    "description": "Diff working tree vs index.",
    "explanation": "See what is not yet staged."
  },
  {
    "id": "git-diff-staged",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "intermediate",
    "name": "Staged diff",
    "command": "git diff --staged",
    "description": "Diff index vs last commit (what will be committed).",
    "explanation": "Same as <code>--cached</code>."
  },
  {
    "id": "git-diff-head",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "intermediate",
    "name": "Diff vs HEAD",
    "command": "git diff HEAD",
    "description": "Show all changes vs last commit.",
    "explanation": "Includes staged and unstaged."
  },
  {
    "id": "git-diff-name-only",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "intermediate",
    "name": "Changed files only",
    "command": "git diff --name-only",
    "description": "List only paths that differ.",
    "explanation": "Good for scripting."
  },
  {
    "id": "git-diff-stat",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "intermediate",
    "name": "Diff stat",
    "command": "git diff --stat",
    "description": "Summary of files and line counts.",
    "explanation": "Quick overview before full patch."
  },
  {
    "id": "git-diff-branch1..branch2",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "intermediate",
    "name": "Diff two branches",
    "command": "git diff branch1..branch2",
    "description": "Compare tips of two branches.",
    "explanation": "Three-dot syntax differs; two-dot is symmetric diff range."
  },
  {
    "id": "git-diff-commit1-commit2",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "intermediate",
    "name": "Diff two commits",
    "command": "git diff commit1 commit2",
    "description": "Diff between any two commits.",
    "explanation": "Order matters: shows path from first to second."
  },
  {
    "id": "git-difftool",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "intermediate",
    "name": "External difftool",
    "command": "git difftool",
    "description": "Open visual diff tool for conflicts or diffs.",
    "explanation": "Configure merge.tool / diff.tool."
  },
  {
    "id": "git-range-diff",
    "tool": "git",
    "category": "Diff & Comparison",
    "level": "advanced",
    "name": "Range diff",
    "command": "git range-diff",
    "description": "Compare two commit ranges (e.g. rebased vs original).",
    "explanation": "Useful after interactive rebase."
  },
  {
    "id": "git-clean-n",
    "tool": "git",
    "category": "Cleaning & Maintenance",
    "level": "advanced",
    "name": "Preview clean",
    "command": "git clean -n",
    "description": "Show what would be removed (dry run).",
    "explanation": "Always run before <code>-f</code>."
  },
  {
    "id": "git-clean-f",
    "tool": "git",
    "category": "Cleaning & Maintenance",
    "level": "advanced",
    "name": "Remove untracked",
    "command": "git clean -f",
    "description": "Delete untracked files.",
    "explanation": "Irreversible; does not touch ignored by default."
  },
  {
    "id": "git-clean-fd",
    "tool": "git",
    "category": "Cleaning & Maintenance",
    "level": "advanced",
    "name": "Remove untracked dirs",
    "command": "git clean -fd",
    "description": "Remove untracked files and directories.",
    "explanation": "Still respects .gitignore unless <code>-x</code>."
  },
  {
    "id": "git-gc",
    "tool": "git",
    "category": "Cleaning & Maintenance",
    "level": "intermediate",
    "name": "Garbage collect",
    "command": "git gc",
    "description": "Pack objects and prune unreachable loose objects.",
    "explanation": "Run periodically; improves performance."
  },
  {
    "id": "git-gc-aggressive",
    "tool": "git",
    "category": "Cleaning & Maintenance",
    "level": "advanced",
    "name": "Aggressive GC",
    "command": "git gc --aggressive",
    "description": "More thorough repack (slower).",
    "explanation": "Rarely needed; try normal gc first."
  },
  {
    "id": "git-fsck",
    "tool": "git",
    "category": "Cleaning & Maintenance",
    "level": "advanced",
    "name": "Verify integrity",
    "command": "git fsck",
    "description": "Check object database integrity.",
    "explanation": "Finds dangling commits and corruption."
  },
  {
    "id": "git-prune",
    "tool": "git",
    "category": "Cleaning & Maintenance",
    "level": "advanced",
    "name": "Prune unreachable",
    "command": "git prune",
    "description": "Remove loose unreachable objects.",
    "explanation": "Usually invoked by gc; low-level."
  },
  {
    "id": "git-maintenance-start",
    "tool": "git",
    "category": "Maintenance",
    "level": "advanced",
    "name": "Maintenance CLI",
    "command": "git maintenance start",
    "description": "Register scheduled maintenance for repo.",
    "explanation": "Git 2.30+; automates gc and prefetch."
  },
  {
    "id": "git-maintenance-stop",
    "tool": "git",
    "category": "Maintenance",
    "level": "advanced",
    "name": "Stop maintenance",
    "command": "git maintenance stop",
    "description": "Disable scheduled maintenance tasks.",
    "explanation": "Per-repo configuration."
  },
  {
    "id": "git-submodule",
    "tool": "git",
    "category": "Submodules",
    "level": "intermediate",
    "name": "Submodule status",
    "command": "git submodule",
    "description": "Show submodule summary or subcommands help.",
    "explanation": "Submodules pin external repos at specific commits."
  },
  {
    "id": "git-submodule-add-<url>-path",
    "tool": "git",
    "category": "Submodules",
    "level": "intermediate",
    "name": "Add submodule",
    "command": "git submodule add <url> path",
    "description": "Clone repo into path and record in .gitmodules.",
    "explanation": "Commit both .gitmodules and gitlink."
  },
  {
    "id": "git-submodule-init",
    "tool": "git",
    "category": "Submodules",
    "level": "intermediate",
    "name": "Init submodules",
    "command": "git submodule init",
    "description": "Initialize submodule config from .gitmodules.",
    "explanation": "Often followed by update."
  },
  {
    "id": "git-submodule-update",
    "tool": "git",
    "category": "Submodules",
    "level": "intermediate",
    "name": "Update submodules",
    "command": "git submodule update",
    "description": "Checkout commits recorded in superproject.",
    "explanation": "Use <code>--recursive</code> for nested submodules."
  },
  {
    "id": "git-submodule-update-remote",
    "tool": "git",
    "category": "Submodules",
    "level": "advanced",
    "name": "Update to remote tip",
    "command": "git submodule update --remote",
    "description": "Fetch and update submodule to remote tracking branch.",
    "explanation": "Changes superproject pointer when committed."
  },
  {
    "id": "git-submodule-foreach-git-pull",
    "tool": "git",
    "category": "Submodules",
    "level": "advanced",
    "name": "Command in each submodule",
    "command": "git submodule foreach git pull",
    "description": "Run shell command in every submodule.",
    "explanation": "Powerful for bulk operations."
  },
  {
    "id": "git-submodule-deinit-path",
    "tool": "git",
    "category": "Submodules",
    "level": "advanced",
    "name": "Deinit submodule",
    "command": "git submodule deinit path",
    "description": "Unregister submodule working tree.",
    "explanation": "Does not remove submodule section from .gitmodules until manual edit."
  },
  {
    "id": "git-format-patch-origin/main",
    "tool": "git",
    "category": "Patch & Apply",
    "level": "advanced",
    "name": "Format patches",
    "command": "git format-patch origin/main",
    "description": "Create mailbox-style patches for each commit.",
    "explanation": "For email or code review workflows."
  },
  {
    "id": "git-apply-patch.diff",
    "tool": "git",
    "category": "Patch & Apply",
    "level": "intermediate",
    "name": "Apply patch file",
    "command": "git apply patch.diff",
    "description": "Apply a unified diff to working tree.",
    "explanation": "Does not create commits; use <code>git am</code> for that."
  },
  {
    "id": "git-am-<-patches.mbox",
    "tool": "git",
    "category": "Patch & Apply",
    "level": "advanced",
    "name": "Apply mailbox",
    "command": "git am < patches.mbox",
    "description": "Apply series of patches as commits.",
    "explanation": "Preserves author/date from patch headers."
  },
  {
    "id": "git-am-continue",
    "tool": "git",
    "category": "Patch & Apply",
    "level": "advanced",
    "name": "Continue am",
    "command": "git am --continue",
    "description": "Continue after resolving apply conflicts.",
    "explanation": "Stage resolved files first."
  },
  {
    "id": "git-am-abort",
    "tool": "git",
    "category": "Patch & Apply",
    "level": "advanced",
    "name": "Abort am",
    "command": "git am --abort",
    "description": "Cancel patch application series.",
    "explanation": "Returns to state before git am."
  },
  {
    "id": "git-am-skip",
    "tool": "git",
    "category": "Patch & Apply",
    "level": "advanced",
    "name": "Skip patch in am",
    "command": "git am --skip",
    "description": "Skip current patch in series.",
    "explanation": "Use when patch already upstream."
  },
  {
    "id": "git-archive-formatzip-head-o-out.zip",
    "tool": "git",
    "category": "Archive & Bundle",
    "level": "intermediate",
    "name": "Export tree archive",
    "command": "git archive --format=zip HEAD -o out.zip",
    "description": "Create archive of tree at revision.",
    "explanation": "Excludes .git; good for source releases."
  },
  {
    "id": "git-bundle-create-repo.bundle-all",
    "tool": "git",
    "category": "Archive & Bundle",
    "level": "advanced",
    "name": "Create bundle",
    "command": "git bundle create repo.bundle --all",
    "description": "Package refs and objects for offline transfer.",
    "explanation": "Move repo without network access."
  },
  {
    "id": "git-bundle-verify-repo.bundle",
    "tool": "git",
    "category": "Archive & Bundle",
    "level": "advanced",
    "name": "Verify bundle",
    "command": "git bundle verify repo.bundle",
    "description": "Check bundle file integrity.",
    "explanation": "Before clone or fetch from bundle."
  },
  {
    "id": "git-bundle-list-heads-repo.bundle",
    "tool": "git",
    "category": "Archive & Bundle",
    "level": "advanced",
    "name": "List bundle heads",
    "command": "git bundle list-heads repo.bundle",
    "description": "Show branch tips contained in bundle.",
    "explanation": "Plan unbundle or fetch."
  },
  {
    "id": "git-bundle-unbundle-repo.bundle",
    "tool": "git",
    "category": "Archive & Bundle",
    "level": "advanced",
    "name": "Unbundle",
    "command": "git bundle unbundle repo.bundle",
    "description": "Extract refs from bundle into repository.",
    "explanation": "Lower-level; often use <code>git clone repo.bundle</code>."
  },
  {
    "id": "git-help-githooks",
    "tool": "git",
    "category": "Hooks & Debugging",
    "level": "intermediate",
    "name": "Hooks location",
    "command": "git help githooks",
    "description": "Documentation for server and client hook scripts.",
    "explanation": "Hooks live under .git/hooks (samples with .sample suffix)."
  },
  {
    "id": "git-var-git_author_ident",
    "tool": "git",
    "category": "Hooks & Debugging",
    "level": "intermediate",
    "name": "Git environment variables",
    "command": "git var GIT_AUTHOR_IDENT",
    "description": "Print expanded value of a Git logical variable.",
    "explanation": "Useful for debugging identity and paths."
  },
  {
    "id": "git-help",
    "tool": "git",
    "category": "Hooks & Debugging",
    "level": "beginner",
    "name": "Help overview",
    "command": "git help",
    "description": "List common Git commands and guides.",
    "explanation": "Gateway to documentation."
  },
  {
    "id": "git-help-<command>",
    "tool": "git",
    "category": "Hooks & Debugging",
    "level": "beginner",
    "name": "Help command",
    "command": "git help <command>",
    "description": "Open manpage or HTML help for command.",
    "explanation": "Same as <code>git <command> --help</code>."
  },
  {
    "id": "git-version",
    "tool": "git",
    "category": "Hooks & Debugging",
    "level": "beginner",
    "name": "Git version",
    "command": "git version",
    "description": "Show installed Git version.",
    "explanation": "Include in bug reports."
  },
  {
    "id": "git-diagnose",
    "tool": "git",
    "category": "Hooks & Debugging",
    "level": "intermediate",
    "name": "Diagnose",
    "command": "git diagnose",
    "description": "Collect environment info for bug reports (newer Git).",
    "explanation": "May not exist on very old versions."
  },
  {
    "id": "git-sparse-checkout",
    "tool": "git",
    "category": "Sparse Checkout",
    "level": "advanced",
    "name": "Sparse checkout",
    "command": "git sparse-checkout",
    "description": "Restrict working tree to subset of files.",
    "explanation": "Common with monorepos; requires cone/patterns config."
  },
  {
    "id": "git-sparse-checkout-init",
    "tool": "git",
    "category": "Sparse Checkout",
    "level": "advanced",
    "name": "Init sparse",
    "command": "git sparse-checkout init",
    "description": "Enable sparse checkout in repo.",
    "explanation": "Then use set to define paths."
  },
  {
    "id": "git-sparse-checkout-set-path1-path2",
    "tool": "git",
    "category": "Sparse Checkout",
    "level": "advanced",
    "name": "Set sparse paths",
    "command": "git sparse-checkout set path1 path2",
    "description": "Define which paths populate working tree.",
    "explanation": "Non-matching paths removed from working tree."
  },
  {
    "id": "git-sparse-checkout-disable",
    "tool": "git",
    "category": "Sparse Checkout",
    "level": "advanced",
    "name": "Disable sparse",
    "command": "git sparse-checkout disable",
    "description": "Turn off sparse checkout and restore full tree.",
    "explanation": "May take time on large repos."
  },
  {
    "id": "git-replace-<bad>-<good>",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Replace objects",
    "command": "git replace <bad> <good>",
    "description": "Substitute one object for another locally.",
    "explanation": "History rewriting aid; use with care."
  },
  {
    "id": "git-filter-branch",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Filter branch (legacy)",
    "command": "git filter-branch",
    "description": "Rewrite history with filters (deprecated).",
    "explanation": "Prefer git-filter-repo for large or complex rewrites."
  },
  {
    "id": "git-filter-repo",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Filter repository",
    "command": "git filter-repo",
    "description": "Third-party powerful history rewriter (install separately).",
    "explanation": "Replacement for filter-branch; not bundled in all Git installs."
  },
  {
    "id": "git-notes-add-m-note-<commit>",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Notes add",
    "command": "git notes add -m \"note\" <commit>",
    "description": "Attach note to commit without changing commit hash.",
    "explanation": "Stored separately; visible in log with notes ref."
  },
  {
    "id": "git-notes-show-<commit>",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Notes show",
    "command": "git notes show <commit>",
    "description": "Display note for commit.",
    "explanation": "Empty if no note."
  },
  {
    "id": "git-notes-remove-<commit>",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Notes remove",
    "command": "git notes remove <commit>",
    "description": "Delete note for commit.",
    "explanation": "Updates notes ref."
  },
  {
    "id": "git-notes-list",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Notes list",
    "command": "git notes list",
    "description": "List notes in default notes namespace.",
    "explanation": "Integrate with code review tools."
  },
  {
    "id": "git-rerere-status",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Rerere status",
    "command": "git rerere status",
    "description": "Show conflict resolution reuse status.",
    "explanation": "rerere records how you resolved conflicts."
  },
  {
    "id": "git-rerere-diff",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Rerere diff",
    "command": "git rerere diff",
    "description": "Show current conflict diff rerere would use.",
    "explanation": "Debugging rerere."
  },
  {
    "id": "git-rerere-clear",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Rerere clear",
    "command": "git rerere clear",
    "description": "Clear rerere cache.",
    "explanation": "Rare maintenance."
  },
  {
    "id": "git-rerere-forget-<path>",
    "tool": "git",
    "category": "Advanced / Rare",
    "level": "advanced",
    "name": "Rerere forget",
    "command": "git rerere forget <path>",
    "description": "Discard recorded resolution for path.",
    "explanation": "Before trying a different resolution."
  },
  {
    "id": "git-hash-object-w-file",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Hash object",
    "command": "git hash-object -w file",
    "description": "Compute object ID; -w stores blob in object db.",
    "explanation": "Building blocks for low-level tools."
  },
  {
    "id": "git-cat-file-p-<sha>",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Cat object",
    "command": "git cat-file -p <sha>",
    "description": "Print content of object by SHA.",
    "explanation": "-t for type, -s for size."
  },
  {
    "id": "git-update-index",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Update index",
    "command": "git update-index",
    "description": "Manipulate index entries directly.",
    "explanation": "Used by scripts and advanced workflows."
  },
  {
    "id": "git-write-tree",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Write tree",
    "command": "git write-tree",
    "description": "Create tree object from current index.",
    "explanation": "Returns tree SHA."
  },
  {
    "id": "git-read-tree",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Read tree",
    "command": "git read-tree",
    "description": "Populate index from tree object.",
    "explanation": "Used in scripted commits."
  },
  {
    "id": "git-commit-tree",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Commit tree",
    "command": "git commit-tree",
    "description": "Create commit object from tree and parents.",
    "explanation": "Low-level commit creation."
  },
  {
    "id": "git-rev-parse-<ref>",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Rev parse",
    "command": "git rev-parse <ref>",
    "description": "Resolve ref to full SHA.",
    "explanation": "Essential in shell scripts around Git."
  },
  {
    "id": "git-rev-list",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Rev list",
    "command": "git rev-list",
    "description": "List commit objects reachable from revs.",
    "explanation": "Powers log and automation."
  },
  {
    "id": "git-show-ref",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Show ref",
    "command": "git show-ref",
    "description": "List refs in repository.",
    "explanation": "Useful for debugging refs."
  },
  {
    "id": "git-symbolic-ref-head",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Symbolic ref",
    "command": "git symbolic-ref HEAD",
    "description": "Show or set symbolic ref (e.g. HEAD).",
    "explanation": "HEAD usually points to branch name."
  },
  {
    "id": "git-update-ref-refs/heads/main-<new-sha>",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Update ref",
    "command": "git update-ref refs/heads/main <new-sha>",
    "description": "Move branch ref to commit.",
    "explanation": "Low-level branch manipulation."
  },
  {
    "id": "git-for-each-ref",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "For each ref",
    "command": "git for-each-ref",
    "description": "Iterate refs with format strings.",
    "explanation": "Scripting-friendly ref listing."
  },
  {
    "id": "git-ls-files",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "List files (index)",
    "command": "git ls-files",
    "description": "Show files in index.",
    "explanation": "Options for status simulation."
  },
  {
    "id": "git-ls-tree-<tree>",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "List tree",
    "command": "git ls-tree <tree>",
    "description": "List entries in tree object.",
    "explanation": "Inspect tree without checkout."
  },
  {
    "id": "git-check-ignore-v-path",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "intermediate",
    "name": "Check ignore rules",
    "command": "git check-ignore -v path",
    "description": "Show why path is ignored.",
    "explanation": "Debug .gitignore issues."
  },
  {
    "id": "git-mktag",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Make tag object",
    "command": "git mktag",
    "description": "Create tag object from stdin.",
    "explanation": "Plumbing for custom tools."
  },
  {
    "id": "git-unpack-objects",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Unpack objects",
    "command": "git unpack-objects",
    "description": "Write loose objects from pack stream.",
    "explanation": "Recovery or import."
  },
  {
    "id": "git-pack-objects",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Pack objects",
    "command": "git pack-objects",
    "description": "Build pack files from set of objects.",
    "explanation": "Used by gc and transfer."
  },
  {
    "id": "git-index-pack-pack.pack",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Index pack",
    "command": "git index-pack pack.pack",
    "description": "Build pack index for packfile.",
    "explanation": "Verify downloaded packs."
  },
  {
    "id": "git-verify-pack-v-pack.idx",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Verify pack",
    "command": "git verify-pack -v pack.idx",
    "description": "Validate pack integrity.",
    "explanation": "Deep diagnostics."
  },
  {
    "id": "git-count-objects",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "intermediate",
    "name": "Count objects",
    "command": "git count-objects",
    "description": "Report object database disk usage.",
    "explanation": "See loose vs packed."
  },
  {
    "id": "git-reflog-expire-expire90.days-refs/heads/main",
    "tool": "git",
    "category": "Plumbing (low-level)",
    "level": "advanced",
    "name": "Expire reflog",
    "command": "git reflog expire --expire=90.days refs/heads/main",
    "description": "Prune old reflog entries.",
    "explanation": "Part of maintenance."
  },
  {
    "id": "git-grep-pattern",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "intermediate",
    "name": "Search tracked files",
    "command": "git grep \"pattern\"",
    "description": "Search working tree version of tracked files.",
    "explanation": "Fast; respects line endings in repo."
  },
  {
    "id": "git-instaweb",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "advanced",
    "name": "Instaweb",
    "command": "git instaweb",
    "description": "Start temporary web server browsing repo (if configured).",
    "explanation": "Requires lighttpd/apache etc.; rarely used today."
  },
  {
    "id": "git-request-pull-start-url",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "advanced",
    "name": "Request pull summary",
    "command": "git request-pull start url",
    "description": "Generate summary text for pull request email.",
    "explanation": "Legacy distributed workflow helper."
  },
  {
    "id": "git-whatchanged",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "intermediate",
    "name": "What changed (legacy)",
    "command": "git whatchanged",
    "description": "Show commits with diffstat (legacy interface).",
    "explanation": "Prefer <code>git log</code> with options."
  },
  {
    "id": "git-daemon-export-all-base-path/srv/git",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "advanced",
    "name": "Git daemon",
    "command": "git daemon --export-all --base-path=/srv/git",
    "description": "Serve repositories over git:// protocol.",
    "explanation": "Use with caution; network exposure."
  },
  {
    "id": "git-serve",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "advanced",
    "name": "Backend for remote helpers",
    "command": "git serve",
    "description": "Low-level command for protocol experiments.",
    "explanation": "Not typical daily use."
  },
  {
    "id": "git-fast-export",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "advanced",
    "name": "Fast export",
    "command": "git fast-export",
    "description": "Stream repository history in fast-import format.",
    "explanation": "Migration between VCS or repos."
  },
  {
    "id": "git-fast-import",
    "tool": "git",
    "category": "Workflows & Utilities",
    "level": "advanced",
    "name": "Fast import",
    "command": "git fast-import",
    "description": "Import stream to create history.",
    "explanation": "Pair with fast-export for transforms."
  },
  {
    "id": "git-log-p-2",
    "tool": "git",
    "category": "Logs & History",
    "level": "intermediate",
    "name": "Log patch alias",
    "command": "git log -p -2",
    "description": "Last two commits with full patch.",
    "explanation": "Same as <code>--patch</code> limit."
  }
];

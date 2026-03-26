/**
 * Linux command reference — expanded catalog with categories (see ### headers in scripts/gen-linux.mjs).
 * Merged into COMMANDS_DATA in commands.js.
 */
export const LINUX_COMMANDS = [
  {
    "id": "linux-ls",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "List directory",
    "command": "ls",
    "description": "List files and folders in the current directory.",
    "explanation": "Add flags: <code>-l</code> long, <code>-a</code> hidden, <code>-h</code> sizes."
  },
  {
    "id": "linux-ls-l",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Long listing",
    "command": "ls -l",
    "description": "Detailed list: permissions, links, owner, size, time, name.",
    "explanation": "Use <code>ls -lt</code> to sort by time."
  },
  {
    "id": "linux-ls-a",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "List including hidden",
    "command": "ls -a",
    "description": "Shows names starting with <code>.</code> (hidden files).",
    "explanation": "Often combined: <code>ls -la</code>."
  },
  {
    "id": "linux-ls-lh",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Human-readable sizes",
    "command": "ls -lh",
    "description": "Long format with sizes in KB/MB/GB instead of raw bytes.",
    "explanation": "Very common daily command."
  },
  {
    "id": "linux-pwd",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Print working directory",
    "command": "pwd",
    "description": "Prints the full path of the current directory.",
    "explanation": "Use in scripts to anchor paths."
  },
  {
    "id": "linux-cd-pathtodir",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Change directory",
    "command": "cd /path/to/dir",
    "description": "Change the shell working directory.",
    "explanation": "Without args, behavior depends on shell; often same as <code>cd ~</code>."
  },
  {
    "id": "linux-cd-..",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Parent directory",
    "command": "cd ..",
    "description": "Go up one directory level.",
    "explanation": "Chain: <code>cd ../..</code>"
  },
  {
    "id": "linux-cd",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Home directory",
    "command": "cd ~",
    "description": "Go to your home directory (tilde expansion).",
    "explanation": "Also <code>cd</code> alone in bash often goes home."
  },
  {
    "id": "linux-mkdir-dirname",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Create directory",
    "command": "mkdir dirname",
    "description": "Create a single empty directory.",
    "explanation": "Fails if parent path missing unless <code>-p</code>."
  },
  {
    "id": "linux-mkdir-p-abc",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Create parent dirs",
    "command": "mkdir -p a/b/c",
    "description": "Create directory and any missing parents; no error if exists.",
    "explanation": "Essential in scripts."
  },
  {
    "id": "linux-rmdir-dirname",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Remove empty directory",
    "command": "rmdir dirname",
    "description": "Remove a directory only if it is empty.",
    "explanation": "For non-empty dirs use <code>rm -r</code> (careful)."
  },
  {
    "id": "linux-rm-file",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Remove files",
    "command": "rm file",
    "description": "Delete files. Irreversible on most filesystems.",
    "explanation": "Use <code>-i</code> for interactive prompts."
  },
  {
    "id": "linux-rm-rf-path",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Remove recursively",
    "command": "rm -rf path",
    "description": "Recursive force delete—very dangerous if path is wrong.",
    "explanation": "Double-check path; prefer <code>rm -ri</code> when unsure."
  },
  {
    "id": "linux-cp-source-dest",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Copy files",
    "command": "cp source dest",
    "description": "Copy a file or directory (with <code>-r</code>).",
    "explanation": "<code>-p</code> preserve mode/time; <code>-a</code> archive mode."
  },
  {
    "id": "linux-cp-r-srcdir-destdir",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Copy directory",
    "command": "cp -r srcdir destdir",
    "description": "Recursively copy a directory tree.",
    "explanation": "Trailing slashes matter for behavior—see <code>man cp</code>."
  },
  {
    "id": "linux-mv-old-new",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Move or rename",
    "command": "mv old new",
    "description": "Rename file/dir or move to another location.",
    "explanation": "Same inode rename when on same filesystem."
  },
  {
    "id": "linux-touch-file",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Touch file",
    "command": "touch file",
    "description": "Create empty file or update modification time.",
    "explanation": "Multiple files: <code>touch a b c</code>"
  },
  {
    "id": "linux-file-path",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Guess file type",
    "command": "file path",
    "description": "Shows file type using magic bytes and heuristics.",
    "explanation": "Useful for unknown binaries or scripts without extension."
  },
  {
    "id": "linux-stat-file",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "File metadata",
    "command": "stat file",
    "description": "Inode, size, blocks, access/modify times, etc.",
    "explanation": "Format: <code>stat -c '%y' file</code> in GNU stat."
  },
  {
    "id": "linux-tree",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Directory tree",
    "command": "tree",
    "description": "Display directory structure as a tree.",
    "explanation": "May need install: <code>apt install tree</code>."
  },
  {
    "id": "linux-basename-pathtofile.txt",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Strip path",
    "command": "basename /path/to/file.txt",
    "description": "Print final component of a path.",
    "explanation": "Often in scripts with variables."
  },
  {
    "id": "linux-dirname-pathtofile.txt",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Strip filename",
    "command": "dirname /path/to/file.txt",
    "description": "Print directory portion of a path.",
    "explanation": "Pairs with <code>basename</code>."
  },
  {
    "id": "linux-realpath-path",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Canonical path",
    "command": "realpath path",
    "description": "Resolve symlinks and print absolute path.",
    "explanation": "GNU and BSD variants differ slightly."
  },
  {
    "id": "linux-readlink-link",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Symlink target",
    "command": "readlink link",
    "description": "Print symlink target; <code>-f</code> canonicalize (GNU).",
    "explanation": "Useful when debugging links."
  },
  {
    "id": "linux-ln-target-linkname",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Hard link",
    "command": "ln target linkname",
    "description": "Create hard link (same inode).",
    "explanation": "Cannot cross filesystems; not for directories usually."
  },
  {
    "id": "linux-ln-s-target-linkname",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Symbolic link",
    "command": "ln -s target linkname",
    "description": "Create symlink pointing to target.",
    "explanation": "Relative targets are stored as given."
  },
  {
    "id": "linux-du-path",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "Disk usage",
    "command": "du path",
    "description": "Estimate space used by files under path.",
    "explanation": "Combine with <code>-sh</code> for summary."
  },
  {
    "id": "linux-du-sh",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Summary human size",
    "command": "du -sh *",
    "description": "Human-readable total per argument.",
    "explanation": "Common: <code>du -sh /var/log</code>"
  },
  {
    "id": "linux-du-h-path",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "du human sizes",
    "command": "du -h path",
    "description": "Human-readable sizes per path.",
    "explanation": "Often combined with <code>-s</code> for total."
  },
  {
    "id": "linux-df",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "Filesystem space",
    "command": "df",
    "description": "Report space on mounted filesystems.",
    "explanation": "Shows blocks or percent used per mount."
  },
  {
    "id": "linux-df-h",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "beginner",
    "name": "df human-readable",
    "command": "df -h",
    "description": "Sizes in KB/MB/GB for readability.",
    "explanation": "Check disk full issues quickly."
  },
  {
    "id": "linux-df-t",
    "tool": "linux",
    "category": "Files & navigation",
    "level": "intermediate",
    "name": "df with fstype",
    "command": "df -T",
    "description": "Include filesystem type column.",
    "explanation": "Helps identify ext4, xfs, tmpfs, etc."
  },
  {
    "id": "linux-find-path-name-.log",
    "tool": "linux",
    "category": "Search & locate",
    "level": "intermediate",
    "name": "Find files",
    "command": "find /path -name '*.log'",
    "description": "Search by name, type, time, permissions, and more.",
    "explanation": "Powerful; pair with <code>-exec</code> or <code>xargs</code>."
  },
  {
    "id": "linux-locate-pattern",
    "tool": "linux",
    "category": "Search & locate",
    "level": "intermediate",
    "name": "Fast name search",
    "command": "locate pattern",
    "description": "Search a prebuilt database of paths (fast).",
    "explanation": "Run <code>updatedb</code> to refresh (often cron)."
  },
  {
    "id": "linux-sudo-updatedb",
    "tool": "linux",
    "category": "Search & locate",
    "level": "advanced",
    "name": "Update locate DB",
    "command": "sudo updatedb",
    "description": "Rebuild the database used by <code>locate</code>.",
    "explanation": "Usually root; can take time on large systems."
  },
  {
    "id": "linux-which-cmd",
    "tool": "linux",
    "category": "Search & locate",
    "level": "beginner",
    "name": "Command path",
    "command": "which cmd",
    "description": "Print path of executable in PATH.",
    "explanation": "Does not find shell builtins—use <code>type</code>."
  },
  {
    "id": "linux-whereis-cmd",
    "tool": "linux",
    "category": "Search & locate",
    "level": "intermediate",
    "name": "Binary/man/source",
    "command": "whereis cmd",
    "description": "Locate binary, source, and man page files.",
    "explanation": "Narrower than <code>find</code>; uses fixed paths."
  },
  {
    "id": "linux-chmod-uw-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "beginner",
    "name": "Change mode",
    "command": "chmod u+w file",
    "description": "Numeric (e.g. 644) or symbolic (u+rwx) file permissions.",
    "explanation": "See also <code>chmod 755</code>, <code>chmod +x</code> entries."
  },
  {
    "id": "linux-chmod-x-script.sh",
    "tool": "linux",
    "category": "Permissions",
    "level": "beginner",
    "name": "Make executable",
    "command": "chmod +x script.sh",
    "description": "Add execute permission for user/group/others per umask.",
    "explanation": "Required to run <code>./script.sh</code>"
  },
  {
    "id": "linux-chmod-777-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "intermediate",
    "name": "World read/write/exec",
    "command": "chmod 777 file",
    "description": "rwx for all—avoid on servers; security risk.",
    "explanation": "Prefer minimal permissions (e.g. 755, 644)."
  },
  {
    "id": "linux-chmod-755-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "beginner",
    "name": "Common dir/exec",
    "command": "chmod 755 file",
    "description": "rwxr-xr-x: owner full, others read+execute.",
    "explanation": "Typical for scripts and directories."
  },
  {
    "id": "linux-chmod-644-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "beginner",
    "name": "Common file",
    "command": "chmod 644 file",
    "description": "rw-r--r--: owner read/write, group/other read.",
    "explanation": "Typical for data files."
  },
  {
    "id": "linux-chown-user-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "intermediate",
    "name": "Change owner",
    "command": "chown user file",
    "description": "Change file owner (often needs root).",
    "explanation": "<code>-R</code> recursive; careful with system files."
  },
  {
    "id": "linux-chown-usergroup-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "intermediate",
    "name": "Owner and group",
    "command": "chown user:group file",
    "description": "Set both user and group in one command.",
    "explanation": "Syntax: user, optional <code>.</code> or <code>:</code> then group."
  },
  {
    "id": "linux-chgrp-group-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "intermediate",
    "name": "Change group",
    "command": "chgrp group file",
    "description": "Change group ownership of file.",
    "explanation": "Alternative to <code>chown :group</code>"
  },
  {
    "id": "linux-umask",
    "tool": "linux",
    "category": "Permissions",
    "level": "intermediate",
    "name": "Default permissions",
    "command": "umask",
    "description": "Display or set default mode mask for new files.",
    "explanation": "Common <code>022</code> → files 644, dirs 755."
  },
  {
    "id": "linux-getfacl-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "advanced",
    "name": "Read ACLs",
    "command": "getfacl file",
    "description": "Display POSIX ACL entries.",
    "explanation": "Used with NFS and fine-grained permissions."
  },
  {
    "id": "linux-setfacl-m-uuserrwx-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "advanced",
    "name": "Set ACLs",
    "command": "setfacl -m u:user:rwx file",
    "description": "Modify ACL entries.",
    "explanation": "More flexible than chmod alone."
  },
  {
    "id": "linux-setfacl-m-ggrouprx-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "advanced",
    "name": "ACL modify",
    "command": "setfacl -m g:group:rx file",
    "description": "Add/modify ACL rule.",
    "explanation": "Check with <code>getfacl</code>."
  },
  {
    "id": "linux-setfacl-x-uuser-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "advanced",
    "name": "ACL remove entry",
    "command": "setfacl -x u:user file",
    "description": "Remove specific ACL entry.",
    "explanation": "Does not change base mode bits alone."
  },
  {
    "id": "linux-setfacl-b-file",
    "tool": "linux",
    "category": "Permissions",
    "level": "advanced",
    "name": "ACL strip",
    "command": "setfacl -b file",
    "description": "Remove all ACL entries; keep base mode.",
    "explanation": "Cleanup before chmod-only management."
  },
  {
    "id": "linux-cat-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "beginner",
    "name": "Concatenate files",
    "command": "cat file",
    "description": "Print file contents to stdout.",
    "explanation": "Large files: prefer <code>less</code> or <code>head</code>/<code>tail</code>."
  },
  {
    "id": "linux-tac-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Reverse cat",
    "command": "tac file",
    "description": "Print lines in reverse order (last line first).",
    "explanation": "GNU coreutils; useful for logs processed bottom-up."
  },
  {
    "id": "linux-nl-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Number lines",
    "command": "nl file",
    "description": "Print file with line numbers.",
    "explanation": "Similar to <code>cat -n</code>; numbering styles differ."
  },
  {
    "id": "linux-less-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "beginner",
    "name": "Pager",
    "command": "less file",
    "description": "Scroll forward/backward; search with <code>/pattern</code>.",
    "explanation": "q to quit; better than <code>more</code> for big files."
  },
  {
    "id": "linux-more-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "beginner",
    "name": "Pager (basic)",
    "command": "more file",
    "description": "Simple forward-only pager on some systems.",
    "explanation": "less is usually preferred."
  },
  {
    "id": "linux-head-n-20-fileprint-first-n-lines-default-10.",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "beginner",
    "name": "First lines",
    "command": "head -n 20 file|Print first N lines (default 10).",
    "description": "Pipe-friendly: <code>cmd ",
    "explanation": " head</code>"
  },
  {
    "id": "linux-tail-n-50-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "beginner",
    "name": "Last lines",
    "command": "tail -n 50 file",
    "description": "Print last N lines.",
    "explanation": "Use with logs to see recent entries."
  },
  {
    "id": "linux-tail-f-varlogsyslog",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Follow file",
    "command": "tail -f /var/log/syslog",
    "description": "Stream new lines as file grows (follow).",
    "explanation": "Stop with Ctrl+C; essential for live logs."
  },
  {
    "id": "linux-cut-d-f1-etcpasswd",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Cut fields",
    "command": "cut -d: -f1 /etc/passwd",
    "description": "Extract columns by delimiter or byte range.",
    "explanation": "Often with CSV-like data."
  },
  {
    "id": "linux-paste-file1-file2",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Merge lines",
    "command": "paste file1 file2",
    "description": "Merge corresponding lines side by side.",
    "explanation": "Default TAB separator; <code>-d</code> to change."
  },
  {
    "id": "linux-join-file1-file2",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Join on key",
    "command": "join file1 file2",
    "description": "Join two sorted files on common first field.",
    "explanation": "Files must be sorted on join field."
  },
  {
    "id": "linux-split-l-1000-bigfile-prefix",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Split file",
    "command": "split -l 1000 bigfile prefix",
    "description": "Split into chunks by lines or size.",
    "explanation": "Output parts: prefixaa, prefixab, ..."
  },
  {
    "id": "linux-sort-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "beginner",
    "name": "Sort lines",
    "command": "sort file",
    "description": "Sort text; <code>-n</code> numeric, <code>-r</code> reverse, <code>-u</code> unique.",
    "explanation": "Locale affects order; set LC_ALL=C for ASCII."
  },
  {
    "id": "linux-uniq-filecollapse-adjacent-duplicate-lines.",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Unique adjacent",
    "command": "uniq file|Collapse adjacent duplicate lines.",
    "description": "Usually: <code>sort file ",
    "explanation": " uniq</code>; <code>-c</code> counts."
  },
  {
    "id": "linux-tr-a-z-a-ztranslate-or-delete-characters-from-stdin.",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Translate chars",
    "command": "tr 'a-z' 'A-Z'|Translate or delete characters from stdin.",
    "description": "Often in pipes: <code>echo hi ",
    "explanation": " tr a-z A-Z</code>"
  },
  {
    "id": "linux-expand-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Tabs to spaces",
    "command": "expand file",
    "description": "Convert tabs to spaces.",
    "explanation": "Opposite: <code>unexpand</code>."
  },
  {
    "id": "linux-unexpand-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Spaces to tabs",
    "command": "unexpand file",
    "description": "Convert runs of spaces to tabs.",
    "explanation": "Useful before tools that expect tabs."
  },
  {
    "id": "linux-fmt-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Format paragraphs",
    "command": "fmt file",
    "description": "Simple paragraph reflow to line width.",
    "explanation": "For plain text email or docs."
  },
  {
    "id": "linux-fold-w-80-file",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Fold long lines",
    "command": "fold -w 80 file",
    "description": "Wrap lines to fixed width.",
    "explanation": "Does not reflow paragraphs like fmt."
  },
  {
    "id": "linux-rev",
    "tool": "linux",
    "category": "Viewing & pagers",
    "level": "intermediate",
    "name": "Reverse lines",
    "command": "rev",
    "description": "Reverse characters on each line.",
    "explanation": "Obscure but occasionally useful in scripts."
  },
  {
    "id": "linux-grep-pattern-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "beginner",
    "name": "Search pattern",
    "command": "grep pattern file",
    "description": "Print lines matching regex/pattern.",
    "explanation": "<code>-n</code> line numbers, <code>-E</code> extended regex."
  },
  {
    "id": "linux-grep-i-pattern-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "beginner",
    "name": "grep ignore case",
    "command": "grep -i pattern file",
    "description": "Case-insensitive match.",
    "explanation": "Handy for logs and mixed-case data."
  },
  {
    "id": "linux-grep-r-pattern-dir",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "grep recursive",
    "command": "grep -r pattern dir",
    "description": "Search under directory tree.",
    "explanation": "Add <code>--exclude-dir</code> to skip .git, etc."
  },
  {
    "id": "linux-grep-v-pattern-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "grep invert",
    "command": "grep -v pattern file",
    "description": "Print lines that do NOT match.",
    "explanation": "Filter out noise from logs."
  },
  {
    "id": "linux-egrep-ab-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Extended grep",
    "command": "egrep 'a|b' file",
    "description": "Same as <code>grep -E</code> on many systems.",
    "explanation": "Extended regular expressions."
  },
  {
    "id": "linux-fgrep-literal-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Fixed-string grep",
    "command": "fgrep 'literal*' file",
    "description": "Same as <code>grep -F</code>; no regex meta chars.",
    "explanation": "Safe for fixed strings with special chars."
  },
  {
    "id": "linux-sed-soldnewg-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Stream editor",
    "command": "sed 's/old/new/g' file",
    "description": "Non-interactive edit: substitute, delete lines, etc.",
    "explanation": "<code>-i</code> in-place (GNU); test without -i first."
  },
  {
    "id": "linux-awk-print-1-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "AWK processing",
    "command": "awk '{print $1}' file",
    "description": "Column/text processing language.",
    "explanation": "Default field separator whitespace; <code>-F</code> for CSV."
  },
  {
    "id": "linux-diff-file1-file2",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Compare files",
    "command": "diff file1 file2",
    "description": "Show line differences.",
    "explanation": "Unified: <code>diff -u</code>; use with <code>patch</code>."
  },
  {
    "id": "linux-patch-p1-fix.patch",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "advanced",
    "name": "Apply diff",
    "command": "patch -p1 < fix.patch",
    "description": "Apply a diff file to source tree.",
    "explanation": "Common when applying source patches."
  },
  {
    "id": "linux-cmp-file1-file2",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Compare bytes",
    "command": "cmp file1 file2",
    "description": "Byte-by-byte compare; silent if identical.",
    "explanation": "Exit status useful in scripts."
  },
  {
    "id": "linux-comm-file1-file2",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Compare sorted",
    "command": "comm file1 file2",
    "description": "Three columns: unique to each, common.",
    "explanation": "Input files must be sorted."
  },
  {
    "id": "linux-column-t-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Columnize",
    "command": "column -t file",
    "description": "Align columns for readability.",
    "explanation": "Nice for <code>mount</code> or <code>df</code> output."
  },
  {
    "id": "linux-iconv-f-iso-8859-1-t-utf-8-in.txt",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "advanced",
    "name": "Convert encoding",
    "command": "iconv -f ISO-8859-1 -t UTF-8 in.txt",
    "description": "Convert between character encodings.",
    "explanation": "Fix mojibake in legacy files."
  },
  {
    "id": "linux-base64-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Base64 encode/decode",
    "command": "base64 file",
    "description": "Encode binary to text; <code>-d</code> decode.",
    "explanation": "Common in APIs and email attachments."
  },
  {
    "id": "linux-dos2unix-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "CRLF to LF",
    "command": "dos2unix file",
    "description": "Convert Windows line endings to Unix.",
    "explanation": "Opposite: <code>unix2dos</code>."
  },
  {
    "id": "linux-unix2dos-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "LF to CRLF",
    "command": "unix2dos file",
    "description": "Convert Unix line endings to Windows.",
    "explanation": "Use before sharing text with Windows tools."
  },
  {
    "id": "linux-shred-u-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "advanced",
    "name": "Secure delete",
    "command": "shred -u file",
    "description": "Overwrite file before unlink (not guaranteed on all FS).",
    "explanation": "SSDs/copy-on-write may still retain data; use crypto erase for secrets."
  },
  {
    "id": "linux-pr-file",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Paginate for print",
    "command": "pr file",
    "description": "Format for printing: headers, page breaks.",
    "explanation": "Legacy but still in coreutils."
  },
  {
    "id": "linux-look-prefix",
    "tool": "linux",
    "category": "Text search & stream editing",
    "level": "intermediate",
    "name": "Dictionary prefix",
    "command": "look prefix",
    "description": "Binary search in sorted word list.",
    "explanation": "Uses <code>/usr/share/dict/words</code> by default."
  },
  {
    "id": "linux-yes",
    "tool": "linux",
    "category": "Quick utilities",
    "level": "beginner",
    "name": "Repeat string",
    "command": "yes",
    "description": "Output y forever (or custom string).",
    "explanation": "Stops pipe when reader closes; stress tests."
  },
  {
    "id": "linux-factor-12345",
    "tool": "linux",
    "category": "Quick utilities",
    "level": "intermediate",
    "name": "Prime factors",
    "command": "factor 12345",
    "description": "Factor integers (GNU coreutils).",
    "explanation": "Educational/math use."
  },
  {
    "id": "linux-seq-1-10",
    "tool": "linux",
    "category": "Quick utilities",
    "level": "intermediate",
    "name": "Sequence numbers",
    "command": "seq 1 10",
    "description": "Print sequence of numbers.",
    "explanation": "Useful in bash loops: <code>for i in $(seq 1 5)</code>."
  },
  {
    "id": "linux-expr-1-2",
    "tool": "linux",
    "category": "Quick utilities",
    "level": "intermediate",
    "name": "Evaluate expression",
    "command": "expr 1 + 2",
    "description": "Arithmetic and string ops (legacy).",
    "explanation": "Prefer <code>$(( ))</code> in bash."
  },
  {
    "id": "linux-bcarbitrary-precision-calculator-interactive-or-stdin.",
    "tool": "linux",
    "category": "Quick utilities",
    "level": "intermediate",
    "name": "Calculator",
    "command": "bc|Arbitrary precision calculator; interactive or stdin.",
    "description": "echo 'scale=2; 1/3' ",
    "explanation": " bc"
  },
  {
    "id": "linux-cal",
    "tool": "linux",
    "category": "Quick utilities",
    "level": "beginner",
    "name": "Calendar",
    "command": "cal",
    "description": "Display ASCII calendar for month.",
    "explanation": "cal 12 2025 for specific month."
  },
  {
    "id": "linux-date",
    "tool": "linux",
    "category": "Quick utilities",
    "level": "beginner",
    "name": "Date and time",
    "command": "date",
    "description": "Show or set system date/time.",
    "explanation": "Format: <code>date +%Y-%m-%dT%H:%M:%S</code>"
  },
  {
    "id": "linux-id",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "User/group IDs",
    "command": "id",
    "description": "Print real/effective UID, GID, groups.",
    "explanation": "Useful when debugging permissions."
  },
  {
    "id": "linux-groups-user",
    "tool": "linux",
    "category": "Users & groups",
    "level": "beginner",
    "name": "User groups",
    "command": "groups [user]",
    "description": "Print group memberships.",
    "explanation": "Shows supplemental groups."
  },
  {
    "id": "linux-whoami",
    "tool": "linux",
    "category": "Users & groups",
    "level": "beginner",
    "name": "Current user",
    "command": "whoami",
    "description": "Print effective username.",
    "explanation": "Use with <code>id</code> for full user and group info."
  },
  {
    "id": "linux-who",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "Logged-in users",
    "command": "who",
    "description": "List users on terminals.",
    "explanation": "Complements <code>w</code>."
  },
  {
    "id": "linux-w",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "Who and load",
    "command": "w",
    "description": "Who is logged in and what they are running.",
    "explanation": "Shows load average and TTY activity."
  },
  {
    "id": "linux-logname",
    "tool": "linux",
    "category": "Users & groups",
    "level": "beginner",
    "name": "Login name",
    "command": "logname",
    "description": "Print login name from utmp (not effective user).",
    "explanation": "May differ from <code>whoami</code> after su."
  },
  {
    "id": "linux-newgrp-group",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Switch group",
    "command": "newgrp group",
    "description": "Start shell with new primary group.",
    "explanation": "Rare; often use <code>sg</code> instead."
  },
  {
    "id": "linux-su-username",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "Switch user",
    "command": "su - username",
    "description": "Substitute user; <code>-</code> login shell.",
    "explanation": "Prompts for target user's password (unless root)."
  },
  {
    "id": "linux-sudo-command",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "Run as root",
    "command": "sudo command",
    "description": "Execute command with elevated privileges.",
    "explanation": "Configure in <code>/etc/sudoers</code> with visudo."
  },
  {
    "id": "linux-sudo-i",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "sudo login shell",
    "command": "sudo -i",
    "description": "Simulate initial login as root (or user).",
    "explanation": "Loads profile like a full login."
  },
  {
    "id": "linux-sudo-su",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "Root shell",
    "command": "sudo su -",
    "description": "Often used to get root shell (distribution dependent).",
    "explanation": "Prefer <code>sudo -i</code> when possible."
  },
  {
    "id": "linux-passwd",
    "tool": "linux",
    "category": "Users & groups",
    "level": "intermediate",
    "name": "Change password",
    "command": "passwd",
    "description": "Change user password.",
    "explanation": "Root can set other users' passwords."
  },
  {
    "id": "linux-chage-l-user",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Password aging",
    "command": "chage -l user",
    "description": "View/edit password expiry policy.",
    "explanation": "Account compliance and security audits."
  },
  {
    "id": "linux-gpasswd-a-user-group",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Group admin",
    "command": "gpasswd -a user group",
    "description": "Administer group membership and password.",
    "explanation": "Needs appropriate privileges."
  },
  {
    "id": "linux-sudo-useradd-m-s-binbash-newuser",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Add user",
    "command": "sudo useradd -m -s /bin/bash newuser",
    "description": "Create system account.",
    "explanation": "<code>-m</code> home, <code>-G</code> extra groups."
  },
  {
    "id": "linux-sudo-userdel-r-username",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Delete user",
    "command": "sudo userdel -r username",
    "description": "Remove user; <code>-r</code> remove home.",
    "explanation": "Careful with ownership of orphaned files."
  },
  {
    "id": "linux-sudo-usermod-ag-docker-user",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Modify user",
    "command": "sudo usermod -aG docker user",
    "description": "Modify user attributes and groups.",
    "explanation": "<code>-aG</code> append to group (don't drop others)."
  },
  {
    "id": "linux-sudo-groupadd-groupname",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Add group",
    "command": "sudo groupadd groupname",
    "description": "Create a new group.",
    "explanation": "Then <code>usermod -aG</code> to assign users."
  },
  {
    "id": "linux-sudo-groupdel-groupname",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Delete group",
    "command": "sudo groupdel groupname",
    "description": "Remove a group.",
    "explanation": "Cannot remove primary group of existing user."
  },
  {
    "id": "linux-sudo-groupmod-n-new-old",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "Modify group",
    "command": "sudo groupmod -n new old",
    "description": "Rename or change GID.",
    "explanation": "Rare; plan GID references in ACLs."
  },
  {
    "id": "linux-login",
    "tool": "linux",
    "category": "Users & groups",
    "level": "advanced",
    "name": "System login",
    "command": "login",
    "description": "Start session on TTY (usually invoked by getty).",
    "explanation": "Not used daily from shell on desktops."
  },
  {
    "id": "linux-ps",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "beginner",
    "name": "Process snapshot",
    "command": "ps",
    "description": "Snapshot of processes for your terminal.",
    "explanation": "See <code>ps aux</code> or <code>ps -ef</code> for full list."
  },
  {
    "id": "linux-ps-aux",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "BSD-style processes",
    "command": "ps aux",
    "description": "All processes, user-oriented format.",
    "explanation": "Columns: USER, PID, %CPU, %MEM, CMD, etc."
  },
  {
    "id": "linux-ps-ef",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "POSIX processes",
    "command": "ps -ef",
    "description": "Full listing with PPID in standard syntax.",
    "explanation": "Alternative style to aux; both common."
  },
  {
    "id": "linux-top",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "beginner",
    "name": "Live processes",
    "command": "top",
    "description": "Interactive process viewer sorted by CPU.",
    "explanation": "q quit; k kill; sorting keys vary."
  },
  {
    "id": "linux-htop",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Enhanced top",
    "command": "htop",
    "description": "Color, tree, search—friendlier than top.",
    "explanation": "Install if missing: <code>apt install htop</code>"
  },
  {
    "id": "linux-atop",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "advanced",
    "name": "Advanced monitor",
    "command": "atop",
    "description": "Logs resource usage over time (if configured).",
    "explanation": "Heavier than top; good for post-mortem."
  },
  {
    "id": "linux-kill-pid",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Signal process",
    "command": "kill PID",
    "description": "Send default SIGTERM to process.",
    "explanation": "Graceful shutdown; process may ignore."
  },
  {
    "id": "linux-kill-9-pid",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Force kill",
    "command": "kill -9 PID",
    "description": "Send SIGKILL—cannot be caught.",
    "explanation": "Last resort; may lose unsaved state."
  },
  {
    "id": "linux-killall-processname",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Kill by name",
    "command": "killall processname",
    "description": "Kill processes by executable name.",
    "explanation": "Risky if name matches unrelated processes."
  },
  {
    "id": "linux-pkill-f-pattern",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Kill by pattern",
    "command": "pkill -f pattern",
    "description": "Signal processes matching pattern.",
    "explanation": "Safer with exact patterns; test with <code>pgrep</code> first."
  },
  {
    "id": "linux-nice-n-10-command",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Lower priority",
    "command": "nice -n 10 command",
    "description": "Run with lower CPU scheduling priority.",
    "explanation": "Range typically -20 (high) to 19 (low)."
  },
  {
    "id": "linux-renice-10-p-pid",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Change priority",
    "command": "renice +10 -p PID",
    "description": "Adjust priority of running process.",
    "explanation": "Requires permission for negative nice."
  },
  {
    "id": "linux-bg-1",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Background job",
    "command": "bg %1",
    "description": "Resume stopped job in background.",
    "explanation": "Use after Ctrl+Z; <code>jobs</code> lists."
  },
  {
    "id": "linux-fg-1",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Foreground job",
    "command": "fg %1",
    "description": "Bring background job to foreground.",
    "explanation": "Continue interactive program."
  },
  {
    "id": "linux-jobs",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "List jobs",
    "command": "jobs",
    "description": "Shell job control list for current session.",
    "explanation": "Job numbers used with fg/bg."
  },
  {
    "id": "linux-nohup-command",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Immune to hangup",
    "command": "nohup command &",
    "description": "Keep running after terminal closes.",
    "explanation": "Output to <code>nohup.out</code> by default."
  },
  {
    "id": "linux-time-command",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "beginner",
    "name": "Time command",
    "command": "time command",
    "description": "Report real/user/sys time for command.",
    "explanation": "Builtin in bash; <code>/usr/bin/time</code> for more detail."
  },
  {
    "id": "linux-uptime",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "beginner",
    "name": "Load and uptime",
    "command": "uptime",
    "description": "How long system up, user count, load averages.",
    "explanation": "Load avg: 1, 5, 15 minute."
  },
  {
    "id": "linux-tload",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Terminal load graph",
    "command": "tload",
    "description": "ASCII graph of load average.",
    "explanation": "Simple visual on TTY."
  },
  {
    "id": "linux-pidof-nginx",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "PIDs by name",
    "command": "pidof nginx",
    "description": "Print PIDs of processes matching name.",
    "explanation": "Useful in init scripts."
  },
  {
    "id": "linux-pgrep-pattern",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Find PIDs",
    "command": "pgrep pattern",
    "description": "List PIDs matching pattern.",
    "explanation": "Pair with <code>pkill</code> carefully."
  },
  {
    "id": "linux-pstree",
    "tool": "linux",
    "category": "Processes & job control",
    "level": "intermediate",
    "name": "Process tree",
    "command": "pstree",
    "description": "Show parent/child relationships.",
    "explanation": "Great for understanding service trees."
  },
  {
    "id": "linux-free",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "beginner",
    "name": "Memory usage",
    "command": "free",
    "description": "Show RAM and swap usage.",
    "explanation": "<code>-h</code> human-readable."
  },
  {
    "id": "linux-free-h",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "beginner",
    "name": "Memory human",
    "command": "free -h",
    "description": "Same as free with human sizes.",
    "explanation": "Quick health check."
  },
  {
    "id": "linux-vmstat-1",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "advanced",
    "name": "Virtual memory stats",
    "command": "vmstat 1",
    "description": "Report processes, memory, swap, IO, CPU each second.",
    "explanation": "Classic performance triage."
  },
  {
    "id": "linux-iostat-xz-1",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "advanced",
    "name": "IO stats",
    "command": "iostat -xz 1",
    "description": "CPU and disk IO statistics (sysstat).",
    "explanation": "Install <code>sysstat</code> package."
  },
  {
    "id": "linux-mpstat-p-all-1",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "advanced",
    "name": "Per-CPU stats",
    "command": "mpstat -P ALL 1",
    "description": "CPU utilization per processor.",
    "explanation": "Part of sysstat."
  },
  {
    "id": "linux-sar-u-1-5",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "advanced",
    "name": "Historical stats",
    "command": "sar -u 1 5",
    "description": "Collect/report historical performance data.",
    "explanation": "Requires sysstat data collection enabled."
  },
  {
    "id": "linux-strace-f-command",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "advanced",
    "name": "Syscall trace",
    "command": "strace -f command",
    "description": "Trace system calls for debugging.",
    "explanation": "Use <code>-e trace=file</code> to filter."
  },
  {
    "id": "linux-ltrace-command",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "advanced",
    "name": "Library calls",
    "command": "ltrace command",
    "description": "Trace dynamic library calls.",
    "explanation": "Complements strace for shared libs."
  },
  {
    "id": "linux-timeout-10s-command",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "intermediate",
    "name": "Limit runtime",
    "command": "timeout 10s command",
    "description": "Kill command after duration.",
    "explanation": "GNU coreutils; useful in CI and scripts."
  },
  {
    "id": "linux-sleep-5",
    "tool": "linux",
    "category": "Memory & performance",
    "level": "beginner",
    "name": "Sleep",
    "command": "sleep 5",
    "description": "Pause for given seconds (or suffix s/m/h/d).",
    "explanation": "Common in loops and retries."
  },
  {
    "id": "linux-ping-c-4-host",
    "tool": "linux",
    "category": "Networking",
    "level": "beginner",
    "name": "ICMP echo",
    "command": "ping -c 4 host",
    "description": "Test reachability and latency.",
    "explanation": "<code>-c</code> count; on Linux ping may need stop with count."
  },
  {
    "id": "linux-ifconfig",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Interface config",
    "command": "ifconfig",
    "description": "Legacy view/configure network interfaces.",
    "explanation": "Prefer <code>ip</code> on modern Linux."
  },
  {
    "id": "linux-ip-addr",
    "tool": "linux",
    "category": "Networking",
    "level": "beginner",
    "name": "IP addresses",
    "command": "ip addr",
    "description": "Show interface addresses (iproute2).",
    "explanation": "Replacement for parts of ifconfig."
  },
  {
    "id": "linux-ip-link",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Link layer",
    "command": "ip link",
    "description": "Show interfaces up/down state and MTU.",
    "explanation": "Bring up: <code>sudo ip link set dev eth0 up</code>"
  },
  {
    "id": "linux-ip-route",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Routing table",
    "command": "ip route",
    "description": "Show or manipulate routing.",
    "explanation": "Default gateway and static routes."
  },
  {
    "id": "linux-ip-neigh",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Neighbor table",
    "command": "ip neigh",
    "description": "ARP/NDP neighbor cache (ARP table).",
    "explanation": "Debug L2 connectivity issues."
  },
  {
    "id": "linux-netstat-tulpn",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Network stats",
    "command": "netstat -tulpn",
    "description": "Sockets and routing (legacy).",
    "explanation": "Often replaced by <code>ss</code>."
  },
  {
    "id": "linux-ss-tuln",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Socket stats",
    "command": "ss -tuln",
    "description": "Modern socket listing; fast.",
    "explanation": "Filter: <code>ss -tuln sport = :443</code>"
  },
  {
    "id": "linux-ss-tuln-2",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Listening TCP/UDP",
    "command": "ss -tuln",
    "description": "TCP/UDP listening sockets, numeric ports.",
    "explanation": "See which services bind which ports."
  },
  {
    "id": "linux-ss-s",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Socket summary",
    "command": "ss -s",
    "description": "Summary counts of socket states.",
    "explanation": "Quick overview of connection load."
  },
  {
    "id": "linux-hostname",
    "tool": "linux",
    "category": "Networking",
    "level": "beginner",
    "name": "Hostname",
    "command": "hostname",
    "description": "Print or set system hostname.",
    "explanation": "Transient vs persistent depends on method."
  },
  {
    "id": "linux-hostnamectl",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Hostname (systemd)",
    "command": "hostnamectl",
    "description": "View/set hostname, icon, chassis (systemd).",
    "explanation": "<code>sudo hostnamectl set-hostname name</code>"
  },
  {
    "id": "linux-arp-a",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "ARP table",
    "command": "arp -a",
    "description": "Show ARP cache (legacy).",
    "explanation": "Prefer <code>ip neigh</code> on Linux."
  },
  {
    "id": "linux-arping-i-eth0-192.168.1.1",
    "tool": "linux",
    "category": "Networking",
    "level": "advanced",
    "name": "ARP ping",
    "command": "arping -I eth0 192.168.1.1",
    "description": "Test L2 reachability to IP on interface.",
    "explanation": "Useful when ICMP blocked."
  },
  {
    "id": "linux-route-n",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Routing (legacy)",
    "command": "route -n",
    "description": "Show kernel routing table (net-tools).",
    "explanation": "Use <code>ip route</code> going forward."
  },
  {
    "id": "linux-traceroute-host",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Trace route",
    "command": "traceroute host",
    "description": "Show hops to destination.",
    "explanation": "UDP/ICMP method depends on OS/version."
  },
  {
    "id": "linux-tracepath-host",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Trace path (no root)",
    "command": "tracepath host",
    "description": "Similar to traceroute without raw sockets.",
    "explanation": "May be installed by default."
  },
  {
    "id": "linux-mtr-host",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Dynamic traceroute",
    "command": "mtr host",
    "description": "Combines ping and traceroute interactively.",
    "explanation": "Install <code>mtr-tiny</code> or full package."
  },
  {
    "id": "linux-dig-example.com",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "DNS lookup",
    "command": "dig example.com",
    "description": "Query DNS with full output.",
    "explanation": "<code>+short</code> for minimal answer."
  },
  {
    "id": "linux-nslookup-example.com",
    "tool": "linux",
    "category": "Networking",
    "level": "beginner",
    "name": "DNS lookup (simple)",
    "command": "nslookup example.com",
    "description": "Interactive or one-shot DNS query.",
    "explanation": "Older; dig is often preferred."
  },
  {
    "id": "linux-whois-example.com",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "WHOIS lookup",
    "command": "whois example.com",
    "description": "Registrar and domain registration data.",
    "explanation": "Rate limits apply at some servers."
  },
  {
    "id": "linux-curl-o-httpsexample.comf",
    "tool": "linux",
    "category": "Networking",
    "level": "beginner",
    "name": "Transfer URL",
    "command": "curl -O https://example.com/f",
    "description": "HTTP/FTP client; download, headers, POST.",
    "explanation": "<code>-L</code> follow redirects; <code>-v</code> verbose."
  },
  {
    "id": "linux-wget-url",
    "tool": "linux",
    "category": "Networking",
    "level": "beginner",
    "name": "Download",
    "command": "wget URL",
    "description": "Non-interactive file download.",
    "explanation": "Recursive mirroring: <code>wget -r</code> (careful)."
  },
  {
    "id": "linux-scp-file-userhostpath",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "SSH copy",
    "command": "scp file user@host:/path",
    "description": "Copy over SSH.",
    "explanation": "Same syntax as cp with remote <code>user@host:</code>"
  },
  {
    "id": "linux-sftp-userhost",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "SSH file transfer",
    "command": "sftp user@host",
    "description": "Interactive SFTP session.",
    "explanation": "Batch: <code>sftp -b batchfile</code>"
  },
  {
    "id": "linux-ftp-host",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "FTP client",
    "command": "ftp host",
    "description": "Classic file transfer protocol client.",
    "explanation": "Prefer SFTP/HTTPS for security."
  },
  {
    "id": "linux-telnet-host-23",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Telnet client",
    "command": "telnet host 23",
    "description": "Test TCP connectivity to port.",
    "explanation": "Insecure for login; use for debugging banners."
  },
  {
    "id": "linux-nc-zv-host-443",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Netcat",
    "command": "nc -zv host 443",
    "description": "TCP/UDP swiss-army knife.",
    "explanation": "Listen: <code>nc -lvp 4444</code>; many variants (openbsd vs traditional)."
  },
  {
    "id": "linux-nmap-sv-host",
    "tool": "linux",
    "category": "Networking",
    "level": "advanced",
    "name": "Port scan",
    "command": "nmap -sV host",
    "description": "Network discovery and security scanning.",
    "explanation": "Only scan networks you own or have permission."
  },
  {
    "id": "linux-ssh-userhost",
    "tool": "linux",
    "category": "Networking",
    "level": "beginner",
    "name": "Secure shell",
    "command": "ssh user@host",
    "description": "Encrypted remote shell and tunneling.",
    "explanation": "<code>-i key</code>, <code>-p port</code>, <code>-L</code> local forward."
  },
  {
    "id": "linux-ssh-keygen-t-ed25519",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "SSH keys",
    "command": "ssh-keygen -t ed25519",
    "description": "Generate SSH key pair.",
    "explanation": "Protect private key with passphrase."
  },
  {
    "id": "linux-ssh-copy-id-userhost",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Install pubkey",
    "command": "ssh-copy-id user@host",
    "description": "Append local pubkey to remote authorized_keys.",
    "explanation": "Easiest first-time key setup."
  },
  {
    "id": "linux-sudo-tcpdump-i-eth0",
    "tool": "linux",
    "category": "Networking",
    "level": "advanced",
    "name": "Capture packets",
    "command": "sudo tcpdump -i eth0",
    "description": "Capture network traffic to file or stdout.",
    "explanation": "Requires privileges; respect privacy/law."
  },
  {
    "id": "linux-sudo-iftop",
    "tool": "linux",
    "category": "Networking",
    "level": "advanced",
    "name": "Bandwidth by conn",
    "command": "sudo iftop",
    "description": "Per-connection bandwidth (needs root).",
    "explanation": "Install iftop package."
  },
  {
    "id": "linux-nload-eth0",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Network load",
    "command": "nload eth0",
    "description": "Graph incoming/outgoing throughput.",
    "explanation": "Simple real-time view."
  },
  {
    "id": "linux-iperf-s-iperf-c-host",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Bandwidth test",
    "command": "iperf -s / iperf -c host",
    "description": "Measure TCP/UDP throughput.",
    "explanation": "iperf3 is newer parallel tool."
  },
  {
    "id": "linux-iperf3-s",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Bandwidth test v3",
    "command": "iperf3 -s",
    "description": "Modern replacement for iperf.",
    "explanation": "Client: <code>iperf3 -c host</code>"
  },
  {
    "id": "linux-sudo-ethtool-eth0",
    "tool": "linux",
    "category": "Networking",
    "level": "advanced",
    "name": "NIC settings",
    "command": "sudo ethtool eth0",
    "description": "Show/link speed, driver, offload flags.",
    "explanation": "Change settings with care."
  },
  {
    "id": "linux-nmcli-dev-status",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "NetworkManager CLI",
    "command": "nmcli dev status",
    "description": "Control NetworkManager from terminal.",
    "explanation": "Wi-Fi: <code>nmcli dev wifi list</code>"
  },
  {
    "id": "linux-iwconfig-wlan0",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Wireless config",
    "command": "iwconfig wlan0",
    "description": "Legacy wireless interface config.",
    "explanation": "Being replaced by <code>iw</code>."
  },
  {
    "id": "linux-iwlist-wlan0-scan",
    "tool": "linux",
    "category": "Networking",
    "level": "intermediate",
    "name": "Scan Wi-Fi",
    "command": "iwlist wlan0 scan",
    "description": "List nearby wireless networks (legacy).",
    "explanation": "May need sudo; see also <code>nmcli</code>."
  },
  {
    "id": "linux-iw-dev",
    "tool": "linux",
    "category": "Networking",
    "level": "advanced",
    "name": "nl80211 Wi-Fi",
    "command": "iw dev",
    "description": "Modern wireless configuration and info.",
    "explanation": "Part of iw package."
  },
  {
    "id": "linux-bridge-link",
    "tool": "linux",
    "category": "Networking",
    "level": "advanced",
    "name": "Linux bridge",
    "command": "bridge link",
    "description": "Manage bridge ports (iproute2 bridge utility).",
    "explanation": "Used with containers/KVM networking."
  },
  {
    "id": "linux-sudo-apt-update",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "APT frontend",
    "command": "sudo apt update",
    "description": "High-level Debian/Ubuntu package manager.",
    "explanation": "User-friendly; wraps apt-get/dpkg."
  },
  {
    "id": "linux-sudo-apt-get-install-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "APT get",
    "command": "sudo apt-get install pkg",
    "description": "Lower-level APT commands.",
    "explanation": "Used in scripts; stable interface."
  },
  {
    "id": "linux-apt-cache-search-nginx",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Search packages",
    "command": "apt-cache search nginx",
    "description": "Query APT package cache.",
    "explanation": "Also <code>apt-cache policy pkg</code>"
  },
  {
    "id": "linux-sudo-apt-key-add-key.asc",
    "tool": "linux",
    "category": "Package management",
    "level": "advanced",
    "name": "APT key (legacy)",
    "command": "sudo apt-key add key.asc",
    "description": "Deprecated on modern Ubuntu—prefer signed-by.",
    "explanation": "Migrate to keyring files in trusted.gpg.d."
  },
  {
    "id": "linux-sudo-apt-update-2",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "Refresh package index",
    "command": "sudo apt update",
    "description": "Download package lists from repositories.",
    "explanation": "Run before upgrade/install."
  },
  {
    "id": "linux-sudo-apt-upgrade",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "Upgrade packages",
    "command": "sudo apt upgrade",
    "description": "Install newer versions of installed packages.",
    "explanation": "May hold back if dependencies change."
  },
  {
    "id": "linux-sudo-apt-install-nginx",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "Install package",
    "command": "sudo apt install nginx",
    "description": "Install one or more packages.",
    "explanation": "<code>-y</code> non-interactive."
  },
  {
    "id": "linux-sudo-apt-remove-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "Remove package",
    "command": "sudo apt remove pkg",
    "description": "Remove package but leave config files.",
    "explanation": "<code>purge</code> removes config too."
  },
  {
    "id": "linux-sudo-apt-purge-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Purge package",
    "command": "sudo apt purge pkg",
    "description": "Remove package and configuration files.",
    "explanation": "Cleaner than remove for abandoned apps."
  },
  {
    "id": "linux-dpkg-l",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Debian package",
    "command": "dpkg -l",
    "description": "Low-level package manager for .deb files.",
    "explanation": "<code>-L</code> list files, <code>-S</code> search path."
  },
  {
    "id": "linux-sudo-dpkg-i-package.deb",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Install .deb",
    "command": "sudo dpkg -i package.deb",
    "description": "Install local deb file.",
    "explanation": "Fix deps: <code>sudo apt -f install</code>"
  },
  {
    "id": "linux-dpkg-l-2",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "List packages",
    "command": "dpkg -l",
    "description": "List all installed packages (pattern optional).",
    "explanation": "Pipe to grep for search."
  },
  {
    "id": "linux-sudo-dpkg-r-pkgname",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Remove .deb pkg",
    "command": "sudo dpkg -r pkgname",
    "description": "Remove package via dpkg.",
    "explanation": "Often use apt remove instead."
  },
  {
    "id": "linux-sudo-add-apt-repository-ppauserppa",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Add PPA/repo",
    "command": "sudo add-apt-repository ppa:user/ppa",
    "description": "Add APT source (Ubuntu).",
    "explanation": "Then <code>apt update</code>."
  },
  {
    "id": "linux-sudo-yum-install-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Yellowdog updater",
    "command": "sudo yum install pkg",
    "description": "Older RHEL/CentOS package manager.",
    "explanation": "Largely replaced by dnf on RHEL 8+."
  },
  {
    "id": "linux-sudo-yum-install-pkg-2",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "yum install",
    "command": "sudo yum install pkg",
    "description": "Install RPM packages on yum-based systems.",
    "explanation": "Equivalent modern: dnf install."
  },
  {
    "id": "linux-sudo-yum-remove-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "yum remove",
    "command": "sudo yum remove pkg",
    "description": "Remove package with yum.",
    "explanation": "Also <code>yum erase</code>"
  },
  {
    "id": "linux-sudo-yum-update",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "yum update",
    "command": "sudo yum update",
    "description": "Update all packages.",
    "explanation": "May include kernel; plan reboots."
  },
  {
    "id": "linux-yum-list-installed",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "yum list",
    "command": "yum list installed",
    "description": "List/search packages.",
    "explanation": "Pattern matching supported."
  },
  {
    "id": "linux-sudo-dnf-install-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "DNF package mgr",
    "command": "sudo dnf install pkg",
    "description": "Modern Fedora/RHEL package manager.",
    "explanation": "Faster dependency solver than yum."
  },
  {
    "id": "linux-sudo-dnf-install-pkg-2",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "dnf install",
    "command": "sudo dnf install pkg",
    "description": "Install on Fedora/RHEL 8+.",
    "explanation": "Similar UX to apt install."
  },
  {
    "id": "linux-sudo-dnf-remove-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "dnf remove",
    "command": "sudo dnf remove pkg",
    "description": "Remove package with dnf.",
    "explanation": "Also removes unused deps with autoremove."
  },
  {
    "id": "linux-sudo-dnf-update",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "dnf update",
    "command": "sudo dnf update",
    "description": "Upgrade packages on Fedora/RHEL.",
    "explanation": "Check release notes for breaking changes."
  },
  {
    "id": "linux-rpm-qa",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "RPM manager",
    "command": "rpm -qa",
    "description": "Low-level RPM queries and installs.",
    "explanation": "Query: <code>rpm -qi pkg</code>"
  },
  {
    "id": "linux-sudo-rpm-ivh-pkg.rpm",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "rpm install",
    "command": "sudo rpm -ivh pkg.rpm",
    "description": "Install RPM file.",
    "explanation": "Prefer dnf/yum to resolve dependencies."
  },
  {
    "id": "linux-sudo-rpm-e-pkgname",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "rpm erase",
    "command": "sudo rpm -e pkgname",
    "description": "Erase RPM package.",
    "explanation": "Does not remove deps automatically."
  },
  {
    "id": "linux-rpm-qa-2",
    "tool": "linux",
    "category": "Package management",
    "level": "beginner",
    "name": "List all RPMs",
    "command": "rpm -qa",
    "description": "Query all installed RPM packages.",
    "explanation": "grep to find specific package."
  },
  {
    "id": "linux-sudo-zypper-install-pkg",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "openSUSE zypper",
    "command": "sudo zypper install pkg",
    "description": "Package manager for SUSE/openSUSE.",
    "explanation": "Also <code>zypper se</code> search."
  },
  {
    "id": "linux-snap-list",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Snap packages",
    "command": "snap list",
    "description": "Universal packages from Canonical.",
    "explanation": "Snaps are self-contained but larger."
  },
  {
    "id": "linux-sudo-snap-install-code",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "snap install",
    "command": "sudo snap install code",
    "description": "Install snap package.",
    "explanation": "Classic confinement needs --classic."
  },
  {
    "id": "linux-sudo-snap-remove-code",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "snap remove",
    "command": "sudo snap remove code",
    "description": "Remove snap package.",
    "explanation": "Frees disk used by revision."
  },
  {
    "id": "linux-flatpak-list",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "Flatpak",
    "command": "flatpak list",
    "description": "Distribution-agnostic application packages.",
    "explanation": "Uses OSTree; Flathub for apps."
  },
  {
    "id": "linux-flatpak-install-flathub-org.gimp.gimp",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "flatpak install",
    "command": "flatpak install flathub org.gimp.GIMP",
    "description": "Install from remote.",
    "explanation": "User vs system install options."
  },
  {
    "id": "linux-flatpak-remove-org.gimp.gimp",
    "tool": "linux",
    "category": "Package management",
    "level": "intermediate",
    "name": "flatpak remove",
    "command": "flatpak remove org.gimp.GIMP",
    "description": "Uninstall flatpak app.",
    "explanation": "run <code>flatpak uninstall --unused</code>"
  },
  {
    "id": "linux-sudo-mount-devsdb1-mnt",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "Mount filesystem",
    "command": "sudo mount /dev/sdb1 /mnt",
    "description": "Attach filesystem at mountpoint.",
    "explanation": "Read <code>/etc/fstab</code> for persistence."
  },
  {
    "id": "linux-sudo-umount-mnt",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "Unmount",
    "command": "sudo umount /mnt",
    "description": "Detach filesystem safely.",
    "explanation": "Busy errors: use <code>lsof</code> or <code>fuser</code>."
  },
  {
    "id": "linux-lsblk",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "beginner",
    "name": "Block devices",
    "command": "lsblk",
    "description": "List disks and partitions as tree.",
    "explanation": "<code>-f</code> show filesystems and UUIDs."
  },
  {
    "id": "linux-sudo-blkid",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "Block UUID",
    "command": "sudo blkid",
    "description": "Print UUID/TYPE/LABEL of block devices.",
    "explanation": "Use UUID in fstab for stable mounts."
  },
  {
    "id": "linux-sudo-fdisk-devsdb",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Partition MBR",
    "command": "sudo fdisk /dev/sdb",
    "description": "Interactive partition table editor (MBR/GPT).",
    "explanation": "Destructive—backup data first."
  },
  {
    "id": "linux-sudo-fdisk-l",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "List partitions",
    "command": "sudo fdisk -l",
    "description": "List partition tables of all disks.",
    "explanation": "Quick disk layout overview."
  },
  {
    "id": "linux-sudo-parted-devsdb",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Partition parted",
    "command": "sudo parted /dev/sdb",
    "description": "Partition editor scriptable and GPT-friendly.",
    "explanation": "Alternative to fdisk/gdisk."
  },
  {
    "id": "linux-sudo-mkfs.ext4-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Make filesystem",
    "command": "sudo mkfs.ext4 /dev/sdb1",
    "description": "Create filesystem on partition.",
    "explanation": "Destroys data on partition."
  },
  {
    "id": "linux-sudo-mkfs.ext4-l-mydata-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Format ext4",
    "command": "sudo mkfs.ext4 -L mydata /dev/sdb1",
    "description": "Create ext4 with label.",
    "explanation": "Common default on many distros."
  },
  {
    "id": "linux-sudo-mkfs.xfs-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Format XFS",
    "command": "sudo mkfs.xfs /dev/sdb1",
    "description": "Create XFS filesystem.",
    "explanation": "Good for large files and parallel IO."
  },
  {
    "id": "linux-sudo-fsck-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Check filesystem",
    "command": "sudo fsck /dev/sdb1",
    "description": "Check and repair filesystem (unmount first).",
    "explanation": "Run on boot after unclean shutdown sometimes."
  },
  {
    "id": "linux-sudo-fsck.ext4-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Check ext4",
    "command": "sudo fsck.ext4 /dev/sdb1",
    "description": "Filesystem-specific checker.",
    "explanation": "Answer prompts carefully or use -y (risky)."
  },
  {
    "id": "linux-sudo-tune2fs-l-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Tune ext2/3/4",
    "command": "sudo tune2fs -l /dev/sdb1",
    "description": "Adjust ext filesystem parameters.",
    "explanation": "Change max mount count, label, etc."
  },
  {
    "id": "linux-sudo-resize2fs-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Resize ext",
    "command": "sudo resize2fs /dev/sdb1",
    "description": "Grow or shrink ext2/3/4 (after partition resize).",
    "explanation": "Backup before resizing."
  },
  {
    "id": "linux-sudo-mkswap-devsdb2",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Make swap",
    "command": "sudo mkswap /dev/sdb2",
    "description": "Initialize swap area.",
    "explanation": "Then <code>swapon</code>."
  },
  {
    "id": "linux-sudo-swapon-swapfile",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "Enable swap",
    "command": "sudo swapon /swapfile",
    "description": "Activate swap partition or file.",
    "explanation": "Check <code>free -h</code>."
  },
  {
    "id": "linux-sudo-swapoff-swapfile",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "Disable swap",
    "command": "sudo swapoff /swapfile",
    "description": "Deactivate swap.",
    "explanation": "Before shrinking swap file/partition."
  },
  {
    "id": "linux-sudo-mount-a",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "Mount fstab",
    "command": "sudo mount -a",
    "description": "Mount all filesystems in /etc/fstab.",
    "explanation": "Test after editing fstab to catch errors."
  },
  {
    "id": "linux-findmnt",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "beginner",
    "name": "List mounts",
    "command": "findmnt",
    "description": "Tree view of mounts (util-linux).",
    "explanation": "Shows target, source, fstype."
  },
  {
    "id": "linux-lsblk-f",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "intermediate",
    "name": "lsblk filesystems",
    "command": "lsblk -f",
    "description": "Filesystem type, UUID, label, mountpoint.",
    "explanation": "Pair with fstab editing."
  },
  {
    "id": "linux-sudo-mount-o-remountro",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Mount options",
    "command": "sudo mount -o remount,ro /",
    "description": "Mount with specific options.",
    "explanation": "remount ro/rw without unmount when possible."
  },
  {
    "id": "linux-sudo-e2fsck-f-devsdb1",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "ext family check",
    "command": "sudo e2fsck -f /dev/sdb1",
    "description": "Another name for fsck for ext.",
    "explanation": "Use on unmounted filesystem."
  },
  {
    "id": "linux-sudo-badblocks-sv-devsdb",
    "tool": "linux",
    "category": "Disks & filesystems",
    "level": "advanced",
    "name": "Test blocks",
    "command": "sudo badblocks -sv /dev/sdb",
    "description": "Search for bad sectors (destructive read/write tests).",
    "explanation": "Can indicate failing disk."
  },
  {
    "id": "linux-tar-cf-archive.tar-dir",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "beginner",
    "name": "Tape archive",
    "command": "tar -cf archive.tar dir",
    "description": "Create tar archive without compression.",
    "explanation": "<code>-x</code> extract, <code>-t</code> list."
  },
  {
    "id": "linux-tar-cvf-archive.tar-dir",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "beginner",
    "name": "tar create verbose",
    "command": "tar -cvf archive.tar dir",
    "description": "Create tar with file list printed.",
    "explanation": "c=create, v=verbose, f=file."
  },
  {
    "id": "linux-tar-xvf-archive.tar",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "beginner",
    "name": "tar extract verbose",
    "command": "tar -xvf archive.tar",
    "description": "Extract and list files.",
    "explanation": "Extract to current dir or <code>-C path</code>."
  },
  {
    "id": "linux-tar-czvf-backup.tar.gz-dir",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "tar gzip create",
    "command": "tar -czvf backup.tar.gz dir",
    "description": "Create gzip-compressed tarball.",
    "explanation": "z=gzip."
  },
  {
    "id": "linux-tar-xzvf-backup.tar.gz",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "tar gzip extract",
    "command": "tar -xzvf backup.tar.gz",
    "description": "Extract .tar.gz",
    "explanation": ".Same flags; order of z/f matters with older tar."
  },
  {
    "id": "linux-gzip-file",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "Compress gzip",
    "command": "gzip file",
    "description": "Compress file to .gz (replaces original).",
    "explanation": "<code>-k</code> keep original (GNU)."
  },
  {
    "id": "linux-gunzip-file.gz",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "Decompress gzip",
    "command": "gunzip file.gz",
    "description": "Decompress .gz to original name.",
    "explanation": "Same as <code>gzip -d</code>."
  },
  {
    "id": "linux-zcat-file.gz",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "cat gzip",
    "command": "zcat file.gz",
    "description": "Print gzip file to stdout without decompressing to disk.",
    "explanation": "Pipe-friendly."
  },
  {
    "id": "linux-zgrep-pattern-file.gz",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "grep gzip",
    "command": "zgrep pattern file.gz",
    "description": "grep inside gzip file without manual zcat.",
    "explanation": "Handy for compressed logs."
  },
  {
    "id": "linux-zip-r-archive.zip-dir",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "Zip archive",
    "command": "zip -r archive.zip dir",
    "description": "Create zip archive (PKZIP).",
    "explanation": "Cross-platform exchange with Windows."
  },
  {
    "id": "linux-unzip-archive.zip",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "Unzip",
    "command": "unzip archive.zip",
    "description": "Extract zip archive.",
    "explanation": "<code>-l</code> list without extracting."
  },
  {
    "id": "linux-7z-a-arc.7z-dir",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "7-Zip",
    "command": "7z a arc.7z dir",
    "description": "High compression 7z format.",
    "explanation": "Install p7zip-full; syntax varies."
  },
  {
    "id": "linux-7za-x-archive.7z",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "7za standalone",
    "command": "7za x archive.7z",
    "description": "Standalone 7zip binary.",
    "explanation": "Similar to 7z."
  },
  {
    "id": "linux-rar-a-arc.rar-files",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "RAR archive",
    "command": "rar a arc.rar files",
    "description": "Proprietary RAR format (non-free rar).",
    "explanation": "Often use zip/7z instead."
  },
  {
    "id": "linux-unrar-x-archive.rar",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "Extract RAR",
    "command": "unrar x archive.rar",
    "description": "Extract RAR archives.",
    "explanation": "May need non-free unrar package."
  },
  {
    "id": "linux-lzcat-file.lzma",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "advanced",
    "name": "cat LZMA",
    "command": "lzcat file.lzma",
    "description": "Decompress LZMA to stdout.",
    "explanation": "Part of xz-utils family."
  },
  {
    "id": "linux-lzma-file",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "advanced",
    "name": "LZMA compress",
    "command": "lzma file",
    "description": "Old LZMA single-file compression.",
    "explanation": "Often replaced by xz."
  },
  {
    "id": "linux-xz-file",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "xz compress",
    "command": "xz file",
    "description": "Compress to .xz with high ratio.",
    "explanation": "xz -d to decompress; common for tarballs."
  },
  {
    "id": "linux-unxz-file.xz",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "xz decompress",
    "command": "unxz file.xz",
    "description": "Decompress .xz file.",
    "explanation": "Same as xz -d."
  },
  {
    "id": "linux-bzcat-file.bz2",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "cat bzip2",
    "command": "bzcat file.bz2",
    "description": "Print bzip2-compressed file.",
    "explanation": "Like zcat for bz2."
  },
  {
    "id": "linux-bzip2-file",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "bzip2 compress",
    "command": "bzip2 file",
    "description": "Compress with bzip2 (slower, smaller than gzip).",
    "explanation": "<code>-d</code> decompress."
  },
  {
    "id": "linux-bunzip2-file.bz2",
    "tool": "linux",
    "category": "Archives & compression",
    "level": "intermediate",
    "name": "bzip2 decompress",
    "command": "bunzip2 file.bz2",
    "description": "Decompress bz2.",
    "explanation": "Same as bzip2 -d."
  },
  {
    "id": "linux-uname",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "beginner",
    "name": "Unix name",
    "command": "uname",
    "description": "Print kernel name.",
    "explanation": "<code>-a</code> all info."
  },
  {
    "id": "linux-uname-a",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "beginner",
    "name": "All system info",
    "command": "uname -a",
    "description": "Kernel name, hostname, kernel release, machine, OS.",
    "explanation": "Quick system fingerprint."
  },
  {
    "id": "linux-arch",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "beginner",
    "name": "Machine hardware",
    "command": "arch",
    "description": "Print machine hardware name (e.g. x86_64).",
    "explanation": "Similar to <code>uname -m</code>."
  },
  {
    "id": "linux-lscpu",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "intermediate",
    "name": "CPU info",
    "command": "lscpu",
    "description": "CPU architecture, cores, caches, flags.",
    "explanation": "Useful for performance tuning."
  },
  {
    "id": "linux-lsmem",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "intermediate",
    "name": "Memory list",
    "command": "lsmem",
    "description": "List memory blocks and online status.",
    "explanation": "Newer util-linux feature."
  },
  {
    "id": "linux-lsusb",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "intermediate",
    "name": "USB devices",
    "command": "lsusb",
    "description": "List USB buses and devices.",
    "explanation": "Debug peripheral detection."
  },
  {
    "id": "linux-lspci",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "intermediate",
    "name": "PCI devices",
    "command": "lspci",
    "description": "List PCI/PCIe devices (GPUs, NICs).",
    "explanation": "<code>-v</code> verbose."
  },
  {
    "id": "linux-dmesg",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "intermediate",
    "name": "Kernel ring buffer",
    "command": "dmesg",
    "description": "Kernel log since boot (hardware, drivers).",
    "explanation": "<code>-T</code> human time; may need sudo."
  },
  {
    "id": "linux-sudo-dmidecode",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "advanced",
    "name": "DMI/SMBIOS",
    "command": "sudo dmidecode",
    "description": "Hardware info from BIOS (serial, RAM slots).",
    "explanation": "Sensitive; often restricted."
  },
  {
    "id": "linux-hwinfo",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "advanced",
    "name": "Hardware probe",
    "command": "hwinfo",
    "description": "Detailed hardware listing (SUSE).",
    "explanation": "Install package; very verbose."
  },
  {
    "id": "linux-inxi-fxxx",
    "tool": "linux",
    "category": "System & hardware info",
    "level": "intermediate",
    "name": "System summary",
    "command": "inxi -Fxxx",
    "description": "All-in-one system information script.",
    "explanation": "Popular on forums for support."
  },
  {
    "id": "linux-last",
    "tool": "linux",
    "category": "Login & audit",
    "level": "intermediate",
    "name": "Last logins",
    "command": "last",
    "description": "Show last logged-in users and reboot times.",
    "explanation": "Reads /var/log/wtmp."
  },
  {
    "id": "linux-lastlog",
    "tool": "linux",
    "category": "Login & audit",
    "level": "intermediate",
    "name": "Last login per user",
    "command": "lastlog",
    "description": "Last login time for each user.",
    "explanation": "Useful for stale accounts audit."
  },
  {
    "id": "linux-crontab-e",
    "tool": "linux",
    "category": "Cron & at",
    "level": "intermediate",
    "name": "User cron",
    "command": "crontab -e",
    "description": "Edit per-user crontab.",
    "explanation": "Syntax: min hour dom mon dow command."
  },
  {
    "id": "linux-crontab-e-2",
    "tool": "linux",
    "category": "Cron & at",
    "level": "intermediate",
    "name": "Edit crontab",
    "command": "crontab -e",
    "description": "Open editor for current user's cron jobs.",
    "explanation": "Uses EDITOR env var."
  },
  {
    "id": "linux-crontab-l",
    "tool": "linux",
    "category": "Cron & at",
    "level": "beginner",
    "name": "List crontab",
    "command": "crontab -l",
    "description": "List current user's cron entries.",
    "explanation": "Backup before editing."
  },
  {
    "id": "linux-at-5pm-tomorrow",
    "tool": "linux",
    "category": "Cron & at",
    "level": "intermediate",
    "name": "One-shot schedule",
    "command": "at 5pm tomorrow",
    "description": "Run command once at scheduled time.",
    "explanation": "Needs atd service running."
  },
  {
    "id": "linux-atq",
    "tool": "linux",
    "category": "Cron & at",
    "level": "intermediate",
    "name": "at queue",
    "command": "atq",
    "description": "List pending at jobs.",
    "explanation": "atrm to remove."
  },
  {
    "id": "linux-atrm-1",
    "tool": "linux",
    "category": "Cron & at",
    "level": "intermediate",
    "name": "Remove at job",
    "command": "atrm 1",
    "description": "Delete job number from at queue.",
    "explanation": "From atq output."
  },
  {
    "id": "linux-sudo-shutdown-h-10",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "Shutdown system",
    "command": "sudo shutdown -h +10",
    "description": "Halt or power off after delay.",
    "explanation": "Broadcasts message to users."
  },
  {
    "id": "linux-sudo-shutdown-h-now",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "Halt now",
    "command": "sudo shutdown -h now",
    "description": "Halt system immediately (or now).",
    "explanation": "Equivalent: <code>poweroff</code> on systemd."
  },
  {
    "id": "linux-sudo-shutdown-r-now",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "Reboot now",
    "command": "sudo shutdown -r now",
    "description": "Reboot system now.",
    "explanation": "Users logged in may be disconnected."
  },
  {
    "id": "linux-sudo-reboot",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "beginner",
    "name": "Reboot",
    "command": "sudo reboot",
    "description": "Restart the system (systemd).",
    "explanation": "Ensure saves and sync before reboot."
  },
  {
    "id": "linux-sudo-poweroff",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "beginner",
    "name": "Power off",
    "command": "sudo poweroff",
    "description": "Power down the system.",
    "explanation": "ACPI power off when supported."
  },
  {
    "id": "linux-sudo-halt",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "Halt",
    "command": "sudo halt",
    "description": "Stop CPU (behavior varies by init).",
    "explanation": "On systemd often stops like poweroff."
  },
  {
    "id": "linux-systemctl-status-nginx",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "systemd control",
    "command": "systemctl status nginx",
    "description": "Control systemd units.",
    "explanation": "start, stop, restart, enable, disable, status."
  },
  {
    "id": "linux-systemctl-status-ssh",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "beginner",
    "name": "Service status",
    "command": "systemctl status ssh",
    "description": "Show unit state and recent log lines.",
    "explanation": "First step when service fails."
  },
  {
    "id": "linux-sudo-systemctl-start-nginx",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "beginner",
    "name": "Start service",
    "command": "sudo systemctl start nginx",
    "description": "Start a systemd unit now.",
    "explanation": "Does not enable on boot unless enable."
  },
  {
    "id": "linux-sudo-systemctl-stop-nginx",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "beginner",
    "name": "Stop service",
    "command": "sudo systemctl stop nginx",
    "description": "Stop a running unit.",
    "explanation": "Opposite of start."
  },
  {
    "id": "linux-sudo-systemctl-restart-nginx",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "Restart service",
    "command": "sudo systemctl restart nginx",
    "description": "Stop then start (reload config if service supports).",
    "explanation": "Use reload when available for less disruption."
  },
  {
    "id": "linux-sudo-systemctl-enable-nginx",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "Enable on boot",
    "command": "sudo systemctl enable nginx",
    "description": "Create symlinks so unit starts at boot.",
    "explanation": "Pair with start for immediate effect."
  },
  {
    "id": "linux-sudo-systemctl-disable-nginx",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "Disable on boot",
    "command": "sudo systemctl disable nginx",
    "description": "Remove boot symlinks for unit.",
    "explanation": "Does not stop if already running."
  },
  {
    "id": "linux-journalctl-xe",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "systemd journal",
    "command": "journalctl -xe",
    "description": "Query journal; this form highlights errors and common issues.",
    "explanation": "Also <code>journalctl -u service -f</code> to follow one unit."
  },
  {
    "id": "linux-journalctl-u-nginx-f",
    "tool": "linux",
    "category": "Power & systemd",
    "level": "intermediate",
    "name": "journalctl unit",
    "command": "journalctl -u nginx -f",
    "description": "Follow logs for specific service.",
    "explanation": "Like tail -f for journald."
  },
  {
    "id": "linux-env",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Environment",
    "command": "env",
    "description": "Print environment or run command with env.",
    "explanation": "Clean env: <code>env -i bash</code>"
  },
  {
    "id": "linux-printenv-path",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Print env var",
    "command": "printenv PATH",
    "description": "Print value of variable(s).",
    "explanation": "Similar to <code>echo $PATH</code> but safer for empty."
  },
  {
    "id": "linux-export-varvalue",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Export variable",
    "command": "export VAR=value",
    "description": "Mark shell variable for child processes.",
    "explanation": "Put in ~/.bashrc for persistence."
  },
  {
    "id": "linux-set-o",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "intermediate",
    "name": "Shell options",
    "command": "set -o",
    "description": "Display shell options and positional params.",
    "explanation": "Debugging: <code>set -x</code> trace."
  },
  {
    "id": "linux-unset-var",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "intermediate",
    "name": "Unset variable",
    "command": "unset VAR",
    "description": "Remove shell variable.",
    "explanation": "Functions: <code>unset -f name</code>"
  },
  {
    "id": "linux-alias-llls-la",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Alias command",
    "command": "alias ll='ls -la'",
    "description": "Define command shortcut.",
    "explanation": "List aliases: <code>alias</code>"
  },
  {
    "id": "linux-unalias-ll",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Remove alias",
    "command": "unalias ll",
    "description": "Remove alias definition.",
    "explanation": "Common in scripts for predictable commands."
  },
  {
    "id": "linux-history",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Command history",
    "command": "history",
    "description": "Show numbered command history.",
    "explanation": "Reuse: <code>!42</code>, <code>!!</code>"
  },
  {
    "id": "linux-clear",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Clear terminal",
    "command": "clear",
    "description": "Clear screen (scrollback may remain).",
    "explanation": "Ctrl+L in bash."
  },
  {
    "id": "linux-reset",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "intermediate",
    "name": "Reset terminal",
    "command": "reset",
    "description": "Reinitialize terminal after garbled display.",
    "explanation": "Slower than clear; fixes escape chaos."
  },
  {
    "id": "linux-echo-hello",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Print line",
    "command": "echo hello",
    "description": "Print arguments.",
    "explanation": "<code>-e</code> escapes (echo varies; prefer printf for portability)."
  },
  {
    "id": "linux-script-session.log",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "intermediate",
    "name": "Record session",
    "command": "script session.log",
    "description": "Record terminal I/O to typescript.",
    "explanation": "Ends with exit or Ctrl+D."
  },
  {
    "id": "linux-screen-s-work",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "intermediate",
    "name": "GNU Screen",
    "command": "screen -S work",
    "description": "Terminal multiplexer; detach with Ctrl+A D.",
    "explanation": "Reattach: <code>screen -r work</code>"
  },
  {
    "id": "linux-tmux-new-s-dev",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "intermediate",
    "name": "tmux",
    "command": "tmux new -s dev",
    "description": "Terminal multiplexer; detach Ctrl+B D.",
    "explanation": "Sessions survive SSH disconnect."
  },
  {
    "id": "linux-source-file.sh",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Source script",
    "command": "source file.sh",
    "description": "Run script in current shell (bash).",
    "explanation": "Same as <code>. file.sh</code>"
  },
  {
    "id": "linux-.-.vars.sh",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Dot source",
    "command": ". ./vars.sh",
    "description": "POSIX dot: source script in current shell.",
    "explanation": "Same as <code>source</code> in bash; relative path common for env files."
  },
  {
    "id": "linux-exec-.myserver",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "advanced",
    "name": "Replace shell",
    "command": "exec ./myserver",
    "description": "Replace shell process with command.",
    "explanation": "Used in containers and init scripts."
  },
  {
    "id": "linux-find-.-name-.txt-print0-xargs-0-rm",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "advanced",
    "name": "Stdin to args",
    "command": "find . -name '*.txt' -print0 | xargs -0 rm",
    "description": "Build command lines from stdin.",
    "explanation": "<code>-0</code> with null-delimited find."
  },
  {
    "id": "linux-cmd-tee-log.txt",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "intermediate",
    "name": "Tee output",
    "command": "cmd | tee log.txt",
    "description": "Copy stdout to file and pass through.",
    "explanation": "Append: <code>tee -a</code>"
  },
  {
    "id": "linux-exit-0",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Exit shell",
    "command": "exit 0",
    "description": "Exit shell with status code.",
    "explanation": "0 success; non-zero error for scripts."
  },
  {
    "id": "linux-logout",
    "tool": "linux",
    "category": "Shell environment & multiplexers",
    "level": "beginner",
    "name": "Logout shell",
    "command": "logout",
    "description": "End login shell session.",
    "explanation": "Same as exit in login shells."
  },
  {
    "id": "linux-od-c-file",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "intermediate",
    "name": "Octal dump",
    "command": "od -c file",
    "description": "Dump file in octal/hex/char.",
    "explanation": "Inspect binary files."
  },
  {
    "id": "linux-strings-binls",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "intermediate",
    "name": "Print strings",
    "command": "strings /bin/ls",
    "description": "Print printable strings from binary.",
    "explanation": "Quick look inside executables."
  },
  {
    "id": "linux-xxd-file",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "intermediate",
    "name": "Hex dump",
    "command": "xxd file",
    "description": "Hexadecimal dump of file.",
    "explanation": "Reverse: <code>xxd -r</code>"
  },
  {
    "id": "linux-watch-n-2-df-h",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "intermediate",
    "name": "Watch command",
    "command": "watch -n 2 df -h",
    "description": "Run command every N seconds, full screen refresh.",
    "explanation": "Monitor changing output."
  },
  {
    "id": "linux-install-m-755-script.sh-usrlocalbin",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "intermediate",
    "name": "Copy with modes",
    "command": "install -m 755 script.sh /usr/local/bin/",
    "description": "Copy files and set ownership/mode.",
    "explanation": "Common in Makefiles."
  },
  {
    "id": "linux-truncate-s-0-file",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "intermediate",
    "name": "Truncate file",
    "command": "truncate -s 0 file",
    "description": "Shrink or extend file to size.",
    "explanation": "Fast sparse extension on some FS."
  },
  {
    "id": "linux-sync",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "beginner",
    "name": "Flush buffers",
    "command": "sync",
    "description": "Write filesystem buffers to disk.",
    "explanation": "Before unplugging media (best effort)."
  },
  {
    "id": "linux-dir",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "beginner",
    "name": "dir listing",
    "command": "dir",
    "description": "Similar to ls (often GNU dir).",
    "explanation": "Color and columns like ls."
  },
  {
    "id": "linux-vdir",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "beginner",
    "name": "Vertical dir",
    "command": "vdir",
    "description": "Long listing like ls -l in GNU.",
    "explanation": "Rarely used vs ls."
  },
  {
    "id": "linux-sudo-chattr-i-file",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "advanced",
    "name": "Change attributes",
    "command": "sudo chattr +i file",
    "description": "ext filesystem immutable flag and more.",
    "explanation": "+i prevents even root delete until -i."
  },
  {
    "id": "linux-lsattr-file",
    "tool": "linux",
    "category": "Shell session & file utilities",
    "level": "advanced",
    "name": "List attributes",
    "command": "lsattr file",
    "description": "Show chattr flags on ext files.",
    "explanation": "i, a append-only, etc."
  },
  {
    "id": "linux-man-command",
    "tool": "linux",
    "category": "Documentation & integrity",
    "level": "beginner",
    "name": "Manual page",
    "command": "man command",
    "description": "Display manual page for a command.",
    "explanation": "q quit; <code>man -k</code> apropos."
  },
  {
    "id": "linux-rsync-avz-source-userhostdest",
    "tool": "linux",
    "category": "Documentation & integrity",
    "level": "intermediate",
    "name": "Sync files",
    "command": "rsync -avz source/ user@host:dest/",
    "description": "Sync directories over SSH or locally with archive mode.",
    "explanation": "Trailing slash on source copies directory contents; use <code>--dry-run</code> first."
  },
  {
    "id": "linux-lsof-i-8080",
    "tool": "linux",
    "category": "Documentation & integrity",
    "level": "advanced",
    "name": "Open files",
    "command": "lsof -i :8080",
    "description": "List open files and network sockets by process.",
    "explanation": "Who has port 80: <code>lsof -i :80</code>; by PID: <code>lsof -p PID</code>."
  },
  {
    "id": "linux-dd-ifinput.img-ofdevsdb-bs4m-statusprogress",
    "tool": "linux",
    "category": "Documentation & integrity",
    "level": "advanced",
    "name": "Block-level copy",
    "command": "dd if=input.img of=/dev/sdb bs=4M status=progress",
    "description": "Copy raw blocks—can wipe disks if of= is wrong.",
    "explanation": "Always verify <code>if=</code> and <code>of=</code>; not for normal file copy."
  },
  {
    "id": "linux-md5sum-file",
    "tool": "linux",
    "category": "Documentation & integrity",
    "level": "intermediate",
    "name": "MD5 checksum",
    "command": "md5sum file",
    "description": "Compute or verify MD5 hashes.",
    "explanation": "Verify: <code>md5sum -c checksums.txt</code>; prefer <code>sha256sum</code> when security matters."
  },
  {
    "id": "linux-sha256sum-file",
    "tool": "linux",
    "category": "Documentation & integrity",
    "level": "intermediate",
    "name": "SHA-256 checksum",
    "command": "sha256sum file",
    "description": "Stronger checksum for integrity checks.",
    "explanation": "Common for ISOs, container images, and release artifacts."
  }
];

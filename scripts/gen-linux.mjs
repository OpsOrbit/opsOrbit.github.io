import fs from 'fs'

const path = new URL('../src/data/linuxCommands.js', import.meta.url).pathname

function makeId(cmd) {
  let s =
    'linux-' +
    cmd
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
  if (s.length > 72) s = s.slice(0, 72).replace(/-$/, '')
  return s || 'linux-cmd'
}

const raw = `
### Files & navigation
ls|beginner|List directory|ls|List files and folders in the current directory.|Add flags: <code>-l</code> long, <code>-a</code> hidden, <code>-h</code> sizes.
ls -l|beginner|Long listing|ls -l|Detailed list: permissions, links, owner, size, time, name.|Use <code>ls -lt</code> to sort by time.
ls -a|beginner|List including hidden|ls -a|Shows names starting with <code>.</code> (hidden files).|Often combined: <code>ls -la</code>.
ls -lh|beginner|Human-readable sizes|ls -lh|Long format with sizes in KB/MB/GB instead of raw bytes.|Very common daily command.
pwd|beginner|Print working directory|pwd|Prints the full path of the current directory.|Use in scripts to anchor paths.
cd|beginner|Change directory|cd /path/to/dir|Change the shell working directory.|Without args, behavior depends on shell; often same as <code>cd ~</code>.
cd ..|beginner|Parent directory|cd ..|Go up one directory level.|Chain: <code>cd ../..</code>
cd ~|beginner|Home directory|cd ~|Go to your home directory (tilde expansion).|Also <code>cd</code> alone in bash often goes home.
mkdir|beginner|Create directory|mkdir dirname|Create a single empty directory.|Fails if parent path missing unless <code>-p</code>.
mkdir -p|beginner|Create parent dirs|mkdir -p a/b/c|Create directory and any missing parents; no error if exists.|Essential in scripts.
rmdir|beginner|Remove empty directory|rmdir dirname|Remove a directory only if it is empty.|For non-empty dirs use <code>rm -r</code> (careful).
rm|beginner|Remove files|rm file|Delete files. Irreversible on most filesystems.|Use <code>-i</code> for interactive prompts.
rm -rf|intermediate|Remove recursively|rm -rf path|Recursive force delete—very dangerous if path is wrong.|Double-check path; prefer <code>rm -ri</code> when unsure.
cp|beginner|Copy files|cp source dest|Copy a file or directory (with <code>-r</code>).|<code>-p</code> preserve mode/time; <code>-a</code> archive mode.
cp -r|beginner|Copy directory|cp -r srcdir destdir|Recursively copy a directory tree.|Trailing slashes matter for behavior—see <code>man cp</code>.
mv|beginner|Move or rename|mv old new|Rename file/dir or move to another location.|Same inode rename when on same filesystem.
touch|beginner|Touch file|touch file|Create empty file or update modification time.|Multiple files: <code>touch a b c</code>
file|beginner|Guess file type|file path|Shows file type using magic bytes and heuristics.|Useful for unknown binaries or scripts without extension.
stat|intermediate|File metadata|stat file|Inode, size, blocks, access/modify times, etc.|Format: <code>stat -c '%y' file</code> in GNU stat.
tree|intermediate|Directory tree|tree|Display directory structure as a tree.|May need install: <code>apt install tree</code>.
basename|intermediate|Strip path|basename /path/to/file.txt|Print final component of a path.|Often in scripts with variables.
dirname|intermediate|Strip filename|dirname /path/to/file.txt|Print directory portion of a path.|Pairs with <code>basename</code>.
realpath|intermediate|Canonical path|realpath path|Resolve symlinks and print absolute path.|GNU and BSD variants differ slightly.
readlink|intermediate|Symlink target|readlink link|Print symlink target; <code>-f</code> canonicalize (GNU).|Useful when debugging links.
ln|intermediate|Hard link|ln target linkname|Create hard link (same inode).|Cannot cross filesystems; not for directories usually.
ln -s|beginner|Symbolic link|ln -s target linkname|Create symlink pointing to target.|Relative targets are stored as given.
du|intermediate|Disk usage|du path|Estimate space used by files under path.|Combine with <code>-sh</code> for summary.
du -sh|beginner|Summary human size|du -sh *|Human-readable total per argument.|Common: <code>du -sh /var/log</code>
du -h|beginner|du human sizes|du -h path|Human-readable sizes per path.|Often combined with <code>-s</code> for total.
df|beginner|Filesystem space|df|Report space on mounted filesystems.|Shows blocks or percent used per mount.
df -h|beginner|df human-readable|df -h|Sizes in KB/MB/GB for readability.|Check disk full issues quickly.
df -T|intermediate|df with fstype|df -T|Include filesystem type column.|Helps identify ext4, xfs, tmpfs, etc.
### Search & locate
find|intermediate|Find files|find /path -name '*.log'|Search by name, type, time, permissions, and more.|Powerful; pair with <code>-exec</code> or <code>xargs</code>.
locate|intermediate|Fast name search|locate pattern|Search a prebuilt database of paths (fast).|Run <code>updatedb</code> to refresh (often cron).
updatedb|advanced|Update locate DB|sudo updatedb|Rebuild the database used by <code>locate</code>.|Usually root; can take time on large systems.
which|beginner|Command path|which cmd|Print path of executable in PATH.|Does not find shell builtins—use <code>type</code>.
whereis|intermediate|Binary/man/source|whereis cmd|Locate binary, source, and man page files.|Narrower than <code>find</code>; uses fixed paths.
### Permissions
chmod|beginner|Change mode|chmod u+w file|Numeric (e.g. 644) or symbolic (u+rwx) file permissions.|See also <code>chmod 755</code>, <code>chmod +x</code> entries.
chmod +x|beginner|Make executable|chmod +x script.sh|Add execute permission for user/group/others per umask.|Required to run <code>./script.sh</code>
chmod 777|intermediate|World read/write/exec|chmod 777 file|rwx for all—avoid on servers; security risk.|Prefer minimal permissions (e.g. 755, 644).
chmod 755|beginner|Common dir/exec|chmod 755 file|rwxr-xr-x: owner full, others read+execute.|Typical for scripts and directories.
chmod 644|beginner|Common file|chmod 644 file|rw-r--r--: owner read/write, group/other read.|Typical for data files.
chown|intermediate|Change owner|chown user file|Change file owner (often needs root).|<code>-R</code> recursive; careful with system files.
chown user:group file|intermediate|Owner and group|chown user:group file|Set both user and group in one command.|Syntax: user, optional <code>.</code> or <code>:</code> then group.
chgrp|intermediate|Change group|chgrp group file|Change group ownership of file.|Alternative to <code>chown :group</code>
umask|intermediate|Default permissions|umask|Display or set default mode mask for new files.|Common <code>022</code> → files 644, dirs 755.
getfacl|advanced|Read ACLs|getfacl file|Display POSIX ACL entries.|Used with NFS and fine-grained permissions.
setfacl|advanced|Set ACLs|setfacl -m u:user:rwx file|Modify ACL entries.|More flexible than chmod alone.
setfacl -m|advanced|ACL modify|setfacl -m g:group:rx file|Add/modify ACL rule.|Check with <code>getfacl</code>.
setfacl -x|advanced|ACL remove entry|setfacl -x u:user file|Remove specific ACL entry.|Does not change base mode bits alone.
setfacl -b|advanced|ACL strip|setfacl -b file|Remove all ACL entries; keep base mode.|Cleanup before chmod-only management.
### Viewing & pagers
cat|beginner|Concatenate files|cat file|Print file contents to stdout.|Large files: prefer <code>less</code> or <code>head</code>/<code>tail</code>.
tac|intermediate|Reverse cat|tac file|Print lines in reverse order (last line first).|GNU coreutils; useful for logs processed bottom-up.
nl|intermediate|Number lines|nl file|Print file with line numbers.|Similar to <code>cat -n</code>; numbering styles differ.
less|beginner|Pager|less file|Scroll forward/backward; search with <code>/pattern</code>.|q to quit; better than <code>more</code> for big files.
more|beginner|Pager (basic)|more file|Simple forward-only pager on some systems.|less is usually preferred.
head|beginner|First lines|head -n 20 file|Print first N lines (default 10).|Pipe-friendly: <code>cmd | head</code>
tail|beginner|Last lines|tail -n 50 file|Print last N lines.|Use with logs to see recent entries.
tail -f|intermediate|Follow file|tail -f /var/log/syslog|Stream new lines as file grows (follow).|Stop with Ctrl+C; essential for live logs.
cut|intermediate|Cut fields|cut -d: -f1 /etc/passwd|Extract columns by delimiter or byte range.|Often with CSV-like data.
paste|intermediate|Merge lines|paste file1 file2|Merge corresponding lines side by side.|Default TAB separator; <code>-d</code> to change.
join|intermediate|Join on key|join file1 file2|Join two sorted files on common first field.|Files must be sorted on join field.
split|intermediate|Split file|split -l 1000 bigfile prefix|Split into chunks by lines or size.|Output parts: prefixaa, prefixab, ...
sort|beginner|Sort lines|sort file|Sort text; <code>-n</code> numeric, <code>-r</code> reverse, <code>-u</code> unique.|Locale affects order; set LC_ALL=C for ASCII.
uniq|intermediate|Unique adjacent|uniq file|Collapse adjacent duplicate lines.|Usually: <code>sort file | uniq</code>; <code>-c</code> counts.
tr|intermediate|Translate chars|tr 'a-z' 'A-Z'|Translate or delete characters from stdin.|Often in pipes: <code>echo hi | tr a-z A-Z</code>
expand|intermediate|Tabs to spaces|expand file|Convert tabs to spaces.|Opposite: <code>unexpand</code>.
unexpand|intermediate|Spaces to tabs|unexpand file|Convert runs of spaces to tabs.|Useful before tools that expect tabs.
fmt|intermediate|Format paragraphs|fmt file|Simple paragraph reflow to line width.|For plain text email or docs.
fold|intermediate|Fold long lines|fold -w 80 file|Wrap lines to fixed width.|Does not reflow paragraphs like fmt.
rev|intermediate|Reverse lines|rev|Reverse characters on each line.|Obscure but occasionally useful in scripts.
### Text search & stream editing
grep|beginner|Search pattern|grep pattern file|Print lines matching regex/pattern.|<code>-n</code> line numbers, <code>-E</code> extended regex.
grep -i|beginner|grep ignore case|grep -i pattern file|Case-insensitive match.|Handy for logs and mixed-case data.
grep -r|intermediate|grep recursive|grep -r pattern dir|Search under directory tree.|Add <code>--exclude-dir</code> to skip .git, etc.
grep -v|intermediate|grep invert|grep -v pattern file|Print lines that do NOT match.|Filter out noise from logs.
egrep|intermediate|Extended grep|egrep 'a|b' file|Same as <code>grep -E</code> on many systems.|Extended regular expressions.
fgrep|intermediate|Fixed-string grep|fgrep 'literal*' file|Same as <code>grep -F</code>; no regex meta chars.|Safe for fixed strings with special chars.
sed|intermediate|Stream editor|sed 's/old/new/g' file|Non-interactive edit: substitute, delete lines, etc.|<code>-i</code> in-place (GNU); test without -i first.
awk|intermediate|AWK processing|awk '{print $1}' file|Column/text processing language.|Default field separator whitespace; <code>-F</code> for CSV.
diff|intermediate|Compare files|diff file1 file2|Show line differences.|Unified: <code>diff -u</code>; use with <code>patch</code>.
patch|advanced|Apply diff|patch -p1 < fix.patch|Apply a diff file to source tree.|Common when applying source patches.
cmp|intermediate|Compare bytes|cmp file1 file2|Byte-by-byte compare; silent if identical.|Exit status useful in scripts.
comm|intermediate|Compare sorted|comm file1 file2|Three columns: unique to each, common.|Input files must be sorted.
column|intermediate|Columnize|column -t file|Align columns for readability.|Nice for <code>mount</code> or <code>df</code> output.
iconv|advanced|Convert encoding|iconv -f ISO-8859-1 -t UTF-8 in.txt|Convert between character encodings.|Fix mojibake in legacy files.
base64|intermediate|Base64 encode/decode|base64 file|Encode binary to text; <code>-d</code> decode.|Common in APIs and email attachments.
dos2unix|intermediate|CRLF to LF|dos2unix file|Convert Windows line endings to Unix.|Opposite: <code>unix2dos</code>.
unix2dos|intermediate|LF to CRLF|unix2dos file|Convert Unix line endings to Windows.|Use before sharing text with Windows tools.
shred|advanced|Secure delete|shred -u file|Overwrite file before unlink (not guaranteed on all FS).|SSDs/copy-on-write may still retain data; use crypto erase for secrets.
pr|intermediate|Paginate for print|pr file|Format for printing: headers, page breaks.|Legacy but still in coreutils.
look|intermediate|Dictionary prefix|look prefix|Binary search in sorted word list.|Uses <code>/usr/share/dict/words</code> by default.
### Quick utilities
yes|beginner|Repeat string|yes|Output y forever (or custom string).|Stops pipe when reader closes; stress tests.
factor|intermediate|Prime factors|factor 12345|Factor integers (GNU coreutils).|Educational/math use.
seq|intermediate|Sequence numbers|seq 1 10|Print sequence of numbers.|Useful in bash loops: <code>for i in $(seq 1 5)</code>.
expr|intermediate|Evaluate expression|expr 1 + 2|Arithmetic and string ops (legacy).|Prefer <code>$(( ))</code> in bash.
bc|intermediate|Calculator|bc|Arbitrary precision calculator; interactive or stdin.|echo 'scale=2; 1/3' | bc
cal|beginner|Calendar|cal|Display ASCII calendar for month.|cal 12 2025 for specific month.
date|beginner|Date and time|date|Show or set system date/time.|Format: <code>date +%Y-%m-%dT%H:%M:%S</code>
### Users & groups
id|intermediate|User/group IDs|id|Print real/effective UID, GID, groups.|Useful when debugging permissions.
groups|beginner|User groups|groups [user]|Print group memberships.|Shows supplemental groups.
whoami|beginner|Current user|whoami|Print effective username.|Use with <code>id</code> for full user and group info.
who|intermediate|Logged-in users|who|List users on terminals.|Complements <code>w</code>.
w|intermediate|Who and load|w|Who is logged in and what they are running.|Shows load average and TTY activity.
logname|beginner|Login name|logname|Print login name from utmp (not effective user).|May differ from <code>whoami</code> after su.
newgrp|advanced|Switch group|newgrp group|Start shell with new primary group.|Rare; often use <code>sg</code> instead.
su|intermediate|Switch user|su - username|Substitute user; <code>-</code> login shell.|Prompts for target user's password (unless root).
sudo|intermediate|Run as root|sudo command|Execute command with elevated privileges.|Configure in <code>/etc/sudoers</code> with visudo.
sudo -i|intermediate|sudo login shell|sudo -i|Simulate initial login as root (or user).|Loads profile like a full login.
sudo su|intermediate|Root shell|sudo su -|Often used to get root shell (distribution dependent).|Prefer <code>sudo -i</code> when possible.
passwd|intermediate|Change password|passwd|Change user password.|Root can set other users' passwords.
chage|advanced|Password aging|chage -l user|View/edit password expiry policy.|Account compliance and security audits.
gpasswd|advanced|Group admin|gpasswd -a user group|Administer group membership and password.|Needs appropriate privileges.
useradd|advanced|Add user|sudo useradd -m -s /bin/bash newuser|Create system account.|<code>-m</code> home, <code>-G</code> extra groups.
userdel|advanced|Delete user|sudo userdel -r username|Remove user; <code>-r</code> remove home.|Careful with ownership of orphaned files.
usermod|advanced|Modify user|sudo usermod -aG docker user|Modify user attributes and groups.|<code>-aG</code> append to group (don't drop others).
groupadd|advanced|Add group|sudo groupadd groupname|Create a new group.|Then <code>usermod -aG</code> to assign users.
groupdel|advanced|Delete group|sudo groupdel groupname|Remove a group.|Cannot remove primary group of existing user.
groupmod|advanced|Modify group|sudo groupmod -n new old|Rename or change GID.|Rare; plan GID references in ACLs.
login|advanced|System login|login|Start session on TTY (usually invoked by getty).|Not used daily from shell on desktops.
### Processes & job control
ps|beginner|Process snapshot|ps|Snapshot of processes for your terminal.|See <code>ps aux</code> or <code>ps -ef</code> for full list.
ps aux|intermediate|BSD-style processes|ps aux|All processes, user-oriented format.|Columns: USER, PID, %CPU, %MEM, CMD, etc.
ps -ef|intermediate|POSIX processes|ps -ef|Full listing with PPID in standard syntax.|Alternative style to aux; both common.
top|beginner|Live processes|top|Interactive process viewer sorted by CPU.|q quit; k kill; sorting keys vary.
htop|intermediate|Enhanced top|htop|Color, tree, search—friendlier than top.|Install if missing: <code>apt install htop</code>
atop|advanced|Advanced monitor|atop|Logs resource usage over time (if configured).|Heavier than top; good for post-mortem.
kill|intermediate|Signal process|kill PID|Send default SIGTERM to process.|Graceful shutdown; process may ignore.
kill -9|intermediate|Force kill|kill -9 PID|Send SIGKILL—cannot be caught.|Last resort; may lose unsaved state.
killall|intermediate|Kill by name|killall processname|Kill processes by executable name.|Risky if name matches unrelated processes.
pkill|intermediate|Kill by pattern|pkill -f pattern|Signal processes matching pattern.|Safer with exact patterns; test with <code>pgrep</code> first.
nice|intermediate|Lower priority|nice -n 10 command|Run with lower CPU scheduling priority.|Range typically -20 (high) to 19 (low).
renice|intermediate|Change priority|renice +10 -p PID|Adjust priority of running process.|Requires permission for negative nice.
bg|intermediate|Background job|bg %1|Resume stopped job in background.|Use after Ctrl+Z; <code>jobs</code> lists.
fg|intermediate|Foreground job|fg %1|Bring background job to foreground.|Continue interactive program.
jobs|intermediate|List jobs|jobs|Shell job control list for current session.|Job numbers used with fg/bg.
nohup|intermediate|Immune to hangup|nohup command &|Keep running after terminal closes.|Output to <code>nohup.out</code> by default.
time|beginner|Time command|time command|Report real/user/sys time for command.|Builtin in bash; <code>/usr/bin/time</code> for more detail.
uptime|beginner|Load and uptime|uptime|How long system up, user count, load averages.|Load avg: 1, 5, 15 minute.
tload|intermediate|Terminal load graph|tload|ASCII graph of load average.|Simple visual on TTY.
pidof|intermediate|PIDs by name|pidof nginx|Print PIDs of processes matching name.|Useful in init scripts.
pgrep|intermediate|Find PIDs|pgrep pattern|List PIDs matching pattern.|Pair with <code>pkill</code> carefully.
pstree|intermediate|Process tree|pstree|Show parent/child relationships.|Great for understanding service trees.
### Memory & performance
free|beginner|Memory usage|free|Show RAM and swap usage.|<code>-h</code> human-readable.
free -h|beginner|Memory human|free -h|Same as free with human sizes.|Quick health check.
vmstat|advanced|Virtual memory stats|vmstat 1|Report processes, memory, swap, IO, CPU each second.|Classic performance triage.
iostat|advanced|IO stats|iostat -xz 1|CPU and disk IO statistics (sysstat).|Install <code>sysstat</code> package.
mpstat|advanced|Per-CPU stats|mpstat -P ALL 1|CPU utilization per processor.|Part of sysstat.
sar|advanced|Historical stats|sar -u 1 5|Collect/report historical performance data.|Requires sysstat data collection enabled.
strace|advanced|Syscall trace|strace -f command|Trace system calls for debugging.|Use <code>-e trace=file</code> to filter.
ltrace|advanced|Library calls|ltrace command|Trace dynamic library calls.|Complements strace for shared libs.
timeout|intermediate|Limit runtime|timeout 10s command|Kill command after duration.|GNU coreutils; useful in CI and scripts.
sleep|beginner|Sleep|sleep 5|Pause for given seconds (or suffix s/m/h/d).|Common in loops and retries.
### Networking
ping|beginner|ICMP echo|ping -c 4 host|Test reachability and latency.|<code>-c</code> count; on Linux ping may need stop with count.
ifconfig|intermediate|Interface config|ifconfig|Legacy view/configure network interfaces.|Prefer <code>ip</code> on modern Linux.
ip addr|beginner|IP addresses|ip addr|Show interface addresses (iproute2).|Replacement for parts of ifconfig.
ip link|intermediate|Link layer|ip link|Show interfaces up/down state and MTU.|Bring up: <code>sudo ip link set dev eth0 up</code>
ip route|intermediate|Routing table|ip route|Show or manipulate routing.|Default gateway and static routes.
ip neigh|intermediate|Neighbor table|ip neigh|ARP/NDP neighbor cache (ARP table).|Debug L2 connectivity issues.
netstat|intermediate|Network stats|netstat -tulpn|Sockets and routing (legacy).|Often replaced by <code>ss</code>.
ss|intermediate|Socket stats|ss -tuln|Modern socket listing; fast.|Filter: <code>ss -tuln sport = :443</code>
ss -tuln|intermediate|Listening TCP/UDP|ss -tuln|TCP/UDP listening sockets, numeric ports.|See which services bind which ports.
ss -s|intermediate|Socket summary|ss -s|Summary counts of socket states.|Quick overview of connection load.
hostname|beginner|Hostname|hostname|Print or set system hostname.|Transient vs persistent depends on method.
hostnamectl|intermediate|Hostname (systemd)|hostnamectl|View/set hostname, icon, chassis (systemd).|<code>sudo hostnamectl set-hostname name</code>
arp|intermediate|ARP table|arp -a|Show ARP cache (legacy).|Prefer <code>ip neigh</code> on Linux.
arping|advanced|ARP ping|arping -I eth0 192.168.1.1|Test L2 reachability to IP on interface.|Useful when ICMP blocked.
route|intermediate|Routing (legacy)|route -n|Show kernel routing table (net-tools).|Use <code>ip route</code> going forward.
traceroute|intermediate|Trace route|traceroute host|Show hops to destination.|UDP/ICMP method depends on OS/version.
tracepath|intermediate|Trace path (no root)|tracepath host|Similar to traceroute without raw sockets.|May be installed by default.
mtr|intermediate|Dynamic traceroute|mtr host|Combines ping and traceroute interactively.|Install <code>mtr-tiny</code> or full package.
dig|intermediate|DNS lookup|dig example.com|Query DNS with full output.|<code>+short</code> for minimal answer.
nslookup|beginner|DNS lookup (simple)|nslookup example.com|Interactive or one-shot DNS query.|Older; dig is often preferred.
whois|intermediate|WHOIS lookup|whois example.com|Registrar and domain registration data.|Rate limits apply at some servers.
curl|beginner|Transfer URL|curl -O https://example.com/f|HTTP/FTP client; download, headers, POST.|<code>-L</code> follow redirects; <code>-v</code> verbose.
wget|beginner|Download|wget URL|Non-interactive file download.|Recursive mirroring: <code>wget -r</code> (careful).
scp|intermediate|SSH copy|scp file user@host:/path|Copy over SSH.|Same syntax as cp with remote <code>user@host:</code>
sftp|intermediate|SSH file transfer|sftp user@host|Interactive SFTP session.|Batch: <code>sftp -b batchfile</code>
ftp|intermediate|FTP client|ftp host|Classic file transfer protocol client.|Prefer SFTP/HTTPS for security.
telnet|intermediate|Telnet client|telnet host 23|Test TCP connectivity to port.|Insecure for login; use for debugging banners.
nc|intermediate|Netcat|nc -zv host 443|TCP/UDP swiss-army knife.|Listen: <code>nc -lvp 4444</code>; many variants (openbsd vs traditional).
nmap|advanced|Port scan|nmap -sV host|Network discovery and security scanning.|Only scan networks you own or have permission.
ssh|beginner|Secure shell|ssh user@host|Encrypted remote shell and tunneling.|<code>-i key</code>, <code>-p port</code>, <code>-L</code> local forward.
ssh-keygen|intermediate|SSH keys|ssh-keygen -t ed25519|Generate SSH key pair.|Protect private key with passphrase.
ssh-copy-id|intermediate|Install pubkey|ssh-copy-id user@host|Append local pubkey to remote authorized_keys.|Easiest first-time key setup.
tcpdump|advanced|Capture packets|sudo tcpdump -i eth0|Capture network traffic to file or stdout.|Requires privileges; respect privacy/law.
iftop|advanced|Bandwidth by conn|sudo iftop|Per-connection bandwidth (needs root).|Install iftop package.
nload|intermediate|Network load|nload eth0|Graph incoming/outgoing throughput.|Simple real-time view.
iperf|intermediate|Bandwidth test|iperf -s / iperf -c host|Measure TCP/UDP throughput.|iperf3 is newer parallel tool.
iperf3|intermediate|Bandwidth test v3|iperf3 -s|Modern replacement for iperf.|Client: <code>iperf3 -c host</code>
ethtool|advanced|NIC settings|sudo ethtool eth0|Show/link speed, driver, offload flags.|Change settings with care.
nmcli|intermediate|NetworkManager CLI|nmcli dev status|Control NetworkManager from terminal.|Wi-Fi: <code>nmcli dev wifi list</code>
iwconfig|intermediate|Wireless config|iwconfig wlan0|Legacy wireless interface config.|Being replaced by <code>iw</code>.
iwlist|intermediate|Scan Wi-Fi|iwlist wlan0 scan|List nearby wireless networks (legacy).|May need sudo; see also <code>nmcli</code>.
iw|advanced|nl80211 Wi-Fi|iw dev|Modern wireless configuration and info.|Part of iw package.
bridge|advanced|Linux bridge|bridge link|Manage bridge ports (iproute2 bridge utility).|Used with containers/KVM networking.
### Package management
apt|beginner|APT frontend|sudo apt update|High-level Debian/Ubuntu package manager.|User-friendly; wraps apt-get/dpkg.
apt-get|intermediate|APT get|sudo apt-get install pkg|Lower-level APT commands.|Used in scripts; stable interface.
apt-cache|intermediate|Search packages|apt-cache search nginx|Query APT package cache.|Also <code>apt-cache policy pkg</code>
apt-key|advanced|APT key (legacy)|sudo apt-key add key.asc|Deprecated on modern Ubuntu—prefer signed-by.|Migrate to keyring files in trusted.gpg.d.
apt update|beginner|Refresh package index|sudo apt update|Download package lists from repositories.|Run before upgrade/install.
apt upgrade|beginner|Upgrade packages|sudo apt upgrade|Install newer versions of installed packages.|May hold back if dependencies change.
apt install|beginner|Install package|sudo apt install nginx|Install one or more packages.|<code>-y</code> non-interactive.
apt remove|beginner|Remove package|sudo apt remove pkg|Remove package but leave config files.|<code>purge</code> removes config too.
apt purge|intermediate|Purge package|sudo apt purge pkg|Remove package and configuration files.|Cleaner than remove for abandoned apps.
dpkg|intermediate|Debian package|dpkg -l|Low-level package manager for .deb files.|<code>-L</code> list files, <code>-S</code> search path.
dpkg -i|intermediate|Install .deb|sudo dpkg -i package.deb|Install local deb file.|Fix deps: <code>sudo apt -f install</code>
dpkg -l|beginner|List packages|dpkg -l|List all installed packages (pattern optional).|Pipe to grep for search.
dpkg -r|intermediate|Remove .deb pkg|sudo dpkg -r pkgname|Remove package via dpkg.|Often use apt remove instead.
add-apt-repository|intermediate|Add PPA/repo|sudo add-apt-repository ppa:user/ppa|Add APT source (Ubuntu).|Then <code>apt update</code>.
yum|intermediate|Yellowdog updater|sudo yum install pkg|Older RHEL/CentOS package manager.|Largely replaced by dnf on RHEL 8+.
yum install|intermediate|yum install|sudo yum install pkg|Install RPM packages on yum-based systems.|Equivalent modern: dnf install.
yum remove|intermediate|yum remove|sudo yum remove pkg|Remove package with yum.|Also <code>yum erase</code>
yum update|intermediate|yum update|sudo yum update|Update all packages.|May include kernel; plan reboots.
yum list|intermediate|yum list|yum list installed|List/search packages.|Pattern matching supported.
dnf|intermediate|DNF package mgr|sudo dnf install pkg|Modern Fedora/RHEL package manager.|Faster dependency solver than yum.
dnf install|beginner|dnf install|sudo dnf install pkg|Install on Fedora/RHEL 8+.|Similar UX to apt install.
dnf remove|beginner|dnf remove|sudo dnf remove pkg|Remove package with dnf.|Also removes unused deps with autoremove.
dnf update|beginner|dnf update|sudo dnf update|Upgrade packages on Fedora/RHEL.|Check release notes for breaking changes.
rpm|intermediate|RPM manager|rpm -qa|Low-level RPM queries and installs.|Query: <code>rpm -qi pkg</code>
rpm -i|intermediate|rpm install|sudo rpm -ivh pkg.rpm|Install RPM file.|Prefer dnf/yum to resolve dependencies.
rpm -e|intermediate|rpm erase|sudo rpm -e pkgname|Erase RPM package.|Does not remove deps automatically.
rpm -qa|beginner|List all RPMs|rpm -qa|Query all installed RPM packages.|grep to find specific package.
zypper|intermediate|openSUSE zypper|sudo zypper install pkg|Package manager for SUSE/openSUSE.|Also <code>zypper se</code> search.
snap|intermediate|Snap packages|snap list|Universal packages from Canonical.|Snaps are self-contained but larger.
snap install|intermediate|snap install|sudo snap install code|Install snap package.|Classic confinement needs --classic.
snap remove|intermediate|snap remove|sudo snap remove code|Remove snap package.|Frees disk used by revision.
flatpak|intermediate|Flatpak|flatpak list|Distribution-agnostic application packages.|Uses OSTree; Flathub for apps.
flatpak install|intermediate|flatpak install|flatpak install flathub org.gimp.GIMP|Install from remote.|User vs system install options.
flatpak remove|intermediate|flatpak remove|flatpak remove org.gimp.GIMP|Uninstall flatpak app.|run <code>flatpak uninstall --unused</code>
### Disks & filesystems
mount|intermediate|Mount filesystem|sudo mount /dev/sdb1 /mnt|Attach filesystem at mountpoint.|Read <code>/etc/fstab</code> for persistence.
umount|intermediate|Unmount|sudo umount /mnt|Detach filesystem safely.|Busy errors: use <code>lsof</code> or <code>fuser</code>.
lsblk|beginner|Block devices|lsblk|List disks and partitions as tree.|<code>-f</code> show filesystems and UUIDs.
blkid|intermediate|Block UUID|sudo blkid|Print UUID/TYPE/LABEL of block devices.|Use UUID in fstab for stable mounts.
fdisk|advanced|Partition MBR|sudo fdisk /dev/sdb|Interactive partition table editor (MBR/GPT).|Destructive—backup data first.
fdisk -l|intermediate|List partitions|sudo fdisk -l|List partition tables of all disks.|Quick disk layout overview.
parted|advanced|Partition parted|sudo parted /dev/sdb|Partition editor scriptable and GPT-friendly.|Alternative to fdisk/gdisk.
mkfs|advanced|Make filesystem|sudo mkfs.ext4 /dev/sdb1|Create filesystem on partition.|Destroys data on partition.
mkfs.ext4|advanced|Format ext4|sudo mkfs.ext4 -L mydata /dev/sdb1|Create ext4 with label.|Common default on many distros.
mkfs.xfs|advanced|Format XFS|sudo mkfs.xfs /dev/sdb1|Create XFS filesystem.|Good for large files and parallel IO.
fsck|advanced|Check filesystem|sudo fsck /dev/sdb1|Check and repair filesystem (unmount first).|Run on boot after unclean shutdown sometimes.
fsck.ext4|advanced|Check ext4|sudo fsck.ext4 /dev/sdb1|Filesystem-specific checker.|Answer prompts carefully or use -y (risky).
tune2fs|advanced|Tune ext2/3/4|sudo tune2fs -l /dev/sdb1|Adjust ext filesystem parameters.|Change max mount count, label, etc.
resize2fs|advanced|Resize ext|sudo resize2fs /dev/sdb1|Grow or shrink ext2/3/4 (after partition resize).|Backup before resizing.
mkswap|advanced|Make swap|sudo mkswap /dev/sdb2|Initialize swap area.|Then <code>swapon</code>.
swapon|intermediate|Enable swap|sudo swapon /swapfile|Activate swap partition or file.|Check <code>free -h</code>.
swapoff|intermediate|Disable swap|sudo swapoff /swapfile|Deactivate swap.|Before shrinking swap file/partition.
mount -a|intermediate|Mount fstab|sudo mount -a|Mount all filesystems in /etc/fstab.|Test after editing fstab to catch errors.
findmnt|beginner|List mounts|findmnt|Tree view of mounts (util-linux).|Shows target, source, fstype.
lsblk -f|intermediate|lsblk filesystems|lsblk -f|Filesystem type, UUID, label, mountpoint.|Pair with fstab editing.
mount -o|advanced|Mount options|sudo mount -o remount,ro /|Mount with specific options.|remount ro/rw without unmount when possible.
e2fsck|advanced|ext family check|sudo e2fsck -f /dev/sdb1|Another name for fsck for ext.|Use on unmounted filesystem.
badblocks|advanced|Test blocks|sudo badblocks -sv /dev/sdb|Search for bad sectors (destructive read/write tests).|Can indicate failing disk.
### Archives & compression
tar|beginner|Tape archive|tar -cf archive.tar dir|Create tar archive without compression.|<code>-x</code> extract, <code>-t</code> list.
tar -cvf|beginner|tar create verbose|tar -cvf archive.tar dir|Create tar with file list printed.|c=create, v=verbose, f=file.
tar -xvf|beginner|tar extract verbose|tar -xvf archive.tar|Extract and list files.|Extract to current dir or <code>-C path</code>.
tar -czvf|intermediate|tar gzip create|tar -czvf backup.tar.gz dir|Create gzip-compressed tarball.|z=gzip.
tar -xzvf|intermediate|tar gzip extract|tar -xzvf backup.tar.gz|Extract .tar.gz|.Same flags; order of z/f matters with older tar.
gzip|intermediate|Compress gzip|gzip file|Compress file to .gz (replaces original).|<code>-k</code> keep original (GNU).
gunzip|intermediate|Decompress gzip|gunzip file.gz|Decompress .gz to original name.|Same as <code>gzip -d</code>.
zcat|intermediate|cat gzip|zcat file.gz|Print gzip file to stdout without decompressing to disk.|Pipe-friendly.
zgrep|intermediate|grep gzip|zgrep pattern file.gz|grep inside gzip file without manual zcat.|Handy for compressed logs.
zip|intermediate|Zip archive|zip -r archive.zip dir|Create zip archive (PKZIP).|Cross-platform exchange with Windows.
unzip|intermediate|Unzip|unzip archive.zip|Extract zip archive.|<code>-l</code> list without extracting.
7z|intermediate|7-Zip|7z a arc.7z dir|High compression 7z format.|Install p7zip-full; syntax varies.
7za|intermediate|7za standalone|7za x archive.7z|Standalone 7zip binary.|Similar to 7z.
rar|intermediate|RAR archive|rar a arc.rar files|Proprietary RAR format (non-free rar).|Often use zip/7z instead.
unrar|intermediate|Extract RAR|unrar x archive.rar|Extract RAR archives.|May need non-free unrar package.
lzcat|advanced|cat LZMA|lzcat file.lzma|Decompress LZMA to stdout.|Part of xz-utils family.
lzma|advanced|LZMA compress|lzma file|Old LZMA single-file compression.|Often replaced by xz.
xz|intermediate|xz compress|xz file|Compress to .xz with high ratio.|xz -d to decompress; common for tarballs.
unxz|intermediate|xz decompress|unxz file.xz|Decompress .xz file.|Same as xz -d.
bzcat|intermediate|cat bzip2|bzcat file.bz2|Print bzip2-compressed file.|Like zcat for bz2.
bzip2|intermediate|bzip2 compress|bzip2 file|Compress with bzip2 (slower, smaller than gzip).|<code>-d</code> decompress.
bunzip2|intermediate|bzip2 decompress|bunzip2 file.bz2|Decompress bz2.|Same as bzip2 -d.
### System & hardware info
uname|beginner|Unix name|uname|Print kernel name.|<code>-a</code> all info.
uname -a|beginner|All system info|uname -a|Kernel name, hostname, kernel release, machine, OS.|Quick system fingerprint.
arch|beginner|Machine hardware|arch|Print machine hardware name (e.g. x86_64).|Similar to <code>uname -m</code>.
lscpu|intermediate|CPU info|lscpu|CPU architecture, cores, caches, flags.|Useful for performance tuning.
lsmem|intermediate|Memory list|lsmem|List memory blocks and online status.|Newer util-linux feature.
lsusb|intermediate|USB devices|lsusb|List USB buses and devices.|Debug peripheral detection.
lspci|intermediate|PCI devices|lspci|List PCI/PCIe devices (GPUs, NICs).|<code>-v</code> verbose.
dmesg|intermediate|Kernel ring buffer|dmesg|Kernel log since boot (hardware, drivers).|<code>-T</code> human time; may need sudo.
dmidecode|advanced|DMI/SMBIOS|sudo dmidecode|Hardware info from BIOS (serial, RAM slots).|Sensitive; often restricted.
hwinfo|advanced|Hardware probe|hwinfo|Detailed hardware listing (SUSE).|Install package; very verbose.
inxi|intermediate|System summary|inxi -Fxxx|All-in-one system information script.|Popular on forums for support.
### Login & audit
last|intermediate|Last logins|last|Show last logged-in users and reboot times.|Reads /var/log/wtmp.
lastlog|intermediate|Last login per user|lastlog|Last login time for each user.|Useful for stale accounts audit.
### Cron & at
crontab|intermediate|User cron|crontab -e|Edit per-user crontab.|Syntax: min hour dom mon dow command.
crontab -e|intermediate|Edit crontab|crontab -e|Open editor for current user's cron jobs.|Uses EDITOR env var.
crontab -l|beginner|List crontab|crontab -l|List current user's cron entries.|Backup before editing.
at|intermediate|One-shot schedule|at 5pm tomorrow|Run command once at scheduled time.|Needs atd service running.
atq|intermediate|at queue|atq|List pending at jobs.|atrm to remove.
atrm|intermediate|Remove at job|atrm 1|Delete job number from at queue.|From atq output.
### Power & systemd
shutdown|intermediate|Shutdown system|sudo shutdown -h +10|Halt or power off after delay.|Broadcasts message to users.
shutdown -h now|intermediate|Halt now|sudo shutdown -h now|Halt system immediately (or now).|Equivalent: <code>poweroff</code> on systemd.
shutdown -r now|intermediate|Reboot now|sudo shutdown -r now|Reboot system now.|Users logged in may be disconnected.
reboot|beginner|Reboot|sudo reboot|Restart the system (systemd).|Ensure saves and sync before reboot.
poweroff|beginner|Power off|sudo poweroff|Power down the system.|ACPI power off when supported.
halt|intermediate|Halt|sudo halt|Stop CPU (behavior varies by init).|On systemd often stops like poweroff.
systemctl|intermediate|systemd control|systemctl status nginx|Control systemd units.|start, stop, restart, enable, disable, status.
systemctl status|beginner|Service status|systemctl status ssh|Show unit state and recent log lines.|First step when service fails.
systemctl start|beginner|Start service|sudo systemctl start nginx|Start a systemd unit now.|Does not enable on boot unless enable.
systemctl stop|beginner|Stop service|sudo systemctl stop nginx|Stop a running unit.|Opposite of start.
systemctl restart|intermediate|Restart service|sudo systemctl restart nginx|Stop then start (reload config if service supports).|Use reload when available for less disruption.
systemctl enable|intermediate|Enable on boot|sudo systemctl enable nginx|Create symlinks so unit starts at boot.|Pair with start for immediate effect.
systemctl disable|intermediate|Disable on boot|sudo systemctl disable nginx|Remove boot symlinks for unit.|Does not stop if already running.
journalctl -xe|intermediate|systemd journal|journalctl -xe|Query journal; this form highlights errors and common issues.|Also <code>journalctl -u service -f</code> to follow one unit.
journalctl -u|intermediate|journalctl unit|journalctl -u nginx -f|Follow logs for specific service.|Like tail -f for journald.
### Shell environment & multiplexers
env|beginner|Environment|env|Print environment or run command with env.|Clean env: <code>env -i bash</code>
printenv|beginner|Print env var|printenv PATH|Print value of variable(s).|Similar to <code>echo $PATH</code> but safer for empty.
export|beginner|Export variable|export VAR=value|Mark shell variable for child processes.|Put in ~/.bashrc for persistence.
set|intermediate|Shell options|set -o|Display shell options and positional params.|Debugging: <code>set -x</code> trace.
unset|intermediate|Unset variable|unset VAR|Remove shell variable.|Functions: <code>unset -f name</code>
alias|beginner|Alias command|alias ll='ls -la'|Define command shortcut.|List aliases: <code>alias</code>
unalias|beginner|Remove alias|unalias ll|Remove alias definition.|Common in scripts for predictable commands.
history|beginner|Command history|history|Show numbered command history.|Reuse: <code>!42</code>, <code>!!</code>
clear|beginner|Clear terminal|clear|Clear screen (scrollback may remain).|Ctrl+L in bash.
reset|intermediate|Reset terminal|reset|Reinitialize terminal after garbled display.|Slower than clear; fixes escape chaos.
echo|beginner|Print line|echo hello|Print arguments.|<code>-e</code> escapes (echo varies; prefer printf for portability).
printf|intermediate|Formatted print|printf '%s\n' "$var"|Portable formatted output.|Use for scripts needing format control.
script|intermediate|Record session|script session.log|Record terminal I/O to typescript.|Ends with exit or Ctrl+D.
screen|intermediate|GNU Screen|screen -S work|Terminal multiplexer; detach with Ctrl+A D.|Reattach: <code>screen -r work</code>
tmux|intermediate|tmux|tmux new -s dev|Terminal multiplexer; detach Ctrl+B D.|Sessions survive SSH disconnect.
source|beginner|Source script|source file.sh|Run script in current shell (bash).|Same as <code>. file.sh</code>
dot-source|beginner|Dot source|. ./vars.sh|POSIX dot: source script in current shell.|Same as <code>source</code> in bash; relative path common for env files.
exec|advanced|Replace shell|exec ./myserver|Replace shell process with command.|Used in containers and init scripts.
xargs|advanced|Stdin to args|find . -name '*.txt' -print0 | xargs -0 rm|Build command lines from stdin.|<code>-0</code> with null-delimited find.
tee|intermediate|Tee output|cmd | tee log.txt|Copy stdout to file and pass through.|Append: <code>tee -a</code>
exit|beginner|Exit shell|exit 0|Exit shell with status code.|0 success; non-zero error for scripts.
logout|beginner|Logout shell|logout|End login shell session.|Same as exit in login shells.
### Shell session & file utilities
od|intermediate|Octal dump|od -c file|Dump file in octal/hex/char.|Inspect binary files.
strings|intermediate|Print strings|strings /bin/ls|Print printable strings from binary.|Quick look inside executables.
xxd|intermediate|Hex dump|xxd file|Hexadecimal dump of file.|Reverse: <code>xxd -r</code>
watch|intermediate|Watch command|watch -n 2 df -h|Run command every N seconds, full screen refresh.|Monitor changing output.
install|intermediate|Copy with modes|install -m 755 script.sh /usr/local/bin/|Copy files and set ownership/mode.|Common in Makefiles.
truncate|intermediate|Truncate file|truncate -s 0 file|Shrink or extend file to size.|Fast sparse extension on some FS.
sync|beginner|Flush buffers|sync|Write filesystem buffers to disk.|Before unplugging media (best effort).
dir|beginner|dir listing|dir|Similar to ls (often GNU dir).|Color and columns like ls.
vdir|beginner|Vertical dir|vdir|Long listing like ls -l in GNU.|Rarely used vs ls.
chattr|advanced|Change attributes|sudo chattr +i file|ext filesystem immutable flag and more.|+i prevents even root delete until -i.
lsattr|advanced|List attributes|lsattr file|Show chattr flags on ext files.|i, a append-only, etc.
### Documentation & integrity
man|beginner|Manual page|man command|Display manual page for a command.|q quit; <code>man -k</code> apropos.
rsync|intermediate|Sync files|rsync -avz source/ user@host:dest/|Sync directories over SSH or locally with archive mode.|Trailing slash on source copies directory contents; use <code>--dry-run</code> first.
lsof|advanced|Open files|lsof -i :8080|List open files and network sockets by process.|Who has port 80: <code>lsof -i :80</code>; by PID: <code>lsof -p PID</code>.
dd|advanced|Block-level copy|dd if=input.img of=/dev/sdb bs=4M status=progress|Copy raw blocks—can wipe disks if of= is wrong.|Always verify <code>if=</code> and <code>of=</code>; not for normal file copy.
md5sum|intermediate|MD5 checksum|md5sum file|Compute or verify MD5 hashes.|Verify: <code>md5sum -c checksums.txt</code>; prefer <code>sha256sum</code> when security matters.
sha256sum|intermediate|SHA-256 checksum|sha256sum file|Stronger checksum for integrity checks.|Common for ISOs, container images, and release artifacts.
`

const lines = raw
  .trim()
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean)

const objs = []
const seenIds = new Map()
let category = 'Linux'

for (const line of lines) {
  if (line.startsWith('###')) {
    category = line.replace(/^###\s*/, '').trim() || 'Linux'
    continue
  }
  const parts = line.split('|')
  // Format: unusedKey|level|name|command|description|explanation (command may contain |)
  if (parts.length < 6) continue
  const level = parts[1]
  if (!['beginner', 'intermediate', 'advanced'].includes(level)) continue
  const name = parts[2]
  const command = parts.slice(3, -2).join('|').trim()
  const description = parts[parts.length - 2]
  const explanation = parts[parts.length - 1]
  if (!command) continue
  let id = makeId(command)
  if (seenIds.has(id)) {
    let n = 2
    while (seenIds.has(`${id}-${n}`)) n++
    id = `${id}-${n}`
  }
  seenIds.set(id, true)
  objs.push({
    id,
    tool: 'linux',
    category,
    level,
    name,
    command,
    description,
    explanation,
  })
}

const header = `/**
 * Linux command reference — expanded catalog with categories (see ### headers in scripts/gen-linux.mjs).
 * Merged into COMMANDS_DATA in commands.js.
 */
export const LINUX_COMMANDS = `

fs.writeFileSync(path, `${header}${JSON.stringify(objs, null, 2)};\n`)
console.log('Wrote', objs.length, 'entries')

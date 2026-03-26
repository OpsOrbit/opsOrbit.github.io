/**
 * Extra content for commands: example, exampleOutput, whyNeed, commonOptions, scenarios, image.
 * Key = command id. Merge with COMMANDS_DATA when displaying in panel.
 * image: path to screenshot/illustration (use /images/commands/<id>.png for real pics; placeholder used otherwise).
 */
const IMG = (id) => `/images/commands/${id}.png`

export const COMMAND_EXTRAS = {
  'git-status': {
    example: 'git status',
    exampleOutput: 'On branch main\nYour branch is up to date with origin/main.\n  modified:   src/app.js\n  new file:   README.md\n\nno changes added to commit',
    whyNeed: 'To see what has changed before committing—which files are new, modified, or staged. Essential for a clear picture of your working tree.',
    commonOptions: '-s (short), --porcelain (script-friendly), -b (branch info).',
    scenarios: 'Before every commit; after pulling or switching branch; when debugging "why did my change disappear?"; in CI to check for uncommitted changes.',
    image: IMG('git-status'),
    suggestedNext: ['git-add', 'git-commit', 'git-diff']
  },
  'git-add': {
    example: 'git add src/  &&  git add -p app.js',
    exampleOutput: 'After git add src/: nothing visible. After git add -p: patch prompts for each hunk (y/n/s/q).',
    whyNeed: 'Git only commits what you stage. This command prepares (stages) changes so they are included in the next commit.',
    commonOptions: '. (all), -p (interactive patch), -A (all including deletions), -u (tracked only).',
    scenarios: 'Staging specific files for a focused commit; using git add -p to stage only parts of a file; preparing a clean commit for code review.',
    image: IMG('git-add'),
    suggestedNext: ['git-commit', 'git-status', 'git-diff']
  },
  'git-commit': {
    example: 'git commit -m "Add login validation"',
    exampleOutput: '[main a1b2c3d] Add login validation\n 2 files changed, 45 insertions(+), 3 deletions(-)',
    whyNeed: 'Creates a snapshot of your staged changes with a message. The message helps your team (and future you) understand why the change was made.',
    commonOptions: '-m (message), -a (stage modified tracked files), --amend (fix last commit), -v (include diff in editor).',
    scenarios: 'After completing a logical change; before switching branch; creating a clear history for revert or bisect; meeting team commit-message standards.',
    image: IMG('git-commit'),
    suggestedNext: ['git-push', 'git-status', 'git-pull']
  },
  'git-push': {
    example: 'git push -u origin feature/auth',
    exampleOutput: 'Enumerating objects: 12, done.\nCounting objects: 100% (12/12), done.\nWriting objects: 100% (8/8), 1.2 KiB | 1.2 MiB/s, done.\nTotal 8 (delta 0), reused 0 (delta 0)\nTo github.com:org/repo.git\n * [new branch] feature/auth -> feature/auth',
    whyNeed: 'Sends your local commits to the remote so others can pull them, or so CI/CD can run. Without push, your work stays only on your machine.',
    commonOptions: '-u (set upstream), --force-with-lease (safe force), -o push_option (e.g. ci.skip).',
    scenarios: 'Pushing a feature branch for review; updating main after merge; deploying via push-to-deploy; backing up work to remote.',
    image: IMG('git-push'),
    suggestedNext: ['git-pull', 'git-status', 'git-commit']
  },
  'git-pull': {
    example: 'git pull origin main --rebase',
    exampleOutput: 'Successfully rebased and updated refs/heads/feature.',
    whyNeed: 'Brings remote changes into your branch so you stay in sync with the team and avoid merge conflicts piling up.',
    commonOptions: '--rebase (replay your commits on top), --no-rebase (merge), --autostash (stash then re-apply).',
    scenarios: 'Starting the day by pulling latest; before creating a PR; after someone else pushed to your branch; keeping a long-lived branch updated.',
    image: IMG('git-pull'),
    suggestedNext: ['git-status', 'git-branch', 'git-add']
  },
  'git-clone': {
    example: 'git clone https://github.com/org/repo.git myfolder',
    exampleOutput: 'Cloning into \'myfolder\'...\nremote: Enumerating objects: 142, done.\nremote: Total 142 (delta 0), reused 0 (delta 0)\nReceiving objects: 100% (142/142), 28.5 KiB | 2.2 MiB/s, done.\nResolving deltas: 100% (56/56), done.',
    whyNeed: 'Gets a full copy of a repository so you can work locally. First step for any new project or new machine.',
    commonOptions: '--depth 1 (shallow), --branch name, --single-branch.',
    scenarios: 'Onboarding to a new repo; setting up a new laptop; cloning a dependency or reference project; CI cloning the repo to build.',
    image: IMG('git-clone'),
    suggestedNext: ['git-status', 'git-branch', 'git-add']
  },
  'git-stash': {
    example: 'git stash push -m "WIP: auth"  then  git stash pop',
    exampleOutput: 'Saved working directory and index state On main: WIP: auth\nDropped refs/stash@{0}',
    whyNeed: 'Temporarily shelves uncommitted changes so you can switch context (e.g. switch branch or pull) without committing half-done work.',
    commonOptions: 'push -m "msg", list, pop (apply and remove), apply (keep), drop, show -p.',
    scenarios: 'Quick switch to fix a bug on main; before pull when you have local changes; saving work-in-progress without committing.',
    image: IMG('git-stash'),
    suggestedNext: ['git-status', 'git-add', 'git-commit']
  },
  'git-diff': {
    example: 'git diff  and  git diff main..feature --stat',
    exampleOutput: 'diff --git a/app.js b/app.js\nindex 123..456 100644\n--- a/app.js\n+++ b/app.js\n@@ -1,3 +1,4 @@\n+console.log("hello");',
    whyNeed: 'Shows exactly what changed line-by-line. Critical for code review, debugging, and understanding the impact of a change.',
    commonOptions: '--staged (cached), --stat (summary), main..branch (compare branches), -w (ignore whitespace).',
    scenarios: 'Before committing to double-check changes; comparing your branch to main; in code review to see the full diff.',
    image: IMG('git-diff'),
    suggestedNext: ['git-add', 'git-commit', 'git-status']
  },
  'linux-ls': {
    example: 'ls -la /var/log',
    exampleOutput: 'total 128\ndrwxr-xr-x 12 root root 4096 Mar 15 10:00 .\ndrwxr-xr-x 24 root root 4096 Mar 10 08:00 ..\n-rw-r--r--  1 root root 1234 Mar 15 09:00 syslog',
    whyNeed: 'Lists files and directories so you can see what exists, permissions, and timestamps. One of the first commands you run in a new directory.',
    commonOptions: '-l (long), -a (all including .), -h (human sizes), -t (sort by time), -r (reverse).',
    scenarios: 'Exploring a server; checking log directory contents; verifying deployed files; debugging "file not found" by listing the path.',
    image: IMG('linux-ls')
  },
  'linux-cd-pathtodir': {
    example: 'cd /var/www  or  cd ~/projects',
    exampleOutput: '(No output on success; prompt changes to show new path.)',
    whyNeed: 'Changes your current directory so subsequent commands run in the right place. Essential for running scripts or reading files in a specific path.',
    commonOptions: '~ (home), - (previous dir), .. (parent).',
    scenarios: 'Moving to app directory to run commands; in scripts to ensure you are in the correct path; navigating after SSH into a server.',
    image: IMG('linux-cd')
  },
  'linux-grep-pattern-file': {
    example: 'grep -r "ERROR" /var/log/app/',
    exampleOutput: '/var/log/app/app.log:2025-03-15 10:00:00 ERROR Connection refused\n/var/log/app/worker.log:2025-03-15 10:01:00 ERROR Timeout',
    whyNeed: 'Searches for text inside files. Lets you find which file contains an error message, a config value, or a specific pattern.',
    commonOptions: '-r (recursive), -i (ignore case), -n (line numbers), -l (filenames only), -E (extended regex).',
    scenarios: 'Finding which log file has the error; searching codebase for a string; filtering command output; audit and compliance search.',
    image: IMG('linux-grep')
  },
  'linux-tail-f-varlogsyslog': {
    example: 'tail -f /var/log/nginx/access.log',
    exampleOutput: '192.168.1.1 - - [15/Mar/2025:10:00:01] "GET / HTTP/1.1" 200 1234\n192.168.1.2 - - [15/Mar/2025:10:00:02] "GET /api/health HTTP/1.1" 200 12\n(... keeps streaming)',
    whyNeed: 'Shows the end of a file and can follow new lines in real time. The standard way to watch logs as they are written.',
    commonOptions: '-f (follow), -n N (last N lines), -F (follow by name, retry if rotated).',
    scenarios: 'Watching application logs during deployment; debugging live issues; monitoring access or error logs; verifying that a process is writing logs.',
    image: IMG('linux-tail')
  },
  'linux-ps-aux': {
    example: 'ps aux | grep nginx',
    exampleOutput: 'root  1234  0.0  0.1  12345  678 ?  Ss  10:00  0:00 nginx: master\nwww   1235  0.0  0.2  12345  890 ?  S   10:00  0:00 nginx: worker',
    whyNeed: 'Lists running processes so you can confirm a service is running, find its PID, or see resource usage.',
    commonOptions: 'aux or -ef (common formats), -e (all), -f (full), -p PID.',
    scenarios: 'Checking if a service is up after restart; finding PID to kill or trace; auditing what is running on a server.',
    image: IMG('linux-ps')
  },
  'linux-curl': {
    example: 'curl -s -o /dev/null -w "%{http_code}" https://api.example.com/health',
    exampleOutput: '200',
    whyNeed: 'Calls URLs from the command line. Used for health checks, API testing, and downloading files in scripts.',
    commonOptions: '-s (silent), -o file (output), -w format (e.g. %{http_code}), -X METHOD, -H "Header: value", -d data.',
    scenarios: 'Health checks in scripts or cron; testing an API from the server; downloading a file in a deploy script; debugging HTTP responses.',
    image: IMG('linux-curl')
  },
  'docker-ps': {
    example: 'docker ps -a  and  docker ps --filter "status=exited"',
    exampleOutput: 'CONTAINER ID  IMAGE     COMMAND   CREATED   STATUS        PORTS     NAMES\nabc123def456  nginx     "nginx"   2 hours ago Up 2 hours  0.0.0.0:80->80  web1',
    whyNeed: 'Shows running (and optionally stopped) containers so you can see what is up, get container IDs, or clean up.',
    commonOptions: '-a (all), -q (IDs only), --filter "key=value", --format "table ...".',
    scenarios: 'After starting services; finding container ID to exec into or view logs; auditing what is running; before cleaning up with prune.',
    image: IMG('docker-ps')
  },
  'docker-logs': {
    example: 'docker logs -f --tail 100 mycontainer',
    exampleOutput: '2025-03-15T10:00:00Z Server listening on :8080\n2025-03-15T10:00:01Z Request GET /health 200\n(... streams new lines)',
    whyNeed: 'Streams container stdout/stderr so you can debug failures, monitor output, or verify startup without entering the container.',
    commonOptions: '-f (follow), --tail N (last N lines), -t (timestamps), --since 1h.',
    scenarios: 'Debugging why a container exited; watching app output during deploy; checking startup logs; incident response.',
    image: IMG('docker-logs')
  },
  'k8s-get-pods': {
    example: 'kubectl get pods -n production',
    exampleOutput: 'NAME    READY   STATUS    RESTARTS   AGE\napp-0   1/1     Running   0          5d\napp-1   1/1     Running   2          5d',
    whyNeed: 'Lists pods in a namespace so you can see what is running, their status, and which node they are on.',
    commonOptions: '-n namespace, -o wide (more columns), -w (watch), -l label=value.',
    scenarios: 'Checking deployment status; finding pod name for logs or exec; debugging scheduling issues; daily ops overview.',
    image: IMG('k8s-get-pods')
  },
  'k8s-logs': {
    example: 'kubectl logs -f deployment/myapp -n staging',
    exampleOutput: 'Server started on port 8080\nGET /health 200 0.5ms\n(... streams logs)',
    whyNeed: 'Streams logs from a pod or deployment so you can debug issues without opening the cluster UI.',
    commonOptions: '-f (follow), --tail=N, -c container (multi-container pod), --previous (crashed container).',
    scenarios: 'Debugging a failing pod; watching logs during a release; verifying that the app started correctly; incident investigation.',
    image: IMG('k8s-logs')
  },
  'terraform-plan': {
    example: 'terraform plan -out=tfplan',
    exampleOutput: 'Terraform will perform the following actions:\n  # aws_instance.web will be created\n  + resource "aws_instance" "web" { ... }\nPlan: 1 to add, 0 to change, 0 to destroy.',
    whyNeed: 'Shows what would change without applying. Lets you and your team review impact before making real infrastructure changes.',
    commonOptions: '-out=file (save plan), -var key=value, -target=resource, -destroy.',
    scenarios: 'Before every apply; in CI to detect drift or validate changes; before destroying resources; for change approval.',
    image: IMG('terraform-plan')
  },

  // ---- More Linux ----
  'linux-pwd': {
    example: 'pwd',
    exampleOutput: '/home/user/projects/myapp',
    whyNeed: 'Shows the absolute path of your current directory. Essential in scripts and when you need to confirm where you are.',
    commonOptions: '(no options; use in scripts or before cd).',
    scenarios: 'In scripts to build paths; after SSH to confirm location; debugging "wrong directory" issues.',
    image: IMG('linux-pwd')
  },
  'linux-cat': {
    example: 'cat -n package.json',
    exampleOutput: '     1  {\n     2    "name": "myapp",\n     3    "version": "1.0.0",\n ...',
    whyNeed: 'Displays file contents. Quick way to view config files, logs, or script output.',
    commonOptions: '-n (line numbers), -A (show all), -b (number non-blank).',
    scenarios: 'Checking config; viewing a small log; piping into grep or other tools.',
    image: IMG('linux-cat')
  },
  'linux-mkdir-p-abc': {
    example: 'mkdir -p src/components/Button',
    exampleOutput: '(No output on success.)',
    whyNeed: 'Creates directories. -p creates parent directories and does not error if path exists.',
    commonOptions: '-p (parents, no error if exists), -m mode (set permissions).',
    scenarios: 'Setting up project structure; deploy scripts creating log/cache dirs; one-off directory creation.',
    image: IMG('linux-mkdir')
  },
  'linux-find-path-name-.log': {
    example: 'find . -name "*.log" -mtime +7',
    exampleOutput: './logs/old.log\n./tmp/debug.log',
    whyNeed: 'Finds files by name, type, time, or other criteria. Essential for cleanup and automation.',
    commonOptions: '-name, -type f|d, -mtime +N (older than N days), -exec cmd {} \\;, -delete.',
    scenarios: 'Cleaning old logs; finding large files; running a command on matching files; audit scripts.',
    image: IMG('linux-find')
  },
  'linux-ssh': {
    example: 'ssh -i key.pem ubuntu@ec2-1-2-3-4.compute.amazonaws.com',
    exampleOutput: 'Welcome to Ubuntu 22.04...\nubuntu@ip-10-0-1-5:~$ ',
    whyNeed: 'Connects to a remote host securely. The standard way to manage servers and run commands remotely.',
    commonOptions: '-i (identity file), -p (port), -L (local port forward), -N (no remote command).',
    scenarios: 'Deploying to a server; debugging production; running one-off commands; port forwarding.',
    image: IMG('linux-ssh')
  },
  'linux-systemctl-status-nginx': {
    example: 'systemctl status nginx',
    exampleOutput: '● nginx.service - A high performance web server\n   Active: active (running)\n   Main PID: 1234',
    whyNeed: 'Manages systemd services: start, stop, restart, enable on boot. Standard on most Linux distros.',
    commonOptions: 'status, start, stop, restart, enable, disable, reload.',
    scenarios: 'Restarting a service after config change; enabling service on boot; checking why a service failed.',
    image: IMG('linux-systemctl')
  },
  'linux-wget': {
    example: 'wget -q -O backup.tar.gz https://example.com/backup.tar.gz',
    exampleOutput: '(With -q: no output. File saved as backup.tar.gz.)',
    whyNeed: 'Downloads files from URL. Handy in scripts when curl is not preferred or for recursive downloads.',
    commonOptions: '-q (quiet), -O file (output name), -c (continue), -r (recursive).',
    scenarios: 'Downloading release artifacts; scripted backups; mirroring a directory.',
    image: IMG('linux-wget')
  },

  // ---- More Docker ----
  'docker-images': {
    example: 'docker images',
    exampleOutput: 'REPOSITORY   TAG     IMAGE ID       CREATED        SIZE\nnginx        latest  abc123        2 weeks ago    150MB\nmyapp        1.0     def456        1 hour ago     220MB',
    whyNeed: 'Lists local images so you can see what you have built or pulled, and clean up unused ones.',
    commonOptions: '-a (all including intermediate), --digests, -q (IDs only).',
    scenarios: 'After building; before cleaning with prune; checking image size or tags.',
    image: IMG('docker-images')
  },
  'docker-run': {
    example: 'docker run -d --name web -p 8080:80 nginx',
    exampleOutput: 'a1b2c3d4e5f6...',
    whyNeed: 'Starts a container from an image. -d runs in background, -p maps ports, --name gives a fixed name.',
    commonOptions: '-d (detach), -p host:container, --name, -e VAR=val, -v host:container, --rm (remove when stopped).',
    scenarios: 'Running a service locally; testing an image; one-off commands with docker run --rm.',
    image: IMG('docker-run')
  },
  'docker-build': {
    example: 'docker build -t myapp:v1 .',
    exampleOutput: 'Step 1/5 : FROM node:18\n ---> Using cache\nStep 2/5 : WORKDIR /app\n ---> Running in abc123\n...\nSuccessfully built def456\nSuccessfully tagged myapp:v1',
    whyNeed: 'Builds an image from a Dockerfile. -t tags the image so you can run it by name.',
    commonOptions: '-t name:tag, -f Dockerfile.alt, --no-cache, --build-arg KEY=val.',
    scenarios: 'CI build; local development image; building a custom base image.',
    image: IMG('docker-build')
  },
  'docker-exec': {
    example: 'docker exec -it mycontainer /bin/sh',
    exampleOutput: '/ # ',
    whyNeed: 'Runs a command (often a shell) inside a running container. Use for debugging or one-off tasks.',
    commonOptions: '-it (interactive TTY), -u user, -w /path (working dir).',
    scenarios: 'Debugging a running app; checking files inside container; running a migration.',
    image: IMG('docker-exec')
  },
  'docker-compose-up': {
    example: 'docker compose up -d',
    exampleOutput: '[+] Running 3/3\n ✔ Network myapp_default  Created\n ✔ Container myapp-db-1   Started\n ✔ Container myapp-web-1  Started',
    whyNeed: 'Starts all services defined in docker-compose.yml. -d runs in background.',
    commonOptions: '-d (detach), -f file.yml, --build (rebuild), --scale service=N.',
    scenarios: 'Local dev stack; running tests against multiple services; staging environment.',
    image: IMG('docker-compose-up')
  },

  // ---- More Kubernetes ----
  'k8s-get-all': {
    example: 'kubectl get all -n staging',
    exampleOutput: 'pod/app-7d8f9-xyz   1/1   Running   0   5m\nservice/app   ClusterIP   10.0.0.1   80/TCP\ndeployment.apps/app   3/3   3   3   5m',
    whyNeed: 'Quick overview of pods, services, deployments (and more) in a namespace.',
    commonOptions: '-n namespace, -o wide, -l label=value.',
    scenarios: 'Quick health check of a namespace; after applying manifests; daily ops.',
    image: IMG('k8s-get-all')
  },
  'k8s-describe': {
    example: 'kubectl describe pod mypod -n default',
    exampleOutput: 'Name:         mypod\nNamespace:    default\nStatus:       Running\nEvents:\n  Type    Reason   Message\n  ----    ------   ----\n  Normal  Scheduled  Successfully assigned...',
    whyNeed: 'Shows detailed info and events for a resource. First step when debugging why a pod is not running.',
    commonOptions: '-n namespace, -o yaml (output as YAML).',
    scenarios: 'Pod not starting; checking events; understanding resource configuration.',
    image: IMG('k8s-describe')
  },
  'k8s-exec': {
    example: 'kubectl exec -it mypod -n default -- /bin/sh',
    exampleOutput: '/ # ',
    whyNeed: 'Runs a shell (or command) inside a pod. Use for debugging or running one-off commands.',
    commonOptions: '-it (interactive), -c container (multi-container pod), -- (command).',
    scenarios: 'Debugging app inside pod; checking files; running a migration or script.',
    image: IMG('k8s-exec')
  },
  'k8s-apply': {
    example: 'kubectl apply -f deployment.yaml',
    exampleOutput: 'deployment.apps/myapp configured',
    whyNeed: 'Creates or updates resources from a manifest file. Declarative way to manage Kubernetes objects.',
    commonOptions: '-f file|dir, -k (kustomize), --dry-run=client -o yaml.',
    scenarios: 'Deploying an app; updating config; GitOps-style apply from CI.',
    image: IMG('k8s-apply')
  },
  'k8s-scale': {
    example: 'kubectl scale deployment myapp --replicas=5 -n production',
    exampleOutput: 'deployment.apps/myapp scaled',
    whyNeed: 'Changes the number of pod replicas for a deployment. Quick way to scale up or down.',
    commonOptions: '--replicas=N, -n namespace.',
    scenarios: 'Handling load; scaling down to save cost; after fixing a deployment.',
    image: IMG('k8s-scale')
  },
  'k8s-port-forward': {
    example: 'kubectl port-forward svc/myapp 8080:80 -n staging',
    exampleOutput: 'Forwarding from 127.0.0.1:8080 -> 80\nForwarding from [::1]:8080 -> 80',
    whyNeed: 'Forwards a local port to a pod or service. Access cluster services from your machine without exposing them.',
    commonOptions: 'pod/name or svc/name, local:remote, -n namespace.',
    scenarios: 'Testing a service locally; debugging; accessing internal APIs or DBs.',
    image: IMG('k8s-port-forward')
  },

  // ---- More Terraform ----
  'tf-init': {
    example: 'terraform init',
    exampleOutput: 'Initializing the backend...\nInitializing provider plugins...\nTerraform has been successfully initialized!',
    whyNeed: 'Downloads providers and initializes the backend. Must run first (or after adding providers/modules).',
    commonOptions: '-upgrade (upgrade providers), -reconfigure (reconfigure backend).',
    scenarios: 'First time in a project; after adding a new provider; CI pipeline setup.',
    image: IMG('tf-init')
  },
  'tf-apply': {
    example: 'terraform apply -auto-approve',
    exampleOutput: 'Apply complete! Resources: 5 added, 0 changed, 0 destroyed.\nOutputs:\ninstance_id = "i-0abc123"',
    whyNeed: 'Applies the plan to create or update infrastructure. Use saved plan in CI for consistency.',
    commonOptions: '-auto-approve (skip prompt), plan file, -target=resource.',
    scenarios: 'Applying after review; CI/CD pipeline; recreating resources.',
    image: IMG('tf-apply')
  },
  'tf-destroy': {
    example: 'terraform destroy -target=aws_instance.web',
    exampleOutput: 'Plan: 0 to add, 0 to change, 1 to destroy.\nDo you want to perform these actions? ...\nDestroy complete!',
    whyNeed: 'Destroys resources in state. Use -target to destroy only specific resources.',
    commonOptions: '-target=resource, -auto-approve.',
    scenarios: 'Tearing down env; removing a single resource; cleaning up failed applies.',
    image: IMG('tf-destroy')
  },
  'tf-state': {
    example: 'terraform state list',
    exampleOutput: 'aws_instance.web\naws_security_group.allow_http\naws_eip.web',
    whyNeed: 'Lists resources in Terraform state. Helps verify what Terraform is tracking.',
    commonOptions: 'list, show resource, rm resource, pull/push.',
    scenarios: 'Debugging state; removing a resource from state; auditing what is managed.',
    image: IMG('tf-state')
  },
  'tf-output': {
    example: 'terraform output',
    exampleOutput: 'instance_ip = "54.123.45.67"\ndb_endpoint = "mydb.region.rds.amazonaws.com"',
    whyNeed: 'Prints output values from the configuration. Use to get IPs, URLs, or other results after apply.',
    commonOptions: '-json (machine-readable), output_name (single output).',
    scenarios: 'Getting IP after apply; feeding outputs to another system; scripts.',
    image: IMG('tf-output')
  },

  // ---- Ansible ----
  'ansible-ping': {
    example: 'ansible all -m ping',
    exampleOutput: 'host1 | SUCCESS => {"changed": false, "ping": "pong"}\nhost2 | SUCCESS => {"changed": false, "ping": "pong"}',
    whyNeed: 'Tests connectivity to hosts. Confirms SSH and Python before running playbooks.',
    commonOptions: '-i inventory, -l limit, -m module.',
    scenarios: 'After adding new hosts; before a playbook run; troubleshooting connectivity.',
    image: IMG('ansible-ping')
  },
  'ansible-ad-hoc': {
    example: 'ansible all -a "uptime"',
    exampleOutput: 'host1 | CHANGED | rc=0 |\n 10:00:00 up 30 days\nhost2 | CHANGED | rc=0 |\n 10:00:01 up 14 days',
    whyNeed: 'Runs a single command on all (or limited) hosts without writing a playbook.',
    commonOptions: '-a "cmd", -m shell (default for -a), --become (sudo), -l hostgroup.',
    scenarios: 'Quick check across servers; one-off command; gathering facts.',
    image: IMG('ansible-ad-hoc')
  },
  'ansible-playbook': {
    example: 'ansible-playbook site.yml -l webservers',
    exampleOutput: 'PLAY [Configure webservers] ****\nTASK [Gathering Facts] ****\nok: [host1]\nTASK [Install nginx] ****\nchanged: [host1]\nPLAY RECAP ****\nhost1 : ok=3 changed=1',
    whyNeed: 'Runs a playbook to configure hosts. Core of Ansible automation.',
    commonOptions: '-l limit, -e "var=value", --check (dry run), -i inventory, --ask-become-pass.',
    scenarios: 'Deploying config; provisioning; scheduled runs; CI/CD.',
    image: IMG('ansible-playbook')
  },
  'ansible-vault': {
    example: 'ansible-vault encrypt secrets.yml',
    exampleOutput: 'Encryption successful',
    whyNeed: 'Encrypts sensitive files so they can be stored in Git. Decrypt at runtime with a password.',
    commonOptions: 'encrypt, decrypt, view, edit, rekey.',
    scenarios: 'Storing API keys or passwords; sharing secrets in a repo; CI with vault password.',
    image: IMG('ansible-vault')
  },
  'ansible-galaxy': {
    example: 'ansible-galaxy install geerlingguy.nginx',
    exampleOutput: '- downloading role \'nginx\', owned by geerlingguy\n- nginx was installed successfully',
    whyNeed: 'Installs roles from Ansible Galaxy (or a requirements file). Reuse community or internal roles.',
    commonOptions: 'install role.name, -r requirements.yml, init myrole (create role skeleton).',
    scenarios: 'Starting with a known role; sharing roles; requirements.yml in CI.',
    image: IMG('ansible-galaxy')
  },

  // ---- Maven ----
  'mvn-compile': {
    example: 'mvn compile',
    exampleOutput: '[INFO] Scanning for projects...\n[INFO] Building myapp 1.0-SNAPSHOT\n[INFO] --- maven-compiler-plugin:3.11.0:compile ---\n[INFO] BUILD SUCCESS',
    whyNeed: 'Compiles main source code. Fast check that code compiles without running tests.',
    commonOptions: '-q (quiet), -DskipTests (if triggered), -o (offline).',
    scenarios: 'Quick compile check; CI compile step; before running tests.',
    image: IMG('mvn-compile')
  },
  'mvn-test': {
    example: 'mvn test',
    exampleOutput: '[INFO] --- maven-surefire-plugin:3.0.0:test ---\n[INFO] Running com.app.MyTest\nTests run: 10, Failures: 0, Skipped: 0\n[INFO] BUILD SUCCESS',
    whyNeed: 'Runs unit tests. Fails the build if any test fails.',
    commonOptions: '-DskipTests (skip), -Dmaven.test.failure.ignore=true, -Dtest=MyTest (single class).',
    scenarios: 'Local development; CI pipeline; before committing.',
    image: IMG('mvn-test')
  },
  'mvn-package': {
    example: 'mvn package',
    exampleOutput: '[INFO] --- maven-jar-plugin:3.3.0:jar ---\n[INFO] Building jar: target/myapp-1.0-SNAPSHOT.jar\n[INFO] BUILD SUCCESS',
    whyNeed: 'Builds the artifact (JAR/WAR) and runs tests. Output is in target/.',
    commonOptions: '-DskipTests, -P profile, -DfinalName=name.',
    scenarios: 'Building for deploy; CI producing artifact; local verification.',
    image: IMG('mvn-package')
  },
  'mvn-clean': {
    example: 'mvn clean package',
    exampleOutput: '[INFO] --- maven-clean-plugin:3.2.0:clean ---\n[INFO] Deleting target\n[INFO] BUILD SUCCESS',
    whyNeed: 'Deletes the target directory. Use before package to ensure a clean build.',
    commonOptions: '(often combined with package or install).',
    scenarios: 'Clean build in CI; fixing "weird build" issues; freeing disk space.',
    image: IMG('mvn-clean')
  },
  'mvn-dependency-tree': {
    example: 'mvn dependency:tree',
    exampleOutput: '[INFO] com.myapp:myapp:jar:1.0\n[INFO] +- org.springframework:spring-core:jar:5.3.0\n[INFO] |  \\- ...\n[INFO] -- junit:junit:jar:4.13:test',
    whyNeed: 'Shows the dependency tree. Use to find conflicting or transitive dependencies.',
    commonOptions: '-Dverbose, -Dincludes=groupId:artifactId (filter).',
    scenarios: 'Debugging version conflicts; auditing dependencies; before upgrading a library.',
    image: IMG('mvn-dependency-tree')
  },

  // ---- Shell ----
  'shell-shebang': {
    example: '#!/usr/bin/env bash',
    exampleOutput: '(First line of script; no output when run.)',
    whyNeed: 'Tells the system which interpreter to use. env bash is portable across systems.',
    commonOptions: '#!/bin/bash, #!/usr/bin/env bash, #!/bin/sh.',
    scenarios: 'Every executable script; ensuring correct shell (bash vs sh).',
    image: IMG('shell-shebang')
  },
  'shell-vars': {
    example: 'NAME="world"; echo "Hello $NAME"',
    exampleOutput: 'Hello world',
    whyNeed: 'Variables store values. Quote when expanding to avoid word-splitting.',
    commonOptions: 'VAR=value, export VAR, ${VAR:-default}, $? (exit code).',
    scenarios: 'Scripts; config in env vars; passing values between commands.',
    image: IMG('shell-vars')
  },
  'shell-args': {
    example: './script.sh foo bar',
    exampleOutput: 'First: foo\nAll: foo bar\nCount: 2',
    whyNeed: '$1, $2, $@, $# access script arguments. Essential for scripts that take input.',
    commonOptions: '$0 (script name), $1 $2 ..., $@ (all), $# (count), shift.',
    scenarios: 'CLI scripts; wrappers that pass args to another command.',
    image: IMG('shell-args')
  },
  'shell-if': {
    example: 'if [ -f config.yml ]; then echo "exists"; fi',
    exampleOutput: 'exists',
    whyNeed: 'Conditionals branch on tests. -f file, -d dir, -z string empty.',
    commonOptions: '[ -f file ], [ -d dir ], [ -z "$s" ], [[ ]] (bash), test.',
    scenarios: 'Check file exists before reading; check env var; error handling.',
    image: IMG('shell-if')
  },
  'shell-loop': {
    example: 'for f in *.txt; do echo "$f"; done',
    exampleOutput: 'a.txt\nb.txt\nc.txt',
    whyNeed: 'Loops over a list. Use for batch processing files or repeated commands.',
    commonOptions: 'for x in list; do ...; done, for i in {1..5}; do ...; done.',
    scenarios: 'Process all files in a dir; retry logic; generating multiple outputs.',
    image: IMG('shell-loop')
  },
  'shell-set': {
    example: 'set -euo pipefail',
    exampleOutput: '(No output; sets shell options.)',
    whyNeed: 'Best practice: -e exit on error, -u error on undefined var, -o pipefail fail on pipe errors.',
    commonOptions: '-e, -u, -o pipefail; set +e to turn off -e.',
    scenarios: 'Top of robust scripts; CI scripts; avoiding silent failures.',
    image: IMG('shell-set')
  },
  'shell-redirect': {
    example: 'echo "log" >> app.log 2>&1',
    exampleOutput: '(No output; app.log contains "log".)',
    whyNeed: 'Redirect stdout (>) and stderr (2>). 2>&1 sends stderr to stdout. >> appends.',
    commonOptions: '> out, 2> err, 2>&1, >> append, < file (stdin), | pipe.',
    scenarios: 'Logging in scripts; capturing errors; piping between commands.',
    image: IMG('shell-redirect')
  }
}

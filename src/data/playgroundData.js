/**
 * @typedef {'kubernetes' | 'docker' | 'git' | 'terraform' | 'aws' | 'linux' | 'ansible' | 'helm' | 'jenkins' | 'azure'} PlaygroundTabId
 */

export const PLAYGROUND_TAB_IDS = new Set([
  'kubernetes',
  'docker',
  'git',
  'terraform',
  'aws',
  'linux',
  'ansible',
  'helm',
  'jenkins',
  'azure',
])

/** @type {{ id: PlaygroundTabId, label: string, icon: string, cli: string }[]} */
export const PLAYGROUND_TABS = [
  { id: 'kubernetes', label: 'Kubernetes', icon: '☸', cli: 'kubectl' },
  { id: 'docker', label: 'Docker', icon: '🐳', cli: 'docker' },
  { id: 'git', label: 'Git', icon: '⎇', cli: 'git' },
  { id: 'terraform', label: 'Terraform', icon: '▥', cli: 'terraform' },
  { id: 'aws', label: 'AWS CLI', icon: '▸', cli: 'aws' },
  { id: 'linux', label: 'Linux', icon: '◉', cli: 'sh' },
  { id: 'ansible', label: 'Ansible', icon: '⚑', cli: 'ansible' },
  { id: 'helm', label: 'Helm', icon: '⎈', cli: 'helm' },
  { id: 'jenkins', label: 'Jenkins', icon: '☰', cli: 'jenkins-cli' },
  { id: 'azure', label: 'Azure CLI', icon: '☁', cli: 'az' },
]

/**
 * @typedef {{
 *   id: string
 *   tab: PlaygroundTabId
 *   canonical: string
 *   aliases?: string[]
 *   output: string
 *   outputKind?: 'success' | 'error' | 'table'
 *   explain: { command: string, output: string, usage: string }
 *   hint?: string
 *   mostUsed?: boolean
 * }} PlaygroundSimulation
 */

/** @type {PlaygroundSimulation[]} */
export const PLAYGROUND_SIMULATIONS = [
  // —— Kubernetes ——
  {
    id: 'k-get-pods',
    tab: 'kubernetes',
    canonical: 'kubectl get pods',
    output: `NAME                          READY   STATUS    RESTARTS   AGE
api-deployment-7d4b8c9f-xk2jz   1/1     Running   0          3d1h
worker-9ffc7d6b-qp9lm           1/1     Running   1          12h
redis-cache-0                   1/1     Running   0          8d`,
    outputKind: 'table',
    mostUsed: true,
    hint: 'Try -n <namespace> or -A for all namespaces',
    explain: {
      command: '`kubectl get pods` lists Pod objects in the current namespace (default unless `-n`).',
      output:
        'READY = ready containers / requested; STATUS Running means scheduled and started; RESTARTS counts crashes; AGE is time since creation.',
      usage: 'First command to verify workloads after deploy or when debugging CrashLoopBackOff.',
    },
  },
  {
    id: 'k-get-svc',
    tab: 'kubernetes',
    canonical: 'kubectl get svc',
    output: `NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        45d
api-svc      ClusterIP   10.102.12.88    <none>        8080/TCP       12d
ingress-lb   LoadBalancer 10.102.1.5     203.0.113.10  80:30080/TCP   5d`,
    outputKind: 'table',
    mostUsed: true,
    hint: 'ClusterIP is internal; LoadBalancer gets a cloud VIP',
    explain: {
      command: 'Lists Service resources that expose Pods via stable IPs/DNS inside (or outside) the cluster.',
      output: 'TYPE explains exposure model; PORT(S) shows Service port → target port mapping.',
      usage: 'Use to confirm a Service exists and which ports clients should hit.',
    },
  },
  {
    id: 'k-describe-pod',
    tab: 'kubernetes',
    canonical: 'kubectl describe pod api-deployment-7d4b8c9f-xk2jz',
    output: `Name:         api-deployment-7d4b8c9f-xk2jz
Namespace:    default
Node:         worker-2/10.0.1.42
Status:       Running
Containers:
  api:
    Image:         api:1.4.2
    Ready:         True
    Restart Count: 0
Conditions:
  Type              Status
  PodScheduled      True
  Initialized       True
  Ready             True`,
    outputKind: 'success',
    hint: 'Replace pod name with one from kubectl get pods',
    explain: {
      command: 'Shows events, container status, volumes, and scheduling details for one Pod.',
      output: 'Conditions and Events (bottom, not shown in short sim) explain why Pending/CrashLoop.',
      usage: 'Primary tool for “why won’t my pod start?” — always check Events at the bottom.',
    },
  },
  {
    id: 'k-logs',
    tab: 'kubernetes',
    canonical: 'kubectl logs api-deployment-7d4b8c9f-xk2jz',
    output: `2025-03-28T10:12:01Z INF listening on :8080
2025-03-28T10:12:02Z INF connected to postgres primary
2025-03-28T10:15:44Z WRN slow query duration_ms=842`,
    outputKind: 'success',
    mostUsed: true,
    hint: 'Add -f to follow, -c <container> for multi-container pods',
    explain: {
      command: 'Streams stdout/stderr from a container in the Pod (default container if only one).',
      output: 'Log lines often include timestamps and severity — your app controls format.',
      usage: 'Use after deploys or alerts to correlate with metrics and traces.',
    },
  },
  {
    id: 'k-apply',
    tab: 'kubernetes',
    canonical: 'kubectl apply -f deployment.yaml',
    output: `deployment.apps/api-deployment configured
service/api-svc unchanged`,
    outputKind: 'success',
    hint: 'Use --dry-run=client -o yaml to preview',
    explain: {
      command: '`apply` reconciles live cluster state with your manifest (server-side apply semantics).',
      output: '"configured" means an existing object changed; "unchanged" means no diff.',
      usage: 'Typical GitOps loop: commit YAML → CI → kubectl apply in controlled environments.',
    },
  },
  {
    id: 'k-get-pods-err',
    tab: 'kubernetes',
    canonical: 'kubectl get pod nonexistent-pod-xyz',
    output: `Error from server (NotFound): pods "nonexistent-pod-xyz" not found`,
    outputKind: 'error',
    explain: {
      command: 'Asks the API server for a Pod by name in the current namespace.',
      output: '404-style errors mean wrong name, namespace, or cluster context (`kubectl config current-context`).',
      usage: 'Double-check `kubectl get pods` and `-n` before assuming the workload is missing.',
    },
  },

  // —— Docker ——
  {
    id: 'd-ps',
    tab: 'docker',
    canonical: 'docker ps',
    output: `CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS          PORTS                    NAMES
a1b2c3d4e5f6   nginx:1.25-alpine     "/docker-entrypoint.…"   2 hours ago    Up 2 hours      0.0.0.0:8080->80/tcp     web-frontend
f6e5d4c3b2a1   redis:7-alpine        "docker-entrypoint.s…"   26 hours ago   Up 26 hours     6379/tcp                 app-redis`,
    outputKind: 'table',
    mostUsed: true,
    hint: 'docker ps -a includes stopped containers',
    explain: {
      command: '`docker ps` lists running containers on this Docker host.',
      output: 'PORTS shows published ports; NAMES is the human label (`--name`).',
      usage: 'Verify compose stacks or manual `docker run` after startup.',
    },
  },
  {
    id: 'd-images',
    tab: 'docker',
    canonical: 'docker images',
    output: `REPOSITORY    TAG        IMAGE ID       CREATED        SIZE
api           1.4.2      a1b2c3d4e5f6   2 days ago     412MB
nginx         1.25       f6e5d4c3b2a1   3 weeks ago    48MB`,
    outputKind: 'table',
    mostUsed: true,
    explain: {
      command: 'Lists images stored locally (from pulls and builds).',
      output: 'IMAGE ID is the digest prefix; SIZE helps spot bloated layers.',
      usage: 'Clean old images with `docker image prune` in dev machines carefully.',
    },
  },
  {
    id: 'd-run',
    tab: 'docker',
    canonical: 'docker run -d nginx',
    output: `Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
Digest: sha256:1234abcd...
Status: Downloaded newer image for nginx:latest
c7f8e9d0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8`,
    outputKind: 'success',
    hint: '-d detaches; -p 8080:80 publishes ports',
    explain: {
      command: '`docker run` creates a container from an image; `-d` runs it in the background.',
      output: 'If the image is missing, Docker pulls from the registry first, then prints container ID.',
      usage: 'Quick smoke tests — in production prefer pinned tags and read-only roots.',
    },
  },
  {
    id: 'd-build',
    tab: 'docker',
    canonical: 'docker build -t app .',
    output: `Sending build context to Docker daemon  12.4MB
Step 3/8 : RUN npm ci
 ---> Running in e3a1b2c3d4
 ---> Removed intermediate container
Successfully tagged app:latest`,
    outputKind: 'success',
    explain: {
      command: 'Builds an image from Dockerfile in context `.` and tags it `app:latest`.',
      output: 'Each Dockerfile instruction is a layer; cache hits skip rebuilds.',
      usage: 'CI pipelines run this then push to a registry before Kubernetes deploy.',
    },
  },
  {
    id: 'd-logs',
    tab: 'docker',
    canonical: 'docker logs web-frontend',
    output: `10.0.0.5 - - [28/Mar/2025:10:12:01 +0000] "GET / HTTP/1.1" 200 512
10.0.0.6 - - [28/Mar/2025:10:12:04 +0000] "GET /health HTTP/1.1" 200 2`,
    outputKind: 'success',
    mostUsed: true,
    hint: 'docker logs -f to follow, --tail 100 for last lines',
    explain: {
      command: 'Shows stdout/stderr from a container (by name or ID).',
      output: 'Format depends on process — web servers often log in Combined Log Format.',
      usage: 'Pair with `docker ps` to map misbehaving services to logs quickly.',
    },
  },
  {
    id: 'd-err',
    tab: 'docker',
    canonical: 'docker start missing-box',
    output: `Error response from daemon: No such container: missing-box`,
    outputKind: 'error',
    explain: {
      command: 'Attempts to start a stopped container by name.',
      output: 'Daemon returns error if name/ID does not exist on this host.',
      usage: 'Run `docker ps -a` to see stopped containers and exact names.',
    },
  },

  // —— Git ——
  {
    id: 'g-status',
    tab: 'git',
    canonical: 'git status',
    output: `On branch feature/auth-oauth
Your branch is ahead of 'origin/feature/auth-oauth' by 2 commits.

Changes not staged for commit:
  modified:   src/auth/providers.ts
  modified:   package-lock.json`,
    outputKind: 'success',
    mostUsed: true,
    hint: 'git status -sb is a compact one-line branch view',
    explain: {
      command: 'Shows working tree vs index vs last commit — the core daily command.',
      output: '“Ahead by N commits” means local commits not pushed; unstaged changes need `git add`.',
      usage: 'Run before commit/PR to ensure only intended files are included.',
    },
  },
  {
    id: 'g-pull',
    tab: 'git',
    canonical: 'git pull',
    output: `remote: Counting objects: 12, done.
remote: Compressing objects: 100% (8/8), done.
Updating a1b2c3d..e4f5a6b
Fast-forward
 3 files changed, 42 insertions(+), 1 deletion(-)`,
    outputKind: 'success',
    mostUsed: true,
    explain: {
      command: '`git pull` fetches from remote and merges/rebases into current branch (default merge).',
      output: 'Fast-forward means your branch simply moved to a new commit — no merge commit.',
      usage: 'Start of day sync; resolve conflicts if both sides touched same lines.',
    },
  },
  {
    id: 'g-push',
    tab: 'git',
    canonical: 'git push',
    output: `Enumerating objects: 18, done.
Counting objects: 100% (18/18), done.
To github.com:org/repo.git
   e4f5a6b..7c8d9e0  feature/auth-oauth -> feature/auth-oauth`,
    outputKind: 'success',
    mostUsed: true,
    explain: {
      command: 'Uploads local commits on the current branch to the remote tracking branch.',
      output: 'The line `old..new branch -> branch` confirms remote advanced.',
      usage: 'After CI passes, opens PR or triggers deploy pipelines that watch the branch.',
    },
  },
  {
    id: 'g-merge',
    tab: 'git',
    canonical: 'git merge main',
    output: `Merge made by the 'ort' strategy.
 package.json | 4 ++--
 2 files changed, 10 insertions(+), 5 deletions(-)`,
    outputKind: 'success',
    hint: 'Prefer git merge --no-ff for release branches if policy requires',
    explain: {
      command: 'Merges branch `main` into your current branch, creating a merge commit if needed.',
      output: 'Strategy ort is Git’s default merge; conflicts pause with CONFLICT markers.',
      usage: 'Common before shipping feature branches that must include latest main.',
    },
  },
  {
    id: 'g-rebase',
    tab: 'git',
    canonical: 'git rebase main',
    output: `First, rewinding head to replay your work on top of it...
Applying: feat(auth): oauth provider
Applying: fix(auth): refresh token edge case`,
    outputKind: 'success',
    explain: {
      command: 'Replays your commits on top of `main` for a linear history (no merge commit).',
      output: 'Each “Applying” line is one commit replayed; conflicts stop for manual fix.',
      usage: 'Often preferred before PR merge; avoid rebasing shared public branches.',
    },
  },

  // —— Terraform ——
  {
    id: 'tf-init',
    tab: 'terraform',
    canonical: 'terraform init',
    output: `Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 5.0"...
- Installing hashicorp/aws v5.42.0...
Terraform has been successfully initialized!`,
    outputKind: 'success',
    mostUsed: true,
    hint: 'Run again when providers or backend config change',
    explain: {
      command: 'Downloads providers and configures backend (S3, etc.) for this working directory.',
      output: 'Must succeed before plan/apply; `.terraform/` holds provider binaries.',
      usage: 'First step in CI job or fresh clone before any plan.',
    },
  },
  {
    id: 'tf-plan',
    tab: 'terraform',
    canonical: 'terraform plan',
    output: `aws_instance.app: Refreshing state... [id=i-0abc123def456789]

Terraform will perform the following actions:

  # aws_instance.app will be updated in-place
  ~ resource "aws_instance" "app" {
      ~ instance_type = "t3.small" -> "t3.medium"
    }

Plan: 1 to change, 0 to add, 0 to destroy.`,
    outputKind: 'success',
    mostUsed: true,
    explain: {
      command: 'Dry-run diff between desired `.tf` state and real infrastructure.',
      output: '`~` update, `+` create, `-` destroy — review every line before apply.',
      usage: 'Mandatory gate in mature teams; paste into change tickets for audit.',
    },
  },
  {
    id: 'tf-apply',
    tab: 'terraform',
    canonical: 'terraform apply',
    output: `aws_instance.app: Modifying... [id=i-0abc123def456789]
aws_instance.app: Modifications complete after 42s

Apply complete! Resources: 0 added, 1 changed, 0 destroyed.`,
    outputKind: 'success',
    hint: 'terraform apply -auto-approve is for automation only',
    explain: {
      command: 'Applies the last reviewed plan (or prompts for approval interactively).',
      output: 'Resource lines show create/modify/destroy with timing.',
      usage: 'Pair with locked state and peer review for production accounts.',
    },
  },
  {
    id: 'tf-destroy',
    tab: 'terraform',
    canonical: 'terraform destroy',
    output: `aws_instance.app: Destroying... [id=i-0abc123def456789]
aws_instance.app: Destruction complete after 18s

Destroy complete! Resources: 1 destroyed.`,
    outputKind: 'success',
    explain: {
      command: 'Removes all resources tracked in state — extremely destructive.',
      output: 'Each resource is destroyed in dependency order; state file updated after.',
      usage: 'Dev/sandbox teardown; prod usually uses targeted `-target` with extreme care.',
    },
  },
  {
    id: 'tf-state',
    tab: 'terraform',
    canonical: 'terraform state show aws_instance.app',
    output: `# aws_instance.app:
resource "aws_instance" "app" {
    id                        = "i-0abc123def456789"
    instance_type             = "t3.medium"
    private_ip                = "10.0.1.88"
}`,
    outputKind: 'success',
    explain: {
      command: 'Prints the state object for one resource address — debugging drift.',
      output: 'Shows attributes Terraform believes are live — compare to `aws ec2 describe-instances`.',
      usage: 'When plan shows unexpected changes, inspect state vs reality.',
    },
  },

  // —— AWS CLI ——
  {
    id: 'aws-ec2',
    tab: 'aws',
    canonical: 'aws ec2 describe-instances',
    output: `{
    "Reservations": [
        {
            "Instances": [
                {
                    "InstanceId": "i-0abc123def456789",
                    "State": { "Name": "running" },
                    "InstanceType": "t3.medium",
                    "PrivateIpAddress": "10.0.1.88"
                }
            ]
        }
    ]
}`,
    outputKind: 'table',
    mostUsed: true,
    hint: 'Add --query and --output table for readable tables',
    explain: {
      command: 'Calls EC2 DescribeInstances API — lists instances you can see with current IAM.',
      output: 'JSON is default; Reservations group instances by launch request.',
      usage: 'Foundation for inventory scripts, cost reports, and on-call debugging.',
    },
  },
  {
    id: 'aws-s3',
    tab: 'aws',
    canonical: 'aws s3 ls',
    output: `2025-03-01 12:00:00 my-app-artifacts
2025-02-15 09:30:00 terraform-state-prod
2024-11-03 18:22:00 logs-archive`,
    outputKind: 'success',
    mostUsed: true,
    explain: {
      command: 'Lists buckets in the account/region — requires `s3:ListAllMyBuckets` or similar.',
      output: 'Each line is bucket name (date columns are creation time in some outputs).',
      usage: 'Quick sanity check before `aws s3 sync` or lifecycle policy changes.',
    },
  },
  {
    id: 'aws-iam',
    tab: 'aws',
    canonical: 'aws iam list-users',
    output: `{
    "Users": [
        { "UserName": "ci-deploy-bot", "CreateDate": "2024-06-01T10:00:00Z" },
        { "UserName": "breakglass-admin", "CreateDate": "2023-01-15T08:00:00Z" }
    ]
}`,
    outputKind: 'table',
    explain: {
      command: 'Lists IAM users — IAM is global; region flag is ignored.',
      output: 'Returns metadata only — use `get-user` / policy APIs for permissions detail.',
      usage: 'Audit who has long-lived keys vs SSO-only access.',
    },
  },
  {
    id: 'aws-ecs',
    tab: 'aws',
    canonical: 'aws ecs list-clusters',
    output: `{
    "clusterArns": [
        "arn:aws:ecs:us-east-1:123456789012:cluster/prod-main",
        "arn:aws:ecs:us-east-1:123456789012:cluster/staging"
    ]
}`,
    outputKind: 'success',
    hint: 'Follow with list-services --cluster <arn>',
    explain: {
      command: 'Lists ECS clusters in the account/region for container orchestration.',
      output: 'ARNs uniquely identify clusters; use short names in console, ARNs in API.',
      usage: 'Entry point before inspecting services, tasks, and task definitions.',
    },
  },
  {
    id: 'aws-err',
    tab: 'aws',
    canonical: 'aws s3 ls s3://bucket-does-not-exist-12345',
    output: `An error occurred (NoSuchBucket) when calling the ListObjectsV2 operation: The specified bucket does not exist`,
    outputKind: 'error',
    explain: {
      command: 'Attempts to list objects in a bucket — requires bucket to exist and list permission.',
      output: 'NoSuchBucket is explicit; AccessDenied would mean policy blocks you.',
      usage: 'Verify account, region, and bucket name — typos are common.',
    },
  },

  // —— Linux ——
  {
    id: 'lx-ls',
    tab: 'linux',
    canonical: 'ls -la',
    output: `total 48
drwxr-xr-x  6 dev dev  4096 Mar 28 10:00 .
drwxr-xr-x 18 dev dev  4096 Mar 27 18:22 ..
-rw-r--r--  1 dev dev  2201 Mar 28 09:55 README.md
drwxr-xr-x  3 dev dev  4096 Mar 28 10:01 src`,
    outputKind: 'table',
    mostUsed: true,
    hint: '-l long listing, -a includes hidden dotfiles',
    explain: {
      command: '`ls` lists directory contents; `-la` shows all files with permissions and metadata.',
      output: 'rwx triads = owner/group/others; first char `d` means directory.',
      usage: 'First step on any SSH session to orient in the filesystem.',
    },
  },
  {
    id: 'lx-df',
    tab: 'linux',
    canonical: 'df -h',
    output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        99G   42G   52G  45% /
tmpfs           7.8G     0  7.8G   0% /dev/shm`,
    outputKind: 'table',
    mostUsed: true,
    explain: {
      command: 'Reports disk space usage per mount — `-h` human-readable sizes.',
      output: 'Use% near 100% risks write failures and service outages.',
      usage: 'Check before large log writes or database imports.',
    },
  },
  {
    id: 'lx-top',
    tab: 'linux',
    canonical: 'top',
    output: `top - 10:15:02 up 45 days,  3 users,  load average: 0.42, 0.38, 0.35
Tasks: 128 total,   1 running, 127 sleeping
%Cpu(s):  4.2 us,  1.1 sy,  0.0 ni, 94.5 id
MiB Mem :  15988.2 total,   2341.2 free,   8233.1 used
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1824 nginx     20   0   12408   4500   3200 S   0.3   0.0   0:42.12 nginx`,
    outputKind: 'table',
    hint: 'Press q to quit; try `htop` for friendlier UI if installed',
    explain: {
      command: '`top` shows live process list and system summary — refreshes until you quit.',
      output: 'load average = runnable processes averaged over 1/5/15 minutes; %CPU per process.',
      usage: 'First triage for CPU spikes; pair with `pidstat` or tracing for root cause.',
    },
  },
  {
    id: 'lx-ps',
    tab: 'linux',
    canonical: 'ps aux',
    output: `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  16812  9200 ?        Ss   Mar01   0:42 /sbin/init
dev       1824  0.3  0.2  12408  4500 ?        S    Mar28   0:42 nginx: worker`,
    outputKind: 'table',
    mostUsed: true,
    explain: {
      command: '`ps` snapshots processes; `aux` is the common BSD-style full list.',
      output: 'STAT column shows state (S sleeping, R running, Z zombie).',
      usage: 'Scriptable with `ps aux | grep` — avoid in prod without care (race conditions).',
    },
  },
  {
    id: 'lx-netstat',
    tab: 'linux',
    canonical: 'netstat -tulnp',
    output: `(Not all processes could be identified, non-owned process info will not be shown)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      1824/nginx
tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN      2041/postgres`,
    outputKind: 'table',
    hint: 'On modern systems prefer: ss -tulnp',
    explain: {
      command: 'Shows listening ports and associated programs (with privileges).',
      output: 'LISTEN state means socket accepts connections; 0.0.0.0 = all interfaces.',
      usage: 'Verify a service bound correctly or find port conflicts.',
    },
  },

  // —— Ansible ——
  {
    id: 'an-ping',
    tab: 'ansible',
    canonical: 'ansible all -m ping',
    output: `web1 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
web2 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}`,
    outputKind: 'success',
    mostUsed: true,
    hint: 'Inventory from /etc/ansible/hosts or -i path',
    explain: {
      command: 'Runs the ping module over SSH to verify connectivity and Python on targets.',
      output: 'SUCCESS with pong means host reachable; UNREACHABLE would show SSH errors.',
      usage: 'First check after inventory changes or firewall updates.',
    },
  },
  {
    id: 'an-playbook',
    tab: 'ansible',
    canonical: 'ansible-playbook site.yml',
    output: `PLAY [webservers] **********************************************************

TASK [Gathering Facts] *****************************************************
ok: [web1]
ok: [web2]

TASK [Install nginx] *******************************************************
changed: [web1]
changed: [web2]

PLAY RECAP *******************************************************************
web1                       : ok=3    changed=1    unreachable=0    failed=0
web2                       : ok=3    changed=1    unreachable=0    failed=0`,
    outputKind: 'success',
    mostUsed: true,
    explain: {
      command: 'Applies tasks in `site.yml` to hosts in play order — idempotent by design.',
      output: 'changed vs ok tells you whether Ansible modified state; failed stops the play.',
      usage: 'Core config management flow; run from CI with vault for secrets.',
    },
  },
  {
    id: 'an-err',
    tab: 'ansible',
    canonical: 'ansible badhost -m ping',
    output: `badhost | UNREACHABLE! => {
    "changed": false,
    "msg": "Failed to connect to the host via ssh: Connection timed out"
}`,
    outputKind: 'error',
    explain: {
      command: 'Same ping module — failure shows SSH/network issues.',
      output: 'UNREACHABLE means Ansible never got a session — check SG, route, ssh-agent.',
      usage: 'Compare with `ssh badhost` from the same control node.',
    },
  },

  // —— Helm ——
  {
    id: 'h-list',
    tab: 'helm',
    canonical: 'helm list',
    output: `NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART
api     production      14              2025-03-28 10:01:22.123456 +0000 UTC    deployed        api-1.4.2
redis   production      3               2025-03-20 08:00:00.000000 +0000 UTC    deployed        redis-18.0.0`,
    outputKind: 'table',
    mostUsed: true,
    hint: 'helm list -A for all namespaces',
    explain: {
      command: 'Lists Helm releases in the current namespace (from kube-context).',
      output: 'REVISION increments on upgrade; STATUS should be deployed.',
      usage: 'See what charts are running before rollback or upgrade.',
    },
  },
  {
    id: 'h-install',
    tab: 'helm',
    canonical: 'helm install myapp ./chart',
    output: `NAME: myapp
LAST DEPLOYED: Fri Mar 28 10:18:22 2025
NAMESPACE: default
STATUS: deployed
REVISION: 1`,
    outputKind: 'success',
    explain: {
      command: 'Installs a chart from a local path or repo into the cluster.',
      output: 'REVISION 1 on fresh install; hooks may run as Kubernetes Jobs.',
      usage: 'Pair with values files for environment-specific overrides.',
    },
  },
  {
    id: 'h-upgrade',
    tab: 'helm',
    canonical: 'helm upgrade myapp ./chart',
    output: `Release "myapp" has been upgraded. Happy Helming!
LAST DEPLOYED: Fri Mar 28 10:22:01 2025
NAMESPACE: default
STATUS: deployed
REVISION: 2`,
    outputKind: 'success',
    mostUsed: true,
    explain: {
      command: 'Upgrades an existing release with a new chart version or values.',
      output: 'REVISION bumps; rollback with `helm rollback myapp <rev>` if needed.',
      usage: 'Typical CD path: build image → helm upgrade with new tag.',
    },
  },

  // —— Jenkins ——
  {
    id: 'jk-build',
    tab: 'jenkins',
    canonical: 'jenkins trigger deploy-pipeline',
    output: `Triggered build #247 for job "deploy-pipeline"
Queue item ID: 8912
Estimated start: immediate (executor idle)
URL: https://jenkins.example/job/deploy-pipeline/247/`,
    outputKind: 'success',
    mostUsed: true,
    hint: 'Real Jenkins uses POST to /job/name/build or CLI / API token',
    explain: {
      command: 'Simulates triggering a parameterized or freestyle job (REST/CLI in real life).',
      output: 'Build number increments; queue ID tracks waiting vs running state.',
      usage: 'Kicks deploy after merge; pair with Blue Ocean or log streaming for output.',
    },
  },
  {
    id: 'jk-logs',
    tab: 'jenkins',
    canonical: 'jenkins logs deploy-pipeline 247',
    output: `[Pipeline] Start of Pipeline
[Pipeline] node (linux-agent-3) {
[Pipeline] stage (Checkout) {
[Pipeline] git
Checking out git https://github.com/org/repo.git
[Pipeline] }
[Pipeline] stage (Build) {
[Pipeline] sh
+ npm ci
+ npm run build
[Pipeline] }
[Pipeline] stage (Deploy) {
[Pipeline] echo
Deploying to staging...
[Pipeline] }
[Pipeline] }
[Pipeline] End of Pipeline
Finished: SUCCESS`,
    outputKind: 'success',
    mostUsed: true,
    explain: {
      command: 'Shows console output for a build — Declarative Pipeline stages in order.',
      output: 'SUCCESS/WARNING/FAILED at end; scrollback shows each shell step.',
      usage: 'Primary artifact when CI fails — search for first ERROR line.',
    },
  },
  {
    id: 'jk-queue',
    tab: 'jenkins',
    canonical: 'jenkins queue',
    output: `Queue ID  Job                Why blocked
8912        deploy-pipeline    Waiting for executor on label docker
8911        nightly-tests        (none) — starting`,
    outputKind: 'table',
    explain: {
      command: 'Lists queued builds — useful when triggers return but build does not start.',
      output: 'Executor/label starvation shows as blocked reason.',
      usage: 'Scale agents or fix stuck jobs clogging the queue.',
    },
  },

  // —— Azure CLI ——
  {
    id: 'az-vm',
    tab: 'azure',
    canonical: 'az vm list',
    output: `[
  {
    "name": "prod-web-01",
    "resourceGroup": "rg-prod",
    "location": "eastus",
    "hardwareProfile": { "vmSize": "Standard_D2s_v5" }
  }
]`,
    outputKind: 'table',
    mostUsed: true,
    hint: 'az vm list -d for power state; -o table for columns',
    explain: {
      command: 'Lists VMs in accessible subscriptions — requires Reader or higher.',
      output: 'JSON default; resourceGroup scopes many follow-up commands.',
      usage: 'Inventory and cost discussions; pair with `az vm show` for NICs/disks.',
    },
  },
  {
    id: 'az-group',
    tab: 'azure',
    canonical: 'az group list',
    output: `Name              Location
rg-prod           eastus
rg-staging        westeurope
rg-network-hub    eastus`,
    outputKind: 'table',
    mostUsed: true,
    explain: {
      command: 'Lists resource groups — the primary Azure scope container.',
      output: 'Empty RG still costs nothing by itself; resources inside bill.',
      usage: 'Find correct `-g` for almost every `az` subcommand.',
    },
  },
  {
    id: 'az-account',
    tab: 'azure',
    canonical: 'az account show',
    output: `{
  "name": "Production Subscription",
  "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  "tenantId": "11111111-2222-3333-4444-555555555555",
  "state": "Enabled",
  "user": { "name": "devops@example.com", "type": "user" }
}`,
    outputKind: 'success',
    hint: 'az login first; az account set --subscription for switching',
    explain: {
      command: 'Shows the active subscription context for subsequent commands.',
      output: 'Wrong subscription is a common source of “resource not found”.',
      usage: 'Script `az account show -o tsv --query id` for automation.',
    },
  },
]

/** @param {PlaygroundSimulation} sim */
function matchKeysFor(sim) {
  const keys = new Set([normalizePlaygroundInput(sim.canonical)])
  for (const a of sim.aliases || []) keys.add(normalizePlaygroundInput(a))
  return keys
}

/** Build once: canonical/alias -> simulation */
const SIM_BY_NORMALIZED = new Map()
for (const sim of PLAYGROUND_SIMULATIONS) {
  for (const k of matchKeysFor(sim)) {
    SIM_BY_NORMALIZED.set(k, sim)
  }
}

export function normalizePlaygroundInput(s) {
  return String(s || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

/**
 * @param {string} raw
 * @param {PlaygroundTabId} tabId
 */
export function findPlaygroundSimulation(raw, tabId) {
  const n = normalizePlaygroundInput(raw)
  if (!n) return { kind: 'empty' }

  const match = SIM_BY_NORMALIZED.get(n)
  if (!match) return { kind: 'unknown', normalized: n }

  if (match.tab !== tabId) {
    const tabLabel = PLAYGROUND_TABS.find((t) => t.id === match.tab)?.label || match.tab
    return {
      kind: 'wrongTab',
      message: `That command is simulated under the ${tabLabel} tab. Switch tabs or type the command for this environment.`,
    }
  }

  return { kind: 'ok', simulation: match }
}

/** Suggest strings for the active tab (for autocomplete UI). */
export function suggestionsForTab(tabId) {
  return PLAYGROUND_SIMULATIONS.filter((s) => s.tab === tabId).map((s) => s.canonical)
}

/** Filter suggestions by query substring (for inline autocomplete). */
export function filterSuggestionsForTab(tabId, query) {
  const list = suggestionsForTab(tabId)
  const n = normalizePlaygroundInput(query)
  if (!n) return list
  return list.filter((s) => normalizePlaygroundInput(s).includes(n))
}

export const PLAYGROUND_SIMULATION_COUNT = PLAYGROUND_SIMULATIONS.length

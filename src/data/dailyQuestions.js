/**
 * Multiple-choice questions for the Daily workspace (Question of the Day).
 * @type {Array<{ id: string, question: string, options: string[], correctIndex: number, explanation: string }>}
 */
export const DAILY_QUESTIONS = [
  {
    id: 'q-cidr',
    question: 'In IPv4 CIDR notation, what does /24 typically describe?',
    options: [
      'Exactly 24 hosts on a network',
      'A subnet mask with 24 bits for the network prefix (256 addresses in the block)',
      'Only public IP addresses',
      'A port range from 1–24',
    ],
    correctIndex: 1,
    explanation:
      '/24 means the first 24 bits identify the network; the remaining 8 bits are for host addresses (2⁸ = 256 addresses in the block, minus reserved addresses depending on context).',
  },
  {
    id: 'q-docker-exit',
    question: 'A Docker container exits immediately after start. What is a common first check?',
    options: [
      'Increase CPU limits only',
      'Inspect logs (docker logs) and the command/entrypoint — often the main process exits 0',
      'Delete the image and rebuild without cache',
      'Switch from bridge to host network unconditionally',
    ],
    correctIndex: 1,
    explanation:
      'Containers run as long as PID 1 stays running. If the main command finishes, the container stops — logs and the configured CMD/ENTRYPOINT explain why.',
  },
  {
    id: 'q-k8s-pod',
    question: 'In Kubernetes, what is the smallest deployable unit you usually schedule?',
    options: ['Node', 'Pod', 'Deployment file only', 'Service'],
    correctIndex: 1,
    explanation:
      'A Pod wraps one or more containers sharing network/storage namespaces; controllers like Deployments manage ReplicaSets of Pods.',
  },
  {
    id: 'q-terraform-state',
    question: 'Why does Terraform keep state?',
    options: [
      'Only for licensing',
      'To map real infrastructure to resources in code and plan updates safely',
      'To replace Git entirely',
      'To encrypt all cloud credentials',
    ],
    correctIndex: 1,
    explanation:
      'State records what Terraform believes exists so plans can compute create/update/destroy actions and track dependencies.',
  },
  {
    id: 'q-http-502',
    question: 'HTTP 502 Bad Gateway often suggests what class of problem?',
    options: [
      'Client sent invalid JSON only',
      'An upstream server the proxy relied on returned an invalid response or was unreachable',
      'DNS misconfiguration only',
      'Successful cache hit',
    ],
    correctIndex: 1,
    explanation:
      '502 usually means a gateway/proxy could not get a valid response from an upstream — check upstream health, ports, and timeouts.',
  },
  {
    id: 'q-ssh-key',
    question: 'Where does a typical SSH public-key auth flow place the public key on the server?',
    options: [
      '/etc/passwd',
      '~/.ssh/authorized_keys for the target user',
      '/var/log/auth.log only',
      'Inside the private key file',
    ],
    correctIndex: 1,
    explanation:
      'The server stores trusted public keys in authorized_keys; the client proves possession of the matching private key.',
  },
  {
    id: 'q-ci-cache',
    question: 'What is a primary benefit of caching dependencies in CI pipelines?',
    options: [
      'Guaranteed security without scanning',
      'Faster, more reliable builds by reusing downloaded artifacts between runs',
      'Removing the need for tests',
      'Disabling pull request checks',
    ],
    correctIndex: 1,
    explanation:
      'Caches shorten install steps (npm, pip, Docker layers) when inputs have not changed, saving time and bandwidth.',
  },
  {
    id: 'q-graceful-deploy',
    question: 'What does a “rolling” deployment usually try to preserve?',
    options: [
      'Zero documentation',
      'Availability by replacing instances gradually with health checks',
      'Single-threaded execution only',
      'Identical container image digests forever',
    ],
    correctIndex: 1,
    explanation:
      'Rolling updates replace old instances in batches while probes ensure new versions are healthy before draining old ones.',
  },
  {
    id: 'q-env-var',
    question: 'Why avoid committing production secrets to Git?',
    options: [
      'Git cannot store text',
      'History is hard to purge; leaks propagate to forks, CI logs, and clones',
      'Secrets make repos too small',
      'HTTPS prevents all leaks',
    ],
    correctIndex: 1,
    explanation:
      'Secrets in version control persist in history and copies — use secret managers, sealed files, or CI-injected variables.',
  },
  {
    id: 'q-prometheus',
    question: 'Prometheus primarily uses what model for metrics collection?',
    options: ['Push-only from apps', 'HTTP pull scraping of /metrics endpoints', 'SNMP exclusively', 'Batch CSV import'],
    correctIndex: 1,
    explanation:
      'Prometheus scrapes metrics over HTTP on an interval; push gateways exist for short-lived jobs.',
  },
  {
    id: 'q-nginx-upstream',
    question: 'In Nginx, an upstream block is used to…',
    options: [
      'Compile modules',
      'Define backend servers for load balancing and proxying',
      'Store SSL certificates only',
      'Disable access logs',
    ],
    correctIndex: 1,
    explanation:
      'upstream groups backend addresses; proxy_pass can forward to the upstream name for HA and scaling.',
  },
  {
    id: 'q-git-merge',
    question: 'What does git merge typically create when branches diverged?',
    options: [
      'A tag only',
      'A merge commit (or fast-forward) combining histories',
      'A detached HEAD only',
      'A new remote automatically',
    ],
    correctIndex: 1,
    explanation:
      'Merge integrates commits from another branch; fast-forward applies when no divergent commits exist.',
  },
  {
    id: 'q-linux-perm',
    question: 'In chmod 755 for a directory, what does “5” (world) usually allow?',
    options: ['Write + execute', 'Read + execute (enter/list depending on context)', 'No access', 'Full control'],
    correctIndex: 1,
    explanation:
      'Digits are rwx: 5 = read+execute — for directories, execute means permission to traverse/enter.',
  },
  {
    id: 'q-hpa',
    question: 'Kubernetes HPA scales workloads based primarily on…',
    options: [
      'Manual kubectl scale only',
      'Observed metrics (e.g. CPU/memory/custom) compared to targets',
      'Random intervals',
      'Number of YAML files',
    ],
    correctIndex: 1,
    explanation:
      'The Horizontal Pod Autoscaler adjusts replicas to meet target utilization or custom metrics.',
  },
  {
    id: 'q-dockerfile-layer',
    question: 'Why order Dockerfile instructions from least to most frequently changing?',
    options: [
      'To increase image size',
      'To maximize Docker layer cache hits and speed rebuilds',
      'To disable caching entirely',
      'To hide layers from security scans',
    ],
    correctIndex: 1,
    explanation:
      'Layers rebuild from the first changed instruction — stable base layers stay cached when only app code changes.',
  },
  {
    id: 'q-helm',
    question: 'Helm charts primarily help with…',
    options: [
      'Writing only Dockerfiles',
      'Packaging, templating, and versioning Kubernetes manifests',
      'Replacing kubectl entirely',
      'Physical server provisioning only',
    ],
    correctIndex: 1,
    explanation:
      'Charts parameterize K8s resources with values files and support rollbacks and dependencies.',
  },
  {
    id: 'q-ansible-idempotent',
    question: 'Idempotence in Ansible means…',
    options: [
      'Playbooks run only once ever',
      'Running the same playbook twice should converge to the desired state without unnecessary changes',
      'Tasks never report changed=true',
      'SSH is disabled',
    ],
    correctIndex: 1,
    explanation:
      'Modules should be safe to re-run; second runs make no changes if the system already matches the declared state.',
  },
  {
    id: 'q-redis-persist',
    question: 'Redis persistence options include RDB snapshots and…',
    options: ['FTP sync', 'AOF (append-only file) for durability tradeoffs', 'NFS only', 'Git LFS'],
    correctIndex: 1,
    explanation:
      'RDB point-in-time snapshots and AOF log of writes offer different durability vs performance tradeoffs.',
  },
]

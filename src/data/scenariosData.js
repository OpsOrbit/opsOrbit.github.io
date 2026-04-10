/**
 * DevOps troubleshooting scenarios — interview-style walkthroughs.
 * @typedef {'beginner' | 'intermediate' | 'advanced'} ScenarioDifficulty
 * @typedef {'aws' | 'kubernetes' | 'linux' | 'networking'} ScenarioCategoryId
 */

export const SCENARIO_CATEGORY_IDS = new Set(['aws', 'kubernetes', 'linux', 'networking'])
export const SCENARIO_DIFFICULTY_IDS = new Set(['beginner', 'intermediate', 'advanced'])

/** @type {{ id: string, label: string }[]} */
export const SCENARIO_CATEGORY_OPTIONS = [
  { id: 'all', label: 'All categories' },
  { id: 'aws', label: 'AWS' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'linux', label: 'Linux' },
  { id: 'networking', label: 'Networking' },
]

/** @type {{ id: string, label: string }[]} */
export const SCENARIO_DIFFICULTY_OPTIONS = [
  { id: 'all', label: 'All levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

const catLabel = { aws: 'AWS', kubernetes: 'Kubernetes', linux: 'Linux', networking: 'Networking' }
const diffLabel = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

export function scenarioCategoryLabel(id) {
  return catLabel[id] || id
}

export function scenarioDifficultyLabel(id) {
  return diffLabel[id] || id
}

/**
 * @type {Array<{
 *   id: string
 *   title: string
 *   categoryId: ScenarioCategoryId
 *   difficulty: ScenarioDifficulty
 *   shortDescription: string
 *   problem: string
 *   symptoms: string[]
 *   steps: { title: string, detail: string, commands?: string[] }[]
 *   commandSummary: string[]
 *   solution: string
 * }>}
 */
export const SCENARIOS = [
  {
    id: 'alb-502',
    title: 'Application Load Balancer returns 502',
    categoryId: 'aws',
    difficulty: 'intermediate',
    shortDescription: 'Users see 502 from an ALB while targets or security groups look fine at first glance.',
    problem:
      'An AWS Application Load Balancer returns HTTP 502 Bad Gateway. The application works when hit directly on an instance, or the issue appeared after a deployment.',
    symptoms: [
      'ALB access logs or browser show 502 / ELB-generated error pages',
      'Target group shows unhealthy targets, or healthy but wrong port/protocol',
      'Spikes in target response time or connection resets',
    ],
    steps: [
      {
        title: 'Confirm target health',
        detail:
          'In EC2 → Target Groups → Targets, check health status and reason (failed checks, timeout). Ensure health check path, port, and matcher (200) match what the app actually returns.',
        commands: [
          'aws elbv2 describe-target-health --target-group-arn <tg-arn>',
          'curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080/health',
        ],
      },
      {
        title: 'Verify listener rules and port',
        detail:
          '502 often means the load balancer could not get a valid response from a target. Confirm listener forwards to the correct target group, port (e.g. 80 vs 8080), and that security groups allow ALB → instance traffic on that port.',
        commands: ['aws elbv2 describe-listeners --load-balancer-arn <alb-arn>', 'aws ec2 describe-security-groups --group-ids <sg-id>'],
      },
      {
        title: 'Check application and idle timeouts',
        detail:
          'If the app closes connections or takes longer than the ALB idle timeout, you may see intermittent 502s. Review application logs during the request window.',
        commands: ['sudo journalctl -u myapp -f', 'kubectl logs -f deploy/myapp  # if EKS'],
      },
    ],
    commandSummary: [
      'aws elbv2 describe-target-health --target-group-arn <tg-arn>',
      'curl -v http://internal-alb.example.com/',
    ],
    solution:
      'Most 502s are fixed by aligning health checks with a real endpoint, opening the correct security group path from ALB SG to instance SG on the app port, and pointing the listener to the target group that matches the process actually listening.',
  },
  {
    id: 'pod-crashloop',
    title: 'Kubernetes pod stuck in CrashLoopBackOff',
    categoryId: 'kubernetes',
    difficulty: 'intermediate',
    shortDescription: 'A Deployment keeps restarting; `kubectl describe` shows CrashLoopBackOff.',
    problem:
      'A pod never becomes Ready. Events report Back-off restarting failed container / CrashLoopBackOff.',
    symptoms: [
      'kubectl get pods shows 0/1 Running with many restarts',
      'describe pod: "CrashLoopBackOff" or OOMKilled',
      'Service has no ready endpoints',
    ],
    steps: [
      {
        title: 'Inspect events and previous logs',
        detail:
          'Events often state the immediate reason (exit code 1, command not found, config missing). Fetch logs from the previous crashed instance.',
        commands: [
          'kubectl describe pod <name> -n <ns>',
          'kubectl logs <name> -n <ns> --previous',
          'kubectl get pod <name> -n <ns> -o yaml',
        ],
      },
      {
        title: 'Validate image, command, and env',
        detail:
          'Wrong image tag, missing env vars, or wrong args are common. Compare with a known-good Deployment or local docker run.',
        commands: ['kubectl get deploy <name> -n <ns> -o yaml', 'kubectl exec -it <name> -n <ns> -- sh  # if it ever stays up'],
      },
      {
        title: 'Check resources and probes',
        detail:
          'OOMKilled means raise limits or reduce usage. Failed liveness that is too aggressive can also restart loops.',
        commands: ['kubectl top pod -n <ns>', 'kubectl get pod <name> -o jsonpath="{.status.containerStatuses[*].lastState}"'],
      },
    ],
    commandSummary: ['kubectl describe pod <name> -n <ns>', 'kubectl logs <name> -n <ns> --previous'],
    solution:
      'Fix the underlying container exit (config, bug, or resources), then ensure probes and resource limits match reality so Kubernetes stops killing healthy-but-slow startups.',
  },
  {
    id: 'ssh-refused',
    title: 'SSH connection refused',
    categoryId: 'linux',
    difficulty: 'beginner',
    shortDescription: 'ssh user@host fails with "Connection refused" on port 22.',
    problem:
      'You cannot SSH into a host. The client reports connection refused (not timeout), usually meaning nothing accepts on that port or a firewall drops SYN.',
    symptoms: ['ssh: connect to host port 22: Connection refused', 'Works from inside the same subnet but not from outside'],
    steps: [
      {
        title: 'Confirm host, port, and network path',
        detail:
          'Verify IP/DNS, bastion jump, and whether you meant port 22 or a custom port (-p). Rule out wrong interface or stale DNS.',
        commands: ['ping -c 3 host', 'dig +short host', 'ssh -v user@host'],
      },
      {
        title: 'Check sshd and listening socket',
        detail:
          'On the server (console/out-of-band): ensure sshd is running and listening on 0.0.0.0:22 or the expected address.',
        commands: [
          'sudo systemctl status sshd || sudo systemctl status ssh',
          'sudo ss -lntp | grep :22',
          'sudo journalctl -u ssh -n 50',
        ],
      },
      {
        title: 'Firewall and cloud security groups',
        detail:
          'Local firewalld/ufw/iptables and cloud SGs must allow 22/tcp from your source. "Refused" locally often means sshd down; from outside with sshd up, suspect firewall/SG.',
        commands: ['sudo firewall-cmd --list-all', 'sudo ufw status', 'aws ec2 describe-security-groups ...'],
      },
    ],
    commandSummary: ['ssh -v user@host', 'sudo ss -lntp | grep :22', 'sudo systemctl restart sshd'],
    solution:
      'Start sshd, bind to the right address/port, open host and network firewalls including cloud SGs/NACLs for your source IP, and use the correct bastion or VPN path.',
  },
  {
    id: 'dns-not-resolving',
    title: 'DNS not resolving for a hostname',
    categoryId: 'networking',
    difficulty: 'beginner',
    shortDescription: 'Applications or curl fail with "Could not resolve host" or NXDOMAIN.',
    problem:
      'A hostname does not resolve to an IP from your machine or from pods, while it may work elsewhere or in public DNS.',
    symptoms: ['curl: Could not resolve host', 'getaddrinfo failed', 'Intermittent resolution in Kubernetes only'],
    steps: [
      {
        title: 'Test resolution explicitly',
        detail:
          'Use dig/nslookup against a known resolver (1.1.1.1, 8.8.8.8) and compare with the system stub resolver.',
        commands: ['dig @1.1.1.1 example.com +trace', 'nslookup example.com 8.8.8.8', 'cat /etc/resolv.conf'],
      },
      {
        title: 'Check records and TTL',
        detail:
          'Confirm A/AAAA/CNAME exist and are not stale in caches. For private zones, ensure VPC DNS settings and Route53 rules.',
        commands: ['dig NS example.com', 'aws route53 list-resource-record-sets --hosted-zone-id Z...'],
      },
      {
        title: 'Kubernetes CoreDNS',
        detail:
          'If only in-cluster fails, check CoreDNS pods, upstream resolv.conf, and NetworkPolicy blocking UDP/53.',
        commands: ['kubectl -n kube-system get pods -l k8s-app=kube-dns', 'kubectl run -it --rm debug --image=busybox -- nslookup kubernetes.default'],
      },
    ],
    commandSummary: ['dig @1.1.1.1 myapp.example.com', 'kubectl -n kube-system logs -l k8s-app=kube-dns --tail=50'],
    solution:
      'Point resolvers at authoritative or corporate DNS that actually hosts the zone, fix wrong records or split-horizon, clear stale caches, and ensure CoreDNS/upstream access from pods.',
  },
  {
    id: 'image-pull-backoff',
    title: 'ImagePullBackOff in Kubernetes',
    categoryId: 'kubernetes',
    difficulty: 'beginner',
    shortDescription: 'Pod cannot pull container image; status ImagePullBackOff.',
    problem:
      'Scheduler places the pod but kubelet cannot pull the image: wrong name/tag, registry auth, or network to registry.',
    symptoms: ['kubectl describe: Failed to pull image', 'ErrImagePull', 'private registry 401/403'],
    steps: [
      {
        title: 'Read the exact error',
        detail: 'Events show 404 (tag missing), unauthorized, or timeout.',
        commands: ['kubectl describe pod <name> -n <ns>', 'kubectl get events -n <ns> --sort-by=.lastTimestamp'],
      },
      {
        title: 'Verify image name and tag',
        detail: 'Try docker pull or crane with the same reference from a bastion. Typos in digest/tag are common.',
        commands: ['docker pull myregistry.io/app:v1.2.3'],
      },
      {
        title: 'Registry credentials',
        detail: 'For private registries, ensure imagePullSecrets on the ServiceAccount or namespace.',
        commands: ['kubectl get sa default -n <ns> -o yaml', 'kubectl create secret docker-registry regcred ...'],
      },
    ],
    commandSummary: ['kubectl describe pod <name> -n <ns>', 'kubectl get secret -n <ns>'],
    solution:
      'Use a resolvable image:tag, grant pull secrets for private registries, allow egress to the registry, and mirror images if registry is blocked from the cluster.',
  },
  {
    id: 'disk-full',
    title: 'Disk space critical on Linux server',
    categoryId: 'linux',
    difficulty: 'beginner',
    shortDescription: 'Services fail writes; monitoring alerts disk usage >90%.',
    problem:
      'The root or data volume is full or inodes exhausted. Logs or uploads may have filled the filesystem.',
    symptoms: ['No space left on device', 'apt/docker failures', 'journald cannot write'],
    steps: [
      {
        title: 'Find usage quickly',
        detail: 'Identify which mount and top directories consume space.',
        commands: ['df -h', 'df -i', 'sudo du -xh / --max-depth=1 | sort -h | tail'],
      },
      {
        title: 'Common culprits',
        detail: 'Rotate or truncate large logs under /var/log, prune old Docker data, clear journal, empty package cache.',
        commands: ['sudo journalctl --vacuum-time=3d', 'sudo docker system prune -a', 'sudo find /var/log -type f -size +100M'],
      },
      {
        title: 'Prevent recurrence',
        detail: 'Add logrotate, retention policies, and alerts before disks hit critical thresholds.',
        commands: [],
      },
    ],
    commandSummary: ['df -h', 'sudo du -sh /var/*', 'sudo journalctl --vacuum-time=3d'],
    solution:
      'Free space safely (logs, caches, old images), extend the volume if needed, then automate rotation and capacity alerts.',
  },
  {
    id: 'rds-timeout',
    title: 'Cannot connect to RDS from application',
    categoryId: 'aws',
    difficulty: 'intermediate',
    shortDescription: 'App times out to RDS endpoint; security groups or subnet route often wrong.',
    problem:
      'The application cannot establish a TCP connection to Amazon RDS. Works from some hosts but not others, or after moving workloads.',
    symptoms: ['Connection timed out', 'JDBC socket timeout', 'Works from same-VPC bastion only'],
    steps: [
      {
        title: 'Check RDS status and endpoint',
        detail: 'Ensure instance available, correct endpoint/port, and multi-AZ failover not in progress.',
        commands: ['aws rds describe-db-instances --db-instance-identifier mydb'],
      },
      {
        title: 'Security groups',
        detail: 'RDS SG must allow inbound from the application SG (or CIDR) on 3306/5432. Outbound on app side must allow return traffic.',
        commands: ['aws ec2 describe-security-groups --group-ids sg-xxx'],
      },
      {
        title: 'Subnets and routing',
        detail: 'App and RDS must be in peered networks or same VPC with routes; private RDS needs private connectivity from app subnets.',
        commands: ['aws ec2 describe-route-tables --filters ...'],
      },
    ],
    commandSummary: ['nc -vz mydb.xxx.rds.amazonaws.com 5432', 'aws rds describe-db-instances'],
    solution:
      'Align SG rules (source = app SG), place workloads in routed subnets that can reach the RDS subnet, and use the correct endpoint for read/write or reader.',
  },
  {
    id: 'tls-expired',
    title: 'HTTPS fails — certificate expired or wrong name',
    categoryId: 'networking',
    difficulty: 'intermediate',
    shortDescription: 'Browsers or curl show certificate errors or SEC_ERROR_EXPIRED_CERT.',
    problem:
      'TLS handshake fails because the certificate is expired, self-signed in prod, or SAN does not match the hostname.',
    symptoms: ['NET::ERR_CERT_DATE_INVALID', 'curl: SSL certificate problem', 'Works on www but not apex'],
    steps: [
      {
        title: 'Inspect cert from client',
        detail: 'openssl s_client shows notBefore/notAfter and subjectAlternativeName.',
        commands: ['openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates -ext subjectAltName'],
      },
      {
        title: 'Renewal path',
        detail: 'ACM auto-renews if DNS validation is healthy; Let\'s Encrypt needs certbot or ingress shim. Fix broken HTTP-01/ DNS-01 challenges.',
        commands: ['kubectl describe certificate -n ingress-nginx', 'sudo certbot certificates'],
      },
      {
        title: 'Terminate at load balancer vs pod',
        detail: 'Ensure listeners use the correct cert ARN and SNI matches the hostname clients use.',
        commands: [],
      },
    ],
    commandSummary: ['openssl s_client -connect host:443 -servername host', 'curl -vI https://host/'],
    solution:
      'Renew or replace the certificate, fix validation (DNS/HTTP), and ensure clients use a hostname covered by SANs and that the LB presents the right chain.',
  },
]

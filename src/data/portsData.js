/**
 * Network ports reference — categories match filter tabs (slug ids).
 * @typedef {{ id: string, label: string, hint?: string }} PortFlowNode
 * @typedef {'AWS' | 'Kubernetes' | 'Linux' | 'DevOps'} ContextBadge
 */

/** @type {{ id: string, label: string }[]} */
export const PORT_FILTER_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'database', label: 'Database' },
  { id: 'networking', label: 'Networking' },
  { id: 'devops', label: 'DevOps' },
  { id: 'security', label: 'Security' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'storage', label: 'Storage' },
  { id: 'general', label: 'General' },
]

export const PORT_CATEGORY_IDS = new Set(
  PORT_FILTER_CATEGORIES.filter((c) => c.id !== 'all').map((c) => c.id)
)

/** Grouped port numbers for Quick Learn mode */
export const QUICK_LEARN_PORT_GROUPS = [
  { id: 'ql-web', label: 'Web', subtitle: 'HTTP(S), submission, alternates', ports: [80, 443, 587, 8080, 8443] },
  { id: 'ql-db', label: 'Database', subtitle: 'SQL & document stores', ports: [1433, 3306, 5432, 27017] },
  { id: 'ql-net', label: 'Networking', subtitle: 'FTP, DNS, DHCP', ports: [20, 21, 53, 67, 68] },
  { id: 'ql-devops', label: 'DevOps', subtitle: 'SSH, Docker, Kubernetes API', ports: [22, 2375, 6443, 9090] },
]

/** @param {string} cat */
function categoryIdFromLabel(cat) {
  const m = {
    Networking: 'networking',
    Web: 'web',
    Database: 'database',
    DevOps: 'devops',
    Security: 'security',
    Monitoring: 'monitoring',
    Storage: 'storage',
    General: 'general',
  }
  return m[cat] || 'networking'
}

/**
 * Minimal rows from curated list (port, service, protocol, category label).
 * @type {Array<{ port: number, service: string, protocol: string, category: string }>}
 */
const RAW_PORTS = [
  { port: 20, service: 'FTP Data', protocol: 'TCP', category: 'Networking' },
  { port: 21, service: 'FTP Control', protocol: 'TCP', category: 'Networking' },
  { port: 22, service: 'SSH', protocol: 'TCP', category: 'DevOps' },
  { port: 23, service: 'Telnet', protocol: 'TCP', category: 'Security' },
  { port: 25, service: 'SMTP', protocol: 'TCP', category: 'Web' },
  { port: 53, service: 'DNS', protocol: 'TCP/UDP', category: 'Networking' },
  { port: 67, service: 'DHCP Server', protocol: 'UDP', category: 'Networking' },
  { port: 68, service: 'DHCP Client', protocol: 'UDP', category: 'Networking' },
  { port: 69, service: 'TFTP', protocol: 'UDP', category: 'Networking' },
  { port: 80, service: 'HTTP', protocol: 'TCP', category: 'Web' },
  { port: 88, service: 'Kerberos', protocol: 'TCP/UDP', category: 'Security' },
  { port: 110, service: 'POP3', protocol: 'TCP', category: 'Web' },
  { port: 119, service: 'NNTP', protocol: 'TCP', category: 'Networking' },
  { port: 123, service: 'NTP', protocol: 'UDP', category: 'Networking' },
  { port: 137, service: 'NetBIOS Name', protocol: 'UDP', category: 'Networking' },
  { port: 138, service: 'NetBIOS Datagram', protocol: 'UDP', category: 'Networking' },
  { port: 139, service: 'NetBIOS Session', protocol: 'TCP', category: 'Networking' },
  { port: 143, service: 'IMAP', protocol: 'TCP', category: 'Web' },
  { port: 161, service: 'SNMP', protocol: 'UDP', category: 'Monitoring' },
  { port: 162, service: 'SNMP Trap', protocol: 'UDP', category: 'Monitoring' },
  { port: 179, service: 'BGP', protocol: 'TCP', category: 'Networking' },
  { port: 194, service: 'IRC', protocol: 'TCP', category: 'Networking' },
  { port: 389, service: 'LDAP', protocol: 'TCP/UDP', category: 'Security' },
  { port: 443, service: 'HTTPS', protocol: 'TCP', category: 'Web' },
  { port: 445, service: 'SMB', protocol: 'TCP', category: 'Networking' },
  { port: 465, service: 'SMTPS', protocol: 'TCP', category: 'Web' },
  { port: 500, service: 'ISAKMP/IKE', protocol: 'UDP', category: 'Security' },
  { port: 514, service: 'Syslog', protocol: 'UDP', category: 'Monitoring' },
  { port: 515, service: 'LPD', protocol: 'TCP', category: 'Networking' },
  { port: 520, service: 'RIP', protocol: 'UDP', category: 'Networking' },
  { port: 587, service: 'SMTP Submission', protocol: 'TCP', category: 'Web' },
  { port: 636, service: 'LDAPS', protocol: 'TCP', category: 'Security' },
  { port: 989, service: 'FTPS Data', protocol: 'TCP', category: 'Security' },
  { port: 990, service: 'FTPS Control', protocol: 'TCP', category: 'Security' },
  { port: 993, service: 'IMAPS', protocol: 'TCP', category: 'Web' },
  { port: 995, service: 'POP3S', protocol: 'TCP', category: 'Web' },
  { port: 1433, service: 'MSSQL', protocol: 'TCP', category: 'Database' },
  { port: 1521, service: 'Oracle DB', protocol: 'TCP', category: 'Database' },
  { port: 2049, service: 'NFS', protocol: 'TCP/UDP', category: 'Storage' },
  { port: 2082, service: 'cPanel', protocol: 'TCP', category: 'Web' },
  { port: 2083, service: 'cPanel SSL', protocol: 'TCP', category: 'Web' },
  { port: 2181, service: 'Zookeeper', protocol: 'TCP', category: 'DevOps' },
  { port: 2222, service: 'DirectAdmin', protocol: 'TCP', category: 'Web' },
  { port: 2375, service: 'Docker', protocol: 'TCP', category: 'DevOps' },
  { port: 2376, service: 'Docker SSL', protocol: 'TCP', category: 'DevOps' },
  { port: 2483, service: 'Oracle TCPS', protocol: 'TCP', category: 'Database' },
  { port: 2484, service: 'Oracle SSL', protocol: 'TCP', category: 'Database' },
  { port: 3000, service: 'Dev Server', protocol: 'TCP', category: 'DevOps' },
  { port: 3001, service: 'Alt Dev Server', protocol: 'TCP', category: 'DevOps' },
  { port: 3306, service: 'MySQL', protocol: 'TCP', category: 'Database' },
  { port: 3389, service: 'RDP', protocol: 'TCP', category: 'DevOps' },
  { port: 3690, service: 'Subversion', protocol: 'TCP', category: 'DevOps' },
  { port: 4444, service: 'Metasploit', protocol: 'TCP', category: 'Security' },
  { port: 4567, service: 'Ruby Server', protocol: 'TCP', category: 'DevOps' },
  { port: 5432, service: 'PostgreSQL', protocol: 'TCP', category: 'Database' },
  { port: 5601, service: 'Kibana', protocol: 'TCP', category: 'Monitoring' },
  { port: 5672, service: 'RabbitMQ', protocol: 'TCP', category: 'DevOps' },
  { port: 5900, service: 'VNC', protocol: 'TCP', category: 'DevOps' },
  { port: 5985, service: 'WinRM HTTP', protocol: 'TCP', category: 'DevOps' },
  { port: 5986, service: 'WinRM HTTPS', protocol: 'TCP', category: 'DevOps' },
  { port: 6379, service: 'Redis', protocol: 'TCP', category: 'DevOps' },
  { port: 6443, service: 'Kubernetes API', protocol: 'TCP', category: 'DevOps' },
  { port: 6667, service: 'IRC Alt', protocol: 'TCP', category: 'Networking' },
  { port: 7001, service: 'WebLogic', protocol: 'TCP', category: 'Web' },
  { port: 7002, service: 'WebLogic SSL', protocol: 'TCP', category: 'Web' },
  { port: 7199, service: 'Cassandra JMX', protocol: 'TCP', category: 'Database' },
  { port: 7474, service: 'Neo4j', protocol: 'TCP', category: 'Database' },
  { port: 7777, service: 'Game Server', protocol: 'TCP', category: 'General' },
  { port: 8000, service: 'App Server', protocol: 'TCP', category: 'Web' },
  { port: 8008, service: 'HTTP Alt', protocol: 'TCP', category: 'Web' },
  { port: 8080, service: 'HTTP Alt', protocol: 'TCP', category: 'Web' },
  { port: 8081, service: 'App Alt', protocol: 'TCP', category: 'Web' },
  { port: 8086, service: 'InfluxDB', protocol: 'TCP', category: 'Monitoring' },
  { port: 8090, service: 'Couchbase', protocol: 'TCP', category: 'Database' },
  { port: 8200, service: 'Vault', protocol: 'TCP', category: 'Security' },
  { port: 8443, service: 'HTTPS Alt', protocol: 'TCP', category: 'Web' },
  { port: 8500, service: 'Consul', protocol: 'TCP', category: 'DevOps' },
  { port: 8600, service: 'Consul DNS', protocol: 'TCP/UDP', category: 'Networking' },
  { port: 9000, service: 'SonarQube', protocol: 'TCP', category: 'DevOps' },
  { port: 9042, service: 'Cassandra', protocol: 'TCP', category: 'Database' },
  { port: 9090, service: 'Prometheus', protocol: 'TCP', category: 'Monitoring' },
  { port: 9092, service: 'Kafka', protocol: 'TCP', category: 'DevOps' },
  { port: 9200, service: 'Elasticsearch', protocol: 'TCP', category: 'Monitoring' },
  { port: 9411, service: 'Zipkin', protocol: 'TCP', category: 'Monitoring' },
  { port: 27017, service: 'MongoDB', protocol: 'TCP', category: 'Database' },
]

/** Richer copy for commonly referenced ports (merged over defaults). Key = port number. */
const OVERRIDES = {
  20: {
    description: 'Active mode data channel for file transfers.',
    useCaseLabel: 'File transfer data',
    detail:
      'In active FTP, the server opens port 20 back to the client for the actual file payload while port 21 handles control. Many firewalls now prefer passive FTP to avoid inbound client connections.',
    realWorld: 'Legacy file sync jobs and some backup appliances still speak FTP; most teams prefer SFTP (22) or object storage instead.',
    commands: ['ftp ftp.example.com', 'curl ftp://user:pass@host/file.txt'],
    contextBadges: ['Linux', 'DevOps'],
    flow: [
      { id: 'c', label: 'Client', hint: 'PASV / PORT' },
      { id: 'ctrl', label: 'Port 21', hint: 'control' },
      { id: 'data', label: 'Port 20', hint: 'data channel' },
      { id: 'file', label: 'Payload', hint: 'bytes' },
    ],
  },
  21: {
    description: 'FTP command channel — login, cwd, transfer negotiation.',
    useCaseLabel: 'FTP control',
    detail:
      'All FTP commands (USER, PASS, RETR, STOR) go over 21. Data may use port 20 (active) or ephemeral ports (passive).',
    realWorld: 'Opening 21/tcp on a security group is common for NAS or web hosting panels; restrict by source IP when possible.',
    commands: ['ftp 203.0.113.10', 'lftp -u user host'],
    contextBadges: ['AWS', 'Linux', 'DevOps'],
    flow: [
      { id: 'u', label: 'Client', hint: 'USER/PASS' },
      { id: 'ftp', label: 'FTP (21)', hint: 'control' },
      { id: 'srv', label: 'FTP server', hint: 'vsftpd' },
      { id: 'ok', label: 'Ready', hint: 'data path' },
    ],
  },
  22: {
    description: 'Encrypted remote shell, file copy, and tunneling.',
    useCaseLabel: 'Remote admin & deploy',
    detail:
      'SSH provides authenticated, encrypted sessions. Keys replace passwords in production. SCP and SFTP ride the same port.',
    realWorld: 'Bastion hosts, Git over SSH, Ansible, and kubectl SSH tunnels all depend on 22 — lock down with security groups and fail2ban.',
    commands: ['ssh user@host', 'ssh -p 22 user@host', 'scp file.txt user@host:/tmp/', 'rsync -e ssh -a src/ user@host:dst/'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    highlight: true,
    flow: [
      { id: 'you', label: 'You', hint: 'terminal' },
      { id: 'ssh', label: 'SSH :22', hint: 'TLS-like' },
      { id: 'host', label: 'Server', hint: 'sshd' },
      { id: 'sh', label: 'Shell', hint: 'bash' },
    ],
  },
  23: {
    description: 'Unencrypted remote terminal — legacy; avoid on public networks.',
    useCaseLabel: 'Legacy devices',
    detail: 'Telnet sends credentials and keystrokes in cleartext. Used for old routers, printers, and lab gear.',
    realWorld: 'Interview answer: prefer SSH. If you must use Telnet, isolate the network and never expose 23 to the internet.',
    commands: ['telnet 203.0.113.5 23'],
    contextBadges: ['Linux', 'DevOps'],
    flow: [
      { id: 'u', label: 'Client', hint: 'cleartext' },
      { id: 't', label: 'Telnet :23', hint: 'no encryption' },
      { id: 'd', label: 'Device', hint: 'banner' },
    ],
  },
  25: {
    description: 'Mail transfer between servers (submission often uses 587).',
    useCaseLabel: 'Email delivery',
    detail:
      'MTAs (Postfix, Exchange edge) listen on 25 for inbound mail relay. Clients usually submit on 587 with STARTTLS instead.',
    realWorld: 'EC2 blocks port 25 by default on new accounts; request removal if you run an MTA. Kubernetes mail relays use Services on 25/587.',
    commands: ['telnet mx.example.com 25', 'openssl s_client -connect smtp.example.com:25 -starttls smtp'],
    contextBadges: ['AWS', 'Linux', 'DevOps'],
    flow: [
      { id: 'mx', label: 'Sender MTA', hint: 'queue' },
      { id: '25', label: 'SMTP :25', hint: 'relay' },
      { id: 'rx', label: 'Recipient MX', hint: 'accept' },
    ],
  },
  53: {
    description: 'Domain name resolution — mostly UDP; TCP for large responses.',
    useCaseLabel: 'Name resolution',
    detail:
      'Stub resolvers send UDP queries to 53. Zone transfers (AXFR) and big responses fall back to TCP. CoreDNS in Kubernetes listens on 53/UDP.',
    realWorld: 'Route53 Resolver endpoints, CoreDNS ClusterIP, and systemd-resolved all anchor on :53.',
    commands: ['dig @1.1.1.1 example.com', 'nslookup example.com 8.8.8.8', 'kubectl -n kube-system get svc kube-dns'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    flow: [
      { id: 'app', label: 'App', hint: 'getaddrinfo' },
      { id: 'res', label: 'Resolver', hint: 'stub' },
      { id: 'dns', label: 'DNS :53', hint: 'UDP/TCP' },
      { id: 'ans', label: 'Answer', hint: 'A/AAAA' },
    ],
  },
  80: {
    description: 'Plaintext web traffic; often redirects to HTTPS.',
    useCaseLabel: 'Web (legacy / redirect)',
    detail:
      'Browsers and load balancers use 80 for HTTP/1.1. In production, ALB listeners on 80 commonly redirect to 443.',
    realWorld: 'Ingress controllers expose 80→Service; cert-manager terminates TLS at 443 while 80 serves ACME HTTP-01 challenges.',
    commands: ['curl -I http://example.com', 'kubectl port-forward svc/nginx 8080:80'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    highlight: true,
    flow: [
      { id: 'u', label: 'User', hint: 'browser' },
      { id: 'lb', label: 'Load balancer', hint: ':80' },
      { id: 'be', label: 'Backend', hint: 'nginx' },
      { id: 'r', label: 'Response', hint: '301→443' },
    ],
  },
  110: {
    description: 'Download mailbox from server — largely superseded by IMAP.',
    useCaseLabel: 'Mail retrieval',
    detail: 'POP3 pulls mail to a single client; messages may be deleted on server after fetch depending on settings.',
    realWorld: 'Still seen in cheap hosting panels; enterprise mail uses IMAP/Graph/MAPI with TLS on 993/995.',
    commands: ['openssl s_client -connect mail.example.com:110 -starttls pop3'],
    contextBadges: ['Linux', 'DevOps'],
    flow: [
      { id: 'c', label: 'Mail client', hint: 'USER' },
      { id: 'p', label: 'POP3 :110', hint: 'optional STARTTLS' },
      { id: 'm', label: 'Mailbox', hint: 'spool' },
    ],
  },
  143: {
    description: 'Synchronized mail access across devices — folders on server.',
    useCaseLabel: 'Mail sync',
    detail: 'IMAP keeps state on the server; STARTTLS or implicit TLS on 993 is preferred today.',
    realWorld: 'Mobile/desktop clients use IMAP against Office365/Google or self-hosted Dovecot.',
    commands: ['openssl s_client -connect mail.example.com:143 -starttls imap'],
    contextBadges: ['Linux', 'DevOps'],
    flow: [
      { id: 'c', label: 'Client', hint: 'IDLE' },
      { id: 'i', label: 'IMAP :143', hint: 'STARTTLS' },
      { id: 's', label: 'Server', hint: 'folders' },
    ],
  },
  443: {
    description: 'TLS-encrypted HTTP — default for APIs and websites.',
    useCaseLabel: 'Secure web & APIs',
    detail:
      'TLS handshake negotiates keys; then HTTP/2 or HTTP/1.1 runs inside the encrypted channel. Essential for auth tokens and PII.',
    realWorld: 'ALB/NLB listeners, Ingress TLS, CloudFront, and API Gateway custom domains all terminate or pass through 443.',
    commands: ['curl -I https://example.com', 'openssl s_client -connect example.com:443 -servername example.com'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    highlight: true,
    flow: [
      { id: 'u', label: 'User', hint: 'click' },
      { id: 'br', label: 'Browser', hint: 'TLS' },
      { id: 'h', label: 'HTTPS :443', hint: 'encrypted' },
      { id: 'lb', label: 'Load balancer', hint: 'ACM cert' },
      { id: 'be', label: 'Backend', hint: 'pods' },
      { id: 'out', label: 'Response', hint: '200 OK' },
    ],
  },
  3306: {
    description: 'Default port for MySQL and MariaDB wire protocol.',
    useCaseLabel: 'Relational DB',
    detail:
      'Applications connect with username/password or IAM DB auth on RDS. TLS optional but recommended for remote links.',
    realWorld: 'RDS endpoints, Cloud SQL proxy sidecars, and Helm charts expose 3306 as ClusterIP.',
    commands: ['mysql -h db.internal -P 3306 -u app -p', 'kubectl run mysql --rm -it --image=mysql:8 -- mysql -h mysql -P 3306'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    highlight: true,
    flow: [
      { id: 'app', label: 'App', hint: 'ORM' },
      { id: 'cn', label: 'TCP :3306', hint: 'wire proto' },
      { id: 'db', label: 'MySQL', hint: 'InnoDB' },
      { id: 'rows', label: 'Rows', hint: 'result set' },
    ],
  },
  5432: {
    description: 'PostgreSQL default — advanced SQL, JSON, extensions.',
    useCaseLabel: 'Relational DB',
    detail: 'psql and app drivers connect to 5432. RDS Proxy and PgBouncer multiplex many clients to fewer DB connections.',
    realWorld: 'EKS workloads use RDS/Aurora Postgres endpoints on 5432 with security group rules from node groups.',
    commands: ['psql -h pg.internal -p 5432 -U app -d appdb', 'pg_dump -h host -p 5432 -U app dbname'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    highlight: true,
    flow: [
      { id: 'app', label: 'App', hint: 'pool' },
      { id: 'pg', label: 'Postgres :5432', hint: 'fe/be' },
      { id: 'data', label: 'Data', hint: 'WAL' },
    ],
  },
  6379: {
    description: 'In-memory cache, pub/sub, session store, job queues.',
    useCaseLabel: 'Cache & sessions',
    detail:
      'RESP protocol on 6379. TLS via stunnel, ElastiCache in-transit encryption, or Redis 6+ ACLs for auth.',
    realWorld: 'Sidekiq, Bull queues, and session stores point at ElastiCache/Redis Cluster Services in K8s.',
    commands: ['redis-cli -h cache.internal -p 6379', 'redis-cli -u redis://:pass@host:6379/0'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    flow: [
      { id: 'app', label: 'App', hint: 'SET/GET' },
      { id: 'r', label: 'Redis :6379', hint: 'RESP' },
      { id: 'mem', label: 'Memory', hint: 'keys' },
    ],
  },
  8080: {
    description: 'Alternate HTTP — dev servers, proxies, Tomcat default.',
    useCaseLabel: 'Dev & Java stacks',
    detail: 'Spring Boot, Tomcat, and many tutorials bind 8080 to avoid needing root for port 80.',
    realWorld: 'kubectl port-forward often maps local 8080 to Service 80; ALB target groups may use 8080 on instances.',
    commands: ['curl localhost:8080/health', 'java -jar app.jar --server.port=8080'],
    contextBadges: ['Kubernetes', 'Linux', 'DevOps'],
    flow: [
      { id: 'u', label: 'User', hint: 'curl' },
      { id: 'alt', label: 'HTTP :8080', hint: 'alt' },
      { id: 'app', label: 'App server', hint: 'JVM' },
    ],
  },
  8443: {
    description: 'Common second HTTPS listener — Tomcat, dev TLS, some appliances.',
    useCaseLabel: 'TLS alternate',
    detail: 'Used when 443 is taken by a reverse proxy or for management UIs on appliances.',
    realWorld: 'Corporate proxies and some ingress patterns expose 8443 for admin consoles alongside 443 for traffic.',
    commands: ['curl -k https://localhost:8443/', 'openssl s_client -connect host:8443'],
    contextBadges: ['Kubernetes', 'Linux', 'DevOps'],
    flow: [
      { id: 'c', label: 'Client', hint: 'TLS' },
      { id: 't', label: 'HTTPS :8443', hint: 'alt' },
      { id: 'svc', label: 'Service', hint: 'mgmt UI' },
    ],
  },
  27017: {
    description: 'MongoDB wire protocol — documents and replica sets.',
    useCaseLabel: 'Document DB',
    detail: 'mongosh and drivers connect to mongod on 27017. Replica sets use the same port per member.',
    realWorld: 'Atlas clusters, DocumentDB-compatible endpoints, and Helm MongoDB charts publish 27017 via Service.',
    commands: ['mongosh "mongodb://user:pass@host:27017/db"', 'kubectl port-forward svc/mongo 27017:27017'],
    contextBadges: ['AWS', 'Kubernetes', 'Linux', 'DevOps'],
    highlight: true,
    flow: [
      { id: 'app', label: 'App', hint: 'driver' },
      { id: 'm', label: 'Mongo :27017', hint: 'wire' },
      { id: 'rs', label: 'Replica set', hint: 'election' },
    ],
  },
}

function defaultEntry(row) {
  const categoryId = categoryIdFromLabel(row.category)
  const { port, service, protocol } = row
  const short = service.split(/[\s/]/)[0]
  return {
    id: `p-${port}`,
    port,
    service,
    protocol,
    categoryId,
    description: `${service} — typical use of port ${port} (${protocol}).`,
    useCaseLabel: short.length > 18 ? service.slice(0, 16) + '…' : short,
    detail: `${service} listens on ${port}/${protocol}. Verify listeners with ss or netstat, and align security groups or firewalls with least privilege.`,
    realWorld: `Seen in troubleshooting, interviews, and architecture reviews: pairing the right ${protocol} expectation with ${port} avoids false positives in scans and monitoring.`,
    commands: [`nc -vz 127.0.0.1 ${port}`, `ss -lunpt | grep :${port}`],
    contextBadges: ['Linux', 'DevOps'],
    flow: [
      { id: 'c', label: 'Client', hint: 'init' },
      { id: 'p', label: `${service} :${port}`, hint: protocol },
      { id: 'l', label: 'Listener', hint: 'bind' },
      { id: 'r', label: 'Done', hint: 'response' },
    ],
  }
}

function mergeEntry(row) {
  const base = defaultEntry(row)
  const o = OVERRIDES[row.port]
  if (!o) return base
  return {
    ...base,
    ...o,
    id: base.id,
    port: base.port,
    service: base.service,
    protocol: base.protocol,
    categoryId: base.categoryId,
    flow: o.flow ?? base.flow,
    commands: o.commands ?? base.commands,
    contextBadges: o.contextBadges ?? base.contextBadges,
  }
}

/**
 * @type {Array<{
 *   id: string
 *   port: number
 *   service: string
 *   protocol: string
 *   categoryId: string
 *   description: string
 *   useCaseLabel: string
 *   detail: string
 *   realWorld: string
 *   commands: string[]
 *   contextBadges: ContextBadge[]
 *   flow: PortFlowNode[]
 *   highlight?: boolean
 * }>}
 */
export const PORTS = RAW_PORTS.map(mergeEntry).sort((a, b) => a.port - b.port)

/** @param {number} portNum */
export function getPortEntryByNumber(portNum) {
  return PORTS.find((p) => p.port === portNum)
}

export function categoryLabelForPort(categoryId) {
  const c = PORT_FILTER_CATEGORIES.find((x) => x.id === categoryId)
  return c?.label ?? categoryId
}

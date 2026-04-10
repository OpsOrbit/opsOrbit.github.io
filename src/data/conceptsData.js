/**
 * Beginner-friendly visual concepts for the Concepts workspace.
 * @typedef {{ id: string, label: string, hint?: string }} FlowNode
 */

/** @type {{ id: string, label: string }[]} */
export const CONCEPT_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'networking', label: 'Networking' },
  { id: 'security', label: 'Security' },
  { id: 'backend', label: 'Backend' },
  { id: 'devops', label: 'DevOps' },
  { id: 'cloud', label: 'Cloud' },
]

export const CONCEPT_CATEGORY_IDS = new Set(
  CONCEPT_CATEGORIES.filter((c) => c.id !== 'all').map((c) => c.id)
)

/** @type {Array<{ id: string, title: string, icon: string, categoryId: string, summary: string[], flow: FlowNode[] }>} */
export const CONCEPTS = [
  {
    id: 'dns',
    title: 'DNS',
    icon: '🌐',
    categoryId: 'networking',
    summary: [
      'DNS turns human-readable names (like api.example.com) into IP addresses so computers can connect.',
      'Your browser asks resolvers and authoritative servers in sequence until it gets the right answer.',
      'Caching at many layers makes repeat lookups fast.',
    ],
    flow: [
      { id: 'u', label: 'You', hint: 'type a hostname' },
      { id: 'b', label: 'Browser / OS', hint: 'stub resolver' },
      { id: 'r', label: 'Recursive resolver', hint: 'ISP / 1.1.1.1' },
      { id: 't', label: 'TLD server', hint: '.com, .org' },
      { id: 'a', label: 'Authoritative DNS', hint: 'zone records' },
      { id: 'ip', label: 'IP address', hint: 'back to client' },
    ],
  },
  {
    id: 'ssl-tls',
    title: 'SSL / TLS',
    icon: '🔐',
    categoryId: 'security',
    summary: [
      'TLS (often called SSL) encrypts data between client and server and proves you reached the real site.',
      'Certificates chain from your domain up to a trusted root that browsers already know.',
      'The handshake exchanges keys so eavesdroppers cannot read traffic.',
    ],
    flow: [
      { id: 'c', label: 'Client', hint: 'Hello + cipher suites' },
      { id: 'cert', label: 'Server certificate', hint: 'public key + chain' },
      { id: 'v', label: 'Verify chain', hint: 'trust store' },
      { id: 'k', label: 'Key exchange', hint: 'shared secret' },
      { id: 'e', label: 'Encrypted session', hint: 'HTTP inside TLS' },
    ],
  },
  {
    id: 'http-vs-https',
    title: 'HTTP vs HTTPS',
    icon: '↔️',
    categoryId: 'security',
    summary: [
      'HTTP sends plain text; anyone on the path can read or change it.',
      'HTTPS is HTTP wrapped in TLS — same verbs and status codes, but encrypted and integrity-checked.',
      'Always use HTTPS for login, APIs, and anything sensitive.',
    ],
    flow: [
      { id: 'http', label: 'HTTP', hint: 'port 80, visible' },
      { id: 'tls', label: 'TLS layer', hint: 'optional upgrade' },
      { id: 'https', label: 'HTTPS', hint: 'port 443 default' },
      { id: 'app', label: 'Your app data', hint: 'private on the wire' },
    ],
  },
  {
    id: 'load-balancer',
    title: 'Load balancer',
    icon: '⚖️',
    categoryId: 'networking',
    summary: [
      'A load balancer spreads traffic across many healthy backends so one server never carries everything.',
      'It can terminate TLS, route by path or host, and health-check instances.',
      'Common algorithms: round-robin, least connections, sticky sessions.',
    ],
    flow: [
      { id: 'u', label: 'Clients', hint: 'many requests' },
      { id: 'lb', label: 'Load balancer', hint: 'VIP / DNS name' },
      { id: 'h', label: 'Health checks', hint: 'drop bad nodes' },
      { id: 'b1', label: 'Backend 1', hint: 'AZ-a' },
      { id: 'b2', label: 'Backend 2', hint: 'AZ-b' },
      { id: 'b3', label: 'Backend n', hint: 'scale out' },
    ],
  },
  {
    id: 'cdn',
    title: 'CDN (e.g. CloudFront)',
    icon: '📡',
    categoryId: 'cloud',
    summary: [
      'A CDN caches static assets at edge locations near users to cut latency and origin load.',
      'DNS or HTTP routing sends users to the nearest PoP; misses fetch from origin once.',
      'Great for images, JS/CSS, video — and sometimes dynamic acceleration.',
    ],
    flow: [
      { id: 'u', label: 'User', hint: 'request asset' },
      { id: 'dns', label: 'DNS → CNAME', hint: 'CDN hostname' },
      { id: 'edge', label: 'Edge PoP', hint: 'nearest cache' },
      { id: 'hit', label: 'Cache hit?', hint: 'if yes → fast' },
      { id: 'o', label: 'Origin (S3/API)', hint: 'on miss' },
      { id: 'r', label: 'Response', hint: 'cached at edge' },
    ],
  },
  {
    id: 'api',
    title: 'API (front → back)',
    icon: '🔌',
    categoryId: 'backend',
    summary: [
      'The frontend calls your backend over HTTP (often REST or GraphQL) using URLs, verbs, JSON bodies.',
      'The server validates input, runs business logic, talks to DB/cache, returns JSON + status codes.',
      'Contracts (OpenAPI, schema) keep teams aligned.',
    ],
    flow: [
      { id: 'ui', label: 'Browser / app', hint: 'UI event' },
      { id: 'req', label: 'HTTP request', hint: 'JSON + auth header' },
      { id: 'api', label: 'API gateway / app', hint: 'routes + auth' },
      { id: 'svc', label: 'Services', hint: 'domain logic' },
      { id: 'db', label: 'DB / cache', hint: 'persistence' },
      { id: 'res', label: 'JSON response', hint: 'render UI' },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    icon: '🪪',
    categoryId: 'security',
    summary: [
      'Login proves who you are (password, SSO, WebAuthn). Authorization decides what you may do.',
      'JWTs are signed tokens listing claims; OAuth delegates login to Google/GitHub with consent.',
      'Never put secrets in the JWT payload without encryption — verify signatures server-side.',
    ],
    flow: [
      { id: 'u', label: 'User', hint: 'Sign in with IdP' },
      { id: 'idp', label: 'Identity provider', hint: 'OAuth / OIDC' },
      { id: 'code', label: 'Auth code / token', hint: 'redirect' },
      { id: 'app', label: 'Your app', hint: 'exchange + session' },
      { id: 'jwt', label: 'JWT / session cookie', hint: 'subsequent calls' },
      { id: 'api', label: 'Protected API', hint: 'validate token' },
    ],
  },
  {
    id: 'database-connection',
    title: 'Database connection flow',
    icon: '🗄️',
    categoryId: 'backend',
    summary: [
      'The app opens a pool of connections to the DB host on a port (e.g. 5432) with credentials.',
      'Drivers send SQL; the server parses, plans, executes, returns rows or errors.',
      'Connection pooling avoids opening a new TCP+auth for every request.',
    ],
    flow: [
      { id: 'app', label: 'Application', hint: 'ORM / driver' },
      { id: 'pool', label: 'Connection pool', hint: 'reuse' },
      { id: 'tcp', label: 'TCP to DB host', hint: 'TLS optional' },
      { id: 'auth', label: 'Auth + DB name', hint: 'role' },
      { id: 'q', label: 'SQL execute', hint: 'plan + run' },
      { id: 'rows', label: 'Rows / OK', hint: 'to app' },
    ],
  },
  {
    id: 'cicd',
    title: 'DevOps CI/CD flow',
    icon: '🔄',
    categoryId: 'devops',
    summary: [
      'CI builds and tests every change automatically so bugs surface before merge.',
      'CD deploys proven artifacts to staging/production with gates and rollbacks.',
      'Pipelines are code (YAML): triggers → stages → approvals → deploy.',
    ],
    flow: [
      { id: 'git', label: 'Git push / PR', hint: 'trigger' },
      { id: 'ci', label: 'CI pipeline', hint: 'build + test' },
      { id: 'art', label: 'Artifact', hint: 'image / jar' },
      { id: 'gate', label: 'Quality gate', hint: 'policy / scan' },
      { id: 'cd', label: 'CD pipeline', hint: 'env promotion' },
      { id: 'run', label: 'Running workload', hint: 'observe' },
    ],
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud architecture basics',
    icon: '☁️',
    categoryId: 'cloud',
    summary: [
      'Regions are geographic areas; AZs are isolated datacenters inside them for resilience.',
      'VPC/VNet gives private networking; subnets, routes, and security groups control traffic.',
      'Managed services (LB, DB, queues) reduce ops — you configure, the provider runs the rest.',
    ],
    flow: [
      { id: 'u', label: 'Users / clients', hint: 'internet' },
      { id: 'edge', label: 'Edge / WAF', hint: 'DDoS + rules' },
      { id: 'lb', label: 'Load balancer', hint: 'public tier' },
      { id: 'app', label: 'App tier', hint: 'private subnet' },
      { id: 'data', label: 'Data tier', hint: 'RDS / cache' },
      { id: 'obs', label: 'Logs & metrics', hint: 'cross-cutting' },
    ],
  },
]

/** Order for Quick Learn guided mode */
export const QUICK_LEARN_IDS = CONCEPTS.map((c) => c.id)

export function categoryLabelForConcept(categoryId) {
  const c = CONCEPT_CATEGORIES.find((x) => x.id === categoryId)
  return c?.label ?? categoryId
}

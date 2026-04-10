/**
 * Visual architecture reference cards — diagrams rendered in ArchitectureDiagrams.jsx
 */

export const ARCHITECTURE_IDS = new Set(['aws-three-tier', 'cicd-pipeline', 'kubernetes-cluster', 'microservices'])

/** Canonical web request path (education strip) */
export const CANONICAL_REQUEST_FLOW = ['User', 'DNS', 'CDN', 'LB', 'App', 'DB']

/**
 * @typedef {{
 *   id: string
 *   title: string
 *   shortDescription: string
 *   diagramKey: 'aws-three-tier' | 'cicd-pipeline' | 'kubernetes-cluster' | 'microservices'
 *   components: { label: string, title: string, description: string }[]
 * }} ArchitectureItem
 */

/** @type {ArchitectureItem[]} */
export const ARCHITECTURES = [
  {
    id: 'aws-three-tier',
    title: 'AWS 3-Tier Architecture',
    shortDescription: 'Internet-facing load balancer, stateless app tier in multiple AZs, and managed relational data.',
    diagramKey: 'aws-three-tier',
    components: [
      {
        label: 'Load Balancer',
        title: 'Application Load Balancer (ALB)',
        description:
          'Terminates TLS, spreads HTTP(S) across healthy targets in private subnets, and performs health checks so bad instances are removed from rotation.',
      },
      {
        label: 'App Layer',
        title: 'Auto Scaling + EC2 / containers',
        description:
          'Stateless web or API servers scale horizontally. Session data lives outside the instance (cache or sticky sessions at the LB). Deployments roll out via new AMIs or blue/green.',
      },
      {
        label: 'Database',
        title: 'Amazon RDS (Multi-AZ)',
        description:
          'Managed relational store with synchronous standby in another AZ for failover. Backups and patching are automated; app tier connects only from allowed security groups.',
      },
    ],
  },
  {
    id: 'cicd-pipeline',
    title: 'CI/CD Pipeline',
    shortDescription: 'From commit to production: build, test, security gates, and progressive delivery.',
    diagramKey: 'cicd-pipeline',
    components: [
      {
        label: 'Load Balancer',
        title: 'Ingress / deployment routing',
        description:
          'In delivery terms, “traffic shaping” is often an API gateway or load balancer in front of canary/blue-green targets so new versions receive a slice of real traffic safely.',
      },
      {
        label: 'App Layer',
        title: 'Build & runtime artifacts',
        description:
          'CI compiles, runs unit tests, and produces immutable artifacts (images, bundles). CD promotes those artifacts across environments with approvals and environment-specific config.',
      },
      {
        label: 'Database',
        title: 'Schema & data migrations',
        description:
          'Migrations run in a controlled order (often backward-compatible first). Secrets for DB URLs never live in the repo — they are injected from a vault or CI/CD secrets store.',
      },
    ],
  },
  {
    id: 'kubernetes-cluster',
    title: 'Kubernetes Architecture',
    shortDescription: 'Control plane coordination, worker nodes running Pods, and declarative networking.',
    diagramKey: 'kubernetes-cluster',
    components: [
      {
        label: 'Load Balancer',
        title: 'Ingress / cloud LB',
        description:
          'Routes external traffic to Services inside the cluster. Often paired with cert-manager for TLS and external-dns for DNS records pointing at the load balancer.',
      },
      {
        label: 'App Layer',
        title: 'Pods & Deployments',
        description:
          'Your workloads run as Pods scheduled on worker nodes. Deployments manage ReplicaSets for rolling updates; probes define readiness and liveness for traffic and restarts.',
      },
      {
        label: 'Database',
        title: 'Stateful workloads / external data',
        description:
          'StatefulSets or operators run data stores in-cluster, or you connect to managed RDS outside the cluster. PersistentVolumes abstract disk; network policies restrict who can talk to the DB.',
      },
    ],
  },
  {
    id: 'microservices',
    title: 'Microservices',
    shortDescription: 'Independent services behind a gateway, async events, and polyglot persistence.',
    diagramKey: 'microservices',
    components: [
      {
        label: 'Load Balancer',
        title: 'API Gateway / edge',
        description:
          'Single entry for clients: authentication, rate limits, and routing to the right service. Offloads cross-cutting concerns so individual services stay small.',
      },
      {
        label: 'App Layer',
        title: 'Domain services',
        description:
          'Each service owns a bounded context and deploys independently. They communicate over HTTP/gRPC or message buses; shared libraries are minimized to avoid coupling.',
      },
      {
        label: 'Database',
        title: 'Database per service',
        description:
          'Each service prefers its own datastore schema or instance so teams can evolve schema without blocking others. Eventual consistency is handled via events and sagas.',
      },
    ],
  },
]

export function getArchitectureById(id) {
  return ARCHITECTURES.find((a) => a.id === id)
}

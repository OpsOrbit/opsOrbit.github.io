const ROADMAP_LANES = [
  {
    id: 'linux',
    title: '1) Linux (Core Foundation)',
    tools: 'Linux',
    topics: ['File system and hierarchy', 'Permissions (chmod/chown/ACL)', 'Process management', 'System services (systemctl)', 'Networking basics', 'Disk and memory management', 'Logs analysis', 'Shell scripting'],
  },
  { id: 'git', title: '2) Version Control', tools: 'Git', topics: ['Git workflow', 'Branching strategies', 'Merge vs rebase', 'Conflict resolution', 'Tagging and releases', 'Git hooks'] },
  { id: 'build', title: '3) Build Tools', tools: 'Maven, Gradle', topics: ['Build lifecycle', 'Dependency management', 'Plugins', 'Artifact packaging'] },
  {
    id: 'cicd',
    title: '4) CI/CD',
    tools: 'Jenkins, GitLab CI',
    topics: ['Pipeline creation', 'Declarative vs scripted', 'Stages and jobs', 'Artifact handling', 'Parameterized builds', 'Shared libraries', 'Pipeline optimization', 'Secrets handling'],
  },
  {
    id: 'docker',
    title: '5) Containerization',
    tools: 'Docker',
    topics: ['Docker architecture', 'Dockerfile', 'Image lifecycle', 'Volumes', 'Networking', 'Multi-stage builds', 'Docker Compose', 'Image optimization'],
  },
  {
    id: 'k8s',
    title: '6) Container Orchestration',
    tools: 'Kubernetes',
    topics: ['Cluster architecture', 'Pods / ReplicaSets / Deployments', 'Services', 'Ingress', 'ConfigMaps and Secrets', 'Namespaces', 'Resource limits', 'Rolling updates / rollback', 'Autoscaling', 'Troubleshooting'],
  },
  { id: 'helm', title: '7) Package Management (K8s)', tools: 'Helm', topics: ['Chart structure', 'values.yaml', 'Templates', 'Releases', 'Chart versioning', 'Reusability'] },
  {
    id: 'iac',
    title: '8) Infrastructure as Code',
    tools: 'Terraform, Ansible',
    topics: ['Terraform providers/resources/variables/modules', 'State management and remote backend', 'Ansible playbooks and inventory', 'Roles', 'Templates (Jinja2)', 'Handlers', 'Idempotency'],
  },
  {
    id: 'monitoring',
    title: '9) Monitoring and Logging',
    tools: 'Prometheus, Grafana, ELK',
    topics: ['Metrics collection', 'Exporters', 'Alerting', 'Dashboards', 'Log aggregation', 'Log parsing', 'Centralized logging'],
  },
  {
    id: 'security',
    title: '10) Security / DevSecOps',
    tools: 'OWASP Top 10',
    topics: ['SAST', 'DAST', 'Dependency scanning', 'Container security', 'Secrets management', 'IAM concepts', 'Secure coding practices', 'Vulnerability management'],
  },
  {
    id: 'app-servers',
    title: '11) Application Servers',
    tools: 'Nginx, Apache HTTP Server, Tomcat',
    topics: ['Reverse proxy', 'Load balancing', 'SSL/TLS', 'Virtual hosts', 'Caching', 'WAR deployment', 'Server configuration', 'Thread tuning', 'Logs'],
  },
  { id: 'artifacts', title: '12) Artifact Management', tools: 'Nexus, Artifactory', topics: ['Repository types', 'Artifact versioning', 'Access control', 'Storage management'] },
  { id: 'networking', title: '13) Networking (DevOps Level)', tools: 'Core networking', topics: ['DNS', 'HTTP/HTTPS', 'SSL/TLS', 'Load balancing concepts', 'Reverse proxy', 'Ports and protocols'] },
  { id: 'gitops', title: '14) GitOps and CD', tools: 'Argo CD', topics: ['GitOps principles', 'Declarative deployments', 'Sync strategies', 'Rollbacks'] },
  { id: 'testing', title: '15) Testing in DevOps', tools: 'Testing stack', topics: ['Unit testing', 'Integration testing', 'API testing', 'Performance testing', 'Automation testing'] },
  { id: 'scripting', title: '16) Scripting', tools: 'Bash, Python', topics: ['Bash scripting', 'Python basics', 'Automation scripts', 'API calls'] },
  { id: 'queues', title: '17) Message Queues', tools: 'Kafka, RabbitMQ', topics: ['Pub/Sub', 'Event-driven systems'] },
  {
    id: 'practices',
    title: '18) DevOps Practices',
    tools: 'Release operations',
    topics: ['CI/CD design', 'Blue-Green deployment', 'Canary deployment', 'Rollback strategies', 'High availability', 'Disaster recovery'],
  },
]

const FINAL_ORDER = [
  'Linux → Git',
  'Build Tools → CI/CD',
  'Docker → Kubernetes → Helm',
  'Terraform → Ansible',
  'Monitoring → Security',
  'Application Servers',
  'GitOps → Advanced practices',
]

function LaneCard({ lane, idx }) {
  return (
    <article
      className="relative min-w-[280px] rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 shadow-[var(--hub-shadow-card)]"
    >
      <h3 className="text-[12px] font-bold uppercase tracking-wide text-[var(--hub-tool)]">{lane.title}</h3>
      <p className="mt-1 text-[11px] font-semibold text-[var(--hub-muted)]">{lane.tools}</p>
      <ol className="mt-3 list-disc space-y-1.5 pl-4 text-[12px] leading-relaxed text-[var(--hub-sub)]">
        {lane.topics.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
      <span className="mt-3 inline-flex rounded-md border border-[var(--hub-border2)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
        Module {idx + 1}
      </span>
    </article>
  )
}

export default function RoadmapFlow() {
  return (
    <section className="space-y-4 pb-8">
      <header className="rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 sm:p-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--hub-tool)]">Roadmap</p>
        <p className="mt-1 text-[14px] leading-relaxed text-[var(--hub-sub)]">
          Tool-by-tool topics to cover. Complete module 1 to 18, then follow the final learning order.
        </p>
      </header>

      <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
        <div className="min-w-[5200px]">
          <div className="grid grid-cols-18 gap-3">
            {ROADMAP_LANES.map((lane, idx) => (
              <LaneCard key={lane.id} lane={lane} idx={idx} />
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 sm:p-5">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--hub-tool)]">Final learning order</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-[var(--hub-sub)]">
          {FINAL_ORDER.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>
    </section>
  )
}


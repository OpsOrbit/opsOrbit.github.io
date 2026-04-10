/**
 * Compact SVG diagrams for architecture modals — stroke uses currentColor for theme contrast.
 */
export function DiagramAwsThreeTier({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="8" width="464" height="204" rx="12" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <text x="24" y="32" fill="currentColor" className="text-[11px] font-bold" opacity="0.8">
        Internet
      </text>
      <rect x="160" y="48" width="160" height="44" rx="8" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      <text x="240" y="74" textAnchor="middle" fill="currentColor" className="text-[12px] font-bold" opacity="0.95">
        ALB
      </text>
      <path d="M240 92v16" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="48" y="124" width="160" height="72" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" />
      <text x="128" y="152" textAnchor="middle" fill="currentColor" className="text-[10px] font-semibold" opacity="0.85">
        AZ-a
      </text>
      <rect x="64" y="160" width="56" height="28" rx="4" fill="currentColor" opacity="0.15" />
      <text x="92" y="178" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.9">
        EC2
      </text>
      <rect x="136" y="160" width="56" height="28" rx="4" fill="currentColor" opacity="0.15" />
      <text x="164" y="178" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.9">
        EC2
      </text>
      <rect x="272" y="124" width="160" height="72" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" />
      <text x="352" y="152" textAnchor="middle" fill="currentColor" className="text-[10px] font-semibold" opacity="0.85">
        AZ-b
      </text>
      <rect x="288" y="160" width="56" height="28" rx="4" fill="currentColor" opacity="0.15" />
      <text x="316" y="178" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.9">
        EC2
      </text>
      <rect x="360" y="160" width="56" height="28" rx="4" fill="currentColor" opacity="0.15" />
      <text x="388" y="178" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.9">
        EC2
      </text>
      <path d="M240 196v12" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="168" y="208" width="144" height="36" rx="8" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.2" />
      <text x="240" y="230" textAnchor="middle" fill="currentColor" className="text-[11px] font-bold" opacity="0.95">
        RDS Multi-AZ
      </text>
    </svg>
  )
}

export function DiagramCicd({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="8" y="28" width="88" height="44" rx="8" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
      <text x="52" y="54" textAnchor="middle" fill="currentColor" className="text-[11px] font-bold" opacity="0.9">
        Git
      </text>
      <path d="M96 50h32" stroke="currentColor" strokeWidth="2" markerEnd="url(#arch-cicd-arr)" opacity="0.55" />
      <rect x="136" y="28" width="88" height="44" rx="8" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
      <text x="180" y="54" textAnchor="middle" fill="currentColor" className="text-[11px] font-bold" opacity="0.9">
        CI Build
      </text>
      <path d="M224 50h32" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <rect x="264" y="28" width="88" height="44" rx="8" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
      <text x="308" y="54" textAnchor="middle" fill="currentColor" className="text-[11px] font-bold" opacity="0.9">
        Test
      </text>
      <path d="M352 50h32" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <rect x="392" y="28" width="80" height="44" rx="8" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.2" />
      <text x="432" y="54" textAnchor="middle" fill="currentColor" className="text-[10px] font-bold" opacity="0.9">
        Artifact
      </text>
      <path d="M432 72v28" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <rect x="320" y="108" width="200" height="72" rx="10" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" />
      <text x="420" y="132" textAnchor="middle" fill="currentColor" className="text-[10px] font-semibold" opacity="0.8">
        Deploy
      </text>
      <rect x="340" y="142" width="72" height="28" rx="6" fill="currentColor" opacity="0.12" />
      <text x="376" y="160" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.85">
        staging
      </text>
      <rect x="428" y="142" width="72" height="28" rx="6" fill="currentColor" opacity="0.15" />
      <text x="464" y="160" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.85">
        prod
      </text>
      <defs>
        <marker id="arch-cicd-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>
    </svg>
  )
}

export function DiagramKubernetes({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 480 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="12" y="12" width="456" height="80" rx="10" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
      <text x="28" y="36" fill="currentColor" className="text-[10px] font-bold uppercase tracking-wide" opacity="0.7">
        Control plane
      </text>
      <rect x="32" y="48" width="72" height="32" rx="6" fill="currentColor" opacity="0.12" />
      <text x="68" y="68" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.9">
        API
      </text>
      <rect x="116" y="48" width="72" height="32" rx="6" fill="currentColor" opacity="0.12" />
      <text x="152" y="68" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.9">
        etcd
      </text>
      <rect x="200" y="48" width="72" height="32" rx="6" fill="currentColor" opacity="0.12" />
      <text x="236" y="68" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.9">
        sched
      </text>
      <rect x="12" y="108" width="456" height="100" rx="10" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" />
      <text x="28" y="132" fill="currentColor" className="text-[10px] font-bold uppercase tracking-wide" opacity="0.7">
        Worker nodes
      </text>
      <rect x="40" y="148" width="120" height="48" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="100" y="168" textAnchor="middle" fill="currentColor" className="text-[9px] font-semibold" opacity="0.85">
        Node 1
      </text>
      <rect x="56" y="176" width="36" height="14" rx="3" fill="currentColor" opacity="0.2" />
      <text x="74" y="186" textAnchor="middle" fill="currentColor" className="text-[8px]" opacity="0.9">
        Pod
      </text>
      <rect x="180" y="148" width="120" height="48" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="240" y="168" textAnchor="middle" fill="currentColor" className="text-[9px] font-semibold" opacity="0.85">
        Node 2
      </text>
      <rect x="196" y="176" width="36" height="14" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="320" y="148" width="120" height="48" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="380" y="168" textAnchor="middle" fill="currentColor" className="text-[9px] font-semibold" opacity="0.85">
        Node 3
      </text>
      <rect x="336" y="176" width="36" height="14" rx="3" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

export function DiagramMicroservices({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="180" y="16" width="120" height="40" rx="8" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.2" />
      <text x="240" y="40" textAnchor="middle" fill="currentColor" className="text-[11px] font-bold" opacity="0.95">
        API Gateway
      </text>
      <path d="M240 56v20" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <path d="M240 76 L120 100 M240 76 L240 100 M240 76 L360 100" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <rect x="56" y="104" width="96" height="40" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="104" y="128" textAnchor="middle" fill="currentColor" className="text-[10px] font-bold" opacity="0.9">
        Orders
      </text>
      <rect x="192" y="104" width="96" height="40" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="240" y="128" textAnchor="middle" fill="currentColor" className="text-[10px] font-bold" opacity="0.9">
        Users
      </text>
      <rect x="328" y="104" width="96" height="40" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
      <text x="376" y="128" textAnchor="middle" fill="currentColor" className="text-[10px] font-bold" opacity="0.9">
        Billing
      </text>
      <path d="M104 144v12" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M240 144v12" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M376 144v12" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <rect x="64" y="160" width="80" height="28" rx="6" fill="currentColor" opacity="0.12" />
      <text x="104" y="178" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.85">
        DB
      </text>
      <rect x="200" y="160" width="80" height="28" rx="6" fill="currentColor" opacity="0.12" />
      <text x="240" y="178" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.85">
        DB
      </text>
      <rect x="336" y="160" width="80" height="28" rx="6" fill="currentColor" opacity="0.12" />
      <text x="376" y="178" textAnchor="middle" fill="currentColor" className="text-[9px]" opacity="0.85">
        DB
      </text>
    </svg>
  )
}

const MAP = {
  'aws-three-tier': DiagramAwsThreeTier,
  'cicd-pipeline': DiagramCicd,
  'kubernetes-cluster': DiagramKubernetes,
  microservices: DiagramMicroservices,
}

export function ArchitectureDiagram({ diagramKey, className = '' }) {
  const Cmp = MAP[diagramKey] || DiagramAwsThreeTier
  return <Cmp className={`w-full max-w-full text-[var(--hub-text)] ${className}`} />
}

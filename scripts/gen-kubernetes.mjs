import fs from 'fs'

const outPath = new URL('../src/data/kubernetesCommands.js', import.meta.url).pathname

const LEGACY_IDS = new Map([
  ['kubectl get pods -A', 'k8s-get-pods'],
  ['kubectl get all -n <namespace>', 'k8s-get-all'],
  ['kubectl describe pod <name> -n <ns>', 'k8s-describe'],
  ['kubectl logs -f <pod> -n <ns>', 'k8s-logs'],
  ['kubectl exec -it <pod> -n <ns> -- /bin/sh', 'k8s-exec'],
  ['kubectl apply -f manifest.yaml', 'k8s-apply'],
  ['kubectl delete -f manifest.yaml', 'k8s-delete'],
  ['kubectl get namespaces', 'k8s-namespaces'],
  ['kubectl config get-contexts', 'k8s-context'],
  ['kubectl scale deployment <name> --replicas=5 -n <ns>', 'k8s-scale'],
  ['kubectl rollout status deployment/<name> -n <ns>', 'k8s-rollout'],
  ['kubectl port-forward pod/<name> 8080:80 -n <ns>', 'k8s-port-forward'],
  ['kubectl get events -n <ns> --sort-by=.lastTimestamp', 'k8s-get-events'],
  ['kubectl top pods -n <ns>', 'k8s-top'],
  ['kubectl drain <node> --ignore-daemonsets', 'k8s-cordon'],
  ['kubectl create secret generic mysecret --from-literal=key=value', 'k8s-secrets'],
  ['kubectl create configmap myconfig --from-file=app.conf', 'k8s-configmap'],
  ['kubectl get pod <name> -n <ns> -o yaml', 'k8s-get-yaml'],
])

function makeId(cmd) {
  const norm = cmd.trim().replace(/\s+/g, ' ')
  if (LEGACY_IDS.has(norm)) return LEGACY_IDS.get(norm)
  let slug = norm
    .replace(/^kubectl\s+/i, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._/:=-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  let id = `k8s-${slug || 'cmd'}`
  if (id.length > 80) id = id.slice(0, 80).replace(/-$/, '')
  return id
}

const rows = []
function add(category, level, name, command, description, explanation) {
  rows.push({ category, level, name, command, description, explanation })
}

/* Cluster Info */
add('Cluster Info', 'beginner', 'kubectl version', 'kubectl version --client', 'Client version; add <code>--output=yaml</code> for server.', 'Diagnose client/server skew.')
add('Cluster Info', 'beginner', 'Cluster info', 'kubectl cluster-info', 'Control plane URL and coreDNS addon endpoint.', 'Start here for “is the cluster up?”')
add('Cluster Info', 'intermediate', 'View kubeconfig', 'kubectl config view', 'Print merged kubeconfig (redacts secrets by default).', 'Use <code>--minify --raw</code> carefully for tokens.')
add('Cluster Info', 'beginner', 'List contexts', 'kubectl config get-contexts', 'All contexts with current marker.', 'Pair with <code>use-context</code>.')
add('Cluster Info', 'beginner', 'Switch context', 'kubectl config use-context my-context', 'Set active cluster/user/namespace tuple.', 'Updates current-context in kubeconfig.')
add('Cluster Info', 'beginner', 'Current context', 'kubectl config current-context', 'Print active context name.', 'Handy for shell prompts and scripts.')
add('Cluster Info', 'intermediate', 'Set context details', 'kubectl config set-context --current --namespace=dev', 'Attach default namespace to current context.', 'Avoids typing <code>-n</code> every command.')
add('Cluster Info', 'intermediate', 'Delete context', 'kubectl config delete-context old-cluster', 'Remove context entry from kubeconfig.', 'Does not delete cluster itself.')

/* Resources */
add('Resources', 'beginner', 'List pods', 'kubectl get pods', 'Pods in current or default namespace.', 'Add <code>-A</code> all namespaces; <code>-o wide</code> for node/IP.')
add('Resources', 'beginner', 'List pods (all NS)', 'kubectl get pods -A', 'Every pod in the cluster (namespaced view).', 'Heavy on large clusters; use labels to narrow.')
add('Resources', 'beginner', 'List nodes', 'kubectl get nodes', 'Cluster nodes and readiness.', '<code>-o wide</code> shows versions and IPs.')
add('Resources', 'beginner', 'List services', 'kubectl get svc', 'Services in namespace.', 'ClusterIP, NodePort, LoadBalancer types.')
add('Resources', 'beginner', 'List deployments', 'kubectl get deploy', 'Deployment desired vs ready replicas.', 'Watch rollout with <code>rollout status</code>.')
add('Resources', 'beginner', 'List common resources', 'kubectl get all -n <namespace>', 'Pods, svc, deployments, replicasets in namespace.', 'Does not include ingress, configmaps, etc.')
add('Resources', 'beginner', 'List namespaces', 'kubectl get ns', 'All namespaces.', 'Short alias <code>ns</code> for namespace.')
add('Resources', 'intermediate', 'List events', 'kubectl get events -n <ns> --sort-by=.lastTimestamp', 'Recent events (scheduling, pulls, probes).', 'Debug pending/failing pods.')
add('Resources', 'intermediate', 'List ingress', 'kubectl get ingress', 'HTTP routing rules per namespace.', 'Requires ingress controller installed.')
add('Resources', 'intermediate', 'List ConfigMaps', 'kubectl get configmap', 'Non-sensitive config objects.', 'Use <code>describe</code> or <code>get -o yaml</code> for data keys.')
add('Resources', 'intermediate', 'List secrets', 'kubectl get secret', 'Secret names and types (values base64 in YAML).', 'Avoid echoing raw secrets in logs.')
add('Resources', 'beginner', 'Describe pod', 'kubectl describe pod <name> -n <ns>', 'Events, conditions, volumes, probes.', 'First step when pod not Running.')
add('Resources', 'intermediate', 'Describe node', 'kubectl describe node <name>', 'Capacity, allocatable, taints, conditions.', 'Debug scheduling and pressure.')
add('Resources', 'intermediate', 'Describe service', 'kubectl describe svc <name>', 'Selector, endpoints, ports.', 'See if endpoints are empty (no ready pods).')
add('Resources', 'intermediate', 'Describe deployment', 'kubectl describe deploy <name>', 'ReplicaSets, strategy, events.', 'Useful during rollouts.')

/* Create / Apply */
add('Create / Apply', 'intermediate', 'Create resource', 'kubectl create deployment web --image=nginx', 'Imperative create for quick tests.', 'Prefer YAML + <code>apply</code> for production.')
add('Create / Apply', 'intermediate', 'Create from file', 'kubectl create -f manifest.yaml', 'Create resources; fails if already exists.', 'Use <code>apply</code> for idempotent workflows.')
add('Create / Apply', 'beginner', 'Apply manifest', 'kubectl apply -f manifest.yaml', 'Declarative create/update.', 'Server-side apply available in newer clusters.')
add('Create / Apply', 'intermediate', 'Kustomize apply', 'kubectl apply -k overlays/prod/', 'Apply kustomization directory.', 'Builds manifest set before apply.')
add('Create / Apply', 'advanced', 'Replace resource', 'kubectl replace -f manifest.yaml', 'Replace existing object from file.', 'Stricter than apply; can cause recreate in some cases.')
add('Create / Apply', 'intermediate', 'Patch resource', 'kubectl patch deployment app -p \'{"spec":{"replicas":3}}\'', 'Merge patch or JSON patch inline.', 'Quick one-off changes; document in Git for real changes.')

/* Delete */
add('Delete', 'intermediate', 'Delete pod', 'kubectl delete pod <name> -n <ns>', 'Remove pod; controller may recreate.', 'Use for stuck terminating or test restarts.')
add('Delete', 'intermediate', 'Delete from file', 'kubectl delete -f manifest.yaml', 'Delete resources defined in manifest.', 'Same selectors as apply.')
add('Delete', 'advanced', 'Delete all namespaced resources', 'kubectl delete all --all -n <ns>', 'Remove most namespaced objects in namespace.', 'Very destructive—confirm namespace first.')
add('Delete', 'advanced', 'Delete namespace', 'kubectl delete ns <name>', 'Deletes namespace and everything inside.', 'Irreversible; propagation can take time.')

/* Logs & Exec */
add('Logs & Exec', 'beginner', 'Pod logs', 'kubectl logs <pod> -n <ns>', 'Print logs from default container.', 'Add <code>-c</code> for sidecars.')
add('Logs & Exec', 'beginner', 'Follow logs', 'kubectl logs -f <pod> -n <ns>', 'Stream logs like tail -f.', 'Stop with Ctrl+C.')
add('Logs & Exec', 'intermediate', 'Container logs', 'kubectl logs <pod> -c sidecar -n <ns>', 'Logs from specific container.', 'Required when pod has multiple containers.')
add('Logs & Exec', 'beginner', 'Interactive exec', 'kubectl exec -it <pod> -n <ns> -- bash', 'Shell in pod (if image has bash).', 'Use <code>/bin/sh</code> on minimal images.')
add('Logs & Exec', 'intermediate', 'Exec command', 'kubectl exec <pod> -n <ns> -- ls /app', 'Non-interactive single command.', 'Good for health scripts.')
add('Logs & Exec', 'intermediate', 'Attach to process', 'kubectl attach <pod> -n <ns>', 'Attach to running container main process stdin/stdout.', 'Unlike exec, ties to PID 1.')
add('Logs & Exec', 'beginner', 'Port forward', 'kubectl port-forward pod/<name> 8080:80 -n <ns>', 'Local port to pod port.', 'Also works with <code>svc/</code> and <code>deploy/</code>.')

/* Scaling & Deployment */
add('Scaling & Deployment', 'intermediate', 'Scale deployment', 'kubectl scale deployment <app> --replicas=3 -n <ns>', 'Change desired replica count.', 'Immediate for Deployments; HPA may override.')
add('Scaling & Deployment', 'intermediate', 'Rollout status', 'kubectl rollout status deployment/<app> -n <ns>', 'Wait until rollout completes.', 'Exits non-zero on failure.')
add('Scaling & Deployment', 'intermediate', 'Rollout history', 'kubectl rollout history deployment/<app> -n <ns>', 'Revision list and change cause.', 'Pair with <code>undo</code>.')
add('Scaling & Deployment', 'intermediate', 'Rollout undo', 'kubectl rollout undo deployment/<app> -n <ns>', 'Rollback to previous revision.', 'Optional <code>--to-revision=N</code>.')
add('Scaling & Deployment', 'intermediate', 'Set image', 'kubectl set image deployment/<app> nginx=nginx:1.25 -n <ns>', 'Update container image on deployment.', 'Triggers rolling update.')
add('Scaling & Deployment', 'advanced', 'Autoscale', 'kubectl autoscale deployment <app> --min=2 --max=10 --cpu-percent=80 -n <ns>', 'Create HorizontalPodAutoscaler.', 'Requires metrics-server.')

/* Debug */
add('Debug', 'advanced', 'Node metrics', 'kubectl top node', 'CPU/memory from metrics-server.', 'Install metrics-server if missing.')
add('Debug', 'advanced', 'Pod metrics', 'kubectl top pod -n <ns>', 'Per-pod usage.', 'Sort: pipe to sort or use <code>--sort-by</code> where supported.')
add('Debug', 'intermediate', 'Explain resource', 'kubectl explain pod', 'OpenAPI field documentation.', 'Drill: <code>kubectl explain pod.spec.containers</code>.')
add('Debug', 'advanced', 'Ephemeral debug container', 'kubectl debug <pod> -it --image=busybox --target=app', 'Attach debug container to pod (1.23+).', 'Use when distroless images lack shell.')
add('Debug', 'intermediate', 'API resources', 'kubectl api-resources', 'List API kinds and short names.', 'Filter with <code>--api-group=apps</code>.')
add('Debug', 'intermediate', 'API versions', 'kubectl api-versions', 'Available API groups/versions.', 'Compatibility checks.')

/* Advanced */
add('Advanced', 'intermediate', 'Cordon node', 'kubectl cordon <node>', 'Mark node unschedulable.', 'No new pods; existing pods stay.')
add('Advanced', 'intermediate', 'Uncordon node', 'kubectl uncordon <node>', 'Allow scheduling again.', 'After maintenance complete.')
add('Advanced', 'advanced', 'Drain node', 'kubectl drain <node> --ignore-daemonsets', 'Evict workloads (respect PDBs).', 'Use <code>--force</code> only when necessary; cordon first.')
add('Advanced', 'advanced', 'Taint node', 'kubectl taint nodes <node> key=value:NoSchedule', 'Repel pods without matching toleration.', 'Common for dedicated/GPU nodes.')
add('Advanced', 'intermediate', 'Label node', 'kubectl label nodes <node> disk=ssd', 'Attach labels for scheduling.', 'Use <code>-</code> suffix to remove label key.')
add('Advanced', 'intermediate', 'Annotate resource', 'kubectl annotate pod <name> owner=team-a -n <ns>', 'Attach metadata non-identifying.', 'Used by tools and controllers.')
add('Advanced', 'intermediate', 'API proxy', 'kubectl proxy', 'Local server to Kubernetes API.', 'http://127.0.0.1:8001/ui legacy; prefer official dashboard.')
add('Advanced', 'intermediate', 'Copy to/from pod', 'kubectl cp <ns>/<pod>:/tmp/foo ./foo', 'Copy files like scp.', 'Requires tar in container for some implementations.')
add('Advanced', 'intermediate', 'Auth can-i', 'kubectl auth can-i create deployments', 'Check RBAC permissions for current user.', 'Add <code>--as user</code> to simulate.')

/* Secrets & export (cross user list) */
add('Resources', 'advanced', 'Create generic secret', 'kubectl create secret generic mysecret --from-literal=key=value -n <ns>', 'Opaque secret from literals.', 'Also <code>--from-file</code> and <code>--from-env-file</code>.')
add('Resources', 'advanced', 'Create ConfigMap from file', 'kubectl create configmap myconfig --from-file=app.conf -n <ns>', 'Config from file or directory.', '<code>--from-literal</code> for small keys.')
add('Resources', 'intermediate', 'Export pod YAML', 'kubectl get pod <name> -n <ns> -o yaml', 'Full manifest including status.', 'Strip status/metadata before re-apply elsewhere.')

const seen = new Map()
const objs = []
for (const r of rows) {
  let id = makeId(r.command)
  if (seen.has(id)) {
    let n = 2
    while (seen.has(`${id}-${n}`)) n++
    id = `${id}-${n}`
  }
  seen.set(id, true)
  objs.push({
    id,
    tool: 'kubernetes',
    category: r.category,
    level: r.level,
    name: r.name,
    command: r.command,
    description: r.description,
    explanation: r.explanation,
  })
}

const header = `/**
 * Kubernetes (kubectl) command reference — categorized.
 * Generated by scripts/gen-kubernetes.mjs
 */
export const KUBERNETES_COMMANDS = `

fs.writeFileSync(outPath, `${header}${JSON.stringify(objs, null, 2)};\n`)
console.log('Wrote', objs.length, 'kubernetes commands')

/**
 * LAB enrichment: CLI tool link, hands-on steps, and visual flow per guide.
 * Guides in scriptingGuides.js stay unchanged; this layer adds interactivity.
 */

/** @typedef {{ id: string, label: string, sub?: string }} LabFlowStep */
/** @typedef {{ title: string, detail: string, command: string, output: string }} LabHandsOnStep */

const ID_TO_COMMANDS_TOOL = {
  dockerfile: 'docker',
  'docker-compose': 'docker',
  jenkinsfile: 'github-actions',
  'ansible-playbook': 'ansible',
  'ansible-role': 'ansible',
  terraform: 'terraform',
  'kubernetes-manifest': 'kubernetes',
  'github-actions': 'github-actions',
  'gitlab-ci': 'github-actions',
  'helm-chart': 'helm',
  'bash-devops': 'shell',
  'makefile-devops': 'linux',
}

/** @type {Record<string, { visualFlow: LabFlowStep[], handsOn: LabHandsOnStep[], codeLang?: string }>} */
const OVERRIDES = {
  dockerfile: {
    codeLang: 'dockerfile',
    visualFlow: [
      { id: 'dockerfile', label: 'Dockerfile', sub: 'Declarative recipe' },
      { id: 'image', label: 'Image', sub: 'Read-only layers' },
      { id: 'container', label: 'Container', sub: 'Running workload' },
    ],
    handsOn: [
      {
        title: '1 · Build context',
        detail:
          'Docker packages the directory you point at (minus .dockerignore) and sends it to the daemon. Only files in context can be COPY’d.',
        command: 'docker build -t myapp:local .',
        output:
          '[+] Building 12.3s (8/8) FINISHED\n => [internal] load build definition from Dockerfile\n => => transferring dockerfile: 428B\n => [1/5] FROM docker.io/library/node:20-alpine\n => [2/5] WORKDIR /app\n => [3/5] COPY package.json ./\n => [4/5] RUN npm ci --omit=dev\n => [5/5] COPY . .\n => exporting to image\n => => naming to docker.io/library/myapp:local',
      },
      {
        title: '2 · Image layers & cache',
        detail:
          'Each instruction that changes the filesystem creates a layer. Unchanged lines reuse cache — that is why dependency files are copied before source.',
        command: 'docker image history myapp:local --no-trunc',
        output:
          'IMAGE          CREATED BY                                      SIZE\n<missing>      COPY . .                                        2.1MB\n<missing>      RUN npm ci --omit=dev                           180MB\n<missing>      COPY package.json ./                            4kB\n<missing>      WORKDIR /app                                    0B\n<missing>      FROM node:20-alpine                             120MB',
      },
      {
        title: '3 · Run a container',
        detail:
          'A container adds a writable layer on top of the image and starts your process (CMD/ENTRYPOINT). Published ports map host → container.',
        command: 'docker run --rm -p 3000:3000 myapp:local',
        output:
          '▸ Simulated: container started\n▸ Listening on 0.0.0.0:3000 → host :3000\n▸ PID 1 is your app (exec form CMD) — SIGTERM reaches Node directly.',
      },
    ],
  },
  'docker-compose': {
    codeLang: 'yaml',
    visualFlow: [
      { id: 'compose', label: 'compose.yaml', sub: 'Service graph' },
      { id: 'project', label: 'Project', sub: 'Network + volumes' },
      { id: 'up', label: 'docker compose up', sub: 'Running stack' },
    ],
    handsOn: [
      {
        title: '1 · Declare services',
        detail: 'Each service maps to containers; depends_on controls startup order (not health).',
        command: 'docker compose config',
        output:
          'name: myproject\nservices:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_PASSWORD: dev',
      },
      {
        title: '2 · Bring the stack up',
        detail: 'Compose builds images if needed, creates the default network, and starts containers.',
        command: 'docker compose up -d',
        output:
          '[+] Running 3/3\n ✔ Network myproject_default    Created\n ✔ Container myproject-db-1     Started\n ✔ Container myproject-api-1    Started',
      },
      {
        title: '3 · Observe & tear down',
        detail: 'Logs aggregate per service; down removes containers (volumes optional).',
        command: 'docker compose logs -f api',
        output:
          'api-1  | Server listening on :3000\napi-1  | GET /health 200 2ms\n▸ Simulated follow mode — Ctrl+C to stop tail',
      },
    ],
  },
  terraform: {
    codeLang: 'hcl',
    visualFlow: [
      { id: 'tf', label: '.tf files', sub: 'Declarative config' },
      { id: 'plan', label: 'Plan', sub: 'Proposed changes' },
      { id: 'apply', label: 'Apply', sub: 'Real infra' },
    ],
    handsOn: [
      {
        title: '1 · Initialize backend',
        detail: 'Downloads providers and prepares the working directory.',
        command: 'terraform init',
        output: 'Initializing provider plugins...\n- Finding hashicorp/aws versions matching "~> 5.0"...\n- Installing hashicorp/aws v5.x...\n\nTerraform has been successfully initialized!',
      },
      {
        title: '2 · Preview changes',
        detail: 'plan shows create/update/destroy without writing state.',
        command: 'terraform plan -out=tfplan',
        output:
          'Terraform used the selected providers to generate the following execution plan...\n  # aws_s3_bucket.app will be created\n  + resource "aws_s3_bucket" "app" {\n      + bucket = "my-app-assets"\n    }\n\nPlan: 1 to add, 0 to change, 0 to destroy.',
      },
      {
        title: '3 · Apply (simulated)',
        detail: 'In production, review plan output and use approved CI/CD or manual apply with care.',
        command: 'terraform apply tfplan',
        output:
          '▸ Simulated apply complete\naws_s3_bucket.app: Creating...\naws_s3_bucket.app: Creation complete after 2s\n\nApply complete! Resources: 1 added, 0 changed, 0 destroyed.',
      },
    ],
  },
  'kubernetes-manifest': {
    codeLang: 'yaml',
    visualFlow: [
      { id: 'manifest', label: 'Manifests', sub: 'YAML intent' },
      { id: 'api', label: 'API server', sub: 'Desired state' },
      { id: 'pods', label: 'Pods', sub: 'Scheduled workloads' },
    ],
    handsOn: [
      {
        title: '1 · Dry-run apply',
        detail: 'Validate objects without mutating the cluster.',
        command: 'kubectl apply -f deploy.yaml --dry-run=server',
        output:
          'deployment.apps/api configured (server dry run)\n▸ No changes committed — schema and admission checks passed.',
      },
      {
        title: '2 · Roll out',
        detail: 'Controller reconciles ReplicaSet → Pods; rollout status tracks readiness.',
        command: 'kubectl rollout status deployment/api',
        output: 'Waiting for deployment "api" rollout to finish: 2 of 2 updated replicas are available...\ndeployment "api" successfully rolled out',
      },
      {
        title: '3 · Inspect running Pods',
        detail: 'Pods are ephemeral; describe events when scheduling fails.',
        command: 'kubectl get pods -l app=api -o wide',
        output:
          'NAME                   READY   STATUS    RESTARTS   AGE   NODE\napi-7d8f9c4b5-xk2jq   1/1     Running   0          42s   worker-2\napi-7d8f9c4b5-mn91p   1/1     Running   0          41s   worker-1',
      },
    ],
  },
}

function toolForGuideId(id) {
  return ID_TO_COMMANDS_TOOL[id] || 'all'
}

function genericFlow(title) {
  return [
    { id: 'a', label: 'Source', sub: 'Repo & config' },
    { id: 'b', label: 'Pipeline', sub: title.slice(0, 22) },
    { id: 'c', label: 'Runtime', sub: 'Deployed state' },
  ]
}

function genericHandsOn(guide) {
  return [
    {
      title: '1 · Read the guide',
      detail: guide.tagline || 'Work through the overview and key definitions on the Overview tab.',
      command: `# Topic: ${guide.title}`,
      output: '▸ Simulated: you reviewed core concepts and terminology.',
    },
    {
      title: '2 · Try related commands',
      detail: 'Open the Commands workspace for this tool and run searches that match your stack.',
      command: 'See Commands tab → Open CLI reference',
      output: '▸ Simulated: command reference opened in the hub.',
    },
    {
      title: '3 · Automate safely',
      detail: 'Check in small changes, use dry-run flags where available, and pin versions in production.',
      command: '# commit → review → apply',
      output: '▸ Simulated: change promoted through your usual review flow.',
    },
  ]
}

/**
 * @param {{ id: string, title: string, tagline?: string }} guide
 */
export function getLabMeta(guide) {
  const o = OVERRIDES[guide.id]
  const commandsTool = toolForGuideId(guide.id)
  const visualFlow = o?.visualFlow || genericFlow(guide.title)
  const handsOn = o?.handsOn || genericHandsOn(guide)
  return {
    commandsTool,
    codeLang: o?.codeLang || 'bash',
    visualFlow,
    handsOn,
  }
}

export function getPrimaryCodeSample(guide) {
  for (const section of guide.sections || []) {
    if (section.code?.trim()) return section.code.trim()
  }
  return ''
}

/**
 * Beginner-friendly scripting & config guides (not CLI commands).
 * Bodies use **double asterisks** for bold (see RichBody in ScriptingGuides.jsx).
 */
export const SCRIPTING_GUIDES = [
  {
    id: 'dockerfile',
    title: 'Dockerfile',
    tagline: 'Recipe that turns your app into a runnable container image.',
    sections: [
      {
        title: 'What you are building',
        body: 'A Dockerfile is a **declarative script**: Docker reads it **from top to bottom** and executes each instruction to build **layers**. The result is an **image** — a read-only template (filesystem snapshot + config). When you `docker run`, you get a **container**: a writable layer on top of that image plus a running process. Understanding **image vs container** is the core mental model.',
      },
      {
        title: 'How the build actually works',
        body: 'Each `RUN`, `COPY`, and `ADD` usually creates a **new layer**. Layers are **cached**: if a line and its context did not change, Docker reuses the cached layer. That is why we **copy dependency manifests first**, run `npm install` / `pip install`, **then** copy source: source changes often; dependency files change rarely, so installs stay cached. **`WORKDIR`** sets the current directory for later instructions — prefer it over `cd` in `RUN` when possible.',
      },
      {
        title: 'Instructions — base image & files',
        intro: 'These instructions choose the starting OS/runtime and copy files into the image.',
        definitions: [
          {
            term: 'FROM',
            syntax: 'FROM <image>[:tag | @digest] [AS name]',
            body: 'Starts a **build stage**. The first `FROM` is your base (e.g. `node:20-alpine`). **`AS name`** names the stage for **multi-stage** builds (`COPY --from=name`).',
          },
          {
            term: 'WORKDIR',
            syntax: 'WORKDIR /path',
            body: 'Sets the **current directory** for later `RUN`, `COPY`, `ENTRYPOINT`, and `CMD`. Creates the path if it does not exist. Prefer this over `cd` inside `RUN`.',
          },
          {
            term: 'COPY',
            syntax: 'COPY [--chown=user:group] <src> ... <dest>',
            body: 'Copies from the **build context** (files sent to `docker build`) into the image. **`src`** is relative to the context root; **`dest`** is inside the image. Use **.dockerignore** to shrink context and exclude secrets.',
          },
          {
            term: 'ADD',
            syntax: 'ADD <src> ... <dest>',
            body: 'Like `COPY`, but can fetch **URLs** and auto-extract some archives. Prefer **`COPY`** unless you need those extras — it is simpler and more predictable.',
          },
        ],
      },
      {
        title: 'Instructions — build time (RUN, ARG, ENV)',
        intro: 'Run commands while building, and set variables for build or runtime.',
        definitions: [
          {
            term: 'RUN',
            syntax: 'RUN <shell command>   or   RUN ["executable", "arg1", ...]',
            body: '**Shell form** runs as `/bin/sh -c` (good for `apt-get`, pipes). **Exec form** runs the binary directly — no shell — use when you do not need shell features. Each `RUN` usually adds a **new layer**.',
          },
          {
            term: 'ARG',
            syntax: 'ARG NAME[=default]',
            body: '**Build-time only** variable. Set with **`docker build --build-arg NAME=value`**. Not available when the container **runs**, unless you copy it into an **`ENV`**.',
          },
          {
            term: 'ENV',
            syntax: 'ENV KEY=value   or   ENV KEY=value OTHER=val2',
            body: 'Sets **environment variables** stored in the image. Visible in later **`RUN`** steps and in the running container. Good for `NODE_ENV`, `PYTHONUNBUFFERED`, etc.',
          },
        ],
      },
      {
        title: 'Instructions — container runtime',
        intro: 'These affect how the container runs and what process is PID 1.',
        definitions: [
          {
            term: 'EXPOSE',
            syntax: 'EXPOSE <port> [/tcp | /udp]',
            body: '**Documents** which ports the app uses. Does **not** publish ports by itself — use **`docker run -p host:container`** (or Compose `ports:`) for that.',
          },
          {
            term: 'USER',
            syntax: 'USER <name>   or   USER <uid>[:<gid>]',
            body: 'Runs the container process (and later `RUN`/`CMD`/`ENTRYPOINT` in the Dockerfile) as this user. Create a user first if the base image is root-only.',
          },
          {
            term: 'CMD',
            syntax: 'CMD ["exec", "arg"]   or   CMD command arg',
            body: 'Default command when you **`docker run`** with no extra args. **Exec form** (JSON array) is best for **signal handling** (SIGTERM). **Shell form** wraps with `sh -c` — often worse for production services.',
          },
          {
            term: 'ENTRYPOINT',
            syntax: 'ENTRYPOINT ["exec", "arg"]   or   ENTRYPOINT command',
            body: 'Defines the **main executable**. If set, **`CMD`** is usually **extra arguments** to that executable. Handy when you always want the same binary (e.g. `node`) and only change args.',
          },
          {
            term: 'VOLUME',
            syntax: 'VOLUME ["/path"]',
            body: 'Declares a path for **persistent or shared data**. Often used so databases or uploads survive container replacement. Actual mount is configured at **`docker run -v`** or in Compose.',
          },
        ],
      },
      {
        title: 'CMD vs ENTRYPOINT (clear rule)',
        bullets: [
          '**ENTRYPOINT** = fixed program (e.g. always `node`). **CMD** = default **arguments** to that program — or the full command if you keep the default entrypoint.',
          '**Exec form** `CMD ["node", "app.js"]` — signals go to **Node** (good for graceful shutdown). **Shell form** `CMD node app.js` uses `sh -c` and can **mishandle SIGTERM** — avoid in production.',
          '**Example:** `ENTRYPOINT ["node"]` plus `CMD ["server.js"]` behaves like running **`node server.js`**.',
        ],
      },
      {
        title: 'Typical order (beginner checklist)',
        bullets: [
          '**FROM** — pin a tag (`node:20-alpine`), not bare `latest` in production.',
          '**WORKDIR** — set the app folder inside the image.',
          '**COPY** manifests/lockfiles only, then **RUN** install dependencies (best cache).',
          '**COPY** the rest of the source (honor **.dockerignore**).',
          '**EXPOSE** the port your app listens on.',
          '**USER** — non-root when the image supports it.',
          '**CMD** in **exec form** so your app is **PID 1**.',
        ],
      },
      {
        title: 'Example — Node.js API (Express)',
        body: 'Assumes `package.json`, lockfile, and `server.js` listening on port **3000**. Each line below maps to the reference above.',
        code: `# FROM: official Node on Alpine (small image)
FROM node:20-alpine

# WORKDIR: all later paths are under /app
WORKDIR /app

# COPY only manifests first so RUN npm ci stays cached when only code changes
COPY package.json package-lock.json ./

# RUN: install production deps (--omit=dev optional for prod-only)
RUN npm ci

# COPY application source (respect .dockerignore)
COPY . .

# EXPOSE: document port (publish with docker run -p 3000:3000)
EXPOSE 3000

# USER: node user exists on official node image
USER node

# CMD exec form: PID 1 is node (good for signals)
CMD ["node", "server.js"]`,
      },
      {
        title: 'Example — Python API (FastAPI + Uvicorn)',
        body: 'Assumes `requirements.txt` and `main.py` with `app = FastAPI()`. **PYTHONUNBUFFERED** makes logs appear immediately in `docker logs`.',
        code: `FROM python:3.12-slim
WORKDIR /app

# ENV: runtime behavior for Python in containers
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# COPY deps file alone, then RUN install (layer cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Run as non-root: Debian slim has nobody (optional: adduser in Dockerfile)
USER nobody

# CMD: module:variable ASGI app, bind all interfaces inside container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
      },
      {
        title: 'Example — React (Vite) multi-stage + Nginx',
        body: '**Stage 1** builds static files (`dist/`). **Stage 2** copies only `dist/` into **nginx** — final image has no Node, smaller and safer. Swap `npm run build` / output folder for **Create React App** (`build/`) if needed.',
        code: `# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Vite default output is dist/
RUN npm run build

# ---- run stage ----
FROM nginx:1.27-alpine

# COPY --from: take files from earlier stage, not from your laptop
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx.conf for SPA fallback
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# nginx must stay foreground in containers
CMD ["nginx", "-g", "daemon off;"]`,
      },
      {
        title: 'Security & hygiene',
        bullets: [
          '**`.dockerignore`** — like `.gitignore`; exclude `node_modules`, `.git`, secrets, `*.pem`, and huge folders so the **build context** stays small and secrets never enter layer history.',
          '**Base images** — prefer **minimal** or **distroless** images to reduce attack surface.',
          '**Scanning** — run **Trivy** or **Grype** in CI on built images.',
          '**Secrets** — never bake **AWS keys** or DB passwords into the Dockerfile; use **runtime env**, **Docker/Kubernetes secrets**, or your cloud secret store.',
        ],
      },
      {
        title: 'Debugging builds',
        bullets: [
          '**`docker build --progress=plain .`** — full build logs in the terminal.',
          '**`docker build --target <stage>`** — debug one stage of a **multi-stage** Dockerfile.',
          '**`docker history <image>`** — see **layer sizes** and find fat layers.',
          '**Cache misses** — if **`COPY . .`** always invalidates cache, tighten **`.dockerignore`**.',
        ],
      },
    ],
  },
  {
    id: 'docker-compose',
    title: 'Docker Compose',
    tagline: 'One YAML file to run several containers together (app + database + cache).',
    sections: [
      {
        title: 'What it is',
        intro: 'Compose is YAML that describes how several containers work together on your machine.',
        bullets: [
          '**Services** — each service is usually one **container** (build from a Dockerfile or use an `image:`).',
          '**Project** — `docker compose up` creates a **project** (often named after the folder).',
          '**DNS** — on the default network, service **A** can reach service **B** by **hostname** `B` (e.g. `postgres://db:5432`).',
        ],
      },
      {
        title: 'Compose file layout',
        intro: 'V2 CLI: **`docker compose`**. Common filenames: **`compose.yaml`** or **`docker-compose.yml`** (often no top-level `version:` key).',
        definitions: [
          {
            term: 'services',
            syntax: 'services: { ... }',
            body: 'The main block: each key is a **service name** (used as DNS hostname).',
          },
          {
            term: 'build vs image',
            syntax: 'build: .   or   image: postgres:16',
            body: '**`build`** builds from a **Dockerfile** in a context path. **`image`** pulls a ready-made image from a registry.',
          },
          {
            term: 'networks & volumes',
            syntax: 'networks: / volumes:',
            body: '**networks** — custom networks for isolation. **volumes** — named volumes for **persistent data** (e.g. database files).',
          },
        ],
      },
      {
        title: 'Key service options',
        intro: 'These keys appear **under each service** in YAML.',
        definitions: [
          {
            term: 'ports',
            syntax: 'ports: ["8080:3000"]',
            body: 'Maps **host port** 8080 to **container port** 3000. Required to reach the app from your browser on localhost.',
          },
          {
            term: 'environment / env_file',
            syntax: 'environment: { KEY: val }   or   env_file: .env',
            body: 'Inject config into the container. Prefer **env files** for local dev; **never commit** real secrets.',
          },
          {
            term: 'depends_on',
            syntax: 'depends_on: [db]   or   condition: service_healthy',
            body: 'Controls **start order** only — it does **not** wait for Postgres to accept connections. Pair with **`healthcheck`** + **`condition: service_healthy`** for reliable startups.',
          },
        ],
      },
      {
        title: 'Minimal example',
        code: `services:
  web:
    build: .
    ports:
      - "8080:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://db:5432/app
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: example
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 3s
      timeout: 5s
      retries: 5

volumes:
  pgdata:`,
      },
      {
        title: 'Profiles & overrides',
        bullets: [
          '**profiles** — enable optional services with `docker compose --profile debug up`.',
          '**Override files** — e.g. `docker-compose.override.yml` (often **gitignored**) for personal ports or bind mounts.',
          '**Multiple files** — `docker compose -f compose.yml -f compose.ci.yml up` for CI-specific tweaks.',
        ],
      },
      {
        title: 'Production vs local',
        bullets: [
          'Compose shines for **local dev** and **integration tests**.',
          'Production often uses **Kubernetes**, **ECS**, **Nomad**, etc. — but you usually ship the **same images** you built with Compose.',
          'Treat the Compose file as **living documentation** of ports, env vars, and dependencies.',
        ],
      },
    ],
  },
  {
    id: 'jenkinsfile',
    title: 'Jenkinsfile',
    tagline: 'Pipeline as code: stages, steps, and when your CI runs them.',
    sections: [
      {
        title: 'Declarative vs Scripted',
        bullets: [
          '**Declarative** — `pipeline { }` with **stages** and **steps**; Jenkins validates shape; Blue Ocean / UI maps cleanly — **start here**.',
          '**Scripted** — full **Groovy** (`node { }`); very flexible but easy to grow messy — use only when declarative is not enough.',
        ],
      },
      {
        title: 'Agent & workspace',
        intro: '**Agent** = where the pipeline runs. **Workspace** = checkout directory on that agent.',
        definitions: [
          {
            term: 'agent any',
            syntax: 'agent any',
            body: 'Run on **any** available Jenkins executor.',
          },
          {
            term: 'agent by label',
            syntax: 'agent { label "docker" }',
            body: 'Run only on nodes with that **label** (e.g. Docker-capable agents).',
          },
          {
            term: 'agent docker { }',
            syntax: 'agent { docker { image "node:20" } }',
            body: 'Run **inside** a container on the agent — good for reproducible tool versions.',
          },
          {
            term: 'workspace',
            syntax: 'checkout scm',
            body: 'After **checkout**, **`sh`** steps run in the repo root unless you **`dir("subdir")`**.',
          },
        ],
      },
      {
        title: 'Minimal Declarative pipeline',
        code: `pipeline {
  agent any
  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
  post {
    always {
      junit 'reports/**/*.xml'
    }
    failure {
      echo 'Pipeline failed — check logs above'
    }
  }
}`,
      },
      {
        title: 'Branches, credentials, libraries',
        bullets: [
          '**when { branch "main" }** — run stages only on certain branches.',
          '**when { expression { ... } }** — e.g. only when **`env.TAG_NAME`** is set for releases.',
          '**withCredentials([...]) { }** — inject secrets; **never echo** them to the log.',
          '**Shared libraries** — reusable Groovy in a Git repo; in Jenkinsfile use the **@Library** step with your library id (see Jenkins shared libraries docs) so many pipelines share one codebase.',
        ],
      },
      {
        title: 'Common pitfalls',
        bullets: [
          '**Quoting** — nested Groovy + shell strings are painful; put complex logic in a **script in the repo** and call it from **`sh`**.',
          '**post { always { } }** — publish **test reports** and artifacts even when the build **fails**.',
          '**Tool versions** — pin Node/Java via **Docker agent** or **tool installers** so OS upgrades do not break builds.',
        ],
      },
    ],
  },
  {
    id: 'ansible-playbook',
    title: 'Ansible playbook',
    tagline: 'Ordered list of tasks applied to hosts (YAML).',
    sections: [
      {
        title: 'Playbook structure',
        intro: 'A playbook is a **YAML list of plays**. Ansible is **push-based**: your control machine connects over **SSH** (or APIs) — no agent on the target.',
        definitions: [
          {
            term: 'Play',
            syntax: '- name: ...  hosts: ...  tasks: ...',
            body: 'One **play** applies to a set of **hosts** and runs a list of **tasks** in order.',
          },
          {
            term: 'hosts',
            syntax: 'hosts: webservers',
            body: 'An **inventory group**, hostname pattern, or **`all`**. Defines **which machines** this play targets.',
          },
          {
            term: 'become',
            syntax: 'become: yes',
            body: 'Privilege escalation (often **sudo**) for tasks that need root.',
          },
          {
            term: 'tasks & modules',
            syntax: 'tasks: - name: ...  ansible.builtin.apt: ...',
            body: 'Each **task** calls a **module** (`apt`, `copy`, `template`, `service`, …) with **key: value** arguments.',
          },
        ],
      },
      {
        title: 'Inventory & connection',
        definitions: [
          {
            term: 'Inventory',
            syntax: '[webservers] then hostnames (INI)',
            body: 'Lists **hosts** and **groups**. Can be **INI** or **YAML**; often split with **`host_vars/`** and **`group_vars/`**.',
          },
          {
            term: 'Connection vars',
            syntax: 'ansible_user, ansible_ssh_private_key_file',
            body: 'Set **who** connects and **which key** to use. Avoid storing **passwords** in git.',
          },
          {
            term: 'Dynamic inventory',
            syntax: 'inventory plugins',
            body: '**AWS / Azure / GCP** plugins build host lists from the cloud API instead of static files.',
          },
        ],
      },
      {
        title: 'Minimal example',
        code: `---
- name: Configure web server
  hosts: webservers
  become: yes
  vars:
    nginx_worker_processes: auto
  tasks:
    - name: Ensure nginx is installed
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Deploy site config from template
      ansible.builtin.template:
        src: templates/site.conf.j2
        dest: /etc/nginx/sites-available/default
        mode: "0644"
      notify: Reload nginx

    - name: Start and enable nginx
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: yes

  handlers:
    - name: Reload nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded`,
      },
      {
        title: 'Idempotence & check mode',
        bullets: [
          '**Idempotent tasks** — second run should show **ok** (no change) if nothing drifted.',
          '**`ansible-playbook --check`** — dry-run; not every module supports it perfectly.',
          '**`changed_when:` / `failed_when:`** — tune **shell**/**command** modules so Ansible reports success/failure correctly.',
        ],
      },
      {
        title: 'Roles & task includes',
        definitions: [
          {
            term: 'roles:',
            syntax: 'roles: [nginx, common]',
            body: 'Bundle tasks, templates, and defaults in **`roles/role_name/`** — keeps playbooks short.',
          },
          {
            term: 'import_tasks',
            syntax: 'import_tasks: tasks/extra.yml',
            body: '**Static** include — parsed when the playbook **loads**.',
          },
          {
            term: 'include_tasks',
            syntax: 'include_tasks: tasks/extra.yml',
            body: '**Dynamic** include — good for **loops** or **conditional** task files.',
          },
        ],
      },
    ],
  },
  {
    id: 'ansible-role',
    title: 'Ansible role',
    tagline: 'Reusable folder layout: defaults, tasks, templates, handlers.',
    sections: [
      {
        title: 'Why roles',
        bullets: [
          'A **role** = one concern (e.g. **nginx**, **docker**) with tasks, templates, and variables together.',
          'Playbooks stay short: **`roles: [common, nginx]`**.',
          'Share roles via **Ansible Galaxy**, **private Git**, or **CI artifacts**; version them like libraries.',
        ],
      },
      {
        title: 'Standard role layout',
        intro: 'Under **`roles/myrole/`** these paths are conventional:',
        definitions: [
          {
            term: 'tasks/main.yml',
            syntax: 'tasks/main.yml',
            body: 'Main list of **tasks** Ansible runs for this role.',
          },
          {
            term: 'handlers/main.yml',
            syntax: 'handlers/main.yml',
            body: 'Tasks notified by **`notify:`** — e.g. **reload nginx** only when config changed.',
          },
          {
            term: 'templates/ & files/',
            syntax: '*.j2 under templates/',
            body: '**template** module uses **Jinja2** under **`templates/`**; **`copy`** uses static files under **`files/`**.',
          },
          {
            term: 'defaults/ & vars/',
            syntax: 'defaults/main.yml, vars/main.yml',
            body: '**defaults** — easy to override. **vars** — higher precedence, role-internal.',
          },
          {
            term: 'meta/main.yml',
            syntax: 'dependencies:',
            body: 'Other roles this role **depends on**.',
          },
        ],
      },
      {
        title: 'site.yml calling roles',
        code: `---
- name: Apply stack roles
  hosts: webservers
  become: yes
  roles:
    - role: common
    - role: nginx
      vars:
        nginx_listen_port: 8080
        nginx_worker_connections: 2048`,
      },
      {
        title: 'Role variables & precedence',
        bullets: [
          '**`-e` / extra vars** — highest precedence; good for **one-off** overrides.',
          'Put **sensible defaults** in **`defaults/main.yml`** and **document** them in **`README.md`**.',
          '**`vars:`** on the **`roles:`** entry overrides defaults for that run.',
        ],
      },
      {
        title: 'Beginner tip',
        bullets: [
          'Start with a **single playbook**; extract a **role** when you copy the same tasks twice.',
          'Prefer **small roles** (one service) over one huge **god role**.',
        ],
      },
    ],
  },
  {
    id: 'terraform',
    title: 'Terraform (.tf)',
    tagline: 'Describe infrastructure; Terraform plans and applies changes via providers.',
    sections: [
      {
        title: 'Core workflow',
        intro: 'You write **HCL** describing **desired state**. Terraform compares that to **state** and the real cloud.',
        definitions: [
          {
            term: 'terraform init',
            syntax: 'terraform init',
            body: 'Downloads **providers** and configures the **backend** (where **state** is stored).',
          },
          {
            term: 'terraform plan',
            syntax: 'terraform plan',
            body: 'Shows **create / update / destroy** actions without applying them.',
          },
          {
            term: 'terraform apply',
            syntax: 'terraform apply',
            body: 'Applies the plan to real infrastructure.',
          },
          {
            term: 'State',
            syntax: 'terraform.tfstate (or remote backend)',
            body: 'Maps resources in HCL to **real cloud IDs**. Do **not** hand-edit unless you know **state surgery** procedures.',
          },
        ],
      },
      {
        title: 'Providers, resources, data',
        definitions: [
          {
            term: 'provider',
            syntax: 'provider "aws" { region = ... }',
            body: 'Configures a **plugin** (AWS, Azure, GCP, Kubernetes, GitHub, …) — region, credentials, features.',
          },
          {
            term: 'resource',
            syntax: 'resource "aws_s3_bucket" "logs" { ... }',
            body: 'Declares infrastructure Terraform should **create and manage**.',
          },
          {
            term: 'data',
            syntax: 'data "aws_ami" "ubuntu" { ... }',
            body: '**Reads** existing infrastructure (lookups) without owning the resource.',
          },
          {
            term: 'depends_on',
            syntax: 'depends_on = [aws_iam_role_policy.example]',
            body: 'Explicit ordering when there is **no attribute reference** but APIs still require sequence.',
          },
        ],
      },
      {
        title: 'Minimal pattern',
        code: `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

resource "aws_s3_bucket" "logs" {
  bucket = var.bucket_name
}

output "bucket_id" {
  value = aws_s3_bucket.logs.id
}`,
      },
      {
        title: 'Modules, workspaces, tfvars',
        bullets: [
          '**Modules** — reusable folders with **inputs** and **outputs**; pin **Git refs** or registry versions.',
          '**Workspaces** (or **separate state** per env) isolate **dev / stage / prod**.',
          '**`.tfvars`** — non-secret defaults per environment; keep **secrets** in **CI** or **Vault**.',
        ],
      },
      {
        title: 'Lifecycle & safety',
        bullets: [
          '**`lifecycle { prevent_destroy = true }`** on databases and irreplaceable data.',
          '**`create_before_destroy`** where supported for smoother replacements.',
          'Run **`plan`** in CI; gate **`apply`** on **prod** with human approval.',
          'Use **remote state locking** (e.g. **S3 + DynamoDB** on AWS) so concurrent applies cannot corrupt state.',
        ],
      },
    ],
  },
  {
    id: 'kubernetes-manifest',
    title: 'Kubernetes manifest',
    tagline: 'YAML describing desired Pods, Services, Deployments, and more.',
    sections: [
      {
        title: 'Object shape (API basics)',
        intro: 'Every Kubernetes object has the same top-level fields; **controllers** reconcile **spec** toward the cluster.',
        definitions: [
          {
            term: 'apiVersion & kind',
            syntax: 'apiVersion: apps/v1  kind: Deployment',
            body: 'Which **API group** and **resource type** you are creating.',
          },
          {
            term: 'metadata',
            syntax: 'name:, namespace:, labels:, annotations:',
            body: '**name** must be unique per namespace. **labels** select pods for **Services**. **annotations** store extra non-identifying metadata.',
          },
          {
            term: 'spec',
            syntax: 'spec: ...',
            body: '**Desired state** — replicas, container image, ports, probes, resources, etc.',
          },
        ],
      },
      {
        title: 'Pods & Deployments',
        bullets: [
          'Avoid standalone **Pod** YAML in prod — use a **controller**.',
          '**Deployment** → **ReplicaSet** → **Pods**; Deployments handle **rollouts** and **rollbacks**.',
          '**RollingUpdate** — tune **`maxUnavailable`** and **`maxSurge`** for speed vs safety.',
        ],
      },
      {
        title: 'Deployment + Service (minimal)',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  labels:
    app: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27-alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: "64Mi"
              cpu: "100m"
            limits:
              memory: "128Mi"
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80`,
      },
      {
        title: 'ConfigMap, Secret, probes',
        definitions: [
          {
            term: 'ConfigMap',
            syntax: 'kind: ConfigMap',
            body: 'Non-secret **config** — mount as **files** or inject as **env** vars.',
          },
          {
            term: 'Secret',
            syntax: 'kind: Secret',
            body: 'Sensitive data — **base64** in YAML at rest; enable **etcd encryption** in production clusters.',
          },
          {
            term: 'livenessProbe',
            syntax: 'livenessProbe: ...',
            body: 'Fails → **kubelet restarts** the container. Bad tuning → **restart loops**.',
          },
          {
            term: 'readinessProbe',
            syntax: 'readinessProbe: ...',
            body: 'Fails → pod removed from **Service** endpoints until healthy again.',
          },
        ],
      },
      {
        title: 'Namespaces & RBAC',
        bullets: [
          '**namespaces** — isolate teams, envs, or apps.',
          '**Role / RoleBinding** — who may **get/list/patch** which resources in a namespace.',
          'CI/CD should use a **dedicated ServiceAccount** with **least privilege** — not **cluster-admin**.',
        ],
      },
    ],
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions workflow',
    tagline: 'YAML workflows that run on GitHub-hosted or self-hosted runners when events fire.',
    sections: [
      {
        title: 'Workflow layout',
        intro: 'YAML under **`.github/workflows/`** defines **when** work runs, **where**, and **what** steps execute.',
        definitions: [
          {
            term: 'on:',
            syntax: 'on: push: pull_request:',
            body: '**Triggers** — push, PR, **schedule** (cron), **workflow_dispatch** (button), **repository_dispatch** (API).',
          },
          {
            term: 'jobs',
            syntax: 'jobs: build: ...',
            body: 'Each **job** runs on one **runner** (OS image). Jobs run **in parallel** unless linked with **`needs:`**.',
          },
          {
            term: 'runs-on',
            syntax: 'runs-on: ubuntu-latest',
            body: '**GitHub-hosted** or **self-hosted** runner label.',
          },
          {
            term: 'steps',
            syntax: 'steps: - uses: ...  - run: ...',
            body: '**uses** pulls a Marketplace **action**; **run** executes **shell** commands.',
          },
        ],
      },
      {
        title: 'Contexts & secrets',
        bullets: [
          '**github** context — repo name, ref, commit SHA, actor (who triggered the run).',
          '**env** — job- or step-level environment variables.',
          '**secrets** — configured in repo/org settings; reference in YAML expression syntax; **never print** values to logs.',
          'Prefer **OIDC** to cloud providers over long-lived **static cloud keys** in secrets.',
        ],
      },
      {
        title: 'Minimal CI workflow',
        code: `name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm test`,
      },
      {
        title: 'Matrices & reusable workflows',
        bullets: [
          '**strategy.matrix** — same job across **Node versions** or **OS** (great for open-source libraries).',
          '**workflow_call** — callable workflow; other repos **reuse** one standard pipeline.',
          '**concurrency** — cancel stale runs on the same **PR** or branch to save minutes.',
        ],
      },
      {
        title: 'Caching & artifacts',
        bullets: [
          '**actions/cache** — speed up **npm/pip/maven** installs between runs.',
          '**upload-artifact / download-artifact** — pass **build output** between jobs (no shared disk by default).',
          'Set **retention-days** to control **storage cost**.',
          'For **Docker**, use **build-push-action** cache or a **registry** cache.',
        ],
      },
    ],
  },
  {
    id: 'gitlab-ci',
    title: 'GitLab CI (.gitlab-ci.yml)',
    tagline: 'Pipeline stages and jobs defined in YAML at the repo root.',
    sections: [
      {
        title: 'Pipeline model',
        intro: '**`.gitlab-ci.yml`** at the repo root defines **stages** and **jobs**.',
        definitions: [
          {
            term: 'stages',
            syntax: 'stages: [test, build, deploy]',
            body: '**Ordered** list — jobs in **deploy** wait until **test** and **build** stages complete successfully (per default rules).',
          },
          {
            term: 'job + script',
            syntax: 'myjob:  script: - npm test',
            body: 'Each **job** runs **`script`** lines (shell) on a **runner**.',
          },
          {
            term: 'Runners',
            syntax: 'tags: [docker]',
            body: '**Shared** runners on GitLab.com or **self-hosted** runners; **tags** route jobs to the right machines.',
          },
        ],
      },
      {
        title: 'Image, cache, artifacts, rules',
        definitions: [
          {
            term: 'image',
            syntax: 'image: node:20-alpine',
            body: 'Default **container image** for the job (on Docker executors).',
          },
          {
            term: 'cache',
            syntax: 'cache: paths: [node_modules/]',
            body: 'Reuse **dependencies** between pipelines; speeds up **npm ci** / similar.',
          },
          {
            term: 'artifacts',
            syntax: 'artifacts: paths: [dist/]',
            body: 'Pass **build output** to later **stages**; set **expire_in** so GitLab can clean up.',
          },
          {
            term: 'rules',
            syntax: 'rules: - if: $CI_PIPELINE_SOURCE == ...',
            body: 'Prefer **rules** over legacy **only/except** for branches, tags, and **merge request** pipelines.',
          },
        ],
      },
      {
        title: 'Minimal example',
        code: `stages:
  - test
  - build

variables:
  NODE_VERSION: "20"

test:
  stage: test
  image: node:\${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm test
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

build:
  stage: build
  image: node:\${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH`,
      },
      {
        title: 'Includes & environments',
        bullets: [
          '**include** — pull shared YAML from another project or template for **org-wide** standards.',
          '**Parent / child pipelines** — split huge mono-repo pipelines per service.',
          '**environment** — ties a job to a named env (e.g. **production**) and deployment URL.',
        ],
      },
      {
        title: 'Secrets in GitLab',
        bullets: [
          'Use **CI/CD Variables** — mark **masked** and **protected** where possible.',
          'Use **OIDC / JWT** to clouds instead of long-lived keys when supported.',
          'Avoid **debug** trace logs that print **CI_JOB_TOKEN** or custom secrets.',
        ],
      },
    ],
  },
  {
    id: 'helm-chart',
    title: 'Helm chart',
    tagline: 'Package Kubernetes YAML as a versioned chart with templated values.',
    sections: [
      {
        title: 'What a chart is',
        bullets: [
          'A **chart** is a directory: **templates/**, **values.yaml**, **Chart.yaml**, optional **charts/** deps.',
          '**helm install** renders **Go templates** + **values** into plain Kubernetes YAML.',
          'Charts are **versioned** — **helm upgrade** and **helm rollback** manage releases.',
        ],
      },
      {
        title: 'Chart.yaml & values.yaml',
        definitions: [
          {
            term: 'Chart.yaml',
            syntax: 'name:, version:, appVersion:',
            body: '**version** = chart package version; **appVersion** = upstream app version string (informational).',
          },
          {
            term: 'values.yaml',
            syntax: 'replicaCount:  image: repository: tag:',
            body: 'Default **inputs** to templates — override per env with **-f values-prod.yaml**.',
          },
          {
            term: 'helm show values',
            syntax: 'helm show values chart/',
            body: 'Print **all** defaults before you install a third-party chart.',
          },
        ],
      },
      {
        title: 'Template snippet',
        code: `# templates/deployment.yaml (conceptual)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: app
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}`,
      },
      {
        title: 'Helpers & subcharts',
        bullets: [
          '**templates/_helpers.tpl** — **`define`** named templates for labels and fullnames (DRY).',
          '**charts/** — bundled **subcharts** (e.g. database dependency).',
          '**helm dependency update** — refresh **Chart.lock** / vendored deps.',
        ],
      },
      {
        title: 'When to use Helm',
        bullets: [
          'Use Helm when you deploy the **same chart** to many clusters with different **values** files.',
          'For a **one-off** manifest set, **kubectl** + **Kustomize** may be simpler.',
          'Helm excels at **upstream charts** (ingress, DBs) and **release history**.',
        ],
      },
    ],
  },
  {
    id: 'bash-devops',
    title: 'Bash for DevOps',
    tagline: 'Robust shell scripts for deploy hooks, CI steps, and glue automation.',
    sections: [
      {
        title: 'Safety baseline',
        intro: 'Put these at the top of **maintainable** Bash used in CI and deploy hooks.',
        definitions: [
          {
            term: 'Shebang',
            syntax: '#!/usr/bin/env bash',
            body: 'Uses **bash** from **PATH** — more portable than hard-coded `/bin/bash`.',
          },
          {
            term: 'set -e',
            syntax: 'set -e',
            body: 'Exit immediately if a command **fails** (non-zero exit).',
          },
          {
            term: 'set -u',
            syntax: 'set -u',
            body: 'Error on **unset variables** — catches typos early.',
          },
          {
            term: 'set -o pipefail',
            syntax: 'set -o pipefail',
            body: 'Pipeline fails if **any** stage fails (not only the last).',
          },
        ],
      },
      {
        title: 'Variables & quoting',
        bullets: [
          'Quote expansions: **`"$var"`** and **`"${path}"`** — avoids **word-splitting** and **glob** bugs.',
          'Defaults: **`"${PORT:-3000}"`** when a var may be empty.',
          '**Here-doc** `<<EOF` feeds multi-line text; use a **quoted delimiter** on the closing line so variables are **not** expanded when you need literal text.',
        ],
      },
      {
        title: 'Minimal deploy-style script',
        code: `#!/usr/bin/env bash
set -euo pipefail

readonly ENV_NAME="\${1:-staging}"
echo "Deploying to \${ENV_NAME}"

if [[ ! -f "deploy/\${ENV_NAME}.env" ]]; then
  echo "Missing deploy/\${ENV_NAME}.env" >&2
  exit 1
fi

# shellcheck source=deploy/staging.env
source "deploy/\${ENV_NAME}.env"

kubectl apply -k "k8s/overlays/\${ENV_NAME}"`,
      },
      {
        title: 'Logging & traps',
        bullets: [
          '**echo ... >&2** — send errors to **stderr** so stdout stays pipe-friendly.',
          '**trap cleanup EXIT** — run cleanup on **success or failure** (temp files, mounts).',
          '**set -x** — trace commands in **CI**; turn off for noisy production loops.',
        ],
      },
      {
        title: 'When not to use Bash',
        bullets: [
          'Reach for **Python** or **Go** when you need **rich data structures**, HTTP retries, or heavy **JSON** beyond **jq**.',
          'Bash is best for **short glue** around **kubectl**, **aws**, **docker**, **curl**.',
        ],
      },
    ],
  },
  {
    id: 'makefile-devops',
    title: 'Makefile (DevOps)',
    tagline: 'Short commands your team can remember: make build, make test, make deploy.',
    sections: [
      {
        title: 'Why Make here',
        bullets: [
          '**Makefile** = team **playbook**: `make test`, `make build`, `make deploy`.',
          '**make help** target documents commands for new contributors.',
          'Well-written targets are **safe to re-run** (idempotent-ish).',
        ],
      },
      {
        title: 'Syntax essentials',
        intro: 'Recipes must use a **tab** before each shell line — spaces will not work.',
        definitions: [
          {
            term: 'target & prerequisites',
            syntax: 'build: install',
            body: '**build** runs after **install** finishes successfully.',
          },
          {
            term: '$@, $<, $^',
            syntax: '$@  $<  $^',
            body: '**$@** = target name; **$<** = first prerequisite; **$^** = all prerequisites.',
          },
          {
            term: '.PHONY',
            syntax: '.PHONY: build test',
            body: 'Declares targets that are **not files** so **make build** still runs if a file named **build** exists.',
          },
        ],
      },
      {
        title: 'Example',
        code: `.PHONY: help install test build docker-build

help:
	@echo "install  - npm ci"
	@echo "test     - run tests"
	@echo "build    - production build"

install:
	npm ci

test: install
	npm test

build: install
	npm run build

docker-build:
	docker build -t myapp:local .`,
      },
      {
        title: 'Variables & env',
        definitions: [
          {
            term: '?=',
            syntax: 'VAR ?= default',
            body: 'Set **default**; override from CLI: **`make VAR=prod`**.',
          },
          {
            term: '$(VAR)',
            syntax: 'docker build -t app:$(TAG) .',
            body: 'Expand **Make variables** inside recipes.',
          },
          {
            term: 'Secrets',
            syntax: '—',
            body: 'Avoid **`make SECRET=...`** (shell history); use **env from CI** or **.env** (not committed).',
          },
        ],
      },
      {
        title: 'CI integration',
        bullets: [
          'Call **`make test`** / **`make build`** from **GitHub Actions** or **GitLab CI** so local == CI.',
          'Keep **docker-build** fast with **BuildKit** and **layer cache**.',
        ],
      },
    ],
  },
]

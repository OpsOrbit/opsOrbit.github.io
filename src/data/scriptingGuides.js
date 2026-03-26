/**
 * Beginner-friendly scripting & config guides (not CLI commands).
 */
export const SCRIPTING_GUIDES = [
  {
    id: 'dockerfile',
    title: 'Dockerfile',
    tagline: 'Recipe that turns your app into a runnable container image.',
    sections: [
      {
        title: 'What you are building',
        body: 'A Dockerfile is a text file with instructions. Docker reads it top to bottom and produces an **image** (a frozen filesystem + metadata). From that image you run **containers** (running instances).',
      },
      {
        title: 'Typical order (beginner mental model)',
        body: '1) Start from a **base image** (`FROM`). 2) **Set working directory** (`WORKDIR`). 3) **Copy dependency files** and install (`COPY`, `RUN`) so Docker can cache layers. 4) **Copy app source**. 5) **Expose port** (`EXPOSE` documents intent; publish with `docker run -p`). 6) **Default command** (`CMD` or `ENTRYPOINT`).',
      },
      {
        title: 'Minimal Node example',
        code: `# Base OS + Node
FROM node:20-alpine
WORKDIR /app

# Install deps first (better layer cache)
COPY package.json package-lock.json ./
RUN npm ci

# App code
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        title: 'Tips',
        body: 'Use **.dockerignore** (like .gitignore) so you do not copy `node_modules`, secrets, or huge folders into the build context. Prefer **small base images** (e.g. `alpine` variants) when you can. One **main process per container** is the usual rule.',
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
        body: 'A `compose.yaml` (or `docker-compose.yml`) describes **services** (containers), **networks**, and **volumes**. You run `docker compose up` and Compose creates everything with the right links.',
      },
      {
        title: 'Core pieces',
        body: '**services**: each has an `image` or `build` context, `ports`, `environment`, maybe `depends_on`. **volumes**: persist data outside the container. **networks**: services on the same Compose project can reach each other **by service name** as hostname.',
      },
      {
        title: 'Minimal example',
        code: `services:
  web:
    build: .
    ports:
      - "8080:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
      },
      {
        title: 'Beginner pitfalls',
        body: '`depends_on` only waits for the container to **start**, not for Postgres to be **ready**. For production you often add retries or a healthcheck. Never commit real **passwords**; use env files or secrets managers.',
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
        body: 'Most teams start with **Declarative** pipelines: a `pipeline { }` block with `agent`, `stages`, and `steps`. It is structured and Jenkins validates it. **Scripted** is more flexible Groovy but harder for beginners.',
      },
      {
        title: 'Minimal Declarative pipeline',
        code: `pipeline {
  agent any
  stages {
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
}`,
      },
      {
        title: 'Keywords to learn next',
        body: '**post { always { ... } }** — cleanup or reports. **environment { }** — inject variables. **when { branch "main" }** — run stages only on certain branches. **parameters** — manual inputs. Store the file as **Jenkinsfile** in repo root (common convention).',
      },
    ],
  },
  {
    id: 'ansible-playbook',
    title: 'Ansible playbook',
    tagline: 'Ordered list of tasks applied to hosts (YAML).',
    sections: [
      {
        title: 'Structure',
        body: 'A playbook is YAML. Top level is usually a **list of plays**. Each play has `hosts`, optional `become: yes` for sudo, and a `tasks` list. Each **task** calls a **module** (e.g. `copy`, `service`, `template`).',
      },
      {
        title: 'Minimal example',
        code: `---
- name: Configure web server
  hosts: webservers
  become: yes
  tasks:
    - name: Ensure nginx is installed
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Start and enable nginx
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: yes`,
      },
      {
        title: 'Variables & idempotence',
        body: 'Use `{{ variable_name }}` for Jinja2 templating. Ansible is **idempotent**: running again should not keep changing the system if nothing drifted. **Handlers** restart services only when notified by a task that changed something.',
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
        body: 'A **role** bundles everything needed for one concern (e.g. `nginx`, `postgresql`). Playbooks stay short: `- roles: [nginx]`. You can share roles via **Ansible Galaxy** or an internal Git repo.',
      },
      {
        title: 'Standard layout',
        body: '`roles/myrole/tasks/main.yml` — main task list. `handlers/main.yml` — notified handlers. `templates/` — Jinja2 files deployed with `template`. `files/` — static files with `copy`. `defaults/main.yml` — overridable variables. `vars/` — stronger precedence (use sparingly).',
      },
      {
        title: 'site.yml calling roles',
        code: `---
- name: Apply common roles
  hosts: all
  become: yes
  roles:
    - role: common
    - role: nginx
      vars:
        nginx_port: 8080`,
      },
      {
        title: 'Beginner tip',
        body: 'Start with a **flat playbook**; when a second playbook repeats the same tasks, extract a role. Keep **role names** short and focused on one service or pattern.',
      },
    ],
  },
  {
    id: 'terraform',
    title: 'Terraform (.tf)',
    tagline: 'Describe infrastructure; Terraform plans and applies changes via providers.',
    sections: [
      {
        title: 'Workflow',
        body: '**Write** HCL in `.tf` files. **`terraform init`** downloads providers and sets backend. **`terraform plan`** shows what would change. **`terraform apply`** creates/updates/deletes real resources. State tracks what exists (local file or remote backend).',
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
  region = "us-east-1"
}

resource "aws_s3_bucket" "logs" {
  bucket = "my-company-logs-unique"
}`,
      },
      {
        title: 'Modules & variables',
        body: 'Put repeated blocks in a **module** (like a function). Use **variables** for names, regions, sizes — never hard-code secrets; use **Terraform variables** from CI or **vault** integrations. **outputs** expose values (e.g. load balancer DNS) to other stacks.',
      },
    ],
  },
  {
    id: 'kubernetes-manifest',
    title: 'Kubernetes manifest',
    tagline: 'YAML describing desired Pods, Services, Deployments, and more.',
    sections: [
      {
        title: 'API basics',
        body: 'Every object has **apiVersion**, **kind**, **metadata** (name, namespace, labels), and **spec**. The **control plane** reconciles spec with the cluster. **Labels** select pods; **Services** give stable DNS to a set of pods.',
      },
      {
        title: 'Deployment + Service (minimal)',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
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
        title: 'What to learn next',
        body: '**ConfigMap** and **Secret** for configuration. **resources.requests/limits** for CPU/memory. **livenessProbe** / **readinessProbe** for health. Use `kubectl apply -f file.yaml` to send manifests to the cluster.',
      },
    ],
  },
]

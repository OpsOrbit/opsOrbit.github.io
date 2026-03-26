/**
 * Plain-language context for each tool: what it is, why teams use it, and how it shows up in daily work.
 */
export const TOOL_EXPLANATIONS = {
  git: {
    whatItIs:
      'Git keeps a history of every change to your project files. You work in a folder on your machine, save snapshots called commits, and can share or merge work with others through remote repositories (like GitHub).',
    whyWeUseIt:
      'Without version control, people overwrite each other’s work and nobody can roll back a bad change safely. Git gives you branches to experiment, pull requests for review, and a clear timeline of who changed what and when.',
    howWeUseIt:
      'We type Git commands in the terminal because scripts, CI pipelines, and tutorials all use the same CLI. Once you know `git status`, `commit`, `push`, and `branch`, the same ideas work everywhere—your laptop, a build server, or a container.',
  },

  linux: {
    whatItIs:
      'Here “Linux” means the everyday command-line tools that come with Linux and Unix systems: listing files, searching text, managing processes, networking helpers, and small utilities chained together with pipes.',
    whyWeUseIt:
      'Most servers and cloud VMs run Linux. DevOps work often means SSH into a machine and fix things quickly without a GUI. The same commands also work inside containers and in CI jobs.',
    howWeUseIt:
      'Commands are short and composable (e.g. `grep`, `find`, `awk`, `curl`) so you can build one-liners and scripts. We learn them “by muscle memory” because they are fast, scriptable, and identical across millions of servers.',
  },

  aws: {
    whatItIs:
      'The AWS CLI is a program that talks to Amazon’s cloud APIs from your terminal. Instead of only clicking in the browser console, you can create buckets, start instances, tail logs, and manage IAM from scripts.',
    whyWeUseIt:
      'Automation and repeatability: the same command can run in a pipeline, in a runbook, or on your laptop. It reduces mistakes (no “wrong click”) and lets you store infrastructure steps in Git.',
    howWeUseIt:
      'You configure credentials once (`aws configure` or IAM roles), then call `aws <service> <action>` with flags or JSON. Output is often JSON so it can be piped to `jq` or other tools—built for machines and humans together.',
  },

  helm: {
    whatItIs:
      'Helm is a package manager for Kubernetes. A “chart” bundles Kubernetes YAML (Deployments, Services, ConfigMaps) with values you can tweak—like an app store for cluster resources.',
    whyWeUseIt:
      'Raw Kubernetes manifests get duplicated and hard to upgrade. Helm gives versioning, rollbacks, and one command to install or upgrade complex apps (databases, ingress controllers, monitoring stacks).',
    howWeUseIt:
      'You use `helm install` / `helm upgrade` with a chart name and a values file. Charts are templated, so the same chart can work for dev, staging, and prod by changing values—not by copying YAML by hand.',
  },

  'github-actions': {
    whatItIs:
      'GitHub Actions runs workflows when something happens in your GitHub repo—push, pull request, schedule, or manual. Workflows are YAML files that define jobs, steps, and which runner executes them.',
    whyWeUseIt:
      'It keeps CI/CD next to your code: build, test, deploy, and security scans without wiring a separate system—if the repo is already on GitHub, Actions is a natural fit.',
    howWeUseIt:
      'You commit `.github/workflows/*.yml`. Steps can run shell commands or reuse published “actions.” Locally you might use `gh` or `act` to trigger or mimic runs, but the source of truth is the YAML in the repo.',
  },

  kubernetes: {
    whatItIs:
      'Kubernetes (K8s) runs containers across many machines: it schedules pods, restarts failed apps, exposes services, and scales them. `kubectl` is the CLI that sends instructions to the cluster’s API server.',
    whyWeUseIt:
      'At scale you need more than “docker run” on one VM. Kubernetes handles rolling updates, health checks, secrets, and networking so teams can ship the same way in dev and production.',
    howWeUseIt:
      'You describe desired state with YAML (`kubectl apply`) or use `kubectl get/describe/logs/exec` to debug. Commands mirror the API (resources, names, namespaces), which is why they look consistent once you learn the pattern.',
  },

  terraform: {
    whatItIs:
      'Terraform is infrastructure as code: you write `.tf` files that declare what cloud resources should exist (VPCs, subnets, databases, DNS). Terraform compares that to reality and creates, updates, or destroys resources to match.',
    whyWeUseIt:
      'Clicking in a cloud console doesn’t scale and isn’t reviewable. Terraform gives plans you can approve in PRs, state you can back up, and the same workflow for AWS, Azure, GCP, and many SaaS providers.',
    howWeUseIt:
      'You run `terraform init` once per project, then `plan` to preview and `apply` to execute. We use HCL (HashiCorp language) because it’s readable and maps cleanly to providers’ APIs—changes are explicit and repeatable.',
  },

  docker: {
    whatItIs:
      'Docker packages an application with its dependencies into an image. A container is a running instance of that image—lightweight, isolated, and consistent from your laptop to production.',
    whyWeUseIt:
      '“Works on my machine” goes away when everyone runs the same image. CI builds it once; Kubernetes or Docker Compose runs it the same way everywhere.',
    howWeUseIt:
      'You build with a Dockerfile, push to a registry, then `docker run` or let an orchestrator pull the image. CLI commands map to image layers, networks, and volumes—what you type is what the engine does, which helps debugging.',
  },

  ansible: {
    whatItIs:
      'Ansible configures servers and devices using playbooks (YAML) and modules. It usually connects over SSH and runs tasks without installing a permanent agent on the target.',
    whyWeUseIt:
      'You can bootstrap dozens of VMs, enforce security baselines, or deploy apps in one playbook. It’s popular when you want agentless, readable automation that both ops and developers can follow.',
    howWeUseIt:
      'You define inventory (hosts/groups) and run `ansible-playbook`. Tasks are idempotent (“ensure package X is installed”), so re-running is safe—Ansible checks state instead of blindly re-executing every time.',
  },

  maven: {
    whatItIs:
      'Maven is a build and dependency tool for Java (and JVM) projects. It uses a `pom.xml` to declare libraries, plugins, and a standard lifecycle: compile, test, package, install.',
    whyWeUseIt:
      'Java projects need consistent dependency versions and build steps. Maven centralizes that so new contributors run `mvn test` and get the same result as CI.',
    howWeUseIt:
      'Goals like `mvn clean package` follow conventions (src/main/java, etc.). We use the CLI because IDEs call the same Maven underneath—scripts and pipelines stay portable and boring in a good way.',
  },

  shell: {
    whatItIs:
      'The shell (usually Bash) reads commands you type, runs programs, connects them with pipes, and runs scripts. It’s the glue between tools, files, and APIs on Unix-like systems.',
    whyWeUseIt:
      'Almost every tutorial, Dockerfile `RUN` line, and CI step is ultimately shell. Understanding variables, loops, and exit codes makes you effective in deploy scripts and incident response.',
    howWeUseIt:
      'We write `.sh` scripts or one-liners because they’re quick to iterate and work the same in WSL, macOS, and Linux servers. Quoting, redirection, and `set -e` exist to handle messy real-world filenames and failures safely.',
  },
}

export function getToolExplanation(toolId) {
  return TOOL_EXPLANATIONS[toolId] || null
}

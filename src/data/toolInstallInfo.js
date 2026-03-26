/**
 * Installation hints per tool — Windows, Ubuntu (apt), and other Linux distros.
 * Official URLs are the primary upstream / docs entry points.
 */
export const TOOL_INSTALL = {
  git: {
    officialUrl: 'https://git-scm.com/downloads',
    officialLabel: 'git-scm.com — Downloads',
    ubuntu: {
      steps: [
        'sudo apt update && sudo apt install -y git',
        'git --version',
      ],
    },
    linux: {
      steps: [
        'Fedora / RHEL / Rocky: sudo dnf install -y git',
        'Arch Linux: sudo pacman -S git',
        'openSUSE: sudo zypper install git',
        'Alpine: apk add git',
      ],
    },
    windows: {
      steps: [
        'winget install --id Git.Git -e --source winget',
        'Or download the installer from the official site (git-scm.com).',
        'Open Git Bash or PowerShell and run: git --version',
      ],
    },
  },

  linux: {
    officialUrl: 'https://www.gnu.org/software/coreutils/manual/',
    officialLabel: 'GNU Coreutils (reference)',
    note: 'GNU core utilities and Bash are usually pre-installed on Linux. On Windows, use WSL2 or Git Bash for the same commands.',
    ubuntu: {
      steps: [
        'Most tools are already installed. Refresh packages: sudo apt update',
        'Common extras: sudo apt install -y curl wget jq ripgrep fd-find htop',
        'Optional: sudo apt install -y build-essential procps',
      ],
    },
    linux: {
      steps: [
        'Fedora: sudo dnf install -y coreutils curl wget jq ripgrep htop',
        'Arch: sudo pacman -S coreutils curl wget jq ripgrep htop',
        'Alpine: apk add coreutils curl wget jq ripgrep htop',
      ],
    },
    windows: {
      steps: [
        'Recommended: install WSL2 (Ubuntu) from Microsoft Store, then use Linux steps inside WSL.',
        'Or use Git Bash (comes with Git for Windows) for many POSIX commands.',
        'PowerShell equivalents exist for some tasks; see Microsoft docs for details.',
      ],
    },
  },

  aws: {
    officialUrl: 'https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html',
    officialLabel: 'AWS — Install or update AWS CLI v2',
    ubuntu: {
      steps: [
        'sudo apt update && sudo apt install -y unzip curl',
        'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"',
        'unzip -q awscliv2.zip && sudo ./aws/install',
        'aws --version',
      ],
    },
    linux: {
      steps: [
        'Same zip installer works on most x86_64 Linux: download awscli-exe-linux-x86_64.zip from AWS docs.',
        'unzip && sudo ./aws/install',
        'ARM64: use awscli-exe-linux-aarch64.zip from the same documentation page.',
      ],
    },
    windows: {
      steps: [
        'Download the AWS CLI MSI installer from the official AWS CLI install page.',
        'Or: winget install Amazon.AWSCLI',
        'Open a new PowerShell: aws --version',
      ],
    },
  },

  helm: {
    officialUrl: 'https://helm.sh/docs/intro/install/',
    officialLabel: 'Helm — Installing Helm',
    ubuntu: {
      steps: [
        'curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash',
        'Or add Helm apt repo per https://helm.sh/docs/intro/install/ (Debian/Ubuntu section).',
        'helm version',
      ],
    },
    linux: {
      steps: [
        'curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash',
        'Or install from your distro / Snap / package manager per official docs.',
        'helm version',
      ],
    },
    windows: {
      steps: [
        'choco install kubernetes-helm',
        'Or winget install Helm.Helm',
        'Or download the Windows zip from GitHub releases (helm/helm).',
        'helm version',
      ],
    },
  },

  'github-actions': {
    officialUrl: 'https://docs.github.com/en/actions',
    officialLabel: 'GitHub Docs — GitHub Actions',
    note: 'Workflows run on GitHub-hosted or self-hosted runners; nothing is installed on your PC to “use Actions” beyond Git + a repo. For local workflow testing, use act or the GitHub CLI.',
    ubuntu: {
      steps: [
        'sudo apt update && sudo apt install -y git',
        'Install GitHub CLI: see https://github.com/cli/cli#installation (deb repo).',
        'Optional local runner: act — https://github.com/nektos/act#installation',
        'gh auth login',
      ],
    },
    linux: {
      steps: [
        'Install git and GitHub CLI from https://github.com/cli/cli#installation',
        'Optional: install act for local workflow runs — https://github.com/nektos/act',
        'gh auth login',
      ],
    },
    windows: {
      steps: [
        'winget install GitHub.cli',
        'git is required — install Git for Windows if needed.',
        'Optional: act for local runs — scoop install actcli or see nektos/act releases.',
        'gh auth login',
      ],
    },
  },

  kubernetes: {
    officialUrl: 'https://kubernetes.io/docs/tasks/tools/',
    officialLabel: 'Kubernetes — Install Tools',
    ubuntu: {
      steps: [
        'kubectl (snap): sudo snap install kubectl --classic',
        'Or install from Kubernetes apt repository — see official “Install kubectl on Linux” page.',
        'kubectl version --client',
      ],
    },
    linux: {
      steps: [
        'Download kubectl binary for your arch from Kubernetes release artifacts, or use curl install snippet from kubernetes.io docs.',
        'Minikube / kind / k3d are optional local clusters — links on the same tools page.',
        'kubectl version --client',
      ],
    },
    windows: {
      steps: [
        'winget install Kubernetes.kubectl',
        'Or use Chocolatey: choco install kubernetes-cli',
        'kubectl version --client',
      ],
    },
  },

  terraform: {
    officialUrl: 'https://developer.hashicorp.com/terraform/install',
    officialLabel: 'HashiCorp — Install Terraform',
    ubuntu: {
      steps: [
        'Follow “Linux” tab: add HashiCorp apt repo, then sudo apt install terraform',
        'Commands are listed at developer.hashicorp.com/terraform/install (Debian/Ubuntu).',
        'terraform -version',
      ],
    },
    linux: {
      steps: [
        'Add HashiCorp package repo for your distro (RPM/DNF or ZIP) — see official install page.',
        'Or download the Linux zip, unzip, and move terraform to your PATH.',
        'terraform -version',
      ],
    },
    windows: {
      steps: [
        'choco install terraform',
        'Or winget install Hashicorp.Terraform',
        'Or download the Windows zip from HashiCorp releases and add to PATH.',
        'terraform -version',
      ],
    },
  },

  docker: {
    officialUrl: 'https://docs.docker.com/engine/install/',
    officialLabel: 'Docker — Install Docker Engine',
    ubuntu: {
      steps: [
        'Uninstall old versions if any, then follow “Install Docker Engine on Ubuntu” on docs.docker.com.',
        'Summary: add Docker apt repo, sudo apt install docker-ce docker-ce-cli containerd.io',
        'sudo usermod -aG docker $USER && newgrp docker',
        'docker run hello-world',
      ],
    },
    linux: {
      steps: [
        'Pick your distro: Fedora, Debian, CentOS, etc. — each has a page under docs.docker.com/engine/install/',
        'Rootless and convenience scripts are documented on the same site.',
        'docker run hello-world',
      ],
    },
    windows: {
      steps: [
        'Install Docker Desktop for Windows from https://docs.docker.com/desktop/install/windows-install/',
        'Enable WSL2 backend when prompted (recommended).',
        'docker run hello-world',
      ],
    },
  },

  ansible: {
    officialUrl: 'https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html',
    officialLabel: 'Ansible — Installation Guide',
    ubuntu: {
      steps: [
        'sudo apt update && sudo apt install -y software-properties-common',
        'sudo add-apt-repository --yes --update ppa:ansible/ansible',
        'sudo apt install -y ansible',
        'ansible --version',
      ],
    },
    linux: {
      steps: [
        'pipx install ansible-core (recommended isolated install), or pip with a venv.',
        'Fedora: sudo dnf install ansible',
        'Or use OS packages from Ansible docs for your distro.',
      ],
    },
    windows: {
      steps: [
        'Native Windows control nodes are not supported for Ansible; use WSL2 (Ubuntu) and follow Ubuntu steps.',
        'Alternatively run Ansible from a Linux VM or container.',
        'Inside WSL: sudo apt install ansible (after adding PPA if needed).',
      ],
    },
  },

  maven: {
    officialUrl: 'https://maven.apache.org/install.html',
    officialLabel: 'Apache Maven — Installation',
    ubuntu: {
      steps: [
        'sudo apt update && sudo apt install -y maven',
        'mvn -version',
        'For latest release, download binary zip from maven.apache.org and configure PATH/M2_HOME per install guide.',
      ],
    },
    linux: {
      steps: [
        'Download apache-maven-*-bin.tar.gz from https://maven.apache.org/download.cgi',
        'Extract to /opt, symlink bin/mvn into PATH, or use SDKMAN: sdk install maven',
        'mvn -version',
      ],
    },
    windows: {
      steps: [
        'choco install maven',
        'Or download the binary zip from maven.apache.org, unzip, add bin to PATH.',
        'Requires JDK installed (e.g. Temurin / Oracle JDK).',
        'mvn -version',
      ],
    },
  },

  shell: {
    officialUrl: 'https://www.gnu.org/software/bash/',
    officialLabel: 'GNU Bash',
    note: 'Bash ships on macOS (older) and almost all Linux distros. Windows users typically use WSL or Git Bash.',
    ubuntu: {
      steps: [
        'bash is usually pre-installed. Check: bash --version',
        'Update: sudo apt update && sudo apt install -y bash',
      ],
    },
    linux: {
      steps: [
        'bash --version',
        'Install/update via distro package manager (bash package).',
      ],
    },
    windows: {
      steps: [
        'Use WSL: wsl --install (Ubuntu), then bash is available inside WSL.',
        'Or install Git for Windows and use Git Bash.',
        'PowerShell is separate; for bash syntax, prefer WSL or Git Bash.',
      ],
    },
  },
}

export function getToolInstall(toolId) {
  return TOOL_INSTALL[toolId] || null
}

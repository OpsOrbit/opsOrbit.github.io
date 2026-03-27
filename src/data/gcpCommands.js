export const GCP_COMMANDS = [
  {
    id: 'gcp-auth-login',
    tool: 'gcp',
    category: 'Setup & Identity',
    level: 'beginner',
    name: 'Login to Google Cloud',
    command: 'gcloud auth login',
    description: 'Authenticate gcloud CLI in your user account.',
    explanation: 'Use gcloud auth list to check active account.'
  },
  {
    id: 'gcp-project-set',
    tool: 'gcp',
    category: 'Setup & Identity',
    level: 'beginner',
    name: 'Set active project',
    command: 'gcloud config set project my-gcp-project',
    description: 'Set default project for gcloud commands.',
    explanation: 'This avoids passing --project on every command.'
  },
  {
    id: 'gcp-compute-create',
    tool: 'gcp',
    category: 'Compute',
    level: 'intermediate',
    name: 'Create Compute Engine VM',
    command: 'gcloud compute instances create vm-devops --zone=us-central1-a --machine-type=e2-medium --image-family=debian-12 --image-project=debian-cloud',
    description: 'Provision a new VM instance in Compute Engine.',
    explanation: 'Add --tags and firewall rules for inbound access.'
  },
  {
    id: 'gcp-gke-creds',
    tool: 'gcp',
    category: 'Kubernetes',
    level: 'intermediate',
    name: 'Get GKE credentials',
    command: 'gcloud container clusters get-credentials gke-dev --region us-central1',
    description: 'Configure kubectl to talk to a GKE cluster.',
    explanation: 'Then run kubectl get nodes to validate connectivity.'
  },
  {
    id: 'gcp-gcr-auth',
    tool: 'gcp',
    category: 'Containers',
    level: 'advanced',
    name: 'Configure Docker auth',
    command: 'gcloud auth configure-docker',
    description: 'Allow Docker push/pull to Google Artifact Registry.',
    explanation: 'For Artifact Registry, include regional hostnames if prompted.'
  },
  {
    id: 'gcp-storage-list',
    tool: 'gcp',
    category: 'Storage',
    level: 'beginner',
    name: 'List Cloud Storage buckets',
    command: 'gcloud storage buckets list',
    description: 'List buckets available in the active project.',
    explanation: 'Use gcloud storage ls gs://bucket-name for object listing.'
  },
]

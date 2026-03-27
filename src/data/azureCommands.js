export const AZURE_COMMANDS = [
  {
    id: 'az-login',
    tool: 'azure',
    category: 'Setup & Identity',
    level: 'beginner',
    name: 'Login to Azure',
    command: 'az login',
    description: 'Authenticate Azure CLI using browser/device login.',
    explanation: 'For headless systems, use --use-device-code.'
  },
  {
    id: 'az-account-set',
    tool: 'azure',
    category: 'Setup & Identity',
    level: 'beginner',
    name: 'Select subscription',
    command: 'az account set --subscription "My-Subscription"',
    description: 'Set the active subscription for subsequent commands.',
    explanation: 'Use az account list -o table to see available subscriptions.'
  },
  {
    id: 'az-group-create',
    tool: 'azure',
    category: 'Resource Groups',
    level: 'beginner',
    name: 'Create resource group',
    command: 'az group create --name rg-devops --location eastus',
    description: 'Create a logical container for Azure resources.',
    explanation: 'Most Azure resources are created inside a resource group.'
  },
  {
    id: 'az-vm-create',
    tool: 'azure',
    category: 'Compute',
    level: 'intermediate',
    name: 'Create VM',
    command: 'az vm create --resource-group rg-devops --name vm01 --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys',
    description: 'Provision a Linux virtual machine quickly.',
    explanation: 'Use --size to choose VM shape and cost.'
  },
  {
    id: 'az-acr-login',
    tool: 'azure',
    category: 'Containers',
    level: 'intermediate',
    name: 'Login to ACR',
    command: 'az acr login --name myregistry',
    description: 'Authenticate Docker with Azure Container Registry.',
    explanation: 'Then docker push myregistry.azurecr.io/app:tag.'
  },
  {
    id: 'az-aks-credentials',
    tool: 'azure',
    category: 'Kubernetes',
    level: 'advanced',
    name: 'Fetch AKS kubeconfig',
    command: 'az aks get-credentials --resource-group rg-devops --name aks-dev --overwrite-existing',
    description: 'Merge AKS cluster credentials into local kubeconfig.',
    explanation: 'Use kubectl config get-contexts to verify current context.'
  },
]

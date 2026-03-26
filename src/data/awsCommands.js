/**
 * AWS CLI command reference — common operations for identity, configuration, S3, EC2, EKS, and logs.
 */
export const AWS_COMMANDS = [
  {
    id: 'aws-configure',
    tool: 'aws',
    category: 'Setup & Identity',
    level: 'beginner',
    name: 'Configure CLI profile',
    command: 'aws configure',
    description: 'Set access key, secret, region, and output format for the default profile.',
    explanation: 'Creates/updates credentials and config in ~/.aws.'
  },
  {
    id: 'aws-sts-get-caller-identity',
    tool: 'aws',
    category: 'Setup & Identity',
    level: 'beginner',
    name: 'Who am I',
    command: 'aws sts get-caller-identity',
    description: 'Show current account, ARN, and user/role being used by the CLI.',
    explanation: 'Use this first when debugging permissions or profile usage.'
  },
  {
    id: 'aws-s3-ls',
    tool: 'aws',
    category: 'S3 Storage',
    level: 'beginner',
    name: 'List S3 buckets',
    command: 'aws s3 ls',
    description: 'List all S3 buckets visible to your current identity.',
    explanation: 'Good quick check for account/permission scope.'
  },
  {
    id: 'aws-s3-cp-recursive',
    tool: 'aws',
    category: 'S3 Storage',
    level: 'intermediate',
    name: 'Upload folder to S3',
    command: 'aws s3 cp ./dist s3://my-bucket/site --recursive',
    description: 'Copy a local folder to S3 recursively.',
    explanation: 'Common for static site deployment and artifact publishing.'
  },
  {
    id: 'aws-s3-sync',
    tool: 'aws',
    category: 'S3 Storage',
    level: 'intermediate',
    name: 'Sync local and S3',
    command: 'aws s3 sync ./backup s3://my-bucket/backup --delete',
    description: 'Sync directory changes to S3; delete removes objects not present locally.',
    explanation: 'Useful for mirror-style backups and deployments.'
  },
  {
    id: 'aws-ec2-describe-instances',
    tool: 'aws',
    category: 'EC2 Compute',
    level: 'intermediate',
    name: 'List EC2 instances',
    command: 'aws ec2 describe-instances --query "Reservations[].Instances[].{Id:InstanceId,State:State.Name,Type:InstanceType}" --output table',
    description: 'Show instance IDs, state, and type in table format.',
    explanation: 'Use --filters to limit by tag/state for cleaner output.'
  },
  {
    id: 'aws-ec2-start-instances',
    tool: 'aws',
    category: 'EC2 Compute',
    level: 'advanced',
    name: 'Start instance',
    command: 'aws ec2 start-instances --instance-ids i-0123456789abcdef0',
    description: 'Start one or more stopped EC2 instances.',
    explanation: 'Pair with stop-instances for cost control workflows.'
  },
  {
    id: 'aws-eks-update-kubeconfig',
    tool: 'aws',
    category: 'EKS & Kubernetes',
    level: 'intermediate',
    name: 'Connect kubectl to EKS',
    command: 'aws eks update-kubeconfig --name my-cluster --region us-east-1',
    description: 'Write/update kubeconfig context for an EKS cluster.',
    explanation: 'Required before running kubectl against EKS.'
  },
  {
    id: 'aws-logs-tail',
    tool: 'aws',
    category: 'CloudWatch Logs',
    level: 'advanced',
    name: 'Tail CloudWatch logs',
    command: 'aws logs tail /aws/lambda/my-function --follow --since 30m',
    description: 'Stream recent CloudWatch log events in real time.',
    explanation: 'Handy for Lambda/API troubleshooting without opening console.'
  },
]

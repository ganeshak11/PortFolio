#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Manual one-shot build + ECR push + ECS deploy
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh
#
# Prerequisites:
#   - AWS CLI v2 configured (aws configure) or IAM role attached
#   - Docker daemon running
#   - jq installed  (sudo apt-get install jq)
# =============================================================================
set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
AWS_REGION="${AWS_REGION:-us-east-1}"          # override with: export AWS_REGION=eu-west-1
ECR_REPOSITORY="${ECR_REPOSITORY:-portfolio}"
ECS_CLUSTER="${ECS_CLUSTER:-portfolio-cluster}"
ECS_SERVICE="${ECS_SERVICE:-portfolio-service}"
TASK_DEFINITION_FILE="aws/task-definition.json"
CONTAINER_NAME="portfolio"
# ──────────────────────────────────────────────────────────────────────────────

echo "==> Fetching AWS account ID..."
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
IMAGE_TAG=$(git rev-parse --short HEAD)
FULL_IMAGE="${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"

echo "==> Logging in to ECR (${ECR_REGISTRY})..."
aws ecr get-login-password --region "${AWS_REGION}" | \
  docker login --username AWS --password-stdin "${ECR_REGISTRY}"

echo "==> Building Docker image..."
docker build -t "${FULL_IMAGE}" -t "${ECR_REGISTRY}/${ECR_REPOSITORY}:latest" .

echo "==> Pushing image to ECR..."
docker push "${FULL_IMAGE}"
docker push "${ECR_REGISTRY}/${ECR_REPOSITORY}:latest"

echo "==> Rendering new task definition with image: ${FULL_IMAGE}..."
NEW_TASK_DEF=$(jq --arg IMAGE "${FULL_IMAGE}" \
  '.containerDefinitions[0].image = $IMAGE' "${TASK_DEFINITION_FILE}")

echo "==> Registering task definition..."
NEW_TASK_ARN=$(echo "${NEW_TASK_DEF}" | \
  aws ecs register-task-definition \
    --cli-input-json file:///dev/stdin \
    --query "taskDefinition.taskDefinitionArn" \
    --output text)

echo "==> Updating ECS service to use: ${NEW_TASK_ARN}..."
aws ecs update-service \
  --cluster  "${ECS_CLUSTER}" \
  --service  "${ECS_SERVICE}" \
  --task-definition "${NEW_TASK_ARN}" \
  --force-new-deployment \
  --region "${AWS_REGION}" > /dev/null

echo "==> Waiting for service to stabilise..."
aws ecs wait services-stable \
  --cluster "${ECS_CLUSTER}" \
  --services "${ECS_SERVICE}" \
  --region "${AWS_REGION}"

echo ""
echo "✅  Deployment complete! Image: ${FULL_IMAGE}"

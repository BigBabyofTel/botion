#!/bin/bash

# GitHub Secrets Validation Script
# This script helps verify that all required environment variables are present
# Run with: bash check-env.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Checking required environment variables...${NC}\n"

REQUIRED_VARS=(
  "CONVEX_DEPLOYMENT"
  "NEXT_PUBLIC_CONVEX_URL"
  "NEXT_PUBLIC_CONVEX_SITE_URL"
  "NEXT_PUBLIC_SITE_URL"
  "SITE_URL"
  "EDGE_STORE_ACCESS_KEY"
  "EDGE_STORE_SECRET_KEY"
  "GITHUB_CLIENT_SECRET"
  "GITHUB_CLIENT_ID"
  "CONVEX_DEPLOY_KEY"
)

MISSING_VARS=()
FOUND_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    MISSING_VARS+=("$var")
    echo -e "${RED}✗${NC} $var - ${RED}NOT SET${NC}"
  else
    FOUND_VARS+=("$var")
    # Mask sensitive values
    if [[ "$var" == *"SECRET"* ]] || [[ "$var" == *"KEY"* ]]; then
      value="${!var:0:4}****"
    else
      value="${!var}"
    fi
    echo -e "${GREEN}✓${NC} $var - ${GREEN}SET${NC} ($value)"
  fi
done

echo ""
echo -e "Summary: ${GREEN}${#FOUND_VARS[@]} found${NC}, ${RED}${#MISSING_VARS[@]} missing${NC}"

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
  echo -e "\n${RED}Missing variables:${NC}"
  for var in "${MISSING_VARS[@]}"; do
    echo "  - $var"
  done
  echo -e "\n${YELLOW}Please add these as GitHub Secrets:${NC}"
  echo "See GITHUB_SECRETS_SETUP.md for instructions"
  exit 1
else
  echo -e "\n${GREEN}All required environment variables are set!${NC}"
  exit 0
fi


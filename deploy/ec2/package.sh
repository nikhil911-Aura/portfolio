#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
test -f .next/standalone/server.js
test -d .next/standalone/node_modules/next
# Fixed artifact directory prevents stale files in reused build workspaces.
rm -rf build/codedeploy
mkdir -p build/codedeploy/app build/codedeploy/deploy
cp -a .next/standalone/. build/codedeploy/app/
cp -a public build/codedeploy/app/public
cp -a .next/static build/codedeploy/app/.next/static
# Next tracing can include local dotenv files. Never ship them.
find build/codedeploy/app -type f -name '.env*' -delete
rm -rf build/codedeploy/app/.next/cache
cp appspec.yml build/codedeploy/
cp -a deploy/ec2 build/codedeploy/deploy/
chmod 755 build/codedeploy/deploy/ec2/*.sh
test -f build/codedeploy/app/.next/BUILD_ID
test -d build/codedeploy/app/.next/static

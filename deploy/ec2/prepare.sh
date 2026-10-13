#!/usr/bin/env bash
set -euo pipefail
test -x /usr/bin/node
test "$(/usr/bin/node -p 'process.versions.node.split(".")[0]')" = 22
id portfolio >/dev/null
test -s /etc/portfolio/portfolio.env
test -f /etc/nginx/sites-enabled/portfolio
nginx -t
# Also stop on first deploy, when CodeDeploy skips ApplicationStop.
bash "$(dirname "${BASH_SOURCE[0]}")/stop.sh"
# This fixed directory belongs exclusively to this deployment.
test ! -L /opt/portfolio
test ! -L /opt/portfolio/app
install -d -m 755 /opt/portfolio
rm -rf /opt/portfolio/app
install -d -m 755 /opt/portfolio/app

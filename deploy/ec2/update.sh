#!/usr/bin/env bash
set -euo pipefail
test -f /opt/portfolio/app/server.js
test -f /opt/portfolio/app/.next/BUILD_ID
chown -R root:portfolio /opt/portfolio/app
chmod -R u=rwX,g=rX,o= /opt/portfolio/app
# Next image and route caches must be writable by the service user.
chown -R portfolio:portfolio /opt/portfolio/app/.next
chown root:root /etc/portfolio/portfolio.env
chmod 600 /etc/portfolio/portfolio.env
install -m 644 "$(dirname "${BASH_SOURCE[0]}")/portfolio.service" /etc/systemd/system/portfolio.service
systemctl daemon-reload
systemctl enable portfolio.service

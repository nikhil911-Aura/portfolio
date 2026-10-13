#!/usr/bin/env bash
set -euo pipefail
# CodeDeploy creates the destination and copies the app before this hook.
chown -R ubuntu:ubuntu /var/www/portfolio

# Create the unit once; preserve any later server-side configuration.
if ! systemctl cat portfolio.service >/dev/null 2>&1; then
  cat > /etc/systemd/system/portfolio.service <<'EOF'
[Unit]
Description=Portfolio Next.js
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/www/portfolio
Environment=NODE_ENV=production
Environment=HOSTNAME=127.0.0.1
Environment=PORT=3000
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
fi

systemctl daemon-reload
systemctl enable portfolio.service
systemctl restart portfolio.service

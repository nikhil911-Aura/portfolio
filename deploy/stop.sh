#!/usr/bin/env bash
set -euo pipefail
# BeforeInstall runs on the first deployment too. Never replace a running app.
if systemctl cat portfolio.service >/dev/null 2>&1; then
  systemctl stop portfolio.service
fi

#!/usr/bin/env bash
set -euo pipefail
if systemctl cat portfolio.service >/dev/null 2>&1; then
  systemctl stop portfolio.service
fi

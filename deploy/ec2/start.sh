#!/usr/bin/env bash
set -euo pipefail
systemctl reset-failed portfolio.service
systemctl start portfolio.service

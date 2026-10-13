#!/usr/bin/env bash
set -euo pipefail
for attempt in {1..30}; do
  if systemctl is-active --quiet portfolio.service &&
    [ "$(curl -s -o /dev/null -w '%{http_code}' --max-time 2 http://127.0.0.1:3000/)" = 200 ]; then
    echo 'Portfolio responds on port 3000.'
    exit 0
  fi
  sleep 2
done
echo 'Health check failed. Run: sudo journalctl -u portfolio -n 50 --no-pager' >&2
exit 1

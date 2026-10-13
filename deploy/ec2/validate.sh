#!/usr/bin/env bash
set -euo pipefail
for attempt in $(seq 1 30); do
  if systemctl is-active --quiet portfolio.service &&
    [ "$(curl -s -o /dev/null -w '%{http_code}' --max-time 1 http://127.0.0.1:3000/)" = 200 ] &&
    [ "$(curl -s -o /dev/null -w '%{http_code}' --max-time 1 -H 'Host: portfolio.internal' http://127.0.0.1/)" = 200 ]; then
    echo 'Portfolio is healthy directly and through Nginx.'
    exit 0
  fi
  sleep 2
done
echo 'Health check failed; inspect journalctl -u portfolio and Nginx logs.' >&2
exit 1

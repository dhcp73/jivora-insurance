#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PORT:-3200}"
mkdir -p data logs
if [[ ! -f data/jivora.db ]]; then
  npm run seed
fi
if ss -tlnp 2>/dev/null | grep -q ":${PORT} "; then
  echo "Port ${PORT} already in use"
  exit 0
fi
nohup npx next start -p "$PORT" > logs/next.log 2>&1 &
echo $! > logs/next.pid
nohup npm run worker > logs/worker.log 2>&1 &
echo $! > logs/worker.pid
echo "Started Next on :${PORT} (pid $(cat logs/next.pid)), worker $(cat logs/worker.pid)"

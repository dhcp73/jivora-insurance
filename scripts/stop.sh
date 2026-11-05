#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
for f in logs/next.pid logs/worker.pid; do
  if [[ -f "$f" ]]; then
    pid=$(cat "$f")
    kill "$pid" 2>/dev/null || true
    rm -f "$f"
    echo "Stopped $pid"
  fi
done
pkill -f "next start -p 3200" 2>/dev/null || true
pkill -f "scripts/worker.ts" 2>/dev/null || true
echo "Stop complete"

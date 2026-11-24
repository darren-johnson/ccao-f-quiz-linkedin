#!/bin/sh
# Run every check. The browser test is skipped if Playwright is not installed
# for the Python this script uses (python3 by default, or set PYTHON=python3.9).
cd "$(dirname "$0")/.." || exit 1
PY="${PYTHON:-python3}"
status=0
node tests/bank.test.js || status=1
node tests/logic.test.js || status=1
if "$PY" -c "import playwright" 2>/dev/null; then
  "$PY" tests/browser.test.py "$@" || status=1
else
  echo "browser: skipped, $PY ($(command -v "$PY" || echo 'not found')) has no Playwright."
  echo "         Install it for that same Python:  $PY -m pip install playwright"
fi
exit $status

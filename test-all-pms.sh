#!/usr/bin/env bash
set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

TEMP_DIR=$(mktemp -d /tmp/express-test-XXXXXX)
ORIGINAL_DIR=$(pwd)
PASS=0
FAIL=0
SKIP=0

cleanup() { rm -rf "$TEMP_DIR"; }
trap cleanup EXIT

echo ""
echo -e "${CYAN}══════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Testing create-express-mongodb-ts-starter  ${NC}"
echo -e "${CYAN}══════════════════════════════════════════════${NC}"

test_pm() {
  local pm=$1 project="test-${1}-app"

  echo ""
  echo -e "${YELLOW}▶ Testing with ${pm}...${NC}"

  if ! command -v "$pm" &>/dev/null; then
    echo -e "  ${YELLOW}⚠ Not installed — skipping${NC}"
    SKIP=$((SKIP + 1))
    return
  fi

  cd "$TEMP_DIR"
  rm -rf "$project"

  # 1. Scaffold (simulate PM via user agent)
  local user_agent=""
  case $pm in
    npm)  user_agent="npm/10.0.0" ;;
    yarn) user_agent="yarn/4.0.0" ;;
    pnpm) user_agent="pnpm/9.0.0" ;;
    bun)  user_agent="bun/1.0.0" ;;
  esac
  npm_config_user_agent="$user_agent" node "$ORIGINAL_DIR/bin/index.js" "$project" > /dev/null 2>&1
  [ -d "$project" ] || { echo -e "  ${RED}✗ Scaffold failed${NC}"; FAIL=$((FAIL + 1)); return; }

  cd "$project"

  # 2. File structure
  local missing=""
  for f in package.json tsconfig.json src/index.ts src/app.ts .gitignore .prettierrc; do
    [ -f "$f" ] || missing="$missing $f"
  done
  if [ -n "$missing" ]; then
    echo -e "  ${RED}✗ Missing:$missing${NC}"
    FAIL=$((FAIL + 1))
    return
  fi

  # 3. name injected into package.json
  local pkg_name=$(node -e "console.log(require('./package.json').name)")
  if [ "$pkg_name" != "$project" ]; then
    echo -e "  ${RED}✗ name mismatch: \"$pkg_name\" != \"$project\"${NC}"
    FAIL=$((FAIL + 1))
    return
  fi

  # 4. Lockfile cleanup (non-npm PMs should remove package-lock.json)
  if [ "$pm" != "npm" ] && [ -f "package-lock.json" ]; then
    echo -e "  ${RED}✗ package-lock.json not removed for ${pm}${NC}"
    FAIL=$((FAIL + 1))
    return
  fi

  # 5. Install deps
  echo -n "  Installing..."
  case $pm in
    npm)   npm install --ignore-scripts --silent 2>&1 | tail -1 ;;
    yarn)  yarn install --silent 2>&1 | tail -1 ;;
    pnpm)  pnpm install --silent 2>&1 | tail -1 ;;
    bun)   bun install --silent 2>&1 | tail -1 ;;
  esac

  # 6. Typecheck
  echo -n "  Typecheck..."
  if npx tsc --noEmit 2>&1 | tail -1; then
    echo -e "  ${GREEN}✓ ${pm}: PASS${NC}"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}✗ ${pm}: Typecheck failed${NC}"
    FAIL=$((FAIL + 1))
  fi

  cd "$TEMP_DIR"
}

# ── Run tests ─────────────────────────────────
test_pm "npm"
test_pm "yarn"
test_pm "pnpm"
test_pm "bun"

# ── Summary ───────────────────────────────────
echo ""
echo -e "${CYAN}══════════════════════════════════════════════${NC}"
echo -e "  ${GREEN}Passed: ${PASS}${NC}  ${RED}Failed: ${FAIL}${NC}  ${YELLOW}Skipped: ${SKIP}${NC}"
echo -e "${CYAN}══════════════════════════════════════════════${NC}"
echo ""

[ "$FAIL" -eq 0 ] || exit 1

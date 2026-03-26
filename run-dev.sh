#!/bin/bash
# Install npm (one-time, needs your password) then run the React app
set -e
cd "$(dirname "$0")"

if ! command -v npm &>/dev/null; then
  echo "npm not found. Installing npm (you may be prompted for your password)..."
  sudo apt-get update -qq
  sudo apt-get install -y npm
fi

echo "Installing dependencies..."
npm install

echo "Starting dev server at http://localhost:5173 ..."
npm run dev

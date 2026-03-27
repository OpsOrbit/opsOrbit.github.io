# OpsMatrix (React + Vite)

OpsMatrix is a DevOps learning platform with:

- Tool-wise command explorer (Git, Linux, Docker, Kubernetes, Terraform, etc.)
- Scripting guides for beginners
- Tool-based roadmap mode
- Light/Dark theme support

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

Build output is generated in `dist/`.

## Deploy to GitHub Pages (recommended)

This repo includes an Actions workflow at `.github/workflows/deploy-pages.yml` that deploys on every push to `main`.

### 1) Enable Pages in GitHub

In your GitHub repo:

1. Go to **Settings** → **Pages**
2. Under **Build and deployment**, choose **Source: GitHub Actions**

### 2) Push to main

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

GitHub Actions will build and publish automatically.

### 3) Base path configuration

Vite base path is controlled in `vite.config.js`:

- User/organization site repo (e.g. `username.github.io`) → keep default `/`
- Project repo (e.g. `my-app`) → set:

```bash
VITE_BASE_PATH=/my-app/
```

You can set `VITE_BASE_PATH` as a GitHub Actions environment variable if needed.

## Project structure

- `src/App.jsx` - main app state and mode switching
- `src/components/` - UI components (header, sidebar, cards, guides, roadmap)
- `src/data/` - command data and guide content
- `src/context/` - theme context
- `src/index.css` - global styles and theme tokens

# OpsOrbit (React + Vite)

**OpsOrbit** is a DevOps learning platform with:

- Tool-wise command explorer (Git, Linux, Docker, Kubernetes, Terraform, etc.)
- Scripting guides for beginners
- Tool-based roadmap mode
- Light/Dark theme support

## Run locally

Requirements: Node.js 20+ and npm.

Brand video logo: place **`public/logo.mp4`** in the repo (served at `/logo.mp4`). If the file is missing, the header shows a green fallback with the first letter of the brand name (**OpsOrbit** → **O**).

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

### 3) Base path (fixes blank white page on Pages)

If the site loads but you only see a **white screen**, the JS/CSS bundle URLs are usually wrong for where GitHub Pages hosts the app.

The deploy workflow sets `VITE_BASE_PATH` automatically:

- **Project repo** (`https://owner.github.io/repo-name/`) → build uses `/repo-name/`
- **User site repo** named `owner.github.io` → build uses `/`

To override (custom domain, unusual layout), set a repository **Actions variable** named `VITE_BASE_PATH` (e.g. `/` or `/my-app/`, must start and end with `/` for subpaths).

Local production check (do not open `dist/index.html` via `file://`; module scripts will not load):

```bash
npm run build && npm run preview
```

## Project structure

- `src/App.jsx` - main app state and mode switching
- `src/components/` - UI components (header, sidebar, cards, guides, roadmap)
- `src/data/` - command data and guide content
- `src/context/` - theme context
- `src/index.css` - global styles and theme tokens

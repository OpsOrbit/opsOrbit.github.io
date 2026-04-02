# DevOps Command Hub (React)

A **futuristic** React version of the DevOps Command Hub with:

- **Glassmorphism** UI: frosted glass cards and header with backdrop blur
- **Gradient mesh background** and soft glows for a tech/cyber look
- **Tool icons**: SVG icons for Git, Linux, Kubernetes, Terraform, Docker, Ansible, Maven, Shell
- **Hero section** with tagline and gradient accent
- **Staggered card animations** when results load
- **Level + Tool filters**: Beginner / Intermediate / Advanced and per-tool
- **Search**, **side panel** with copy and blur overlay
- **Orbitron** + **Exo 2** + **JetBrains Mono** for a distinct, modern typography

## Run locally

You need **Node.js** and **npm** installed.

```bash
cd devops-commands-react
npm install
npm run dev
```

Then open **http://localhost:5173**.

## Build for production

```bash
npm run build
npm run preview   # optional: preview the build
```

Static output is in `dist/`.

## Deploy to Netlify (drag and drop)

1. **Build the site** (on your machine):
   ```bash
   cd devops-commands-react
   npm install
   npm run build
   ```
2. Open **[Netlify](https://app.netlify.com)** and sign in.
3. On the dashboard, find the **“Drag and drop your site output folder here”** area.
4. **Drag the `dist` folder** (inside `devops-commands-react`) onto that area.  
   - On Windows: `devops-commands-react\dist`  
   - On Mac/Linux: `devops-commands-react/dist`
5. Netlify will deploy and give you a URL (e.g. `random-name-123.netlify.app`).

**Important:** Drag the **`dist`** folder (the build output), not the whole project. The `dist` folder contains the built HTML, CSS, and JS that Netlify serves.

## Project structure

- `src/App.jsx` – main state, filters, command panel
- `src/data/commands.js` – command list (same data as vanilla app)
- `src/components/` – Header, Hero, Nav, CommandCard, CommandPanel, ToolIcon
- `src/index.css` – futuristic theme (glass, gradients, animations)

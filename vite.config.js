import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages:
  // - user/org site repo (e.g. username.github.io): keep '/'
  // - project site repo (e.g. repo-name): set VITE_BASE_PATH='/repo-name/'
  base: process.env.VITE_BASE_PATH || '/',
})

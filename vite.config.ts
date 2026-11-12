import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // En GitHub Pages el sitio vive bajo /bachata-bpm/; en local sigue siendo /
  base: process.env.GITHUB_ACTIONS ? '/bachata-bpm/' : '/',
  plugins: [react()],
})

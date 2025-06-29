/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration for CLI development server
export default defineConfig({
  root: resolve(__dirname, '.'),
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // Standard dev server mode (lib mode disabled)
  server: {
    port: 3001,
    open: true,
  },
})

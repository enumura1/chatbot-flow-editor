/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      exclude: ['src/__tests__/**/*', 'src/**/*.test.*'],
      copyDtsFiles: false,
    }),
    ...(process.env.CI ? [] : [
      (async () => {
        const { visualizer } = await import('rollup-plugin-visualizer')
        return visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        })
      })()
    ]),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChatbotFlowEditor',
      formats: ['es'],
      fileName: 'index',
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react-dom', '@radix-ui/react-scroll-area'],
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
      },
      output: {
        manualChunks: {
          'utils': ['clsx', 'class-variance-authority'],
        },
        // Fixed entry name for package.json main field
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
  },
})

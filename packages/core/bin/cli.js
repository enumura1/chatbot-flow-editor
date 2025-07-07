#!/usr/bin/env node
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageRoot = join(__dirname, '..')

const isWindows = process.platform === 'win32'

const vite = spawn('npx', ['vite', '--config', 'vite.cli.config.ts', '--port', '3001', '--open'], {
  cwd: packageRoot,
  stdio: 'inherit',
  shell: isWindows
})

process.on('SIGINT', () => {
  vite.kill()
  process.exit(0)
})

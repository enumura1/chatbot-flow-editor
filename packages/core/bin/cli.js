import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageRoot = join(__dirname, '..')

console.log('Starting Chatbot Flow Editor...')

const vite = spawn('npx', ['vite', '--port', '3001', '--open'], {
  cwd: packageRoot,
  stdio: 'inherit'
})

process.on('SIGINT', () => {
  vite.kill()
  process.exit(0)
})

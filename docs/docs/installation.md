---
sidebar_position: 2
---

# Installation

There are several ways to install and use Chatbot Flow Editor. Choose the method that best fits your workflow.

## Prerequisites

- **Node.js 20.0.0 or higher**
- **npm** or **yarn** package manager

Check your Node.js version:
```bash
node --version
# Should output v20.0.0 or higher
```

## Method 1: npx

The fastest way to get started. No installation required:

```bash
npx @enumura/chatbot-flow-editor
```

This command:
- Downloads the latest version automatically
- Launches the editor in your browser
- Requires no global installation
- Always uses the most recent version

## Method 2: Development Dependency

Install as a development dependency in your project:

```bash
# Using npm
npm install --save-dev @enumura/chatbot-flow-editor

# Using yarn
yarn add --dev @enumura/chatbot-flow-editor
```

Then run:
```bash
# Using npm
npx @enumura/chatbot-flow-editor

# Using yarn
yarn chatbot-flow-editor
```

### Add to Package.json Scripts

Add a script to your `package.json` for easy access:

```json
{
  "scripts": {
    "design-flows": "chatbot-flow-editor",
    "chatbot-editor": "chatbot-flow-editor"
  }
}
```

Then run:
```bash
npm run design-flows
# or
npm run chatbot-editor
```

## Command Options

### Basic Usage
```bash
# For quick testing
npx @enumura/chatbot-flow-editor

# If installed as dev dependency with scripts configured
npm run design-flows
```

### Custom Port
```bash
# Set custom port
PORT=4000 npx @enumura/chatbot-flow-editor

# Or use environment variable
export PORT=4000
npx @enumura/chatbot-flow-editor
```

### Available Commands
```bash
npx @enumura/chatbot-flow-editor          # Start the editor (for quick testing)
npm run design-flows             # Start the editor (if configured in scripts)
PORT=4000 npx @enumura/chatbot-flow-editor  # Start with custom port
```

## Verify Installation

After running any installation method, you should see:

1. Console output showing the server is starting
2. Your browser automatically opening to `http://localhost:3001`
3. The Chatbot Flow Editor interface loading

Example output:
```
Starting Chatbot Flow Editor...
Local:    http://localhost:3001
Network:  http://192.168.1.100:3001

Ready! Open your browser to start designing flows.
```

## Troubleshooting

### Port Already in Use
If port 3001 is already in use:

```bash
# Or kill the process using port 3001
lsof -ti:3001 | xargs kill -9
```

### Node.js Version Issues
If you see compatibility errors:

```bash
# Check your Node.js version
node --version

# Update Node.js if needed
# Visit https://nodejs.org or use a version manager like nvm
```

### Permission Errors
If you get permission errors:

```bash
# On macOS/Linux, don't use sudo with npm
# Instead, configure npm to use a different directory
npm config set prefix '~/.npm-global'

# Add to your shell profile (.bashrc, .zshrc, etc.)
export PATH=~/.npm-global/bin:$PATH
```

### Browser Doesn't Open
If the browser doesn't open automatically:

1. Manually open your browser
2. Navigate to `http://localhost:3001`
3. Check console output for the correct URL

### Clear npm Cache
If you experience installation issues:

```bash
npm cache clean --force
```

## Development Setup

For contributing to the project:

```bash
# Clone the repository
git clone https://github.com/enumura1/chatbot-flow-editor.git
cd chatbot-flow-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

## Uninstallation

### Remove Development Dependency
```bash
# Using npm
npm uninstall @enumura/chatbot-flow-editor

# Using yarn
yarn remove @enumura/chatbot-flow-editor
```

### Remove Global Installation
```bash
# Using npm
npm uninstall -g @enumura/chatbot-flow-editor

# Using yarn
yarn global remove @enumura/chatbot-flow-editor
```

## Next Steps

Now that you have Chatbot Flow Editor installed:

- Follow the [User Guide](./user-guide) to learn how to create flows
- Check out [Getting Started](./getting-started) for a quick tutorial
- Review the [JSON Structure](./json-structure) for format details

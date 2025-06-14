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

## Method 1: npx (Recommended)

The fastest way to get started. No installation required:

```bash
npx chatbot-flow-editor
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
npm install --save-dev chatbot-flow-editor

# Using yarn
yarn add --dev chatbot-flow-editor
```

Then run:
```bash
# Using npm
npx chatbot-flow-editor

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

## Method 3: Global Installation

Install globally to use from anywhere:

```bash
# Using npm
npm install -g chatbot-flow-editor

# Using yarn
yarn global add chatbot-flow-editor
```

Then run from any directory:
```bash
chatbot-flow-editor
```

:::warning Global Installation
Global installation may cause version conflicts. We recommend using npx or project-level installation instead.
:::

## Command Options

### Basic Usage
```bash
chatbot-flow-editor
```

### Custom Port
```bash
# Set custom port
PORT=4000 chatbot-flow-editor

# Or use environment variable
export PORT=4000
chatbot-flow-editor
```

### Available Commands
```bash
chatbot-flow-editor start    # Start the editor (default)
chatbot-flow-editor help     # Show help information
chatbot-flow-editor version  # Show version number
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
# Try a different port
PORT=4002 chatbot-flow-editor

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
npm uninstall chatbot-flow-editor

# Using yarn
yarn remove chatbot-flow-editor
```

### Remove Global Installation
```bash
# Using npm
npm uninstall -g chatbot-flow-editor

# Using yarn
yarn global remove chatbot-flow-editor
```

## Next Steps

Now that you have Chatbot Flow Editor installed:

- Follow the [User Guide](./user-guide) to learn how to create flows
- Check out [Getting Started](./getting-started) for a quick tutorial
- Review the [JSON Structure](./json-structure) for format details

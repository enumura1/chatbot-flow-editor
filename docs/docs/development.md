---
sidebar_position: 5
---

# Development Guide

Development documentation for contributors and maintainers of Chatbot Flow Editor.

## Quick Start

```bash
# Clone repository
git clone https://github.com/enumura1/chatbot-flow-editor.git
cd chatbot-flow-editor

# Install dependencies
npm install

# Start development
npm run dev  # Core package development (port 3001)
npm run dev:demo  # Demo app development
```

## Project Structure

```
chatbot-flow-editor/
├── packages/core/          # Main package (library)
├── apps/editor-demo/       # flow editor Demo  
├── apps/chatbot-samples/   # chatbot examples
├── docs/                   # Documentation site
└── README.md
```

## Development Commands

### Core Package Development
```bash
cd packages/core
npm run dev          # Development server (port 3001)
npm run build        # Build library
npm run test         # Run tests (watch mode)
npm run test:run     # Run tests once
npm run type-check   # TypeScript validation
```

### Demo App
```bash
npm run dev:demo     # Start demo app
npm run build        # Build demo app
```

### Documentation
```bash
npm run docs:start   # Start docs server (port 3000)
npm run docs:build   # Build documentation
npm run docs:deploy  # Deploy to GitHub Pages
```

## Testing

### Unit Tests
```bash
# Core package tests
cd packages/core
npm run test         # Watch mode
npm run test:run     # Single run

# Run specific test
npm test ChatbotEditor.test.tsx
```

### Manual Testing
1. Start development server: `npm run dev`
2. Open browser to `http://localhost:3001`
3. Test flow creation, editing, export/import functions
4. Use chat preview to simulate conversations

### Example Apps Testing
```bash
cd apps/examples
npm run dev          # Test example implementations
```

## Building

### Local Build
```bash
npm run build:core   # Build core package only
npm run build        # Build all packages
```

## Code Quality

### Type Checking
```bash
cd packages/core
npm run type-check   # TypeScript validation
```

### CI/CD Pipeline
- Quality checks run automatically on PR/push to main
- Documentation auto-deploys on docs changes
- All tests must pass before merge

## Architecture

### Core Package (`packages/core/`)
```
src/
├── components/
│   ├── chatbot-editor/     # Main editor components
│   │   ├── index.tsx       # Main editor component
│   │   ├── FlowDiagram.tsx # Visual flow tree
│   │   ├── NodeEditor.tsx  # Node editing panel
│   │   ├── ChatPreview.tsx # Chat simulation
│   │   ├── dialogs/        # Modal dialogs
│   │   └── utils.ts        # Editor utilities
│   └── ui/                 # Reusable UI components
├── types/                  # TypeScript definitions
├── utils/                  # Utility functions
└── index.ts               # Public API exports
```

## Resources

- [User Documentation](https://enumura1.github.io/chatbot-flow-editor/)
- [GitHub Repository](https://github.com/enumura1/chatbot-flow-editor)
- [npm Package](https://www.npmjs.com/package/@enumura/chatbot-flow-editor)

# Chatbot Flow Editor

A React component for building chatbot conversation flows visually. Create complex conversational experiences with an intuitive node-based editor.

## Features

- **Visual Flow Builder**: Create conversation flows using a hierarchical tree structure
- **Chat Preview**: Test your chatbot interactions instantly
- **Node Management**: Add, edit, and organize conversation nodes
- **Option System**: Define user choices and conversation branches
- **Import/Export**: Save and load flows in JSON format

## Demo

Try the interactive demo to see all features in action

1. **Add Nodes**: Click "Add Node" to create new conversation points
2. **Edit Content**: Click on any node to modify its content and options
3. **Test Flow**: Use the chat preview to simulate user interactions
4. **Export/Import**: Save your work or load existing flows

## Installation

```bash
npm install chatbot-flow-editor
```

## Basic Usage

```tsx
import { ChatbotEditor } from 'chatbot-flow-editor'
import 'chatbot-flow-editor/styles'

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ChatbotEditor />
    </div>
  )
}
```

## Development

This is a monorepo using npm workspaces

```
chatbot-flow-editor/
├── packages/core/           # Main library source
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── types/          # TypeScript definitions
│   │   └── index.ts        # Public API exports
│   ├── vite.config.ts      # Library build config
│   └── package.json        # Library dependencies
├── apps/demo/              # Demo application
│   ├── src/App.tsx         # Demo implementation
│   └── vite.config.ts      # Demo app config
└── package.json            # Workspace root
```

### Development Setup

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run development server
npm run dev
```

The demo application will be available at http://localhost:5173

### Available Scripts

```bash
npm run build        # Build packages/core library
npm run dev          # Start demo application
npm run type-check   # Check TypeScript types
npm run clean        # Clean build artifacts
```

### Building for Production

The library build outputs:
- `packages/core/dist/index.js` - ES module
- `packages/core/dist/index.d.ts` - TypeScript definitions
- `packages/core/dist/style.css` - Styles

## Tech Stack

- **React 19** - UI framework with latest features
- **TypeScript 5.8+** - Type safety and developer experience
- **Vite 6** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Icon library

## Requirements

- Node.js 18+
- React 18+ or 19+
- Modern browser with ES2020 support

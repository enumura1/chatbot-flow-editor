# Chatbot Flow Editor

**Visual development tool for creating chatbot conversation flows**

A GUI tool that opens in your browser. Design, test, and export chatbot conversation flows as JSON.

## Quick Start

```bash
# Install as development dependency
npm install --save-dev chatbot-flow-editor

# Launch the visual editor
npx chatbot-flow-editor
```

Your browser will automatically open with the visual flow editor at `http://localhost:3001`.

## Installation & Usage

### Method 1: Using npx (Recommended)
```bash
npm install --save-dev chatbot-flow-editor
npx chatbot-flow-editor
```

### Method 2: Add to your project scripts
Add to your `package.json`:
```json
{
  "scripts": {
    "design-flows": "chatbot-flow-editor"
  }
}
```

Then run:
```bash
npm run design-flows
```

### Method 3: Global installation
```bash
npm install -g chatbot-flow-editor
chatbot-flow-editor
```

## Usage

### Starting the Editor
```bash
# Default (opens on http://localhost:3001)
chatbot-flow-editor

# Custom port
PORT=4000 chatbot-flow-editor
```

### Available Commands
```bash
chatbot-flow-editor start    # Start the editor (default)
chatbot-flow-editor help     # Show help
chatbot-flow-editor version  # Show version
```

## How to Use

1. **Launch**: Run `npx chatbot-flow-editor`
2. **Create Nodes**: Click "Add Node" to create conversation points
3. **Edit Content**: Click any node to modify its content and options
4. **Test Flow**: Use the chat preview to simulate user interactions
5. **Export JSON**: Download your flows as structured JSON files
6. **Import Flows**: Load existing JSON flows to continue editing

## Development Workflow

```bash
# In your chatbot project directory
npm install --save-dev chatbot-flow-editor

# Design your conversation flows
npx chatbot-flow-editor

# Export the flow as JSON
# → Use the exported JSON in your chatbot application
```

## JSON Structure

When you export a flow, you'll get a JSON structure like:

```json
[
  {
    "id": 1,
    "title": "Welcome to our support!",
    "options": [
      { "label": "Technical Support", "nextId": 2 },
      { "label": "Billing Questions", "nextId": 3 }
    ]
  }
]
```

## Integration

The exported JSON can be used in any chatbot implementation:

```javascript
// Load your exported flow
const flow = require('./chatbot-flow.json')

// Basic navigation example
function findNodeById(nodeId) {
  return flow.find(node => node.id === nodeId);
}

function processUserChoice(currentNodeId, userChoice) {
  const currentNode = findNodeById(currentNodeId);
  const selectedOption = currentNode.options.find(opt => 
    opt.label === userChoice
  );
  return selectedOption ? selectedOption.nextId : null;
}
```

## Screenshots

![Chatbot Flow Editor Interface](chatbot-flow-editor.webp)

## Workflow

1. **Design Phase**: Use the visual editor to create conversation flows
2. **Test Phase**: Try different conversation paths with the live preview  
3. **Export Phase**: Download your flow as structured JSON
4. **Integration Phase**: Use the JSON in your chatbot application

## Requirements

- Node.js 20.0.0 or higher

## Development

```bash
git clone https://github.com/enumura1/chatbot-flow-editor.git
cd chatbot-flow-editor
npm install
npm run dev
```
- [Development Guide](https://enumura1.github.io/chatbot-flow-editor/docs/development)

## License

This project is licensed under the **MIT License**.

See the [LICENSE](./LICENSE) file for details.

## Documentation

- [Documentation](https://enumura1.github.io/chatbot-flow-editor/)
- [Getting Started](https://enumura1.github.io/chatbot-flow-editor/docs/getting-started)
- [Installation Guide](https://enumura1.github.io/chatbot-flow-editor/docs/installation)
- [User Guide](https://enumura1.github.io/chatbot-flow-editor/docs/user-guide)
- [JSON Structure](https://enumura1.github.io/chatbot-flow-editor/docs/json-structure)

## Support

- [Report Issues](https://github.com/enumura1/chatbot-flow-editor/issues)
- [Discussions](https://github.com/enumura1/chatbot-flow-editor/discussions)

---
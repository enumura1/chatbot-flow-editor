---
sidebar_position: 1
---

# Getting Started

Welcome to **Chatbot Flow Editor** - a visual development tool for designing chatbot conversation flows. This tool helps you create, test, and export chatbot flows as JSON for integration with any chatbot framework.

## What is Chatbot Flow Editor?

Chatbot Flow Editor is a **GUI design tool**, not a complete chatbot solution. It provides:

- **Visual Flow Designer**: Create conversation flows with drag-and-drop interface
- **Live Preview**: Test your flows in real-time with chat simulation
- **JSON Export**: Export structured data for integration with any platform
- **Framework Agnostic**: Works with any chatbot framework or custom implementation

:::info What this tool does NOT do
This is a design and prototyping tool. It does not:
- Host or run your chatbot
- Connect to messaging platforms
- Handle user authentication
- Provide natural language processing
- Include machine learning capabilities

You'll need to integrate the exported JSON with your chosen chatbot platform.
:::

## Quick Start

Get started in less than 2 minutes:

```bash
# Install as dev dependency
npm install --save-dev chatbot-flow-editor

# Launch the visual editor
npx chatbot-flow-editor
```

Your browser will automatically open at `http://localhost:4001` with the visual flow editor.

## Your First Flow

1. **Launch the Editor**: Run `npx chatbot-flow-editor`
2. **Create a Node**: Click "Add Node" to create your first conversation point
3. **Edit Content**: Click the node to modify its message and add response options
4. **Test the Flow**: Use the chat preview on the right to simulate conversations
5. **Export JSON**: Click "Export" to download your flow as structured JSON

## What You'll Get

When you export a flow, you'll receive a JSON structure like this:

```json
[
  {
    "id": 1,
    "title": "Welcome! How can I help you today?",
    "options": [
      { "label": "Technical Support", "nextId": 2 },
      { "label": "Billing Questions", "nextId": 3 },
      { "label": "General Info", "nextId": 4 }
    ]
  },
  {
    "id": 2,
    "title": "I'll help you with technical issues. What's the problem?",
    "options": [
      { "label": "Login Issues", "nextId": 5 },
      { "label": "Bug Report", "nextId": 6 }
    ]
  }
]
```

## Integration Example

Use this JSON structure in your chatbot implementation:

```javascript
const flow = require('./exported-flow.json');

function processUserInput(currentNodeId, userChoice) {
  const currentNode = flow.find(node => node.id === currentNodeId);
  const selectedOption = currentNode.options.find(opt => 
    opt.label === userChoice
  );
  
  return selectedOption ? selectedOption.nextId : null;
}
```

## Next Steps

- [Installation Guide](./installation) - Different installation methods
- [User Guide](./user-guide) - Detailed features and workflow
- [JSON Structure](./json-structure) - JSON format documentation

## Need Help?

- 📖 Check the [User Guide](./user-guide) for detailed instructions
- 🐛 [Report issues](https://github.com/enumura1/chatbot-flow-editor/issues) on GitHub
- 💬 Join the [discussion](https://github.com/enumura1/chatbot-flow-editor/discussions) for questions and ideas

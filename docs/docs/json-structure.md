---
sidebar_position: 4
---

# JSON Structure Reference

This document describes the JSON structure exported by Chatbot Flow Editor and provides technical details for integration with your own chatbot implementation.

## JSON Structure Overview

The exported JSON is an array of node objects representing your conversation flow:

```json
[
  {
    "id": 1,
    "title": "Welcome! How can I help you?",
    "options": [
      { "label": "Technical Support", "nextId": 2 },
      { "label": "Billing Questions", "nextId": 3 }
    ],
    "parentId": undefined,
    "hierarchyPath": "1"
  }
]
```

## Node Object

Each node in the flow has the following structure:

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the node |
| `title` | `string` | ✅ | The message text displayed to users |
| `options` | `ChatOption[]` | ✅ | Array of response options (can be empty) |
| `parentId` | `number \| undefined` | ❌ | ID of the parent node (undefined for root) |
| `hierarchyPath` | `string` | ❌ | Dot notation path (e.g., "1-2-1") |

### Example

```json
{
  "id": 5,
  "title": "What type of technical issue are you experiencing?",
  "options": [
    { "label": "Login Problems", "nextId": 6 },
    { "label": "Software Bug", "nextId": 7 },
    { "label": "Performance Issue", "nextId": 8 }
  ],
  "parentId": 2,
  "hierarchyPath": "1-1"
}
```

## ChatOption Object

Each option represents a user choice that leads to another node:

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | ✅ | Text displayed to the user |
| `nextId` | `number` | ✅ | ID of the destination node |

### Example

```json
{
  "label": "Yes, I need help with that",
  "nextId": 42
}
```

## Complete Flow Example

Here's a complete example of a customer support flow:

```json
[
  {
    "id": 1,
    "title": "Welcome to our support! How can we assist you today?",
    "options": [
      { "label": "Technical Issues", "nextId": 2 },
      { "label": "Billing Questions", "nextId": 3 },
      { "label": "General Information", "nextId": 4 }
    ],
    "hierarchyPath": "1"
  },
  {
    "id": 2,
    "title": "I'll help you with technical issues. What's the problem?",
    "options": [
      { "label": "Can't log in", "nextId": 5 },
      { "label": "App is crashing", "nextId": 6 },
      { "label": "Feature not working", "nextId": 7 }
    ],
    "parentId": 1,
    "hierarchyPath": "1-1"
  },
  {
    "id": 3,
    "title": "I can help with billing questions. What do you need to know?",
    "options": [
      { "label": "View my bill", "nextId": 8 },
      { "label": "Payment issues", "nextId": 9 },
      { "label": "Cancel subscription", "nextId": 10 }
    ],
    "parentId": 1,
    "hierarchyPath": "1-2"
  },
  {
    "id": 4,
    "title": "What general information would you like?",
    "options": [
      { "label": "Company hours", "nextId": 11 },
      { "label": "Contact information", "nextId": 12 }
    ],
    "parentId": 1,
    "hierarchyPath": "1-3"
  },
  {
    "id": 5,
    "title": "For login issues, please try resetting your password. If that doesn't work, contact our technical team.",
    "options": [],
    "parentId": 2,
    "hierarchyPath": "1-1-1"
  }
]
```

## Flow Navigation Pattern

Here's a basic pattern for navigating through the flow:

```javascript
class FlowNavigator {
  constructor(flowData) {
    this.nodes = new Map();
    flowData.forEach(node => {
      this.nodes.set(node.id, node);
    });
    this.currentNodeId = 1; // Start at root
  }

  getCurrentNode() {
    return this.nodes.get(this.currentNodeId);
  }

  selectOption(optionIndex) {
    const currentNode = this.getCurrentNode();
    if (currentNode && currentNode.options[optionIndex]) {
      this.currentNodeId = currentNode.options[optionIndex].nextId;
      return this.getCurrentNode();
    }
    return null;
  }

  reset() {
    this.currentNodeId = 1;
  }
}
```

## JSON Schema

You can validate exported JSON against this schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "title", "options"],
    "properties": {
      "id": {
        "type": "integer",
        "minimum": 1
      },
      "title": {
        "type": "string",
        "minLength": 1
      },
      "options": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["label", "nextId"],
          "properties": {
            "label": {
              "type": "string",
              "minLength": 1
            },
            "nextId": {
              "type": "integer",
              "minimum": 1
            }
          }
        }
      },
      "parentId": {
        "type": "integer",
        "minimum": 1
      },
      "hierarchyPath": {
        "type": "string"
      }
    }
  }
}
```

## Validation Function

```javascript
function validateFlow(flowData) {
  const errors = [];
  const nodeIds = new Set();
  
  // Check for duplicate IDs
  flowData.forEach(node => {
    if (nodeIds.has(node.id)) {
      errors.push(`Duplicate node ID: ${node.id}`);
    }
    nodeIds.add(node.id);
  });
  
  // Check for valid option targets
  flowData.forEach(node => {
    node.options.forEach(option => {
      if (!nodeIds.has(option.nextId)) {
        errors.push(`Node ${node.id} has option pointing to non-existent node ${option.nextId}`);
      }
    });
  });
  
  // Check for root node
  if (!nodeIds.has(1)) {
    errors.push('Missing root node with ID 1');
  }
  
  return errors;
}
```

## TypeScript Definitions

If you're using TypeScript, here are the type definitions:

```typescript
interface ChatOption {
  label: string;
  nextId: number;
}

interface ChatNode {
  id: number;
  title: string;
  options: ChatOption[];
  parentId?: number;
  hierarchyPath?: string;
}

type ChatbotFlow = ChatNode[];
```

## Flow Properties

### Node IDs
- Always start with ID `1` as the root node
- IDs are unique across the entire flow
- Sequential numbering is recommended but not required

### Hierarchy Paths
- Root node: `"1"`
- First child of root: `"1-1"`
- Second child of root: `"1-2"`
- First child of first child: `"1-1-1"`

### Parent Relationships
- Root node has no `parentId`
- All other nodes should have a `parentId` pointing to their parent
- Parent relationships are automatically established when creating flows

### Options and Navigation
- Empty `options` array indicates an end node (conversation termination)
- All `nextId` values must reference existing nodes
- Options are presented to users in the order they appear in the array

## Best Practices

### Data Structure
- Keep node IDs simple and sequential
- Use descriptive titles that clearly communicate the message
- Write option labels that users will understand
- Validate all `nextId` references before using the flow

### Flow Design
- Always include a root node with ID `1`
- Provide clear conversation paths
- Include appropriate end nodes for conversation closure
- Test all possible navigation paths

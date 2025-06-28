---
sidebar_position: 3
---

# User Guide

This comprehensive guide covers all features of the Chatbot Flow Editor. Learn how to create, edit, test, and export conversation flows.

## Interface Overview

The Chatbot Flow Editor interface consists of three main areas:

### Left Panel: Flow Diagram (60%)
- **Visual Flow Tree**: Hierarchical view of your conversation flow
- **Node Navigation**: Click any node to select and edit it
- **Flow Structure**: See the complete conversation tree at a glance
- **Pan Navigation**: Click and drag empty space to move around large flows
- **Scroll Support**: Use horizontal scrolling for wide conversation trees

### Right Panel: Split View (40%)
- **Top Half**: Live chat preview for testing flows
- **Bottom Half**: Node editor for modifying selected nodes

### Top Toolbar
- **Add Node**: Create new conversation points
- **Export**: Download your flow as JSON
- **Import**: Load existing JSON flows

## Creating Your First Flow

### Step 1: Understanding the Default Flow

When you first open the editor, you'll see a sample flow:

1. **Welcome Node** (ID: 1) - The starting point
2. **Three Child Nodes** (IDs: 2, 3, 4) - Response destinations

### Step 2: Adding a New Node

1. **Select a Parent Node**: Click on any existing node
2. **Click "Add Node"**: This opens the Add Node dialog
3. **Enter Content**: Type the message this node should display
4. **Save**: The new node is automatically connected to the parent

:::tip Node Hierarchy
Each new node becomes a child of the currently selected node. The system automatically creates connection options and assigns unique IDs.
:::

### Step 3: Editing Node Content

1. **Select Node**: Click any node in the flow diagram
2. **Edit in Right Panel**: The node editor loads in the bottom right
3. **Modify Title**: Change the message text
4. **Click Save**: Apply your changes

## Working with Options

Options are the choices users can make in conversation. Each option points to another node.

### Adding Options

1. **Select a Node**: Choose the node that needs response options
2. **Click "Add an Option"**: Opens the option editor dialog
3. **Enter Option Label**: The text users will see (e.g., "Yes", "Tell me more")
4. **Set Target Node ID**: Which node this option leads to
5. **Save**: The option is added to the current node

:::info Available Node IDs
The dialog shows all available node IDs in your flow. You can only link to existing nodes.
:::

### Editing Existing Options

1. **Select the Node**: Choose the node containing the option
2. **Click "Edit"**: Next to the option you want to modify
3. **Update Fields**: Change the label or target node
4. **Save**: Apply changes

### Removing Options

1. **Select the Node**: Choose the node containing the option
2. **Click "Delete"**: Next to the option you want to remove
3. **Confirm**: The option is immediately removed

## Testing Your Flow

The chat preview lets you simulate user interactions in real-time.

### Starting a Test Session

1. **Click "Start Chat"**: In the top right of the chat preview
2. **View Initial Message**: The welcome message appears
3. **See Available Options**: Response buttons appear below the message

### Interacting with the Flow

1. **Click Option Buttons**: Choose from the available responses
2. **See Conversation Progress**: Messages appear in chat format
3. **Follow the Path**: Navigate through your entire flow
4. **Test Different Routes**: Reset and try different conversation paths

### Resetting the Test

1. **Click "Reset"**: Clears the chat history
2. **Start Fresh**: Begin testing from the welcome message again

:::tip Testing Best Practices
- Test every possible conversation path
- Check that all options lead to valid nodes
- Verify the conversation flow makes logical sense
- Look for dead ends (nodes with no options)
:::

## Flow Management

### Exporting Your Flow

1. **Click "Export"**: In the top toolbar
2. **Review JSON**: The export dialog shows your flow structure
3. **Click "Download"**: Saves a JSON file to your computer

The exported file contains your complete flow structure:

```json
[
  {
    "id": 1,
    "title": "Welcome to our support!",
    "options": [
      { "label": "Technical Help", "nextId": 2 },
      { "label": "Billing", "nextId": 3 }
    ],
    "hierarchyPath": "1"
  }
]
```

### Importing Existing Flows

1. **Click "Import"**: In the top toolbar
2. **Choose Method**:
   - **Select File**: Upload a JSON file
   - **Paste JSON**: Copy and paste JSON directly
3. **Validate**: The system checks the JSON format
4. **Import**: Your flow loads into the editor

:::warning Import Behavior
Importing replaces your current flow completely. Export your current work first if you want to keep it.
:::

### File Management Best Practices

- **Use Descriptive Names**: `customer-support-flow.json`, `product-onboarding-flow.json`
- **Version Your Flows**: Include dates or version numbers
- **Backup Regularly**: Export your work frequently
- **Test After Import**: Always test imported flows

## Advanced Features

### Hierarchy Paths

Each node has a hierarchy path (like "1-2-1") showing its position in the conversation tree:

- **"1"**: Root node
- **"1-1"**: First child of root
- **"1-2-1"**: First child of the second child of root

This helps you understand the conversation structure at a glance.

### Node Relationships

- **Parent Nodes**: Have child nodes connected via options
- **Child Nodes**: Are destinations of parent node options
- **Leaf Nodes**: Have no options (conversation endpoints)

### Flow Validation

The system automatically validates:

- **Unique Node IDs**: No duplicate IDs allowed
- **Valid Connections**: Options must point to existing nodes
- **JSON Format**: Exported data follows the correct structure

## Best Practices

### Flow Design

1. **Start Simple**: Begin with a basic flow, then add complexity
2. **Plan the Structure**: Sketch your conversation before building
3. **Use Clear Language**: Write options users will understand
4. **Provide Escape Routes**: Include options to restart or get help
5. **Test Thoroughly**: Try every possible conversation path

### Content Writing

1. **Be Conversational**: Write like you're talking to a person
2. **Keep Messages Short**: Avoid overwhelming users with text
3. **Make Options Clear**: Users should understand what each choice does
4. **Use Consistent Tone**: Maintain the same voice throughout

### Technical Integration

1. **Document Your Flow**: Keep notes about the intended implementation
2. **Consider Platform Limits**: Some chatbot platforms have message length limits
3. **Plan for Expansion**: Design flows that can grow over time
4. **Version Control**: Keep multiple versions of your flows

## Common Workflows

### Customer Support Flow

1. **Welcome Message**: Greet the user
2. **Category Selection**: Technical, Billing, General
3. **Sub-Categories**: Specific issue types
4. **Resolution or Escalation**: Solve or transfer to human

### Product Onboarding

1. **Welcome**: Introduce your product
2. **Feature Overview**: Highlight key capabilities  
3. **Interactive Demo**: Let users explore features
4. **Next Steps**: Guide to getting started

### FAQ Bot

1. **Topic Selection**: Choose question category
2. **Specific Questions**: Show relevant FAQs
3. **Detailed Answers**: Provide comprehensive responses
4. **Follow-up**: Offer related questions or human contact

## Troubleshooting

### Common Issues

**Problem**: Can't add options to a node
- **Solution**: Make sure you have other nodes to connect to

**Problem**: Chat preview shows "No options available"
- **Solution**: Check that the node has valid options with correct target IDs

**Problem**: Export fails
- **Solution**: Verify all option target IDs point to existing nodes

**Problem**: Import shows "Invalid JSON"
- **Solution**: Check JSON syntax and ensure it follows the correct structure

### Getting Help

- **Check Console**: Browser developer tools may show error details
- **Validate JSON**: Use online JSON validators for import issues
- **Reset Flow**: Create a new flow if the current one becomes corrupted
- **Report Bugs**: Submit issues on GitHub for persistent problems

## Next Steps

Now that you understand the editor:

- **Practice**: Create several different types of flows
- **Integrate**: Use exported JSON in your chatbot platform
- **Share**: Export flows to collaborate with team members
- **Iterate**: Continuously improve your conversation designs

For technical integration details, see the [JSON Structure](./json-structure).

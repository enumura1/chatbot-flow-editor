import { ChatbotFlow, ChatNode, NodePositions } from "../../types/chatbot";

// Generate a new unique ID for a node
export const generateNewId = (flow: ChatbotFlow): number => {
  const ids = flow.map(node => node.id);
  return Math.max(...ids, 0) + 1;
};

// Generate positions for the workflow diagram
export const generateNodePositions = (flow: ChatbotFlow): NodePositions => {
  const positions: NodePositions = {};
  const rootNode = flow.find(n => n.id === 1);
  
  if (!rootNode) return positions;
  
  // Create node map for quick lookup
  const nodeMap = flow.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {} as Record<number, ChatNode>);
  
  // Track visited nodes to prevent infinite loops
  const visited = new Set<number>();
  
  // Recursively calculate node positions
  const calculatePositions = (nodeId: number, depth: number, index: number) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    const node = nodeMap[nodeId];
    if (!node) return;
    
    // Calculate position for hierarchical display
    const yPos = depth * 70;  // Vertical spacing
    const xPos = index * 30;  // Horizontal spacing (not actually used)
    
    positions[nodeId] = { x: xPos, y: yPos };
    
    // Calculate positions for child nodes
    node.options.forEach((opt, idx) => {
      calculatePositions(opt.nextId, depth + 1, index + idx);
    });
  };
  
  // Start calculation from root node
  calculatePositions(rootNode.id, 0, 0);
  
  return positions;
};

// Export flow to JSON file
export const exportFlowToFile = (flow: ChatbotFlow) => {
  const jsonString = JSON.stringify(flow, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chatbot-flow.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Parse imported JSON
export const parseImportedJson = (jsonString: string): ChatbotFlow | null => {
  try {
    const parsedFlow = JSON.parse(jsonString);
    if (Array.isArray(parsedFlow) && parsedFlow.length > 0) {
      return parsedFlow;
    }
    return null;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return null;
  }
};

// Add hierarchy paths to existing flow
export const updateFlowWithHierarchyPaths = (flow: ChatbotFlow): ChatbotFlow => {
  // Create node map (ID → Node)
  const nodeMap: Record<number, ChatNode> = {};
  flow.forEach(node => {
    nodeMap[node.id] = {...node};
  });
  
  // Set parent-child relationships
  flow.forEach(node => {
    node.options.forEach(option => {
      const targetNode = nodeMap[option.nextId];
      if (targetNode && !targetNode.parentId) {
        targetNode.parentId = node.id;
      }
    });
  });
  
  // Start with root node (ID=1)
  const rootNode = nodeMap[1];
  if (rootNode) {
    rootNode.hierarchyPath = "1";
    
    // Recursively set hierarchy paths
    const setHierarchyPaths = (nodeId: number, parentPath: string) => {
      // Find child nodes that have this node as parent
      const childNodes = Object.values(nodeMap).filter(n => n.parentId === nodeId);
      
      // Set hierarchy path for each child node
      childNodes.forEach((childNode, index) => {
        childNode.hierarchyPath = `${parentPath}-${index + 1}`;
        
        // Recursively process children of children
        setHierarchyPaths(childNode.id, childNode.hierarchyPath);
      });
    };
    
    setHierarchyPaths(rootNode.id, rootNode.hierarchyPath);
  }
  
  // Return updated node list
  return Object.values(nodeMap);
};

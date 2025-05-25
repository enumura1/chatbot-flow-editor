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
  
  // ノードマップの作成
  const nodeMap = flow.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {} as Record<number, ChatNode>);
  
  // 訪問済みノードを追跡
  const visited = new Set<number>();
  
  // 再帰的にノードの位置を計算する関数
  const calculatePositions = (nodeId: number, depth: number, index: number) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    const node = nodeMap[nodeId];
    if (!node) return;
    
    // 階層表示のための位置計算
    const yPos = depth * 70;  // 垂直間隔
    const xPos = index * 30;  // 水平間隔（実際には使用されない）
    
    positions[nodeId] = { x: xPos, y: yPos };
    
    // 子ノードの位置を計算
    node.options.forEach((opt, idx) => {
      calculatePositions(opt.nextId, depth + 1, index + idx);
    });
  };
  
  // ルートノードから計算開始
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

// 既存のフローに階層パスを追加する関数
export const updateFlowWithHierarchyPaths = (flow: ChatbotFlow): ChatbotFlow => {
  // ノードマップの作成（ID → ノード）
  const nodeMap: Record<number, ChatNode> = {};
  flow.forEach(node => {
    nodeMap[node.id] = {...node};
  });
  
  // 親子関係を設定
  flow.forEach(node => {
    node.options.forEach(option => {
      const targetNode = nodeMap[option.nextId];
      if (targetNode && !targetNode.parentId) {
        targetNode.parentId = node.id;
      }
    });
  });
  
  // ルートノード（ID=1）から始める
  const rootNode = nodeMap[1];
  if (rootNode) {
    rootNode.hierarchyPath = "1";
    
    // 階層パスを再帰的に設定
    const setHierarchyPaths = (nodeId: number, parentPath: string) => {
      // このノードを親とする子ノードを見つける
      const childNodes = Object.values(nodeMap).filter(n => n.parentId === nodeId);
      
      // 各子ノードに階層パスを設定
      childNodes.forEach((childNode, index) => {
        childNode.hierarchyPath = `${parentPath}-${index + 1}`;
        
        // 再帰的に子ノードの子も処理
        setHierarchyPaths(childNode.id, childNode.hierarchyPath);
      });
    };
    
    setHierarchyPaths(rootNode.id, rootNode.hierarchyPath);
  }
  
  // 更新されたノードのリストを返す
  return Object.values(nodeMap);
};

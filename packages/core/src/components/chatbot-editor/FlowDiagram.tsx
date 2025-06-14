import { ChatbotFlow, ChatNode, NodePositions } from '../../types/chatbot';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FlowDiagramProps {
  flow: ChatbotFlow;
  nodePositions: NodePositions;
  currentNodeId: number;
  onNodeSelect: (nodeId: number) => void;
}

// Hierarchy tree node interface
interface TreeNode {
  node: ChatNode;
  depth: number;
  index: number;
  children: TreeNode[];
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({
  flow,
  currentNodeId,
  onNodeSelect
}) => {
  // Build hierarchy structure
  const buildHierarchy = (): TreeNode | null => {
    const rootNode = flow.find(node => node.id === 1);
    if (!rootNode) return null;

    // Create node map for quick lookup
    const nodeMap = flow.reduce<Record<number, ChatNode>>((map, node) => {
      map[node.id] = node;
      return map;
    }, {});

    // Track visited nodes to prevent circular references
    const visited = new Set<number>();

    // Recursively build node tree
    const buildNodeTree = (nodeId: number, depth: number, index: number): TreeNode | null => {
      // Check for circular references
      if (visited.has(nodeId)) return null;
      visited.add(nodeId);

      const node = nodeMap[nodeId];
      if (!node) return null;

      const children = node.options
        .map((option, idx) => buildNodeTree(option.nextId, depth + 1, idx))
        .filter((child): child is TreeNode => child !== null);

      return {
        node,
        depth,
        index,
        children
      };
    };

    return buildNodeTree(rootNode.id, 0, 0);
  };

  // Recursively render node from hierarchy
  const renderNode = (item: TreeNode): React.ReactElement => {
    const { node, depth, children } = item;

    // Debug log to check hierarchyPath
    console.log(`FlowDiagram renderNode - Node ID: ${node.id}, hierarchyPath: ${node.hierarchyPath}`);

    return (
      <div key={node.id} className="flex flex-col mb-8">
        <div className="flex items-start">
          {/* Indentation and connection lines */}
          {depth > 0 && (
            <>
              {Array(depth).fill(0).map((_, i) => (
                <div key={i} className={`w-10 ${i < depth - 1 ? 'border-l-2 border-gray-500' : ''}`}></div>
              ))}
              <div className="w-10 h-10 border-b-4 border-l-4 border-gray-500 mr-3"></div>
            </>
          )}

          {/* Node */}
          <div
            className={`px-5 py-3 rounded-lg shadow-md cursor-pointer border-2
              ${currentNodeId === node.id
                ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-200'
                : 'bg-white border-gray-300'}`}
            style={{ minWidth: '240px' }}
            onClick={() => onNodeSelect(node.id)}
          >
            {/* Node ID - display hierarchyPath if available, otherwise fallback to node.id */}
            <div className="text-xs font-medium text-gray-600 mb-1">
              Node {node.hierarchyPath || node.id}
            </div>

            {/* Node title - larger, more prominent */}
            <div className="text-base font-bold text-gray-900 mb-2 truncate">{node.title}</div>

            {/* Options - improved visibility */}
            {node.options.length > 0 && (
              <div className="text-sm text-gray-800 mt-2 border-t border-gray-300 pt-2">
                {node.options.map((option, optIdx) => {
                  // Find the target node to get its hierarchyPath
                  const targetNode = flow.find(n => n.id === option.nextId);
                  const targetDisplay = targetNode?.hierarchyPath || option.nextId;
                  
                  return (
                    <div key={optIdx} className="flex items-center py-1.5">
                      <span className="mr-2 text-blue-600 font-bold">•</span>
                      <span className="truncate font-medium flex-1">{option.label}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">→ Node {targetDisplay}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {children.length > 0 && (
          <div className="flex flex-col ml-10 mt-3">
            {children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  const hierarchy = buildHierarchy();

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-6">
        {hierarchy && renderNode(hierarchy)}
      </div>
    </ScrollArea>
  );
};

export default FlowDiagram;

import { ChatbotFlow, ChatNode, NodePositions } from '../../types/chatbot';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState, useRef, useCallback } from 'react';

interface FlowDiagramProps {
  flow: ChatbotFlow;
  nodePositions: NodePositions;
  currentNodeId: number;
  onNodeSelect: (nodeId: number) => void;
  onDeleteNode?: (nodeId: number) => void;
  onAddNode?: (parentId: number) => void;
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
  onNodeSelect,
  onDeleteNode,
  onAddNode
}) => {
  // Pan operation state
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Pan operation handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if clicked on a node (element with cursor-pointer class or its children)
    const isNodeClick = target.closest('.cursor-pointer') !== null;
    
    if (!isNodeClick) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning || !scrollAreaRef.current) return;

    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;

    const viewport = scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]') as HTMLElement;
    if (viewport) {
      viewport.scrollLeft -= deltaX;
      viewport.scrollTop -= deltaY;
    }

    setLastPanPoint({ x: e.clientX, y: e.clientY });
  }, [isPanning, lastPanPoint]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPanning(false);
  }, []);

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
    
    // Calculate dynamic width based on content length
    const nodeDisplayId = node.hierarchyPath || node.id;
    const titleLength = node.title.length;
    const idLength = nodeDisplayId.toString().length;
    const minWidth = Math.max(240, (titleLength + idLength) * 8 + 100);


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
            className={`relative px-5 py-3 rounded-lg shadow-md cursor-pointer border-2
              ${currentNodeId === node.id
                ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-200'
                : 'bg-white border-gray-300'}`}
            style={{ minWidth: `${minWidth}px` }}
            onClick={() => onNodeSelect(node.id)}
          >
            {/* Action buttons for selected node */}
            {currentNodeId === node.id && (
              <div className="absolute top-2 right-2 flex gap-1">
                {/* Add node button */}
                {onAddNode && (
                  <button
                    className="w-6 h-6 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 hover:text-green-800 rounded flex items-center justify-center text-xs transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddNode(node.id);
                    }}
                    title="Add child node"
                  >
                    +
                  </button>
                )}
                
                {/* Delete button (except root node) */}
                {node.id !== 1 && onDeleteNode && (
                  <button
                    className="w-6 h-6 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 hover:text-red-800 rounded flex items-center justify-center text-xs transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNode(node.id);
                    }}
                    title="Delete node"
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            {/* Node ID - display hierarchyPath if available, otherwise fallback to node.id */}
            <div className="text-xs font-medium text-gray-600 mb-1 pr-8">
              Node {node.hierarchyPath || node.id}
            </div>

            {/* Node title - larger, more prominent */}
            <div className="text-base font-bold text-gray-900 mb-2 pr-8 break-words">{node.title}</div>

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
                      <span className="font-medium flex-1 break-words">{option.label}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded ml-2 break-all">→ Node {targetDisplay}</span>
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
    <ScrollArea 
      ref={scrollAreaRef}
      className="h-full w-full"
    >
      <div 
        className={`p-6 min-w-max ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        data-pannable="true"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {hierarchy && renderNode(hierarchy)}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default FlowDiagram;

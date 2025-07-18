import { useState, useCallback, useMemo, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FlowDiagram from './FlowDiagram';
import NodeEditor from './NodeEditor';
import ChatPreview from './ChatPreview';
import { generateNodePositions, generateNewId, exportFlowToFile, updateFlowWithHierarchyPaths } from './utils';
import { ChatbotFlow, ChatNode, ChatOption } from '@/types/chatbot';

// Dynamically import dialog components with lazy loading
const AddNodeDialog = lazy(() => import('./dialogs/AddNodeDialog'));
const EditOptionDialog = lazy(() => import('./dialogs/EditOptionDialog'));
const ImportDialog = lazy(() => import('./dialogs/ImportDialog'));
const ExportDialog = lazy(() => import('./dialogs/ExportDialog'));
const DeleteNodeDialog = lazy(() => import('./dialogs/DeleteNodeDialog'));

// Initial flow data
const initialFlow: ChatbotFlow = [
  {
    id: 1,
    title: "Welcome to the chatflow",
    options: [
      { label: "Option 1", nextId: 2 },
      { label: "Option 2", nextId: 3 },
      { label: "Option 3", nextId: 4 }
    ],
    hierarchyPath: "1"
  },
  {
    id: 2,
    title: "Node 1 title",
    options: [],
    parentId: 1,
    hierarchyPath: "1-1"
  },
  {
    id: 3,
    title: "Node 2 title",
    options: [],
    parentId: 1,
    hierarchyPath: "1-2"
  },
  {
    id: 4,
    title: "Node 3 title",
    options: [],
    parentId: 1,
    hierarchyPath: "1-3"
  }
];

// Dialog state type definition
type DialogState = {
  addNode: boolean;
  addOption: boolean;
  import: boolean;
  export: boolean;
  deleteNode: boolean;
};

export default function ChatbotEditor() {
  // Initialize with hierarchical initial flow
  const hierarchicalInitialFlow = useMemo(
    () => updateFlowWithHierarchyPaths(initialFlow),
    []
  );
  
  // State management
  const [flow, setFlow] = useState<ChatbotFlow>(hierarchicalInitialFlow);
  const [currentNodeId, setCurrentNodeId] = useState<number>(1);
  const [dialogState, setDialogState] = useState<DialogState>({
    addNode: false,
    addOption: false,
    import: false,
    export: false,
    deleteNode: false
  });
  const [editingOptionIndex, setEditingOptionIndex] = useState<number | null>(null);
  const [nodeToDelete, setNodeToDelete] = useState<number | null>(null);
  
  // Get currently selected node - memoized to prevent recalculation
  const currentNode = useMemo((): ChatNode => {
    const foundNode = flow.find((n) => n.id === currentNodeId);
    return foundNode || flow[0] || initialFlow[0]!;
  }, [flow, currentNodeId]);
  
  // Calculate node positions - memoized
  const nodePositions = useMemo(() => 
    generateNodePositions(flow),
    [flow]
  );
  
  // Dialog open/close handler
  const toggleDialog = useCallback((dialogName: keyof DialogState, isOpen: boolean) => {
    setDialogState(prev => ({ ...prev, [dialogName]: isOpen }));
  }, []);
  
  // Node selection handler
  const handleNodeSelect = useCallback((nodeId: number) => {
    setCurrentNodeId(nodeId);
  }, []);
  
  // Handle opening add node dialog with specific parent
  const handleOpenAddNode = useCallback((parentId: number) => {
    setCurrentNodeId(parentId);
    toggleDialog('addNode', true);
  }, [toggleDialog]);

  // Node addition handler
  const handleAddNode = useCallback((title: string) => {
    setFlow(prevFlow => {
      const newId = generateNewId(prevFlow);
      const parentNode = prevFlow.find(node => node.id === currentNodeId);
      
      if (!parentNode) return prevFlow;
      
      // Get parent path
      const parentPath = parentNode.hierarchyPath || parentNode.id.toString();
      
      // Count sibling nodes with the same parent
      const siblings = prevFlow.filter(node => node.parentId === parentNode.id);
      const childIndex = siblings.length + 1;
      
      // Create hierarchy path
      const hierarchyPath = `${parentPath}-${childIndex}`;
      
      // Create new node
      const newNode: ChatNode = {
        id: newId,
        title: title,
        options: [],
        parentId: parentNode.id,
        hierarchyPath: hierarchyPath
      };
    
      // Add new option to parent node
      const updatedParentNode = {
        ...parentNode,
        options: [
          ...parentNode.options,
          { label: `Option to ${title}`, nextId: newId }
        ]
      };
      
      // Update flow
      const updatedFlow = prevFlow.map(node => 
        node.id === parentNode.id ? updatedParentNode : node
      );
      
      // Set the new node as selected
      setCurrentNodeId(newId);
      
      return [...updatedFlow, newNode];
    });
    
    toggleDialog('addNode', false);
  }, [currentNodeId, toggleDialog]);
  
  // Node update handler
  const handleUpdateNode = useCallback((title: string) => {
    setFlow(prevFlow => prevFlow.map(node => 
      node.id === currentNodeId 
        ? { ...node, title } 
        : node
    ));
  }, [currentNodeId]);
  
  // Open add option dialog handler
  const handleOpenAddOption = useCallback(() => {
    setEditingOptionIndex(null);
    toggleDialog('addOption', true);
  }, [toggleDialog]);
  
  // Open edit option dialog handler
  const handleEditOption = useCallback((index: number) => {
    setEditingOptionIndex(index);
    toggleDialog('addOption', true);
  }, [toggleDialog]);
  
  // Option save handler (add & edit)
  const handleSaveOption = useCallback((label: string, nextId: number) => {
    setFlow(prevFlow => prevFlow.map(node => {
      if (node.id === currentNodeId) {
        let updatedOptions: ChatOption[];
        
        if (editingOptionIndex !== null) {
          // Update existing option
          updatedOptions = node.options.map((opt, idx) => 
            idx === editingOptionIndex 
              ? { label, nextId } 
              : opt
          );
        } else {
          // Add new option
          updatedOptions = [
            ...node.options, 
            { label, nextId }
          ];
        }
        
        return { ...node, options: updatedOptions };
      }
      return node;
    }));
    
    toggleDialog('addOption', false);
    setEditingOptionIndex(null);
  }, [currentNodeId, editingOptionIndex, toggleDialog]);
  
  // Option removal handler
  const handleRemoveOption = useCallback((index: number) => {
    setFlow(prevFlow => prevFlow.map(node => {
      if (node.id === currentNodeId) {
        const newOptions = [...node.options];
        newOptions.splice(index, 1);
        return { ...node, options: newOptions };
      }
      return node;
    }));
  }, [currentNodeId]);

  // Node deletion confirmation handler
  const handleDeleteNode = useCallback((nodeId: number) => {
    // Prevent deleting the root node
    if (nodeId === 1) {
      return;
    }

    setNodeToDelete(nodeId);
    toggleDialog('deleteNode', true);
  }, [toggleDialog]);

  // Actual node deletion handler
  const handleConfirmDeleteNode = useCallback(() => {
    if (!nodeToDelete) return;

    setFlow(prevFlow => {
      // Remove the node from the flow
      const updatedFlow = prevFlow.filter(node => node.id !== nodeToDelete);
      
      // Find and remove any options that point to the deleted node
      const cleanedFlow = updatedFlow.map(node => ({
        ...node,
        options: node.options.filter(option => option.nextId !== nodeToDelete)
      }));
      
      // If the deleted node was currently selected, select the root node
      if (currentNodeId === nodeToDelete) {
        setCurrentNodeId(1);
      }
      
      return cleanedFlow;
    });

    setNodeToDelete(null);
  }, [nodeToDelete, currentNodeId]);
  
  // Import handler
  const handleImport = useCallback((importedFlow: ChatbotFlow) => {
    setFlow(importedFlow);
    if (importedFlow.length > 0 && importedFlow[0]) {
      setCurrentNodeId(importedFlow[0].id);
    }
    toggleDialog('import', false);
  }, [toggleDialog]);
  
  // Export handler
  const handleExport = useCallback(() => {
    exportFlowToFile(flow);
  }, [flow]);
  
  // Get currently editing option
  const editingOption = useMemo(() => {
    if (editingOptionIndex !== null && currentNode?.options?.[editingOptionIndex]) {
      return currentNode.options[editingOptionIndex];
    }
    return null;
  }, [currentNode?.options, editingOptionIndex]);
  
  // Helper function to get hierarchy path from nextId
  const getHierarchyPathFromNextId = (nextId: number): string => {
    const targetNode = flow.find(n => n.id === nextId);
    return targetNode?.hierarchyPath || nextId.toString();
  };
  
  return (
    <div className="flex h-screen w-full bg-background text-foreground p-4 gap-4">
      {/* Left: Workflow diagram (60%) */}
      <div className="w-3/5 h-full flex flex-col">
        <Card className="h-full flex flex-col overflow-hidden">
          <CardHeader className="py-2 px-4 border-b shrink-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Workflow Editor</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 px-4 py-1 h-auto text-sm font-medium"
                  onClick={() => toggleDialog('export', true)}
                >
                  Export
                </Button>
                <Button 
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 px-4 py-1 h-auto text-sm font-medium"
                  onClick={() => toggleDialog('import', true)}
                >
                  Import
                </Button>
              </div>
            </div>
          </CardHeader>
                  
          <CardContent className="p-0 flex-1 overflow-hidden">
            <FlowDiagram 
              flow={flow}
              nodePositions={nodePositions}
              currentNodeId={currentNodeId}
              onNodeSelect={handleNodeSelect}
              onDeleteNode={handleDeleteNode}
              onAddNode={handleOpenAddNode}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Right: Chat preview and node editor (40%) */}
      <div className="w-2/5 h-full flex flex-col gap-4">
        {/* Chat preview (upper half) */}
        <div className="h-[calc(50%-8px)]">
          <ChatPreview 
            flow={flow}
            onNodeSelect={handleNodeSelect}
          />
        </div>
        
        {/* Node editor (lower half) */}
        <div className="h-[calc(50%-8px)]">
          <NodeEditor 
            node={currentNode}
            flow={flow}
            onUpdateNode={handleUpdateNode}
            onAddOption={handleOpenAddOption}
            onEditOption={handleEditOption}
            onRemoveOption={handleRemoveOption}
          />
        </div>
      </div>
      
      {/* Dialog components - only rendered when needed */}
      {dialogState.addNode && (
        <AddNodeDialog 
          open={dialogState.addNode}
          onClose={() => toggleDialog('addNode', false)}
          onAddNode={handleAddNode}
        />
      )}
      
      {dialogState.addOption && (
        <EditOptionDialog 
          open={dialogState.addOption}
          onClose={() => {
            toggleDialog('addOption', false);
            setEditingOptionIndex(null);
          }}
          flow={flow}
          initialLabel={editingOption?.label || ''}
          initialNextId={editingOption ? getHierarchyPathFromNextId(editingOption.nextId) : ''}
          isEditing={editingOptionIndex !== null}
          onSaveOption={handleSaveOption}
        />
      )}
      
      {dialogState.import && (
        <ImportDialog 
          open={dialogState.import}
          onClose={() => toggleDialog('import', false)}
          onImport={handleImport}
        />
      )}
      
      {dialogState.export && (
        <ExportDialog 
          open={dialogState.export}
          onClose={() => toggleDialog('export', false)}
          flow={flow}
          onExport={handleExport}
        />
      )}

      {dialogState.deleteNode && nodeToDelete && (
        <DeleteNodeDialog 
          open={dialogState.deleteNode}
          onClose={() => {
            toggleDialog('deleteNode', false);
            setNodeToDelete(null);
          }}
          onConfirm={handleConfirmDeleteNode}
          nodeTitle={flow.find(n => n.id === nodeToDelete)?.title || ''}
          nodeId={nodeToDelete}
        />
      )}
    </div>
  );
}

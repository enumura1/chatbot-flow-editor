import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { ChatbotFlow } from '../../../types/chatbot';

interface EditOptionDialogProps {
  open: boolean;
  onClose: () => void;
  flow: ChatbotFlow;
  initialLabel?: string;
  initialNextId?: string;
  isEditing: boolean;
  onSaveOption: (label: string, nextId: number) => void;
}

const EditOptionDialog: React.FC<EditOptionDialogProps> = ({ 
  open, 
  onClose, 
  flow,
  initialLabel = '',
  initialNextId = '',
  isEditing,
  onSaveOption 
}) => {
  const [optionLabel, setOptionLabel] = useState(initialLabel);
  const [nextNodeId, setNextNodeId] = useState(initialNextId);
  const [error, setError] = useState<string | null>(null);
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setOptionLabel(initialLabel);
      setNextNodeId(initialNextId);
      setError(null);
    }
  }, [open, initialLabel, initialNextId]);
  
  const validateAndSubmit = () => {
    // Validate inputs
    if (!optionLabel.trim()) {
      setError('Please enter an option label');
      return;
    }
    
    if (!nextNodeId) {
      setError('Please enter a node ID');
      return;
    }
    
    // Check if it's a numeric ID or hierarchyPath
    const targetNode = flow.find(node => 
      node.id.toString() === nextNodeId || 
      node.hierarchyPath === nextNodeId
    );
    
    if (!targetNode) {
      setError('The specified node ID does not exist');
      return;
    }
    
    // All validations passed
    onSaveOption(optionLabel, targetNode.id);
    setError(null);
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      title={isEditing ? "Edit Option" : "Add Option"}
      footer={
        <>
          <button 
            className="px-3 py-1 border rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-3 py-1 bg-blue-600 text-white rounded-md"
            onClick={validateAndSubmit}
          >
            Save
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Option Label</label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            value={optionLabel}
            onChange={(e) => setOptionLabel(e.target.value)}
            placeholder="Enter option text"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Next Node ID</label>
          <div className="flex space-x-2">
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              value={nextNodeId}
              onChange={(e) => setNextNodeId(e.target.value)}
              placeholder="Enter ID of the next node to display (e.g., 1-1-1)"
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EditOptionDialog;

import { useState, useEffect } from 'react';
import Dialog from './Dialog';

interface AddNodeDialogProps {
  open: boolean;
  onClose: () => void;
  initialTitle?: string;
  onAddNode: (title: string) => void;
}

const AddNodeDialog: React.FC<AddNodeDialogProps> = ({ 
  open, 
  onClose, 
  initialTitle = '',
  onAddNode 
}) => {
  const [nodeTitle, setNodeTitle] = useState(initialTitle);
  
  // Reset title when dialog opens
  useEffect(() => {
    if (open) {
      setNodeTitle(initialTitle);
    }
  }, [open, initialTitle]);
  
  const handleSubmit = () => {
    if (nodeTitle.trim()) {
      onAddNode(nodeTitle);
      setNodeTitle('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      title="Add New Node"
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
            onClick={handleSubmit}
          >
            Add
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Display Text</label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            value={nodeTitle}
            onChange={(e) => setNodeTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text to display in chat"
            autoFocus
          />
        </div>
      </div>
    </Dialog>
  );
};

export default AddNodeDialog;

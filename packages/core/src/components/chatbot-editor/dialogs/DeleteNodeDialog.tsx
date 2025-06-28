import { Button } from '@/components/ui/button';
import SimpleDialog from './Dialog';

interface DeleteNodeDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nodeTitle: string;
  nodeId: number;
}

export default function DeleteNodeDialog({ 
  open, 
  onClose, 
  onConfirm, 
  nodeTitle,
  nodeId
}: DeleteNodeDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <SimpleDialog
      open={open}
      onClose={onClose}
      title="Delete Node"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="outline" 
            onClick={handleConfirm}
            className="bg-red-50 hover:bg-red-100 border-red-200 text-red-800"
          >
            Delete
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete this node?
        </p>
        
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-600">Node {nodeId}</div>
          <div className="font-medium text-gray-900">{nodeTitle}</div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 p-3 rounded">
          <div className="text-sm text-gray-700">
            This action cannot be undone.
          </div>
        </div>
      </div>
    </SimpleDialog>
  );
}
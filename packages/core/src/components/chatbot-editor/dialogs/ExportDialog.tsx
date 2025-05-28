import Dialog from './Dialog';
import { ChatbotFlow } from '../../../types/chatbot';
// ScrollArea import を削除

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  flow: ChatbotFlow;
  onExport: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ 
  open, 
  onClose,
  flow,
  onExport
}) => {
  const jsonString = JSON.stringify(flow, null, 2);
  
  const handleDownload = () => {
    onExport();
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      title="Export JSON"
      footer={
        <>
          <button 
            className="px-3 py-1 border rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-3 py-1 bg-green-600 text-white rounded-md ml-2"
            onClick={handleDownload}
          >
            Download
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm">
          Below is the JSON representation of your chatbot flow. Review it and click Download to save it as a file.
        </p>
        
        <div className="border rounded-md bg-gray-50 dark:bg-gray-800 h-80 overflow-y-auto">
          <pre className="p-4 text-xs font-mono whitespace-pre-wrap break-words">
            {jsonString}
          </pre>
        </div>
      </div>
    </Dialog>
  );
};

export default ExportDialog;
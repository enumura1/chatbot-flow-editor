import { useState, useRef } from 'react';
import Dialog from './Dialog';
import { parseImportedJson } from '../utils';
import { ChatbotFlow } from '../../../types/chatbot';

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (flow: ChatbotFlow) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ open, onClose, onImport }) => {
  const [importJson, setImportJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImportJson(e.target.result as string);
          setError(null);
        }
      };
      reader.onerror = () => {
        setError('Failed to read file');
      };
      reader.readAsText(file);
    }
  };
  
  const handleImport = () => {
    const parsedFlow = parseImportedJson(importJson);
    
    if (parsedFlow) {
      onImport(parsedFlow);
      setImportJson('');
      setError(null);
    } else {
      setError('Invalid JSON format. Node array is required.');
    }
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      title="Import JSON"
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
            onClick={handleImport}
            disabled={!importJson.trim()}
          >
            Import
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
        
        <button 
          className="px-3 py-2 border rounded-md w-full text-center"
          onClick={() => fileInputRef.current?.click()}
        >
          Select a JSON file
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".json"
          onChange={handleFileChange}
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Or paste JSON directly</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            value={importJson}
            onChange={(e) => {
              setImportJson(e.target.value);
              setError(null);
            }}
            placeholder='[{"id":1,"title":"Example","options":[]}]'
            rows={10}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ImportDialog;

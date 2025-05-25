import { useState, useEffect } from 'react';
import { ChatNode, ChatOption } from '../../types/chatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NodeEditorProps {
  node: ChatNode;
  onUpdateNode: (title: string) => void;
  onAddOption: () => void;
  onEditOption: (index: number) => void;
  onRemoveOption: (index: number) => void;
}

const NodeEditor: React.FC<NodeEditorProps> = ({
  node,
  onUpdateNode,
  onAddOption,
  onEditOption,
  onRemoveOption
}) => {
  const [title, setTitle] = useState(node.title);
  
  // Update title when node changes
  useEffect(() => {
    setTitle(node.title);
  }, [node.id, node.title]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const handleSave = () => {
    onUpdateNode(title);
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="py-2 px-4 border-b shrink-0">
        <div className="flex justify-between items-center w-full">
          <CardTitle className="text-xl">
            {node.hierarchyPath ? `Node ${node.hierarchyPath} Edit` : `Node ${node.id} Edit`}
          </CardTitle>
          <Button 
            onClick={handleSave}
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300 px-4 py-1 h-auto text-sm font-medium"
          >
            Save
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pt-1 pb-4 flex-1 flex flex-col gap-2 overflow-hidden">
        <div className="shrink-0">
          <label className="block text-sm font-medium mb-2" htmlFor="node-title">
            Title
          </label>
          <Input
            id="node-title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter node title"
            className="w-full"
          />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="flex justify-between items-center mb-3 shrink-0">
            <label className="block text-sm font-medium">Option</label>
            <Button 
              onClick={onAddOption}
              size="sm"
              variant="outline"
              className="bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200"
            >
              Add an option
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="space-y-2 pr-3">
                {node.options.map((opt: ChatOption, idx: number) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-100">
                    <div className="text-sm truncate mr-2 flex-1">
                      <span className="font-medium">{opt.label}</span>
                      <span className="text-gray-500 text-xs ml-2">→ Node {opt.nextId}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 h-8 px-2 py-1"
                        onClick={() => onEditOption(idx)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="text-red-600 h-8 px-2 py-1"
                        onClick={() => onRemoveOption(idx)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                
                {node.options.length === 0 && (
                  <div className="text-gray-500 text-sm p-4 text-center bg-gray-50 rounded-md">
                    No options available. Use the `Add an option` button to add one.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeEditor;

import { useState, useRef } from 'react';
import { ChatbotFlow } from '../../types/chatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RefreshIcon } from '@/components/ui/icons';

interface Message {
  type: 'bot' | 'user';
  content: string;
  nodeId?: number;
}

interface ChatPreviewProps {
  flow: ChatbotFlow;
  onNodeSelect?: (nodeId: number) => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ 
  flow,
  onNodeSelect 
}) => {
  // Chat history state
  const [messages, setMessages] = useState<Message[]>([]);
  // Current node
  const [currentNodeId, setCurrentNodeId] = useState<number | null>(null);
  // Chat active state
  const [isChatActive, setIsChatActive] = useState(false);
  // Scroll reference
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Start chat function
  const startChat = () => {
    // Always start with node ID=1
    const rootNode = flow.find(node => node.id === 1);
    
    if (rootNode) {
      setMessages([{
        type: 'bot',
        content: rootNode.title,
        nodeId: rootNode.id
      }]);
      setCurrentNodeId(rootNode.id);
      setIsChatActive(true);
    }
  };

  // Reset chat function
  const resetChat = () => {
    setMessages([]);
    setCurrentNodeId(null);
    setIsChatActive(false);
  };

  // Option click handler
  const handleOptionClick = (option: { label: string; nextId: number }) => {
    // Add user message
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        content: option.label
      }
    ]);

    // Find next node
    const nextNode = flow.find(node => node.id === option.nextId);
    
    if (nextNode) {
      // Add a small delay to show the user message before bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            type: 'bot',
            content: nextNode.title,
            nodeId: nextNode.id
          }
        ]);
        setCurrentNodeId(nextNode.id);
        
        // Update selected node in editor (optional)
        if (onNodeSelect) {
          onNodeSelect(nextNode.id);
        }
        
        // Scroll to bottom
        scrollToBottom();
      }, 300);
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current;
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 100);
  };

  // Get current node options
  const getCurrentNodeOptions = () => {
    if (!currentNodeId) return [];
    const currentNode = flow.find(node => node.id === currentNodeId);
    return currentNode?.options || [];
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="py-3 px-4 border-b shrink-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Chat Preview</CardTitle>
          
          {/* Chat control buttons */}
          {isChatActive ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetChat}
              className="flex items-center gap-1"
            >
              <RefreshIcon className="h-4 w-4" />
              Reset
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={startChat}
              className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800"
            >
              Start Chat
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Message area - scrollable */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4" ref={scrollAreaRef}>
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'bot' && (
                      <div className="flex items-start max-w-[80%]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-xs">
                          Bot
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-gray-800 dark:text-gray-100">
                          <div>{message.content}</div>
                          
                          {/* Show options if this is the current node */}
                          {message.nodeId === currentNodeId && getCurrentNodeOptions().length > 0 && (
                            <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-800">
                              {getCurrentNodeOptions().map((opt, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  className="w-full justify-start font-normal text-left h-auto py-2 mb-2 bg-white hover:bg-gray-100 text-gray-800 border-gray-200"
                                  onClick={() => handleOptionClick(opt)}
                                >
                                  {opt.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {message.type === 'user' && (
                      <div className="flex items-start max-w-[80%] flex-row-reverse">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center ml-2 text-xs">
                          User
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg">
                          {message.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground p-6 text-center">
                  Click the `Start Chat` button to begin testing your chatbot.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* In the original UI, options are displayed within the bot message */}
        {/* Only show guidance in the bottom area */}
        {isChatActive && currentNodeId && messages.length > 0 && (
          <div className="border-t p-3 bg-muted/10 shrink-0 text-center">
            {getCurrentNodeOptions().length === 0 ? (
              <div className="text-muted-foreground py-2">
                No options available (end of conversation)
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">
                ↑ Click on options in the message to continue the conversation
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatPreview;

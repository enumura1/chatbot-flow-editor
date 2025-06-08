import { useState } from 'react';
import { ChatNode, ChatOption, Message } from './types';
import ChatWindow from './ChatWindow';

interface SimpleChatbotProps {
  flow: ChatNode[];
  title?: string;
}

export default function SimpleChatbot({ flow, title = "Chat Assistant" }: SimpleChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);

  const getCurrentNode = () => flow.find(node => node.id === currentNodeId);

  const handleOpen = () => {
    setIsOpen(true);
    const firstNode = flow.find(node => node.id === 1);
    if (firstNode && messages.length === 0) {
      setMessages([{ type: 'bot', text: firstNode.title }]);
    }
  };

  const handleOptionClick = (option: ChatOption) => {
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    
    const nextNode = flow.find(node => node.id === option.nextId);
    if (nextNode) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: nextNode.title }]);
        setCurrentNodeId(option.nextId);
      }, 800);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentNodeId(1);
    const firstNode = flow.find(node => node.id === 1);
    if (firstNode) {
      setTimeout(() => {
        setMessages([{ type: 'bot', text: firstNode.title }]);
      }, 100);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          title={title}
          messages={messages}
          currentNode={getCurrentNode()}
          onOptionClick={handleOptionClick}
          onReset={handleReset}
          onClose={handleClose}
        />
      )}
    </>
  );
}

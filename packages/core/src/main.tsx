import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChatbotEditor from './components/chatbot-editor'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="w-full h-screen">
      <ChatbotEditor />
    </div>
  </StrictMode>,
)

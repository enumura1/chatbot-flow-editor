// Main component export
export { default as ChatbotEditor } from './components/chatbot-editor'

// Sub-components for advanced usage
export { default as FlowDiagram } from './components/chatbot-editor/FlowDiagram'
export { default as NodeEditor } from './components/chatbot-editor/NodeEditor'
export { default as ChatPreview } from './components/chatbot-editor/ChatPreview'

// Utility functions
export {
  generateNewId,
  generateNodePositions,
  exportFlowToFile,
  parseImportedJson,
  updateFlowWithHierarchyPaths
} from './components/chatbot-editor/utils'

// Types
export type {
  ChatOption,
  ChatNode,
  NodePosition,
  NodePositions,
  ChatbotFlow
} from './types/chatbot'

// Styles
import './index.css'

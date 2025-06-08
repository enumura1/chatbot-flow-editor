import SimpleChatbot from '../components/SimpleChatbot';
import basicFlow from '../flows/basic-flow.json';

interface BasicExampleProps {
  onBack?: () => void;
}

export default function BasicExample({onBack}:BasicExampleProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Examples
          </button>
        )}
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Basic Chatbot Example
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This demonstrates a simple chatbot using JSON exported from Chatbot Flow Editor.
            Click the chat button in the bottom right to start a conversation.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Simple Flow</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              This example uses a basic conversation flow with product and service inquiries.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Easy Integration</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Just import your exported JSON flow and pass it to the SimpleChatbot component.
            </p>
          </div>
        </div>

        {/* Flow Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Flow Structure</h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-700">
              {JSON.stringify(basicFlow.slice(0, 2), null, 2)}
              <span className="text-gray-500">
                {'\n'}// ... and {basicFlow.length - 2} more nodes
              </span>
            </pre>
          </div>
        </div>

        {/* Usage Code */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Usage</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-blue-300">
{`import SimpleChatbot from './components/SimpleChatbot';
import basicFlow from './flows/basic-flow.json';

export default function App() {
    return (
        <div>
        <SimpleChatbot 
            flow={basicFlow} 
            title="Basic Assistant" 
        />
        </div>
    );
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <SimpleChatbot 
        flow={basicFlow} 
        title="Basic Assistant"
      />
    </div>
  );
}

import SimpleChatbot from '../components/SimpleChatbot';
import supportFlow from '../flows/customer-support-flow.json';

interface CustomerSupportExampleProps {
  onBack?: () => void;
}

export default function CustomerSupportExample({ onBack }: CustomerSupportExampleProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
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
            Customer Support Chatbot Example
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This demonstrates a customer support chatbot using JSON exported from Chatbot Flow Editor.
            Click the chat button in the bottom right to start a conversation.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Customer Service Flow</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              This example handles customer service scenarios including orders, shipping, and returns.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Support Automation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Automate common support tasks and guide customers to quick resolutions.
            </p>
          </div>
        </div>

        {/* Flow Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Flow Structure</h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-700">
              {JSON.stringify(supportFlow.slice(0, 2), null, 2)}
              <span className="text-gray-500">
                {'\n'}// ... and {supportFlow.length - 2} more nodes
              </span>
            </pre>
          </div>
        </div>

        {/* Usage Code */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Usage</h3>
          <div className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-blue-300">
{`import SimpleChatbot from './components/SimpleChatbot';
import supportFlow from './flows/customer-support-flow.json';

export default function App() {
    return (
        <div>
        <SimpleChatbot 
            flow={supportFlow} 
            title="Customer Support" 
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
        flow={supportFlow} 
        title="Customer Support"
      />
    </div>
  );
}

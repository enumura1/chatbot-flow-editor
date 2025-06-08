import { useState } from 'react';
import BasicExample from './examples/BasicExample';
import CustomerSupportExample from './examples/CustomerSupportExample';

type ExampleType = 'home' | 'basic' | 'support';

export default function App() {
  const [currentExample, setCurrentExample] = useState<ExampleType>('home');

  if (currentExample === 'basic') {
    return <BasicExample onBack={() => setCurrentExample('home')} />;
  }

  if (currentExample === 'support') {
    return <CustomerSupportExample onBack={() => setCurrentExample('home')} />;
  }

  // Home page - Example selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Chatbot Flow Editor Examples
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore real-world examples of chatbots built with JSON flows exported from 
              Chatbot Flow Editor. 
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Basic Example Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Basic Chatbot</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                A simple conversation flow covering product and service inquiries.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Products & Services
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  7 Nodes
                </span>
              </div>
              <button
                onClick={() => setCurrentExample('basic')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                View Example →
              </button>
            </div>
          </div>

          {/* Customer Support Example Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Customer Support</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                A conversation flow for customer service scenarios including orders, shipping, and returns.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Customer Service
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  11 Nodes
                </span>
              </div>
              <button
                onClick={() => setCurrentExample('support')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                View Example →
              </button>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Design Flow</h3>
              <p className="text-gray-600">
                Create your conversation flow using the visual Chatbot Flow Editor
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Export JSON</h3>
              <p className="text-gray-600">
                Export your flow as clean, structured JSON data
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrate</h3>
              <p className="text-gray-600">
                Use the JSON in your React app with the SimpleChatbot component
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Try these examples to see how JSON flows work in practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentExample('basic')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200"
            >
              Try Basic Example
            </button>
            <button
              onClick={() => setCurrentExample('support')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200"
            >
              Try Support Example
            </button>
          </div>
        </div>
      </div>

      {/* Back to top on individual example pages */}
      {currentExample !== 'home' && (
        <button
          onClick={() => setCurrentExample('home')}
          className="fixed top-6 left-6 bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-xl shadow-lg transition-colors duration-200 z-40"
        >
          ← Back to Examples
        </button>
      )}
    </div>
  );
}
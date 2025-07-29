import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import CodePreview from './CodePreview';
import ComponentPreview from './ComponentPreview';
import ollamaService from '../../services/ollamaService';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiCode, FiEye, FiDownload, FiSettings, FiPlay, FiLoader, FiCheck, FiX, FiRefreshCw, FiSliders } = FiIcons;

const AICodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('llama3.1:latest');
  const [activeTab, setActiveTab] = useState('code');
  const [error, setError] = useState('');
  const [generationHistory, setGenerationHistory] = useState([]);
  const [streamingText, setStreamingText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState('react');
  const [temperature, setTemperature] = useState(0.7);
  const textareaRef = useRef(null);

  const technologies = [
    { id: 'react', name: 'React', icon: 'React' },
    { id: 'vue', name: 'Vue', icon: 'Code' },
    { id: 'svelte', name: 'Svelte', icon: 'Code' },
    { id: 'angular', name: 'Angular', icon: 'Code' },
    { id: 'html', name: 'HTML/CSS/JS', icon: 'Code' }
  ];

  useEffect(() => {
    checkOllamaConnection();
  }, []);

  const checkOllamaConnection = async () => {
    try {
      const connected = await ollamaService.checkConnection();
      setIsConnected(connected);
      
      if (connected) {
        const models = await ollamaService.getAvailableModels();
        setAvailableModels(models);
        if (models.length > 0 && !models.find(m => m.name === selectedModel)) {
          setSelectedModel(models[0].name);
        }
      }
    } catch (error) {
      setIsConnected(false);
      setError('Failed to connect to Ollama. Please ensure Ollama is running on localhost:11434');
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !isConnected) return;

    setIsGenerating(true);
    setError('');
    setStreamingText('');
    setGeneratedCode('');

    try {
      let fullResponse = '';
      
      await ollamaService.streamGenerate(
        prompt,
        (chunk) => {
          fullResponse += chunk;
          setStreamingText(fullResponse);
        },
        { 
          model: selectedModel,
          technology: selectedTechnology,
          temperature: temperature
        }
      );

      const cleanCode = ollamaService.extractComponentCode(fullResponse);
      setGeneratedCode(cleanCode);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        prompt: prompt.trim(),
        code: cleanCode,
        technology: selectedTechnology,
        timestamp: new Date().toISOString(),
        model: selectedModel
      };
      setGenerationHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsGenerating(false);
      setStreamingText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const loadFromHistory = (historyItem) => {
    setPrompt(historyItem.prompt);
    setGeneratedCode(historyItem.code);
    setSelectedModel(historyItem.model);
    setSelectedTechnology(historyItem.technology || 'react');
  };

  const downloadCode = () => {
    if (!generatedCode) return;
    
    const fileExtensions = {
      'react': 'jsx',
      'vue': 'vue',
      'svelte': 'svelte',
      'angular': 'ts',
      'html': 'html'
    };
    
    const extension = fileExtensions[selectedTechnology] || 'jsx';
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-component.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const examplePrompts = [
    "Create a modern pricing card component with three tiers",
    "Build a responsive navigation menu with dropdown animations",
    "Design a dashboard stats widget with charts and metrics",
    "Create a contact form with validation and smooth animations",
    "Build a product showcase carousel with thumbnails",
    "Design a testimonial section with customer reviews"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Component Generator
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Generate components using local AI models with Ollama
        </p>
        
        {/* Connection Status */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <SafeIcon icon={isConnected ? FiCheck : FiX} className="h-4 w-4" />
            <span className="text-sm font-medium">
              {isConnected ? 'Ollama Connected' : 'Ollama Disconnected'}
            </span>
          </div>
          
          {isConnected && (
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {availableModels.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
          )}
          
          <button
            onClick={checkOllamaConnection}
            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="h-4 w-4" />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 ${showSettings ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'} transition-colors`}
          >
            <SafeIcon icon={FiSettings} className="h-4 w-4" />
          </button>
        </div>

        {/* Technology Selection */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {technologies.map((tech) => (
            <button
              key={tech.id}
              onClick={() => setSelectedTechnology(tech.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTechnology === tech.id
                  ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500 ring-opacity-50'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon name={tech.icon} className="h-4 w-4 mr-2 inline-block" />
              {tech.name}
            </button>
          ))}
        </div>
        
        {/* Advanced Settings */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-xl p-6 mb-6 mx-auto max-w-2xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiSliders} className="mr-2" />
                Generation Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 w-10">{temperature}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Lower values produce more predictable outputs, higher values more creative ones
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Describe Your Component
            </h3>
            
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the component you want to create..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isGenerating}
            />
            
            <motion.button
              onClick={handleGenerate}
              disabled={!isConnected || isGenerating || !prompt.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={isGenerating ? FiLoader : FiZap} className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating...' : 'Generate Component'}</span>
            </motion.button>
            
            <p className="text-xs text-gray-500 mt-2">
              Press Ctrl/Cmd + Enter to generate
            </p>
          </div>

          {/* Example Prompts */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Example Prompts
            </h3>
            <div className="space-y-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="w-full text-left p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Generation History */}
          {generationHistory.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Generations
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {generationHistory.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="w-full text-left p-3 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="truncate text-gray-900 font-medium">
                      {item.prompt}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {item.technology || 'react'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'code'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={FiCode} className="h-4 w-4" />
                    <span>Code</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={FiEye} className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                </div>
                
                {generatedCode && (
                  <button
                    onClick={downloadCode}
                    className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="min-h-96">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 text-center"
                  >
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <SafeIcon icon={FiX} className="h-8 w-8 text-red-500 mx-auto mb-4" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  </motion.div>
                ) : isGenerating ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    <div className="flex items-center justify-center mb-6">
                      <SafeIcon icon={FiLoader} className="h-8 w-8 text-primary-500 animate-spin" />
                    </div>
                    {streamingText && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                          {streamingText}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                ) : generatedCode ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {activeTab === 'code' ? (
                      <CodePreview 
                        code={generatedCode} 
                        language={ollamaService.getLanguageFromTechnology(selectedTechnology)}
                      />
                    ) : (
                      <ComponentPreview 
                        code={generatedCode}
                        technology={selectedTechnology}
                      />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 text-center"
                  >
                    <SafeIcon icon={FiCode} className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Ready to Generate
                    </h3>
                    <p className="text-gray-600">
                      Describe your component and click generate to see AI-created code
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICodeGenerator;
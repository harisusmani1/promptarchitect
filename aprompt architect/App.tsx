
import React, { useState, useMemo } from 'react';
import showdown from 'showdown';
import { STEPS } from './constants';
import { PromptData, StepKey } from './types';
import { generateContent } from './services/geminiService';
import { SparklesIcon } from './components/icons';

const initialPromptData: PromptData = {
  [StepKey.CoreIdentity]: '',
  [StepKey.Context]: '',
  [StepKey.Constraints]: '',
  [StepKey.Canon]: '',
  [StepKey.Command]: '',
};

// Initialize showdown converter with GFM options
const converter = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  simpleLineBreaks: true,
});

const App: React.FC = () => {
  const [promptData, setPromptData] = useState<PromptData>(initialPromptData);
  const [llmResponse, setLlmResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (key: StepKey, value: string) => {
    setPromptData(prev => ({ ...prev, [key]: value }));
  };

  const generatedPrompt = useMemo(() => {
    const sections = STEPS.map(step => {
      const content = promptData[step.key].trim();
      if (!content) return '';
      return `## ${step.title}\n${content}`;
    }).filter(Boolean);

    return sections.join('\n\n');
  }, [promptData]);

  const hasContent = useMemo(() => generatedPrompt.trim() !== '', [generatedPrompt]);

  const handleSubmit = async () => {
    if (!hasContent) {
      setError('Please fill in at least one section to generate a prompt.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setLlmResponse('');

    try {
      const response = await generateContent(generatedPrompt);
      setLlmResponse(response);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderedHtmlResponse = useMemo(() => {
    if (!llmResponse) return '';
    return converter.makeHtml(llmResponse);
  }, [llmResponse]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Prompt Architect
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          A guided tool to construct complex, structured prompts for Large Language Models.
        </p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left column: Prompt inputs */}
        <div className="flex flex-col gap-6">
          {STEPS.map((step) => (
            <div key={step.key} className="bg-slate-800/50 rounded-lg p-5 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-purple-400">{step.icon}</span>
                <h2 className="text-xl font-semibold text-slate-100">{step.title}</h2>
              </div>
              <p className="text-slate-400 mb-4 text-sm">{step.description}</p>
              <textarea
                value={promptData[step.key]}
                onChange={(e) => handleInputChange(step.key, e.target.value)}
                placeholder={step.placeholder}
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200 resize-y scrollbar-thin"
                aria-label={`${step.title} input`}
              />
            </div>
          ))}
           <button
            onClick={handleSubmit}
            disabled={isLoading || !hasContent}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg shadow-purple-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500"
            aria-label="Generate AI response"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
             <>
               <SparklesIcon className="h-5 w-5" />
               Generate with AI
             </>
            )}
          </button>
        </div>

        {/* Right column: Output */}
        <div className="flex flex-col gap-6 sticky top-8 h-fit">
            <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700/50 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold text-slate-100 mb-3">Combined Prompt</h2>
              <div className="bg-slate-900 border border-slate-700 rounded-md p-3 flex-grow min-h-[200px] max-h-[40vh] overflow-auto scrollbar-thin">
                <pre className="text-slate-300 whitespace-pre-wrap font-sans text-sm">{generatedPrompt || 'Your combined prompt will appear here once you start typing.'}</pre>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700/50 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold text-slate-100 mb-3">AI Response</h2>
                <div className="bg-slate-900 border border-slate-700 rounded-md p-3 flex-grow min-h-[200px] max-h-[40vh] overflow-auto scrollbar-thin">
                    {isLoading && !llmResponse && (
                       <div className="flex items-center justify-center h-full text-slate-400">
                           <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" stroke="currentColor">
                               <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           <span>Thinking...</span>
                       </div>
                    )}
                    {error && <p className="text-red-400 p-4 bg-red-900/20 rounded-md">{error}</p>}
                    {llmResponse && (
                      <div
                        className="prose-dark font-sans text-sm"
                        dangerouslySetInnerHTML={{ __html: renderedHtmlResponse }}
                      />
                    )}
                    {!isLoading && !error && !llmResponse && (
                      <div className="flex items-center justify-center h-full text-slate-500">
                          <span>AI response will appear here.</span>
                      </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;

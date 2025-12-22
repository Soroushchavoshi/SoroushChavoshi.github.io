
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Asterisk, MessageSquarePlus, Key, ChevronRight } from 'lucide-react';
import { sendMessageToGemini, sendToolResponseToGemini, resetSession, initializeGemini, isGeminiInitialized } from '../services/geminiService';
import { ChatMessage } from '../types';

const INITIAL_PROMPTS = [
  "Tell me about Soroush",
  "What are his skills?"
];

const INITIAL_MESSAGE_TEXT = "I am Soroush AI. How can I help you today?";

const isRTL = (text: string) => {
  return /[\u0600-\u06FF]/.test(text);
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: INITIAL_MESSAGE_TEXT, timestamp: Date.now() }
  ]);
  const [suggestedActions, setSuggestedActions] = useState<string[]>(INITIAL_PROMPTS);
  const [isLoading, setIsLoading] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32); // Default 32px (approx bottom-8)
  
  // API Key Management State
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading, showApiKeyForm]);

  // Check for API Key on mount/open
  useEffect(() => {
      if (isOpen) {
          if (!isGeminiInitialized()) {
              const storedKey = localStorage.getItem('gemini_api_key');
              if (storedKey) {
                  initializeGemini(storedKey);
              } else {
                  setShowApiKeyForm(true);
              }
          }
      }
  }, [isOpen]);

  const handleSaveApiKey = () => {
      if (!apiKeyInput.trim()) return;
      initializeGemini(apiKeyInput.trim());
      localStorage.setItem('gemini_api_key', apiKeyInput.trim());
      setShowApiKeyForm(false);
      setMessages(prev => [...prev, { role: 'model', text: "Access granted! I'm ready to chat.", timestamp: Date.now() }]);
  };

  // Handle footer collision logic
  useEffect(() => {
    const handleScroll = () => {
        const footers = document.querySelectorAll('footer');
        let maxOffset = 32; 

        footers.forEach(footer => {
            const rect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // If footer is entering the viewport
            if (rect.top < windowHeight) {
                // Calculate how far the widget needs to be pushed up
                // We want the widget bottom to be 20px above the footer top
                const offset = (windowHeight - rect.top) + 20;
                if (offset > maxOffset) {
                    maxOffset = offset;
                }
            }
        });

        setBottomOffset(maxOffset);
    };

    // Use capture: true to ensure we catch scroll events from the project overlay container
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // --- Client Side Action Executors ---
  
  const executeFunction = async (name: string, args: any): Promise<string> => {
    console.log("Executing Tool:", name, args);
    
    try {
        switch (name) {
            case 'suggestActions':
                if (args.labels && Array.isArray(args.labels)) {
                  setSuggestedActions(args.labels);
                }
                return "Suggestions updated in UI.";

            default:
                return "Function not supported on this client.";
        }
    } catch (e) {
        console.error("Execution Error", e);
        return "Error executing action.";
    }
  };

  const processMessage = async (messageText: string) => {
    // Check initialization status instead of env var directly
    if (!isGeminiInitialized()) {
        setShowApiKeyForm(true);
        return;
    }

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: messageText, timestamp: Date.now() }]);
    // Clear suggestions immediately after user interaction to prevent stale chips
    setSuggestedActions([]); 

    try {
      const responseStream = await sendMessageToGemini(messageText);
      
      setMessages(prev => [...prev, { role: 'model', text: "", timestamp: Date.now() }]);
      let currentText = "";
      
      for await (const chunk of responseStream) {
        // 1. Handle Text Stream
        if (chunk.text) {
            currentText += chunk.text;
            setMessages(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].text = currentText;
                return newHistory;
            });
        }

        // 2. Handle Function Call (Tool Use)
        if (chunk.functionCall) {
            const { name, args, id } = chunk.functionCall;
            
            // Execute the action locally
            const resultString = await executeFunction(name, args);
            
            // Send the result back to Gemini so it knows it's done
            // and can generate a confirmation text
            const finalResponse = await sendToolResponseToGemini(id, name, resultString);
            
            // Append Gemini's final confirmation to the chat
            if (finalResponse.text) {
                currentText += finalResponse.text;
                setMessages(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text = currentText;
                    return newHistory;
                });
            }
        }
      }

    } catch (error: any) {
      console.error(error);
      if (error.message === 'API_KEY_MISSING' || error.toString().includes('API_KEY_MISSING')) {
         setShowApiKeyForm(true);
         setMessages(prev => prev.slice(0, -1)); // Remove the empty model message
      } else {
         setMessages(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].text += "\n[Connection Error. Please try again.]";
            return newHistory;
         });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    await processMessage(text);
  };

  const handlePromptClick = async (prompt: string) => {
    await processMessage(prompt);
  };

  const handleNewChat = () => {
    resetSession();
    setMessages([{ role: 'model', text: INITIAL_MESSAGE_TEXT, timestamp: Date.now() }]);
    setSuggestedActions(INITIAL_PROMPTS);
    setInput('');
    if (!isGeminiInitialized()) {
        setShowApiKeyForm(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTriggerClick = () => {
    setIsOpen(true);
  };

  const isInputRTL = isRTL(input);

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={handleTriggerClick}
        style={{ bottom: bottomOffset }}
        className={`fixed right-8 z-40 w-16 h-16 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-[transform,opacity,background-color,box-shadow,bottom] duration-500 cubic-bezier(0.77, 0, 0.175, 1) group ${
            isOpen ? 'hidden' : 'flex'
        } items-center justify-center bg-white text-black hover:bg-accent`}
      >
         <Asterisk 
           size={24} 
           className="transition-transform duration-500 group-hover:rotate-180" 
         />
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed right-4 md:right-8 w-[90vw] md:w-[420px] h-[600px] z-50 flex flex-col shadow-2xl transition-[transform,opacity,bottom] duration-500 transform origin-bottom-right border border-white/10 rounded-lg overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
        style={{
            // Overriding global glass-panel for a darker, blurrier look as requested
            backgroundColor: 'rgba(5, 5, 5, 0.9)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            bottom: bottomOffset,
        }}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-accent/20 flex items-center justify-center text-accent border border-accent/30">
                <Asterisk size={16} />
            </div>
            <div>
                <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-primary">Soroush AI</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button 
              onClick={handleNewChat}
              className="flex items-center gap-2 px-3 h-8 hover:bg-white/10 rounded-sm transition-colors text-secondary hover:text-primary text-xs font-medium uppercase tracking-wider"
              title="Start New Chat"
            >
              <MessageSquarePlus size={14} />
              <span className="hidden md:inline">New Chat</span>
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-sm transition-colors text-primary"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages Area OR API Key Form */}
        {showApiKeyForm ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 animate-reveal">
                 <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/30">
                    <Key size={28} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-bold font-sans text-white">API Key Required</h3>
                    <p className="text-sm text-secondary font-light leading-relaxed">
                        To use the AI chat outside of the demo environment, you need to provide your own Google Gemini API Key.
                    </p>
                 </div>
                 
                 <div className="w-full space-y-3">
                     <input 
                        type="password" 
                        placeholder="Paste your API Key here..."
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-sm text-white focus:border-accent focus:bg-white/10 focus:outline-none transition-colors font-sans"
                     />
                     <button 
                        onClick={handleSaveApiKey}
                        disabled={!apiKeyInput.trim()}
                        className="w-full bg-accent text-black font-bold uppercase tracking-widest text-xs py-3 rounded-md hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        Save & Connect <ChevronRight size={14} />
                     </button>
                 </div>

                 <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-secondary hover:text-white underline decoration-white/20 underline-offset-4 transition-colors"
                 >
                    Get a free API Key from Google AI Studio
                 </a>
            </div>
        ) : (
            <>
                <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div 
                        className={`max-w-[90%] leading-relaxed font-light font-sans ${
                          msg.role === 'user' 
                            ? 'p-3 rounded-lg bg-white text-black text-sm' 
                            : 'py-2 text-primary text-base' 
                        }`}
                      >
                        {msg.text.split('\n').map((line, i) => {
                           if (!line.trim()) return <div key={i} className="h-2"></div>;
                           const lineIsRTL = isRTL(line);
                           return (
                             <div 
                               key={i} 
                               dir={lineIsRTL ? 'rtl' : 'ltr'} 
                               className={lineIsRTL ? 'text-right' : 'text-left'}
                             >
                               {line}
                             </div>
                           );
                        })}
                      </div>
                    </div>
                  ))}

                   {isLoading && (
                    <div className="flex flex-col items-start">
                        <div className="px-0 py-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-[bounce_1s_infinite_-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-[bounce_1s_infinite_-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-[bounce_1s_infinite]"></span>
                        </div>
                    </div>
                   )}
                   <div ref={messagesEndRef} />
                </div>

                {/* Input Area with Top Chips */}
                <div className="border-t border-white/10 bg-black/40 flex flex-col">
                    {/* Dynamic Suggested Actions (Chips) */}
                    {!isLoading && suggestedActions.length > 0 && (
                         <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto no-scrollbar items-center justify-start">
                            {suggestedActions.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePromptClick(prompt)}
                                    dir={isRTL(prompt) ? 'rtl' : 'ltr'}
                                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-secondary hover:bg-accent hover:border-accent hover:text-black transition-all duration-300 font-sans whitespace-nowrap"
                                >
                                    {prompt}
                                </button>
                            ))}
                         </div>
                    )}
                    
                    <div className="p-5 pt-2 relative">
                        <textarea
                        value={input}
                        dir={isInputRTL ? 'rtl' : 'ltr'}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className={`w-full h-20 bg-transparent border-none focus:ring-0 p-0 text-base text-primary placeholder:text-white/20 font-sans resize-none focus:outline-none pb-8 ${isInputRTL ? 'text-right' : 'text-left'}`}
                        disabled={isLoading}
                        />
                        {/* Send button positioned absolutely at bottom right to always be "one line lower" */}
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="absolute bottom-4 right-5 p-2 text-white/50 hover:text-accent disabled:opacity-30 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </>
        )}
      </div>
    </>
  );
};

export default AIChat;

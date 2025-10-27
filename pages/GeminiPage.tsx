import React, { useState, useRef, useEffect } from 'react';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useGemini } from './hooks/useGemini';

const GeminiPage: React.FC = () => {
    const { messages, isLoading, error, sendMessage } = useGemini();
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };
    
    const suggestionChips = [
        'Find me a Pitco gas fryer',
        'What are your business hours?',
        'Tell me about Henny Penny',
        'List all refrigeration products'
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
            <div className="flex-shrink-0">
                <BackButton />
                <header className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-mks-dark mb-2">MKS AI Assistant</h1>
                    <p className="text-lg text-mks-gray">Your personal guide to our products and services.</p>
                </header>
            </div>
            
            <div className="flex-grow bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                <div className="flex-grow p-6 space-y-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {msg.role === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-mks-red text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    AI
                                </div>
                           )}
                           <div className={`max-w-lg p-3 rounded-lg whitespace-pre-wrap ${msg.role === 'user' ? 'bg-mks-navy text-white' : 'bg-mks-light-gray text-mks-dark'}`}>
                                {msg.text}
                           </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="w-8 h-8 rounded-full bg-mks-red text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                AI
                            </div>
                            <div className="max-w-lg p-3 rounded-lg bg-mks-light-gray text-mks-dark">
                                <LoadingSpinner />
                            </div>
                        </div>
                    )}
                     {error && (
                        <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                {messages.length <= 1 && !isLoading && (
                    <div className="p-4 border-t border-mks-gray/20">
                        <p className="text-sm text-center text-mks-gray mb-2">Try asking one of these:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {suggestionChips.map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => handleSuggestionClick(chip)}
                                    className="px-3 py-1 bg-mks-light-gray text-mks-dark text-sm rounded-full hover:bg-mks-gray/30 transition-colors"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-4 border-t border-mks-gray/20 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about products, services, or brands..."
                        className="w-full px-4 py-2 bg-white text-mks-dark border border-mks-gray/50 rounded-md shadow-sm focus:outline-none focus:ring-mks-red focus:border-mks-red sm:text-sm"
                        disabled={isLoading}
                    />
                    <Button type="submit" variant="primary" disabled={isLoading || !input.trim()}>
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default GeminiPage;
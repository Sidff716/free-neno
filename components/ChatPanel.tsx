import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/geminiService';
import { Content } from '@google/genai';
import { XIcon } from './icons/XIcon';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Content[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 500);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Content = { role: 'user', parts: [{ text: input }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const responseText = await chatWithGemini(messages, input);
        const modelMessage: Content = { role: 'model', parts: [{ text: responseText }] };
        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className={`fixed top-0 right-0 h-full w-full max-w-md p-4 transform transition-transform duration-500 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col rounded-2xl bg-black/60 backdrop-blur-2xl border-2 border-yellow-500/50 shadow-2xl shadow-purple-500/30">
                <header className="flex justify-between items-center p-4 border-b border-yellow-500/30">
                    <h2 className="text-xl font-orbitron text-yellow-400">Gemini Assistant</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-sm p-3 rounded-lg ${msg.role === 'user' ? 'bg-purple-800/50 text-white' : 'bg-gray-700/50 text-gray-200'}`}>
                                    <p className="whitespace-pre-wrap">{msg.parts[0].text as string}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="max-w-xs md:max-w-sm p-3 rounded-lg bg-gray-700/50 text-gray-200 flex items-center gap-2">
                                   <LoadingSpinner/> <span>Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="p-4 border-t border-yellow-500/30">
                     <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask for creative ideas..."
                            disabled={isLoading}
                            className="flex-grow p-3 rounded-lg bg-black/50 border border-yellow-500/50 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                        <button onClick={handleSendMessage} disabled={isLoading || !input} className="px-4 py-2 font-bold font-orbitron bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

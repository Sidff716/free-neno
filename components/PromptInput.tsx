import React from 'react';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onSubmit: () => void;
    isDisabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isDisabled }) => {
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!isDisabled && prompt) {
                onSubmit();
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 'Add a dragon behind me' or 'Make it look like cyberpunk Tokyo'"
                disabled={isDisabled}
                className="w-full h-32 p-4 rounded-xl bg-black/30 backdrop-blur-lg border-2 border-yellow-400/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300 text-lg placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                rows={3}
            />
            <button
                onClick={onSubmit}
                disabled={isDisabled || !prompt}
                className="w-full py-4 text-xl font-bold font-orbitron text-black bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-400/50 hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
                Transform ✨
            </button>
        </div>
    );
};
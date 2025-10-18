import React from 'react';
import { BananaIcon } from './icons/BananaIcon';
import { ChatIcon } from './icons/ChatIcon';
import { CogIcon } from './icons/CogIcon';

interface HeaderProps {
    isTransforming: boolean;
    onToggleChat: () => void;
    onToggleSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isTransforming, onToggleChat, onToggleSettings }) => {
    return (
        <header className="py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center z-20">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <BananaIcon className={`h-10 w-10 text-yellow-400 animate-logo-float ${isTransforming ? 'animate-glow' : ''}`} />
                    {isTransforming && (
                        <>
                            <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-sparkle" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-sparkle" style={{ animationDelay: '0.2s' }}></div>
                        </>
                    )}
                </div>
                <h1 className="text-lg sm:text-xl md:text-3xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-yellow-300 to-purple-400 bg-[length:200%_auto] animate-shimmer">
                    Neno Banana Dark Studio X
                </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <button onClick={onToggleChat} className="p-2 rounded-full hover:bg-yellow-400/20 transition-colors duration-300" aria-label="Open Gemini Assistant">
                    <ChatIcon className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400"/>
                </button>
                <button onClick={onToggleSettings} className="p-2 rounded-full hover:bg-yellow-400/20 transition-colors duration-300" aria-label="Open Settings">
                    <CogIcon className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400"/>
                </button>
            </div>
        </header>
    );
};
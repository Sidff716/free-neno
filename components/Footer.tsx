import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-4 text-center">
            <a
                href="https://ai.google.dev/gemini-api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-gray-400 hover:text-yellow-400 transition-all duration-300 group"
            >
                Powered by 
                <span className="font-bold font-orbitron group-hover:text-yellow-300 animate-hologram-pulse ml-1"> Gemini Intelligence</span>
            </a>
        </footer>
    );
};
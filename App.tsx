import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageEditor } from './components/ImageEditor';
import { Footer } from './components/Footer';
import { AnimatedParticles } from './components/AnimatedParticles';
import { ChatPanel } from './components/ChatPanel';
import { SettingsModal } from './components/SettingsModal';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Settings state
    const [isPrivacyMode, setIsPrivacyMode] = useState(false);
    const [areBackgroundEffectsOn, setAreBackgroundEffectsOn] = useState(true);

    return (
        <div className="min-h-screen w-full dark bg-black">
            <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-purple-900/50 to-black text-gray-200 overflow-hidden">
                {areBackgroundEffectsOn && <AnimatedParticles isAnimating={isLoading} />}
                <div className="relative z-10 flex flex-col min-h-screen">
                    <Header 
                        isTransforming={isLoading}
                        onToggleChat={() => setIsChatOpen(prev => !prev)}
                        onToggleSettings={() => setIsSettingsOpen(true)}
                    />
                    <main className="flex-grow flex items-center justify-center p-2 sm:p-4 lg:p-6">
                        <ImageEditor 
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                            isPrivacyMode={isPrivacyMode}
                        />
                    </main>
                    <Footer />
                </div>
                <ChatPanel 
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                />
                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    isPrivacyMode={isPrivacyMode}
                    setIsPrivacyMode={setIsPrivacyMode}
                    areBackgroundEffectsOn={areBackgroundEffectsOn}
                    setAreBackgroundEffectsOn={setAreBackgroundEffectsOn}
                />
            </div>
        </div>
    );
};

export default App;
import React from 'react';
import { XIcon } from './icons/XIcon';
import { LockIcon } from './icons/LockIcon';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    isPrivacyMode: boolean;
    setIsPrivacyMode: (value: boolean) => void;
    areBackgroundEffectsOn: boolean;
    setAreBackgroundEffectsOn: (value: boolean) => void;
}

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${checked ? 'bg-yellow-500' : 'bg-gray-600'}`}
        role="switch"
        aria-checked={checked}
    >
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);


export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, isPrivacyMode, setIsPrivacyMode, areBackgroundEffectsOn, setAreBackgroundEffectsOn }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="w-full max-w-md m-4 p-6 rounded-2xl bg-black/60 backdrop-blur-2xl border-2 border-yellow-500/50 shadow-2xl shadow-purple-500/30" onClick={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center pb-4 mb-4 border-b border-yellow-500/30">
                    <h2 className="text-2xl font-orbitron text-yellow-400">Settings</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <LockIcon className="h-5 w-5 text-yellow-400" />
                                Privacy Mode
                            </h3>
                            <p className="text-sm text-gray-400">Blurs sensitive details before AI analysis.</p>
                        </div>
                        <Toggle checked={isPrivacyMode} onChange={setIsPrivacyMode} />
                    </div>
                     {isPrivacyMode && (
                        <p className="text-xs text-center p-2 bg-yellow-900/40 rounded-md border border-yellow-500/50 text-yellow-300">
                           Your photo is safe with Neno Banana AI. Uploaded data is deleted after editing.
                        </p>
                    )}
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">Live Background Effects</h3>
                            <p className="text-sm text-gray-400">Enables dynamic particle animations.</p>
                        </div>
                        <Toggle checked={areBackgroundEffectsOn} onChange={setAreBackgroundEffectsOn} />
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { PromptInput } from './PromptInput';
import { editImageWithGemini } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import { DownloadIcon } from './icons/DownloadIcon';
import { ResetIcon } from './icons/ResetIcon';
import { UndoIcon } from './icons/UndoIcon';
import { RedoIcon } from './icons/RedoIcon';
import { LockIcon } from './icons/LockIcon';
import { LoadingSpinner } from './LoadingSpinner';
import { HistoryPanel } from './HistoryPanel';
import { useSounds } from '../hooks/useSounds';

const SCAN_MESSAGES = [
    "⚙️ Scanning Reality Layers…",
    "🔮 Rebuilding Pixels…",
    "🍌 Activating Banana Core…",
    "✨ Transformation Ready!",
];

interface ImageEditorProps {
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
    isPrivacyMode: boolean;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ setIsLoading, isLoading, isPrivacyMode }) => {
    const [history, setHistory] = useState<string[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);
    const [originalImageMimeType, setOriginalImageMimeType] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [scanMessageIndex, setScanMessageIndex] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const { playScanSound, playTransformSound, playCompleteSound } = useSounds();

    useEffect(() => {
        // FIX: The return type of setInterval in the browser is `number`. `NodeJS.Timeout` is for Node.js environments. Using `ReturnType<typeof setInterval>` is a safe, cross-environment solution.
        let interval: ReturnType<typeof setInterval>;
        if (isScanning) {
            interval = setInterval(() => {
                setScanMessageIndex(prevIndex => {
                    if (prevIndex < SCAN_MESSAGES.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => {
                            setIsScanning(false);
                            playCompleteSound();
                        }, 1000);
                        return prevIndex;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isScanning, playCompleteSound]);

    const handleImageUpload = useCallback(async (file: File) => {
        handleReset();
        setIsScanning(true);
        setScanMessageIndex(0);
        playScanSound();
        const base64 = await fileToBase64(file);
        setHistory([base64]);
        setCurrentHistoryIndex(0);
        setOriginalImageMimeType(file.type);
    }, [playScanSound]);

    const handleTransform = async () => {
        if (!originalImageMimeType || !prompt || history.length === 0) return;
        setIsLoading(true);
        setError(null);
        playTransformSound();
        try {
            const sourceImage = history[currentHistoryIndex];
            const resultBase64 = await editImageWithGemini(sourceImage, originalImageMimeType, prompt);
            
            const newHistory = history.slice(0, currentHistoryIndex + 1);
            setHistory([...newHistory, resultBase64]);
            setCurrentHistoryIndex(newHistory.length);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setHistory([]);
        setCurrentHistoryIndex(0);
        setOriginalImageMimeType(null);
        setPrompt('');
        setIsLoading(false);
        setIsScanning(false);
        setError(null);
    };

    const handleDownload = () => {
        if (history.length === 0) return;
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${history[currentHistoryIndex]}`;
        link.download = 'neno-banana-edit.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUndo = () => {
        setCurrentHistoryIndex(prev => Math.max(0, prev - 1));
    };

    const handleRedo = () => {
        setCurrentHistoryIndex(prev => Math.min(history.length - 1, prev + 1));
    };

    const displayImageSrc = history.length > 0 ? `data:image/png;base64,${history[currentHistoryIndex]}` : null;
    const canUndo = currentHistoryIndex > 0;
    const canRedo = currentHistoryIndex < history.length - 1;

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 rounded-2xl bg-black/40 backdrop-blur-xl border-2 border-yellow-500/50 shadow-2xl shadow-purple-500/20 flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="flex flex-col gap-4">
                    <ImageUploader 
                        onImageUpload={handleImageUpload} 
                        displayImageSrc={displayImageSrc}
                        isScanning={isScanning}
                        scanMessage={SCAN_MESSAGES[scanMessageIndex]}
                        isTransforming={isLoading}
                    />
                     {isPrivacyMode && (
                        <div className="flex items-center justify-center gap-2 text-yellow-400 animate-fade-in p-2 rounded-lg bg-yellow-900/30 border border-yellow-500/50">
                            <LockIcon className="h-5 w-5"/>
                            <p className="text-sm font-orbitron">Privacy Mode Active</p>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-center animate-fade-in">{error}</p>}
                </div>
                <div className="flex flex-col justify-center gap-6">
                    <PromptInput
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onSubmit={handleTransform}
                        isDisabled={history.length === 0}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleUndo} disabled={!canUndo} className="flex items-center justify-center gap-2 px-4 py-3 font-bold font-orbitron text-white bg-white/10 rounded-lg shadow-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            <UndoIcon className="h-6 w-6"/> Undo
                        </button>
                         <button onClick={handleRedo} disabled={!canRedo} className="flex items-center justify-center gap-2 px-4 py-3 font-bold font-orbitron text-white bg-white/10 rounded-lg shadow-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            <RedoIcon className="h-6 w-6"/> Redo
                        </button>
                        <button onClick={handleDownload} disabled={history.length === 0} className="flex items-center justify-center gap-2 px-4 py-3 font-bold font-orbitron text-black bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg shadow-lg hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            <DownloadIcon className="h-6 w-6"/> Download
                        </button>
                        <button onClick={handleReset} className="flex items-center justify-center gap-2 px-4 py-3 font-bold font-orbitron text-white bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-lg hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            <ResetIcon className="h-6 w-6"/> Reset
                        </button>
                    </div>
                </div>
            </div>
            {history.length > 0 && (
                <HistoryPanel 
                    history={history}
                    currentIndex={currentHistoryIndex}
                    onSelect={setCurrentHistoryIndex}
                />
            )}
        </div>
    );
};
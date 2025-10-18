import React from 'react';

interface HistoryPanelProps {
    history: string[];
    currentIndex: number;
    onSelect: (index: number) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, currentIndex, onSelect }) => {
    return (
        <div className="w-full bg-black/30 p-2 rounded-lg">
            <h3 className="text-sm font-orbitron text-center text-yellow-400 mb-2">History</h3>
            <div className="flex gap-2 overflow-x-auto p-2">
                {history.map((imageBase64, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-300 ${currentIndex === index ? 'border-yellow-400 scale-105' : 'border-transparent hover:border-yellow-400/50'}`}
                    >
                        <img
                            src={`data:image/png;base64,${imageBase64}`}
                            alt={`History step ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5">
                           {index === 0 ? 'Original' : `Edit ${index}`}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

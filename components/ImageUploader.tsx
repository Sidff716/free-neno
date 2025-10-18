import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    displayImageSrc: string | null;
    isScanning: boolean;
    scanMessage: string;
    isTransforming: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, displayImageSrc, isScanning, scanMessage, isTransforming }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
            onImageUpload(file);
        }
    };
    
    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
            onImageUpload(file);
        }
    };

    return (
        <div
            className="relative w-full aspect-square rounded-xl border-4 border-dashed border-yellow-400/60 bg-black/20 flex items-center justify-center text-center p-2 cursor-pointer group hover:border-yellow-400 transition-colors duration-300 overflow-hidden"
            onClick={() => inputRef.current?.click()}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
            />
            {!displayImageSrc && !isScanning && (
                <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-yellow-400 transition-colors duration-300">
                    <UploadIcon className="h-12 w-12" />
                    <p className="font-semibold">Click or Drag & Drop Photo</p>
                    <p className="text-sm">(JPG, PNG, or WebP)</p>
                </div>
            )}
            {displayImageSrc && (
                 <div className="relative w-full h-full">
                    <img
                        key={displayImageSrc}
                        src={displayImageSrc}
                        alt="User upload"
                        className={`w-full h-full object-contain rounded-lg animate-reveal transition-all duration-300 ${isTransforming ? 'blur-sm scale-105' : ''}`}
                    />
                    {isScanning && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fade-in">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-300 animate-scanner shadow-[0_0_15px_2px_rgba(251,191,36,0.8)]" />
                            <LoadingSpinner />
                            <p className="font-orbitron text-xl font-bold text-center text-yellow-300 mt-4">{scanMessage}</p>
                        </div>
                    )}
                    {isTransforming && !isScanning && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fade-in">
                            <LoadingSpinner />
                            <p className="font-orbitron text-xl font-bold text-center text-yellow-300 mt-4">Applying Banana Magic...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
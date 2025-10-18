import React from 'react';

export const BananaIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bananaPeel" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFDB58" />
          <stop offset="50%" stopColor="#FDEE73" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <radialGradient id="bananaHighlight" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
        </radialGradient>
         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      <g>
        <path d="M41.7,21.3c-2.6,8.2-1.9,17.4,2,25.7c-4-0.1-8.2-0.3-12.3-0.2c-4.9,10.6,0.3,23.8,11.2,29.3 c12.9,6.5,28.8,0.2,35.1-13.1c1.9-4,2.9-8.4,2.9-12.8c0-3.9-0.8-7.8-2.3-11.4c-0.1,0-0.2,0-0.3,0 c-9.9,0.3-20.2,0.6-29.8,0.2c-4.4,0-8.8,0.4-13.2,1.2C34.3,34.4,35,27.5,41.7,21.3z" fill="url(#bananaPeel)"/>
        <path d="M41.7,21.3c-2.6,8.2-1.9,17.4,2,25.7c-4-0.1-8.2-0.3-12.3-0.2c-4.9,10.6,0.3,23.8,11.2,29.3 c12.9,6.5,28.8,0.2,35.1-13.1c1.9-4,2.9-8.4,2.9-12.8c0-3.9-0.8-7.8-2.3-11.4c-0.1,0-0.2,0-0.3,0 c-9.9,0.3-20.2,0.6-29.8,0.2c-4.4,0-8.8,0.4-13.2,1.2C34.3,34.4,35,27.5,41.7,21.3z" fill="url(#bananaHighlight)"/>
        <path d="M40.3,16.4c-2.1,0.5-4.1,1.3-5.9,2.5c-2.1,1.4-3.6,3.4-4.5,5.8c-0.4,1.1-0.2,2.3,0.5,3.2c1.2,1.5,3.4,1.8,5.2,0.8 c3.1-1.6,6.6-2.5,10.2-2.7C46.8,23.3,44.2,18.7,40.3,16.4z" fill="#6B4F13"/>
        <path d="M84,62.8c0.7-2.1,1.1-4.4,1.1-6.6c0-2.2-0.4-4.4-1.1-6.6c-0.6-1.8-2.3-3-4.2-2.8c-1.9,0.2-3.4,1.8-3.3,3.7 c0.3,3.5,0.3,7.1,0,10.6c-0.1,1.9,1.3,3.5,3.2,3.7C81.7,65.9,83.4,64.6,84,62.8z" fill="#583E0A"/>
      </g>
    </svg>
  );
};
import React from 'react';
import { BananaIcon } from './icons/BananaIcon';

interface AnimatedParticlesProps {
    isAnimating: boolean;
}

export const AnimatedParticles: React.FC<AnimatedParticlesProps> = ({ isAnimating }) => {
    const particles = Array.from({ length: 25 });

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {isAnimating && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full bg-gradient-radial from-yellow-400/30 via-purple-500/20 to-transparent animate-energy-wave"></div>
                </div>
            )}
            {particles.map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    animationName: 'particle-float',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationDelay: `${Math.random() * 25}s`,
                    animationDuration: `${15 + Math.random() * 10}s`,
                    transform: `scale(${0.2 + Math.random() * 0.5})`,
                };
                return (
                    <div
                        key={i}
                        className="absolute bottom-0 text-yellow-400/20"
                        style={style}
                    >
                        { i % 4 === 0 ? <BananaIcon className="w-8 h-8"/> : <div className="w-2 h-2 rounded-full bg-current"></div> }
                    </div>
                );
            })}
        </div>
    );
};
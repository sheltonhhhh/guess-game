import React, { useEffect } from 'react';
import leftClickSound from '../assets/sounds/left_and_right/leftClick.mp3'; // Adjust the path as necessary
import rightClickSound from '../assets/sounds/left_and_right/rightClick.mp3'; // Adjust the path as necessary

export default function Card({ value, handleCardClick, timerValue }) {
    const handleCorrect = (e) => {
        e.stopPropagation();
        handleCardClick('right', value);
        playSound(rightClickSound);
    };

    const handleSkip = (e) => {
        e.stopPropagation();
        handleCardClick('left', value); // 'left' maps to incorrect/skip in GameBoard
        playSound(leftClickSound);
    };

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 2000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') { // Map Left Arrow to Check (Visual Left)
            handleCorrect(e);
        } else if (e.key === 'ArrowRight') { // Map Right Arrow to X (Visual Right)
            handleSkip(e);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col h-screen w-screen bg-white">
            {/* Card Content */}
            <div className="bg-gray-900 flex-1 flex flex-col justify-center items-center relative">

                <h5 className="text-6xl font-bold text-white text-center px-4 break-words">{value}</h5>
                {timerValue !== undefined && <div className="absolute top-8 right-8 text-2xl font-bold text-gray-500">{timerValue}</div>}
            </div>

            {/* Buttons Container */}
            <div className="h-48 flex w-full">
                {/* Green Check / Correct (Visual Left) */}
                <button
                    onClick={handleCorrect}
                    className="flex-1 bg-[#C1E1C1] hover:bg-[#A8D5A8] active:bg-[#8FC98F] flex justify-center items-center transition-colors duration-200 border-none m-0 rounded-none w-1/2 min-w-0"
                >
                    <i className="fas fa-check fa-4x text-green-700"></i>
                </button>

                {/* Red X / Skip (Visual Right) */}
                <button
                    onClick={handleSkip}
                    className="flex-1 bg-[#F5C2C2] hover:bg-[#F0A8A8] active:bg-[#EB8E8E] flex justify-center items-center transition-colors duration-200 border-none m-0 rounded-none w-1/2 min-w-0"
                >
                    <i className="fas fa-times fa-4x text-red-700"></i>
                </button>
            </div>
        </div>
    );
}
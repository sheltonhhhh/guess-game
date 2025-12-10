import React, { useEffect } from 'react';
import leftClickSound from '../assets/sounds/left_and_right/leftClick.mp3'; // Adjust the path as necessary
import rightClickSound from '../assets/sounds/left_and_right/rightClick.mp3'; // Adjust the path as necessary

export default function Card({ value, handleCardClick, timerValue }) {
    const handleLeftClick = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        handleCardClick('left', value);
        playSound(leftClickSound);
    };

    const handleRightClick = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        handleCardClick('right', value);
        playSound(rightClickSound);
    };

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0; // Reset audio to start
        }, 2000); // Stop after 2 seconds
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            handleLeftClick(e);
        } else if (e.key === 'ArrowRight') {
            handleRightClick(e);
        }
    };

    useEffect(() => {
        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="playcard flex">
            <div className="absolute min-w-[80%] z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 justify-center items-center">
                <h5 className="h1 sm:display-large text-center">{value}</h5>
                <div className="timer pt-4 h3 sm:h1 ">{timerValue}</div> 
            </div>
            <div className="playcard-icons z-0">
                <i className="fas fa-arrow-right fa-2xl"></i>
                <i className="fas fa-arrow-down fa-2xl"></i>
            </div>
            <div className="left-container flex-1 h-100" onClick={handleLeftClick}></div>
            <div className="right-container flex-1 h-100" onClick={handleRightClick}></div>
        </div>
    );
}
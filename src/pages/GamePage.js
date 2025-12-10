import React, { useState, useEffect, useContext } from 'react';
import GameBoard from '../components/GameBoard';
import TransitionScreen from '../components/TransitionScreen';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import timerTickSound from '../assets/sounds/timer-tick.mp3'; // Adjust the path as necessary

const GamePage = () => {
    const { gameData } = useContext(GameContext);
    const { number_players, number_turns, time_per_turn, List, selectedSubgenre } = gameData; // Ensure selectedSubgenre is included
    const navigate = useNavigate();
    //console.log("List:", List);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentTurn, setCurrentTurn] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(time_per_turn);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [results, setResults] = useState(
        Array.from({ length: number_players }, () => ({ correctAnswers: 0, totalAnswers: 0 }))
    );
    const [usedElements, setUsedElements] = useState([]);
    const [timerAudio] = useState(new Audio(timerTickSound));
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const handleEndTurn = () => {
        if (currentTurn >= number_turns && currentPlayerIndex >= number_players - 1) {
            gameEnd();
        } else {
            setIsTransitioning(true);
        }
    };

    useEffect(() => {
        if (number_players && number_turns) {
            setTimeRemaining(time_per_turn);
        }
    }, [gameData, time_per_turn, number_players, number_turns]);

    useEffect(() => {
        if (timeRemaining > 0 && !isTransitioning) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleEndTurn();
                        return 0;
                    }
                    if (prev < 12 && !isAudioPlaying) {
                        timerAudio.play(); // Play sound when below 10 seconds
                        setIsAudioPlaying(true);

                        // Stop the audio after 10 seconds
                        setTimeout(() => {
                            timerAudio.pause();
                            timerAudio.currentTime = 0; // Reset audio to start
                            setIsAudioPlaying(false);
                        }, 10000); // Stop after 10 seconds
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            handleEndTurn();
        }
    }, [timeRemaining, isTransitioning, timerAudio, isAudioPlaying]);

    const gameEnd = () => {
        navigate('/game-end', { state: { results } });
    };

    const handleProceed = () => {
        setIsTransitioning(false);
        setCurrentPlayerIndex((prev) => (prev + 1) % number_players);
        if (currentPlayerIndex === number_players - 1) {
            setCurrentTurn((prev) => (prev < number_turns ? prev + 1 : prev));
        }
        setTimeRemaining(time_per_turn);
    };

    const updateResults = (correct) => {
        
        setResults((prevResults) => {
            
            const newResults = [...prevResults];
            const playerIndex = currentPlayerIndex;
            newResults[playerIndex].totalAnswers += 0.5;
            if (correct) {
                newResults[playerIndex].correctAnswers += 0.5;
                
            }
            //console.log("NewResults: ",newResults)
            return newResults;
        });
    };

    function getRandomElement(array) {
        let availableItems = array.filter(item => !usedElements.includes(item));
        if (availableItems.length === 0) {
            availableItems = array;
            setUsedElements([]);
        }
        let randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
        setUsedElements([...usedElements, randomItem]);
        return randomItem;
    }

    const currentPlayer = currentPlayerIndex + 1;
    const nextPlayer = (currentPlayerIndex + 1) % number_players + 1;

    // Find the selected subgenre's items

    const selectedSubgenreItems = List;

    return (
        <div className="game-page">
            {isTransitioning ? (
                <TransitionScreen currentPlayer={currentPlayer} onProceed={handleProceed} />
            ) : (
                <div>
                    <h2 className='h1 pb-5'>Turn {currentTurn}: Player {currentPlayer} </h2>
                    {  /* <h3>Time Remaining: {timeRemaining}s</h3> */ }
                    <GameBoard currentPlayer={currentPlayer} array={selectedSubgenreItems} timer={timeRemaining} getRandomElement={getRandomElement} updateResults={updateResults} />
                </div>
            )}
        </div>
    );
};

export default GamePage;
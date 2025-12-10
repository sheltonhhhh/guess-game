import React, { useState, useEffect, useContext } from 'react';
import GameBoard from '../components/GameBoard';
import TransitionScreen from '../components/TransitionScreen';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import timerTickSound from '../assets/sounds/timer-tick.mp3'; // Adjust the path as necessary

const GamePage = () => {
    const { gameData } = useContext(GameContext);
    const { number_players, number_turns, time_per_turn, List, player_names } = gameData;
    const navigate = useNavigate();
    //console.log("List:", List);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentTurn, setCurrentTurn] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(time_per_turn);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [results, setResults] = useState(
        Array.from({ length: number_players }, (_, i) => ({
            name: player_names?.[i] || `Player ${i + 1}`,
            correctAnswers: 0,
            totalAnswers: 0
        }))
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
        // Need to ensure we pass the LATEST results
        // Using functional state update in handleEndTurn/UpdateResults usually, 
        // but here we are in a closure. 
        // 'results' state variable is updated on each render.
        // It should be fine as gameEnd is called when valid.
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

    const currentPlayerName = player_names?.[currentPlayerIndex] || `Player ${currentPlayerIndex + 1}`;

    // Find the selected subgenre's items

    const selectedSubgenreItems = List;

    return (
        <div className="game-page">
            {isTransitioning ? (
                <TransitionScreen currentPlayer={currentPlayerName} onProceed={handleProceed} />
            ) : (
                <div className="h-screen w-screen">
                    <GameBoard
                        currentPlayer={currentPlayerName}
                        playerIndex={currentPlayerIndex}
                        array={selectedSubgenreItems}
                        timer={timeRemaining}
                        getRandomElement={getRandomElement}
                        updateResults={updateResults}
                    />
                </div>
            )}
        </div>
    );
};

export default GamePage;
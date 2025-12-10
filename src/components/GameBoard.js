import Card from './Card';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export default function GameBoard({ currentPlayer, playerIndex, array, timer, getRandomElement, updateResults }) {
    const { gameData } = useContext(GameContext);
    const { number_players } = gameData; // Get the number of players from context
    const [count_all, setCountAll] = useState(Array(number_players).fill(0)); // Initialize count_all as an array
    const [count_correct, setCountCorrect] = useState(0);
    const [randomElement, setRandomElement] = useState(null);

    const currentPlayerIndex = playerIndex;


    useEffect(() => {
        if (array.length > 0 && randomElement === null) {
            const initialElement = getRandomElement(array);
            setRandomElement(initialElement);
        }
    }, [array, getRandomElement, randomElement]);

    function handleCardClick(direction, element) {
        setCountAll(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[currentPlayerIndex] += 1; // Increment the count for the current player

            return newCounts;

        });
        if (direction === 'right') {
            setCountCorrect(count_correct + 1);
            updateResults(1); // Update results for correct answer
        } else {
            updateResults(0); // Update results for incorrect answer
        }

        //console.log("Player",currentPlayerIndex+1 ," has answered ", count_all, " questions. Out of these ",count_correct," are correct.");
        // Get a new random element only if the card was clicked
        const newElement = getRandomElement(array);
        if (newElement) {
            setRandomElement(newElement);
        }
    }

    return (
        <div className="board">
            <Card
                value={randomElement}
                handleCardClick={handleCardClick}
                timerValue={timer}
            />
            {/*<div className="count">{count_correct}</div>*/}

        </div>
    );
}
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WinningPlayer from '../components/WinningPlayer'; // Import WinningPlayer component
import LeaderboardRow from '../components/LeaderboardRow'; // Import LeaderboardRow component

const GameEnd = () => {
    const location = useLocation();
    const results = location.state?.results || []; // Access results from state
    const navigate = useNavigate(); // Initialize navigate

    const handleRestart = () => {
        navigate('/'); // Redirect to GameSetup
    };

    // Find the player with the highest correct answers
    const highestScore = Math.max(...results.map(player => player.correctAnswers));
    const winningPlayers = results.filter(player => player.correctAnswers === highestScore);
    const totalAnswersForWinners = winningPlayers.map(player => player.totalAnswers);
    
    // Sort players by correct answers in descending order
    const sortedResults = [...results].sort((a, b) => b.correctAnswers - a.correctAnswers);

    return (
        <div className="game-end">
            
            {winningPlayers.length > 1 ? (
                <div>
                    <h3 className='h1'>There are multiple winniers!</h3>
                </div>
            ) : (
                <WinningPlayer 
                    playerIndex={results.indexOf(winningPlayers[0]) + 1} 
                    correctAnswers={winningPlayers[0].correctAnswers} 
                    totalAnswers = {totalAnswersForWinners[0]} 
                />
            )}
            <h3 className='h3 pb-4'>Leaderboard:</h3>
            <div className='flex flex-col gap-4 mb-4'>
                {sortedResults.map((playerResult, index) => (
                    <LeaderboardRow key={index} playerIndex={index + 1} correctAnswers={playerResult.correctAnswers} />
                ))}
            </div>
            
            <button onClick={handleRestart}>Restart Game</button> {/* Restart button */}
        </div>
    );
};

export default GameEnd;
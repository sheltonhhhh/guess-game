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
        <div className="max-w-2xl mx-auto flex flex-col gap-8 animate-fade-in">

            {winningPlayers.length > 1 ? (
                <div className="text-center p-8 bg-slate-900 rounded-2xl border border-slate-800">
                    <h3 className='text-3xl font-bold text-white mb-2'>Multiple Winners!</h3>
                    <p className="text-slate-400">It's a tie between {winningPlayers.map(p => p.name).join(', ')}</p>
                </div>
            ) : (
                <WinningPlayer
                    playerName={winningPlayers[0].name}
                    correctAnswers={winningPlayers[0].correctAnswers}
                    totalAnswers={totalAnswersForWinners[0]}
                />
            )}

            <div>
                <h3 className='text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2'>Leaderboard</h3>
                <div className='flex flex-col gap-3'>
                    {sortedResults.map((playerResult, index) => (
                        <LeaderboardRow key={index} playerName={playerResult.name} correctAnswers={playerResult.correctAnswers} />
                    ))}
                </div>
            </div>

            <button
                onClick={handleRestart}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
                Play Again
            </button>
        </div>
    );
};

export default GameEnd;
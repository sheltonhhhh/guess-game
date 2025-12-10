import React, { createContext, useState } from 'react';

// Create context
export const GameContext = createContext();  // Make sure this is being exported

// GameProvider component
export const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState({
    number_players: null,
    number_turns: null,
    time_per_turn: null,
    List: [], // Ensure this is initialized as an empty array
  });

  //console.log('Current gameData:', gameData); // Add this line to check the state

  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      {children}  {/* Ensure children are rendered */}
    </GameContext.Provider>
  );
};

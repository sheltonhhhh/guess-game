import Header from './components/Header';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GameSetup from './pages/GameSetup';
import GamePage from './pages/GamePage'; // Import GamePage
import GameEnd from './pages/GameEnd'; // Import GameEnd
import { GameProvider } from './context/GameContext';  // Import GameProvider
import './App.css';

function App() {
  return (
    <GameProvider> {/* Make sure GameProvider is wrapping the Router */}
      <Router basename={process.env.PUBLIC_URL} >
        <Header />
        <div className="main-content bg-bgDarkPrimary text-textLightPrimary p-4 md:py-8 md:px-12"> {/* Removed dark theme classes */}
          <Routes>
            <Route path="/" element={<GameSetup />} />  {/* This is the main entry point */}
            <Route path="/game-setup" element={<Navigate to="/" />} />
            <Route path="/game-page" element={<GamePage />} /> {/* Add this line for GamePage */}
            <Route path="/game-end" element={<GameEnd />} /> {/* Add this line for GameEnd */}
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;

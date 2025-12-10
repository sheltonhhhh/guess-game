import Header from './components/Header';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import GameSetup from './pages/GameSetup';
import GamePage from './pages/GamePage'; // Import GamePage
import GameEnd from './pages/GameEnd'; // Import GameEnd
import { GameProvider } from './context/GameContext';  // Import GameProvider
import './App.css';

function App() {
  return (
    <GameProvider> {/* Make sure GameProvider is wrapping the Router */}
      <Router basename={process.env.PUBLIC_URL} >
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<GameSetup />} />  {/* This is the main entry point */}
            <Route path="/game-setup" element={<Navigate to="/" />} />
            <Route path="/game-end" element={<GameEnd />} /> {/* Add this line for GameEnd */}
          </Route>
          <Route path="/game-page" element={<GamePage />} /> {/* Add this line for GamePage */}
        </Routes>
      </Router>
    </GameProvider>
  );
}

const DefaultLayout = () => (
  <>
    <Header />
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
      <Outlet />
    </div>
  </>
);

export default App;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ListPicker from '../components/ListPicker';
import { GameContext } from '../context/GameContext';
import { premadeLists } from '../data/lists';

const GameSetup = () => {
  const { gameData, setGameData } = useContext(GameContext);
  const navigate = useNavigate();

  // Initialize state from context if available, otherwise default
  const [numPlayers, setNumPlayers] = useState(gameData.number_players || 2);
  const [playerNames, setPlayerNames] = useState(gameData.player_names || Array(2).fill(''));
  const [isNamesOpen, setIsNamesOpen] = useState(false);
  const [numTurns, setNumTurns] = useState(gameData.number_turns || 2);
  const [timePerPlayer, setTimePerPlayer] = useState(gameData.time_per_turn || 90);

  // List picker state persistence
  const [selectedSubgenreItems, setSelectedSubgenreItems] = useState(gameData.List || []);
  const [selectedSubgenres, setSelectedSubgenres] = useState(gameData.selectedSubgenres || []);
  const [customList, setCustomList] = useState(gameData.customList || null);
  const [multiSelect, setMultiSelect] = useState(gameData.multiSelect || false);

  const onSubgenreSelect = (category, subgenre) => {
    if (multiSelect) {
      setSelectedSubgenres((prev) => {
        const isSelected = prev.includes(subgenre);
        const newSubgenres = isSelected
          ? prev.filter((sub) => sub !== subgenre)
          : [...prev, subgenre];

        const items = category === "Custom List" ? customList.items : premadeLists[category]?.find(item => item.name === subgenre)?.items || [];
        if (isSelected) {
          setSelectedSubgenreItems((prevItems) => prevItems.filter(item => !items.includes(item)));
        } else {
          setSelectedSubgenreItems((prevItems) => [...prevItems, ...items]);
        }
        return newSubgenres;
      });
    } else {
      if (premadeLists[category]) {
        const items = premadeLists[category].find(item => item.name === subgenre)?.items || [];
        setSelectedSubgenres([subgenre]);
        setSelectedSubgenreItems(items);
      } else if (customList) {
        const items = customList.items;
        setSelectedSubgenres([subgenre]);
        setSelectedSubgenreItems(items);
      }
    };
  }

  const validateForm = () => {
    if (numPlayers < 1 || numPlayers > 10) { alert('Please enter a valid number of players (1-10)'); return false; }
    if (numTurns < 1 || numTurns > 3) { alert('Please enter a valid number of turns (1-3)'); return false; }
    if (timePerPlayer < 10 || timePerPlayer > 180) { alert('Please enter a valid time per player (10-90 seconds)'); return false; }
    if (selectedSubgenreItems.length === 0) { alert('Please select a list'); return false; }
    return true;
  };

  const startGame = () => {
    if (validateForm()) {
      const finalPlayerNames = Array.from({ length: numPlayers }, (_, i) =>
        playerNames[i]?.trim() || `Player ${i + 1}`
      );

      setGameData({
        number_players: numPlayers,
        number_turns: numTurns,
        time_per_turn: timePerPlayer,
        List: selectedSubgenreItems,
        player_names: finalPlayerNames,
        // Persist UI state
        selectedSubgenres: selectedSubgenres,
        multiSelect: multiSelect,
        customList: customList
      });
      navigate('/game-page');
    }
  };

  return (
    <div className='flex flex-col gap-8 max-w-2xl mx-auto'>
      <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
            <i className="fas fa-users text-blue-500"></i> Player Details
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div className='flex flex-col gap-2'>
              <label className="text-slate-400 text-sm font-medium">Number of Players</label>
              <input
                className='w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all'
                type="number"
                value={numPlayers}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setNumPlayers(val);
                  // Resize player names array
                  setPlayerNames(prev => {
                    const newNames = [...prev];
                    if (val > prev.length) {
                      for (let i = prev.length; i < val; i++) newNames.push('');
                    } else if (val < prev.length) {
                      newNames.length = val;
                    }
                    return newNames;
                  });
                }}
                min={1}
                max={10}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className="text-slate-400 text-sm font-medium">Number of Turns</label>
              <input
                className='w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all'
                type="number"
                value={numTurns}
                onChange={(e) => setNumTurns(Number(e.target.value))}
                min={1}
                max={3}
              />
            </div>
            <div className='flex flex-col gap-2 md:col-span-2'>
              <label className="text-slate-400 text-sm font-medium">Time per Player (seconds)</label>
              <input
                className='w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all'
                type="number"
                value={timePerPlayer}
                onChange={(e) => setTimePerPlayer(Number(e.target.value))}
                min={10}
                max={180}
              />
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-800">
            <button
              onClick={() => setIsNamesOpen(!isNamesOpen)}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className="text-sm text-slate-400 font-medium group-hover:text-white transition-colors">Edit Player Names (Optional)</span>
              <i className={`fas fa-chevron-down text-slate-500 transition-transform duration-300 ${isNamesOpen ? 'rotate-180' : ''}`}></i>
            </button>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden transition-all duration-300 ease-in-out ${isNamesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {Array.from({ length: numPlayers }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Player ${index + 1}`}
                  value={playerNames[index] || ''}
                  onChange={(e) => {
                    const newNames = [...playerNames];
                    newNames[index] = e.target.value;
                    setPlayerNames(newNames);
                  }}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ListPicker
          selectedSubgenre={selectedSubgenres}
          setSelectedSubgenre={setSelectedSubgenres}
          onSubgenreSelect={onSubgenreSelect}
          customList={customList}
          setCustomList={setCustomList}
          multiSelect={multiSelect}
          setMultiSelect={setMultiSelect}
        />
      </section>

      <div className='fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur border-t border-slate-800 md:relative md:bg-transparent md:border-0 md:p-0 animate-slide-up' style={{ animationDelay: '0.3s' }}>
        <button
          onClick={startGame}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameSetup;
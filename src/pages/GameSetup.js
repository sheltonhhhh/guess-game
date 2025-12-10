import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListPicker from '../components/ListPicker';
import { GameContext } from '../context/GameContext';
import { premadeLists } from '../data/lists';

const GameSetup = () => {
  const { setGameData } = useContext(GameContext);
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(2);
  const [numTurns, setNumTurns] = useState(2);
  const [timePerPlayer, setTimePerPlayer] = useState(90);
  const [selectedSubgenreItems, setSelectedSubgenreItems] = useState([]);
  const [selectedSubgenres, setSelectedSubgenres] = useState([]); // Array for selected subgenres
  const [customList, setCustomList] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);

  /*
  useEffect(() => {
    setGameData({
      number_players: 1,
      number_turns: 1,
      time_per_turn: 30,
      List: [
        { name: 'Drama', items: ['Movie1', 'Movie2'] },
        { name: 'Comedy', items: ['Movie3', 'Movie4'] },
      ],
    });
  }, [setGameData]);

  useEffect(() => {
    console.log("Selected Subgenre Items: ", selectedSubgenreItems);
}, [selectedSubgenreItems]);

useEffect(() => {
    console.log("Selected Subgenres: ", selectedSubgenres);
}, [selectedSubgenres]);
  */
  
  const onSubgenreSelect = (category, subgenre) => {
    // Handle selection logic for multiple subgenres
    if (multiSelect) {
        setSelectedSubgenres((prev) => {
            const isSelected = prev.includes(subgenre);
            const newSubgenres = isSelected 
                ? prev.filter((sub) => sub !== subgenre) // Remove if already selected
                : [...prev, subgenre]; // Add to selected subgenres

            const items = category === "Custom List" ? customList.items : premadeLists[category]?.find(item => item.name === subgenre)?.items || []; 
            if (isSelected) {
                // If the subgenre is being removed, filter out its items
                setSelectedSubgenreItems((prevItems) => prevItems.filter(item => !items.includes(item)));
            } else {
                // If the subgenre is being added, concatenate its items
                setSelectedSubgenreItems((prevItems) => [...prevItems, ...items]);
            }
            return newSubgenres;
        });
    } else {
        if (premadeLists[category]) {
            const items = premadeLists[category].find(item => item.name === subgenre)?.items || [];
            setSelectedSubgenres([subgenre]); // Update the selected subgenre
            setSelectedSubgenreItems(items); // Update the selected subgenre items
            
        } else if (customList) {
            // If the category is not in premadeLists, check if customList exists
            const items = customList.items; // Get items directly from the custom list
            setSelectedSubgenres([subgenre]); // Update the selected subgenre
            setSelectedSubgenreItems(items); // Update the selected subgenre items
        } else {
            console.error(`Category "${category}" does not exist in any lists.`);
        }
      };
    }
  
  // Form validation function
  const validateForm = () => {
    if (numPlayers < 1 || numPlayers > 10) {
      alert('Please enter a valid number of players (1-10)');
      return false;
    }
    if (numTurns < 1 || numTurns > 3) {
      alert('Please enter a valid number of turns (1-3)');
      return false;
    }
    if (timePerPlayer < 10 || timePerPlayer > 180) {
      alert('Please enter a valid time per player (10-90 seconds)');
      return false;
    }
    if (selectedSubgenreItems.length === 0) {
      alert('Please select a list');
      return false;
    }
    return true; // Return true if all validations pass
  };

  const startGame = () => {
    // Validate inputs before proceeding
    if (validateForm()) {
      // Update global game data with the selected values
      setGameData({
        number_players: numPlayers,
        number_turns: numTurns,
        time_per_turn: timePerPlayer,
        List: selectedSubgenreItems,
      });
      //console.log("Selected Subgenre final :", selectedSubgenreItems);

      /* Log the game data object for debugging purposes
      console.log({
        number_players: numPlayers,
        number_turns: numTurns,
        time_per_turn: timePerPlayer,
        List: selectedSubgenreItems,
      }); */

      // Navigate to GamePage after setting game data
      navigate('/game-page'); // Change this to the correct path for GamePage
    }
  };

  return (
    <div className='flex flex-col gap-12'>
      <section>
        <h2 className='h3 pd-3'>Game Setup</h2>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col w-full'>
            <label>Number of Players (1-10): </label>
            <input 
            className='p-3 bg-bgDarkPrimary border border-bgLightSecondary text-body-meduim'
              type="number" 
              value={numPlayers} 
              onChange={(e) => setNumPlayers(Number(e.target.value))} 
              min={1} 
              max={10} 
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Number of Turns (1-3): </label>
            <input 
              type="number" 
              value={numTurns} 
              onChange={(e) => setNumTurns(Number(e.target.value))} 
              min={1} 
              max={3} 
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Time per Player (seconds, 10-180): </label>
            <input 
                className='p-3 bg-bgDarkPrimary border border-bgLightSecondary text-body-meduim'
              type="number" 
              value={timePerPlayer} 
              onChange={(e) => setTimePerPlayer(Number(e.target.value))} 
              min={10} 
              max={180} 
            />
          </div>
        </div>
      </section>
      
      {/* ListPicker component to select a subgenre */}
      <section>
        <ListPicker 
          selectedSubgenre={selectedSubgenres} // Pass the array of selected subgenres
          setSelectedSubgenre={setSelectedSubgenres} // Pass the setter function
          onSubgenreSelect={onSubgenreSelect} // Pass the handler function
          customList={customList} // Pass customList as a prop
          setCustomList={setCustomList} // Setter function for custom list
          multiSelect={multiSelect} // Multi-select state
          setMultiSelect={setMultiSelect} // Setter function for multi-select
        />
      </section>
      
      {/* Start Game button */}
      <div className='bottom-bar'>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default GameSetup;
import React, { useState, useEffect } from 'react';
import { premadeLists } from '../data/lists';
import CategoryRow from './CategoryRow';
import CategoryCard from './CategoryCard';
import FilterFunction from './FilterFunction';
import { parseCSV } from '../utils/csvReader';

const ListPicker = ({ selectedSubgenre, setSelectedSubgenre, onSubgenreSelect, customList, setCustomList, multiSelect, setMultiSelect }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  
//selecteed category and the is for the filter
const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubgenre([]); // Reset selected subgenres when category changes
    //should change this to check if the picked subgenre is in the event
  };
  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  //This is to pass up to values to gameSetup
  const handleSubgenreChange = (event, subgenreName, category) => {
    const newSubgenre = subgenreName;
    const newCategory = category;
    onSubgenreSelect(newCategory, newSubgenre); // Pass the genre name and selected subgenre up to GameSetup
    };

  //Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const parsedData = parseCSV(csvData);

        if (parsedData.length > 0) {
          setCustomList({
            name: "Custom List",
            subgenre: file.name,
            items: parsedData,
          });
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  //handling multi-select
  const handleMultiSelectChange = (event) => {
    const isChecked = event.target.checked;
    setMultiSelect(isChecked);
    
    // Add any additional logic you want to implement here
    if (isChecked) {
        console.log("Multi-select enabled");
        // Additional logic for when multi-select is enabled
    } else {
        console.log("Multi-select disabled");
        // Reset selected subgenres
        // setSelectedSubgenreItems([]); // Reset selected subgenre items
    }
  };

  const categories = Object.keys(premadeLists);
  return (
    <div className='listpicker flex flex-col gap-4'>
      <h2 className="h3">Choose a list to play with</h2>
      <label className='flex gap-1 pb-3'>
        <input 
          type="checkbox" 
          checked={multiSelect} 
          onChange={handleMultiSelectChange} 
        />
        <p>Enable multi-select</p>
      </label>
      <div>
        <p className='body-medium'>Upload Custom List</p>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      <FilterFunction
        categories={categories}
        selectedCategory={filterCategory}
        onCategoryChange={handleFilterChange}
      />

      {customList && (
        <div>
          <CategoryRow category="Custom List" />
          <CategoryCard
            subgenre={customList.subgenre}
            itemCount={customList.items.length}
            selectedSubgenre={selectedSubgenre.includes(customList.subgenre)} // Check if selected
            handleSubgenreChange={(e) => handleSubgenreChange(e, customList.subgenre,"Custom List")}
            multiSelect={multiSelect}
          />
        </div>
      )}

      <div className="category-grid">
        {categories.map((category, index) => {
          if (filterCategory !== 'All' && filterCategory !== category) return null;

          const subgenres = premadeLists[category];
          if (!Array.isArray(subgenres)) return null;

          return (
            <div key={index} className='mb-6'>
              <CategoryRow 
                category={category} 
                description={subgenres[0]?.description || ''} 
                hardmodeRequirements={subgenres[0]?.hardmode_requirements || []} 
              />
              <div className="subgenre-cards flex flex-col md:flex-row gap-4">
                {subgenres.map((subgenreObj, objIndex) => (
                  subgenreObj.name && (
                    <CategoryCard
                      key={objIndex}
                      subgenre={subgenreObj.name}
                      itemCount={subgenreObj.items.length}
                      selectedSubgenre={selectedSubgenre.includes(subgenreObj.name)} // Check if selected
                      handleSubgenreChange={(e) => handleSubgenreChange(e, subgenreObj.name,category)}
                      icon={subgenreObj.icon}
                      multiSelect={multiSelect}
                    />
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListPicker;
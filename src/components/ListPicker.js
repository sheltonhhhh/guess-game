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
    <div className='flex flex-col gap-8'>
      <h2 className="text-2xl font-bold text-white">Choose a list to play with</h2>
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
        <label className='flex gap-3 items-center cursor-pointer'>
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={multiSelect}
              onChange={handleMultiSelectChange}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-600 bg-slate-950 checked:bg-blue-600 checked:border-blue-600 transition-all"
            />
            <i className="fas fa-check absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white opacity-0 peer-checked:opacity-100 pointer-events-none"></i>
          </div>
          <p className="text-slate-300 font-medium select-none">Enable multi-select</p>
        </label>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <p className='text-xs text-slate-500 font-bold uppercase tracking-wider'>Upload Custom List</p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-blue-400 hover:file:bg-slate-700 transition-all"
          />
        </div>
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
            handleSubgenreChange={(e) => handleSubgenreChange(e, customList.subgenre, "Custom List")}
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
                      handleSubgenreChange={(e) => handleSubgenreChange(e, subgenreObj.name, category)}
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
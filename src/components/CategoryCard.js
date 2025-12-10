import React from 'react';

const CategoryCard = ({ subgenre, itemCount, selectedSubgenre, handleSubgenreChange,icon,multiSelect }) => {
  //console.log("Selected Subgenre in ", subgenre," category card",selectedSubgenre," and multiselect: ", multiSelect)
  // Determine the icon based on the selection state and multiSelect
  //console.log("genre: ",genre)
  const iconClass = multiSelect
    ? (selectedSubgenre ? 'fa-check-square' : 'fa-square') // Multi-select logic
    : (selectedSubgenre ? 'fa-check-circle' : 'fa-circle'); // Single-select logic

  return (
    <div className={`category-card p-4 border-2 border-bgLightSecondary w-full md:w-1/3 ${selectedSubgenre ? 'selected' : ''}`} onClick={handleSubgenreChange}>
      
        <input
          type={multiSelect ? "checkbox" : "radio"}
          name="subgenre"
          value={subgenre}
          checked={selectedSubgenre}
          onChange={handleSubgenreChange} // Ensure this is correct
          style={{ display: 'none' }} // Hide the default radio button
        />
        <div className="card-content ">
          <div className=" flex flex-row  justify-between">
            <div className='flex flex-row items-baseline gap-1'>
              <i className={`fas ${icon} fa-lg`}></i>
              <h4 className='h4'>{subgenre}</h4>
            </div>
            
            <i className={`fas ${iconClass}`}></i>
          </div>
          <p className="body-small-strong pt-4">{itemCount} items</p>
        </div>
    </div>
  );
};

export default CategoryCard;
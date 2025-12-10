// src/components/FilterFunction.js
import React from 'react';

const FilterFunction = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter flex flex-col w-full md:w-1/3">
      <label htmlFor="categoryFilter">Filter by Category:</label>
      <select 
        id="categoryFilter" 
        value={selectedCategory} 
        onChange={onCategoryChange}
      >
        <option value="All">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterFunction;

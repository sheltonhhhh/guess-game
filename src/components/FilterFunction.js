import React from 'react';

const FilterFunction = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/3">
      <label htmlFor="categoryFilter" className="text-slate-400 text-sm font-medium">Filter by Category:</label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={onCategoryChange}
        className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
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

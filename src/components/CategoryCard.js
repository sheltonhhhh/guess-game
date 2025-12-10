import React from 'react';

const CategoryCard = ({ subgenre, itemCount, selectedSubgenre, handleSubgenreChange, icon, multiSelect }) => {
  const iconClass = multiSelect
    ? (selectedSubgenre ? 'fa-check-square' : 'fa-square')
    : (selectedSubgenre ? 'fa-check-circle' : 'fa-circle');

  return (
    <div
      className={`p-4 border border-slate-700 bg-slate-900 rounded-xl w-full md:w-1/3 cursor-pointer transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20 ${selectedSubgenre ? 'border-blue-500 ring-1 ring-blue-500 bg-slate-800' : ''}`}
      onClick={handleSubgenreChange}
    >
      <input
        type={multiSelect ? "checkbox" : "radio"}
        name="subgenre"
        value={subgenre}
        checked={selectedSubgenre}
        onChange={handleSubgenreChange}
        style={{ display: 'none' }}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center text-white">
          <div className='flex flex-row items-center gap-2'>
            <i className={`fas ${icon} text-lg text-slate-400`}></i>
            <h4 className='font-bold text-lg'>{subgenre}</h4>
          </div>

          <i className={`fas ${iconClass} ${selectedSubgenre ? 'text-blue-500' : 'text-slate-600'}`}></i>
        </div>
        <p className="text-slate-400 text-sm font-medium">{itemCount} items</p>
      </div>
    </div>
  );
};

export default CategoryCard;
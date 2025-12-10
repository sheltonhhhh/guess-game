// src/components/CategoryRow.js
import React from 'react';

const CategoryRow = ({ category, hardmodeRequirements }) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <h3 className='text-xl font-bold text-white border-b border-slate-800 pb-2'>{category}</h3>

      {hardmodeRequirements && hardmodeRequirements.length > 0 && (
        <div className='mt-4 bg-red-950/30 border border-red-900/50 rounded-lg p-4'>
          <h3 className='text-red-400 font-bold mb-1 flex items-center gap-2'>
            <i className="fas fa-skull"></i> HARD MODE
          </h3>
          <p className='text-red-200/70 text-sm mb-3'>To play in hard mode, avoid the following:</p>

          <ul className="space-y-1">
            {hardmodeRequirements.map((requirement, index) => (
              <li key={index} className="text-red-200 text-sm font-medium flex items-center gap-2">
                <i className="fas fa-times text-red-500"></i>
                {requirement}
              </li>
            ))}
          </ul>
        </div>

      )}
    </div>
  );
};

export default CategoryRow;

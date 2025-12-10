// src/components/CategoryRow.js
import React from 'react';

const CategoryRow = ({ category, description, hardmodeRequirements }) => {
  return (
    <div className="category-row ">
      <h3 className='h1 pb-1'>{category}</h3>
      <p className='body-medium'>{description}</p>

      

      {hardmodeRequirements && hardmodeRequirements.length > 0 && (
        <div className='hard-mode'>
          <h3 className='h3 pb-1'>HARD MODE</h3>
          <p className='pb-4 body-medium'>To play in hard mode, avoid the following</p>

          <ul className="hardmode-requirements">
          {hardmodeRequirements.map((requirement, index) => (
            <li key={index} className="body-medium-strong ">
              <i className="fas fa-x pr-1"></i>
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

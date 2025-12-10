// src/components/ListRow.js
import React from 'react';

const ListRow = ({ subgenre, selectedSubgenre, handleSubgenreChange }) => {
  return (
    <div className="list-row">
      <label>
        <input
          type="radio"
          name="subgenre" // Ensures only one subgenre can be selected at a time
          value={subgenre}
          checked={selectedSubgenre === subgenre} // Checks if this subgenre is selected
          onChange={handleSubgenreChange} // Calls the handler when selected
        />
        {subgenre} {/* Display the subgenre name */}
      </label>
    </div>
  );
};

export default ListRow;

export const parseCSV = (csv) => {
    // Split the CSV string by new lines to get rows
    const rows = csv.split('\n');
    
    // Initialize an empty array to hold the custom list
    const custom_list = [];
  
    // Iterate over each row
    rows.forEach(row => {
      // Split each row by commas to get individual cells
      const cells = row.split(',');
      
      // Add each cell to the custom_list
      custom_list.push(...cells.map(cell => cell.trim())); // Trim whitespace from each cell
    });
  
    return custom_list; // Return the populated custom_list
  };
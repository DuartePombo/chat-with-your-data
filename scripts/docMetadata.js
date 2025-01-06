// docMetadata.js: Manages the Data Documentation fields (Step 3).

// Reference to the overall dataset overview text area (if needed)
const datasetOverview = document.getElementById('datasetOverview');

/**
 * buildColumnGrid(columns)
 *
 * columns: an array of column names, e.g. ["style_color", "color", "Category", "Price"]
 *
 * Dynamically populates the #columnGrid with rows for each column:
 *   Column Name  |  Description (text area)  |  Data Type (dropdown)
 */
function buildColumnGrid(columns) {
  const columnGrid = document.getElementById('columnGrid');
  columnGrid.innerHTML = ''; // Clear any existing rows

  // Build a "header row" in the grid to label each column
  const headerRow = document.createElement('div');
  headerRow.classList.add('column-row', 'column-header-row');

  const colNameHeader = document.createElement('div');
  colNameHeader.textContent = 'Column Name';
  colNameHeader.classList.add('column-header-cell');
  headerRow.appendChild(colNameHeader);

  const descHeader = document.createElement('div');
  descHeader.textContent = 'Description';
  descHeader.classList.add('column-header-cell');
  headerRow.appendChild(descHeader);

  const typeHeader = document.createElement('div');
  typeHeader.textContent = 'Data Type';
  typeHeader.classList.add('column-header-cell');
  headerRow.appendChild(typeHeader);

  columnGrid.appendChild(headerRow);

  // Build one row per column
  columns.forEach((colName) => {
    // The row container
    const row = document.createElement('div');
    row.classList.add('column-row');

    // 1) Column Name (read-only)
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('column-name');
    nameDiv.textContent = `[${colName}]`;
    row.appendChild(nameDiv);

    // 2) Column Description (textarea)
    const descArea = document.createElement('textarea');
    descArea.classList.add('column-description');
    descArea.rows = 2;
    descArea.placeholder = `Describe [${colName}] (e.g., format, possible values)...`;
    row.appendChild(descArea);

    // 3) Data Type Dropdown
    const dataTypeSelect = document.createElement('select');
    dataTypeSelect.classList.add('column-datatype');

    // Example data types; feel free to adjust or expand
    const dataTypes = ['Text', 'Number', 'Date', 'Boolean', 'Float', 'Other'];
    dataTypes.forEach((type) => {
      const option = document.createElement('option');
      option.value = type.toLowerCase();
      option.textContent = type;
      dataTypeSelect.appendChild(option);
    });
    row.appendChild(dataTypeSelect);

    // Finally, append row to the main container
    columnGrid.appendChild(row);
  });
}

// Expose globally so main.js can call buildColumnGrid(...)
window.buildColumnGrid = buildColumnGrid;

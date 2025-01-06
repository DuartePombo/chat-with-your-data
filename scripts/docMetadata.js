// docMetadata.js: Manages the Data Documentation fields (Step 3).

// Reference to the overall dataset overview text area
const datasetOverview = document.getElementById('datasetOverview');
const columnGrid = document.getElementById('columnGrid');

/**
 * buildColumnGrid(columns)
 *
 * columns: an array of column names, e.g. ["style_color", "color", "Category", "Price"]
 *
 * Dynamically populates the #columnGrid with rows for each column:
 *   Column Name  |  Description (text area)  |  Data Type (dropdown)
 */
function buildColumnGrid(columns) {
  if (!columnGrid) return;

  // Clear any existing rows
  columnGrid.innerHTML = '';

  // Optional: Create a header row
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

  // Create one row per column
  columns.forEach((colName) => {
    const row = document.createElement('div');
    row.classList.add('column-row');

    // 1) Column Name (read-only)
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('column-name');
    nameDiv.textContent = `[${colName}]`;
    row.appendChild(nameDiv);

    // 2) Description (textarea)
    const descArea = document.createElement('textarea');
    descArea.classList.add('column-description');
    descArea.rows = 2;
    descArea.placeholder = `Describe [${colName}] (e.g., format, possible values)...`;
    row.appendChild(descArea);

    // 3) Data Type (dropdown)
    const dataTypeSelect = document.createElement('select');
    dataTypeSelect.classList.add('column-datatype');

    // Example data types
    const dataTypes = ['Text', 'Number', 'Date', 'Boolean', 'Float', 'Other'];
    dataTypes.forEach((type) => {
      const option = document.createElement('option');
      option.value = type.toLowerCase();
      option.textContent = type;
      dataTypeSelect.appendChild(option);
    });
    row.appendChild(dataTypeSelect);

    columnGrid.appendChild(row);
  });
}

/**
 * gatherDocumentation()
 *
 * Reads the user's inputs from Step 3 (overall dataset overview + each column's
 * description & data type) and returns:
 *
 *   1) A structured object (docObject)
 *   2) A single text/Markdown template (docTemplate)
 *
 * You can feed either structure to your LLM or store it in your backend.
 */
function gatherDocumentation() {
  // 1) Overall dataset description
  const overallDesc = datasetOverview.value.trim();

  // 2) Collect column info
  const columnRows = columnGrid.querySelectorAll('.column-row:not(.column-header-row)');
  const columnsInfo = [];

  columnRows.forEach((row) => {
    const colNameRaw = row.querySelector('.column-name')?.textContent?.trim() ?? '';
    const colDesc = row.querySelector('.column-description')?.value?.trim() ?? '';
    const colType = row.querySelector('.column-datatype')?.value?.trim() ?? '';

    // Remove the [ ] from the displayed column name if desired
    const actualColName = colNameRaw.replace(/^\[|\]$/g, '');

    columnsInfo.push({
      name: actualColName,
      description: colDesc,
      dataType: colType,
    });
  });

  // 3) Build a structured object
  const docObject = {
    overallDescription: overallDesc,
    columns: columnsInfo
  };

  // 4) Build a single text-based template (e.g. Markdown) for LLMs
  let docTemplate = '## Overall Data Description\n\n';
  docTemplate += overallDesc + '\n\n';
  docTemplate += '## Column Information\n\n';

  columnsInfo.forEach((col) => {
    docTemplate += `### [${col.name}]\n`;
    docTemplate += `- **Description**: ${col.description || 'N/A'}\n`;
    docTemplate += `- **Data Type**: ${col.dataType || 'N/A'}\n\n`;
  });

  // Return both the object and the text template
  return {
    docObject,
    docTemplate,
  };
}

// Expose globally so main.js can call them
window.buildColumnGrid = buildColumnGrid;
window.gatherDocumentation = gatherDocumentation;

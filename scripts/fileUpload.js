// fileUpload.js: Handles file upload & parsing for CSV and Excel.
// Preserves all previous multi-step logic and dark/light theme features.

const fileDropArea = document.getElementById('fileDropArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');

// Drag & drop highlight
fileDropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropArea.classList.add('dragover');
});

fileDropArea.addEventListener('dragleave', () => {
  fileDropArea.classList.remove('dragover');
});

// Handle file drop
fileDropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  fileDropArea.classList.remove('dragover');
  const droppedFile = e.dataTransfer.files[0];
  if (droppedFile) {
    fileInput.files = e.dataTransfer.files; // store in the input for reference
    handleFile(droppedFile);
  }
});

// Browse button triggers file picker
uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

// When user selects file through dialog
fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    handleFile(selectedFile);
  }
});

/**
 * handleFile(file)
 * - Detects if CSV or Excel
 * - If CSV, parse via parseCsvFile()
 * - If XLS/XLSX, parse via parseExcelFile()
 */
function handleFile(file) {
  const fileName = file.name;
  alert(`File selected: ${fileName}`);

  const fileExtension = (fileName.split('.').pop() || '').toLowerCase();

  if (fileExtension === 'csv') {
    parseCsvFile(file);
  } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
    parseExcelFile(file);
  } else {
    alert('Unsupported file type. Please upload a CSV, XLS, or XLSX file.');
  }
}

/**
 * parseCsvFile(file)
 * - Reads the CSV using FileReader
 * - Splits lines, first line = columns
 * - Next 5 lines = data preview
 * - Show shape & move to Step 2
 */
function parseCsvFile(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const fileContent = e.target.result;
    // Split into lines
    let lines = fileContent.split(/\r\n|\n/).filter((l) => l.trim() !== '');
    if (lines.length === 0) {
      alert('CSV file is empty or invalid');
      return;
    }

    // First row => columns
    const columns = lines[0].split(',');

    // Save columns globally for Step 3
    window.columnsFromData = columns;

    // The rest are data rows
    const dataRows = lines.slice(1);
    const rowCount = dataRows.length;
    const colCount = columns.length;

    // Show shape
    const datasetShapeDiv = document.getElementById('datasetShape');
    datasetShapeDiv.textContent = `Data shape: ${rowCount} rows x ${colCount} columns`;

    // Grab first 5 rows for preview
    const previewData = dataRows.slice(0, 5).map((row) => row.split(','));

    // Update preview table
    updatePreviewTable(columns, previewData);

    // Move to Step 2
    window.setCurrentStep(2);
  };

  reader.onerror = function() {
    alert('Error reading CSV file. Please try again or check file format.');
  };

  reader.readAsText(file);
}

/**
 * parseExcelFile(file)
 * - Uses SheetJS to read .xls / .xlsx
 * - Takes the first sheet, uses the first row as columns
 * - Next 5 rows as preview
 * - Show shape & move to Step 2
 */
function parseExcelFile(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Assume first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to array of arrays
    // e.g. [ [A1, B1, C1], [A2, B2, C2], ... ]
    const sheetData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1, // Generate an array of arrays
      raw: false,
      defval: '' // If a cell is empty, use empty string
    });

    if (!sheetData.length) {
      alert('Excel sheet is empty or invalid');
      return;
    }

    // First row => columns
    const columns = sheetData[0].map(String);

    // Save columns globally for Step 3
    window.columnsFromData = columns;

    // Data rows => everything after first row
    const dataRows = sheetData.slice(1);
    const rowCount = dataRows.length;
    const colCount = columns.length;

    // Show shape
    const datasetShapeDiv = document.getElementById('datasetShape');
    datasetShapeDiv.textContent = `Data shape: ${rowCount} rows x ${colCount} columns`;

    // Grab first 5 rows for preview
    const previewData = dataRows.slice(0, 5);

    // NOTE: 'previewData' is an array of arrays, matching CSV approach
    updatePreviewTable(columns, previewData);

    // Move to Step 2
    window.setCurrentStep(2);
  };

  reader.onerror = function() {
    alert('Error reading Excel file. Please try again or check file format.');
  };

  // Read as ArrayBuffer for XLSX
  reader.readAsArrayBuffer(file);
}

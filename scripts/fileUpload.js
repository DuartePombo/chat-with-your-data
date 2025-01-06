// fileUpload.js: Handles drag-and-drop + button-based file upload
// Also triggers the move to Step 2 (Data Preview) after a successful file selection.

const fileDropArea = document.getElementById('fileDropArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');

// Drag & drop highlight
fileDropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropArea.classList.add('dragover');
});

// Remove highlight on drag leave
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

function handleFile(file) {
  // For now, just parse a hypothetical "preview" or proceed to step 2.
  alert(`File selected: ${file.name}`);

  // Simulate an immediate jump to Step 2:
  window.setCurrentStep(2);

  // Example: We can pretend to parse the file and pass some dummy preview data
  // In a real scenario, you'd parse the CSV/XLSX here or send it to a backend.
  const columns = ['Column A', 'Column B', 'Column C'];
  const rows = [
    ['Val A1', 'Val B1', 'Val C1'],
    ['Val A2', 'Val B2', 'Val C2'],
    ['Val A3', 'Val B3', 'Val C3'],
    ['Val A4', 'Val B4', 'Val C4'],
    ['Val A5', 'Val B5', 'Val C5'],
  ];

  // show shape (rows x columns)
  const rowCount = 100; // pretend
  const colCount = columns.length;
  const datasetShapeDiv = document.getElementById('datasetShape');
  datasetShapeDiv.textContent = `Data shape: ${rowCount} rows x ${colCount} columns`;

  // Actually populate the preview table
  updatePreviewTable(columns, rows);
}

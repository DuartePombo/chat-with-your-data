// fileUpload.js: Handles drag-and-drop + button-based file upload

const fileDropArea = document.getElementById('fileDropArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');

// Highlight area on drag over
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
    fileInput.files = e.dataTransfer.files; // Store in the input for reference
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
  // For now, just show an alert. 
  // Later, parse the file or send to the backend.
  alert(`File selected: ${file.name}`);
  
  // You could call preview logic here, e.g.:
  // parseFileAndPreview(file);
}

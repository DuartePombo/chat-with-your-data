// main.js: Core initialization, theme toggle, and step management

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');

  // Toggle dark/light theme
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
      themeToggle.textContent = 'Toggle Dark Mode';
    } else {
      themeToggle.textContent = 'Toggle Light Mode';
    }
  });

  // Step handling
  let currentStep = 1;

  // Next step buttons
  const previewNextBtn = document.getElementById('previewNextBtn');
  const docNextBtn = document.getElementById('docNextBtn');
  const llmDocNextBtn = document.getElementById('llmDocNextBtn');

  // Back step buttons
  const previewBackBtn = document.getElementById('previewBackBtn');
  const docBackBtn = document.getElementById('docBackBtn');
  const llmDocBackBtn = document.getElementById('llmDocBackBtn');
  const chatBackBtn = document.getElementById('chatBackBtn');

  // Step sections
  const uploadSection = document.getElementById('uploadSection');
  const previewSection = document.getElementById('previewSection');
  const documentationSection = document.getElementById('documentationSection');
  const llmDocSection = document.getElementById('llmDocSection');
  const chatSection = document.getElementById('chatSection');

  function showStep(stepNumber) {
    // Hide all steps
    uploadSection.classList.add('hidden');
    previewSection.classList.add('hidden');
    documentationSection.classList.add('hidden');
    llmDocSection.classList.add('hidden');
    chatSection.classList.add('hidden');

    // Show only the active step
    switch (stepNumber) {
      case 1:
        uploadSection.classList.remove('hidden');
        break;
      case 2:
        previewSection.classList.remove('hidden');
        break;
      case 3:
        documentationSection.classList.remove('hidden');
        break;
      case 4:
        llmDocSection.classList.remove('hidden');
        break;
      case 5:
        chatSection.classList.remove('hidden');
        break;
      default:
        // Fallback to Step 1
        uploadSection.classList.remove('hidden');
        break;
    }
  }

  // Initialize the first step on page load
  showStep(currentStep);

  // ==================== NEXT Step Handlers ====================
  // Step 2 -> 3
  previewNextBtn.addEventListener('click', () => {
    if (currentStep === 2) {
      // If we have column data from Step 2, build the column grid automatically
      if (window.columnsFromData) {
        window.buildColumnGrid(window.columnsFromData);
      }
      currentStep = 3;
      showStep(currentStep);
    }
  });

  // Step 3 -> 4
  docNextBtn.addEventListener('click', () => {
    if (currentStep === 3) {
      // Gather all the doc info from the user
      const { docObject, docTemplate } = window.gatherDocumentation();

      // (Optional) Do something with docObject/docTemplate:
      // For instance, log them, store them in a global, show them in Step 4, etc.
      console.log('docObject:', docObject);
      console.log('docTemplate:\n', docTemplate);

      // Example: Place docTemplate into the LLM doc preview section
      const llmDocContent = document.getElementById('llmDocContent');
      llmDocContent.textContent = docTemplate; // or add in a safer HTML manner

      currentStep = 4;
      showStep(currentStep);
    }
  });

  // Step 4 -> 5
  llmDocNextBtn.addEventListener('click', () => {
    if (currentStep === 4) {
      currentStep = 5;
      showStep(currentStep);
    }
  });

  // ==================== BACK Step Handlers =====================
  // Step 2 -> 1
  previewBackBtn.addEventListener('click', () => {
    if (currentStep === 2) {
      currentStep = 1;

      // Reset file input and preview if going back to Step 1
      const fileInput = document.getElementById('fileInput');
      fileInput.value = '';

      const previewTable = document.getElementById('previewTable');
      previewTable.innerHTML = '';
      const datasetShapeDiv = document.getElementById('datasetShape');
      datasetShapeDiv.textContent = '';

      showStep(currentStep);
    }
  });

  // Step 3 -> 2
  docBackBtn.addEventListener('click', () => {
    if (currentStep === 3) {
      currentStep = 2;
      showStep(currentStep);
    }
  });

  // Step 4 -> 3
  llmDocBackBtn.addEventListener('click', () => {
    if (currentStep === 4) {
      currentStep = 3;
      showStep(currentStep);
    }
  });

  // Step 5 -> 4
  chatBackBtn.addEventListener('click', () => {
    if (currentStep === 5) {
      currentStep = 4;
      showStep(currentStep);
    }
  });

  // Expose globally if needed
  window.showStep = showStep;
  window.setCurrentStep = (step) => {
    currentStep = step;
    showStep(currentStep);
  };
});

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
  const totalSteps = 5;
  let currentStep = 1;

  // Buttons for navigating steps
  // Next step
  const previewNextBtn = document.getElementById('previewNextBtn');
  const docNextBtn = document.getElementById('docNextBtn');
  const llmDocNextBtn = document.getElementById('llmDocNextBtn');

  // Back step
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
    // Hide all
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
        // If something goes wrong, default to Step 1
        uploadSection.classList.remove('hidden');
        break;
    }
  }

  // Initialize view
  showStep(currentStep);

  // =============== NEXT Step Handlers ===============
  // Next step from Preview -> Documentation
  previewNextBtn.addEventListener('click', () => {
    if (currentStep === 2) {
      currentStep = 3;
      showStep(currentStep);
    }
  });

  // Next step from Documentation -> LLM Doc
  docNextBtn.addEventListener('click', () => {
    if (currentStep === 3) {
      currentStep = 4;
      showStep(currentStep);
    }
  });

  // Next step from LLM Doc -> Chat
  llmDocNextBtn.addEventListener('click', () => {
    if (currentStep === 4) {
      currentStep = 5;
      showStep(currentStep);
    }
  });

  // =============== BACK Step Handlers ===============
  // Step 2 -> 1
  previewBackBtn.addEventListener('click', () => {
    if (currentStep === 2) {
      currentStep = 1;
  
      // Reset the file input
      const fileInput = document.getElementById('fileInput');
      fileInput.value = '';
  
      // Clear preview table and shape if you want to remove old data
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

  // Expose for external usage
  window.showStep = showStep;
  window.setCurrentStep = (step) => {
    currentStep = step;
    showStep(currentStep);
  };
});

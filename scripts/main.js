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


 // Step 3 -> 4 (Generate LLM doc)
 docNextBtn.addEventListener('click', async () => {
  if (currentStep === 3) {
    // 1) Gather user’s doc input
    const { docObject, docTemplate } = window.gatherDocumentation();

    try {
      // 2) Send docTemplate to your new /api/generate-doc endpoint
      const response = await fetch('http://localhost:3000/api/generate-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docTemplate }), 
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); 
      // data.text => the LLM’s generated summary

      // 3) Display the LLM response in the Step 4 #llmDocContent area
      const llmDocContent = document.getElementById('llmDocContent');
      const llmDocEditor = document.getElementById('llmDocEditor');
      llmDocEditor.value = data.text;

      // Move to Step 4
      currentStep = 4;
      showStep(currentStep);

    } catch (err) {
      console.error('Error generating doc:', err);
      alert('Could not generate doc from LLM. Check console for details.');
    }
  }
});


  llmDocNextBtn.addEventListener('click', () => {
    if (currentStep === 4) {
      // 1) Grab the final, edited text from the <textarea>
      const editedDoc = document.getElementById('llmDocEditor').value;

      // 2) Store it globally or pass it along to Step 5
      window.finalDocForChat = editedDoc;

      // 3) Move to Step 5
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

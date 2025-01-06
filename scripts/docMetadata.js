// docMetadata.js: Manages the Data Documentation fields
// Could dynamically add fields for each column, etc.

const datasetDescription = document.getElementById('datasetDescription');

function addColumnDocField(columnName) {
  const docSection = document.getElementById('documentationSection');

  const container = document.createElement('div');
  container.classList.add('doc-field');

  const label = document.createElement('label');
  label.textContent = `${columnName} Description`;

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Describe ${columnName}...`;

  container.appendChild(label);
  container.appendChild(input);
  docSection.appendChild(container);
}

// Example usage if you know the columns:
// addColumnDocField('Column A');
// addColumnDocField('Column B');

// docMetadata.js: Manages the Data Documentation fields.
// This code can dynamically add columns if needed.

const datasetDescription = document.getElementById('datasetDescription');

/**
 * Dynamically add a field for a column description.
 * Example usage if you have columns and want to let the user describe each:
 *
 *   addColumnDocField('Column A');
 *   addColumnDocField('Column B');
 */
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

// Expose function if needed
window.addColumnDocField = addColumnDocField;

// preview.js: Dynamically creates a preview table once data is parsed

function updatePreviewTable(columnHeaders, rowsData) {
  const previewTable = document.getElementById('previewTable');

  // Clear existing table content
  previewTable.innerHTML = '';

  // Create thead
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  columnHeaders.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  previewTable.appendChild(thead);

  // Create tbody
  const tbody = document.createElement('tbody');
  rowsData.forEach((row) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  previewTable.appendChild(tbody);
}

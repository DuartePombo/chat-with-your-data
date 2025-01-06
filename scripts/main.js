// main.js: Core initialization and theme toggle

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
  
    // Toggle dark/light theme
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = 'Toggle Light Mode';
      } else {
        themeToggle.textContent = 'Toggle Dark Mode';
      }
    });
  });
  
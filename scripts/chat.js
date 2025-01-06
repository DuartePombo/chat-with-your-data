// chat.js: Chat interface logic

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

chatSendBtn.addEventListener('click', () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  appendMessage('You', userMessage);
  chatInput.value = '';

  // Simulate a placeholder response
  setTimeout(() => {
    appendMessage('Assistant', 'This is a placeholder response from your data.');
  }, 800);
});

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  const senderStrong = document.createElement('strong');
  senderStrong.textContent = `${sender}:`;

  const textSpan = document.createElement('span');
  textSpan.textContent = ` ${text}`;

  messageDiv.appendChild(senderStrong);
  messageDiv.appendChild(textSpan);
  chatMessages.appendChild(messageDiv);

  // Auto-scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

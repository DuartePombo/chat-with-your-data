// chat.js: Chat interface logic

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

chatSendBtn.addEventListener('click', async () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // 1) Show user’s question in the chat
  appendMessage('You', userMessage);
  chatInput.value = '';

  // 2) Get the final, edited doc from Step 4
  const finalDoc = window.finalDocForChat || '';
  console.log('Using doc for chat:', finalDoc);

  // 3) Call your backend /api/chat endpoint with both doc + user question
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doc: finalDoc,
        userMessage: userMessage
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // data.reply => The LLM’s generated answer
    appendMessage('Assistant', data.reply);

  } catch (error) {
    console.error('Error calling /api/chat:', error);
    appendMessage('Assistant', 'Sorry, something went wrong calling the chat API.');
  }
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

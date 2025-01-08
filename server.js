// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to generate doc
app.post('/api/generate-doc', async (req, res) => {
  const docTemplate = req.body.docTemplate || '';

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        // Use a valid model (adjust to your access):
        model: 'gpt-4o-mini', 
        messages: [
          {
            // 1) System Prompt => Tells the AI "how" to behave
            role: 'system',
            content: `You are an advanced data documentation assistant.
            The user will provide you a text describing a dataset (including overall info and columns).
            Please produce an EXTENSIVE and well-structured summary, covering:
            - The dataset's purpose, scope, and relevant context
            - Each column and its role, possible values, data formats, or constraints
            - Insights about database structure.
            
            Speak in a clear, organized manner, using bullet points or sections as needed.`
          },
          {
            // 2) User Prompt => docTemplate from the client
            role: 'user',
            content: docTemplate,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const responseText = response.data.choices[0].message.content.trim();
    res.json({ text: responseText });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error generating documentation' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

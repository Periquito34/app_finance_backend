const { askGemini } = require('../services/geminiService');

// Controlador que usa el servicio Gemini
const getAdvice = async (req, res) => {
  const { prompt } = req.body; // Espera que le envíes { "prompt": "tu pregunta" }

  try {
    const geminiResponse = await askGemini(prompt);
    res.status(200).json(geminiResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAdvice,
};

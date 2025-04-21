const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // reemplázala con tu API Key real
const MODEL = 'gemini-2.0-flash'; // o el que te permita tu cuenta
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const askGemini = async (prompt) => {
  try {
    const response = await axios.post(
      URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al consultar la API de Gemini:', error.response?.data || error.message);
    throw new Error('No se pudo obtener respuesta de Gemini.');
  }
};

module.exports = { askGemini };

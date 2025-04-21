const express = require('express');
const router = express.Router();
const { getAdvice } = require('../controllers/geminiController');

router.post('/ask', getAdvice);

module.exports = router;

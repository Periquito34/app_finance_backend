const express = require('express');
const router = express.Router();
const verifyFirebaseToken = require('../middlewares/authMiddleware');

// Usar solo el middleware y responder con el uid del usuario autenticado
router.post('/check', verifyFirebaseToken, (req, res) => {
  res.status(200).json({
    message: 'Token válido',
    uid: req.user.uid
  });
});

module.exports = router;

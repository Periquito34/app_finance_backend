const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', getUsers);
module.exports = router;

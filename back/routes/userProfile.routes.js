// src/routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const { saveUserProfile, updateUserProfile } = require('../controllers/userProfile.controller');

router.post('/', saveUserProfile);

router.put('/editar', updateUserProfile);

module.exports = router;

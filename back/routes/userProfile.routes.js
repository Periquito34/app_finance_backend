// src/routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const { saveUserProfile } = require('../controllers/userProfile.controller');

router.post('/', saveUserProfile);

module.exports = router;

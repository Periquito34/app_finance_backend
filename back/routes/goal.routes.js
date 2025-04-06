// src/routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const { createGoal, getGoalsByUser, deleteGoal, updateGoal } = require('../controllers/goalController');

// Crear nueva meta
router.post('/goals', createGoal);

// Obtener metas por UID
router.get('/goals/:uid', getGoalsByUser);

// Eliminar una meta por ID
router.delete('/goals/:id', deleteGoal);

// Actualizar una meta por ID
router.put('/goals/:id', updateGoal);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getFixedExpensesByUser, createFixedExpense  } = require('../controllers/fixedExpenses.controller');

// Obtener metas por UID
router.get('/fixed_expenses/:uid', getFixedExpensesByUser);

// Crear nueva meta
router.post('/fixed_expenses', createFixedExpense);

module.exports = router;

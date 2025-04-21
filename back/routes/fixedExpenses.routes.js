const express = require('express');
const router = express.Router();
const { getFixedExpensesByUser, createFixedExpense, getTotalFixedExpensesByUser  } = require('../controllers/fixedExpenses.controller');

// Obtener metas por UID
router.get('/fixed_expenses/:uid', getFixedExpensesByUser);

// Crear nueva meta
router.post('/fixed_expenses', createFixedExpense);

// Obtener total de gastos fijos por UID
router.get('/fixed_expenses/total/:uid', getTotalFixedExpensesByUser);

module.exports = router;
